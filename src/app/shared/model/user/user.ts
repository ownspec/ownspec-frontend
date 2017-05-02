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

  public lastConnection: Date;
  public enabled: boolean;
  public accountNonExpired: boolean;
  public accountNonLocked: boolean;
  public credentialsNonExpired: boolean;
  public empoweredSecret: boolean;

  public constructor() {
  }

  public static fromMap(item: any): User {
    let user: User = new User();
    user.id = item.id;
    user.username = item.username;
    user.email = item.email;
    user.firstName = item.firstName;
    user.lastName = item.lastName;
    user.phone = item.phone;
    user.mobile = item.mobile;
    user.fullName = user.firstName + " " + user.lastName;
    user.role = item.role;

    if (item.category) {
      user.category = UserCategory.fromMap(item.category);
    }

    user.lastConnection = item.lastConnection;
    user.enabled = item.enabled;
    user.accountNonExpired = item.accountNonExpired;
    user.accountNonLocked = item.accountNonLocked;
    user.credentialsNonExpired = item.credentialsNonExpired;
    user.empoweredSecret = item.empoweredSecret;
    return user;
  }

  public static toMap(user: User): any {
    let map = {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      mobile: user.mobile,
      role: user.role,
      category: UserCategory.toMap(user.category),
      enabled: user.enabled
    };
    /*
     if (user.category){
     map.category = UserCategory.toMap(user.category)
     }
     */
    return map;

  }
}
