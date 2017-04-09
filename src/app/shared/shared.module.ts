import {NgModule} from "@angular/core";
import {ComponentService} from "./service/components/component.service";
import {ReferenceService} from "./service/reference.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {MomentModule} from "angular2-moment";
import {ProjectService} from "./service/project.service";
import {MaterialModule} from "@angular/material";
import {EmptyContent} from "./empty-content/empty-content";
import {SharedService} from "./service/shared.service";
import {ResizableDirective} from "./resizable/resizable.directive";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TreeModule} from "angular-tree-component";
import {TagService} from "./service/tag.service";
import {UserService} from "./service/user/user.service";
import {ProfileService} from "./service/user/profil.service";
import {CompanyService} from "./service/company.service";
import {ComponentVersionService} from "./service/components/component-versions.service";
import {UserCategoryService} from "./service/user/user-category.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AssigneeService} from "./service/user/assignee.service";


@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    Ng2BootstrapModule,
    MomentModule,
    MaterialModule,
    NgxDatatableModule,
    FlexLayoutModule,
    TreeModule,
  ],

  entryComponents: [

  ],
  exports: [

    EmptyContent,
    ResizableDirective
  ],
  declarations: [
    EmptyContent,
    ResizableDirective,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ComponentService,
    ComponentVersionService,
    ReferenceService,
    UserService,
    ProfileService,
    ProjectService,
    SharedService,
    TagService,
    CompanyService,
    UserCategoryService,
    AssigneeService

  ]
})
export class SharedModule {
  constructor() {
  }
}

