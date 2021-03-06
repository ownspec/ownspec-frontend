"use strict";


import {Component as C, OnInit, Input, ApplicationRef} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {LinkService} from "../../link/link.service";
import {MdDialog} from "@angular/material";
import {ComponentVersionService} from "../../shared/service/components/component-versions.service";
import {ComponentVersion} from "../../shared/model/component/component-version";
import {ResourceCreatorComponent} from "../create/resource-create.component";
import {ComponentHelperService} from "../../components/helper/helper";


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
                     public linkService: LinkService,
                     private componentHelperService: ComponentHelperService,
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
    this.componentVersionService.findAll(this.projectId, !this.projectId, this.searchBean.title, this.availableComponentTypes, this.searchBean.query).subscribe(o => {
      this.components = o.result;
    });
  }

  public startCreateComponent() {

    let dlgRef = this.dialog.open(ResourceCreatorComponent);
    dlgRef.afterClosed().subscribe(r => {
      this.fetchComponents();
    });
  }

  public openEdit(c: ComponentVersion) {

    let dlgRef = this.dialog.open(ResourceCreatorComponent);
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


  public openUpdateStatus(c: ComponentVersion) {
    this.componentHelperService.openUpdateStatus(c).subscribe(c => {
      c.dlg.close();
      this.fetchComponents();
    });
  }


  public edit(r: ComponentVersion) {

    this.linkService.gotoEditComponent(r);
  }

}
