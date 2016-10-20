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
  selector: 'components-selection',
  templateUrl: 'components.template.html',
})
export class ComponentsComponent implements OnInit {

  @Input()
  public component: Component;

  @Output()
  public update = new EventEmitter<Component>();

  public components: Component[];


  public constructor(private componentService: ComponentService, private profilService: ProfilService) {
  }

  ngOnInit(): void {
    this.componentService.findAll(null).subscribe(components => {
      this.components = components;
    });

  }

  public dragStart(evt: any, r: Component) {
    var dataTransfer = evt.dataTransfer;
    dataTransfer.setData('componentId', r.id);
    dataTransfer.setData('text/html', r.content);
  }


}
