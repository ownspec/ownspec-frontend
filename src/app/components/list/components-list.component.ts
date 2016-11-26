"use strict";


import {ComponentService, Component} from "../../shared/component.service";
import {StateService, StateParams} from "ui-router-ng2";
import {Component as C, ChangeDetectorRef, OnInit, Input, forwardRef, OpaqueToken, ApplicationRef} from "@angular/core";
import {ColumnMode} from "angular2-data-table";


/*
OpaqueToken

export var parentProvider = {
  provide: Parent,
  useExisting: forwardRef(function () { return Parent; })
};

*/


@C({
  selector: 'components',
  templateUrl: 'components-list.template.html',
  //providers:[]
})
export class ComponentsListComponent implements OnInit {

  public components = [];

  @Input("componentTypes")
  public availableComponentTypes: string[] = [];

  @Input("projectId")
  public projectId: string = null;


  public constructor(public appRef: ApplicationRef, private $state: StateService, private $stateParams: StateParams, private componentService: ComponentService) {
    this.projectId = null;
  }


  ngOnInit(): void {
    this.fetchComponents();
  }

  private fetchComponents() {
    this.componentService.findAll(this.projectId, null, this.availableComponentTypes).subscribe(o => {
      this.components = o;
    });
  }

  public edit(r: any) {
    this.$state.go(".component-edit", {componentId: r.id}, {reload: false});
  }

  public write(r: any) {
    this.$state.go(".component-write", {componentId: r.id}, {reload: false});
  }

  public startCreateComponent() {
    this.$state.go(".component-edit", {componentId: "_new"}, {reload: false});
  }

}
