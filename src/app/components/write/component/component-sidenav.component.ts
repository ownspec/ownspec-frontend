import {
  Component as C, Input, EventEmitter, Output, animate, transition, style, state, trigger,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ComponentUpdate, EditorEvent} from "../component-write.component";
import {ComponentVersion} from "../../../shared/service/component/component-version";
import {ComponentVersionService} from "../../../shared/service/component/component-versions.service";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */


@C({
  selector: 'component-sidenav',
  templateUrl: 'component-sidenav.component.html',
  styleUrls: ['./component-sidenav.component.scss'],
})
export class ComponentSideNavComponent implements OnInit {

  @Input()
  public editorEvent:EventEmitter<EditorEvent>;

  public componentVersion:ComponentVersion;


  public constructor(private componentVersionService: ComponentVersionService) {
  }

  ngOnInit(): void {
    console.log("c side nav");
    console.log(this.editorEvent);
    if (this.editorEvent) {
      this.editorEvent.subscribe(e => {
        console.log("event!!");
        this.componentVersionService.findOne(e.componentVersionId).subscribe(cv => this.componentVersion = cv);
      });
    }
  }
}
