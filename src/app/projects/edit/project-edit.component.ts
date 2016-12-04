"use strict";
import {StateService} from "ui-router-ng2";
import {Component as C, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Project, ProjectService} from "../../shared/project.service";
import {CompleterData, CompleterService} from "ng2-completer";
import {UserService} from "../../shared/users/user.service";

@C({
  selector: 'project-edit',
  templateUrl: 'project-edit.component.html',
})
export class ProjectEditComponent implements OnInit {

  @Input("projectId") public id: string;

  public project: Project;
  public create: boolean;
  private searchedUsername: string;
  private dataService: CompleterData;

  public constructor(private $state: StateService,
                     private projectService: ProjectService,
                     private completerService: CompleterService,
                     private userService: UserService) {

    this.project = new Project("", "", "", "");
    this.dataService = completerService.local(userService.findAll2Json(), 'username', 'username');
  }


  ngOnInit(): void {
    this.create = this.id == '_new';

    if (!this.create) {
      this.projectService.findOne(this.id).subscribe(r => this.project = r);
    }
  }

  public save() {

    let obs: Observable<boolean>;

    if (this.create) {
      obs = this.projectService.create(this.project);
    } else {
      obs = this.projectService.save(this.project);
    }

    obs.subscribe(r => {
      this.$state.go("^", null, {reload: true});
    });
  }


}
