import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "../../model/user/user";
import {UserCategory} from "../../model/user/user-category";

@Injectable()
export class UserCategoryService {

  public constructor(private http: Http) {

  }

  public findAll(): Observable<UserCategory[]> {
    return this.http.get("/api/user-categories")
        .flatMap(r => r.json())
        .map(item => UserCategory.fromMap(item))
        .toArray();
  }

}

