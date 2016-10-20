"use strict";


import {ComponentService, Component} from "../../shared/component.service";
import {StateService, StateParams} from "ui-router-ng2";
import {Component as C, ChangeDetectorRef, OnInit, Input} from "@angular/core";
import {ColumnMode, TableOptions} from "angular2-data-table";
import {Angular2DataTableModule} from 'angular2-data-table';
import {DomSanitizer} from "@angular/platform-browser";


@C({
  selector: 'components',
  templateUrl: 'components-list.template.html'
})
export class ComponentsListComponent implements OnInit {

  public components = [];

  @Input("componentTypes")
  public availableComponentTypes: string[] = [];

  @Input("projectId")
  public projectId: string = null;

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 0,
    rowHeight: 50,
    scrollbarV: true,
    scrollbarH: true
  });


  public constructor(private $state: StateService, private $stateParams: StateParams, private componentService: ComponentService) {
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
