import {User} from "./user/user";

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
    project.createdUser = User.fromMap(json.createdUser);
    project.lastModifiedUser = User.fromMap(json.lastModifiedUser);
    project.manager = User.fromMap(json.manager);
    project.projectUsers = this.projectUsersFromJson(json);
    return project;
  }

  public static toJson(project: Project): any {
    return {
      title: project.title,
      description: project.description,
      manager: User.toJson(project.manager),
      projectUsers: project.projectUsers.map((u: User) => User.toJson(u))
    }
  }

  public static projectUsersFromJson(json: any): User[] {
    return json.projectUsers.map((item: any) => User.fromMap(item));
  }
}
