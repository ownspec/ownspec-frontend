"use strict";


import {Component as C, OnInit} from "@angular/core";
import {ProjectService} from "../../shared/service/project.service";
import {Project} from "../../shared/model/project";
import {LinkService} from "../../shared/service/link.service";


@C({
  selector: 'projects',
  templateUrl: 'projects-list.template.html',
  styleUrls: ['../projects.scss']
})
export class ProjectsListComponent implements OnInit {

  public projects: Project[] = [];


  public constructor(private linkService: LinkService,
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

  public show(projectId) {
    this.linkService.gotoProjectDashboard(projectId);
  }

  public edit(project: Project) {
    this.linkService.gotoProjectEditor(project.id);
  }

  public addVisit(projectId: number) {
    this.projectService.addVisit(projectId);
  }

  toggleFavorite(project: Project) {

  }

}
