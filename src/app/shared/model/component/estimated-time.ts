import {UserCategory} from "../user/user-category";

export class EstimatedTime {

  public constructor(public userCategory: UserCategory, public time: any, public timeUnit: string) {

  }

  public static fromMap(item: any): EstimatedTime {
    return new EstimatedTime(UserCategory.fromJson(item.userCategory), item.time, item.timeUnit);
  }

  public static toJson(estimatedTime: EstimatedTime): any {
    return {
      userCategory: estimatedTime.userCategory,
      time: estimatedTime.time,
      timeUnit: estimatedTime.timeUnit
    };
  }
}