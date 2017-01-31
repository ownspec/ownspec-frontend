"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone, ViewChild} from "@angular/core";

import {Observable} from "rxjs";
import {ComponentService} from "../service/component/component.service";
import {ProfilService} from "../users/profil.service";
import {Component} from "../service/component/component";
import {Change} from "../service/component/change";
import {ComponentVersion} from "../service/component/component-version";

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


  combinedStatusView: Array<any> = [];

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

  public constructor(private zone: NgZone, private componentService: ComponentService, private profilService: ProfilService) {
  }

  ngOnInit(): void {


    this.profilService.findCurrentProfile().subscribe(p => {
      this.statuses = p.properties.statuses;
    });

  }


  public changeStatus() {
    this.componentService.updateStatus(this.componentVersion.id, this.targetStatus, this.reason)
      .subscribe(c => {
        //this.component = c;
        this.update.emit(c);
      });
  }

  public newStatus() {
    this.componentService.newStatus(this.componentVersion.id)
      .subscribe(c => {
        //this.component = c;
        this.update.emit(c);
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

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

}
