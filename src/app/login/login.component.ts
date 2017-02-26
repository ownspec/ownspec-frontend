import {Component} from "@angular/core";
import {UserService} from "../shared/service/user/user.service";
import {LinkService} from "../shared/service/link.service";
import {MdSnackBar} from "@angular/material";
import {Globals} from "../shared/globals";

@Component({
  selector: "login",
  templateUrl: "./login.template.html",
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  constructor(private userService: UserService,
              private linkService: LinkService,
              private snackBar: MdSnackBar) {

  }


  login(username: String, password: String) {
    this.userService.login(username, password)
        .subscribe(
            success => {
              this.linkService.goToHomePage();
            },
            error => {
              this.snackBar.open("LOGIN FAILED", "", {duration: Globals.SNACK_BAR_DURATION});
            }
        );
  }

}
