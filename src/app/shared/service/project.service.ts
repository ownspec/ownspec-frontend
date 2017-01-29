import {Observable} from "rxjs";
import {Http, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import {User} from "../users/user.service";
import {StateService} from "ui-router-ng2";


@Injectable()
export class ProjectService {

  public constructor(private $http: Http,
                     private stateService: StateService) {
  }

  public findOne(id: string): Observable<Project> {
    return this.$http.get("/api/projects/" + id).map(r => Project.fromJson(r.json()));
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
          return Project.fromJson(item);
        });
  }


  public save(toSave: Project): Observable<boolean> {
    return this.$http.post("/api/projects/" + toSave.id + "/update", Project.toJson(toSave))
        .map(r => r.status == 200);
  }

  create(toSave: Project) {
    return this.$http.post("/api/projects/create", Project.toJson(toSave))
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

  show(projectId: number) {
    this.stateService.go("app.home.project.dashboard", {projectId: projectId}, {reload: false})
  }

  removeUserFromProject(project: Project, user: User) {
    this.$http.delete("/api/projects/" + project.id + "/" + user.username, {}).subscribe(r => {
    });
  }
}


export class Project {
  public id: string;
  public title: string;
  public description: string;
  public createdDate: Date;
  public lastModifiedDate: Date;
  public createdUser = new User();
  public lastModifiedUser = new User();
  public manager: User;
  public projectUsers: User[] = [];

  public constructor() {
  }

  public static fromJson(json: any): Project {

    let project: Project = new Project();
    project.id = json.id;
    project.title = json.title;
    project.description = json.description;
    project.createdDate = new Date(<string>json.createdDate);
    project.lastModifiedDate = new Date(<string>json.lastModifiedDate);
    project.createdUser = User.fromJson(json.createdUser);
    project.lastModifiedUser = User.fromJson(json.lastModifiedUser);
    project.manager = User.fromJson(json.manager);
    project.projectUsers = this.projectUsersFromJson(json);
    return project;
  }

  public static toJson(project: Project): any {
    return {
      title: project.title,
      description: project.description,
      manager: User.toJson(project.manager),
      projectUsers: project.projectUsers
          .map((u: User): any => [{
                user: User.toJson(u),
                project: this.toJson(project)
              }]
          )
    }
  }

  public static projectUsersFromJson(json: any): User[] {
    return json.projectUsers
        .map((item: any) => {
          return User.fromJson(item.user);
        });
  }
}
