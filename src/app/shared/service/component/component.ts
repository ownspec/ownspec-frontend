import {WorkflowInstance} from "./workflow-instance";
import {ComponentReference} from "./component-reference";
import {WorkflowStatus} from "./workflow-status";
import {Comment} from "./comment";
import {User} from "../../users/user.service";
import {EstimatedTime} from "./estimated-time";

export class Component {

  public constructor(public id: string, public projectId: string, public title: string, public description: string,
                     public creationDate: Date, public LastModifiedDate: Date, public createdUser: User,
                     public content: string, public summary: string, public type: string = "REQUIREMENT", public currentWorkflowStatus: WorkflowStatus,
                     public workflowInstances: WorkflowInstance[] = [],
                     public comments: Comment[] = [],
                     public componentReferences: ComponentReference[] = [],
                     public requiredTest: boolean = false,
                     public assignedTo: User = null,
                     public distributionLevel: string = "INTERNAL",
                     public requirementType: string = null,
                     public estimatedTimes: EstimatedTime[] = [],
                     public coverageStatus: string = "UNCOVERED") {
  }

  public getCurrentWorkflowInstance(): WorkflowInstance {
    return this.workflowInstances[this.workflowInstances.length - 1];
  }


  public clone(): Component {

    let c = new Component(this.id, this.projectId, this.title, this.description, this.creationDate, this.LastModifiedDate, this.createdUser,
        this.content, this.summary, this.type, this.currentWorkflowStatus.clone());

    for (let workflowInstance of this.workflowInstances) {
      c.workflowInstances.push(workflowInstance.clone());
    }

    for (let comment of this.comments) {
      c.comments.push(comment.clone());
    }

    for (let componentReference of this.componentReferences) {
      c.componentReferences.push(componentReference.clone());
    }

    return c;

  }


  public static fromMap(item: any): Component {
    let component: Component = new Component(
        item.id,
        item.projectId,
        item.title,
        item.description,
        new Date(<string>item.createdDate), new Date(<string>item.LastModifiedDate),
        User.fromJson(item.createdUser),
        item.content,
        item.summary,
        item.type,
        WorkflowStatus.fromMap(item.currentWorkflowStatus));

    if (item.workflowInstances) {
      for (let i of item.workflowInstances) {
        component.workflowInstances.push(WorkflowInstance.fromMap(i));
      }
    }

    if (item.comments) {
      for (let i of item.comments) {
        component.comments.push(Comment.fromMap(i));
      }
    }

    if (item.componentReferences) {
      for (let i of item.componentReferences) {
        component.componentReferences.push(ComponentReference.fromMap(i));
      }
    }

    if (item.estimatedTimes) {
      for (let i of item.estimatedTimes) {
        component.estimatedTimes.push(EstimatedTime.fromMap(i));
      }
    }

    return component;
  }

}
