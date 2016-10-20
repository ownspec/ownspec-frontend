"use strict";


import {AbstractController} from "app/modules/commons/controllers/abstract.controller";
import {Component as C, Input, OnInit, Output, EventEmitter, NgZone} from "@angular/core";

import {Observable} from "rxjs";
import {Component, ComponentService} from "../../shared/component.service";
import {ProfilService} from "../users/profil.service";

//var LoDashStatic = require("/home/nithril/ownspec/angular2-webpack-starter-master/node_modules/@types/lodash");
//import {_} from
//import LoDashStatic = _;
//import * as _ from "lodash";
//import _ from "lodash";

//const contentTemplateUrl: any = require('./content.template.html');

@C({
  selector: 'comments',
  templateUrl: 'comments.template.html',
})
export class CommentsComponent implements OnInit {

  @Input()
  public component: Component;

  @Output()
  public update = new EventEmitter<Component>();

  public comment: string;


  public constructor(private componentService: ComponentService, private profilService: ProfilService) {
  }

  ngOnInit(): void {
  }

  public post() {
    this.componentService.postComment(this.component.id, this.comment)
      .subscribe(c => {
        this.update.emit(c);
      });
  }
}
