"use strict";


import {Component as C, Input, OnInit} from "@angular/core";
import {ComponentVersionService} from "../../shared/service/components/component-versions.service";
import {ComponentVersion} from "../../shared/model/component/component-version";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {LinkService} from "../../link/link.service";
import {ComponentHelperService} from "../helper/helper";
import {ProfileService} from "../../shared/service/user/profil.service";
import {Status} from "../../shared/model/component/status";
import {AssigneeService} from "../../shared/service/user/assignee.service";
import {User} from "../../shared/model/user/user";
import {ComponentVersionSearchBean} from "../../shared/service/components/component-versions-search";


@C({
  selector: 'components',
  templateUrl: 'components-list.template.html',
  styleUrls: ['./components-list.component.scss']
})
export class ComponentsListComponent implements OnInit {

  public components: ComponentVersion[] = [];

  @Input("componentTypes")
  public componentTypes: string[] = [];

  @Input("projectId")
  public projectId: string;

  public statuses: Status[] = [];

  public assignees: User[] = [];

  public searchBean = new ComponentVersionSearchBean();

  public constructor(private route: ActivatedRoute,
                     private linkService: LinkService,
                     private componentHelperService: ComponentHelperService,
                     private componentVersionService: ComponentVersionService,
                     private profileService: ProfileService,
                     private assigneeService: AssigneeService) {
    this.projectId = null;
  }


  ngOnInit(): void {
    Observable.combineLatest(this.route.params, this.route.data, (params, data) => ({params, data}))
        .subscribe(ap => {
          this.projectId = ap.params['projectId'];
          this.componentTypes = ap.data['componentTypes'];
          this.searchBean.componentTypes = ap.data['componentTypes'];
          this.searchBean.projectId = ap.params['projectId'];
          this.fetchComponents();
        });

    this.profileService.findCurrentProfile().subscribe(p => {
      this.statuses = p.properties.statuses;
    });

    this.assigneeService.findAll(this.projectId, !this.projectId).subscribe(u => {
      this.assignees = u;
    });

  }

  public reset() {
    this.searchBean.reset();
    this.searchBean.componentTypes = this.componentTypes;
    this.searchBean.projectId = this.projectId;
  }

  private fetchComponents() {
    this.componentVersionService.findAllBySearchBean(this.searchBean).subscribe(o => {
      this.components = o;
    });
  }

  public edit(r: ComponentVersion) {

    this.linkService.gotoEditComponent(r);
  }

  public write(r: ComponentVersion) {
    this.linkService.gotoWriteComponent(r);
  }

  public print(c: ComponentVersion) {
    this.componentVersionService.print(c);
  }

  public startCreateComponent() {
    this.componentHelperService.startCreateComponent(this.componentTypes[0], this.projectId).componentInstance.update.subscribe(c => {
      this.fetchComponents();
    });
  }

  public search() {
    this.fetchComponents();
  }

  public openUpdateStatus(c: ComponentVersion) {
    this.componentHelperService.openUpdateStatus(c).subscribe(c => {
      c.dlg.close();
      this.fetchComponents();
    });
  }
}
