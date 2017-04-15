"use strict";
import {Component as C, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
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
import {LinkService} from "../../../link/link.service";

type SumEstimate = { price: number, estimate: number };

@C({
  selector: 'component-estimations',
  templateUrl: 'component-estimations.template.html',
  styleUrls: ['component-estimations.component.scss']
})
export class ComponentEstimationsComponent implements OnInit {

  @ViewChild('table') table: any;

  public componentVersionId: any;

  nodes = null;


  private estimated: ComponentVersion = null;

  private estimations = [];

  public constructor(public snackBar: MdSnackBar,
                     private componentVersionService: ComponentVersionService,
                     private linkService: LinkService,
                     private dialogRef: MdDialogRef<ComponentEstimationsComponent>) {
  }


  ngOnInit(): void {

    this.componentVersionService.estimatedTimes(this.componentVersionId).subscribe(e => {
      console.log(e);
      this.estimated = e;
      this.nodes = [this.constructTree(e, 0)];

      //this.estimations.push(this.constructTree(e,0));

      console.log(this.nodes);

    });
  }

  private constructTree(cv: ComponentVersion, level: number): any {

    let node = {
      level: level,
      id: cv.id,
      name: cv.title,
      componentVersion: cv,
      children: [],
      totalEstimatedTime: this.estimate(cv),
      estimatedTime: this.estimate(cv),
      childrenEstimatedTime: {estimate: 0, price: 0}
    };
    this.estimations.push(node);

    cv.componentReferences.forEach(v => {
      let child = this.constructTree(v.target, level + 1);
      node.children.push(child);
      node.childrenEstimatedTime = this.sumEstimate(node.childrenEstimatedTime, child.estimatedTime);
      node.totalEstimatedTime = this.sumEstimate(node.totalEstimatedTime, child.estimatedTime);
    });

    return node;
  }


  private sumEstimate(l: SumEstimate, r: SumEstimate): SumEstimate {
    return {estimate: l.estimate + r.estimate, price: l.price + r.price};
  }

  private estimate(cv: ComponentVersion): SumEstimate {
    let estim = 0;
    let price = 0;
    for (let est of cv.estimatedTimes) {
      estim += est.durationInMs;
      if (est.userCategory.isBillable) {
        price += this.computePriceFromEstimatedTime(est);
      }
    }

    return {estimate: estim, price: price};
  }


  public computeDurationInDays(durationInMs: number) {
    return this.roundValue(durationInMs / (1000 * 60 * 60 * 8));
  }

  public computePriceFromEstimatedTime(est: EstimatedTime) {
    if (est.userCategory.isBillable) {
      return (est.durationInMs / (1000 * 60 * 60)) * est.userCategory.hourlyPrice;
    } else {
      return 0;
    }
  }

  public roundValue(v) {
    return Math.round(100 * v) / 100;
  }


  public edit(r: ComponentVersion) {
    this.dialogRef.close();
    this.linkService.gotoEditComponent(r);
  }

  public write(r: ComponentVersion) {
    this.dialogRef.close();
    this.linkService.gotoWriteComponent(r);
  }

  public export() {
    this.componentVersionService.exportEstimatedTimes(this.componentVersionId);
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

}
