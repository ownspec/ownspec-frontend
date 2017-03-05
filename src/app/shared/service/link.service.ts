import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentVersion} from "./component/component-version";
import {UpdateWorkflowComponent} from "../workflow/update/workflow-update.component";
import {MdDialog, MdDialogRef} from "@angular/material";
import {Observable} from "rxjs";

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

  showProject(projectId) {
    this.router.navigate(["projects", projectId]);
  }

  editProject(projectId) {
    this.router.navigate(["projects", projectId, "edit"]);
  }


  gotoParent(route: ActivatedRoute) {
    this.router.navigate(["../../"], {relativeTo: route});
  }

  solveComponentUrlStrategy(component: ComponentVersion, action: string): string[] {
    let params = [];
    let componentType: string = component.type;

    if (component.projectId) {
      params.push("project");
      params.push(component.projectId);
    }

    switch (componentType) {
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


  public openUpdateStatus(c: ComponentVersion): Observable<any> {
    let updateStatusDlg: MdDialogRef<UpdateWorkflowComponent> = this.dialog.open(UpdateWorkflowComponent);
    updateStatusDlg.componentInstance.componentVersion = c;
    return updateStatusDlg.componentInstance.update
      .map(c => {
        return {event: c, dlg: updateStatusDlg};
      });
  }

}


