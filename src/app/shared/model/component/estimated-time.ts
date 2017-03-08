import {UserCategory} from "../user/user-category";

export class EstimatedTime {
  public id: string;

  public constructor(public userCategory: UserCategory, public time: any, public timeUnit: string) {

  }

  public static fromMap(item: any): EstimatedTime {
    let estimatedTime = new EstimatedTime(UserCategory.fromMap(item.userCategory), item.time, item.timeUnit);
    estimatedTime.id = item.id;
    return estimatedTime;
  }

  public static toMap(estimatedTime: EstimatedTime): any {
    return {
      id: estimatedTime.id,
      userCategory: estimatedTime.userCategory,
      time: estimatedTime.time,
      timeUnit: estimatedTime.timeUnit
    };
  }
}
