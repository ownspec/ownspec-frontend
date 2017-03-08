"use strict";
import {Component, OnInit} from "@angular/core";
import {User} from "../shared/model/user/user";
import {Company} from "../shared/model/company";
import {UserCategory} from "../shared/model/user/user-category";
import {UserService} from "../shared/service/user/user.service";
import {CompanyService} from "../shared/service/company.service";
import {MdSnackBar, MdDialog, MdDialogRef} from "@angular/material";
import {UserEditorDialog} from "./user-edit/user-edit.component";

@Component({
  selector: 'administration',
  templateUrl: './administration.template.html',
  styleUrls: ['./administration.component.scss'],
  entryComponents: [UserEditorDialog]
})
export class AdministrationComponent implements OnInit {

  private users: User[] = [];
  private userCategories: UserCategory[] = [];
  private company: Company = new Company();
  private searchInput = "";

  public constructor(private userService: UserService,
                     private companyService: CompanyService,
                     private snackBar: MdSnackBar,
                     private dialog: MdDialog) {
  }

  ngOnInit(): void {
    this.fetchUsers();

    // this.userService.findAllUserCategories().subscribe(r => {
    //   this.userCategories = r;
    // }, e => {
    //   this.snackBar.open("Failed to retrieve all user categories");
    // });

    // this.companyService.getCurrent().subscribe(r => {
    //   this.company = r;
    // }, e => {
    //   this.snackBar.open("Failed to get current company settings", "Signal", {duration: Globals.SNACK_BAR_DURATION});
    // })
  }

  fetchUsers() {
    this.userService.findAll().subscribe((r: User []) => {
      this.users = r
    }, e => {
      this.snackBar.open("Failed to retrieve all users", "x");

    });
  }

  create() {
    this.edit(new User(), true);
  }

  edit(user: User, create = false) {
    // TODO: the user may have changed, it has to be loaded by the UserEditorDialog
    let dialogRef: MdDialogRef<UserEditorDialog> = this.dialog.open(UserEditorDialog);
    dialogRef.componentInstance.user = user;
    dialogRef.componentInstance.create = create;
    dialogRef.afterClosed().subscribe(() => {
      this.fetchUsers();
    })
  }

  resetPassword(user: User) {

  }

  disable(user: User) {

  }

  remove(user: User) {
    this.userService.delete(user).subscribe(
        s => {
          this.snackBar.open(user.fullName + " successfully deleted");
        },
        e => {
          this.snackBar.open("Failed to delete " + user.fullName, "x");
        }
    )
  }
}
