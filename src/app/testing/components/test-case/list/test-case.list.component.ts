import {Component, Input, OnInit} from "@angular/core";
import {TestStatus} from "../../../dom/testStatus";
import {TestCase} from "../../../dom/testCase";
import {ComponentVersion} from "../../../../shared/model/component/component-version";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'test-case-list',
  templateUrl: 'test-case.list.component.html',
  styleUrls: ['test-case.list.component.scss']
})
export class TestCaseListComponent implements OnInit {

  @Input("projectId")
  public projectId: string;

  public statuses: TestStatus[] = [];
  public testCases: TestCase[] = [];

  public constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    Observable.combineLatest(this.route.params, this.route.data, (params, data) => ({params, data}))
        .subscribe(ap => {
          this.projectId = ap.params['projectId'];
          this.fetchTestCases();
        });
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
    let user: any = {
      "id": 2100,
      "username": "lcareto",
      "email": "lyrold.careto@gmail.com",
      "role": "ADMIN",
      "firstName": "Lyrold-Boris",
      "lastName": "CARETO",
      "phone": "",
      "mobile": "+33643009141",
      "category": {"id": 0, "name": "Administrator", "hourlyPrice": 0.0},
      "loggedIn": false,
      "enabled": true,
      "accountNonExpired": true,
      "accountNonLocked": true,
      "credentialsNonExpired": true,
      "empoweredSecret": false
    };
    let componentVersion: any = {
      "id": 1202,
      "componentId": 1152,
      "projectId": 1450,
      "code": "OSCENTER-1",
      "codeNumber": 1,
      "title": "Hello document",
      "type": "DOCUMENT",
      "createdDate": "2017-04-16T16:20:31.657Z",
      "createdUser": {
        "id": 0,
        "username": "admin",
        "email": "admin@ownspec.com",
        "role": "ADMIN",
        "firstName": "admnistrator",
        "lastName": "admnistrator",
        "lastConnection": "2017-04-30T15:07:27.721Z",
        "category": {"id": 0, "name": "Administrator", "hourlyPrice": 0.0},
        "loggedIn": false,
        "enabled": true,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true,
        "empoweredSecret": false
      },
      "lastModifiedDate": "2017-04-17T13:11:11.313Z",
      "lastModifiedUser": {
        "id": 0,
        "username": "admin",
        "email": "admin@ownspec.com",
        "role": "ADMIN",
        "firstName": "admnistrator",
        "lastName": "admnistrator",
        "lastConnection": "2017-04-30T15:07:27.721Z",
        "category": {"id": 0, "name": "Administrator", "hourlyPrice": 0.0},
        "loggedIn": false,
        "enabled": true,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true,
        "empoweredSecret": false
      },
      "workflowInstance": {
        "id": 1052,
        "currentWorkflowStatus": {
          "id": 1102,
          "status": {"id": "OPEN", "name": "OPEN", "transitions": ["DRAFT"], "isFinal": false, "isEditable": true},
          "createdDate": "2017-04-16T16:20:31.655Z",
          "createdUser": {
            "id": 0,
            "username": "admin",
            "email": "admin@ownspec.com",
            "role": "ADMIN",
            "firstName": "admnistrator",
            "lastName": "admnistrator",
            "lastConnection": "2017-04-30T15:07:27.721Z",
            "category": {"id": 0, "name": "Administrator", "hourlyPrice": 0.0},
            "loggedIn": false,
            "enabled": true,
            "accountNonExpired": true,
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "empoweredSecret": false
          },
          "changes": []
        },
        "createdDate": "2017-04-16T16:20:31.653Z",
        "createdUser": {
          "id": 0,
          "username": "admin",
          "email": "admin@ownspec.com",
          "role": "ADMIN",
          "firstName": "admnistrator",
          "lastName": "admnistrator",
          "lastConnection": "2017-04-30T15:07:27.721Z",
          "category": {"id": 0, "name": "Administrator", "hourlyPrice": 0.0},
          "loggedIn": false,
          "enabled": true,
          "accountNonExpired": true,
          "accountNonLocked": true,
          "credentialsNonExpired": true,
          "empoweredSecret": false
        }
      },
      "componentReferences": [],
      "componentUsePoints": [],
      "requiredTest": false,
      "estimatedTimes": [],
      "distributionLevel": "INTERNAL",
      "requirementType": "FUNCTIONAL",
      "componentUsers": [],
      "version": "1",
      "gitReference": "4c76426f598aa5dbe6879b92d2224bee9bb3e3b6",
      "tags": [],
      "riskAssessment": {"id": 1252}
    };
    let testSteps: any = [
      {
        id: 1,
        order: 1,
        description: "Test step 1",
        expectedResult: "Must be displayed",
        actualResult: "",
        status: "NOT_EXECUTED",
        optional: false,
      },
      {
        id: 1,
        order: 1,
        description: "Test step 1",
        expectedResult: "Must be displayed",
        actualResult: "",
        status: "NOT_EXECUTED",
        optional: false,
      },
      {
        id: 1,
        order: 1,
        description: "Test step 1",
        expectedResult: "Must be displayed",
        actualResult: "",
        status: "NOT_EXECUTED",
        optional: false,
      },
      {
        id: 1,
        order: 1,
        description: "Test step 1",
        expectedResult: "Must be displayed",
        actualResult: "",
        status: "NOT_EXECUTED",
        optional: false,
      },
      {
        id: 1,
        order: 1,
        description: "Test step 1",
        expectedResult: "Must be displayed",
        actualResult: "",
        status: "NOT_EXECUTED",
        optional: false,
      },
      {
        id: 1,
        order: 1,
        description: "Test step 1",
        expectedResult: "Must be displayed",
        actualResult: "",
        status: "NOT_EXECUTED",
        optional: false,
      }
    ];
    let testCases: any = [
      {
        id: 1,
        code: "OSCENTER_1_TC-1",
        name: "Test Case of requirement 1233",
        summary: "Summary of the test-case for my super test, live and direct from my slow laptop",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [{id:1,label:"responsive"},{id:2,label:"body"},{id:3,label:"foo"}],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "BLOCKED",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps
      },
      {
        id: 2,
        code: "OSCENTER_1_TC-2",
        name: "Test Case of requirement 1233",
        summary: "Summary of the test-case for my super test, live and direct from my slow laptop",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [{id:1,label:"foo"},{id:2,label:"bar"}],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "FAILED",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps
      },
      {
        id: 1,
        code: "OSCENTER_1_TC-3",
        name: "Test Case of requirement 1233",
        summary: "Summary of the test-case for my super test, live and direct from my slow laptop",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [{id:1,label:"footer"},{id:2,label:"contact"},{id:3,label:"link"},{id:4,label:"email"}],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "PASS",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps
      },
      {
        id: 1,
        code: "OSCENTER_1_TC-4",
        name: "Test Case of requirement 1233",
        summary: "Summary of the test-case for my super test, live and direct from my slow laptop",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [{id:1,label:"foo"},{id:2,label:"responsive"},{id:3,label:"leon"}],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "IN_PROGRESS",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps
      },
      {
        id: 1,
        code: "OSCENTER_1_TC-5",
        name: "Test Case of requirement 1233",
        summary: "Summary of the test-case for my super test, live and direct from my slow laptop",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [{id:1,label:"foo"}],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "NOT_EXECUTED",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps
      },
      {
        id: 1,
        code: "OSCENTER_1_TC-6",
        name: "Test Case of requirement 1233",
        summary: "Summary of the test-case for my super test, live and direct from my slow laptop",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [{id:1,label:"foo"},{id:2,label:"bar"},{id:3,label:"leon"}],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "NOT_EXECUTED",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps
      },

    ];
    testCases.forEach(tc => this.testCases.push(TestCase.fromMap(tc)))

  }

  reset() {

  }

  goToRequirement(requirement : ComponentVersion){

  }
}