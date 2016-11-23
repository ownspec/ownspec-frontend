import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {StateService} from "ui-router-ng2";
import {UserService} from "../shared/users/user.service";
require('./login.component.css');

@Component({
  selector: "login",
  templateUrl: "./login.template.html",
  styleUrls: ['']
})
export class LoginComponent {

  loginFailed = false;

  constructor(private state: StateService, private userService: UserService) {

  }

  public token: String;

  processLogin(username: String, password: String) {
    this.userService.login(username, password)
      .subscribe(
        success => {
          this.state.go("app.home.dashboard");
        },
        error => {
          this.loginFailed = true;
        }
      );
  }

}
