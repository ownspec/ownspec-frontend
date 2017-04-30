import {NgModule} from "@angular/core";
import {CampaignCreateComponent} from "./campaign/create/campaign.create.component";
import {CampaignEditComponent} from "./campaign/edit/campaign.edit.component";
import {CampaignListComponent} from "./campaign/list/campaign.list.component";
import {TestCaseCreateComponent} from "./test-case/create/test-case.create.component";
import {TestCaseEditComponent} from "./test-case/edit/test-case.edit.component";
import {TestCaseListComponent} from "./test-case/list/test-case.list.component";
import {TestingComponent} from "./testing.component";
import {CampaignRunComponent} from "./campaign/run/campaign.run.component";
import {MainHeaderModule} from "../header/main-header.module";
import {MaterialModule} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {MomentModule} from "angular2-moment";
import {ChartsModule} from "ng2-charts";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    TestingComponent,

    CampaignCreateComponent,
    CampaignEditComponent,
    CampaignListComponent,
    CampaignRunComponent,

    TestCaseCreateComponent,
    TestCaseEditComponent,
    TestCaseListComponent

  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NgxDatatableModule,
    MomentModule,
    ChartsModule,
    FlexLayoutModule

  ],
  exports: [
    TestingComponent,

    CampaignCreateComponent,
    CampaignEditComponent,
    CampaignListComponent,

    TestCaseCreateComponent,
    TestCaseEditComponent,
    TestCaseListComponent
  ]
})
export class TestingModule {
}