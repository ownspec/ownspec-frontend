import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {StateService} from "ui-router-ng2";
import {Component} from "../model/component/component";
import {Router} from "@angular/router";
import {ComponentVersion} from "./component/component-version";
import {Project} from "../model/project";

@Injectable()
export class LinkService {

  public constructor(public $http: Http, private router: Router) {

  }


  gotoHomePage() {
    this.router.navigateByUrl("/app");
  }


  gotoEditComponent(component: ComponentVersion) {

    let prefix = "/app";
    let params = {componentId: component.id};

    if (component.projectId) {
      prefix = prefix + "/project";
      params["projectId"] = component.projectId;
    }


    if (component.type == "REQUIREMENT") {
      //this.$state.go(`${prefix}.requirements.component-edit`, {componentId: component.id}, {reload: false});
      prefix = prefix + "/requirements"
    }

    if (component.type == "RESOURCE") {
      //this.$state.go(`${prefix}.resources.component-edit`, {componentId: component.id}, {reload: false});
    }
    prefix = prefix + "/" + component.id;

    this.router.navigate(["app" , "requirements" , component.id , "edit"]);



  }

  gotoWriteComponent(component: ComponentVersion) {

    let prefix = "/app";
    let params = {componentId: component.id};

    if (component.projectId) {
      prefix = prefix + "/project";
      params["projectId"] = component.projectId;
    }


    if (component.type == "REQUIREMENT") {
      //this.$state.go(`${prefix}.requirements.component-edit`, {componentId: component.id}, {reload: false});
      prefix = prefix + "/requirements"
    }

    if (component.type == "RESOURCE") {
      //this.$state.go(`${prefix}.resources.component-edit`, {componentId: component.id}, {reload: false});
    }
    prefix = prefix + "/" + component.id;

    this.router.navigate(["app" , "requirements" , component.id , "write"]);



  }

  editProject(projectId) {
    this.router.navigate(["app" , "projects" , projectId , "edit"]);
  }



}


