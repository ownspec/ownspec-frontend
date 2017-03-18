import {Component, OnInit} from "@angular/core";
import {User} from "../../../shared/model/user/user";
import {Observable} from "rxjs";
import {UserCategory} from "../../../shared/model/user/user-category";
import {MdDialogRef, MdSnackBar} from "@angular/material";
import {UserService} from "../../../shared/service/user/user.service";
import {UserCategoryService} from "../../../shared/service/user/user-category.service";
import {Globals} from "../../../shared/globals";

@Component({
  selector: 'user-edit-dialog',
  templateUrl: 'user-edit.template.html',
})
export class UserEditorDialog implements OnInit {
  public user: User;
  public create = false;
  private categories: Observable<UserCategory[]>;

  public constructor(public userEditDialogRef: MdDialogRef<UserEditorDialog>,
                     public userService: UserService,
                     public userCategoryService: UserCategoryService,
                     public snackBar: MdSnackBar) {
  }

  ngOnInit(): void {
    this.categories = this.userCategoryService.findAll();
  }

  save() {
    if (this.create) {
      this.userService.create(this.user).subscribe(
          sucess => {
            this.snackBar.open("User successfully created");
            this.userEditDialogRef.close();
          },
          error => {
            this.snackBar.open("Failed to create user");
          }
      );
    } else {
      this.userService.update(this.user).subscribe(
          success => {
            this.snackBar.open("User successfully updated", "UNDO", {duration: Globals.SNACK_BAR_DURATION});
            this.userEditDialogRef.close();
          },
          error => {
            this.snackBar.open("Failed to updated user");
          }
      );
    }
  }

  cancel() {
    this.userEditDialogRef.close();
  }
}