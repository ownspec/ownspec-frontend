"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone} from "@angular/core";

import {Observable} from "rxjs";
import {Component, ComponentService, Change} from "../../shared/component.service";
import {ProfilService} from "../users/profil.service";
import { Modal } from 'angular2-modal/plugins/bootstrap';

//var LoDashStatic = require("/home/nithril/ownspec/angular2-webpack-starter-master/node_modules/@types/lodash");
//import {_} from
//import LoDashStatic = _;
//import * as _ from "lodash";
//import _ from "lodash";

//const contentTemplateUrl: any = require('./content.template.html');

@C({
  selector: 'workflow',
  templateUrl: './workflow.template.html',
})
export class WorkflowComponent implements OnInit {

  @Input()
  public component: Component;

  @Input()
  public canUpdateWorkflow:Boolean;

  @Output()
  public update = new EventEmitter<Component>();

  public targetStatus: string;

  public reason: string;
  public isopen: boolean = false;

  public statuses = [];

  public constructor(private zone:NgZone, private componentService: ComponentService, private profilService: ProfilService,public modal: Modal) {
  }

  ngOnInit(): void {

    this.profilService.findCurrentProfile().subscribe(p => {
      this.statuses = p.properties.statuses;
    });

  }

  public changeStatus() {
    this.componentService.updateStatus(this.component.id, this.targetStatus, this.reason)
      .subscribe(c => {
        //this.component = c;
        this.update.emit(c);
      });
  }

  public diff(change:Change){
    this.componentService.diff(this.component.id , null, change.revision).subscribe(d => {

      this.modal.alert()
        .size("lg")
        .showClose(true)
        .title('Diff')
        .body(d)
        .open();

    });
  }




}
