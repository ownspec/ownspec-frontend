"use strict";
import {Component as C, Input, OnInit} from "@angular/core";
import {ComponentUpdate} from "../write/component-write.component";
import {ComponentService} from "../../shared/service/components/component.service";
import {MdDialog, MdDialogRef, MdSnackBar} from "@angular/material";
import {ReferenceComponent} from "../../reference/reference.component";
import {ComponentReference} from "../../shared/model/component/component-reference";
import {ComponentVersion} from "../../shared/model/component/component-version";
import {ReferenceService} from "../../shared/service/reference.service";
import {ActivatedRoute} from "@angular/router";
import {ComponentVersionService} from "../../shared/service/components/component-versions.service";
import {UserCategoryService} from "../../shared/service/user/user-category.service";
import {UserCategory} from "../../shared/model/user/user-category";
import {LinkService} from "../../link/link.service";
import {Observable} from "rxjs/Observable";


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


  public constructor(public snackBar: MdSnackBar,
                     private userCategoryService: UserCategoryService,
                     public dialog: MdDialog, private componentService: ComponentService, private referenceService: ReferenceService,
                     private route: ActivatedRoute, private linkService: LinkService, private componentVersionService: ComponentVersionService) {
  }


  ngOnInit(): void {
    Observable.combineLatest(this.route.params, this.route.data, (params, data) => ({params, data}))
      .subscribe(ap => {
        console.log("change");
        this.id = ap.params['id'];
        this.projectId = ap.data['projectId'];
        this.componentType = ap.data['componentType'];
        this.fetch();
      });
  }


  private fetch() {
    this.componentVersionService.findOne(this.id, true, false, false, true).subscribe(r => {
      this.componentVersion = r;
    });
  }


  public save() {
    this.componentService.save(this.componentVersion).subscribe(r => {
      this.snackBar.open(this.componentVersion.type + " successfully updated", "Close", {duration: 2000});
    });
  }

  public onUpdate(componentUpdate: ComponentUpdate) {
    this.fetch();
  }


  public updateLatestVersion(ref: ComponentReference) {
    this.componentService.updateReference(ref.source.id, ref.id, "latest")
      .subscribe(r => {
        this.fetch();
      });
  }

  public editReference(ref: ComponentReference) {
    let a: MdDialogRef<ReferenceComponent> = this.dialog.open(ReferenceComponent, {width: "70%", height: "80%"});

    a.componentInstance.componentReference = ref;

    a.afterClosed().subscribe(r => {
      this.fetch();
    });
  }

  public gotoEditComponent(c: ComponentVersion) {
    this.linkService.gotoEditComponent(c);
  }

  public gotoWriteComponent(c: ComponentVersion = this.componentVersion) {
    this.linkService.gotoWriteComponent(c);
  }


}
