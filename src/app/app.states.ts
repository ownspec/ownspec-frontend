import {AppComponent} from "./app.component";
import {Ng2StateDeclaration, Transition} from "ui-router-ng2";
import {ProjectsListComponent} from "./projects/list/projects-list.component";
import {ProjectEditComponent} from "./projects/edit/project-edit.component";
import {ComponentEditComponent} from "./components/edit/component-edit.component";
import {ComponentsListComponent} from "./components/list/components-list.component";
import {ComponentWriteComponent} from "./components/write/component-write.component";
import {LoginComponent} from "./login/login.component";
import {EmptyContent} from "./shared/empty-content/empty-content";
import {SideNavComponent} from "./sidenav/sidenav.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

/** The top level state(s) */
export let MAIN_STATES: Ng2StateDeclaration[] = [
  // The top-level app state.
  // This state fills the root <ui-view></ui-view> (defined in index.html) with the AppComponent
  /*

   {
   name: "root.app",
   url: "",
   abstract: true, // means that this state will never be directly activated (user can never navigate to it)
   views: {
   "sidenav@": SideNavComponent
   }
   },
   */

  {
    name: 'login',
    url:'/login',
    component: LoginComponent
  },

  {
    name: 'app',
    url: '/app',
    component: AppComponent
  },

  {
    name: "app.home",
    abstract: true,
    views: {
      "sidenav": {component: SideNavComponent},
    }
  },

  {
    name: "app.home.dashboard",
    url: '/dashboard',
    views: {
      "main@app": {component: DashboardComponent},
    }
  },


  /**
   * Projects
   *
   *
   *
   */

  {
    name: "app.home.projects",
    url: '/projects',
    views: {
      "main@app": {component: ProjectsListComponent},
    }
  },

  {
    name: "app.home.projects.project-edit",
    url: "/:projectId/edit",
    views: {
      "main@app": {
        component: ProjectEditComponent,

      },
    },
    resolve: [
      {
        token: 'projectId',
        deps: [Transition],
        resolveFn: (trans) => trans.params().projectId
      }
    ]
  },


  /**
   * Components
   */
  ...componentStates("app.home.components", "components", ["COMPONENT"]),

  /**
   * Requirements
   */
  ...componentStates("app.home.requirements", "requirements", ["REQUIREMENT"]),

  /**
   * Templates
   */
  ...componentStates("app.home.templates", "templates", ["TEMPLATE"]),

  /**
   * Resource
   */
  ...componentStates("app.home.resources", "resources", ["RESOURCE"]),


  /**
   * Project contents
   */
  {
    name: "app.home.project",
    url: "/project/:projectId",
    abstract: true,
    views: {
      "sidenav@app": {component: SideNavComponent},
    },
    resolve: [
      {
        token: 'projectId',
        deps: [Transition],
        resolveFn: (trans) => trans.params().projectId
      }
    ]
  },

  {
    name: "app.home.project.dashboard",
    url: "/dashboard",
    views: {
      "main@app": {component: DashboardComponent,},
    },
    resolve: [
      {
        token: 'projectId',
        deps: [Transition],
        resolveFn: (trans) => trans.params().projectId
      }
    ]
  },


  /**
   * Components
   */
  ...componentStates("app.home.project.documents", "documents", ["DOCUMENT"], true),

  /**
   * Requirements
   */
  ...componentStates("app.home.project.requirements", "requirements", ["REQUIREMENT"], true),

  /**
   * Templates
   */
  ...componentStates("app.home.project.templates", "templates", ["TEMPLATE"], true),

  /**
   * Resources
   */
  ...componentStates("app.home.project.resources", "resources", ["RESOURCE"], true),

];


function componentStates(id: string, url: string, types: string[], project = false): Array<any> {

  /*[]
   {
   token: 'projectId',
   deps: [Transition],
   resolveFn: (trans) => trans.params().projectId
   }*/
  let resolveProject = [];
  if (project) {


    resolveProject = [{
      token: 'projectId',
      deps: [Transition],
      resolveFn: (trans) => trans.params().projectId
    }];
  }


  return [
    {
      name: `${id}`,
      url: `/${url}`,
      views: {
        "main@app": {component: ComponentsListComponent},
      },
      resolve: [
        {
          token: 'componentTypes',
          resolveFn: () => types,
        },
        ...resolveProject
      ]
    },

    {
      name: `${id}.component-edit`,
      url: "/:componentId/edit",
      views: {
        "main@app": {
          component: ComponentEditComponent,

        },
      },
      resolve: [
        {
          token: 'componentId',
          deps: [Transition],
          resolveFn: (trans) => trans.params().componentId
        }
      ]
    },

    {
      name: `${id}.component-write`,
      url: "/:componentId/write",
      views: {
        "main@app": {
          component: ComponentWriteComponent,

        },
        "sidenav@app": {component: EmptyContent},
      },
      resolve: [
        {
          token: 'componentId',
          deps: [Transition],
          resolveFn: (trans) => trans.params().componentId
        }
      ]
    },
  ];
}







