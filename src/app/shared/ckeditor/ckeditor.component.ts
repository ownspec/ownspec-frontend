// Imports
import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  NgZone,
  forwardRef,
  NgModule, AfterViewInit, OnDestroy,
} from '@angular/core';

import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {BrowserDomAdapter} from "@angular/platform-browser/src/browser/browser_adapter";
import {TocGenerator, TocItem} from "./toc-generator";
import * as _ from "lodash";

declare var CKEDITOR: any;


/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
@Component({
  selector: 'ckeditor',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CKEditorComponent),
      multi: true
    }
  ],
  template: `

<div>
<textarea #textarea (window:resize)="onResize($event)"></textarea>
</div>
`,

  styleUrls: ['./ckeditor.component.scss']
})
export class CKEditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() config;
  @Input() debounceData: number = 0;
  @Input() debounceToc: number = 0;

  private debouncedData: any;
  private debouncedToc: any;


  @Input()
  container: Element;

  _readonly: boolean = false;

  @Output() dataChange = new EventEmitter();
  @Output() tocChange = new EventEmitter();
  @Output() ready = new EventEmitter();
  @ViewChild('textarea') textarea;

  _value = '';
  instance;
  debounceTimeout;

  promise: Promise<any>;

  bypassOnChange = false;

  resolve: Function;
  reject: Function;

  onChange: Function;
  onTouched: Function;


  /**
   * Constructor
   */
  constructor(private zone: NgZone, private domAdapter: BrowserDomAdapter) {
    this.promise = new Promise(function (resolve, reject) {
      this.resolve = resolve;
      this.reject = reject;
    }.bind(this));
  }


  get readonly() {
    return this._readonly;
  }

  @Input() set readonly(ro) {
    if (this._readonly != ro) {
      this._readonly = ro;

      this.promise.then(v => {
        v.setReadOnly(ro);
      });

    }
  }

  get value(): any {
    console.log("get value");
    return this._value;
  };

  @Input() set value(v) {
    console.log("set value");
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }


  ngOnDestroy() {
    if (this.instance) {
      setTimeout(() => {
        this.instance.removeAllListeners();
        this.instance.destroy();
        this.instance = null;
      });
    }
  }


  ngAfterViewInit() {
    var config = this.config || {};


    if (this.debounceData) {
      this.debouncedData = _.debounce(function () {
        this.updateData();
      }, this.debounceData);
    }else{
      this.debouncedData = this.updateData;
    }

    if (this.debounceToc) {
      this.debouncedToc = _.debounce(function () {
        this.updateToc();
      }, this.debounceToc);
    }else{
      this.debouncedToc = this.updateToc;
    }

    this.ckeditorInit(config);
  }


  onResize($event) {
    this.resize();
  }


  updateData() {
    let data = this.instance.getData()
    this.zone.run(() => {
      this.value = data;
      this.onChange(data);
      this.onTouched();
      this.dataChange.emit(data);
    });
  }

  updateToc() {
    let toc = this.generateToc();
    this.zone.run(() => {
      this.tocChange.emit(toc.tocItems);
    });
  }

  ckeditorInit(config) {


    if (!CKEDITOR) {
      console.error('Please include CKEditor in your page');
      return;
    }

    // CKEditor replace textarea
    this.instance = CKEDITOR.replace(this.textarea.nativeElement, config);


    // Set initial value
    this.instance.setData(this.value);

    // listen for instanceReady event
    this.instance.on('instanceReady', (evt) => {
      this.resolve(this.instance);
      // send the evt to the EventEmitter
      this.ready.emit(evt);
      this.resize();
    });


    // CKEditor change event
    this.instance.on('change', () => {

      if (this.bypassOnChange) {
        return;
      }

      this.onTouched();

      this.debouncedToc();
      this.debouncedData();
    });

    this.instance.on('refresh-toc', () => {
      console.log("recompute foo");

      let tocItems = this.generateToc().tocItems;

      let html = "<ul>";

      for (let tocItem of tocItems){
        html += "<li class='title"+tocItem.level+"'>" + tocItem.title + "</li>";
      }


      html += "</ul>";

      console.log(html);


      jQuery(this.instance.container.$).find(".toc div").html(html);
    });
  }


  writeValue(value) {
    this._value = value;

    this.promise.then(i => {
      try {
        this.bypassOnChange = true;
        i.setData(value);

        this.debouncedToc();

      } finally {
        this.bypassOnChange = false;
      }
    });
  }


  gotoTocItem(id: string) {
    document.getElementById(id).scrollIntoView();
  }


  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }


  private resize() {
    this.promise.then(e => {
      if (this.container) {
        let height = this.domAdapter.getBoundingClientRect(this.container).height;
        return this.instance.resize("100%", height - 30);
      }
    });

  }


  private generateToc(){
    let c = this.instance.container.findOne(".cke_editable");
    let toc = new TocGenerator();
    toc.generateFromDom(c.$);
    return toc;
  }

}

/**
 * CKEditorModule
 */
@NgModule({
  declarations: [
    CKEditorComponent,
  ],
  exports: [
    CKEditorComponent,
  ]
})
export class CKEditorModule {
}

