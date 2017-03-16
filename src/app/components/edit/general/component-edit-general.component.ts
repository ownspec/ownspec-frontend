"use strict";
import {Component as C, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MdSnackBar, MdDialogRef, MdDialog} from "@angular/material";
import {ComponentVersion} from "../../../shared/model/component/component-version";
import {Observable} from "rxjs";
import {ComponentVersionService} from "../../../shared/service/components/component-versions.service";
import {ComponentUpdate} from "../../write/component-write.component";
import "rxjs/add/operator/startWith";
import {UserCategory} from "../../../shared/model/user/user-category";
import {UserCategoryService} from "../../../shared/service/user/user-category.service";
import {EstimatedTime} from "../../../shared/model/component/estimated-time";
import {UserCategoryEditDialog} from "../../../administration/user-category-edit/edit/user-category-edit.component";
import {User} from "../../../shared/model/user/user";
import {CompleterData, CompleterService} from "ng2-completer";
import {UserService} from "../../../shared/service/user/user.service";

@C({
  selector: 'component-edit-general',
  templateUrl: 'component-edit-general.template.html',
  styleUrls: ['component-edit-general.component.scss']
})
export class ComponentEditGeneralComponent implements OnInit {

  @Input("componentVersion")
  public componentVersion: ComponentVersion;

  @Input("componentType")
  public componentType: string;

  @Input("projectId")
  public projectId: string;

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  private tagToAdd: string;

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
    // Init estimated times and un-estimated user categories
    this.userCategoryService.findAll().subscribe((userCategories: UserCategory[]) => {
      this.billableUserCategories = userCategories.filter(userCategory => userCategory.isBillable);
      if (this.componentVersion.estimatedTimes.length == 0) {
        this.billableUserCategories.forEach(userCategory => {
          this.pushUserCategoryForEstimation(userCategory);
        });
      } else {
        this.estimatedTimes = this.componentVersion.estimatedTimes;
        this.resolveUnEstimatedCategories();
      }
    });

    // Users
    this.users = this.userService.findAll().share();

    // TODO: fix
    if (!!this.componentVersion.assignedTo) {
      this.users
        .flatMap(u => u)
        .filter(u => u.id == this.componentVersion.assignedTo.id)
        .subscribe(u => this.componentVersion.assignedTo = u);
    }
  }

  public save() {
    this.estimatedTimes = this.estimatedTimes.filter(e => e.time > 0);
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
    this.componentVersion.tags.push(this.tagToAdd);
    this.tagToAdd = "";
  }


  public fetchUnEstimatedUserCategories() {
    this.userCategoryService.findAll().subscribe((userCategories: UserCategory[]) => {
      this.billableUserCategories = userCategories.filter(userCategory => userCategory.isBillable);
      this.resolveUnEstimatedCategories();
    });
  }

  public pushUserCategoryForEstimation(userCategory: UserCategory) {
    this.estimatedTimes.push(new EstimatedTime(userCategory, null, "DAYS"));
  }

  private resolveUnEstimatedCategories() {
    this.unEstimatedUserCategories = this.billableUserCategories
        .filter(uc => this.estimatedTimes.filter(e => uc.name == e.userCategory.name).length == 0);
  }

  public createUserCategory(){
    let dialogRef: MdDialogRef<UserCategoryEditDialog> = this.dialog.open(UserCategoryEditDialog);
    dialogRef.componentInstance.create = true;
    dialogRef.componentInstance.update.subscribe(() => {
      this.fetchUnEstimatedUserCategories();
      this.billableUserCategories.forEach(u => this.pushUserCategoryForEstimation(u))
    })
  }

  public autoEstimateFromReferences(){
    // todo
  }

}
