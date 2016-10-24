import {NgModule, ApplicationRef} from "@angular/core";
import {ComponentService} from "./component.service";
import {ReferenceService} from "./reference.service";
import {WorkflowComponent} from "./workflow/workflow.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {Angular2DataTableModule} from "angular2-data-table";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {ProfilService} from "./users/profil.service";
import {UserService} from "./users/user.service";
import {BrowserModule} from "@angular/platform-browser";
import {CommentsComponent} from "./comment/comment.component";
import {MomentModule} from "angular2-moment";
import {ComponentsComponent} from "./components/components.component";
import {ProjectService} from "./project.service";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {ModalModule} from "angular2-modal";


@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    Ng2BootstrapModule,
    MomentModule,

    ModalModule.forRoot(),
    BootstrapModalModule


  ],

  exports: [
    WorkflowComponent,
    CommentsComponent,
    ComponentsComponent,
  ],
  declarations: [
    WorkflowComponent,
    CommentsComponent,
    ComponentsComponent,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ComponentService,
    ReferenceService,
    UserService,
    ProfilService,
    ProjectService,

  ]
})
export class SharedModule {
  constructor() {
  }
}

