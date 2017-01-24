/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';

import {Overlay} from "angular2-modal";
import {SharedService} from "./shared/service/shared.service";
import {UIRouter} from "ui-router-ng2";

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
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  mainContentExpanded;

  constructor(private overlay: Overlay,
              private vcRef: ViewContainerRef,
              private sharedService: SharedService,
              private router: UIRouter) {
    overlay.defaultViewContainer = vcRef;

    // Init sub-components
    this.mainContentExpanded = false;
    this.sharedService.expandMainContentAndHideSideNav(this.mainContentExpanded);
  }

  ngOnInit() {
    console.log('Initial App State');
    this.sharedService.expandMainContentEvent.subscribe(expand => {
      this.mainContentExpanded = expand;
    });

    this.router.globals.success$.subscribe(() => {
      this.sharedService.stateIsInAProject(this.router.stateService.$current.name.startsWith("app.home.project."));
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
