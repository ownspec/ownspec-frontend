import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {User} from "./users/user.service";


@Injectable()
export class ProjectService {

  public constructor(private $http: Http) {
  }

  response = {
    data: [
      {
        "id": "PROJECT-1",
        "title": "JPMorgan Rose",
        "description": "description1",
      },
      {
        "id": "PROJECT-2",
        "title": "NTRS",
        "description": "description2",
      },
      {
        "id": "PROJECT-3",
        "title": "Raiffeisen",
        "description": "description2",
      },
    ]

  };

  public findOne(id: string): Observable<Project> {
    return this.$http.get("/api/projects/" + id).map(r => this.fromJson(r.json()));
  }

  public findAll(): Observable<Project[]> {
    return this.fetchAll().toArray();
  }

  private fetchAll(): Observable<Project> {
    return this.$http.get("/api/projects")
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
        item.createdDate);
  }

}


export class Project {

  public constructor(public id: string,
                     public title: string,
                     public description: string,
                     public createdDate,
                     public authorizedUsers: User[] = new Array()) {
  }

}
