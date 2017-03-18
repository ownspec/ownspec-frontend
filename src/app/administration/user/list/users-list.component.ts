import {OnInit, Component} from "@angular/core";
import {UserEditorDialog} from "../edit/user-edit.component";
import {UserService} from "../../../shared/service/user/user.service";
import {User} from "../../../shared/model/user/user";
import {MdDialog, MdSnackBar, MdDialogRef} from "@angular/material";
import {CompanyService} from "../../../shared/service/company.service";
import {Globals} from "../../../shared/globals";


@Component({
  selector: 'users-list',
  templateUrl: 'users-list.template.html',
  entryComponents: [UserEditorDialog]
})
export class UsersListComponent implements OnInit {
  private users: User[] = [];

  public constructor(private userService: UserService,
                     private companyService: CompanyService,
                     private snackBar: MdSnackBar,
                     private dialog: MdDialog) {

  }

  ngOnInit(): void {
    this.fetchUsers();
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

  sendChangePasswordEmail(user: User) {
    this.userService.sendChangePasswordEmail(user).subscribe(r => {
      this.snackBar.open("Change password request successfully register", "x", {duration: Globals.SNACK_BAR_DURATION});
    }, e => {
      this.snackBar.open("Failed to register a password change request", "x", {duration: Globals.SNACK_BAR_DURATION});
    });
  }

  enable(user: User) {
    user.enabled = true;
    this.userService.update(user).subscribe(r => {
      this.snackBar.open("User successfully enabled", "x", {duration: Globals.SNACK_BAR_DURATION});
      this.fetchUsers();
    }, e => {
      this.snackBar.open("Failed to enable user", "x", {duration: Globals.SNACK_BAR_DURATION});
    });
  }

  disable(user: User) {
    this.userService.disable(user).subscribe();
  }

  resendRegistrationConfirmationEmail(user: User) {
    this.userService.resendRegistrationConfirmationEmail(user).subscribe();
  }

}