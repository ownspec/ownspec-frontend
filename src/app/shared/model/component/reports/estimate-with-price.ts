import {UserCategory} from "../../user/user-category";


export class EstimateWithPrice {

  public estimateInMs:number;
  public price:number;
  public userCategory:UserCategory;

  constructor(estimateInMs: number, price: number, userCategory: UserCategory) {
    this.estimateInMs = estimateInMs;
    this.price = price;
    this.userCategory = userCategory;
  }

  public clone(): EstimateWithPrice {
    return new EstimateWithPrice(this.estimateInMs, this.price, this.userCategory);
  }


  public static fromMap(item: any): EstimateWithPrice {
    return new EstimateWithPrice(item.estimateInMs, item.price, item.userCategory);
  }
}
