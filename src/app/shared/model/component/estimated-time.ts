import {UserCategory} from "../user/user-category";

export class EstimatedTime {
  public id: string;

  public constructor(public userCategory: UserCategory, public duration: string, public durationInMs: number) {

  }

  public static fromMap(item: any): EstimatedTime {
    let estimatedTime = new EstimatedTime(UserCategory.fromMap(item.userCategory), item.duration, item.durationInMs);
    estimatedTime.id = item.id;
    return estimatedTime;
  }

  public static toMap(estimatedTime: EstimatedTime): any {
    return {
      id: estimatedTime.id,
      userCategory: estimatedTime.userCategory,
      duration: estimatedTime.duration,
    };
  }
}
