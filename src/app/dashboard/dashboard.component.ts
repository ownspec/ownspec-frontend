"use strict";
import {Component as C, OnInit} from "@angular/core";
import {SharedService} from "../shared/shared.service";

require("chart.js/src/chart.js");


@C({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private stateIsInAProject = false;

  // Requirement Evolution
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Created'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Closed'}

  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: any = {
    responsive: true
  };

  // Requirement type
  public pieChartLabels: string[] = ['Business', 'Functional', 'Design', 'Performance', 'other'];
  public pieChartData: number[] = [1000, 550, 300, 84, 0];

  public constructor(private sharedService: SharedService) {
  }


  // Requirement coverage
  public doughnutChartLabels:string[] = ['Uncovered', 'Ok', 'Failed', 'Not run'];
  public doughnutChartData:number[] = [350, 450, 100, 80];
  public doughnutChartType:string = 'doughnut';

  ngOnInit(): void {
    this.sharedService.stateIsInAProjectEvent.subscribe(stateIsInAProject => {
      this.stateIsInAProject = stateIsInAProject;
    });
  }

}
