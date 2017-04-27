import {EstimateWithPrice} from "./estimate-with-price";
import {ComponentVersion} from "../component-version";
/**
 * Created by nithril on 26/04/17.
 */


export class EstimatedComponentVersion {


  public level: number;
  public componentVersion: ComponentVersion;

  public estimatedTimesPerCategory: Array<EstimateWithPrice> = [];
  public childrenEstimatedTimesPerCategory: Array<EstimateWithPrice> = [];
  public totalEstimatedTimesPerCategory: Array<EstimateWithPrice> = [];

  public childrenEstimatedTime = new EstimateWithPrice(0, 0, null);
  public totalEstimatedTime = new EstimateWithPrice(0, 0, null);
  public estimatedTime = new EstimateWithPrice(0, 0, null);


  constructor(level: number, componentVersion: ComponentVersion) {
    this.level = level;
    this.componentVersion = componentVersion;
  }

  public clone(): EstimatedComponentVersion {
    let ecv = new EstimatedComponentVersion(this.level, this.componentVersion.clone());
    ecv.estimatedTimesPerCategory = this.estimatedTimesPerCategory;
    ecv.childrenEstimatedTimesPerCategory = this.childrenEstimatedTimesPerCategory;
    ecv.totalEstimatedTimesPerCategory = this.totalEstimatedTimesPerCategory;

    ecv.childrenEstimatedTime = this.childrenEstimatedTime;
    ecv.totalEstimatedTime = this.totalEstimatedTime;
    ecv.estimatedTime = this.estimatedTime;

    return ecv;
  }


  public static fromMap(item: any): EstimatedComponentVersion {
    let ecv = new EstimatedComponentVersion(item.level, ComponentVersion.fromMap(item.componentVersion));

    if (item.estimatedTimesPerCategory){
      for (let e of item.estimatedTimesPerCategory){
        ecv.estimatedTimesPerCategory.push(EstimateWithPrice.fromMap(e));
      }
    }
    if (item.childrenEstimatedTimesPerCategory){
      for (let e of item.childrenEstimatedTimesPerCategory){
        ecv.childrenEstimatedTimesPerCategory.push(EstimateWithPrice.fromMap(e));
      }
    }
    if (item.totalEstimatedTimesPerCategory){
      for (let e of item.totalEstimatedTimesPerCategory){
        ecv.totalEstimatedTimesPerCategory.push(EstimateWithPrice.fromMap(e));
      }
    }

    ecv.childrenEstimatedTime = EstimateWithPrice.fromMap(item.childrenEstimatedTime);
    ecv.totalEstimatedTime = EstimateWithPrice.fromMap(item.totalEstimatedTime);
    ecv.estimatedTime = EstimateWithPrice.fromMap(item.estimatedTime);

    return ecv;

  }
}
