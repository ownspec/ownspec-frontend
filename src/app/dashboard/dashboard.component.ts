"use strict";
import {Component as C, OnInit} from "@angular/core";
import {SharedService} from "../shared/service/shared.service";
import {ProjectService} from "../shared/service/project.service";
import {ComponentService} from "../shared/service/component/component.service";
import {Component} from "../shared/model/component/component";
import {Project} from "../shared/model/project";

require("chart.js/src/chart.js");


@C({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private project: Project;
  private stateIsInAProject = false;
  private projectsNumber = 0;
  private documentsNumber = 0;
  private requirementsNumber = 0;

  private lastVisitedProjects: Project [] = [];
  private lastVisitedDocuments: Component  [] = [];
  private lastVisitedRequirements: Component [] = [];


  // Requirement Evolution chart
  public requirementEvolutionChartType: string = 'line';
  public requirementEvolutionChartLabels: Array<any> = ['June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public requirementEvolutionChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Created'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Closed'}

  ];

  // Requirement type chart
  public requirementTypeChartType: string = 'pie';
  public requirementTypeChartLabels: string[] = ['Business', 'Functional', 'Design', 'Performance', 'Other'];
  public requirementTypeChartData: number[] = [0, 0, 0, 0, 0];

  // Requirement coverage chart
  public requirementCoverageChartType: string = 'doughnut';
  public requirementCoverageChartLabels: string[] = ['Uncovered', 'Ok', 'Failed', 'In-progress'];
  public requirementCoverageChartData: number[] = [0, 0, 0, 0];

  public constructor(private sharedService: SharedService,
                     private projectService: ProjectService,
                     private componentService: ComponentService) {
  }

  ngOnInit(): void {
    let documents: Component[];
    let requirements: Component[];

    this.sharedService.stateIsInAProjectEvent.subscribe(stateIsInAProject => {
      this.stateIsInAProject = stateIsInAProject;
    });
    this.projectService.findAll().subscribe(response => {
      this.projectsNumber = response.length;
    });

    this.componentService.findAll().subscribe(response => {
      documents = response.filter((component: Component) => component.type == "DOCUMENT");
      requirements = response.filter((component: Component) => component.type == "REQUIREMENT");

      // Total
      this.documentsNumber = documents.length;
      this.requirementsNumber = requirements.length;

      // Charts
      this.setRequirementChartsData(requirements);
    });


    //Last visited
    this.setLastVisited();

  }

  showStatusFilteredRequirement() {

  }

  showCoverageFilteredRequirements() {

  }

  showTypeFilteredRequirements() {

  }

  showProject(projectId: number) {
    this.projectService.show(projectId);
  }

  showComponent(componentId: number) {
    this.componentService.edit(componentId);
  }

  private setRequirementChartsData(requirements: Component []) {
    // this.requirementEvolutionChartData;
    // this.requirementCoverageChartData
    // this.requirementTypeChartData = [ requirements.filter(req => req.type)];

    this.requirementCoverageChartData = [
      requirements.filter(req => req.coverageStatus == "UNCOVERED").length,
      requirements.filter(req => req.coverageStatus == "OK").length,
      requirements.filter(req => req.coverageStatus == "FAILED").length,
      requirements.filter(req => req.coverageStatus == "IN_PROGRESS").length
    ];

    this.requirementTypeChartData = [
      requirements.filter(req => req.requirementType == "BUSINESS").length,
      requirements.filter(req => req.requirementType == "FUNCTIONAL").length,
      requirements.filter(req => req.requirementType == "DESIGN").length,
      requirements.filter(req => req.requirementType == "PERFORMANCE").length,
      requirements.filter(req => req.requirementType == "OTHER").length
    ];
  }

  private setLastVisited() {
    // Projects
    this.projectService.getLastVisited().subscribe((lastVisitedProjects: Project[]) => {
      this.lastVisitedProjects = lastVisitedProjects;
    });

    // Documents
    this.componentService.getLastVisitedDocuments().subscribe((lastVisitedDocuments: Component[]) => {
      this.lastVisitedDocuments = lastVisitedDocuments;
    });

    // Requirements
    this.componentService.getLastVisitedRequirements().subscribe((lastVisitedRequirements: Component[]) => {
      this.lastVisitedRequirements = lastVisitedRequirements;
    });
  }

}
