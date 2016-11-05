import {Component as C, Input, EventEmitter, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Component} from "../../shared/component.service";
import {ComponentUpdate} from "./component-write.component";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */



@C({
  selector: 'write-sidenav',
  templateUrl: 'write-sidenav.component.html'
})
export class WriteSideNavComponent {

  localState: any;

  activeTab = "comments";

  @Input()
  public component : Component;

  @Output()
  public update = new EventEmitter<ComponentUpdate>();

  constructor(public route: ActivatedRoute) {
  }

  public onUpdate(event:ComponentUpdate){
    this.update.emit(event);
  }

}
