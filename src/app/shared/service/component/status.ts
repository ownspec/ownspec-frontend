
export class Status {
  public constructor(public name: string, public editable: boolean, public final: boolean, public transitions: string[]) {

  }

  public clone(): Status {
    return new Status(this.name, this.editable, this.final, this.transitions);
  }



  public static fromMap(item: any): Status {
    return new Status(item.name, item.isEditable, item.isFinal, item.transitions);
  }

}
