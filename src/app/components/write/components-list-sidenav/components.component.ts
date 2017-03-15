"use strict";


import {Component as C, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ComponentService} from "../../../shared/service/components/component.service";
import {ProfilService} from "../service/users/profil.service";
import {Component} from "../../../shared/model/component/component";
import {TagService} from "../../../shared/service/tag.service";
import * as _ from "lodash";
import {ProfileService} from "../../../shared/service/user/profil.service";
import {ComponentVersion} from "../../../shared/model/component/component-version";
import {ComponentVersionService} from "../../../shared/service/components/component-versions.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {LinkService} from "../../../link/link.service";
import {ComponentHelperService} from "../../helper/helper";
import {EditorEvent} from "../component-write.component";


//var LoDashStatic = require("/home/nithril/ownspec/angular2-webpack-starter-master/node_modules/@types/lodash");
//import {_} from
//import LoDashStatic = _;
//import * as _ from "lodash";
//import _ from "lodash";

//const contentTemplateUrl: any = require('./content.template.html');

@C({
  selector: 'components-selection',
  styleUrls: ['components.component.scss'],
  templateUrl: 'components.template.html',
})
export class ComponentsComponent implements OnInit {

  @Input()
  public component: Component;

  public projectId: string;

  @Input()
  public editorEvent: EventEmitter<EditorEvent>;

  @Input()
  public types: string[] = [];

  @Output()
  public update = new EventEmitter<Component>();

  public components: ComponentVersion[];

  public searchQuery: string;
  private tags: any[];

  public displayMode: "tree" | "list" = "list";


  public constructor(private route: ActivatedRoute,
                     private componentVersionService: ComponentVersionService,
                     private componentHelperService: ComponentHelperService) {
  }


  ngOnInit(): void {
    Observable.combineLatest(this.route.params, this.route.data, (params, data) => ({params, data}))
      .subscribe(ap => {
        this.projectId = ap.params['projectId'];
        this.search();
      });


  }

  public dragStart(evt: any, r: ComponentVersion) {

    console.log(r);

    if (!r && !r.id) {
      return;
    }


    var dataTransfer = evt.dataTransfer;

    dataTransfer.setData('component', JSON.stringify({
      id: r.id, type: r.type, code: r.code,
      editable: r.workflowInstance.getCurrentWorkflowStatus().status.editable
    }));

    dataTransfer.setData('text/html', r.content);
  }

  public search() {
    // TODO: temporary fetch content with the list of component, to refactor because response size will be too large
    this.componentVersionService.findAll(this.projectId, !this.projectId, null, this.types, this.searchQuery, true, false, false).subscribe((components: ComponentVersion []) => {
      this.components = components.filter(c => c.id != this.component.id);

      let tree = [];
      let tags = {};

      for (let component of this.components) {
        for (let tag of component.tags) {
          if (!tags[tag]) {
            tags[tag] = {id: tag, name: tag, children: []};
            tree.push(tags[tag]);
          }
          tags[tag].children.push({id: component.id + "_" + tag, name: component.title, component: component});
        }
      }

      this.tags = tree;
      console.log(tree);
    });
  }

  public startCreateComponent() {
    this.componentHelperService.startCreateComponent(this.types[0], this.projectId).componentInstance.update.subscribe(c => {
      this.search();
    });
  }

  public edit(cv: ComponentVersion) {
    if (this.editorEvent) {
      this.editorEvent.emit(new EditorEvent(cv.id));
    }
  }


}
