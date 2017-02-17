export class UserCategory {
  public id: string;
  public name: string;
  public hourlyPrice: number = 0;

  public constructor() {
  }

  public static fromMap(json: any): UserCategory {
    let userCategory: UserCategory = new UserCategory();
    userCategory.id = json.id;
    userCategory.name = json.name;
    userCategory.hourlyPrice = json.hourlyPrice;
    return userCategory;


  }

  public static toMap(userCategory: UserCategory): any {
    return {
      category: userCategory.name,
      hourlyPrice: userCategory.hourlyPrice,
    };
  }
}
