import {
  Component as C, Input, EventEmitter, Output, animate, transition, style, state, trigger,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ComponentUpdate, ComponentWriteComponent} from "./component-write.component";
import {Component} from "../../shared/service/component/component";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */


@C({
  selector: 'write-sidenav',
  templateUrl: 'write-sidenav.component.html',
  styleUrls: ['../../../_variable.scss', './write-sidenav.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        width: '250px'
      })),
      state('out', style({
        width: '0px'
      })),
      transition('in => out', animate("400ms ease", style({width: '0px'}))),
      //transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate("400ms ease", style({width: '250px'})))
      //transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class WriteSideNavComponent implements OnInit {

  localState: any;

  activeTab = "comments";

  @Input()
  public component: Component;

  @Input()
  public canUpdateWorkflow: boolean;

  @Input()
  public menuPosition: "left" | "right" = "left";

  @Input()
  public menus: string[] = ["toc", "requirements", "components", "resources", "workflow", "comments"];

  @Output()
  public update = new EventEmitter<ComponentUpdate>();


  menuState: string = 'in';

  constructor(public parent: ComponentWriteComponent, public route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activeTab = this.menus[0];

  }

  public onUpdate(event: ComponentUpdate) {
    this.update.emit(event);
  }


  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  isVisible(menu): boolean {
    return this.menus.indexOf(menu) != -1;
  }

  tooltipPosition() {
    return this.menuPosition == 'left' ? 'right' : 'left';
  }

}
