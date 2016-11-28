"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone} from "@angular/core";

import {Observable} from "rxjs";
import {ComponentService} from "../service/component/component.service";
import {ProfilService} from "../users/profil.service";
import {ComponentUpdate} from "../../components/write/component-write.component";
import {Component} from "../service/component/component";

@C({
  selector: 'comments',
  templateUrl: 'comments.template.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input()
  public component: Component;

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  public comment: string;


  public constructor(private componentService: ComponentService, private profilService: ProfilService) {
  }

  ngOnInit(): void {
  }

  public post() {
    this.componentService.postComment(this.component.id, this.comment)
      .subscribe(c => {
        this.comment = "";
        this.update.emit(new ComponentUpdate(false, false, false, true));
      });
  }
}
