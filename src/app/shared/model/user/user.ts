import {UserCategory} from "./user-category";
export class User {
  public id: string;
  public fullName: string;
  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public mobile: string;
  public role: string;
  public category: UserCategory;

  public constructor() {
  }


  public static fromJson(json: any): User {
    let user: User = new User();
    user.id = json.id;
    user.username = json.username;
    user.email = json.email;
    user.firstName = json.firstName;
    user.lastName = json.lastName;
    user.phone= json.phone;
    user.mobile = json.mobile;
    user.fullName = user.firstName + " " + user.lastName;
    user.role = json.role;
    user.category = UserCategory.fromJson(json.category);
    return user;
  }

  public static toJson(user: User): any {
    return {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };
  }
}