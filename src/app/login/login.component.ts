import {Component} from "@angular/core";
import {StateService} from "ui-router-ng2";
import {UserService} from "../shared/service/user/user.service";
import {SideNavComponent} from "../sidenav/sidenav.component";

@Component({
  selector: "login",
  templateUrl: "./login.template.html",
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  loginFailed = false;

  constructor(private state: StateService, private userService: UserService) {

  }

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
