"use strict";
import {Component as C, EventEmitter, Input, OnInit, Output, OnChanges} from "@angular/core";
import {MdDialog, MdDialogRef, MdSnackBar} from "@angular/material";
import {ComponentVersion} from "../../../shared/model/component/component-version";
import {Observable} from "rxjs";
import {ComponentVersionService} from "../../../shared/service/components/component-versions.service";
import {ComponentUpdate} from "../../write/component-write.component";
import "rxjs/add/operator/startWith";
import {UserCategory} from "../../../shared/model/user/user-category";
import {UserCategoryService} from "../../../shared/service/user/user-category.service";
import {EstimatedTime} from "../../../shared/model/component/estimated-time";
import {User} from "../../../shared/model/user/user";
import {UserService} from "../../../shared/service/user/user.service";
import {UserCategoryEditDialog} from "../../../administration/user-category/edit/user-category-edit.component";
import construct = Reflect.construct;
import {ComponentEstimationsComponent} from "../estimation/component-estimations.component";

@C({
  selector: 'component-edit-general',
  templateUrl: 'component-edit-general.template.html',
  styleUrls: ['component-edit-general.component.scss']
})
export class ComponentEditGeneralComponent implements OnInit, OnChanges {

  @Input("componentVersion")
  public componentVersion: ComponentVersion;

  @Input("componentType")
  public componentType: string;

  @Input("projectId")
  public projectId: string;

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  private tagToAdd: string;
  private textAreaMaxLength = 256;

  private editAssignee = false;

  // Estimated Times
  private estimatedTimes: EstimatedTime[] = [];
  private unEstimatedUserCategories: UserCategory [] = [];
  private billableUserCategories: UserCategory [] = [];

  private users: Observable<User[]>;


  public constructor(public snackBar: MdSnackBar,
                     private componentVersionService: ComponentVersionService,
                     private userCategoryService: UserCategoryService,
                     private userService: UserService,
                     private dialog: MdDialog) {
  }


  ngOnInit(): void {

    // Users
    this.users = this.userService.findAll().publishReplay(1).refCount();

    this.reassign();

  }


  ngOnChanges(){
    console.log("changes");
    this.estimatedTimes = this.componentVersion.estimatedTimes;
    this.fetchUserCategories().subscribe(u => {
    });
    this.reassign();
  }

  public save() {
    this.estimatedTimes = this.estimatedTimes.filter(e => !!e.duration);
    this.componentVersion.estimatedTimes = this.estimatedTimes;

    let obs: Observable<any>;
    obs = this.componentVersionService.update(this.componentVersion);
    obs.subscribe(r => {
        this.snackBar.open(this.componentVersion.type + " successfully updated", "Close", {duration: 2000});
        this.update.emit(ComponentUpdate.newComponentUpdate());
      },
      error => {
        this.snackBar.open("Failed to update " + this.componentVersion.type, "Close", {duration: 2000});
      });
  }

  public addNewTag($event) {
    if ($event.keyCode != 13 || !this.tagToAdd || this.tagToAdd.trim().length <= 0) {
      return;
    }

    if (this.componentVersion.tags.indexOf(this.tagToAdd) == -1) {
      this.componentVersion.tags.push(this.tagToAdd);
    }
    this.tagToAdd = "";
  }


  public pushUserCategoryForEstimation(userCategory: UserCategory) {
    this.estimatedTimes.push(new EstimatedTime(userCategory, null, 0));
    this.resolveUnEstimatedCategories();
  }

  private fetchUserCategories() {
    let obs = this.userCategoryService.findAll().publishReplay(1).refCount();
    obs.subscribe((userCategories: UserCategory[]) => {
      this.billableUserCategories = userCategories.filter(userCategory => userCategory.isBillable);
      this.resolveUnEstimatedCategories();
    });
    return obs;
  }

  private resolveUnEstimatedCategories() {
    this.unEstimatedUserCategories = this.billableUserCategories
      .filter(uc => this.estimatedTimes.filter(e => uc.name == e.userCategory.name).length == 0);
  }

  public createUserCategory() {
    let dialogRef: MdDialogRef<UserCategoryEditDialog> = this.dialog.open(UserCategoryEditDialog);
    dialogRef.componentInstance.create = true;
    dialogRef.componentInstance.update.subscribe(() => {
      this.fetchUserCategories();
    })
  }

  public deleteEstimatedUserCategory(index) {
    this.estimatedTimes.splice(index);
  }

  public autoEstimateFromReferences() {
    let dialogRef: MdDialogRef<ComponentEstimationsComponent> = this.dialog.open(ComponentEstimationsComponent, {width: "70%", height: "80%"});
    dialogRef.componentInstance.componentVersionId = this.componentVersion.id;
  }


  private reassign() {
    if (!this.componentVersion || !this.users) {
      return;
    }
    if (!!this.componentVersion.assignedTo) {
      this.users
        .flatMap(u => u)
        .filter(u => u.id == this.componentVersion.assignedTo.id)
        .subscribe(u => this.componentVersion.assignedTo = u);
    }
  }


  public removeTag(tag){
    let index = this.componentVersion.tags.indexOf(tag);
    if (index >= 0){
      this.componentVersion.tags.splice(index , 1);
    }
  }

}
