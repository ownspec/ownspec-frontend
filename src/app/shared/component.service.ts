import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {User} from "./users/user.service";

@Injectable()
export class ComponentService {


  public constructor(private $http: Http) {

  }

  public findOne(id: string, workflow = false, content = false, comments = false, references = false): Observable<Component> {
    return this.fetchOne(id, workflow, content, comments, references);
  }

  public findAll(projectId: string, title: string = null, types: Array<string> = [], workflow = false, content = false, comments = false, references = false): Observable<Component[]> {
    let params: URLSearchParams = new URLSearchParams();


    if (types.length > 0) {
      for (let type of types) {
        params.append("types", type);
      }
    }
    if (projectId) {
      params.append("projectId", projectId);
    }
    params.append("content", content.toString());
    params.append("workflow", workflow.toString());
    params.append("comments", comments.toString());
    params.append("references", references.toString());

    return this.$http.get("/api/components", {search: params})
      .flatMap(r => r.json())
      .map((item: any) => this.fromMap(item))
      .filter(item => {
        let result = true;
        if (title && item.title.indexOf(title) == -1) {
          result = false;
        }
        if (types.length > 0 && types.indexOf(item.type) == -1) {
          result = false;
        }
        return result;
      }).toArray();
  }


  private fetchOne(id: string, workflow = false, content = false, comments = false, references = false): Observable<Component> {

    let params: URLSearchParams = new URLSearchParams();
    params.append("content", content.toString());
    params.append("workflow", workflow.toString());
    params.append("comments", comments.toString());
    params.append("references", references.toString());

    return this.$http.get("/api/components/" + id, {search: params})
      .map(r => r.json())
      .map((item: any) => {
        return this.fromMap(item);
      });
  }


  private fromMap(item: any): Component {
    let component: Component = new Component(item.id, item.projectId, item.title, item.description,
      new Date(<string>item.createdDate), new Date(<string>item.lastUpdateDate), item.content, item.type, item.currentStatus);

    if (item.workflowInstances) {
      for (let i of item.workflowInstances) {
        component.workflowInstances.push(this.workflowInstanceFromMap(i));
      }
    }

    if (item.comments) {
      for (let i of item.comments) {
        component.comments.push(this.commentFromMap(i));
      }
    }

    if (item.componentReferences) {
      for (let i of item.componentReferences) {
        component.componentReferences.push(this.componentReferenceFromMap(i));
      }
    }


    return component;
  }

  private workflowInstanceFromMap(item: any): WorkflowInstance {
    let workflowInstance = new WorkflowInstance(item.id, item.currentStatus, new Date(<string>item.createdDate), item.createdUser);

    if (item.workflowStatuses) {
      for (let workflowStatuse of item.workflowStatuses) {
        workflowInstance.workflowStatuses.push(this.workflowStatusFromMap(workflowStatuse));
      }
    }

    return workflowInstance;
  }

  private workflowStatusFromMap(item: any): WorkflowStatus {
    let status = new WorkflowStatus(item.id, this.statusFromMap(item.status), new Date(<string>item.createdDate), item.createdUser);

    if (item.changes) {
      for (let change of item.changes) {
        status.changes.push(this.changeFromMap(change));
      }
    }

    return status;
  }

  private statusFromMap(item: any): Status {
    return new Status(item.name, item.isEditable, item.isFinal, item.transitions);
  }

  private changeFromMap(item: any): Change {
    return new Change(item.revision, new Date(item.date), item.user);
  }


  private commentFromMap(item: any): Comment {
    return new Comment(item.id, item.value, new Date(item.createdDate), item.createdUser);
  }

  private componentReferenceFromMap(item: any): ComponentReference {
    return new ComponentReference(item.id,
      this.fromMap(item.source), this.workflowInstanceFromMap(item.sourceWorkflowInstance),
      this.fromMap(item.target), this.workflowInstanceFromMap(item.targetWorkflowInstance),
      new Date(<string>item.createdDate), item.createdUser);
  }


  public updateContent(id: string, content: string): Observable<Component> {
    return this.$http.post("/api/components/" + id + "/update-content", content)
      .map(r => this.fromMap(r.json()));
  }

  public updateStatus(id: string, nextStatus: string, reason: string = ""): Observable<Component> {
    return this.$http.post("/api/components/" + id + "/workflow-statuses/" + nextStatus, "")
      .map(r => this.fromMap(r.json()));
  }

  public postComment(id: string, value: string): Observable<Component> {
    return this.$http.post("/api/components/" + id + "/comments/add", value)
      .map(r => this.fromMap(r.json()));
  }

  public save(toSave: Component): Observable<boolean> {
    return this.$http.post("/api/components/" + toSave.id + "/update",
      {id: toSave.id, title: toSave.title, description: toSave.description, type: toSave.type})
      .map(r => {
        return r.status == 200;
      });
  }

  public diff(id: string, from: string, to: string): Observable<string> {
    let params: URLSearchParams = new URLSearchParams();
    params.append("from", from);
    params.append("to", to);

    return this.$http.get("/api/components/" + id + "/diff", {search: params})
      .map(r => r.text());
  }

  create(toSave: Component) {
    return this.$http.post("/api/components/" + toSave.id + "/create",
      {title: toSave.title, description: toSave.description, type: toSave.type})
      .map(r => {
        return r.status == 200;
      });
  }
}


export class Component {

  public constructor(public id: string, public projectId: string, public title: string, public description: string,
                     public creationDate: Date, public lastUpdateDate: Date,
                     public content: string, public type: string = "REQUIREMENT", public currentStatus: string = "OPEN",
                     public workflowInstances: WorkflowInstance[] = [],
                     public comments: Comment[] = [],
                     public componentReferences: ComponentReference[] = []) {
  }

  public getCurrentWorkflowInstance(): WorkflowInstance {
    return this.workflowInstances[this.workflowInstances.length - 1];
  }


  public clone(): Component {

    let c = new Component(this.id, this.projectId, this.title, this.description, this.creationDate, this.lastUpdateDate,
      this.content, this.type, this.currentStatus);

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

}

export class WorkflowInstance {

  public constructor(public id: string, public currentStatus: string, public createdDate: Date,
                     public createdUser: any, public workflowStatuses: Array<WorkflowStatus> = []) {
  }

  public getCurrentWorkflowStatus(): WorkflowStatus {
    return this.workflowStatuses[this.workflowStatuses.length - 1];
  }


  public clone(): WorkflowInstance {

    let c = new WorkflowInstance(this.id, this.currentStatus, this.createdDate, this.createdUser);

    for (let workflowStatuse of this.workflowStatuses) {
      c.workflowStatuses.push(workflowStatuse.clone());
    }
    return c;
  }
}

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
}


export class Status {
  public constructor(public name: string, public editable: boolean, public final: boolean, public transitions: string[]) {

  }

  public clone(): Status {
    return new Status(this.name, this.editable, this.final, this.transitions);
  }
}


export class Change {
  public constructor(public revision: string, public date: Date, public user: any) {

  }

  public clone(): Change {
    return new Change(this.revision, this.date, this.user);
  }
}

export class Comment {
  public constructor(public id: string, public value: string, public createdDate: Date, public createdUser: User) {

  }

  public clone(): Comment {
    return new Comment(this.id, this.value, this.createdDate, this.createdUser);
  }
}

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
}
