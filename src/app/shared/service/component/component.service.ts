import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Component} from "./component";
import {StateService} from "ui-router-ng2";

@Injectable()
export class ComponentService {


  public constructor(private $http: Http, private stateService: StateService) {

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

  public postComment(id: string, value: string): Observable<Component> {
    return this.$http.post("/api/components/" + id + "/comments/add", value)
      .map(r => Component.fromMap(r.json()));
  }

  public save(toSave: Component): Observable<boolean> {
    return this.$http.post("/api/components/" + toSave.id + "/update", Component.toJson(toSave))
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

  create(toSave: Component): Observable<Component> {
    return this.$http.post("/api/components/create", Component.toJson(toSave))
      .map(r => {
        return Component.fromMap(r.json());
      });
  }

  public print(c: Component) {
    window.location.assign("/api/components/" + c.id + "/compose");
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
    this.stateService.go(".component-edit", {componentId: id}, {reload: false});
  }

  // TODO: temporary
  getContentUrl(c: Component) {
    return "/api/components/" + c.id + "/content";
  }
}



