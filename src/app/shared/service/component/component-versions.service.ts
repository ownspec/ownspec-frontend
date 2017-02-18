import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Component} from "../../model/component/component";
import {StateService} from "ui-router-ng2";
import {WorkflowInstance} from "../../model/component/workflow/workflow-instance";
import {ComponentVersion} from "./component-version";
import {ComponentReference} from "../../model/component/component-reference";
import {WorkflowStatus} from "../../model/component/workflow/workflow-status";

@Injectable()
export class ComponentVersionService {


  public constructor(private $http: Http) {

  }

  public findOne(id: string, statuses = false, content = false, comments = false, references = false): Observable<ComponentVersion> {

    let params: URLSearchParams = new URLSearchParams();
    params.append("content", content.toString());
    params.append("statuses", statuses.toString());
    params.append("comments", comments.toString());
    params.append("references", references.toString());

    return this.$http.get("/api/component-versions/" + id, {search: params})
      .map(r => r.json())
      .map((item: any) => {
        return ComponentVersion.fromMap(item);
      });
  }

  public findAll(projectId: string = null, title: string = null, types: Array<string> = [], query: string = null,
                 workflow = false, content = false, comments = false, references = false): Observable<ComponentVersion[]> {
    let params: URLSearchParams = new URLSearchParams();


    if (types.length > 0) {
      for (let type of types) {
        params.append("types", type);
      }
    }
    if (projectId) {
      params.append("projectId", projectId);
    }
    params.append("statuses", workflow.toString());
    params.append("comments", comments.toString());
    params.append("references", references.toString());

    if (!!query) {
      params.append("q", query);
    }

    return this.$http.get("/api/component-versions", {search: params})
      .flatMap(r => r.json())
      .map((item: any) => ComponentVersion.fromMap(item))
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


  public updateContent(id: string, content: string): Observable<ComponentVersion> {
    return this.$http.post("/api/component-versions/" + id + "/content", content)
      .map(r => ComponentVersion.fromMap(r.json()));
  }


  public getContent(id: string): Observable<string> {
    return this.$http.get("/api/component-versions/" + id + "/content")
      .map(r => r.text());
  }

  public getResolvedContent(id: string): Observable<string> {
    return this.$http.get("/api/component-versions/" + id + "/resolved-content")
      .map(r => r.text());
  }


  public updateWorkflowStatus(id: string, nextStatus:string, reason:string): Observable<WorkflowStatus> {
    return this.$http.post("/api/component-versions/" + id + "/workflow-statuses", {nextStatus:nextStatus, reason:reason})
      .map(r => WorkflowStatus.fromMap(r.json()));
  }

  public update(toSave: ComponentVersion): Observable<boolean> {
    return this.$http.patch("/api/component-versions/" + toSave.id, ComponentVersion.toMap(toSave))
      .map(r => {
        return r.status == 200;
      });
  }

  public create(toSave: ComponentVersion): Observable<boolean> {
    return this.$http.post("/api/components", ComponentVersion.toMap(toSave))
      .map(r => {
        return r.status == 200;
      });
  }


  // TODO: temporary
  getContentUrl(c: ComponentVersion) {
    return "/api/component-versions/" + c.id + "/content";
  }

  getComponentVersionUrl(c: ComponentVersion) {
    return "/api/components/" + c.id + "/versions/" + c.workflowInstance.id + "/content";
  }

  public print(c: ComponentVersion) {
    window.location.assign("/api/component-versions/" + c.id + "/compose");
  }


}



