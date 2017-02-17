"use strict";
import {StateService} from "ui-router-ng2";
import {Component as C, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ComponentUpdate} from "../write/component-write.component";
import {Component} from "../../shared/model/component/component";
import {ComponentService} from "../../shared/service/component/component.service";
import {WorkflowInstance} from "../../shared/model/component/workflow/workflow-instance";
import {MdDialog, MdDialogRef, MdSnackBar} from "@angular/material";
import {ReferenceComponent} from "../../shared/reference/reference.component";
import {ComponentReference} from "../../shared/model/component/component-reference";
import {ComponentVersion} from "../../shared/service/component/component-version";
import {EntityReference, ReferenceService} from "../../shared/service/reference.service";
import {LinkService} from "../../shared/service/link.service";
import {ActivatedRoute} from "@angular/router";
import {ComponentVersionService} from "../../shared/service/component/component-versions.service";
import {UserCategoryService} from "../../shared/service/user/user-category.service";
import {UserCategory} from "../../shared/model/user/user-category";


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

  public componentVersion: ComponentVersion;

  public userCategories: UserCategory[] = [];


  public constructor(public snackBar: MdSnackBar,
                     private userCategoryService: UserCategoryService,
                     public dialog: MdDialog, private componentService: ComponentService, private referenceService: ReferenceService,
                     private route: ActivatedRoute, private linkService: LinkService, private componentVersionService: ComponentVersionService) {
  }


  ngOnInit(): void {
    if (this.route.snapshot.data) {
      console.log(this.route);
      this.id = this.route.snapshot.params['id'];
      this.projectId = this.route.snapshot.data['projectId'];
      this.componentType = this.route.snapshot.data['componentType'];
    }

    this.fetch();
  }


  private fetch() {
    this.componentVersionService.findOne(this.id, true, false, false, true).subscribe(r => {
      this.componentVersion = r;
    });

    this.userCategoryService.findAll().subscribe(r => {
      this.userCategories = r;
    });
  }


  public save() {
    this.componentService.save(this.componentVersion).subscribe(r => {
      //this.$state.go("^", null, {reload: true});
    });
  }

  public onUpdate(componentUpdate: ComponentUpdate) {
    this.fetch();
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
    this.linkService.gotoEditComponent(c.projectId, c.id, c.type);
  }


}
