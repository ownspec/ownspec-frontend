
import {Change} from "../change";
import {Status} from "../status";

export class WorkflowStatus {

  public constructor(public id: string, public status: Status, public createdDate: Date,
                     public createdUser: any, public changes: Array<Change> = []) {
  }

  public clone(): WorkflowStatus {

    let c = new WorkflowStatus(this.id, this.status.clone(), this.createdDate, this.createdUser);

    for (let change of this.changes) {
      c.changes.push(change.clone());
    }
    return c;
  }


  public static fromMap(item: any): WorkflowStatus {
    let status = new WorkflowStatus(item.id, Status.fromMap(item.status), new Date(<string>item.createdDate), item.createdUser);

    if (item.changes) {
      for (let change of item.changes) {
        status.changes.push(Change.fromMap(change));
      }
    }

    return status;
  }

}

