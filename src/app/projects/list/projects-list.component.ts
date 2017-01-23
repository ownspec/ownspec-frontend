"use strict";


import {StateService} from "ui-router-ng2";
import {Component as C, OnInit} from "@angular/core";
import {ProjectService, Project} from "../../shared/service/project.service";


@C({
  selector: 'projects',
  templateUrl: 'projects-list.template.html',
  styleUrls: ['../projects.scss']
})
export class ProjectsListComponent implements OnInit {

  public projects: Project[] = [];


  public constructor(private $state: StateService,
                     private projectService: ProjectService) {
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
   this.projectService.show(projectId);
  }

  public edit(project: Project) {
    this.$state.go(".project-edit", {projectId: project.id}, {reload: false});
  }

  public addVisit(projectId:number){
    this.projectService.addVisit(projectId);
  }

  toggleFavorite(project:Project){

  }

}
