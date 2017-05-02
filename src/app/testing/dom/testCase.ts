import {ComponentVersion} from "../../shared/model/component/component-version";
import {Tag} from "../../shared/model/component/tag";
import {Attachment} from "../../shared/model/attachment";
import {User} from "../../shared/model/user/user";
import {TestStep} from "./testStep";
import {TestRecord} from "./testRecord";


export class TestCase {
  public id: string;
  public code:string;
  public name: string;
  public summary: string;
  public relatedRequirement: ComponentVersion;
  public prerequisites: string;
  public environment: string;
  public tags: Tag [];
  public attachments: Attachment [];

  public status: string;

  public createdDate: Date;
  public createdUser: User;
  public lastModifiedDate: Date;
  public lastModifiedUser: User;
  public lastRunDate: Date;
  public lastRunUser: User;
  public assignee: User;

  public testSteps: TestStep []= [];

  public testRecords: TestRecord [] = [];

  public constructor() {
  }


  public static fromMap(item: any): TestCase {
    let testCase: TestCase = new TestCase();
    testCase.id = item.id;
    testCase.code = item.code;
    testCase.name = item.name;
    testCase.summary = item.summary;
    testCase.relatedRequirement = ComponentVersion.fromMap(item.relatedRequirement);
    testCase.prerequisites = item.prerequisites;
    testCase.environment = item.environment;
    testCase.tags = item.tags.map(tag => Tag.fromMap(tag));
    testCase.attachments = item.attachments.map(a => new Attachment(a.id, a.name, a.url));

    testCase.status = item.status;

    testCase.createdDate = new Date(<string>item.createdDate);
    testCase.lastModifiedDate = new Date(<string>item.lastModifiedDate);
    testCase.createdUser = User.fromMap(item.createdUser);
    testCase.lastModifiedUser = User.fromMap(item.lastModifiedUser);

    testCase.lastRunDate = new Date(<string>item.lastRunDate);
    testCase.lastRunUser = User.fromMap(item.lastRunUser);
    testCase.assignee = User.fromMap(item.assignee);
    testCase.testSteps = item.testSteps.map(ts => TestStep.fromMap(ts));

    //testCase.testRecords = item.testRecords;

    return testCase;
  }

  public static toMap(testCase: TestCase): any {
    return {
      name: testCase.name,
      summary: testCase.summary,
      relatedRequirement: testCase.relatedRequirement,
      prerequisites: testCase.prerequisites,
      environment: testCase.environment,
      tags: testCase.tags.map(t => Tag.toMap(t)),
      //attachments: testCase.attachments.map(a => Attachment.toMap(a)),
      status: testCase.status,
      assignee: User.toMap(testCase.assignee),
      testSteps: testCase.testSteps.map(ts => TestStep.toMap(ts)),
      //testRecords: testCase.testRecords,
    };

  }


}