import {LoginComponent} from "./authentication/login/login.component";
import {Routes} from "@angular/router";
import {ConfirmRegistrationComponent} from "./authentication/confirm-registration/confirm-registration.component";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProjectsListComponent} from "./projects/list/projects-list.component";
import {ComponentsListComponent} from "./components/list/components-list.component";
import {ProjectEditComponent} from "./projects/edit/project-edit.component";
import {ComponentEditComponent} from "./components/edit/component-edit.component";
import {ComponentWriteComponent} from "./components/write/component-write.component";
import {ResourcesListComponent} from "./resources/list/resouces-list.component";
import {AdministrationComponent} from "./administration/administration.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {TestingComponent} from "./testing/components/testing.component";
import {CampaignEditComponent} from "./testing/components/campaign/edit/campaign.edit.component";
import {CampaignRunComponent} from "./testing/components/campaign/run/campaign.run.component";
import {TestCaseEditComponent} from "./testing/components/test-case/edit/test-case.edit.component";


export const APP_ROUTES: Routes = [
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

          },
          {
            path: 'testing',
            component: TestingComponent,
            children: [
              {
                path: 'campaign/:id/edit',
                component: CampaignEditComponent,
              },
              {
                path: 'campaign/:id/run',
                component: CampaignRunComponent,
              },
              {
                path: 'test-case/:id/edit',
                component: TestCaseEditComponent,
              },

            ]
          },
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
        path: 'testing',
        component: TestingComponent,
        children: [
          {
            path: 'campaign/:id/edit',
            component: CampaignEditComponent,
          },
          {
            path: 'campaign/:id/run',
            component: CampaignRunComponent,
          },
          {
            path: 'test-case/:id/edit',
            component: TestCaseEditComponent,
          },

        ]
      },
      {
        path: 'administration',
        component: AdministrationComponent
      }
    ]

  },
  {path: '**', component: ErrorPageComponent}
];