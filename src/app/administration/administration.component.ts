"use strict";
import {Component, OnInit} from "@angular/core";
import {User} from "../shared/model/user/user";
import {Company} from "../shared/model/company";
import {UserCategory} from "../shared/model/user/user-category";
import {UserService} from "../shared/service/user/user.service";
import {CompanyService} from "../shared/service/company.service";
import {MdSnackBar, MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {Globals} from "../shared/globals";
import {UserEditDialog} from "./user-edit/user-edit.component";

@Component({
  selector: 'administration',
  templateUrl: './administration.template.html',
  styleUrls: ['./administration.component.scss'],
  entryComponents: [UserEditDialog]
})
export class AdministrationComponent implements OnInit {

  private admin = new User();
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
    this.userService.getCurrent().subscribe((r: User) => {
      this.admin = r;
    }, e => {
      this.snackBar.open("An unexpected error has occurred");
    });

    this.userService.findAll().subscribe((r: User []) => {
      this.users = r
    }, e => {
      this.snackBar.open("Failed to retrieve all users");

    });

    this.userService.findAllUserCategories().subscribe(r => {
      this.userCategories = r;
    }, e => {
      this.snackBar.open("Failed to retrieve all user categories");
    });

    this.companyService.getCurrent().subscribe(r => {
      this.company = r;
    }, e => {
      this.snackBar.open("Failed to get current company settings", "Signal", {duration: Globals.SNACK_BAR_DURATION});
    })
  }


  edit(user: User) {
    let dialogRef: MdDialogRef<UserEditDialog> = this.dialog.open(UserEditDialog);
    dialogRef.componentInstance.user = user;
  }

  resetPassword(user: User) {

  }

  disable(user: User) {

  }

  remove(user: User) {

  }
}
