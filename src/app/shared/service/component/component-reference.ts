import {Component} from "./component";
import {WorkflowInstance} from "./workflow-instance";
export class ComponentReference {
  public constructor(public id: string,
                     public source: Component, public sourceWorkflowInstance: WorkflowInstance,
                     public target: Component, public targetWorkflowInstance: WorkflowInstance,
                     public createdDate: Date, public createdUser: any) {

  }

  public clone(): ComponentReference {
    return new ComponentReference(this.id,
      this.source, this.sourceWorkflowInstance,
      this.target, this.targetWorkflowInstance,
      this.createdDate, this.createdUser);
  }


  public static fromMap(item: any): ComponentReference {
    return new ComponentReference(item.id,
      Component.fromMap(item.source), WorkflowInstance.fromMap(item.sourceWorkflowInstance),
      Component.fromMap(item.target), WorkflowInstance.fromMap(item.targetWorkflowInstance),
      new Date(<string>item.createdDate), item.createdUser);
  }


}
