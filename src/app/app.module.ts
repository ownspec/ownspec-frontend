import {NgModule, ApplicationRef, Injectable} from "@angular/core";
import {BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule, RequestOptions, XHRBackend, Http} from "@angular/http";
import {SharedModule} from "./shared/shared.module";
import {UIView, UIRouterModule, StateService} from "ui-router-ng2";
import {MyRootUIRouterConfig} from "./router.config";
import {MAIN_STATES} from "./app.states";
import {AppComponent} from "./app.component";
import {Angular2DataTableModule} from "angular2-data-table";
import {MomentModule} from "angular2-moment";
import {Ng2BootstrapModule, DropdownModule} from "ng2-bootstrap";
import {CKEditorModule} from "./shared/ckeditor/ckeditor.component";
import {ProjectsListComponent} from "./projects/list/projects-list.component";
import {ProjectEditComponent} from "./projects/edit/project-edit.component";
import {ComponentWriteComponent} from "./components/write/component-write.component";
import {ComponentEditComponent} from "./components/edit/component-edit.component";
import {ComponentsListComponent} from "./components/list/components-list.component";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {LoginComponent} from "./login/login.component";
import {MaterialModule} from "@angular/material";
import {MainHeaderComponent} from "./header/main-header.component";
import {WriteSideNavComponent} from "./components/write/write-sidenav.component";
import {ChartsModule} from "ng2-charts";
import {HttpInterceptor} from "./shared/http/http-interceptor";
import {BrowserDomAdapter} from "@angular/platform-browser/src/browser/browser_adapter";
import {SideNavComponent} from "./sidenav/sidenav.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {Ng2CompleterModule} from "ng2-completer";
import {Ng2UploaderModule} from "ng2-uploader";
import {ResourceCreateComponent} from "./resources/create/resource-create.component";
import {ResourcesListComponent} from "./resources/list/resouces-list.component";
import {ResourcesSelectionComponent} from "./resources/selection/resources-selection.component";
import {ResizableModule} from "angular-resizable-element";
import {FlexLayoutModule} from "@angular/flex-layout";

/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component


require("angular2-data-table/release/datatable.css");
require("angular2-data-table/release/material.css");



//require("./css/vendor.scss");

//require("./app.component.scss");
//require("./shared/ckeditor/ckeditor.component.scss");

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
    SideNavComponent,
    MainHeaderComponent,
    WriteSideNavComponent,
    ComponentsListComponent,
    ComponentEditComponent,
    ComponentWriteComponent,
    DashboardComponent,


    ResourceCreateComponent,
    ResourcesListComponent,
    ResourcesSelectionComponent,

    ProjectsListComponent,
    ProjectEditComponent,

    LoginComponent


  ],

  entryComponents : [
    ResourceCreateComponent,
  ],

  imports: [ // import Angular's modules
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    Angular2DataTableModule,
    CKEditorModule,
    MomentModule,
    UIRouterModule.forRoot({
      states: MAIN_STATES,
      otherwise: { state: 'app', params: {} },
      useHash: true,
      configClass: MyRootUIRouterConfig
    }),

    ResizableModule,

    ModalModule.forRoot(),
    BootstrapModalModule,
    ChartsModule,
    DropdownModule,
    Ng2CompleterModule,
    Ng2UploaderModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection

    BrowserDomAdapter,

    {
      provide: Http,
      useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, $state: StateService) => new HttpInterceptor(xhrBackend, requestOptions, $state),
      deps: [XHRBackend, RequestOptions, StateService]
    },

    { provide: HAMMER_GESTURE_CONFIG, useClass: AppGestureConfig }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
}

