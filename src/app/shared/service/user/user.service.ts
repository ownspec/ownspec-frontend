import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "../../model/user/user";
import {UserCategory} from "../../model/user/user-category";

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

  public confirmRegistration(confirmationToken: string, password: string): Observable<any> {
    return this.http.post("api/auth/registrationConfirmation/" + confirmationToken, password);
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

  public save(user: User): Observable<any> {
    return this.http.post("/api/users/" + user.id, User.toMap(user));
  }

  public delete(user: User): Observable<any> {
    return this.http.delete("/api/users/" + user.id, {});
  }

  public findAllUserCategories(): Observable<UserCategory[]> {
    return this.http.get("/api/users/categories")
        .flatMap(r => r.json())
        .map(item => UserCategory.fromMap(item))
        .toArray();
  }

  public saveUserCategory(uc: UserCategory): Observable<any> {
    return this.http.post("/api/users/categories/" + uc.id, UserCategory.toMap(uc));
  }

  public removeUserCategory(uc: UserCategory): Observable<any> {
    return this.http.delete("/api/users/categories/" + uc.id);
  }
}

