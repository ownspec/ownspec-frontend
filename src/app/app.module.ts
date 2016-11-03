import {NgModule, ApplicationRef, Injectable} from "@angular/core";
import {BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {removeNgStyles, createNewHosts, createInputTransfer} from "@angularclass/hmr";
/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from "./environment";
// App is our top level component
import {APP_RESOLVER_PROVIDERS} from "./app.resolver";
import {AppState, InternalStateType} from "./app.service";
import {Home} from "./home";
import {About} from "./about";
import {NoContent} from "./no-content";
import {XLarge} from "./home/x-large";
import {SharedModule} from "./shared/shared.module";
import {UIView, UIRouterModule} from "ui-router-ng2";
import {MyRootUIRouterConfig} from "./router.config";
import {MAIN_STATES} from "./app.states";
import {AppComponent} from "./app.component";
import {MainSideNavComponent} from "./sidenav/main/main-sidenav.component";
import {RequirementsListComponent} from "./requirements/list/requirements-list.component";
import {Angular2DataTableModule} from "angular2-data-table";
import {MomentModule} from "angular2-moment";
import {DashboardRootComponent} from "./dashboard/dashboard-root.component";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {RequirementEditComponent} from "./requirements/edit/requirement-edit.component";
import {RequirementWriteComponent} from "./requirements/write/requirement-write.component";
import {CKEditorModule} from "./shared/ckeditor/ckeditor.component";
import {ProjectsListComponent} from "./projects/list/projects-list.component";
import {ProjectEditComponent} from "./projects/edit/project-edit.component";
import {ComponentWriteComponent} from "./components/write/component-write.component";
import {ComponentEditComponent} from "./components/edit/component-edit.component";
import {ComponentsListComponent} from "./components/list/components-list.component";
import {ProjectSideNavComponent} from "./sidenav/project/project-sidenav.component";

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import {MaterialModule} from "@angular/material";
import {MainHeaderComponent} from "./header/main-header.component";


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};


require("angular2-data-table/release/datatable.css");
require("angular2-data-table/release/material.css");



require("./css/vendor.scss");

require("./app.component.scss");
require("./shared/ckeditor/ckeditor.component.scss");

window['CKEDITOR_BASEPATH'] = "/assets/js/ckeditor/";

require("../assets/js/ckeditor/ckeditor.js");

require("hammerjs");


// TODO: temporary until https://github.com/angular/material2/issues/1457
@Injectable()
export class AppGestureConfig extends HammerGestureConfig { }


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [UIView],
  declarations: [
    AppComponent,
    About,
    Home,
    NoContent,
    XLarge,
    MainSideNavComponent,
    MainHeaderComponent,
    ProjectSideNavComponent,
    ComponentsListComponent,
    ComponentEditComponent,
    ComponentWriteComponent,
    DashboardRootComponent,

    ProjectsListComponent,
    ProjectEditComponent,


  ],
  imports: [ // import Angular's modules
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    MaterialModule,
    Angular2DataTableModule,
    CKEditorModule,
    MomentModule,
    UIRouterModule.forRoot({
      states: MAIN_STATES,
      otherwise: { state: 'app', params: {} },
      useHash: true,
      configClass: MyRootUIRouterConfig
    }),


    ModalModule.forRoot(),
    BootstrapModalModule

  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    { provide: HAMMER_GESTURE_CONFIG, useClass: AppGestureConfig }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

