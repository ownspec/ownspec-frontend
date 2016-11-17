import {Observable} from "rxjs";
import {StateService} from "angular-ui-router";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class UserService {


  public constructor(private http: Http) {

  }

  public fromJson(json: any): User {
    return new User(json.id, json.username, json.email);
  }

  public login(username: String, password: String): Observable {
    return this.http.post(
      "/api/users/login",
      {
        "username": username,
        "password": password
      });
  }

  public logout(): Observable {
    return this.http.post(
      "/api/users/logout", ""
    );
  }

  public getSettings() {

  }

  public getProfile() {

  }

}


export class User {

  public constructor(public id: string, public username: string, public email: string) {
  }

}
