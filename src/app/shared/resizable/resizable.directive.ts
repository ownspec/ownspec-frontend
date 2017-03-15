import {ElementRef, Directive, Input} from "@angular/core";

import * as jQuery from "jquery";

@Directive({selector: '[resizable]'})
export class ResizableDirective {

  @Input()
  rDirections;
  @Input()
  rCenteredX;
  @Input()
  rCenteredY;

  private _rWidth;
  private _rHeight;

  @Input()
  rFlex;
  @Input()
  rGrabber;
  @Input()
  rDisabled;
  @Input()
  rNoThrottle;

  toCall;

  flexBasis;

  constructor(private element: ElementRef) {
    this.flexBasis = 'this.flexBasis' in document.documentElement.style ? 'this.flexBasis' :
      'webkitFlexBasis' in document.documentElement.style ? 'webkitFlexBasis' :
        'msFlexPreferredSize' in document.documentElement.style ? 'msFlexPreferredSize' : 'this.flexBasis';
  }


  throttle(fun) {
    if (this.toCall === undefined) {
      this.toCall = fun;
      setTimeout(function () {
        this.toCall();
        this.toCall = undefined;
      }, 100);
    } else {
      this.toCall = fun;
    }
  }

  get rHeight() {
    return this._rHeight;
  }

  @Input()
  set rHeight(value) {
    this._rHeight = value;
    this.element.nativeElement.style[this.rFlex ? this.flexBasis : 'height'] = this._rHeight + 'px';
  }

  get rWidth() {
    return this._rWidth;
  }

  @Input()
  set rWidth(value) {
    this._rWidth = value;
    this.element.nativeElement.style[this.rFlex ? this.flexBasis : 'width'] = this._rWidth + 'px';
  }


  ngAfterViewInit() {
    this.link(this.element.nativeElement);
  }


  link(element) {

    element = jQuery(element);

    element.addClass('resizable');

    var that = this;

    var style = window.getComputedStyle(element[0], null),
      w,
      h,
      dir = this.rDirections || ['right'],
      vx = this.rCenteredX ? 2 : 1, // if centered double velocity
      vy = this.rCenteredY ? 2 : 1, // if centered double velocity
      inner = this.rGrabber ? this.rGrabber : '<span></span>',
      start,
      dragDir,
      axis,
      info: any = {};


    var updateInfo = function (e) {
      info.width = false;
      info.height = false;
      if (axis === 'x')
        info.width = parseInt(element[0].style[that.rFlex ? that.flexBasis : 'width']);
      else
        info.height = parseInt(element[0].style[that.rFlex ? that.flexBasis : 'height']);
      info.id = element[0].id;
      info.evt = e;
    };

    var getClientX = function (e) {
      return e.touches ? e.touches[0].clientX : e.clientX;
    };

    var getClientY = function (e) {
      return e.touches ? e.touches[0].clientY : e.clientY;
    };

    var dragging = function (e) {
      var prop, offset = axis === 'x' ? start - getClientX(e) : start - getClientY(e);
      switch (dragDir) {
        case 'top':
          prop = that.rFlex ? that.flexBasis : 'height';
          element[0].style[prop] = h + (offset * vy) + 'px';
          break;
        case 'bottom':
          prop = that.rFlex ? that.flexBasis : 'height';
          element[0].style[prop] = h - (offset * vy) + 'px';
          break;
        case 'right':
          prop = that.rFlex ? that.flexBasis : 'width';
          element[0].style[prop] = w - (offset * vx) + 'px';
          break;
        case 'left':
          prop = that.rFlex ? that.flexBasis : 'width';
          element[0].style[prop] = w + (offset * vx) + 'px';
          break;
      }
      updateInfo(e);
      function resizingEmit() {
        //this.$emit('angular-resizable.resizing', info);
      }

      if (this.rNoThrottle) {
        //resizingEmit();
      } else {
        //this.throttle(resizingEmit);
      }
    };
    var dragEnd = function (e) {
      updateInfo(null);
      //this.$emit('angular-resizable.resizeEnd', info);
      //this.$apply();
      document.removeEventListener('mouseup', dragEnd, false);
      document.removeEventListener('mousemove', dragging, false);
      document.removeEventListener('touchend', dragEnd, false);
      document.removeEventListener('touchmove', dragging, false);
      element.removeClass('no-transition');
    };
    var dragStart = function (e, direction) {
      dragDir = direction;
      axis = dragDir === 'left' || dragDir === 'right' ? 'x' : 'y';
      start = axis === 'x' ? getClientX(e) : getClientY(e);
      w = parseInt(style.getPropertyValue('width'));
      h = parseInt(style.getPropertyValue('height'));

      //prevent transition while dragging
      element.addClass('no-transition');

      document.addEventListener('mouseup', dragEnd, false);
      document.addEventListener('mousemove', dragging, false);
      document.addEventListener('touchend', dragEnd, false);
      document.addEventListener('touchmove', dragging, false);

      // Disable highlighting while dragging
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      e.returnValue = false;

      updateInfo(e);
      //this.$emit('angular-resizable.resizeStart', info);
      //this.$apply();
    };

    dir.forEach(function (direction) {
      var grabber = document.createElement('div');

      // add class for styling purposes
      grabber.setAttribute('class', 'rg-' + direction);
      grabber.innerHTML = inner;
      element[0].appendChild(grabber);
      grabber.ondragstart = function () {
        return false;
      };

      var down = function (e) {
        var disabled = (that.rDisabled === 'true');
        if (!disabled && (e.which === 1 || e.touches)) {
          // left mouse click or touch screen
          dragStart(e, direction);
        }
      };
      grabber.addEventListener('mousedown', down, false);
      grabber.addEventListener('touchstart', down, false);
    });
  }


}
