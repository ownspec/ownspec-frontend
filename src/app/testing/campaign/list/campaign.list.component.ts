import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../../shared/model/user/user";
import {Campaign} from "../../../shared/model/testing/campaign";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'campaign-list',
  templateUrl: 'campaign.list.component.html',
  styleUrls: ['campaign.list.component.scss']
})
export class CampaignListComponent implements OnInit {

  @Input("projectId")
  public projectId: string;

  private assignees: User [] = [];
  private campaigns: any[] = [];
  private today = new Date();

  // Chart
  public testCasesStatusChartType: string = 'doughnut';
  public testCasesStatusChartLabels: string[] = ['Pass', 'Failed', 'Waiting', 'Blocked'];
  public testCasesStatusChartColors: any[] = [{backgroundColor: ['#88CC9F', '#E57483', '#FDD382', '#E4B37F']}];
  public testCasesStatusChartData: number[] = [16, 13, 3, 1];
  public options: any = {
    //title: {
    //  display: true,
    //  text: 'Test Cases',
    //  padding: 0,
    //  fontFamily: 'Helvetica',
    //  fontSize: 13,
    //  fontStyle: 'normal',
    //  fontColor: "#666565",
    //},
    legend: {display: false},
    cutoutPercentage: 40,
    circumference: Math.PI,
    rotation: -1 * Math.PI,

  };

  public constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    Observable.combineLatest(this.route.params, this.route.data, (params, data) => ({params, data}))
        .subscribe(ap => {
          this.projectId = ap.params['projectId'];
          this.fetchCampaigns();
        });
  }

  reset() {

  }

  fetchCampaigns() {
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
    let testSteps1: any = [
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
    let testSteps2: any = [
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
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
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
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
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
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
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
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
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
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
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
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
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
    let testCases1: any = [
      {
        id: 1,
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "PASS",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps1
      },
      {
        id: 2,
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "BLOCKED",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps2
      },
      {
        id: 1,
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "BLOCKED",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps1
      },
      {
        id: 2,
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "FAILED",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps2
      },
      {
        id: 1,
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "PASS",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps1
      },
      {
        id: 2,
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "PASS",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps2
      },
      {
        id: 1,
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "FAILED",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps1
      },

    ];
    let testCases2: any = [
      {
        id: 1,
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "PASS",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps2
      },
      {
        id: 2,
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
        attachments: [{id: 1, name: "foo.pdf", url: "/foo/bar/foo.pdf"}],
        status: "PASS",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        lastRunDate: "2017-04-17T13:11:11.313Z",
        lastRunUser: user,
        assignee: user,
        testSteps: testSteps2
      },
      {
        id: 1,
        name: "Test Case of requirement 1233",
        summary: "Here is a super test case",
        relatedRequirement: componentVersion,
        prerequisites: "Lorem updaks mdkfojef",
        environment: "UAT",
        tags: [],
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

    ];
    let dummyCampaign: any = [
      {
        id: 1,
        name: "Super Campaign",
        version: "4",
        status: "READY",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        startingDate: "2017-04-17T13:11:11.313Z",
        endingDate: "2017-04-17T13:11:11.313Z",
        startingUser: user,
        endingUser: user,
        testCases: testCases,
        executionsNumber: 1,
      },
      {
        id: 2,
        name: "Sed ut perspiciatis unde omnis iste",
        version: "1",
        status: "READY",
        createdDate: "2017-04-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        startingDate: "2017-07-23T13:11:11.313Z",
        endingDate: "2017-07-23T13:11:11.313Z",
        startingUser: user,
        endingUser: user,
        testCases: testCases1,
        executionsNumber: 0,

      },
      {
        id: 3,
        name: "Nemo enim ipsam voluptatem quia voluptas sit ",
        version: "2",
        status: "READY",
        createdDate: "2017-03-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        startingDate: "2017-02-19T13:11:11.313Z",
        endingDate: "2017-02-19T13:11:11.313Z",
        startingUser: user,
        endingUser: user,
        testCases: testCases2,
        executionsNumber: 4,

      },
      {
        id: 4,
        name: "Nam libero tempore",
        version: "23",
        status: "READY",
        createdDate: "2017-03-17T13:11:11.313Z",
        lastModifiedDate: "2017-04-17T13:11:11.313Z",
        createdUser: user,
        lastModifiedUser: user,
        startingDate: "2016-01-27T13:11:11.313Z",
        endingDate: "2016-01-27T13:11:11.313Z",
        startingUser: user,
        endingUser: user,
        testCases: testCases,
        executionsNumber: 12,
      }

    ];

    dummyCampaign.forEach(campaign => this.campaigns.push({
      testCasesStatusChartData: [
        campaign.testCases.filter(tc => tc.status == "PASS").length,
        campaign.testCases.filter(tc => tc.status == "FAILED").length,
        campaign.testCases.filter(tc => tc.status == "NOT_EXECUTED").length,
        campaign.testCases.filter(tc => tc.status == "BLOCKED").length,
      ],
      data: Campaign.fromMap(campaign)
    }));
  }

  showStatusFilteredTestCases($event) {

  }
}