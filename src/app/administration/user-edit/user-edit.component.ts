import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {User} from "../../shared/model/user/user";

@Component({
  selector: 'user-edit-dialog',
  templateUrl: './user-edit.template.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditDialog {
  public user: User;
  public create = false;

  public constructor(public userEditDialogRef: MdDialogRef<UserEditDialog>) {

  }
}