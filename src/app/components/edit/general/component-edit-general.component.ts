"use strict";
import {StateService} from "ui-router-ng2";
import {Component as C, Input, OnInit} from "@angular/core";
import {Component} from "../../../shared/model/component/component";
import {ComponentService} from "../../../shared/service/component/component.service";
import {WorkflowInstance} from "../../../shared/model/component/workflow/workflow-instance";
import {MdDialog} from "@angular/material";
import {ComponentReference} from "../../../shared/model/component/component-reference";
import {ComponentVersion} from "../../../shared/service/component/component-version";
import {EntityReference, ReferenceService} from "../../../shared/service/reference.service";
import {LinkService} from "../../../shared/service/link.service";
import {Observable} from "rxjs";


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


  public constructor(public dialog: MdDialog, private componentService: ComponentService, private referenceService: ReferenceService,
                     private linkService: LinkService) {
  }


  ngOnInit(): void {
    this.create = false;

    this.fetch();
  }


  public save() {

    let obs: Observable<any>;

    if (this.create) {
      //obs = this.componentService.create(this.componentVersion);
    } else {
      obs = this.componentService.save(this.componentVersion);
    }

    obs.subscribe(r => {
      //this.$state.go("^", null, {reload: true});
    });
  }



  private fetch() {


  }


}
