import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MdDialog} from "@angular/material";
import {ComponentVersion} from "../shared/model/component/component-version";

@Injectable()
export class LinkService {

  public constructor(private router: Router, private dialog: MdDialog) {

  }


  goToHomePage() {
    this.router.navigateByUrl("/dashboard");
  }

  goToLoginPage() {
    this.router.navigateByUrl("/login");
  }

  gotoEditComponent(component: ComponentVersion) {
    this.router.navigate(this.solveComponentUrlStrategy(component, "edit"));
  }

  gotoWriteComponent(component: ComponentVersion) {
    this.router.navigate(this.solveComponentUrlStrategy(component, "write"));
  }

  gotoProjectDashboard(projectId) {
    this.router.navigate(["projects", projectId, "dashboard"]);
  }

  gotoProjectEditor(projectId) {
    this.router.navigate(["projects", projectId, "edit"]);
  }

  gotoParent(route: ActivatedRoute) {
    this.router.navigate(["../../"], {relativeTo: route});
  }

  solveComponentUrlStrategy(component: ComponentVersion, action: string): string[] {
    let params = [];
    let componentType: string = component.type;

    if (component.projectId) {
      params.push("projects");
      params.push(component.projectId);
    }

    switch (componentType) {
      case "DOCUMENT": {
        params.push("documents");
        break;
      }
      case "REQUIREMENT": {
        params.push("requirements");
        break;
      }
      case "COMPONENT": {
        params.push("components");
        break;
      }
      case "TEMPLATE": {
        params.push("templates");
        break;
      }
      case "RESOURCE": {
        params.push("resources");
        break;
      }
      default: {
        return null;
      }
    }

    params.push(component.id);
    params.push(action);

    console.log(params);
    return params;
  }



}


