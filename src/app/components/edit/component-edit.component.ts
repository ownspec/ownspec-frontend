"use strict";
import {StateService} from "ui-router-ng2";
import {Component as C, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ComponentUpdate} from "../write/component-write.component";
import {Component} from "../../shared/model/component/component";
import {ComponentService} from "../../shared/service/component/component.service";
import {WorkflowInstance} from "../../shared/model/component/workflow/workflow-instance";
import {MdDialog, MdDialogRef} from "@angular/material";
import {ReferenceComponent} from "../../shared/reference/reference.component";
import {ComponentReference} from "../../shared/model/component/component-reference";
import {ComponentVersion} from "../../shared/service/component/component-version";
import {EntityReference, ReferenceService} from "../../shared/service/reference.service";
import {LinkService} from "../../shared/service/link.service";
import {ActivatedRoute} from "@angular/router";
import {ComponentVersionService} from "../../shared/service/component/component-versions.service";


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


  public componentVersion: ComponentVersion;
  public create: boolean;

  public editorOptions: any;

  public userCategories: string[] = ['Analyst', 'Developer', 'Tester'];


  public constructor(public dialog: MdDialog, private componentService: ComponentService, private referenceService: ReferenceService,
                     private route: ActivatedRoute, private linkService: LinkService, private componentVersionService:ComponentVersionService) {
    this.editorOptions = {
      height: "200px",
      basePath: '/assets/js/ckeditor/'
    };
  }


  ngOnInit(): void {

    console.log(this.route.snapshot);

    if (this.route.snapshot.data) {
      this.id = this.route.snapshot.params['id'];
      this.projectId = this.route.snapshot.data['projectId'];
    }

    this.create = this.id == '_new';

    this.fetch();
  }


  private fetch() {
    if (!this.create) {
      this.componentVersionService.findOne(this.id, true, false, false, true).subscribe(r => {
        this.componentVersion = r;
      });

    } else {
      //this.componentVersion = new Component("", "", this.projectId, this.componentType);
    }


  }


  public save() {

    let obs: Observable<any>;

    if (this.create) {
      //obs = this.componentService.create(this.component);
    } else {
      //obs = this.componentService.save(this.component);
    }

    obs.subscribe(r => {
      //this.$state.go("^", null, {reload: true});
    });
  }

  public onUpdate(componentUpdate: ComponentUpdate) {
    //this.componentService.findOne(this.id, true, false, false, true).subscribe(r => this.component = r);
  }

  public addNewTag($event) {
    console.log($event.key + " " + this.tagToAdd);
    if ($event.keyCode != 13 || !this.tagToAdd || this.tagToAdd.trim().length <= 0) {
      return;
    }

    //this.selectedComponentVersion.tags.push(this.tagToAdd);
    this.tagToAdd = "";
  }


  public updateLatestVersion(ref: ComponentReference) {
/*    this.componentService.updateReference(this.component.id, this.component.currentWorkflowInstance.id, ref.id, ref.target.id)
      .subscribe(r => {
        this.fetch();
      });*/
  }

  public editReference(ref: ComponentReference) {
   /* let a: MdDialogRef<ReferenceComponent> = this.dialog.open(ReferenceComponent);

    a.componentInstance.componentId = this.component.id;
    a.componentInstance.workflowInstanceId = this.component.currentWorkflowInstance.id;

    a.componentInstance.refId = ref.id;
    a.componentInstance.refComponentId = ref.target.id;
    a.componentInstance.refWorkflowInstanceId = ref.targetWorkflowInstance.id;

    a.afterClosed().subscribe(r => {
      this.fetch();
    });*/
  }

  public gotoEditComponent(c: ComponentVersion) {
    this.linkService.gotoEditComponent(c);
  }


}
