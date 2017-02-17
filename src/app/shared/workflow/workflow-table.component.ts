"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone, ViewChild} from "@angular/core";
import {ComponentService} from "../service/component/component.service";
import {Component} from "../model/component/component";
import {Change} from "../model/component/change";
import {ComponentVersion} from "../service/component/component-version";
import {ProfileService} from "../service/user/profil.service";
import {MdDialog, MdDialogRef} from "@angular/material";
import {UpdateWorkflowComponent} from "./update/workflow-update.component";

//var LoDashStatic = require("/home/nithril/ownspec/angular2-webpack-starter-master/node_modules/@types/lodash");
//import {_} from
//import LoDashStatic = _;
//import * as _ from "lodash";
//import _ from "lodash";

//const contentTemplateUrl: any = require('./content.template.html');

@C({
  selector: 'workflow-table',
  templateUrl: './workflow-table.template.html',
})
export class WorkflowTableComponent implements OnInit {

  @Input()
  private componentVersion: ComponentVersion;

  @Input()
  public canUpdateWorkflow:Boolean;

  @Output()
  public update = new EventEmitter<Component>();

  public targetStatus: string;

  public reason: string;
  public isopen: boolean = false;

  public statuses = [];

  public visibleStatuses = {};

  @ViewChild('myTable') table: any;

  public constructor(public dialog: MdDialog, private zone: NgZone, private componentService: ComponentService, private profileService: ProfileService) {
  }

  ngOnInit(): void {


    this.profileService.findCurrentProfile().subscribe(p => {
      this.statuses = p.properties.statuses;
    });

  }

  public diff(change:Change) {
    this.componentService.diff(this.componentVersion.id, null, change.revision).subscribe(d => {

/*
      this.modal.alert()
        .size("lg")
        .showClose(true)
        .title('Diff')
        .body(d)
        .open();

*/
    });
  }


  public updateStatus(){
    let updateStatusDlg : MdDialogRef<UpdateWorkflowComponent> = this.dialog.open(UpdateWorkflowComponent);
    updateStatusDlg.componentInstance.componentVersion = this.componentVersion;
    updateStatusDlg.componentInstance.update.subscribe(c => {
      this.update.emit(c);
      updateStatusDlg.close();
    });
  }




  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

}
