import {TestCase} from "./testCase";
export class Campaign {

  public id: string;
  public name: string;
  public status: string;

  public testCases: TestCase [];
  public startingDate: Date;
  public endingDate: Date;

  public constructor() {
  }

}