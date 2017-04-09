// Imports
import {AfterViewInit, Component, EventEmitter, forwardRef, Input, NgModule, NgZone, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BrowserDomAdapter} from "@angular/platform-browser/src/browser/browser_adapter";
import {TocGenerator} from "./toc-generator";
import * as _ from "lodash";
import * as jQuery from "jquery";
import {ComponentVersionService} from "../service/components/component-versions.service";
import {EditorEvent} from "../../components/write/component-write.component";
import {ComponentService} from "../service/components/component.service";
import {ComponentHelperService} from "../../components/helper/helper";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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

    <div (window:resize)="onResize($event)" #textarea>
      <textarea></textarea>
    </div>
  `,

  styleUrls: ['./ckeditor.component.scss']
})
export class CKEditorComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

  @Input()
  config;
  @Input()
  debounceData: number = 500;
  @Input()
  debounceToc: number = 500;


  @Input("projectId")
  public projectId: string;


  private debouncedData: any;
  private debouncedToc: any;


  @Input()
  container: Element;

  _readonly: boolean = false;

  @Output() dataChange = new EventEmitter();
  @Output() tocChange = new EventEmitter();
  @Output() composePdf = new EventEmitter();
  @Output() editorEvent = new EventEmitter();
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
  constructor(private zone: NgZone,
              private domAdapter: BrowserDomAdapter,
              private route: ActivatedRoute,
              private componentHelperService: ComponentHelperService,
              private componentVersionService: ComponentVersionService,
              private componentService: ComponentService) {
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
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }


  ngOnInit(): void {
    Observable.combineLatest(this.route.params, this.route.data, (params, data) => ({params, data}))
      .subscribe(ap => {
        this.projectId = ap.params['projectId'];
      });
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
    } else {
      this.debouncedData = this.updateData;
    }

    if (this.debounceToc) {
      this.debouncedToc = _.debounce(function () {
        this.updateToc();
      }, this.debounceToc);
    } else {
      this.debouncedToc = this.updateToc;
    }

    this.ckeditorInit(config);
  }


  onResize($event) {
    this.resize();
  }


  updateData() {

    let data = this.instance.getData();
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
    this.instance = CKEDITOR.replace(jQuery(this.textarea.nativeElement).find("textarea")[0], config);
    this.instance.ownspec = {
      componentVersionService: this.componentVersionService,
      componentService: this.componentService,
      host:this
    };

    // Set initial value
    console.log(this.value);
    //this.instance.setData(this.value);

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

      this.debouncedData();
      //this.onTouched();
      this.debouncedToc();
    });


    this.instance.on("os-compose-pdf", () => {
      console.log("compose");
      this.composePdf.emit();
    });


    this.instance.on("ownspec-select-cv-id", (event: any) => {
      console.log("select-cv");
      this.editorEvent.emit(EditorEvent.newEditorEvent(event.data.id));
    });

    this.instance.on('refresh-toc', () => {
      let tocItems = this.generateToc().tocItems;

      let html = "<ul>";

      for (let tocItem of tocItems) {
        html += "<li class='title" + tocItem.level + "'>" + tocItem.title + "</li>";
      }

      html += "</ul>";


      jQuery(this.instance.container.$).find(".toc div:nth-child(2)").html(html);
    });

    this.instance.on('fetch-ownspec-cv-content', (event: any) => {
      console.log("fetch-ownspec-cv-content");
      console.log(event);
      event.data.observable = this.componentVersionService.getContent(event.data.id);
    });
  }

  // Ckeditor setData is asynchronous and do not handle multiple setData call until the first one finished
  // The below code, try to serialize the angular writeValue calls
  private pendingCkValue = null;
  private pendingCkValueState: "pending" | "pending_dirty" | "clear" = "clear";

  writeValue(value) {

    let normalizedValue = value == null ? '' : value;

    console.log("write value " + normalizedValue);

    this._value = normalizedValue;

    if (this.pendingCkValueState != "clear") {
      this.pendingCkValue = normalizedValue;
      this.pendingCkValueState = "pending_dirty";

    } else {

      this.pendingCkValueState = "pending";

      let that = this;

      this.promise.then(i => {
        try {
          this.bypassOnChange = true;

          i.setData(normalizedValue, {
            callback: function () {
              if (that.pendingCkValueState == "pending_dirty") {
                let curPendingCkValue = that.pendingCkValue;
                this.pendingCkValueState = "pending";
                this.pendingCkValue = null;
                i.setData(curPendingCkValue);
              } else {
                this.pendingCkValueState = "clear";
                this.pendingCkValue = null;

              }
            }
          });


          this.debouncedToc();

        } finally {
          this.bypassOnChange = false;
        }
      });
    }
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


  public startCreateComponent() {
    return this.zone.run(() => {
      return this.componentHelperService.startCreateComponent("REQUIREMENT", this.projectId);
    });
  }


  private resize() {
    this.promise.then(e => {
      if (this.container) {
        let height = this.domAdapter.getBoundingClientRect(this.container).height;
        return this.instance.resize("100%", height - 30);
      }
    });

  }


  private generateToc(): any {
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

