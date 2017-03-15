"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone, ViewChild} from "@angular/core";
import {ComponentVersion} from "../../shared/model/component/component-version";
import {ComponentUpdate} from "../../components/write/component-write.component";
import {ComponentService} from "../../shared/service/components/component.service";
import {ComponentVersionService} from "../../shared/service/components/component-versions.service";
import {ProfileService} from "../../shared/service/user/profil.service";

//var LoDashStatic = require("/home/nithril/ownspec/angular2-webpack-starter-master/node_modules/@types/lodash");
//import {_} from
//import LoDashStatic = _;
//import * as _ from "lodash";
//import _ from "lodash";

//const contentTemplateUrl: any = require('./content.template.html');

@C({
  selector: 'workflow-update',
  templateUrl: 'workflow-update.template.html',
})
export class UpdateWorkflowComponent implements OnInit {

  @Input()
  public componentVersion: ComponentVersion;

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  public targetStatus: string;

  public reason: string;

  public statuses = [];

  public visibleStatuses = {};


  public constructor(private zone: NgZone, private componentService: ComponentService,
                     private componentVersionService: ComponentVersionService, private profileService: ProfileService) {
  }

  ngOnInit(): void {


    this.profileService.findCurrentProfile().subscribe(p => {
      this.statuses = p.properties.statuses;
    });

  }



  public changeStatus() {
    this.componentVersionService.updateWorkflowStatus(this.componentVersion.id, this.targetStatus, this.reason)
      .subscribe(c => {
        //this.component = c;
        this.update.emit(ComponentUpdate.newComponentUpdate());
      });
  }

  public newStatus() {
    this.componentVersionService.updateWorkflowStatus(this.componentVersion.id, "new", this.reason)
      .subscribe(c => {
        //this.component = c;
        this.update.emit(ComponentUpdate.newComponentUpdate());
      });
  }

}
