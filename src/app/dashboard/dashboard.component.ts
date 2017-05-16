"use strict";
import {Component as C, OnInit} from "@angular/core";
import {SharedService} from "../shared/service/shared.service";
import {ProjectService} from "../shared/service/project.service";
import {Project} from "../shared/model/project";
import {ComponentVersionService} from "../shared/service/components/component-versions.service";
import {ComponentVersion} from "../shared/model/component/component-version";
import {ComponentVersionSearchBean} from "../shared/service/components/component-versions-search";

require("chart.js/src/chart.js");


@C({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private project: Project;
  private stateIsInAProject = false;
  private projectId: string;
  private projectsNumber = 0;
  private documentsNumber = 0;
  private requirementsNumber = 0;
  private templatesNumber = 0;
  private componentsNumber = 0;
  private resourcesNumber = 0;

  private lastVisitedProjects: Project [] = [];
  private lastVisitedDocuments: ComponentVersion  [] = [];
  private lastVisitedRequirements: ComponentVersion [] = [];


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
  public requirementTypeChartData: number[] = [1, 1, 1, 1, 1];

  // Requirement coverage chart
  public requirementCoverageChartType: string = 'doughnut';
  public requirementCoverageChartLabels: string[] = ['Uncovered', 'Ok', 'Failed', 'In-progress'];
  public requirementCoverageChartData: number[] = [1, 1, 1, 1];

  public constructor(private sharedService: SharedService,
                     private projectService: ProjectService,
                     private componentVersionService: ComponentVersionService) {
  }

  ngOnInit(): void {
    let documents: ComponentVersion[] = [];
    let requirements: ComponentVersion[] = [];
    let templates: ComponentVersion[] = [];
    let components: ComponentVersion[] = [];

    this.sharedService.stateIsInAProjectEvent.subscribe(result => {
      this.stateIsInAProject = result.isInAProject;
      this.projectId = result.projectId;
    });
    this.projectService.findAll().subscribe(response => {
      this.projectsNumber = response.length;
    });

    let searchBean = new ComponentVersionSearchBean();
    searchBean.componentTypes = ["DOCUMENT", "REQUIREMENT", "TEMPLATE", "COMPONENT"];

    this.componentVersionService.findAllBySearchBean(searchBean).subscribe(response => {
      documents = response.result.filter((c: ComponentVersion) => c.type == "DOCUMENT");
      requirements = response.result.filter((c: ComponentVersion) => c.type == "REQUIREMENT");
      templates = response.result.filter((c: ComponentVersion) => c.type == "TEMPLATE");
      components = response.result.filter((c: ComponentVersion) => c.type == "COMPONENT");

      // Total
      this.documentsNumber = documents.length;
      this.requirementsNumber = requirements.length;
      this.templatesNumber = templates.length;
      this.componentsNumber = components.length;

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
    //this.projectService.show(projectId);
  }

  private setRequirementChartsData(requirements: ComponentVersion []) {
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
    // this.projectService.getLastVisited().subscribe((lastVisitedProjects: Project[]) => {
    //   this.lastVisitedProjects = lastVisitedProjects;
    // });

    // Documents
    // this.componentService.getLastVisitedDocuments().subscribe((lastVisitedDocuments: Component[]) => {
    //   this.lastVisitedDocuments = lastVisitedDocuments;
    // });

    // Requirements
    // this.componentService.getLastVisitedRequirements().subscribe((lastVisitedRequirements: Component[]) => {
    //   this.lastVisitedRequirements = lastVisitedRequirements;
    // });
  }

}
