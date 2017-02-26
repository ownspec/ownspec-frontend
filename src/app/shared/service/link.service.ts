import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentVersion} from "./component/component-version";

@Injectable()
export class LinkService {

  public constructor(private router: Router) {

  }


  goToHomePage() {
    this.router.navigateByUrl("/app/dashboard");
  }

  goToLoginPage() {
    this.router.navigateByUrl("/login");
  }

  gotoCreateComponent(projectId: string, componentType: string) {

  }


  gotoEditComponent(projectId: string, componentId: string, componentType: string) {


    let params = ["app"];


    if (projectId) {
      params.push("project");
      params.push(projectId);
    }

    if (componentType == "REQUIREMENT") {
      params.push("requirements");

    }


    params.push(componentId);
    params.push("edit");

    console.log(params);

    this.router.navigate(params);


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

    this.router.navigate(["app", "requirements", component.id, "write"]);


  }

  editProject(projectId) {
    this.router.navigate(["app", "projects", projectId, "edit"]);
  }


  gotoParent(route: ActivatedRoute) {
    this.router.navigate(["../../"], {relativeTo: route});
  }
}


