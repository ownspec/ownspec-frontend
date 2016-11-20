import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {StateService} from "ui-router-ng2";
require('./login.component.css');

@Component({
  selector: "login",
  templateUrl: "./login.template.html"
})
export class LoginComponent {

  loginFailed = false;

  constructor(private http: Http, private state: StateService) {

  }

  public token: String;

  processLogin(username:String, password:String) {
    this.http.post(
      "/api/auth/login",
      {
        "username": username,
        "password": password
      })
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
