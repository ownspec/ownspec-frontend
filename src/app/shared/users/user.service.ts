import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

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
  public fullName: string;
  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public role: string;

  public constructor() {
  }


  public static fromJson(json: any): User {
    let user: User = new User();
    user.username = json.username;
    user.email = json.email;
    user.firstName = json.firstName;
    user.lastName = json.lastName;
    user.fullName = user.firstName + " " + user.lastName;
    user.role = json.role;
    return user;
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
