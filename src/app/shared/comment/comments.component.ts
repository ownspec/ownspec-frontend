"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {ComponentService} from "../service/component/component.service";
import {ComponentUpdate} from "../../components/write/component-write.component";
import {Component} from "../model/component/component";
import {ProfileService} from "../service/user/profil.service";
import {ComponentVersion} from "../service/component/component-version";
import {Comment} from "../model/component/comment";

@C({
  selector: 'comments',
  templateUrl: 'comments.template.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input()
  public component: ComponentVersion;

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  public comment: string;

  public comments: Comment[];


  public constructor(private componentService: ComponentService, private profileService: ProfileService) {
  }

  ngOnInit(): void {

    this.componentService.findComments(this.component.componentId).subscribe(comments => {
      this.comments = comments;
    });

  }

  public post() {
    this.componentService.postComment(this.component.componentId, this.comment)
      .subscribe(comments => {
        this.comment = "";
        this.comments = comments;
      });
  }
}
