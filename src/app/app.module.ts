import {ApplicationRef, Injectable, NgModule} from "@angular/core";
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {SharedModule} from "./shared/shared.module";
import {AppComponent} from "./app.component";
import {MomentModule} from "angular2-moment";
import {DropdownModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {CKEditorModule} from "./shared/ckeditor/ckeditor.component";
import {ProjectsListComponent} from "./projects/list/projects-list.component";
import {ProjectEditComponent} from "./projects/edit/project-edit.component";
import {ComponentWriteComponent} from "./components/write/component-write.component";
import {ComponentEditComponent} from "./components/edit/component-edit.component";
import {ComponentsListComponent} from "./components/list/components-list.component";
import {LoginComponent} from "./login/login.component";
import {MaterialModule, MdCardModule} from "@angular/material";
import {WriteSideNavComponent} from "./components/write/write-sidenav.component";
import {ChartsModule} from "ng2-charts";
import {BrowserDomAdapter} from "@angular/platform-browser/src/browser/browser_adapter";
import {SideNavComponent} from "./sidenav/sidenav.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {Ng2CompleterModule} from "ng2-completer";
import {ResourceCreatorComponent} from "./resources/create/resource-create.component";
import {ResourcesListComponent} from "./resources/list/resouces-list.component";
import {ResourcesSelectionComponent} from "./resources/selection/resources-selection.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TreeModule} from "angular2-tree-component";
import {CompleterCmpMd} from "./shared/completer-cmp-md/completer-cmp-md";
import "../styles/styles.scss";
import {Globals} from "./shared/globals";
import {AdministrationComponent} from "./administration/administration.component";
import {ComponentEditGeneralComponent} from "./components/edit/general/component-edit-general.component";
import {RouterModule, Routes} from "@angular/router";
import {FooComponent} from "./foo.component";
import {ConfirmRegistrationComponent} from "./confirm-registration/confirm-registration.component";
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
import {MainHeaderComponent} from "./header/main-header.component";
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

// TODO: split into modules
const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'auth/registration',
    component: ConfirmRegistrationComponent
  },
  {
    path: 'auth/registration/confirmation/:verificationToken',
    component: ConfirmRegistrationComponent //todo
  },
  {
    path: 'auth/change-password/user/:userId',
    component: ConfirmRegistrationComponent //todo
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '', component: AppComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        //outlet: "main"
      },
      {
        path: 'projects',
        component: ProjectsListComponent,
      },
      {
        path: 'projects/:projectId',
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
            children: []
          },
          {
            path: 'requirements',
            component: ComponentsListComponent,
            data: {componentTypes: ["REQUIREMENT"]}
          },

          {
            path: 'edit',
            component: ProjectEditComponent,
            //outlet: "main"
          },

          {
            path: 'requirements/:id/edit',
            component: ComponentEditComponent,
            data: {componentType: "REQUIREMENT"}
          },
          {
            path: 'requirements/:id/write',
            component: ComponentWriteComponent
          },

          {
            path: 'documents',
            component: ComponentsListComponent,
            data: {componentTypes: ["DOCUMENT"]}
          },
          {
            path: 'documents/:id/edit',
            component: ComponentEditComponent,
            data: {componentType: "DOCUMENT"}
          },
          {
            path: 'documents/:id/write',
            component: ComponentWriteComponent
          },

          {
            path: 'components',
            component: ComponentsListComponent,
            data: {componentTypes: ["COMPONENT"]}
          },
          {
            path: 'components/:id/edit',
            component: ComponentEditComponent,
            data: {componentType: "COMPONENT"}
          },
          {
            path: 'components/:id/write',
            component: ComponentWriteComponent
          },
          {
            path: 'resources',
            component: ResourcesListComponent,
            data: {componentTypes: ["RESOURCE"]}
          },
          {
            path: 'resources/:id/edit',
            component: ComponentEditComponent,
            data: {componentType: "RESOURCE"}

          }
        ]
      },


      {
        path: 'requirements',
        component: ComponentsListComponent,
        data: {componentTypes: ["REQUIREMENT"]}
      },
      {
        path: 'requirements/:id/edit',
        component: ComponentEditComponent,
        data: {componentType: "REQUIREMENT"}
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
        path: 'components/:id/edit',
        component: ComponentEditComponent,
        data: {componentType: "COMPONENT"}
      },
      {
        path: 'components/:id/write',
        component: ComponentWriteComponent
      },
      {
        path: 'templates',
        component: ComponentsListComponent,
        data: {componentTypes: ["TEMPLATE"]}
      },
      {
        path: 'templates/:id/edit',
        component: ComponentEditComponent,
        data: {componentType: "TEMPLATE"}
      },
      {
        path: 'templates/:id/write',
        component: ComponentWriteComponent
      },
      {
        path: 'resources',
        component: ResourcesListComponent,
        data: {componentTypes: ["RESOURCE"]}
      },
      {
        path: 'resources/:id/edit',
        component: ComponentEditComponent,
        data: {componentType: "RESOURCE"}
      },
      {
        path: 'administration',
        component: AdministrationComponent
      }
    ]

  },
  {path: '**', component: ErrorPageComponent}
];


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
    ComponentWriteComponent,
    DashboardComponent,


    ResourceCreatorComponent,
    ResourcesListComponent,
    ResourcesSelectionComponent,

    ProjectsListComponent,
    ProjectEditComponent,

    LoginComponent,
    ConfirmRegistrationComponent,

    CompleterCmpMd,
    ComponentCreatorDialog,


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

    MainHeaderComponent,

    AdministrationComponent,
    UsersListComponent,
    UserEditorDialog,
    UserCategoriesListComponent,
    UserCategoryEditDialog,
    CompanyEditComponent

  ],

  entryComponents: [
    ResourceCreatorComponent,
    UserEditorDialog,
    ComponentCreatorDialog,
    UpdateWorkflowComponent,
    ReferenceComponent,
    UserCategoryEditDialog,
  ],

  imports: [ // import Angular's modules
    SharedModule,


    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    MaterialModule,
    FlexLayoutModule,
    NgxDatatableModule,
    CKEditorModule,
    MomentModule,

    RouterModule.forRoot(appRoutes),

    ChartsModule,
    DropdownModule,
    Ng2CompleterModule,
    NgUploaderModule,

    TreeModule,
    MdCardModule,
    ReactiveFormsModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection

    LinkService,
    ComponentHelperService,
    ComponentSnackService,
    BrowserDomAdapter,
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

