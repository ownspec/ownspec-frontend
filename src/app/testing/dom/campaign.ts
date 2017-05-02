import {TestCase} from "./testCase";
import {User} from "../../shared/model/user/user";
export class Campaign {

  public id: string;
  public name: string;
  public version: string;
  public status: string;
  public progress: number = 0;

  public createdDate: Date;
  public lastModifiedDate: Date;
  public createdUser: User;
  public lastModifiedUser: User;

  public startingDate: Date;
  public endingDate: Date;
  public startingUser: User;
  public endingUser: User;

  public testCases: TestCase [] = [];

  public testStepsNumber: number;
  public executionsNumber:number;

  public constructor() {
  }


  public static fromMap(item: any): Campaign {
    let campaign: Campaign = new Campaign();
    campaign.id = item.id;
    campaign.name = item.name;
    campaign.version = item.version;
    campaign.status = item.status;
    campaign.progress = item.progress;

    campaign.createdDate = new Date(<string>item.createdDate);
    campaign.lastModifiedDate = new Date(<string>item.lastModifiedDate);
    campaign.createdUser = User.fromMap(item.createdUser);
    campaign.lastModifiedUser = User.fromMap(item.lastModifiedUser);

    campaign.startingDate = new Date(<string>item.startingDate);
    campaign.endingDate = new Date(<string>item.endingDate);
    campaign.startingUser = User.fromMap(item.startingUser);
    campaign.endingUser = User.fromMap(item.endingUser);

    campaign.testCases = item.testCases.map(tc => TestCase.fromMap(tc));

    campaign.testStepsNumber =  campaign.testCases.map(tc => tc.testSteps.length).reduce((a, b) => a + b);
    campaign.executionsNumber = item.executionsNumber;
    return campaign;
  }

  public static toMap(campaign: Campaign): any {
    let map = {
      name: campaign.name,
      version: campaign.version,
      status: campaign.status,

      startingDate: campaign.startingDate,
      endingDate: campaign.endingDate,
      startingUser: User.toMap(campaign.startingUser),
      endingUser: User.toMap(campaign.endingUser),

      testCases: campaign.testCases.map(tc => TestCase.toMap(tc)),
    };
    return map;

  }

}