"use strict";


import {
  Component as C, Input, OnInit, NgZone, OnDestroy, ViewChild, animate, transition, style,
  state, trigger
} from "@angular/core";
import {Observable} from "rxjs";
import {ComponentService} from "../../shared/service/component/component.service";
import * as _ from "lodash";
import {AppComponent} from "../../app.component";
import {Component} from "../../shared/model/component/component";
import {SharedService} from "../../shared/service/shared.service";
import {TocGenerator, TocItem} from "../../shared/ckeditor/toc-generator";
import {CKEditorComponent} from "../../shared/ckeditor/ckeditor.component";
import {ComponentVersion} from "../../shared/service/component/component-version";
import {LinkService} from "../../shared/service/link.service";
import {ActivatedRoute} from "@angular/router";
import {ComponentVersionService} from "../../shared/service/component/component-versions.service";


@C({
  selector: 'component-write',
  templateUrl: 'component-write.template.html',
  styleUrls: ['./component-write.component.scss'],

})
export class ComponentWriteComponent implements OnInit, OnDestroy {

  public component: ComponentVersion = null;

  public content: string = "FOO";
  public toc: string = "FOO";
  public tocItems: TocItem[] = [];

  @Input("componentId")
  public id: string;

  @ViewChild("ckeditor")
  public ckeditor:CKEditorComponent;

  public editorOptions: any;

  public saved: Boolean = true;
  public lastSaveDate: Date;

  private debounced: any;
  private debouncedToc: any;

  menuState: string = 'in';

  public constructor(private zone: NgZone, private route: ActivatedRoute, public linkService:LinkService,
                     private componentVersionService: ComponentVersionService,
                     private sharedService: SharedService) {
  }


  ngOnInit(): void {
    if (this.route.snapshot.data) {
      this.id = this.route.snapshot.params['id'];
    }

    this.sharedService.expandMainContentAndHideSideNav(true);

    this.componentVersionService.findOne(this.id, true, true, true).subscribe(r => {
      this.component = r;
    });

    this.componentVersionService.getContent(this.id).subscribe(r => {
      this.content = r;
    });





    var that = this;
    this.debounced = _.debounce(function () {
      this.zone.run(() => {
        that.autoSave();
      });
    }, 5000, {maxWait: 10000});

    this.debouncedToc = _.debounce(function () {
      this.zone.run(() => {
        //that.computeToc();
      });
    }, 1000, {maxWait: 2000});

  }


  ngOnDestroy(): void {
    this.sharedService.expandMainContentAndHideSideNav(false);
    // TODO: clear timer to avoid save after a close
  }


  public autoSave() {
    this.updateContent().subscribe(r => {
      this.lastSaveDate = new Date();
      this.saved = true;
      //this.component = r;



    });
  }

  public computeToc(){
    let tocGenerator = new TocGenerator();
    this.toc = tocGenerator.generateFromString(this.content);
    this.tocItems = tocGenerator.tocItems;
  }

  public saveAndClose() {
    this.updateContent().subscribe(r => {
      //this.$state.go("^", null, {reload: true});
    });
  }


  private updateContent(): Observable<ComponentVersion> {
    return this.componentVersionService.updateContent(this.component.id, this.content);
  }


  public viewContent() {

  }

  public onChange($event) {
    this.saved = false;
    this.debounced($event);
  }

  public tocChange($event) {
    this.tocItems = $event;
  }


  public composePdf($event) {
    //this.componentVersionService.print(this.component);
  }

  public onReady($event) {
    console.log("onReady");
  }

  public onUpdate(event: ComponentUpdate) {
    this.componentVersionService.findOne(this.id, true, true, true).subscribe(r => {
      this.component = r;
    });
  }

  public gotoTocItem(tocItem:TocItem){
    this.ckeditor.gotoTocItem(tocItem.id);
  }

}


export class ComponentUpdate {
  public constructor(public properties, public content, public workflow, public comments) {

  }

  public static newComponentUpdate():ComponentUpdate{
    return new ComponentUpdate(false, false, false,false);
  }

}
