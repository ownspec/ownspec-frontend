"use strict";


import {ComponentService} from "../../shared/service/component/component.service";
import {StateService, StateParams} from "ui-router-ng2";
import {Component as C, OnInit, Input, ApplicationRef} from "@angular/core";
import {Component} from "../../shared/model/component/component";
import {MdDialog} from "@angular/material";
import {ResourceCreateComponent} from "../create/resource-create.component";
import {ComponentVersionService} from "../../shared/service/component/component-versions.service";
import {ActivatedRoute} from "@angular/router";
import {ComponentVersion} from "../../shared/service/component/component-version";
import {LinkService} from "../../shared/service/link.service";


@C({
  selector: 'resources',
  templateUrl: 'resouces-list.template.html',
  styleUrls: ['resouces-list.component.scss']
  //providers:[]
})
export class ResourcesListComponent implements OnInit {

  public components = [];

  @Input("componentTypes")
  public availableComponentTypes: string[] = [];

  @Input("projectId")
  public projectId: string = null;

  public searchBean = {title: null, query: null};


  public constructor(private route: ActivatedRoute,
                     public linkService:LinkService,
                     public dialog: MdDialog, public appRef: ApplicationRef, private componentVersionService: ComponentVersionService) {
    this.projectId = null;
  }


  ngOnInit(): void {
    if (this.route.snapshot.data) {
      this.availableComponentTypes = this.route.snapshot.data['componentTypes'];
      this.projectId = this.route.snapshot.data['projectId'];
    }


    this.fetchComponents();
  }

  private fetchComponents() {
    this.componentVersionService.findAll(this.projectId, this.searchBean.title, this.availableComponentTypes, this.searchBean.query).subscribe(o => {
      this.components = o;
    });
  }

  public edit(r: any) {
    //this.$state.go(".resource-edit", {componentId: r.id}, {reload: false});
  }

  public startCreateComponent() {

    let dlgRef = this.dialog.open(ResourceCreateComponent);
    dlgRef.afterClosed().subscribe(r => {
      this.fetchComponents();
    });
  }

  public openEdit(c:ComponentVersion){

    let dlgRef = this.dialog.open(ResourceCreateComponent);
    dlgRef.componentInstance.componentId = c.id;
    dlgRef.afterClosed().subscribe(r => {
      this.fetchComponents();
    });
  }


  public search() {
    this.fetchComponents();
  }

  public getContentUrl(c: ComponentVersion) {
    return this.componentVersionService.getContentUrl(c);
  }


  public openUpdateStatus(c:ComponentVersion){
    this.linkService.openUpdateStatus(c).subscribe(c => {
      c.dlg.close();
      this.fetchComponents();
    });
  }



}
