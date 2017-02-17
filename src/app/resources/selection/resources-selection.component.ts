"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Component} from "../../shared/model/component/component";
import {ComponentService} from "../../shared/service/component/component.service";
import {ProfileService} from "../../shared/service/user/profil.service";
import {ComponentVersionService} from "../../shared/service/component/component-versions.service";
import {ComponentVersion} from "../../shared/service/component/component-version";

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

  public components: ComponentVersion[];

  public searchQuery: string;


  public constructor(private componentService: ComponentVersionService, private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.search();
  }

  public dragStart(evt: any, r: ComponentVersion) {
    var dataTransfer = evt.dataTransfer;

    dataTransfer.setData('component', JSON.stringify({
      id: r.id, type: r.type, editable: r.workflowInstance.getCurrentWorkflowStatus().status.editable,
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

  public getContentUrl(c: ComponentVersion) {
    return this.componentService.getContentUrl(c);
  }

}
