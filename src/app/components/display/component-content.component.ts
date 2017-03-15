"use strict";


import {Component as C, Input, OnInit} from "@angular/core";
import {ComponentVersion} from "../../shared/model/component/component-version";
import {ComponentService} from "../../shared/service/components/component.service";


@C({
  selector: 'component-content',
  //styleUrls: ['components.component.scss'],
  templateUrl: 'component-content.template.html',
})
export class ComponentContentComponent implements OnInit {

  @Input()
  public componentVersion: ComponentVersion;

  private content: string;

  public constructor(private componentService: ComponentService) {
  }

  ngOnInit(): void {
    if (!this.isResource) {
      this.componentService.getContent(this.componentVersion.id).subscribe(c => this.content = c);
    } else {
    }
  }


  get isResource(): boolean {
    return this.componentVersion.type == "RESOURCE";
  }

  get url() {
    return this.componentService.getComponentVersionUrl(this.componentVersion);
  }


}
