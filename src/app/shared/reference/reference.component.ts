"use strict";


import {Component as C, OnInit, Output, EventEmitter} from "@angular/core";
import {ComponentService} from "../service/component/component.service";
import {ComponentUpdate} from "../../components/write/component-write.component";
import {MdDialogRef} from "@angular/material";
import {ComponentVersion} from "../service/component/component-version";

@C({
  selector: 'reference',
  templateUrl: 'reference.template.html',
  styleUrls: ['reference.component.scss']
})
export class ReferenceComponent implements OnInit {

  public componentId;
  public workflowInstanceId;

  public refId;
  public refComponentId;
  public refWorkflowInstanceId;

  public componentVersion: ComponentVersion;

  public refComponentVersions: ComponentVersion[];

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  public content: string;

  public constructor(private componentService: ComponentService, public dialog: MdDialogRef<ReferenceComponent>) {
  }

  ngOnInit(): void {
    // retrieve all version

    this.componentService.findVersion(this.componentId, this.workflowInstanceId).subscribe(v => this.componentVersion = v);
    this.componentService.findVersions(this.refComponentId).subscribe(v => this.refComponentVersions = v);
  }


  fetchContent(workflowInstanceId) {
    this.componentService.getContent(this.refComponentId, workflowInstanceId).subscribe(c => this.content = c);
  }

  updateReference(targetComponentId, targetWorkflowInstanceId){
    this.componentService.updateReference(this.componentId, this.workflowInstanceId, this.refId, this.refComponentId, targetWorkflowInstanceId)
      .subscribe(r => {
        this.dialog.close();
      });
  }


}
