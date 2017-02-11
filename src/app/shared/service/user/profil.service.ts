import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "../../model/user/user";

@Injectable()
export class ProfileService {

  public constructor(private $http: Http) {
  }

  public findCurrentProfile(): Observable<Profile> {
    return this.$http.get("/api/users/me/profile")
      .map(r => r.json())
      .map((item: any) => {
        return new Profile(User.fromMap(item) , item.properties);
      });
  }

}


export class Profile {

  public constructor(public user: User, public properties: any) {
  }

}
