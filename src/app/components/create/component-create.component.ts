"use strict";
import {Component as C, EventEmitter, OnInit, Output} from "@angular/core";
import {ComponentVersion} from "../../shared/model/component/component-version";
import {MdDialogRef} from "@angular/material";
import {ComponentCreationEvent} from "../write/component-write.component";
import {ComponentService} from "../../shared/service/components/component.service";
import {ComponentSnackService} from "../../service/component-snack.service";
import {ComponentVersionService} from "../../shared/service/components/component-versions.service";
import {ComponentVersionSearchBean} from "../../shared/service/components/component-versions-search";

@C({
  selector: 'component-create',
  templateUrl: 'component-create.template.html',
  styleUrls: ['component-create.component.scss'],
})
export class ComponentCreatorDialog implements OnInit {
  public componentVersion: ComponentVersion;
  public projectId: string;
  public componentType: string;
  private tagToAdd: string;
  private templateToUse: ComponentVersion;
  private templates: ComponentVersion [] = [];

  @Output()
  public update = new EventEmitter<ComponentCreationEvent>();

  public constructor(public componentCreatorDialogRef: MdDialogRef<ComponentCreatorDialog>,
                     private componentService: ComponentService,
                     private componentVersionService: ComponentVersionService,
                     private componentSnackService: ComponentSnackService) {
    this.templateToUse = new ComponentVersion(null, null, "", null, null, null);
  }


  public ngOnInit() {
    this.resetForm();
    this.fetchTemplates();
  }

  public save(andContinue = false) {
    this.componentService.create(this.componentVersion).subscribe(createdComponentVersion => {

      this.update.emit(ComponentCreationEvent.newComponentCreation(createdComponentVersion));

      if (andContinue) {
        this.resetForm();
      } else {
        this.componentCreatorDialogRef.close();
      }

      // todo : TEMPORARY: To be done in just one request
      if (this.templateToUse.id) {
        this.componentVersionService.getContent(this.templateToUse.id).subscribe(r => {
          this.templateToUse.content = r;
          this.componentVersionService.updateContent(createdComponentVersion.id, this.templateToUse.content).subscribe(r => {
          });
        });
      }
      this.componentSnackService.notify(createdComponentVersion).onAction().subscribe(e => {
        this.componentCreatorDialogRef.close();
      });
    });
  }

  public cancel() {
    this.componentCreatorDialogRef.close();
  }

  private resetForm() {
    this.componentVersion = new ComponentVersion("_new", "", "", "", this.projectId, this.componentType);
  }

  public addNewTag($event) {
    if ($event.keyCode != 13 || !this.tagToAdd || this.tagToAdd.trim().length <= 0) {
      return;
    }
    this.componentVersion.tags.push(this.tagToAdd);
    this.tagToAdd = "";
  }


  private fetchTemplates() {
    let searchBean = new ComponentVersionSearchBean();
    searchBean.componentTypes = ['TEMPLATE'];
    this.componentVersionService.findAllBySearchBean(searchBean).subscribe(r => this.templates = r);
  }
}
