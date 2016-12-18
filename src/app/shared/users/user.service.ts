import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Project} from "../project.service";
import {Component} from "../service/component/component";

@Injectable()
export class UserService {


  public constructor(private http: Http) {

  }

  public login(username: String, password: String): Observable<any> {
    return this.http.post(
        "/api/auth/login",
        {
          "username": username,
          "password": password
        });
  }

  public logout(): Observable<any> {
    return this.http.post(
        "/api/auth/logout", ""
    );
  }

  public getCurrent(): Observable<User> {
    return this.http.get("/api/users/me")
        .map(r => {
              return User.fromJson(r.json());
            }, e => {
              //todo: handle
            }
        )
  }

  public getSettings() {

  }

  public getProfile() {

  }

  public findAll(): Observable<User[]> {
    return this.http.get("/api/users")
      .flatMap(r => r.json())
      .map(item => User.fromJson(item))
      .toArray();
  }
}


export class User {

  public constructor(public username: string,
                     public email: string,
                     public firstName: string,
                     public lastName: string,
                     public role: string) {
  }


  public static fromJson(json: any): User {
    return new User(json.username, json.email, json.firstName, json.lastName, json.role);
  }

  public static toJson(user: User): any {
    return {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };
  }
}
