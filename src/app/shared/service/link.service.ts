import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {StateService} from "ui-router-ng2";
import {Component} from "./component/component";

@Injectable()
export class LinkService {

  public constructor(public $http: Http, private $state: StateService) {

  }

  gotoEditComponent(component: Component) {

    let prefix = "app.home";
    let params = {componentId: component.id};

    if (component.projectId) {
      prefix = prefix + ".project";
      params["projectId"] = component.projectId;
    }


    if (component.type == "REQUIREMENT") {
      this.$state.go(`${prefix}.requirements.component-edit`, {componentId: component.id}, {reload: false});
    }

    if (component.type == "RESOURCE") {
      this.$state.go(`${prefix}.resources.component-edit`, {componentId: component.id}, {reload: false});
    }

  }

}


