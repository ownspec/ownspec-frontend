import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {User} from "../../model/user/user";
import {UserCategory} from "../../model/user/user-category";

@Injectable()
export class UserCategoryService {

  public constructor(private http: Http) {

  }

  public findAll(query): Observable<UserCategory[]> {
    let params: URLSearchParams = new URLSearchParams();
    if (!!query) {
      params.append("q", query);
    }
    return this.http.get("/api/user-categories", {search: params})
        .flatMap(r => r.json())
        .map(item => UserCategory.fromMap(item))
        .toArray();
  }

  public findOne(id): Observable<UserCategory> {
    return this.http.get("/api/user-categories/" + id)
        .map(r => UserCategory.fromMap(r.json()));
  }

  public deleteOne(id): Observable<boolean> {
    return this.http.delete("/api/user-categories/" + id)
        .map(r => r.status == 200);
  }

  public create(userCategory:UserCategory): Observable<UserCategory> {
    return this.http.post("/api/user-categories", userCategory)
        .map(r => UserCategory.fromMap(r.json()));
  }

  public update(userCategory:UserCategory): Observable<UserCategory> {
    return this.http.patch("/api/user-categories", userCategory)
        .map(r => UserCategory.fromMap(r.json()));
  }

}

