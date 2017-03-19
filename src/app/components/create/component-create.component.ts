"use strict";
import {Component as C, EventEmitter, forwardRef, OnInit, Output} from "@angular/core";
import {ComponentVersion} from "../../shared/model/component/component-version";
import {MdDialogRef, MdSnackBar} from "@angular/material";
import {Observable} from "rxjs";
import {ComponentCreationEvent, ComponentUpdate} from "../write/component-write.component";
import {ComponentService} from "../../shared/service/components/component.service";
import {ComponentSnackService} from "../../service/component-snack.service";

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

  @Output()
  public update = new EventEmitter<ComponentCreationEvent>();

  public


  public constructor(public componentCreatorDialogRef: MdDialogRef<ComponentCreatorDialog>,
                     private componentService: ComponentService,
                     private componentSnackService: ComponentSnackService) {
  }


  public ngOnInit() {
    this.resetForm();
  }

  public save(andContinue = false) {
    this.componentService.create(this.componentVersion).subscribe(createdComponentVersion => {

      this.update.emit(ComponentCreationEvent.newComponentCreation(createdComponentVersion));

      if (andContinue) {
        this.resetForm();
      } else {
        this.componentCreatorDialogRef.close();
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
}
