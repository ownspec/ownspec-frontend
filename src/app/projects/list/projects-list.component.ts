"use strict";


import {ComponentService, Component} from "../../shared/component.service";
import {StateService, StateParams} from "ui-router-ng2";
import {Component as C, ChangeDetectorRef, OnInit} from "@angular/core";
import {ColumnMode, TableOptions} from "angular2-data-table";
import {Angular2DataTableModule} from 'angular2-data-table';
import {DomSanitizer} from "@angular/platform-browser";
import {ProjectService, Project} from "../../shared/project.service";


@C({
  selector: 'projects',
  templateUrl: 'projects-list.template.html'
})
export class ProjectsListComponent implements OnInit{

  public projects:Project[] = [];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 0,
    rowHeight: 50,
    scrollbarV: true,
    scrollbarH: true
  });


  public constructor(private $state: StateService, private $stateParams: StateParams, private projectService: ProjectService) {
  }


  ngOnInit(): void {
    this.fetchProjects();
  }

  private fetchProjects() {
    this.projectService.findAll().subscribe(o => {
      this.projects = o;
    });
  }

  public edit(r: any) {
    this.$state.go(".requirement-edit", {reqId: r.id}, {reload: false});
  }

  public write(r: any) {
    this.$state.go(".requirement-write", {reqId: r.id}, {reload: false});
  }

  public startCreateRequirement() {
    this.$state.go(".requirement-edit", {reqId: "_new"}, {reload: false});
  }


}
