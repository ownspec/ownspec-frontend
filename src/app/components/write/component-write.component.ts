"use strict";


import {AbstractController} from "app/modules/commons/controllers/abstract.controller";
import {Component as C, Input, OnInit, NgZone, EventEmitter, OnDestroy} from "@angular/core";
import {Observable} from "rxjs";
import {Component, ComponentService} from "../../shared/component.service";
import * as _ from "lodash";
import {ComponentEvent} from "typedoc/lib/utils/component";


@C({
  selector: 'component-write',
  templateUrl: 'component-write.template.html',
})
export class ComponentWriteComponent implements OnInit, OnDestroy {

  public component: Component = new Component("","","","",new Date() , new Date(),"");

  public content: string = "FOO";


  @Input("componentId")
  public id: string;

  public editorOptions: any;

  public saved: Boolean = true;
  public lastSaveDate: Date;

  private debounced: any;

  public constructor(private zone: NgZone, public componentService: ComponentService) {

  }


  ngOnInit(): void {
    this.componentService.findOne(this.id, true, true, true).subscribe(r => {
      this.component = r;
      this.content = r.content;
    });


    var that = this;
    this.debounced = _.debounce(function () {
      this.zone.run(() => {
        that.autoSave();
      });
    }, 5000, {maxWait: 10000});

  }


  ngOnDestroy(): void {
    // TODO: clear timer to avoid save after a close
  }

  public autoSave() {
    this.updateContent().subscribe(r => {
      this.lastSaveDate = new Date();
      this.saved = true;
      this.component = r;
    });
  }


  public saveAndClose() {
    this.updateContent().subscribe(r => {
      //this.$state.go("^", null, {reload: true});
    });
  }


  private updateContent(): Observable<Component> {
    return this.componentService.updateContent(this.component.id, this.content);
  }


  public viewContent() {

  }

  public onChange($event) {
    this.saved = false;
    this.debounced();
  }

  public onReady($event) {
    console.log("onReady");
  }

  public onUpdate(event: ComponentUpdate) {
    this.componentService.findOne(this.id, true, true, true).subscribe(r => {
      this.component = r;
    });
  }

}


export class ComponentUpdate {
  public constructor(public properties, public content, public workflow, public comments){

  }
}
