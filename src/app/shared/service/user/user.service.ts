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
    return this.http.post(
        "/api/auth/logout", ""
    );
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
    return this.http.post("/api/users/" + user.id, User.toJson(user));
  }

  public delete(user: User): Observable<any> {
    return this.http.delete("/api/users/" + user.id, {});
  }

  public findAllUserCategories(): Observable<UserCategory[]> {
    return this.http.get("/api/users/categories")
        .flatMap(r => r.json())
        .map(item => UserCategory.fromJson(item))
        .toArray();
  }

  public saveUserCategory(uc: UserCategory): Observable<any> {
    return this.http.post("/api/users/categories/" + uc.id, UserCategory.toJson(uc));
  }

  public removeUserCategory(uc: UserCategory): Observable<any> {
    return this.http.delete("/api/users/categories/" + uc.id);
  }
}

