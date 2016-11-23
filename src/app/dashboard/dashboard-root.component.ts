"use strict";
import {Component as C} from "@angular/core";

require("chart.js/src/chart.js");
require("bootstrap/dist/css/bootstrap.min.css");

@C({
  selector: 'dashboard-root',
  templateUrl: './dashboard-root.template.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardRootComponent {
  // Requirement Evolution
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Created'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Closed'}

  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions:any = {
    responsive: true
  };

  // Requirement type
  public pieChartLabels: string[] = ['Business', 'Functional', 'Design', 'Performance', 'other'];
  public pieChartData: number[] = [1000, 550, 300, 84, 0];

  public constructor() {
  }
}
