"use strict";


import {Component as C, Input, OnInit} from "@angular/core";
import {ComponentService} from "../../service/component/component.service";
import {ProfilService} from "../../service/users/profil.service";
import {TagService} from "../../service/component/tag.service";
import {ComponentVersion} from "../../service/component/component-version";
import {ProfileService} from "../../service/user/profil.service";


@C({
  selector: 'component-content',
  //styleUrls: ['components.component.scss'],
  templateUrl: 'component-content.template.html',
})
export class ComponentContentComponent implements OnInit {

  @Input()
  public componentVersion: ComponentVersion;

  private content: string;

  public constructor(private componentService: ComponentService, private profileService: ProfileService, private tagService: TagService) {
  }

  ngOnInit(): void {
    if (!this.isResource) {
      this.componentService.getContent(this.componentVersion.id, this.componentVersion.workflowInstance.id).subscribe(c => this.content = c);
    }else{
    }
  }


  get isResource(): boolean {
    return this.componentVersion.type == "RESOURCE";
  }

  get url(){
    return this.componentService.getComponentVersionUrl(this.componentVersion);
  }


}
