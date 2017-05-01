import {User} from "../../shared/model/user/user";
import {TestStatus} from "./testStatus";
export class TestRecord {
  public id: string;
  public result: TestStatus;
  public runDate: Date;
  public runUser: User;

  public constructor() {

  }
}