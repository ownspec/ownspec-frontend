"use strict";
import {Component as C, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MdSnackBar} from "@angular/material";
import {ComponentVersion} from "../../../shared/service/component/component-version";
import {Observable} from "rxjs";
import {ComponentVersionService} from "../../../shared/service/component/component-versions.service";
import {ComponentUpdate} from "../../write/component-write.component";
import "rxjs/add/operator/startWith";
import {UserCategory} from "../../../shared/model/user/user-category";
import {UserCategoryService} from "../../../shared/service/user/user-category.service";
import {EstimatedTime} from "../../../shared/model/component/estimated-time";

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

  private estimatedTimes: EstimatedTime[] = [];

  private unEstimatedUserCategories: UserCategory [] = [];

  public constructor(public snackBar: MdSnackBar,
                     private componentVersionService: ComponentVersionService,
                     private userCategoryService: UserCategoryService) {
  }


  ngOnInit(): void {
    // Init estimated times and un-estimated user categories
    this.userCategoryService.findAll().subscribe((userCategories: UserCategory[]) => {
      let billableUserCategories = userCategories.filter(userCategory => userCategory.isBillable);
      if (this.componentVersion.estimatedTimes.length == 0) {
        billableUserCategories.forEach(userCategory => {
          this.pushUserCategoryForEstimation(userCategory);
        });
      } else {
        this.estimatedTimes = this.componentVersion.estimatedTimes;
        this.resolveUnEstimatedCategoriesWith(billableUserCategories);
      }
    });
  }

  public save() {
    this.componentVersion.estimatedTimes = this.estimatedTimes.filter(e => e.time > 0);

    let obs: Observable<any>;
    obs = this.componentVersionService.update(this.componentVersion);
    obs.subscribe(r => {
      this.snackBar.open(this.componentVersion.type + " successfully updated", "Close", {duration: 2000});
      this.update.emit(ComponentUpdate.newComponentUpdate());
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
      this.resolveUnEstimatedCategoriesWith(userCategories.filter(userCategory => userCategory.isBillable));
    });
  }

  public pushUserCategoryForEstimation(userCategory: UserCategory) {
    this.estimatedTimes.push(new EstimatedTime(userCategory, null, null));
  }

  private resolveUnEstimatedCategoriesWith(billableUserCategories: UserCategory[]) {
    this.unEstimatedUserCategories = billableUserCategories
        .filter(uc => this.estimatedTimes.filter(e => uc.name == e.userCategory.name).length == 0);
  }


}
