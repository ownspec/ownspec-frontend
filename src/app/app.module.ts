import {NgModule, ApplicationRef, Injectable} from "@angular/core";
import {BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule, RequestOptions, XHRBackend, Http} from "@angular/http";
import {SharedModule} from "./shared/shared.module";
import {UIView, UIRouterModule, StateService} from "ui-router-ng2";
import {MAIN_STATES} from "./app.states";
import {AppComponent} from "./app.component";
import {MomentModule} from "angular2-moment";
import {Ng2BootstrapModule, DropdownModule} from "ng2-bootstrap";
import {CKEditorModule} from "./shared/ckeditor/ckeditor.component";
import {ProjectsListComponent} from "./projects/list/projects-list.component";
import {ProjectEditComponent} from "./projects/edit/project-edit.component";
import {ComponentWriteComponent} from "./components/write/component-write.component";
import {ComponentEditComponent} from "./components/edit/component-edit.component";
import {ComponentsListComponent} from "./components/list/components-list.component";
import {LoginComponent} from "./login/login.component";
import {MaterialModule, MdCardModule} from "@angular/material";
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
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TreeModule} from "angular2-tree-component";
import {CompleterCmpMd} from "./shared/completer-cmp-md/completer-cmp-md";

/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component


window['CKEDITOR_BASEPATH'] = "/assets/js/ckeditor/";

require("../assets/js/ckeditor/ckeditor.js");

require("hammerjs");

import '../styles/styles.scss';
import {Globals} from "./shared/globals";
import {AdministrationComponent} from "./administration/administration.component";
import {UserEditDialog} from "./administration/user-edit/user-edit.component";
import {ComponentEditGeneralComponent} from "./components/edit/general/component-edit-general.component";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {FooComponent} from "./foo.component";

// TODO: temporary until https://github.com/angular/material2/issues/1457
@Injectable()
export class AppGestureConfig extends HammerGestureConfig {
}


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'app', component: AppComponent,
    children: [
      {
        path: 'projects',
        component: ProjectsListComponent,
        //outlet: "main"
      },
      {
        path: 'projects/:id/edit',
        component: ProjectEditComponent,
        //outlet: "main"
      },
      {
        path: 'requirements',
        component: ComponentsListComponent,
        data: {componentTypes: ["REQUIREMENT"]}
      },
      {
        path: 'requirements/:id/edit',
        component: ComponentEditComponent
      },
      {
        path: 'requirements/:id/write',
        component: ComponentWriteComponent
      },
      {
        path: 'components',
        component: ComponentsListComponent,
        data: {componentTypes: ["COMPONENT"]}
      },
      {
        path: 'templates',
        component: ComponentsListComponent,
        data: {componentTypes: ["TEMPLATE"]}
      },
      {
        path: 'resources',
        component: ResourcesListComponent,
        data: {componentTypes: ["RESOURCE"]}
      },
      {
        path: 'administration',
        component: AdministrationComponent
      }
    ]

  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {path: '**', component: LoginComponent}
];


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [FooComponent],
  declarations: [
    AppComponent,
    SideNavComponent,
    MainHeaderComponent,
    WriteSideNavComponent,
    ComponentsListComponent,
    ComponentEditComponent,
    ComponentEditGeneralComponent,
    ComponentWriteComponent,
    DashboardComponent,
    AdministrationComponent,

    ResourceCreateComponent,
    ResourcesListComponent,
    ResourcesSelectionComponent,

    ProjectsListComponent,
    ProjectEditComponent,

    LoginComponent,

    CompleterCmpMd,
    UserEditDialog,

    FooComponent,
  ],

  entryComponents: [
    ResourceCreateComponent,
    UserEditDialog
  ],

  imports: [ // import Angular's modules
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    NgxDatatableModule,
    CKEditorModule,
    MomentModule,
    /*
     UIRouterModule.forRoot({
     states: MAIN_STATES,
     otherwise: {state: 'app', params: {}},
     useHash: true
     }),
     */

    RouterModule.forRoot(appRoutes),

    ChartsModule,
    DropdownModule,
    Ng2CompleterModule,
    Ng2UploaderModule,

    TreeModule,
    MdCardModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection

    BrowserDomAdapter,
    Globals,


    /*    {
     provide: Http,
     useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions) => new HttpInterceptor(xhrBackend, requestOptions),
     deps: [XHRBackend, RequestOptions]
     },*/

    {provide: HAMMER_GESTURE_CONFIG, useClass: AppGestureConfig}
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }
}

