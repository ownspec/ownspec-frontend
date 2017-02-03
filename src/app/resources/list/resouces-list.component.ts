"use strict";


import {ComponentService} from "../../shared/service/component/component.service";
import {StateService, StateParams} from "ui-router-ng2";
import {Component as C, OnInit, Input, ApplicationRef} from "@angular/core";
import {Component} from "../../shared/model/component/component";
import {MdDialog} from "@angular/material";
import {ResourceCreateComponent} from "../create/resource-create.component";


@C({
  selector: 'resources',
  templateUrl: 'resouces-list.template.html',
  styleUrls: ['resouces-list.component.scss']
  //providers:[]
})
export class ResourcesListComponent implements OnInit {

  public components = [];

  @Input("componentTypes")
  public availableComponentTypes: string[] = [];

  @Input("projectId")
  public projectId: string = null;

  public searchBean = {title: null, query:null};


  public constructor(public dialog: MdDialog, public appRef: ApplicationRef, private $state: StateService, private $stateParams: StateParams, private componentService: ComponentService) {
    this.projectId = null;
  }


  ngOnInit(): void {
    this.fetchComponents();
  }

  private fetchComponents() {
    this.componentService.findAll(this.projectId, this.searchBean.title, this.availableComponentTypes , this.searchBean.query).subscribe(o => {
      this.components = o;
    });
  }

  public edit(r: any) {
    this.$state.go(".resource-edit", {componentId: r.id}, {reload: false});
  }

  public startCreateComponent() {
    this.dialog.open(ResourceCreateComponent).afterClosed().subscribe(r => {
      this.fetchComponents();
    });
  }

  public search() {
    this.fetchComponents();
  }

  public getContentUrl(c:Component){
    return this.componentService.getContentUrl(c);
  }

}
