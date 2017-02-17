"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone} from "@angular/core";
import {ComponentService} from "../service/component/component.service";
import {ProfilService} from "../service/users/profil.service";
import {Component} from "../model/component/component";
import {Change} from "../model/component/change";
import {ProfileService} from "../service/user/profil.service";
import {ComponentVersion} from "../service/component/component-version";
import {ComponentVersionService} from "../service/component/component-versions.service";
import {ComponentUpdate} from "../../components/write/component-write.component";
import {MdDialog, MdDialogRef} from "@angular/material";
import {UpdateWorkflowComponent} from "./update/workflow-update.component";


@C({
  selector: 'workflow',
  templateUrl: './workflow.template.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  @Input()
  public componentVersion: ComponentVersion;

  @Input()
  public canUpdateWorkflow:Boolean;

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  public targetStatus: string;

  public reason: string;
  public isopen: boolean = false;

  public statuses = [];

  public visibleStatuses = {};

  public constructor(public dialog: MdDialog,  private componentService: ComponentService, private componentVersionService: ComponentVersionService, private profileService: ProfileService) {
  }

  ngOnInit(): void {

    //this.component.currentStatus.transitions;

    this.profileService.findCurrentProfile().subscribe(p => {
      this.statuses = p.properties.statuses;
    });

  }


  public diff(change:Change){
    this.componentService.diff(this.componentVersion.id , null, change.revision).subscribe(d => {

      /*this.modal.alert()
        .size("lg")
        .showClose(true)
        .title('Diff')
        .body(d)
        .open();
*/
    });
  }


  public updateStatus(){
    let updateStatusDlg : MdDialogRef<UpdateWorkflowComponent> = this.dialog.open(UpdateWorkflowComponent);
    updateStatusDlg.componentInstance.componentVersion = this.componentVersion;
    updateStatusDlg.componentInstance.update.subscribe(c => {
      this.update.emit(c);
      updateStatusDlg.close();
    });
  }

}
