import {NgModule} from "@angular/core";
import {CampaignCreateComponent} from "./components/campaign/create/campaign.create.component";
import {CampaignEditComponent} from "./components/campaign/edit/campaign.edit.component";
import {CampaignListComponent} from "./components/campaign/list/campaign.list.component";
import {TestCaseCreateComponent} from "./components/test-case/create/test-case.create.component";
import {TestCaseEditComponent} from "./components/test-case/edit/test-case.edit.component";
import {TestCaseListComponent} from "./components/test-case/list/test-case.list.component";
import {TestingComponent} from "./components/testing.component";
import {CampaignRunComponent} from "./components/campaign/run/campaign.run.component";
import {MaterialModule} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {MomentModule} from "angular2-moment";
import {ChartsModule} from "ng2-charts";
import {FlexLayoutModule} from "@angular/flex-layout";
import {TestCaseRunComponent} from "./components/test-case/run/test-case.run.component";
import {MainHeaderModule} from "../header/main-header.module";


@NgModule({
  declarations: [
    TestingComponent,

    CampaignCreateComponent,
    CampaignEditComponent,
    CampaignListComponent,
    CampaignRunComponent,

    TestCaseCreateComponent,
    TestCaseEditComponent,
    TestCaseListComponent,
    TestCaseRunComponent,

  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NgxDatatableModule,
    MomentModule,
    ChartsModule,
    FlexLayoutModule,
    MainHeaderModule

  ],
  exports: [
    TestingComponent,

    CampaignCreateComponent,
    CampaignEditComponent,
    CampaignListComponent,
    CampaignRunComponent,

    TestCaseCreateComponent,
    TestCaseEditComponent,
    TestCaseListComponent,
    TestCaseRunComponent,

  ]
})
export class TestingModule {
}