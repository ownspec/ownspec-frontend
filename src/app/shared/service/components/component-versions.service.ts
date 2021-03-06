import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {ComponentVersion} from "../../model/component/component-version";
import {WorkflowStatus} from "../../model/component/workflow/workflow-status";
import {ComponentVersionSearchBean} from "./component-versions-search";
import {EstimatedComponentVersion} from "../../model/component/reports/estimated-component-version";
import {PaginatedResult} from "../../model/paginated-result";

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

  public findAllBySearchBean(cvs: ComponentVersionSearchBean, offset = 0, size = 100): Observable<PaginatedResult<ComponentVersion>> {

    let params: URLSearchParams = new URLSearchParams();
    params.append("offset", offset.toString());
    params.append("size", size.toString());

    return this.$http.post("/api/search/component-versions", cvs.toMap(), {search: params})
      .map(r => r.json())
      .map(r => {
        let result = [];
        for (let item of r.result) {
          result.push(ComponentVersion.fromMap(item));
        }
        return new PaginatedResult(r.offset, r.size, r.total, result);
      });
  }


  public findAll(projectId: string = null, generic: Boolean = false, title: string = null, types: Array<string> = [], query: string = null,
                 workflow = false, content = false, comments = false, references = false): Observable<PaginatedResult<ComponentVersion>> {
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

    if (!!generic) {
      params.append("generic", generic.toString());
    }

    if (!!query) {
      params.append("q", query);
    }

    return this.$http.get("/api/component-versions", {search: params})
      .map(r => r.json())
      .map(r => {
        let result = [];
        for (let item of r.result) {
          result.push(ComponentVersion.fromMap(item));
        }
        return new PaginatedResult(r.offset, r.size, r.total, result);
      });
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


  public updateWorkflowStatus(id: string, nextStatus: string, reason: string): Observable<WorkflowStatus> {
    return this.$http.post("/api/component-versions/" + id + "/workflow-statuses", {
      nextStatus: nextStatus,
      reason: reason
    })
      .map(r => WorkflowStatus.fromMap(r.json()));
  }

  public update(toSave: ComponentVersion): Observable<ComponentVersion> {
    console.log(toSave);
    return this.$http.patch("/api/component-versions/" + toSave.id, ComponentVersion.toMap(toSave))
      .map(r => r.json())
      .map((item: any) => {
        return ComponentVersion.fromMap(item);
      });
  }

  // TODO: temporary
  getContentUrl(c: ComponentVersion) {
    return "/api/component-versions/" + c.id + "/content?ref=" + c.gitReference;
  }

  getComponentVersionUrl(c: ComponentVersion) {
    return "/api/components/" + c.id + "/versions/" + c.workflowInstance.id + "/content";
  }

  public print(c: ComponentVersion) {
    window.location.assign("/api/component-versions/" + c.id + "/compose");
  }

  public estimatedTimes(cvId, mode = null): Observable<Array<EstimatedComponentVersion>> {

    return this.$http.get("/api/component-versions/" + cvId + "/estimated-times")
      .flatMap(r => r.json())
      .map(item => EstimatedComponentVersion.fromMap(item))
      .toArray();
  }

  public exportEstimatedTimes(cvId) {

    window.location.assign("/api/component-versions/" + cvId + "/estimated-times?output=excel");

  }


}



