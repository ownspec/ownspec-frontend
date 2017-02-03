export class UserCategory{
  public id:string;
  public name:string;
  public hourlyPrice:number = 0;

  public constructor(){
  }

  public static fromJson(json: any): UserCategory {
    let userCategory: UserCategory = new UserCategory ();
    userCategory.id=json.id;
    userCategory.name = json.category;
    userCategory.hourlyPrice= json.hourlyPrice;
    return userCategory;
  }

  public static toJson(userCategory: UserCategory ): any {
    return {
      category: userCategory.name,
      hourlyPrice: userCategory.hourlyPrice,
    };
  }
}