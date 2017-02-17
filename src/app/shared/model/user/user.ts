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


  public static fromMap(item: any): User {
    let user: User = new User();
    user.id = item.id;
    user.username = item.username;
    user.email = item.email;
    user.firstName = item.firstName;
    user.lastName = item.lastName;
    user.phone= item.phone;
    user.mobile = item.mobile;
    user.fullName = user.firstName + " " + user.lastName;
    user.role = item.role;

    if (item.category) {
      user.category = UserCategory.fromMap(item.category);
    }
    return user;
  }

  public static toMap(user: User): any {
    return {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };
  }
}
