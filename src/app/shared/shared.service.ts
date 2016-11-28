import {Injectable, Output, EventEmitter} from "@angular/core";

@Injectable()
export class SharedService {

  @Output()
  public hideSideNavEvent: EventEmitter<any> = new EventEmitter();

  @Output()
  public expandMainContentEvent: EventEmitter<any> = new EventEmitter();


  public expandMainContentAndHideSideNav(expandAndHide: boolean) {
    this.hideSideNavEvent.emit(expandAndHide);
    this.expandMainContentEvent.emit(expandAndHide);
  }
}
