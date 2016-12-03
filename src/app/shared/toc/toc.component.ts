"use strict";


import {Component as C, Input, OnInit, Output, EventEmitter, NgZone} from "@angular/core";

import {Observable} from "rxjs";
import {ComponentService} from "../service/component/component.service";
import {ProfilService} from "../users/profil.service";
import {ComponentUpdate} from "../../components/write/component-write.component";
import {Component} from "../service/component/component";
import {TocItem} from "../ckeditor/toc-generator";

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
