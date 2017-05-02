import {Component, OnInit} from "@angular/core";
import {TestStatus} from "../../../dom/testStatus";
import {TestCase} from "../../../dom/testCase";
import {ComponentVersion} from "../../../../shared/model/component/component-version";

@Component({
  selector: 'test-case-list',
  templateUrl: 'test-case.list.component.html',
  styleUrls: ['test-case.list.component.scss']
})
export class TestCaseListComponent implements OnInit {

  public statuses: TestStatus[] = [];

  public testCases: TestCase[] = [];

  public constructor() {
  }

  ngOnInit(): void {
  }

  create() {

  }

  run() {

  }

  edit() {

  }

  delete() {

  }

  fetchTestCases() {

  }

  reset() {

  }

  goToRequirement(requirement : ComponentVersion){

  }
}