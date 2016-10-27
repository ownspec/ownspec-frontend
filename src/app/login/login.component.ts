import {Component} from "@angular/core";
import {Response, Http} from "@angular/http";
require('./login.component.css');

@Component({
  selector: "login",
  templateUrl: "./login.template.html",
  // styleUrls: ["./login.component.css"]

})
export class LoginComponent{

  constructor(public http: Http) {
  }

  public token: String;

  processLogin(username: String, password: String) {
    this.http.post(
      "/api/users/login",
      {
        "username": username,
        "password": password
      })
      .map((response: Response) => this.token = response.text())
      .subscribe();
  }

}
