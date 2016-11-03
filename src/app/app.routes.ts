import {Routes} from "@angular/router";
import {Home} from "./home";
import {About} from "./about";
import {NoContent} from "./no-content";
import {LoginComponent} from "./login/login.component";


export const ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: Home},
  {path: 'about', component: About},
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  {path: '**', component: NoContent},
];
