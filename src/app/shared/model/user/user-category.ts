export class UserCategory {
  public id: string;
  public name: string;
  public hourlyPrice: number;
  public isBillable;

  public constructor() {
  }

  public static fromMap(json: any): UserCategory {
    let userCategory: UserCategory = new UserCategory();
    userCategory.id = json.id;
    userCategory.name = json.name;
    userCategory.hourlyPrice = json.hourlyPrice;
    userCategory.isBillable = userCategory.hourlyPrice > 0;
    return userCategory;
  }

  public static toMap(userCategory: UserCategory): any {
    return {
      id: userCategory.id,
      name: userCategory.name,
      hourlyPrice: userCategory.hourlyPrice,
    };
  }
}
