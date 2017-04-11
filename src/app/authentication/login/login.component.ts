import {Component} from "@angular/core";
import {MdSnackBar} from "@angular/material";
import {Globals} from "../../shared/globals";
import {LinkService} from "../../link/link.service";
import {UserService} from "../../shared/service/user/user.service";

@Component({
  selector: "login",
  templateUrl: "./login.template.html"
})
export class LoginComponent {

  constructor(private userService: UserService,
              private linkService: LinkService,
              private snackBar: MdSnackBar) {

    userService.getCurrent().subscribe(
        s => {this.linkService.goToHomePage();},
        e => {});

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
