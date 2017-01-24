import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Component} from "./component";
import {StateService} from "ui-router-ng2";
import {Tag} from "./tag";

@Injectable()
export class TagService {


  public constructor(private $http: Http) {

  }


  public findAll(): Observable<Tag[]> {
    let params: URLSearchParams = new URLSearchParams();


    return this.$http.get("/api/tags", {})
      .flatMap(r => r.json())
      .map(Tag.fromMap)
      .toArray();
  }


}



