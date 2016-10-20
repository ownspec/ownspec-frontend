import {Observable} from "rxjs";
import {StateService} from "angular-ui-router";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class UserService {


  public constructor(private $http: Http) {

  }

  public fromJson(json: any): User {
    return new User(json.id , json.username , json.email);
  }

}


export class User {

  public constructor(public id: string, public username: string, public email: string) {
  }

}
