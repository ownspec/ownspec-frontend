import {User} from "../../users/user.service";

export class Comment {
  public constructor(public id: string, public value: string, public createdDate: Date, public createdUser: User) {

  }

  public clone(): Comment {
    return new Comment(this.id, this.value, this.createdDate, this.createdUser);
  }



  public static fromMap(item: any): Comment {
    return new Comment(item.id, item.value, new Date(item.createdDate), item.createdUser);
  }

}
