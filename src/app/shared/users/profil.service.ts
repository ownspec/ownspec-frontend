import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User, UserService} from "./user.service";

@Injectable()
export class ProfilService {

  public constructor(private $http: Http, private userService: UserService) {
  }

  public findCurrentProfile(): Observable<Profil> {
    return this.$http.get("/api/users/me/profile")
      .map(r => r.json())
      .map((item: any) => {
        let component = new Profil(this.userService.fromJson(item) , item.properties);
        return component;
      });
  }

}


export class Profil {

  public constructor(public user: User, public properties: any) {
  }

}
