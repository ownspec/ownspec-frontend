"use strict";
import {StateService} from "ui-router-ng2";
import {Component as C, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ComponentUpdate} from "../write/component-write.component";
import {Component} from "../../shared/service/component/component";
import {ComponentService} from "../../shared/service/component/component.service";
import {EntityReference, ReferenceService} from "../../shared/reference.service";
import {WorkflowStatus} from "../../shared/service/component/workflow-status";
import {WorkflowInstance} from "../../shared/service/component/workflow-instance";
import {MdDialog, MdDialogRef} from "@angular/material";
import {ReferenceComponent} from "../../shared/reference/reference.component";
import {ComponentReference} from "../../shared/service/component/component-reference";
import {ComponentVersion} from "../../shared/service/component/component-version";


@C({
  selector: 'component',
  templateUrl: 'component-edit.template.html',
  styleUrls: ['./component-edit.component.scss']
})
export class ComponentEditComponent implements OnInit {

  @Input("componentId")
  public id: string;

  @Input("componentType")
  public componentType: string;

  @Input("projectId")
  public projectId: string;

  public tagToAdd: string;


  public component: Component;
  public create: boolean;

  public editorOptions: any;

  public references: Array<EntityReference> = [];
  public userCategories: string[] = ['Analyst', 'Developer', 'Tester'];

  public workflowInstances: WorkflowInstance[] = [];
  public componentVersions: ComponentVersion[];


  public currentComponentVersion:ComponentVersion;

  public constructor(public dialog: MdDialog, private $state: StateService, private componentService: ComponentService, private referenceService: ReferenceService) {
    this.editorOptions = {
      height: "200px",
      basePath: '/assets/js/ckeditor/'
    };
  }


  ngOnInit(): void {
    this.create = this.id == '_new';

    this.fetch();
  }


  private fetch(){
    if (!this.create) {
      this.componentService.findOne(this.id, true, false, false, true).subscribe(r => {
        this.component = r;

      });
    } else {
      this.component = new Component("", "", this.projectId, this.componentType);
    }

    this.referenceService.findAll().subscribe(r => {
      this.references = r;
    });

    this.componentService.findVersions(this.id).subscribe(v => {
      this.componentVersions = v;
      this.currentComponentVersion = v[0];
    });

  }

  public save() {

    let obs: Observable<any>;

    if (this.create) {
      obs = this.componentService.create(this.component);
    } else {
      obs = this.componentService.save(this.component);
    }

    obs.subscribe(r => {
      this.$state.go("^", null, {reload: true});
    });
  }

  public onUpdate(componentUpdate: ComponentUpdate) {
    this.componentService.findOne(this.id, true, false, false, true).subscribe(r => this.component = r);
  }

  public addNewTag($event) {
    console.log($event.key + " " + this.tagToAdd);
    if ($event.keyCode != 13 || !this.tagToAdd || this.tagToAdd.trim().length <= 0) {
      return;
    }

    this.component.tags.push(this.tagToAdd);
    this.tagToAdd = "";
  }



  public updateLatestVersion(ref: ComponentReference){
    this.componentService.updateReference(this.component.id, this.component.currentWorkflowInstance.id, ref.id, ref.target.id)
      .subscribe(r => {
        this.fetch();
      });
  }

  public editReference(ref: ComponentReference) {
    let a: MdDialogRef<ReferenceComponent> = this.dialog.open(ReferenceComponent);

    a.componentInstance.componentId = this.component.id;
    a.componentInstance.workflowInstanceId = this.component.currentWorkflowInstance.id;

    a.componentInstance.refId = ref.id;
    a.componentInstance.refComponentId = ref.target.id;
    a.componentInstance.refWorkflowInstanceId = ref.targetWorkflowInstance.id;

    a.afterClosed().subscribe(r => {
      this.fetch();
    });
  }

}
