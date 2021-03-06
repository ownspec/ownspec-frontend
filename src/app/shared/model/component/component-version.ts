import {WorkflowInstance} from "./workflow/workflow-instance";
import {ComponentReference} from "./component-reference";
import {EstimatedTime} from "./estimated-time";
import {User} from "../user/user";
import {RiskAssessment} from "./risk-assessment";

export class ComponentVersion {
  public content: string;
  public summary: string;

  public version: string;

  public codeNumber: number;

  public creationDate: Date;
  public lastModifiedDate: Date;
  public createdUser: User;
  public lastModifiedUser: User;

  public distributionLevel: string;
  public requirementType: string;
  public coverageStatus: string;

  public assignedTo: User;
  public requiredTest: boolean;

  public estimatedTimes: EstimatedTime[] = [];
  public workflowInstance: WorkflowInstance;
  public componentReferences: ComponentReference[] = [];
  public componentUsePoints: ComponentReference[] = [];

  public uploadedFileId: string;
  public filename: string;

  public tags: string[] = [];

  public gitReference: string;

  private riskAssessment = new RiskAssessment();


  public constructor(public id: string, public componentId: string, public title: string, public code: string, public projectId: string, public type: string) {
  }


  public clone(): ComponentVersion {

    let c = new ComponentVersion(this.id, this.componentId, this.title, this.code, this.projectId, this.type);

    c.codeNumber = this.codeNumber;
    c.version = this.version;
    c.content = this.content;
    c.summary = this.summary;

    c.creationDate = this.creationDate;
    c.lastModifiedDate = this.lastModifiedDate;
    c.createdUser = this.createdUser;
    c.lastModifiedUser = this.lastModifiedUser;

    c.workflowInstance = this.workflowInstance.clone();

    c.tags = this.tags;

    c.gitReference = this.gitReference;

    for (let componentReference of this.componentReferences) {
      c.componentReferences.push(componentReference.clone());
    }

    for (let componentUsePoint of this.componentUsePoints) {
      c.componentUsePoints.push(componentUsePoint.clone());
    }

    return c;

  }


  public static fromMap(item: any): ComponentVersion {
    let component: ComponentVersion = new ComponentVersion(item.id, item.componentId, item.title, item.code, item.projectId, item.type);

    component.codeNumber = item.codeNumber;
    component.version = item.version;

    component.creationDate = new Date(<string>item.createdDate);
    component.lastModifiedDate = new Date(<string>item.lastModifiedDate);
    component.createdUser = User.fromMap(item.createdUser);
    component.lastModifiedUser = User.fromMap(item.lastModifiedUser);

    component.content = item.content;
    component.summary = item.summary;
    component.requiredTest = item.requiredTest;
    component.distributionLevel = item.distributionLevel;
    component.requirementType = item.requirementType;
    component.coverageStatus = item.coverageStatus;
    component.workflowInstance = WorkflowInstance.fromMap(item.workflowInstance);

    component.tags = item.tags || [];

    component.gitReference = item.gitReference;


    if (item.componentReferences) {
      for (let i of item.componentReferences) {
        component.componentReferences.push(ComponentReference.fromMap(i));
      }
    }
    if (item.componentUsePoints) {
      for (let i of item.componentUsePoints) {
        component.componentUsePoints.push(ComponentReference.fromMap(i));
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

    if (item.riskAssessment) {
      component.riskAssessment = RiskAssessment.fromMap(item.riskAssessment);
    }

    return component;
  }

  public static toMap(component: ComponentVersion): any {
    let res: any = {
      title: component.title,
      type: component.type,
      code: component.code,
      projectId: component.projectId,
      requirementType: component.requirementType,
      // assignedTo: ,
      requiredTest: component.requiredTest,
      estimatedTimes: component.estimatedTimes.map(e => EstimatedTime.toMap(e)),
      distributionLevel: component.distributionLevel,
      coverageStatus: component.coverageStatus,

      uploadedFileId: component.uploadedFileId,
      filename: component.filename,

      tags: component.tags,

      riskAssessment: RiskAssessment.toMap(component.riskAssessment)
    };

    if (!!component.assignedTo) {
      res.assignedTo = User.toMap(component.assignedTo);
    }


    return res;
  }

}
