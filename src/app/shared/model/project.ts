import {User} from "./user/user";

export class Project {
  public id: string;
  public title: string;
  public key: string;
  public description: string;
  public createdDate: Date;
  public lastModifiedDate: Date;
  public createdUser = new User();
  public lastModifiedUser = new User();
  public manager= new User();
  public projectUsers: User[] = [];

  public constructor() {
  }

  public static fromMap(item: any): Project {

    let project: Project = new Project();
    project.id = item.id;
    project.title = item.title;
    project.key = item.key;
    project.description = item.description;
    project.createdDate = new Date(<string>item.createdDate);
    project.lastModifiedDate = new Date(<string>item.lastModifiedDate);
    project.createdUser = User.fromMap(item.createdUser);
    project.lastModifiedUser = User.fromMap(item.lastModifiedUser);
    project.manager = User.fromMap(item.manager);
    project.projectUsers = this.projectUsersFromJson(item);
    return project;
  }

  public static toMap(project: Project): any {
    return {
      title: project.title,
      key: project.key,
      description: project.description,
      manager: User.toMap(project.manager),
      projectUsers: project.projectUsers.map((u: User) => User.toMap(u))
    }
  }

  public static projectUsersFromJson(json: any): User[] {
    return json.projectUsers.map((item: any) => User.fromMap(item));
  }
}
