import {WorkflowInstance} from "./workflow/workflow-instance";
import {ComponentReference} from "./component-reference";
import {Comment} from "./comment";
import {EstimatedTime} from "./estimated-time";
import {User} from "../user/user";

export class Component {
  public content: string;
  public summary: string;

  public creationDate: Date;
  public lastModifiedDate: Date;
  public createdUser: User;

  public distributionLevel: string;
  public requirementType: string;
  public coverageStatus: string;

  public assignedTo: User;
  public requiredTest: boolean;

  public estimatedTimes: EstimatedTime[] = [];
  public currentWorkflowInstance: WorkflowInstance;
  public workflowInstances: WorkflowInstance[] = [];
  public comments: Comment[] = [];
  public componentReferences: ComponentReference[] = [];

  public uploadedFileId: string;
  public filename: string;

  public tags: string[] = [];

  public constructor(public id: string, public title: string, public projectId: string, public type: string) {
  }

  public getCurrentWorkflowInstance(): WorkflowInstance {
    return this.workflowInstances[this.workflowInstances.length - 1];
  }


  public clone(): Component {

    let c = new Component(this.id, this.title, this.projectId, this.type);

    c.content = this.content;
    c.summary = this.summary;

    c.creationDate = this.creationDate;
    c.lastModifiedDate = this.lastModifiedDate;
    c.createdUser = this.createdUser;

    c.currentWorkflowInstance = this.currentWorkflowInstance.clone();

    c.tags = this.tags;

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
    let component: Component = new Component(item.id, item.title, item.projectId, item.type);

    component.creationDate = new Date(<string>item.createdDate);
    component.lastModifiedDate = new Date(<string>item.LastModifiedDate);
    component.createdUser = User.fromMap(item.createdUser);

    component.content = item.content;
    component.summary = item.summary;
    component.requiredTest = item.requiredTest;
    component.distributionLevel = item.distributionLevel;
    component.requirementType = item.requirementType;
    component.coverageStatus = item.coverageStatus;
    component.currentWorkflowInstance = WorkflowInstance.fromMap(item.currentWorkflowInstance);

    component.tags = item.tags || [];

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

    if (item.assignedTo) {
      component.assignedTo = User.fromMap(item.assignedTo);
    }

    if (item.estimatedTimes) {
      for (let i of item.estimatedTimes) {
        component.estimatedTimes.push(EstimatedTime.fromMap(i));
      }
    }

    return component;
  }

  public static toJson(component: Component): any {
    return {
      title: component.title,
      type: component.type,
      projectId: component.projectId,
      requirementType: component.requirementType,
      // assignedTo: User.toJson(component.assignedTo),
      requiredTest: component.requiredTest,
      // estimatedTimes: component.estimatedTimes.map(e => EstimatedTime.toJson(e)).toString(),
      distributionLevel: component.distributionLevel,
      coverageStatus: component.coverageStatus,

      uploadedFileId: component.uploadedFileId,
      filename: component.filename,

      tags: component.tags
    };
  }

}
