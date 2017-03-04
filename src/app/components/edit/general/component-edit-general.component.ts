"use strict";
import {Component as C, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MdSnackBar, MdAutocompleteTrigger} from "@angular/material";
import {ComponentVersion} from "../../../shared/service/component/component-version";
import {Observable} from "rxjs";
import {ComponentVersionService} from "../../../shared/service/component/component-versions.service";
import {ComponentUpdate} from "../../write/component-write.component";
import {UserService} from "../../../shared/service/user/user.service";
import {User} from "../../../shared/model/user/user";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/startWith';

@C({
  selector: 'component-edit-general',
  templateUrl: 'component-edit-general.template.html',
  styleUrls: ['component-edit-general.component.scss']
})
export class ComponentEditGeneralComponent implements OnInit {

  @Input("componentVersion")
  public componentVersion: ComponentVersion;

  @Input("componentType")
  public componentType: string;

  @Input("create")
  public create: boolean;

  @Input("projectId")
  public projectId: string;

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  private tagToAdd: string;

  private users: User[] = [];

  private assignedUserCtrl = new FormControl();

  private filteredUsers: Observable<User[]>;

  public constructor(public snackBar: MdSnackBar,
                     private componentVersionService: ComponentVersionService,
                     private userService: UserService) {
  }


  ngOnInit(): void {
    this.userService.findAll().subscribe((result: User []) => {
      this.users = result
    }, e => {
      this.snackBar.open("Failed to retrieve all users", "x");

    });

    this.filteredUsers = this.assignedUserCtrl.valueChanges.startWith(null).map(val => this.filterUsers(val));
  }

  public save() {
    let obs: Observable<any>;

    if (this.create) {
      obs = this.componentVersionService.create(this.componentVersion);
    } else {
      obs = this.componentVersionService.update(this.componentVersion);
    }

    obs.subscribe(r => {
      let status = this.create ? "created" : "updated";
      this.snackBar.open("Component successfully " + status, "Close", {duration: 2000});
      this.update.emit(ComponentUpdate.newComponentUpdate());
    });
  }

  public addNewTag($event) {
    if ($event.keyCode != 13 || !this.tagToAdd || this.tagToAdd.trim().length <= 0) {
      return;
    }
    this.componentVersion.tags.push(this.tagToAdd);
    this.tagToAdd = "";
  }

  private filterUsers(val: string) : User[] {
    return this.users.filter((user: User) => new RegExp(val, 'gi').test(user.fullName));
  }
}
