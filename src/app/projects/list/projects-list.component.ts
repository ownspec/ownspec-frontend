"use strict";


import {StateService, StateParams} from "ui-router-ng2";
import {Component as C, ChangeDetectorRef, OnInit} from "@angular/core";
import {ProjectService, Project} from "../../shared/project.service";


@C({
  selector: 'projects',
  templateUrl: 'projects-list.template.html',
  styleUrls: ['../projects.scss']
})
export class ProjectsListComponent implements OnInit {

  public projects: Project[] = [];


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

  public show(projectId){
    this.$state.go("app.home.project.dashboard", {projectId: projectId}, {reload: false})
  }

  public edit(r: any) {
    this.$state.go(".requirement-edit", {reqId: r.id}, {reload: false});
  }

  public startCreateRequirement() {
    this.$state.go(".requirement-edit", {reqId: "_new"}, {reload: false});
  }


}
