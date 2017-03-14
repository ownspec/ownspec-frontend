import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "../../model/user/user";

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
    return this.http.post("/api/auth/logout", "");
  }

  public create(user: User): Observable<any> {
    return this.http.post("/api/users/new", User.toMap(user));
  }

  public confirmRegistration(token: string, password: string): Observable<any> {
    return this.http.post("api/auth/registration/confirmation/" + token, password);
  }

  public resendRegistrationConfirmationEmail(user: User): Observable<any> {
    return this.http.post("/api/auth/registration/confirmation/resend/" + user.id, {});
  }

  public changePassword(user: User, password: string) {
    return this.http.patch("/api/auth/user/" + user.id + "/password", password);
  }

  public sendChangePasswordEmail(user: User): Observable<any> {
    return this.http.post("/api/auth/user/" + user.id + "/password", {});
  }

  public getCurrent(): Observable<User> {
    return this.http.get("/api/users/me")
        .map(r => {
              return User.fromMap(r.json());
            }, e => {
              //todo: handle
            }
        )
  }

  public findAll(): Observable<User[]> {
    return this.http.get("/api/users")
        .flatMap(r => r.json())
        .map(item => User.fromMap(item))
        .toArray();
  }

  public update(user: User): Observable<any> {
    return this.http.patch("/api/users/" + user.id, User.toMap(user));
  }

  public disable(user: User): Observable<any> {
    return this.http.delete("/api/users/" + user.id, {});
  }
}

