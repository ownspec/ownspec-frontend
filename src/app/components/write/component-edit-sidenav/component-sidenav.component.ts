import {Component as C, EventEmitter, Input, OnInit} from "@angular/core";
import {EditorEvent} from "../component-write.component";
import {ComponentVersion} from "../../../shared/model/component/component-version";
import {ComponentVersionService} from "../../../shared/service/components/component-versions.service";
import {MdSnackBar} from "@angular/material";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */


@C({
  selector: 'component-edit-sidenav',
  templateUrl: 'component-sidenav.component.html',
  styleUrls: ['./component-sidenav.component.scss'],
})
export class ComponentSideNavComponent implements OnInit {

  @Input()
  public editorEvent: EventEmitter<EditorEvent>;

  public componentVersion: ComponentVersion;


  public constructor(private componentVersionService: ComponentVersionService,
                     private snackBar: MdSnackBar) {
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

  public save() {
    this.componentVersionService.update(this.componentVersion).subscribe(r => {
      this.snackBar.open(this.componentVersion.type + " successfully updated", "Close", {duration: 2000});
    });
  }
}
