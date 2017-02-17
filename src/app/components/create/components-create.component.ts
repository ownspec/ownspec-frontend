"use strict";


import {ComponentService} from "../../shared/service/component/component.service";
import {StateService, StateParams} from "ui-router-ng2";
import {Component as C, OnInit, Input, ApplicationRef} from "@angular/core";
import {Component} from "../../shared/model/component/component";
import {ComponentVersionService} from "../../shared/service/component/component-versions.service";
import {ComponentVersion} from "../../shared/service/component/component-version";
import {ActivatedRoute} from "@angular/router";
import {LinkService} from "../../shared/service/link.service";
import {MdDialog, MdDialogRef} from "@angular/material";
import {ResourceCreateComponent} from "../../resources/create/resource-create.component";
import {ComponentEditGeneralComponent} from "../edit/general/component-edit-general.component";


/*
 OpaqueToken

 export var parentProvider = {
 provide: Parent,
 useExisting: forwardRef(function () { return Parent; })
 };

 */


@C({
  selector: 'components',
  templateUrl: 'components-create.template.html',
  styleUrls: ['component-create.component.scss']
  //providers:[]
})
export class ComponentsListComponent implements OnInit {

  public components: ComponentVersion[] = [];

  @Input("componentTypes")
  public availableComponentTypes: string[] = [];

  //@Input("projectId")
  public projectId: string = null;

  public searchBean = {title: null, query: null};


  public constructor(public appRef: ApplicationRef, public dialog: MdDialog, private route: ActivatedRoute, public linkService:LinkService,
                     private componentService: ComponentService, private componentVersionService: ComponentVersionService) {
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

  public edit(r: ComponentVersion) {

    this.linkService.gotoEditComponent(r.projectId, r.id, r.type);
  }

  public write(r: any) {
    //this.$state.go(".component-write", {componentId: r.id}, {reload: false});
  }

  public print(c: Component) {
    this.componentService.print(c);
  }

  public startCreateComponent() {

    let d : MdDialogRef<ComponentEditGeneralComponent> = this.dialog.open(ComponentEditGeneralComponent);

    d.afterClosed().subscribe(r => {
      this.fetchComponents();
    });

    d.componentInstance.componentVersion = new ComponentVersion("_new", "","", null, "REQUIREMENT");
    d.componentInstance.create = true;
    d.componentInstance.update.subscribe(e => {
      d.close();
    });



    //this.linkService.gotoEditComponent(null, "_new", "requirements");
    //this.$state.go(".component-edit", {componentId: "_new"}, {reload: false});
  }

  public search() {
    this.fetchComponents();
  }

  addVisit(componentId: number) {
    this.componentService.addVisit(componentId);
  }

}
