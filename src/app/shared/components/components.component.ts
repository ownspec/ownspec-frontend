"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone} from "@angular/core";

import {Observable} from "rxjs";
import {Component, ComponentService} from "../../shared/component.service";
import {ProfilService} from "../users/profil.service";

//var LoDashStatic = require("/home/nithril/ownspec/angular2-webpack-starter-master/node_modules/@types/lodash");
//import {_} from
//import LoDashStatic = _;
//import * as _ from "lodash";
//import _ from "lodash";

//const contentTemplateUrl: any = require('./content.template.html');

@C({
  selector: 'components-selection',
  templateUrl: 'components.template.html',
})
export class ComponentsComponent implements OnInit {

  @Input()
  public component: Component;

  @Input()
  public projectId: string;

  @Input()
  public types: string[] = [];

  @Output()
  public update = new EventEmitter<Component>();

  public components: Component[];

  public searchTitle:string;


  public constructor(private componentService: ComponentService, private profilService: ProfilService) {
  }

  ngOnInit(): void {
    this.search();
  }

  public dragStart(evt: any, r: Component) {
    var dataTransfer = evt.dataTransfer;
    dataTransfer.setData('componentId', r.id);

    console.log(r.workflowInstances[r.workflowInstances.length - 1].id);

    dataTransfer.setData('workflowInstanceId', r.getCurrentWorkflowInstance().id);

    console.log(r.getCurrentWorkflowInstance().getCurrentWorkflowStatus().status);

    dataTransfer.setData('isEditable', r.getCurrentWorkflowInstance().getCurrentWorkflowStatus().status.editable);
    dataTransfer.setData('text/html', r.content);
  }

  public search() {
    // TODO: temporary fetch content with the list of component, to refactor because response size will be too large
    this.componentService.findAll(this.projectId, this.searchTitle, this.types, true, true, false).subscribe(components => {
      this.components = components;
    });
  }

}
