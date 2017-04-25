import {TestStatus} from "./testStatus";
export class TestStep {

  public id: string;
  public order: number;
  public description: string;
  public expectedResult: string;
  public actualResult: string;
  public status: TestStatus;
  public optional: boolean;

  public constructor() {
  }


}