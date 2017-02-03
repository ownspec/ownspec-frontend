
export class Change {
  public constructor(public revision: string, public date: Date, public user: any) {

  }

  public clone(): Change {
    return new Change(this.revision, this.date, this.user);
  }



  public static fromMap(item: any): Change {
    return new Change(item.revision, new Date(item.date), item.user);
  }

}
