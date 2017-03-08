import {NgModule} from "@angular/core";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {MaterialModule} from "@angular/material";
import {ReferenceComponent} from "../shared/reference/reference.component";
import {UserCategoriesListComponent} from "./user-category-edit/list/user-categories-list.component";
import {AdministrationComponent} from "./administration.component";
import {TreeModule} from "angular2-tree-component";
import {ComponentService} from "../shared/service/component/component.service";
import {ProfileService} from "../shared/service/user/profil.service";
import {LinkService} from "../shared/service/link.service";
import {TagService} from "../shared/service/component/tag.service";
import {SharedService} from "../shared/service/shared.service";
import {MomentModule} from "angular2-moment";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {ComponentVersionService} from "../shared/service/component/component-versions.service";
import {ReferenceService} from "../shared/service/reference.service";
import {UserService} from "../shared/service/user/user.service";
import {ProjectService} from "../shared/service/project.service";
import {CompanyService} from "../shared/service/company.service";
import {UserCategoryService} from "../shared/service/user/user-category.service";
import {MainHeaderComponent} from "../header/main-header.component";
import {SharedModule} from "../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {UserCategoryEditDialog} from "./user-category-edit/edit/user-category-edit.component";

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    Ng2BootstrapModule,
    MomentModule,
    MaterialModule,
    NgxDatatableModule,
    SharedModule,
    TreeModule,
    FlexLayoutModule,
  ],

  entryComponents: [
    UserCategoryEditDialog,
  ],
  exports: [
    AdministrationComponent,
    UserCategoriesListComponent
  ],
  declarations: [
    AdministrationComponent,
    UserCategoriesListComponent,
    UserCategoryEditDialog
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
    LinkService,
    CompanyService,
    UserCategoryService

  ]
})
export class AdministrationModule {
  constructor() {
  }
}

