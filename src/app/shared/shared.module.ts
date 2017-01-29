import {NgModule, ApplicationRef} from "@angular/core";
import {ComponentService} from "./service/component/component.service";
import {ReferenceService} from "./service/reference.service";
import {WorkflowComponent} from "./workflow/workflow.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {ProfilService} from "./users/profil.service";
import {UserService} from "./users/user.service";
import {BrowserModule} from "@angular/platform-browser";
import {CommentsComponent} from "./comment/comments.component";
import {MomentModule} from "angular2-moment";
import {ComponentsComponent} from "./components/components.component";
import {ProjectService} from "./service/project.service";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {ModalModule} from "angular2-modal";
import {WorkflowTableComponent} from "./workflow/workflow-table.component";
import {MaterialModule} from "@angular/material";
import {EmptyContent} from "./empty-content/empty-content";
import {SharedService} from "./service/shared.service";
import {TocComponent} from "./toc/toc.component";
import {HighlightDirective} from "./resizable/resizable.directive";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TreeModule} from "angular2-tree-component";
import {TagService} from "./service/component/tag.service";
import {ReferenceComponent} from "./reference/reference.component";
import {LinkService} from "./service/link.service";


@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    Ng2BootstrapModule,
    MomentModule,
    MaterialModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    NgxDatatableModule,

    TreeModule,
  ],

  entryComponents : [
    ReferenceComponent,
  ],
  exports: [
    WorkflowComponent,
    CommentsComponent,
    ComponentsComponent,
    WorkflowTableComponent,
    ReferenceComponent,
    EmptyContent,
    TocComponent,
    HighlightDirective
  ],
  declarations: [
    WorkflowComponent,
    CommentsComponent,
    ComponentsComponent,
    WorkflowTableComponent,
    ReferenceComponent,
    EmptyContent,
    TocComponent,
    HighlightDirective
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ComponentService,
    ReferenceService,
    UserService,
    ProfilService,
    ProjectService,
    SharedService,
    TagService,
    LinkService,

  ]
})
export class SharedModule {
  constructor() {
  }
}

