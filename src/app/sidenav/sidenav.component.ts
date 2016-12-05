import {Component, OnInit} from "@angular/core";
import {SharedService} from "../shared/shared.service";
import {StateService} from "ui-router-ng2";
import {UserService} from "../shared/users/user.service";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */


@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.css']
})
export class SideNavComponent implements OnInit {
  private menuItems;
  private hidden;
  private stateIsInAProject = false;

  private defaultMenuItems: Array<any> = [
    {name: "Dashboard", icon: "fa-tachometer", state: "app.home.dashboard"},
    {name: "Projects", icon: "fa-folder-open-o", state: "app.home.projects"},
    {name: "Requirements", icon: "fa-tasks", state: "app.home.requirements"},
    {name: "Components", icon: "fa-plug", state: "app.home.components"},
    {name: "Templates", icon: "fa-file-text", state: "app.home.templates"},
    {name: "Resources", icon: "fa-picture-o", state: "app.home.resources"},
    {name: "Schedule", icon: "fa-calendar", state: "app.home.schedule"},
    {name: "Administration", icon: "fa-shield", state: "app.home.administration"},
  ];

  private projectMenuItems: Array<any> = [
    {name: "Dashboard", icon: "fa-tachometer", state: "app.home.project.dashboard"},
    {name: "Requirements", icon: "fa-tasks", state: "app.home.project.requirements"},
    {name: "Components", icon: "fa-plug", state: "app.home.project.components"},
    {name: "Templates", icon: "fa-file-text", state: "app.home.project.templates"},
    {name: "Resources", icon: "fa-picture-o", state: "app.home.project.resources"},
    {name: "Schedule", icon: "fa-calendar", state: "app.home.project.schedule"}
  ];

  constructor(private state: StateService,
              private sharedService: SharedService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    // Set menu items regarding current state
    this.sharedService.stateIsInAProjectEvent.subscribe(stateIsInAProject => {
      this.stateIsInAProject = stateIsInAProject;
      this.menuItems = stateIsInAProject ? this.projectMenuItems : this.defaultMenuItems;
    });

    // Subscribe to show/hide sidenav Event
    this.sharedService.hideSideNavEvent.subscribe(hide => {
      this.hidden = hide;
    });

    // Set User

  }

  goDefaultView() {
    this.state.go(this.defaultMenuItems[0].state);
  }

  goSettings() {

  }

  goProfile() {

  }

  logoutUser() {
    this.userService.logout().subscribe(
        success => {
          this.state.go("login");
        },
        error => {
          console.error("logout failed:" + error);
        }
    );
  }


}
