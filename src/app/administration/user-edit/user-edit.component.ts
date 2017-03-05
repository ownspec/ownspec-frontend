import {Component} from "@angular/core";
import {MdDialogRef, MdSnackBar} from "@angular/material";
import {User} from "../../shared/model/user/user";
import {UserService} from "../../shared/service/user/user.service";

@Component({
  selector: 'user-edit-dialog',
  templateUrl: './user-edit.template.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditorDialog {
  public user: User;
  public create = false;

  public constructor(public userEditDialogRef: MdDialogRef<UserEditorDialog>,
                     public userService: UserService,
                     public snackBar: MdSnackBar) {
  }

  save() {
    if (this.create) {
      console.log("User role: " + this.user.role);
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
      this.userService.save(this.user).subscribe(
          success => {
            this.snackBar.open("User successfully updated");
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