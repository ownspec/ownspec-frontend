"use strict";
import {Component as C, Output, EventEmitter, OnInit} from "@angular/core";
import {ComponentVersion} from "../../shared/service/component/component-version";
import {MdSnackBar, MdDialogRef} from "@angular/material";
import {Observable} from "rxjs";
import {LinkService} from "../../shared/service/link.service";
import {ComponentUpdate} from "../write/component-write.component";
import {ComponentService} from "../../shared/service/component/component.service";

@C({
  selector: 'component-create',
  templateUrl: 'component-create.template.html',
  styleUrls: ['component-create.component.scss']
})
export class ComponentCreatorDialog implements OnInit {
  public componentVersion: ComponentVersion;
  public projectId: string;
  public componentType: string;
  private tagToAdd: string;

  @Output()
  public update = new EventEmitter<ComponentUpdate>();


  public constructor(public componentCreatorDialogRef: MdDialogRef<ComponentCreatorDialog>,
                     public snackBar: MdSnackBar,
                     private componentService: ComponentService,
                     private linkService: LinkService) {
  }


  public ngOnInit(){
    this.resetForm();
  }

  public save(andContinue = false) {
    let obs: Observable<ComponentVersion> = this.componentService.create(this.componentVersion);
    obs.subscribe(createdComponentVersion => {
      if (andContinue) {
        this.resetForm();
      } else {
        this.componentCreatorDialogRef.close();
        this.linkService.gotoWriteComponent(createdComponentVersion);
      }
      this.snackBar.open(this.componentVersion.type + " successfully created", "Close", {duration: 2000});
      this.update.emit(ComponentUpdate.newComponentUpdate());
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
