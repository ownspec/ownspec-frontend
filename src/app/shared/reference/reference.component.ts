"use strict";


import {Component as C, OnInit, Output, EventEmitter} from "@angular/core";
import {ComponentService} from "../service/component/component.service";
import {ComponentUpdate} from "../../components/write/component-write.component";
import {MdDialogRef} from "@angular/material";
import {ComponentVersion} from "../service/component/component-version";
import {ComponentVersionService} from "../service/component/component-versions.service";
import {ComponentReference} from "../model/component/component-reference";

@C({
  selector: 'reference',
  templateUrl: 'reference.template.html',
  styleUrls: ['reference.component.scss']
})
export class ReferenceComponent implements OnInit {

  public componentReference: ComponentReference;
  public selectedTargetComponentVersion: ComponentVersion;
  public targetComponentVersions: ComponentVersion[];


  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  public content: string;

  public constructor(private componentService: ComponentService, private componentVersionService: ComponentVersionService, public dialog: MdDialogRef<ReferenceComponent>) {
  }

  ngOnInit(): void {
    // retrieve all version

    //this.componentVersionService.findOne(this.componentReference.source.id).subscribe(v => this.sourceComponentVersion = v);
    this.componentService.findVersions(this.componentReference.target.componentId).subscribe(v => this.targetComponentVersions = v);
  }


  fetchContent(selectedTargetComponentVersion) {
    //this.componentService.getContent(this.refComponentId, workflowInstanceId).subscribe(c => this.content = c);
    this.selectedTargetComponentVersion = selectedTargetComponentVersion;
  }

  updateReference(targetComponentVersionId) {
    this.componentService.updateReference(this.componentReference.source.id, this.componentReference.id, targetComponentVersionId)
      .subscribe(r => {
        this.dialog.close();
      });
  }


}
