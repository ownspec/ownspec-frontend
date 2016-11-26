// Imports
import {
  Component,
  Input,
  Output,
  ElementRef,
  ViewChild,
  Optional,
  EventEmitter,
  NgZone,
  forwardRef,
  Renderer,
  NgModule, OnChanges,
} from '@angular/core';

import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {DomAdapter} from "@angular/platform-browser/src/dom/dom_adapter";
import {BrowserDomAdapter} from "@angular/platform-browser/src/browser/browser_adapter";

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
  template: `<textarea #host (window:resize)="onResize($event)"></textarea>`,
})
export class CKEditorComponent implements ControlValueAccessor {

  @Input() config;
  @Input() debounce;

  @Input()
  container: Element;

  _readonly: boolean = false;

  @Output() change = new EventEmitter();
  @Output() ready = new EventEmitter();
  @ViewChild('host') host;

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


  onResize($event) {
    this.resize();
  }

  private resize() {
    this.promise.then(e => {
      if (this.container) {
        let height = this.domAdapter.getBoundingClientRect(this.container).height;
        return this.instance.resize("100%", height - 30);
      }
    });

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
    // Configuration
    var config = this.config || {};
    this.ckeditorInit(config);
  }


  updateValue(value) {
    this.zone.run(() => {
      this.value = value;

      this.onChange(value);

      this.onTouched();
      this.change.emit(value);
    });
  }


  ckeditorInit(config) {


    if (!CKEDITOR) {
      console.error('Please include CKEditor in your page');
      return;
    }

    // CKEditor replace textarea
    this.instance = CKEDITOR.replace(this.host.nativeElement, config);


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
      let value = this.instance.getData();

      // Debounce update
      if (this.debounce) {
        if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.updateValue(value);
          this.debounceTimeout = null;
        }, parseInt(this.debounce));

        // Live update
      } else {
        this.updateValue(value);
      }
    });
  }

  writeValue(value) {
    console.log("write value " + value);
    this._value = value;

    this.promise.then(i => {
      try {
        this.bypassOnChange = true;
        i.setData(value);
      } finally {
        this.bypassOnChange = false;
      }
    });
  }


  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
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
