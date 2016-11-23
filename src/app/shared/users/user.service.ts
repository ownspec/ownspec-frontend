import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class UserService {


  public constructor(private http: Http) {

  }

  public fromJson(json: any): User {
    return new User(json.id, json.username, json.email);
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

  public getSettings() {

  }

  public getProfile() {

  }

}


export class User {

  public constructor(public id: string, public username: string, public email: string) {
  }

}
