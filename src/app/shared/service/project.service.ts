import {Observable} from "rxjs";
import {Http, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import {Project} from "../model/project";
import {User} from "../model/user/user";


@Injectable()
export class ProjectService {

  public constructor(private $http: Http) {
  }

  public findOne(id: string): Observable<Project> {
    return this.$http.get("/api/projects/" + id).map(r => Project.fromMap(r.json()));
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
          return Project.fromMap(item);
        });
  }


  public save(toSave: Project): Observable<boolean> {
    return this.$http.patch("/api/projects/" + toSave.id + "/update", Project.toMap(toSave))
        .map(r => r.status == 200);
  }

  create(toSave: Project) {
    return this.$http.post("/api/projects", Project.toMap(toSave))
        .map(r => r.status == 200);
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
  removeUserFromProject(project: Project, user: User): Observable<any> {
    return this.$http.delete("/api/projects/" + project.id + "/" + user.username, {});
  }
}
