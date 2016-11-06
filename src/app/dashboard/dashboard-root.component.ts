"use strict";
import {Component as C} from "@angular/core";

require("chart.js/src/chart.js");
require("./dashboard.css");
require("bootstrap/dist/css/bootstrap.min.css");

@C({
  selector: 'dashboard-root',
  templateUrl: './dashboard-root.template.html'
})
export class DashboardRootComponent {
  // Requirement Evolution
  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // Requirement type
  public pieChartLabels: string[] = ['Business', 'Functional', 'Design', 'Performance', 'other'];
  public pieChartData: number[] = [1000, 550, 300, 84, 0];

  public constructor() {
  }
}
