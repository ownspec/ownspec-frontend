"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone} from "@angular/core";
import {ComponentService} from "../service/component/component.service";
import {ProfilService} from "../service/users/profil.service";
import {Component} from "../model/component/component";
import {Change} from "../model/component/change";
import {ProfileService} from "../service/user/profil.service";
import {ComponentVersion} from "../service/component/component-version";
import {ComponentVersionService} from "../service/component/component-versions.service";
import {ComponentUpdate} from "../../components/write/component-write.component";


@C({
  selector: 'workflow',
  templateUrl: './workflow.template.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  @Input()
  public component: ComponentVersion;

  @Input()
  public canUpdateWorkflow:Boolean;

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  public targetStatus: string;

  public reason: string;
  public isopen: boolean = false;

  public statuses = [];

  public visibleStatuses = {};

  public constructor(private zone:NgZone, private componentService: ComponentService, private componentVersionService: ComponentVersionService, private profileService: ProfileService) {
  }

  ngOnInit(): void {

    //this.component.currentStatus.transitions;

    this.profileService.findCurrentProfile().subscribe(p => {
      this.statuses = p.properties.statuses;
    });

  }

  public changeStatus() {
    this.componentVersionService.updateWorkflowStatus(this.component.id, this.targetStatus, this.reason)
      .subscribe(c => {
        //this.component = c;
        this.update.emit(ComponentUpdate.newComponentUpdate());
      });
  }

  public newStatus() {
    this.componentService.newStatus(this.component.id)
      .subscribe(c => {
        //this.component = c;
        this.update.emit(ComponentUpdate.newComponentUpdate());
      });
  }

  public diff(change:Change){
    this.componentService.diff(this.component.id , null, change.revision).subscribe(d => {

      /*this.modal.alert()
        .size("lg")
        .showClose(true)
        .title('Diff')
        .body(d)
        .open();
*/
    });
  }


  display($event){
    console.log($event);
  }


}
