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
import {LinkService} from "../../shared/service/link.service";

@Component({
  selector: 'project-edit',
  templateUrl: 'project-edit.component.html',
})
export class ProjectEditComponent implements OnInit {

  @Input("projectId") public id: string;

  public project: Project;
  public projects: Project[];
  public create = false;
  private descriptionMaxLength = 200;
  private searchStr = "";
  private dataService: CompleterData;
  private availableUsers: User[] = [];

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

    this.project = new Project();

    this.projectService.findAll().subscribe(r => this.projects = r);

    let foundUsers: Observable<User[]> = this.userService.findAll();
    foundUsers.subscribe(r => this.availableUsers = r);
    this.dataService = this.completerService.local(foundUsers, 'username,fullName', 'fullName').descriptionField('username');

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
      let status = this.create ? "created" : "updated";
      this.snackBar.open("Project successfully " + status, "Close");
      this.linkService.gotoParent(this.route);
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
        md-dialog-close>Save</button>
        
        <button
        md-raised-button
        color="primary"
        md-dialog-close>Close</button>
    </md-dialog-actions>
  `
})
export class UpdatePictureDialog {

}
