"use strict";
import {Input, OnInit, Component} from "@angular/core";
import {Observable} from "rxjs";
import {ProjectService} from "../../shared/service/project.service";
import {CompleterData, CompleterService, CompleterItem} from "ng2-completer";
import {UserService} from "../../shared/service/user/user.service";
import {MdDialog, MdSnackBar} from "@angular/material";
import {Project} from "../../shared/model/project";
import {User} from "../../shared/model/user/user";
import {Globals} from "../../shared/globals";
import {ActivatedRoute} from "@angular/router";
import {LinkService} from "../../link/link.service";

@Component({
  selector: 'project-edit',
  templateUrl: 'project-edit.component.html',
})
export class ProjectEditComponent implements OnInit {

  @Input("projectId") public id: string;

  public project = new Project();
  public projects: Project[] = [];
  public create = false;
  private searchStr = "";
  private dataService: CompleterData;
  private users: Observable<User[]>;

  public constructor(private route: ActivatedRoute,
                     private linkService: LinkService,
                     private projectService: ProjectService,
                     private completerService: CompleterService,
                     private userService: UserService,
                     private dialog: MdDialog,
                     public snackBar: MdSnackBar) {


  }

  ngOnInit(): void {
    if (this.route.snapshot.data) {
      this.id = this.route.snapshot.params['projectId'];
    }

    // Users
    this.users = this.userService.findAll().publishReplay(1).refCount();
    this.dataService = this.completerService.local(this.users, 'username,fullName', 'fullName').descriptionField('username');


    // Project
    this.create = this.id == '_new';
    if (!this.create) {
      let obsProject = this.projectService.findOne(this.id);
      Observable.zip(this.users, obsProject, (users, project) => ({users, project}))
        .subscribe(m => {
          this.project = m.project;
          this.project.manager = m.users.find(u => u.id == this.project.manager.id);
        });
    }

    // Projects
    this.projectService.findAll().subscribe(r => this.projects = r);


  }

  public save() {

    let obs: Observable<boolean>;

    if (this.create) {
      obs = this.projectService.create(this.project);
    } else {
      obs = this.projectService.save(this.project);
    }

    obs.subscribe(r => {
      let status = this.create ? "created" : "updated";
      this.snackBar.open("Project successfully " + status, "Close");
    }, e => {
      this.snackBar.open("Error when trying to create/update project", "Close");
    });
  }


  public authorizeUser(selected: CompleterItem) {
    if (selected) {
      this.project.projectUsers.push(User.fromMap(selected.originalObject));
      this.searchStr = "";
    }
  }

  public deleteUserFromProject(user: User) {
    if (!this.create) {
      this.projectService.deleteUserFromProject(user, this.project).subscribe(() => {
        this.snackBar.open("User successfully removed from project", "Undo", {duration: Globals.SNACK_BAR_DURATION});
      }, () => {
        this.snackBar.open("Failed to remove user from project", "", {duration: Globals.SNACK_BAR_DURATION});

      });
    }
    this.project.projectUsers.splice(this.project.projectUsers.indexOf(user));
  }

  public updatePicture() {
    this.dialog.open(UpdatePictureDialog);
  }
}


@Component({
  selector: 'update-picture-dialog',
  /*  styles: [
   `img {
   max-width: 100%;
   }`
   ],*/
  template: `
    <h2 md-dialog-title>Project picture</h2>
    <md-dialog-content>
      <a>foo</a>
    </md-dialog-content>
    <md-dialog-actions>
      <button
        md-raised-button
        color="primary"
        md-dialog-close>Save
      </button>

      <button
        md-raised-button
        color="primary"
        md-dialog-close>Close
      </button>
    </md-dialog-actions>
  `
})
export class UpdatePictureDialog {

}
