import {Component, OnInit} from "@angular/core";
import {SharedService} from "../shared/service/shared.service";
import {StateSelector} from "ui-router-visualizer";
import {User} from "../shared/model/user/user";
import {UserService} from "../shared/service/user/user.service";
import {LinkService} from "../shared/service/link.service";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */


@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.scss']
})
export class SideNavComponent implements OnInit {
  private menuItems;
  private hidden;
  private stateIsInAProject = false;
  private activeUser = new User();

  public defaultMenuItems: Array<any> = [
    {name: "Dashboard", icon: "fa-tachometer", state: "/dashboard"},
    {name: "Projects", icon: "fa-folder-open-o", state: "/projects"},
    {name: "Requirements", icon: "fa-tasks", state: "/requirements"},
    {name: "Components", icon: "fa-plug", state: "/components"},
    {name: "Templates", icon: "fa-file-text", state: "/templates"},
    {name: "Resources", icon: "fa-picture-o", state: "/resources"},
    {name: "Administration", icon: "fa-shield", state: "/administration"},
  ];

  private projectMenuItems: Array<any> = [
    {name: "Dashboard", icon: "fa-tachometer", state: "app.home.project.dashboard"},
    {name: "Documents", icon: "fa-file-text-o ", state: "app.home.project.documents"},
    {name: "Requirements", icon: "fa-tasks", state: "app.home.project.requirements"},
    {name: "Templates", icon: "fa-file-text", state: "app.home.project.templates"},
    {name: "Resources", icon: "fa-picture-o", state: "app.home.project.resources"},
    {name: "Schedule", icon: "fa-calendar", state: "app.home.project.schedule"}
  ];

  constructor(private sharedService: SharedService,
              private userService: UserService,
              private linkService: LinkService) {

    this.menuItems = this.defaultMenuItems;

    /*this.sharedService.stateIsInAProjectEvent.subscribe(stateIsInAProject => {
     this.stateIsInAProject = stateIsInAProject;
     this.menuItems = stateIsInAProject ? this.projectMenuItems : this.defaultMenuItems;
     });*/
  }

  ngOnInit(): void {
    // Set menu items regarding current state
    /*    this.sharedService.stateIsInAProjectEvent.subscribe(stateIsInAProject => {
     this.stateIsInAProject = stateIsInAProject;
     this.menuItems = stateIsInAProject ? this.projectMenuItems : this.defaultMenuItems;
     });*/

    // Subscribe to show/hide sidenav Event
    this.sharedService.hideSideNavEvent.subscribe(hide => {
      this.hidden = hide;
    });

    // Set User
    this.userService.getCurrent().subscribe((user: User) => {
      this.activeUser = user
    });

  }

  public goToHomePage() {
    this.linkService.goToHomePage();
    //this.state.go(this.defaultMenuItems[0].state);
  }

  openSettingsDialog() {

  }

  openProfileDialog() {

  }

  logoutUser() {
    this.userService.logout().subscribe(
        success => {
          this.linkService.goToLoginPage();
        },
        error => {
          console.error("logout failed:" + error);
        }
    );
  }


}
