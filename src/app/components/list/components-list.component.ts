"use strict";


import {ComponentService} from "../../shared/service/component/component.service";
import {StateService, StateParams} from "ui-router-ng2";
import {Component as C, OnInit, Input, ApplicationRef} from "@angular/core";
import {Component} from "../../shared/service/component/component";


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
  styleUrls: ['./components-list.component.scss']
  //providers:[]
})
export class ComponentsListComponent implements OnInit {

  public components: Component[] = [];

  @Input("componentTypes")
  public availableComponentTypes: string[] = [];

  @Input("projectId")
  public projectId: string = null;

  public searchBean = {title: null, query: null};


  public constructor(public appRef: ApplicationRef, private $state: StateService, private $stateParams: StateParams, private componentService: ComponentService) {
    this.projectId = null;
  }


  ngOnInit(): void {
    this.fetchComponents();
  }

  private fetchComponents() {
    this.componentService.findAll(this.projectId, this.searchBean.title, this.availableComponentTypes, this.searchBean.query).subscribe(o => {
      this.components = o;
    });
  }

  public edit(r: any) {
    this.$state.go(".component-edit", {componentId: r.id}, {reload: false});
  }

  public write(r: any) {
    this.$state.go(".component-write", {componentId: r.id}, {reload: false});
  }

  public print(c: Component) {
    this.componentService.print(c);
  }

  public startCreateComponent() {
    this.$state.go(".component-edit", {componentId: "_new"}, {reload: false});
  }

  public search() {
    this.fetchComponents();
  }

  addVisit(componentId: number) {
    this.componentService.addVisit(componentId);
  }

}
