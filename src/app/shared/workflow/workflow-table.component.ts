"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone} from "@angular/core";

import {Observable} from "rxjs";
import {Component, ComponentService, Change} from "../../shared/component.service";
import {ProfilService} from "../users/profil.service";
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {ColumnMode, TableOptions} from "angular2-data-table";

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


  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 0,
    rowHeight: 50,
    scrollbarV: true,
    scrollbarH: true
  });

  combinedStatusView: Array<any> = [];

  private _component: Component;

  @Input()
  public canUpdateWorkflow: Boolean;

  @Output()
  public update = new EventEmitter<Component>();

  public targetStatus: string;

  public reason: string;
  public isopen: boolean = false;

  public statuses = [];

  get component(): Component {
    return this._component;
  }

  @Input()
  set component(value: Component) {

    console.log("set component " + value);
    console.log(value);

    this._component = value;

    if (!!value) {
      this.combinedStatusView = [];
      for (let instance of value.workflowInstances) {
        for (let status of instance.workflowStatuses) {
          if (status.changes.length > 0) {
            for (let change of status.changes) {
              this.combinedStatusView.push({instance: instance, status: status, change: change});
            }
          }
          else {
            this.combinedStatusView.push({instance: instance, status: status, change: {}});
          }
        }

      }
      this.combinedStatusView = this.combinedStatusView.reverse();
      console.log(this.combinedStatusView);
    }
  }


  public constructor(private zone: NgZone, private componentService: ComponentService, private profilService: ProfilService, public modal: Modal) {
  }

  ngOnInit(): void {

    this.profilService.findCurrentProfile().subscribe(p => {
      this.statuses = p.properties.statuses;
    });

  }

  public changeStatus() {
    this.componentService.updateStatus(this._component.id, this.targetStatus, this.reason)
      .subscribe(c => {
        //this.component = c;
        this.update.emit(c);
      });
  }

  public diff(change: Change) {
    this.componentService.diff(this._component.id, null, change.revision).subscribe(d => {

      this.modal.alert()
        .size("lg")
        .showClose(true)
        .title('Diff')
        .body(d)
        .open();

    });
  }


}
