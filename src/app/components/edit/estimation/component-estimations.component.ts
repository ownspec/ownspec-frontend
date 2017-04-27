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


  private estimations = [];

  public constructor(public snackBar: MdSnackBar,
                     private componentVersionService: ComponentVersionService,
                     private linkService: LinkService,
                     private dialogRef: MdDialogRef<ComponentEstimationsComponent>) {
  }


  ngOnInit(): void {

    this.componentVersionService.estimatedTimes(this.componentVersionId).subscribe(e => {
      this.estimations = e;
    });
  }




  private sumEstimate(l: SumEstimate, r: SumEstimate): SumEstimate {
    return {estimate: l.estimate + r.estimate, price: l.price + r.price};
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
    return Math.round(1000 * v) / 1000;
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
