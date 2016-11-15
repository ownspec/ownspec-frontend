"use strict";

import {Component as C} from "@angular/core";
import {ComponentService, Component} from "../../shared/component.service";
import {StateService, StateParams} from "ui-router-ng2";

require("./main-header.css");


@C({
  selector: 'main-header',
  templateUrl: 'main-header.template.html',
})
export class MainHeaderComponent {

  public constructor(private $state: StateService, private $stateParams: StateParams) {
  }

}
