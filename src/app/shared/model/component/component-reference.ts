import {Component} from "./component";
import {WorkflowInstance} from "./workflow/workflow-instance";
import {ComponentVersion} from "../../service/component/component-version";
export class ComponentReference {
  public constructor(public id: string,
                     public source: ComponentVersion,
                     public target: ComponentVersion,
                     public createdDate: Date, public createdUser: any) {

  }

  public clone(): ComponentReference {
    return new ComponentReference(this.id,
      this.source,
      this.target,
      this.createdDate, this.createdUser);
  }


  public static fromMap(item: any): ComponentReference {
    return new ComponentReference(item.id,
      ComponentVersion.fromMap(item.source),
      ComponentVersion.fromMap(item.target),
      new Date(<string>item.createdDate), item.createdUser);
  }


}
