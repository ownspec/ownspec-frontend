/*
 * Angular 2 decorators and services
 */
import {Component, ViewContainerRef, ViewEncapsulation} from "@angular/core";
import {SharedService} from "./shared/service/shared.service";
import {Event, NavigationEnd, Router} from "@angular/router";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,

  templateUrl: './app.component.html'
})
export class AppComponent {
  mainContentExpanded;

  constructor(private router: Router,
              private vcRef: ViewContainerRef,
              private sharedService: SharedService) {

    // Init sub-components
    this.mainContentExpanded = false;
    this.sharedService.expandMainContentAndHideSideNav(this.mainContentExpanded);
  }

  ngOnInit() {
    this.sharedService.expandMainContentEvent.subscribe(expand => {
      this.mainContentExpanded = expand;
    });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let matcher = this.router.url.match("\\/projects\\/([0-9]*).*");
        if (matcher != null && matcher.length > 1) {
          this.sharedService.stateIsInAProject(true, matcher[1]);
        } else {
          this.sharedService.stateIsInAProject(false, null);
        }
      }
    });
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
