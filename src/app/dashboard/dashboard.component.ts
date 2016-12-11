"use strict";
import {Component as C, OnInit} from "@angular/core";
import {SharedService} from "../shared/shared.service";
import {ProjectService} from "../shared/project.service";
import {ComponentService} from "../shared/service/component/component.service";
import {Component} from "../shared/service/component/component";

require("chart.js/src/chart.js");


@C({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private stateIsInAProject = false;
  private projectsNumber = 0;
  private documentsNumber = 0;
  private requirementsNumber = 0;


  // Requirement Evolution chart
  public requirementEvolutionChartType: string = 'line';
  public requirementEvolutionChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public requirementEvolutionChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Created'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Closed'}

  ];

  // Requirement type chart
  public requirementTypeChartType: string = 'pie';
  public requirementTypeChartLabels: string[] = ['Business', 'Functional', 'Design', 'Performance', 'other'];
  public requirementTypeChartData: number[] = [1000, 550, 300, 84, 0];

  // Requirement coverage chart
  public requirementCoverageChartType: string = 'doughnut';
  public requirementCoverageChartLabels: string[] = ['Uncovered', 'Ok', 'Failed', 'Not run'];
  public requirementCoverageChartData: number[] = [350, 450, 100, 80];

  public constructor(private sharedService: SharedService,
                     private projectService: ProjectService,
                     private componentService: ComponentService) {
  }

  ngOnInit(): void {
    this.sharedService.stateIsInAProjectEvent.subscribe(stateIsInAProject => {
      this.stateIsInAProject = stateIsInAProject;
    });
    this.projectService.findAll().subscribe(response => {
      this.projectsNumber = response.length;
    });

    this.componentService.findAll().subscribe(response => {
      let documents: Component[] = response.filter((component: Component) => component.type == "DOCUMENT");
      let requirements: Component[] = response.filter((component: Component) => component.type == "REQUIREMENT");

      // Total
      this.documentsNumber = documents.length;
      this.requirementsNumber = requirements.length;

      // Charts
      // this.requirementEvolutionChartData;
      // this.requirementTypeChartData = [ requirements.filter(req => req.)];
      // this.requirementCoverageChartData
    });
  }

  showStatusFilteredRequirement() {

  }

  showCoverageFilteredRequirements() {

  }

  showTypeFilteredRequirements() {

  }

}
