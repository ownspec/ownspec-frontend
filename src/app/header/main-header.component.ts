"use strict";
import {Component, OnInit} from "@angular/core";
import {SharedService} from "../shared/service/shared.service";
import {ProjectService} from "../shared/service/project.service";
import {Project} from "../shared/model/project";

@Component({
  selector: 'main-header',
  templateUrl: 'main-header.template.html',
  styleUrls: ['main-header.scss']
})
export class MainHeaderComponent implements OnInit {
  private sideNavIsHidden;
  private project = new Project();

  public constructor(private sharedService: SharedService,
                     private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.sharedService.hideSideNavEvent.subscribe(hidden => {
      this.sideNavIsHidden = hidden;
    });

    this.sharedService.stateIsInAProjectEvent.subscribe(result => {
      if (result.isInAProject) {
        this.projectService.findOne(result.projectId).subscribe(p => this.project = p);
      }
    });
  }

  toggleSideNav() {
    this.sideNavIsHidden = !this.sideNavIsHidden;
    this.sharedService.expandMainContentAndHideSideNav(this.sideNavIsHidden);
  }
}
