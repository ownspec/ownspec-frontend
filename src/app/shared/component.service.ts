import {Observable} from "rxjs";
import {StateService} from "angular-ui-router";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {User} from "./users/user.service";

@Injectable()
export class ComponentService {


  public constructor(private $http: Http) {

  }

  public findOne(id: string, workflow = false, content = false, comments = false): Observable<Component> {
    return this.fetchOne(id, workflow, content, comments);
  }

  public findAll(projectId: string, title: string = null, types: Array<string> = []): Observable<Component[]> {
    return this.fetchAll(projectId, types)
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

  private fetchAll(projectId: string, types: Array<string> = []): Observable<Component> {
    let params: URLSearchParams = new URLSearchParams();

    if (types.length > 0) {
      for (let type of types) {
        params.append("types", type);
      }
    }

    if (projectId) {
      params.append("projectId", projectId);
    }

    return this.$http.get("/api/components", {search: params})
      .flatMap(r => r.json())
      .map((item: any) => {
        return this.fromMap(item);
      });
  }

  private fetchOne(id: string, workflow = false, content = false, comments = false): Observable<Component> {

    let params: URLSearchParams = new URLSearchParams();
    params.append("content", content.toString());
    params.append("workflow", workflow.toString());
    params.append("comments", comments.toString());

    return this.$http.get("/api/components/" + id, {search: params})
      .map(r => r.json())
      .map((item: any) => {
        return this.fromMap(item);
      });
  }


  private fromMap(item: any): Component {
    let component: Component = new Component(item.id, item.projectId, item.title, item.description,
      new Date(<string>item.createdDate), new Date(<string>item.lastUpdateDate), item.content, item.type, item.currentStatus);

    if (item.workflowStatuses) {
      for (let i of item.workflowStatuses) {
        component.statuses.push(this.workflowStatusFromMap(i));
      }
    }

    if (item.comments) {
      for (let i of item.comments) {
        component.comments.push(this.commentFromMap(i));
      }
    }


    return component;
  }

  private workflowStatusFromMap(item: any): WorkflowStatus {
    let status = new WorkflowStatus(item.id, item.status, new Date(<string>item.createdDate), item.createdUser);

    if (item.changes) {
      for (let change of item.changes) {
        status.changes.push(this.changeFromMap(change));
      }
    }

    return status;
  }

  private changeFromMap(item: any): Change {
    return new Change(item.revision, new Date(item.date), item.user);
  }


  private commentFromMap(item: any): Comment {
    return new Comment(item.id, item.value, new Date(item.createdDate), item.createdUser);
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

  create(toSave: Component) {
    return this.$http.post("/api/components/" + toSave.id + "/create",
      {title: toSave.title, description: toSave.description, type: toSave.type})
      .map(r => {
        return r.status == 200;
      });
  }
}


export class Component {

  public constructor(public id: string, public projectId:string, public title: string, public description: string,
                     public creationDate: Date, public lastUpdateDate: Date,
                     public content: string, public type: string = "REQUIREMENT", public currentStatus: string = "OPEN",
                     public statuses: WorkflowStatus[] = [],
                     public comments: Comment[] = []) {
  }

  public clone(): Component {

    let c = new Component(this.id, this.projectId, this.title, this.description, this.creationDate, this.lastUpdateDate,
      this.content, this.type, this.currentStatus);

    for (let status of this.statuses) {
      c.statuses.push(status.clone());
    }

    for (let comment of this.comments) {
      c.comments.push(comment.clone());
    }

    return c;

  }

}

export class WorkflowStatus {

  public constructor(public id: string, public status: string, public createdDate: Date,
                     public createdUser: any, public changes: Array<Change> = []) {
  }

  public clone(): WorkflowStatus {

    let c = new WorkflowStatus(this.id, this.status, this.createdDate, this.createdUser);

    for (let change of this.changes) {
      c.changes.push(change.clone());
    }
    return c;
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

export class ComponentHistory {

  constructor(public id: string, public entityId: string, public version: string, public creationDate: Date, public author: string,
              public comment: string, public details: string) {
  };
}
