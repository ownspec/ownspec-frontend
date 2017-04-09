"use strict";
import {Component as C, EventEmitter, Input, OnInit, Output} from "@angular/core";
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

@C({
  selector: 'component-estimations',
  templateUrl: 'component-estimations.template.html',
  styleUrls: ['component-estimations.component.scss']
})
export class ComponentEstimationsComponent implements OnInit {


  public componentVersionId: any;

  nodes = null;


  private estimated: ComponentVersion = null;

  public constructor(public snackBar: MdSnackBar,
                     private componentVersionService: ComponentVersionService,
                     private dialogRef: MdDialogRef<ComponentEstimationsComponent>) {
  }


  ngOnInit(): void {

    console.log(this.componentVersionId);
    console.log(this.componentVersionId);
    console.log(this.componentVersionId);
    this.componentVersionService.estimatedTimes(this.componentVersionId).subscribe(e => {
      console.log(e);
      this.estimated = e;
      this.nodes = [this.constructTree(e)];
      console.log(this.nodes);

    });
  }

  private constructTree(cv:ComponentVersion):any{

    let node = {id:cv.id, name:cv.title,componentVersion:cv, children:[], totalEstimatedTime: this.estimate(cv) , estimatedTime:this.estimate(cv), childrenEstimatedTime:0};

    cv.componentReferences.forEach(v => {
      let child = this.constructTree(v.target);
      node.children.push(child);
      node.childrenEstimatedTime += child.estimatedTime;
      node.totalEstimatedTime += child.estimatedTime;
    });

    return node;
  }

  private estimate(cv:ComponentVersion): number{
    let estim = 0;
    for (let est of cv.estimatedTimes){
      estim += est.durationInMs;
    }

    return Math.trunc((estim / (8*60*60)) * 100) / 100;
  }

}
