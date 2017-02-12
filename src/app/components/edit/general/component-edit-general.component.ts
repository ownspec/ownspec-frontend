"use strict";
import {StateService} from "ui-router-ng2";
import {Component as C, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Component} from "../../../shared/model/component/component";
import {ComponentService} from "../../../shared/service/component/component.service";
import {WorkflowInstance} from "../../../shared/model/component/workflow/workflow-instance";
import {MdDialog, MdSnackBar} from "@angular/material";
import {ComponentReference} from "../../../shared/model/component/component-reference";
import {ComponentVersion} from "../../../shared/service/component/component-version";
import {EntityReference, ReferenceService} from "../../../shared/service/reference.service";
import {LinkService} from "../../../shared/service/link.service";
import {Observable} from "rxjs";
import {ComponentVersionService} from "../../../shared/service/component/component-versions.service";
import {ComponentUpdate} from "../../write/component-write.component";


@C({
  selector: 'component-edit-general',
  templateUrl: 'component-edit-general.template.html',
  styleUrls: ['component-edit-general.component.scss']
})
export class ComponentEditGeneralComponent implements OnInit {

  @Input("componentVersion")
  public componentVersion: ComponentVersion;

  @Input("componentType")
  public componentType: string;

  @Input("projectId")
  public projectId: string;

  public tagToAdd: string;

  public create: boolean;

  public userCategories: string[] = ['Analyst', 'Developer', 'Tester'];

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  public constructor(public snackBar: MdSnackBar, public dialog: MdDialog, private componentVersionService: ComponentVersionService, private componentService: ComponentService, private referenceService: ReferenceService,
                     private linkService: LinkService) {
  }


  ngOnInit(): void {
    this.create = false;

    this.fetch();
  }


  public save() {

    console.log(this.componentVersion.requiredTest);

    let obs: Observable<any>;

    if (this.create) {
      //obs = this.componentService.create(this.componentVersion);
    } else {
      obs = this.componentVersionService.save(this.componentVersion);
    }

    obs.subscribe(r => {
      let status = this.create ? "created" : "updated";
      this.snackBar.open("Component successfully " + status, "Close", {duration:2000});
      this.update.emit(ComponentUpdate.newComponentUpdate());
    });
  }



  private fetch() {


  }

  public addNewTag($event) {
    if ($event.keyCode != 13 || !this.tagToAdd || this.tagToAdd.trim().length <= 0) {
      return;
    }
    this.componentVersion.tags.push(this.tagToAdd);
    this.tagToAdd = "";
  }


}
