"use strict";
import {Component, OnInit} from "@angular/core";
import {SharedService} from "../shared/service/shared.service";

@Component({
  selector: 'main-header',
  templateUrl: 'main-header.template.html',
  styleUrls: ['./main-header.scss']
})
export class MainHeaderComponent implements OnInit {
  private sideNavIsHidden;

  public constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.sharedService.hideSideNavEvent.subscribe(hidden => {
      this.sideNavIsHidden = hidden;
    })
  }

  toggleSideNav() {
    this.sideNavIsHidden = !this.sideNavIsHidden;
    this.sharedService.expandMainContentAndHideSideNav(this.sideNavIsHidden);
  }
}
