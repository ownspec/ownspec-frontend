import {WorkflowStatus} from "./workflow-status";
export class WorkflowInstance {

  public constructor(public id: string, public version:number, public currentWorkflowStatus: WorkflowStatus, public createdDate: Date,
                     public createdUser: any, public workflowStatuses: Array<WorkflowStatus> = []) {
  }

  public getCurrentWorkflowStatus(): WorkflowStatus {
    return this.currentWorkflowStatus;
  }


  public clone(): WorkflowInstance {

    let c = new WorkflowInstance(this.id, this.version, this.currentWorkflowStatus, this.createdDate, this.createdUser);

    for (let workflowStatuse of this.workflowStatuses) {
      c.workflowStatuses.push(workflowStatuse.clone());
    }
    return c;
  }



  public static fromMap(item: any): WorkflowInstance {
    let workflowInstance = new WorkflowInstance(item.id, item.version, WorkflowStatus.fromMap(item.currentWorkflowStatus), new Date(<string>item.createdDate), item.createdUser);

    if (item.workflowStatuses) {
      for (let workflowStatuse of item.workflowStatuses) {
        workflowInstance.workflowStatuses.push(WorkflowStatus.fromMap(workflowStatuse));
      }
    }

    return workflowInstance;
  }

}
