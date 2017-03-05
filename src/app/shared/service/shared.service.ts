import {Injectable, Output, EventEmitter} from "@angular/core";

@Injectable()
export class SharedService {

  @Output()
  public hideSideNavEvent: EventEmitter<any> = new EventEmitter();

  @Output()
  public expandMainContentEvent: EventEmitter<any> = new EventEmitter();

  @Output()
  public stateIsInAProjectEvent: EventEmitter<any> = new EventEmitter();

  //todo: use material to toggle sidenav: https://groups.google.com/forum/#!topic/angular-material2/Zf0YiWc4aA4
  public expandMainContentAndHideSideNav(expandAndHide: boolean) {
    this.hideSideNavEvent.emit(expandAndHide);
    this.expandMainContentEvent.emit(expandAndHide);
  }

  public stateIsInAProject(val: boolean, projectId: string) {
    this.stateIsInAProjectEvent.emit({
      isInAProject: val,
      projectId: projectId
    });
  }
}
