"use strict";


import {Component as C, OnInit} from "@angular/core";
import {ProjectService} from "../../shared/service/project.service";
import {Project} from "../../shared/model/project";
import {LinkService} from "../../link/link.service";
import {Observable} from "rxjs";
import {MdSnackBar} from "@angular/material";
import {Globals} from "../../shared/globals";


@C({
  selector: 'projects',
  templateUrl: 'projects-list.template.html',
  styleUrls: ['../projects.scss']
})
export class ProjectsListComponent implements OnInit {

  public projects: Observable<Project[]>;


  public constructor(private linkService: LinkService,
                     private projectService: ProjectService,
                     private snackBar: MdSnackBar) {
  }


  ngOnInit(): void {
    this.fetchProjects();
  }

  private fetchProjects() {
    this.projects = this.projectService.findAll();
  }

  public show(projectId) {
    this.linkService.gotoProjectDashboard(projectId);
  }

  public edit(project: Project) {
    this.linkService.gotoProjectEditor(project.id);
  }

  public delete(project: Project) {
    this.projectService.delete(project).subscribe(r => {
      this.fetchProjects();
      this.snackBar.open(r, "undo",{duration: Globals.SNACK_BAR_DURATION})
    }, e => {
      this.snackBar.open(e, "x", {duration: Globals.SNACK_BAR_DURATION});
    });
  }

  public addVisit(projectId: number) {
    this.projectService.addVisit(projectId);
  }

  toggleFavorite(project: Project) {

  }

}
