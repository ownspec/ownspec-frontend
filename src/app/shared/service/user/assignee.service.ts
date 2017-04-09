import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "../../model/user/user";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class AssigneeService {
  public constructor(private http: Http) {

  }


  public findAll(projectId: string = null, generic:Boolean = false, title: string = null, types: Array<string> = [], query: string = null,
                 workflow = false, content = false, comments = false, references = false): Observable<User[]> {

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


    return this.http.get("/api/assignees", {search: params})
        .flatMap(r => r.json())
        .map(item => User.fromMap(item))
        .toArray();
  }
}

