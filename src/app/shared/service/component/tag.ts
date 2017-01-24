export class Tag {

  public constructor(public id: number, public label: string) {
  }


  public static fromMap(item: any) {
    return new Tag(item.id, item.label);
  }

}
