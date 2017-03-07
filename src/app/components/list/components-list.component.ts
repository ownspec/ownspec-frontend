"use strict";


import {ComponentService} from "../../shared/service/component/component.service";
import {Component as C, OnInit, Input, ApplicationRef} from "@angular/core";
import {ComponentVersionService} from "../../shared/service/component/component-versions.service";
import {ComponentVersion} from "../../shared/service/component/component-version";
import {ActivatedRoute} from "@angular/router";
import {LinkService} from "../../shared/service/link.service";
import {MdDialog, MdDialogRef} from "@angular/material";
import {ComponentCreatorDialog} from "../create/component-create.component";
import {Observable} from "rxjs";


/*
 OpaqueToken

 export var parentProvider = {
 provide: Parent,
 useExisting: forwardRef(function () { return Parent; })
 };

 */


@C({
  selector: 'components',
  templateUrl: 'components-list.template.html',
  styleUrls: ['./components-list.component.scss']
  //providers:[]
})
export class ComponentsListComponent implements OnInit {

  public components: ComponentVersion[] = [];

  @Input("componentTypes")
  public componentTypes: string[] = [];

  @Input("projectId")
  public projectId: string;

  public searchBean = {title: null, query: null};


  public constructor(public appRef: ApplicationRef,
                     public dialog: MdDialog,
                     private route: ActivatedRoute,
                     public linkService: LinkService,
                     private componentService: ComponentService,
                     private componentVersionService: ComponentVersionService) {
    this.projectId = null;
  }


  ngOnInit(): void {
    Observable.combineLatest(this.route.params, this.route.data, (params, data) => ({ params, data }))
      .subscribe( ap => {
      this.projectId = ap.params['projectId'];
      this.componentTypes = ap.data['componentTypes'];
      this.fetchComponents();
    });
  }

  private fetchComponents() {
    this.componentVersionService.findAll(this.projectId, this.searchBean.title, this.componentTypes, this.searchBean.query).subscribe(o => {
      this.components = o;
    });
  }

  public edit(r: ComponentVersion) {

    this.linkService.gotoEditComponent(r);
  }

  public write(r: any) {
    //this.$state.go(".component-write", {componentId: r.id}, {reload: false});
  }

  public print(c: ComponentVersion) {
    this.componentVersionService.print(c);
  }

  public startCreateComponent() {
    let componentCreatorDialogRef: MdDialogRef<ComponentCreatorDialog> = this.dialog.open(ComponentCreatorDialog);
    componentCreatorDialogRef.componentInstance.componentType = this.componentTypes[0];
    componentCreatorDialogRef.componentInstance.projectId = this.projectId;
    componentCreatorDialogRef.componentInstance.update.subscribe(c => {
      this.fetchComponents();
    });
  }

  public search() {
    this.fetchComponents();
  }

  addVisit(componentId: number) {
    this.componentService.addVisit(componentId);
  }


  public openUpdateStatus(c: ComponentVersion) {
    this.linkService.openUpdateStatus(c).subscribe(c => {
      c.dlg.close();
      this.fetchComponents();
    });
  }


}
