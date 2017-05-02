import {MainHeaderComponent} from "./main-header.component";
import {MaterialModule} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgModule} from "@angular/core";


@NgModule({
  declarations: [
    MainHeaderComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,

  ],
  exports: [
    MainHeaderComponent,
  ]
})
export class MainHeaderModule {
}