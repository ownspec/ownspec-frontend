import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

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

  public findAll2Json(): Observable<any> {
    return this.http.get("/api/users")
        .map(r => r.json())
  }

  public findAll(): Observable<User> {
    return this.findAll2Json().map(item => this.fromJson(item));
  }
}


export class User {

  public constructor(public id: string, public username: string, public email: string) {
  }

}
