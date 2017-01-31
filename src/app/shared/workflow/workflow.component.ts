"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone} from "@angular/core";

import {Observable} from "rxjs";
import {ComponentService} from "../service/component/component.service";
import {ProfilService} from "../users/profil.service";
import {Component} from "../service/component/component";
import {Change} from "../service/component/change";


@C({
  selector: 'workflow',
  templateUrl: './workflow.template.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  @Input()
  public component: Component;

  @Input()
  public canUpdateWorkflow:Boolean;

  @Output()
  public update = new EventEmitter<Component>();

  public targetStatus: string;

  public reason: string;
  public isopen: boolean = false;

  public statuses = [];

  public visibleStatuses = {};

  public constructor(private zone:NgZone, private componentService: ComponentService, private profilService: ProfilService) {
  }

  ngOnInit(): void {

    //this.component.currentStatus.transitions;

    this.profilService.findCurrentProfile().subscribe(p => {
      this.statuses = p.properties.statuses;
    });

  }

  public changeStatus() {
    this.componentService.updateStatus(this.component.id, this.targetStatus, this.reason)
      .subscribe(c => {
        //this.component = c;
        this.update.emit(c);
      });
  }

  public newStatus() {
    this.componentService.newStatus(this.component.id)
      .subscribe(c => {
        //this.component = c;
        this.update.emit(c);
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
