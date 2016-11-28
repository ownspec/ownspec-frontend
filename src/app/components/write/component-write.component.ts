"use strict";


import {Component as C, Input, OnInit, NgZone, OnDestroy} from "@angular/core";
import {Observable} from "rxjs";
import {ComponentService} from "../../shared/service/component/component.service";
import * as _ from "lodash";
import {AppComponent} from "../../app.component";
import {Component} from "../../shared/service/component/component";
import {SharedService} from "../../shared/shared.service";


@C({
  selector: 'component-write',
  templateUrl: 'component-write.template.html',
})
export class ComponentWriteComponent implements OnInit, OnDestroy {

  public component: Component = new Component("", "", "", "", new Date(), new Date(), "", "");

  public content: string = "FOO";

  @Input("componentId")
  public id: string;

  public editorOptions: any;

  public saved: Boolean = true;
  public lastSaveDate: Date;

  private debounced: any;

  public constructor(private zone: NgZone,
                     private componentService: ComponentService,
                     private sharedService: SharedService) {
  }


  ngOnInit(): void {

    this.sharedService.expandMainContentAndHideSideNav(true);

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
    this.sharedService.expandMainContentAndHideSideNav(false);
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
  public constructor(public properties, public content, public workflow, public comments) {

  }
}
