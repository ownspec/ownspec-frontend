import {ApplicationRef, Injectable, NgModule} from "@angular/core";
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {SharedModule} from "./shared/shared.module";
import {AppComponent} from "./app.component";
import {MomentModule} from "angular2-moment";
import {CKEditorModule} from "./shared/ckeditor/ckeditor.component";
import {ProjectsListComponent} from "./projects/list/projects-list.component";
import {ProjectEditComponent} from "./projects/edit/project-edit.component";
import {ComponentWriteComponent} from "./components/write/component-write.component";
import {ComponentEditComponent} from "./components/edit/component-edit.component";
import {ComponentsListComponent} from "./components/list/components-list.component";
import {LoginComponent} from "./authentication/login/login.component";
import {MaterialModule, MdCardModule} from "@angular/material";
import {WriteSideNavComponent} from "./components/write/write-sidenav.component";
import {ChartsModule} from "ng2-charts";
//import {BrowserDomAdapter} from "@angular/platform-browser/src/browser/browser_adapter";
import {SideNavComponent} from "./sidenav/sidenav.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {Ng2CompleterModule} from "ng2-completer";
import {ResourceCreatorComponent} from "./resources/create/resource-create.component";
import {ResourcesListComponent} from "./resources/list/resouces-list.component";
import {ResourcesSelectionComponent} from "./resources/selection/resources-selection.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DataTablePagerComponent, NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TreeModule} from "angular-tree-component";
import {CompleterCmpMd} from "./shared/completer-cmp-md/completer-cmp-md";
import "../styles/styles.scss";
import {Globals} from "./shared/globals";
import {AdministrationComponent} from "./administration/administration.component";
import {ComponentEditGeneralComponent} from "./components/edit/general/component-edit-general.component";
import {RouterModule} from "@angular/router";
import {FooComponent} from "./foo.component";
import {ConfirmRegistrationComponent} from "./authentication/confirm-registration/confirm-registration.component";
import {UpdateWorkflowComponent} from "./workflow/update/workflow-update.component";
import {LinkService} from "./link/link.service";
import {HttpInterceptor} from "./http/http-interceptor";
import {NgUploaderModule} from "ngx-uploader";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {ComponentCreatorDialog} from "./components/create/component-create.component";
import {CapitalizePipe} from "./shared/pipe/capitalize.pipe";
import {WorkflowComponent} from "./workflow/workflow.component";
import {CommentsComponent} from "./comment/comments.component";
import {WorkflowTableComponent} from "./workflow/workflow-table.component";
import {ComponentContentComponent} from "./components/display/component-content.component";
import {TocComponent} from "./components/write/toc/toc.component";
import {ReferenceComponent} from "./reference/reference.component";
import {ComponentSnackService} from "./service/component-snack.service";
import {ComponentHelperService} from "./components/helper/helper";
import {ComponentSideNavComponent} from "./components/write/component-edit-sidenav/component-sidenav.component";
import {ComponentsComponent} from "./components/write/components-list-sidenav/components.component";
import {UsersListComponent} from "./administration/users/list/users-list.component";
import {UserEditorDialog} from "./administration/users/edit/user-edit.component";
import {UserCategoriesListComponent} from "./administration/user-category/list/user-categories-list.component";
import {UserCategoryEditDialog} from "./administration/user-category/edit/user-category-edit.component";
import {CompanyEditComponent} from "./administration/company/edit/company-edit.component";
import {ComponentEstimationsComponent} from "./components/edit/estimation/component-estimations.component";
import {BsDropdownModule, Ng2BootstrapModule} from "ngx-bootstrap";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {APP_ROUTES} from "./router";
import {TestingModule} from "./testing/testing.module";
import {MainHeaderModule} from "./header/main-header.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ComponentImportDialog} from "./components/import/component-import.component";


/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component


window['CKEDITOR_BASEPATH'] = "/assets/js/ckeditor/";

require("../assets/js/ckeditor/ckeditor.js");

require("hammerjs");

require("expose-loader?$!jquery");
require("expose-loader?jQuery!jquery");


// TODO: temporary until https://github.com/angular/material2/issues/1457
@Injectable()
export class AppGestureConfig extends HammerGestureConfig {
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [FooComponent],
  declarations: [
    // TODO: create modules
    AppComponent,
    SideNavComponent,
    ComponentSideNavComponent,
    WriteSideNavComponent,
    ComponentsListComponent,
    ComponentEditComponent,
    ComponentEditGeneralComponent,
    ComponentEstimationsComponent,
    ComponentWriteComponent,
    DashboardComponent,


    ResourceCreatorComponent,
    ResourcesListComponent,
    ResourcesSelectionComponent,

    ProjectsListComponent,
    ProjectEditComponent,

    AuthenticationComponent,
    LoginComponent,
    ConfirmRegistrationComponent,

    CompleterCmpMd,
    ComponentCreatorDialog,
    ComponentImportDialog,


    CapitalizePipe,

    // TODO: rename
    FooComponent,

    UpdateWorkflowComponent,
    ErrorPageComponent,
    WorkflowComponent,

    CommentsComponent,
    ComponentsComponent,
    WorkflowTableComponent,
    ReferenceComponent,

    TocComponent,
    ComponentContentComponent,

    AdministrationComponent,
    UsersListComponent,
    UserEditorDialog,
    UserCategoriesListComponent,
    UserCategoryEditDialog,
    CompanyEditComponent,

  ],

  entryComponents: [
    ResourceCreatorComponent,
    UserEditorDialog,
    ComponentCreatorDialog,
    ComponentImportDialog,
    UpdateWorkflowComponent,
    ReferenceComponent,
    UserCategoryEditDialog,
    ComponentEstimationsComponent,
  ],

  imports: [ // import Angular's modules
    SharedModule,

    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    MaterialModule,

    BrowserAnimationsModule,

    FlexLayoutModule,
    NgxDatatableModule,


    CKEditorModule,
    MomentModule,

    RouterModule.forRoot(APP_ROUTES),

    ChartsModule,
    BsDropdownModule,
    Ng2CompleterModule,
    NgUploaderModule,

    TreeModule,
    MdCardModule,
    ReactiveFormsModule,

    TestingModule,
    MainHeaderModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection

    LinkService,
    ComponentHelperService,
    ComponentSnackService,
    //BrowserDomAdapter,
    Globals,

    {
      provide: Http,
      useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, linkService: LinkService) => new HttpInterceptor(xhrBackend, requestOptions, linkService),
      deps: [XHRBackend, RequestOptions, LinkService]
    },

    {provide: HAMMER_GESTURE_CONFIG, useClass: AppGestureConfig}
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }
}

