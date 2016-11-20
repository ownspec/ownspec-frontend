"use strict";

import {Component as C} from "@angular/core";
import {StateService, StateParams} from "ui-router-ng2";
import {UserService} from "../shared/users/user.service";

require("./main-header.css");


@C({
  selector: 'main-header',
  templateUrl: 'main-header.template.html',
})
export class MainHeaderComponent {

  public constructor(private state: StateService, private stateParams: StateParams, private userService: UserService) {
  }

  logout() {
    this.userService.logout().subscribe(
      success => {
        this.state.go("login");
      },
      error => {
        console.error("logout failed:" + error);
      }
    );
  }

  goSettings() {

  }

  goProfile() {

  }

}
