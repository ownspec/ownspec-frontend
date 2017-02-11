import {Component} from "@angular/core";
import {StateService} from "ui-router-ng2";
import {UserService} from "../shared/service/user/user.service";
import {SideNavComponent} from "../sidenav/sidenav.component";
import {Router} from "@angular/router";
import {LinkService} from "../shared/service/link.service";

@Component({
  selector: "login",
  templateUrl: "./login.template.html",
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  loginFailed = false;

  constructor(private userService: UserService, private linkService: LinkService) {

  }

  processLogin(username: String, password: String) {
    this.userService.login(username, password)
      .subscribe(
        success => {
          this.linkService.gotoHomePage();
        },
        error => {
          this.loginFailed = true;
        }
      );
  }

}
