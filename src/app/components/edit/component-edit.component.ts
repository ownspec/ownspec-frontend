"use strict";
import {StateService} from "ui-router-ng2";
import {Component as C, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ComponentUpdate} from "../write/component-write.component";
import {Component} from "../../shared/service/component/component";
import {ComponentService} from "../../shared/service/component/component.service";
import {EntityReference, ReferenceService} from "../../shared/reference.service";


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


  public component: Component;
  public create: boolean;

  public editorOptions: any;

  public references: Array<EntityReference> = [];
  public userCategories: string[] = ['Analyst', 'Developer', 'Tester'];

  public constructor(private $state: StateService,
                     private componentService: ComponentService,
                     private referenceService: ReferenceService) {
    this.component = new Component("", "", "", "");
    this.editorOptions = {
      height: "200px",
      basePath: '/assets/js/ckeditor/'
    };
  }


  ngOnInit(): void {
    this.create = this.id == '_new';

    if (!this.create) {
      this.componentService.findOne(this.id, true, false, false, true).subscribe(r => this.component = r);
    } else {
      this.component = new Component("", "", this.projectId, this.componentType);
    }

    this.referenceService.findAll().subscribe(r => {
      this.references = r;
    });

  }

  public save() {

    let obs: Observable<boolean>;

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

}
