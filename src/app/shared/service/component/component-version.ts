import {WorkflowInstance} from "./workflow-instance";
import {ComponentReference} from "./component-reference";
import {WorkflowStatus} from "./workflow-status";
import {Comment} from "./comment";
import {User} from "../../users/user.service";
import {EstimatedTime} from "./estimated-time";

export class ComponentVersion {
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
  public workflowInstance: WorkflowInstance;
  public componentReferences: ComponentReference[] = [];

  public uploadedFileId: string;
  public filename: string;

  public tags: string[] = [];

  public constructor(public id: string, public title: string, public projectId: string, public type: string) {
  }



  public clone(): ComponentVersion {

    let c = new ComponentVersion(this.id, this.title, this.projectId, this.type);

    c.content = this.content;
    c.summary = this.summary;

    c.creationDate = this.creationDate;
    c.lastModifiedDate = this.lastModifiedDate;
    c.createdUser = this.createdUser;

    c.workflowInstance = this.workflowInstance.clone();

    c.tags = this.tags;


    for (let componentReference of this.componentReferences) {
      c.componentReferences.push(componentReference.clone());
    }

    return c;

  }


  public static fromMap(item: any): ComponentVersion {
    let component: ComponentVersion = new ComponentVersion(item.id, item.title, item.projectId, item.type);

    component.creationDate = new Date(<string>item.createdDate);
    component.lastModifiedDate = new Date(<string>item.LastModifiedDate);
    component.createdUser = User.fromJson(item.createdUser);

    component.content = item.content;
    component.summary = item.summary;
    component.requiredTest = item.requiredTest;
    component.distributionLevel = item.distributionLevel;
    component.requirementType = item.requirementType;
    component.coverageStatus = item.coverageStatus;
    component.workflowInstance = WorkflowInstance.fromMap(item.workflowInstance);

    component.tags = item.tags || [];


    if (item.componentReferences) {
      for (let i of item.componentReferences) {
        component.componentReferences.push(ComponentReference.fromMap(i));
      }
    }

    if (item.assignedTo) {
      component.assignedTo = User.fromJson(item.assignedTo);
    }

    if (item.estimatedTimes) {
      for (let i of item.estimatedTimes) {
        component.estimatedTimes.push(EstimatedTime.fromMap(i));
      }
    }

    return component;
  }

  public static toJson(component: ComponentVersion): any {
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
