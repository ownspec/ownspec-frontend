import {User} from "../../model/user/user";
import {Status} from "../../model/component/status";
export class ComponentVersionSearchBean {

  public projectId: string = null;
  public componentTypes: string[] = [];

  public title: string = null;
  public query: string = null;
  public status: Status = null;
  public assignee: User = null;


  public reset() {
    this.projectId = null;
    this.componentTypes = null;
    this.title = null;
    this.query = null;
    this.status = null;
    this.assignee = null;

  }

  public toMap(): any {
    let map: any = {};

    if (this.projectId != null) {
      map.projectId = this.projectId;
    }
    if (this.componentTypes != null) {
      map.componentTypes = this.componentTypes;
    }
    if (this.title != null) {
      map.title = this.title;
    }
    if (this.query != null) {
      map.query = this.query;
    }
    if (this.status != null) {
      map.status = this.status.name;
    }
    if (this.assignee != null) {
      map.assigneeId = this.assignee.id;
    }

    return map;
  }


}
