import {NgModule, ApplicationRef} from "@angular/core";
import {ComponentService} from "./service/component/component.service";
import {ReferenceService} from "./reference.service";
import {WorkflowComponent} from "./workflow/workflow.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {Angular2DataTableModule} from "angular2-data-table";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {ProfilService} from "./users/profil.service";
import {UserService} from "./users/user.service";
import {BrowserModule} from "@angular/platform-browser";
import {CommentsComponent} from "./comment/comments.component";
import {MomentModule} from "angular2-moment";
import {ComponentsComponent} from "./components/components.component";
import {ProjectService} from "./project.service";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {ModalModule} from "angular2-modal";
import {WorkflowTableComponent} from "./workflow/workflow-table.component";
import {MaterialModule} from "@angular/material";
import {EmptyContent} from "./empty-content/empty-content";
import {SharedService} from "./shared.service";
import {TocComponent} from "./toc/toc.component";


@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    Ng2BootstrapModule,
    MomentModule,
    MaterialModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    Angular2DataTableModule,

  ],

  exports: [
    WorkflowComponent,
    CommentsComponent,
    ComponentsComponent,
    WorkflowTableComponent,
    EmptyContent,
    TocComponent
  ],
  declarations: [
    WorkflowComponent,
    CommentsComponent,
    ComponentsComponent,
    WorkflowTableComponent,
    EmptyContent,
    TocComponent
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ComponentService,
    ReferenceService,
    UserService,
    ProfilService,
    ProjectService,
    SharedService,

  ]
})
export class SharedModule {
  constructor() {
  }
}

