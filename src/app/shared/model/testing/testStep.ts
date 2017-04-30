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


  public static fromMap(item: any): TestStep {
    let testStep: TestStep= new TestStep();
    testStep.id = item.id;
    testStep.order = item.order;
    testStep.description = item.description;
    testStep.expectedResult = item.expectedResult;
    testStep.actualResult = item.actualResult;
    testStep.status = item.status;
    testStep.optional = item.optional;

    return testStep;
  }

  public static toMap(testStep: TestStep): any {
    let map = {
      id: testStep.id,
      order: testStep.order,
      description: testStep.description,
      expectedResult: testStep.expectedResult,
      actualResult: testStep.actualResult,
      status: testStep.status,
      optional: testStep.optional,
    };
    return map;

  }


}