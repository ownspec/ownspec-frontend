export class Tag {

  public constructor(public id: number, public label: string) {
  }


  public static fromMap(item: any) {
    return new Tag(item.id, item.label);
  }

  public static toMap(tag: Tag) {
    let map = {
      id: tag.id,
      label: tag.label
    }
    return map;
  }

}
