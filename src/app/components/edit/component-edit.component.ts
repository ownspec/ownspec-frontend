"use strict";
import {EntityReference, ReferenceService} from "../../shared/reference.service";
import {ComponentHistory, Component, ComponentService} from "../../shared/component.service";
import {StateService, StateParams} from "ui-router-ng2";
import {Component as C, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";

@C({
  selector: 'component',
  templateUrl: 'component-edit.component.html',
})
export class ComponentEditComponent implements OnInit {

  @Input("componentId")
  public id: string;

  public component: Component;
  public create: boolean;

  public editorOptions: any;

  public histories: Array<ComponentHistory> = [];
  public references: Array<EntityReference> = [];


  public constructor(private $state: StateService, private componentService: ComponentService, private referenceService: ReferenceService) {


    this.component = new Component("", "", "", new Date(), new Date(), "", "REQUIREMENT");
    this.editorOptions = {
      height: "200px",
      basePath: '/assets/js/ckeditor/'
    };
  }


  ngOnInit(): void {
    this.create = this.id == '_new';

    if (!this.create) {
      this.componentService.findOne(this.id, true).subscribe(r => this.component = r);
    } else {
      this.component = new Component("", "", "", new Date(), new Date(), "", "REQUIREMENT");
    }

    /*        this.entityHistoryService.findAll().subscribe(r => {
     this.histories = r
     });*/

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


}
