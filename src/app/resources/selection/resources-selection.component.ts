"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone} from "@angular/core";

import {Observable} from "rxjs";
import {Component} from "../../shared/service/component/component";
import {ComponentService} from "../../shared/service/component/component.service";
import {ProfilService} from "../../shared/users/profil.service";

//var LoDashStatic = require("/home/nithril/ownspec/angular2-webpack-starter-master/node_modules/@types/lodash");
//import {_} from
//import LoDashStatic = _;
//import * as _ from "lodash";
//import _ from "lodash";

//const contentTemplateUrl: any = require('./content.template.html');

@C({
  selector: 'resources-selection',
  templateUrl: 'resources-selection.template.html',
})
export class ResourcesSelectionComponent implements OnInit {

  @Input()
  public component: Component;

  @Input()
  public projectId: string;

  @Input()
  public types: string[] = [];

  @Output()
  public update = new EventEmitter<Component>();

  public components: Component[];

  public searchQuery: string;


  public constructor(private componentService: ComponentService, private profilService: ProfilService) {
  }

  ngOnInit(): void {
    this.search();
  }

  public dragStart(evt: any, r: Component) {
    var dataTransfer = evt.dataTransfer;

    dataTransfer.setData('component', JSON.stringify({
      id: r.id, type: r.type, workflowInstanceId: r.getCurrentWorkflowInstance().id,
      editable: r.getCurrentWorkflowInstance().getCurrentWorkflowStatus().status.editable,
      url:this.getContentUrl(r)
    }));

    dataTransfer.setData('text/html', `foo`);
  }

  public search() {
    // TODO: temporary fetch content with the list of component, to refactor because response size will be too large
    this.componentService.findAll(this.projectId, null, this.types, this.searchQuery, true, true, false).subscribe(components => {
      this.components = components;
    });
  }

  public getContentUrl(c: Component) {
    return this.componentService.getContentUrl(c);
  }

}
