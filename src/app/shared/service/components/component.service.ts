import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Component} from "../../model/component/component";
import {ComponentVersion} from "../../model/component/component-version";
import {ComponentReference} from "../../model/component/component-reference";
import {Comment} from "../../model/component/comment";

@Injectable()
export class ComponentService {


  public constructor(private $http: Http) {

  }

  public findOne(id: string, workflow = false, content = false, comments = false, references = false): Observable<Component> {
    return this.fetchOne(id, workflow, content, comments, references);
  }

  public findAll(projectId: string = null, title: string = null, types: Array<string> = [], query: string = null,
                 workflow = false, content = false, comments = false, references = false): Observable<Component[]> {
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

    if (!!query) {
      params.append("q", query);
    }

    return this.$http.get("/api/components", {search: params})
      .flatMap(r => r.json())
      .map((item: any) => Component.fromMap(item))
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
        return Component.fromMap(item);
      });
  }


  public updateContent(id: string, content: string): Observable<Component> {
    return this.$http.post("/api/components/" + id + "/content", content)
      .map(r => Component.fromMap(r.json()));
  }

  public updateContentWithUploadId(id: string, uploadId: string): Observable<Component> {

    let params: URLSearchParams = new URLSearchParams();
    params.append("uploadId", uploadId);

    return this.$http.post("/api/components/" + id + "/content", "", params)
      .map(r => Component.fromMap(r.json()));
  }

  public updateStatus(id: string, nextStatus: string, reason: string = ""): Observable<Component> {
    return this.$http.post("/api/components/" + id + "/workflow-statuses/update/" + nextStatus, "")
      .map(r => Component.fromMap(r.json()));
  }

  public newStatus(id: string,): Observable<Component> {
    return this.$http.post("/api/components/" + id + "/workflow-statuses/new", "")
      .map(r => Component.fromMap(r.json()));
  }

  public findComments(id: string): Observable<Comment[]> {
    return this.$http.get("/api/components/" + id + "/comments")
      .flatMap(r => r.json())
      .map(r => Comment.fromMap(r))
      .toArray();
  }

  public postComment(id: string, value: string): Observable<Comment[]> {
    return this.$http.post("/api/components/" + id + "/comments", value)
      .flatMap(r => r.json())
      .map(r => Comment.fromMap(r))
      .toArray();
  }

  public save(toSave: ComponentVersion): Observable<boolean> {
    return this.$http.post("/api/components/" + toSave.id + "/update", ComponentVersion.toMap(toSave))
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

  public create(toSave: ComponentVersion): Observable<ComponentVersion> {
    return this.$http.post("/api/components", ComponentVersion.toMap(toSave))
        .map(r => r.json())
        .map((item: any) => {
          return ComponentVersion.fromMap(item);
        });
  }

  getLastVisitedRequirements(): Observable<Component[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.append("mode", "LAST_VISITED_ONLY");
    params.append("types", "REQUIREMENT");

    return this.$http.get("/api/components", {search: params})
      .flatMap(r => r.json())
      .map((item: any) => Component.fromMap(item))
      .toArray();
  }

  getLastVisitedDocuments(): Observable<Component[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.append("mode", "LAST_VISITED_ONLY");
    params.append("types", "DOCUMENT");

    return this.$http.get("/api/components", {search: params})
      .flatMap(r => r.json())
      .map((item: any) => Component.fromMap(item))
      .toArray();

  }

  addVisit(componentId: number) {
    this.$http.post("/api/components/" + componentId + "/addVisit", {}).subscribe(r => {

    }, e => {

    })
  }

  edit(id: number) {
    //this.stateService.go(".component-edit", {componentId: id}, {reload: false});
  }

  // TODO: temporary
  getContentUrl(c: Component) {
    return "/api/components/" + c.id + "/content";
  }

  getComponentVersionUrl(c: ComponentVersion) {
    return "/api/components/" + c.id + "/versions/" + c.workflowInstance.id + "/content";
  }


  findVersions(componentId, statuses = false, references = false): Observable<ComponentVersion[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.append("statuses", statuses.toString());
    params.append("references", references.toString());

    return this.$http.get("/api/components/" + componentId + "/versions", {search: params})
      .flatMap(r => r.json())
      .map(r => {
        return ComponentVersion.fromMap(r);
      })
      .toArray();
  }

  findVersion(componentId, workflowInstanceId, statuses = false, references = false, usePoints = false): Observable<ComponentVersion> {
    let params: URLSearchParams = new URLSearchParams();
    params.append("statuses", statuses.toString());
    params.append("references", references.toString());
    params.append("usePoints", usePoints.toString());

    return this.$http.get("/api/components/" + componentId + "/versions/" + workflowInstanceId, {search: params})
      .map(r => r.json())
      .map(r => {
        return ComponentVersion.fromMap(r);
      });
  }

  getContent(componentVersionId): Observable<string> {
    return this.$http.get("/api/component-versions/" + componentVersionId + "/resolved-content")
      .map(r => r.text());
  }


  updateReference(sourceComponentVersionId, refId, targetComponentVersionId): Observable<any> {
    return this.$http.post("/api/component-versions/" + sourceComponentVersionId + "/references/" + refId + "/" + targetComponentVersionId, {});
  }

  findUsePoints(targetComponentId, targetWorkflowInstanceId): Observable<ComponentReference[]> {
    return this.$http.get("/api/components/" + targetComponentId + "/versions/" + targetWorkflowInstanceId + "/use-points")
      .flatMap(r => r.json())
      .map(r => {
        return ComponentReference.fromMap(r);
      }).toArray();

  }


}



