"use strict";


import {Component as C, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {TocItem} from "../../../shared/ckeditor/toc-generator";

@C({
  selector: 'toc',
  templateUrl: 'toc.template.html',
  styleUrls: ['toc.component.scss']
})
export class TocComponent implements OnInit {

  @Input()
  public tocItems: TocItem[];

  @Output()
  public gotoTocItem = new EventEmitter<TocItem>();


  public constructor() {
  }

  ngOnInit(): void {
  }

  click(tocItem:TocItem){
    this.gotoTocItem.emit(tocItem);
  }

}
