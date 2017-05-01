"use strict";
import {Component as C, OnInit, ViewChild} from "@angular/core";
import {MdDialogRef, MdSnackBar} from "@angular/material";
import {ComponentVersion} from "../../../shared/model/component/component-version";
import {ComponentVersionService} from "../../../shared/service/components/component-versions.service";
import "rxjs/add/operator/startWith";
import {EstimatedTime} from "../../../shared/model/component/estimated-time";
import {LinkService} from "../../../link/link.service";
import construct = Reflect.construct;

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
