import {Observable} from "rxjs";
import {Http, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import {User} from "./users/user.service";
import {StateService} from "ui-router-ng2";


@Injectable()
export class ProjectService {

  public constructor(private $http: Http,
                     private stateService: StateService) {
  }

  public findOne(id: string): Observable<Project> {
    return this.$http.get("/api/projects/" + id).map(r => this.fromJson(r.json()));
  }

  public findAll(): Observable<Project[]> {
    return this.fetchAll().toArray();
  }

  private fetchAll(mode: string = null): Observable<Project> {
    let params: URLSearchParams = new URLSearchParams();
    params.append("mode", mode);

    return this.$http.get("/api/projects", {search: params})
        .flatMap(r => r.json())
        .map((item: any) => {
          return this.fromJson(item);
        });
  }


  public save(toSave: Project): Observable<boolean> {
    return this.$http.post("/api/projects/" + toSave.id + "/update", toSave)
        .map(r => r.status == 200);
  }

  create(toSave: Project) {
    return this.$http.post("/api/projects/create", toSave)
        .map(r => r.status == 200);
  }

  fromJson(item: any): Project {
    return new Project(
        item.id,
        item.title,
        item.description,
        new Date(<string>item.createdDate));
  }


  getLastVisited(): Observable<Project[]> {
    return this.fetchAll("LAST_VISITED_ONLY").toArray();
  }

  getFavorites(): Observable<Project[]> {
    return this.fetchAll("FAVORITES_ONLY").toArray();
  }

  addVisit(projectId: number) {
    this.$http.post("/api/projects/" + projectId + "/addVisit", {}).subscribe(r => {

    }, e => {
      //todo handle exception
    });
  }

  show(projectId: number) {
    this.stateService.go("app.home.project.dashboard", {projectId: projectId}, {reload: false})
  }
}


export class Project {

  public constructor(public id: string,
                     public title: string,
                     public description: string,
                     public createdDate: Date,
                     public authorizedUsers: User[] = new Array()) {
  }

}
