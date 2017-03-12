"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {ComponentService} from "../service/component/component.service";
import {ProfilService} from "../service/users/profil.service";
import {Component} from "../model/component/component";
import {TagService} from "../service/component/tag.service";
import * as _ from "lodash";
import {ProfileService} from "../service/user/profil.service";
import {ComponentVersion} from "../service/component/component-version";
import {ComponentVersionService} from "../service/component/component-versions.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";


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
  public types: string[] = [];

  @Output()
  public update = new EventEmitter<Component>();

  public components: ComponentVersion[];

  public searchQuery: string;
  private tags: any[];

  public displayMode: "tree" | "list" = "list";


  public constructor(private route: ActivatedRoute, private componentService: ComponentService,
                     private componentVersionService: ComponentVersionService,
                     private profileService: ProfileService, private tagService: TagService) {
  }


  ngOnInit(): void {
    Observable.combineLatest(this.route.params, this.route.data, (params, data) => ({params, data}))
        .subscribe(ap => {
          console.log("projectid ", ap.params);

          this.projectId = ap.params['projectId'];
          console.log("projectid ", ap.params, this.projectId);
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

}
