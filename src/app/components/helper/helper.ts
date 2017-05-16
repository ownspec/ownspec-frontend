import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {MdDialog, MdDialogRef} from "@angular/material";
import {ComponentVersion} from "../../shared/model/component/component-version";
import {UpdateWorkflowComponent} from "../../workflow/update/workflow-update.component";
import {ComponentCreatorDialog} from "../create/component-create.component";
import {ComponentImportDialog} from "../import/component-import.component";

@Injectable()
export class ComponentHelperService {

  public constructor(private router: Router, private dialog: MdDialog) {

  }

  public openUpdateStatus(c: ComponentVersion): Observable<any> {
    let updateStatusDlg: MdDialogRef<UpdateWorkflowComponent> = this.dialog.open(UpdateWorkflowComponent);
    updateStatusDlg.componentInstance.componentVersion = c;
    return updateStatusDlg.componentInstance.update
      .map(c => {
        return {event: c, dlg: updateStatusDlg};
      });
  }

  public startCreateComponent(componentType, projectId):MdDialogRef<ComponentCreatorDialog> {
    let componentCreatorDialogRef: MdDialogRef<ComponentCreatorDialog> = this.dialog.open(ComponentCreatorDialog);
    componentCreatorDialogRef.componentInstance.componentType = componentType;
    componentCreatorDialogRef.componentInstance.projectId = projectId;
    return componentCreatorDialogRef;
  }
  public startImportComponent(componentType, projectId):MdDialogRef<ComponentImportDialog> {
    let componentImportDialogRef: MdDialogRef<ComponentImportDialog> = this.dialog.open(ComponentImportDialog, {width: "70%", height: "80%"});
    componentImportDialogRef.componentInstance.componentType = componentType;
    componentImportDialogRef.componentInstance.projectId = projectId;
    return componentImportDialogRef;
  }

}


