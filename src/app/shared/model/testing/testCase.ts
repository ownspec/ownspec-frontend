import {ComponentVersion} from "../component/component-version";
import {Tag} from "../component/tag";
import {Attachment} from "../attachment";
import {User} from "../user/user";
import {TestStep} from "./testStep";
import {TestRecord} from "./testRecord";


export class TestCase {
  public id: string;
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

  public testSteps: TestStep [];

  public testRecords: TestRecord [];

  public constructor() {
  }


}