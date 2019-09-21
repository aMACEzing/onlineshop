/*!
* sweetalert2 v7.24.1
* Released under the MIT License.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Sweetalert2 = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var consolePrefix = 'SweetAlert2:';

/**
 * Filter the unique values into a new array
 * @param arr
 */
var uniqueArray = function uniqueArray(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
};

/**
 * Converts `inputOptions` into an array of `[value, label]`s
 * @param inputOptions
 */
var formatInputOptions = function formatInputOptions(inputOptions) {
  var result = [];
  if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
    inputOptions.forEach(function (value, key) {
      result.push([key, value]);
    });
  } else {
    Object.keys(inputOptions).forEach(function (key) {
      result.push([key, inputOptions[key]]);
    });
  }
  return result;
};

/**
 * Standardise console warnings
 * @param message
 */
var warn = function warn(message) {
  console.warn(consolePrefix + ' ' + message);
};

/**
 * Standardise console errors
 * @param message
 */
var error = function error(message) {
  console.error(consolePrefix + ' ' + message);
};

/**
 * Private global state for `warnOnce`
 * @type {Array}
 * @private
 */
var previousWarnOnceMessages = [];

/**
 * Show a console warning, but only if it hasn't already been shown
 * @param message
 */
var warnOnce = function warnOnce(message) {
  if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
    previousWarnOnceMessages.push(message);
    warn(message);
  }
};

/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 * @param arg
 */
var callIfFunction = function callIfFunction(arg) {
  return typeof arg === 'function' ? arg() : arg;
};

var isThenable = function isThenable(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.then === 'function';
};

var DismissReason = Object.freeze({
  cancel: 'cancel',
  backdrop: 'overlay',
  close: 'close',
  esc: 'esc',
  timer: 'timer'
});

var version = "7.24.1";

var argsToParams = function argsToParams(args) {
  var params = {};
  switch (_typeof(args[0])) {
    case 'string':
      ['title', 'html', 'type'].forEach(function (name, index) {
        switch (_typeof(args[index])) {
          case 'string':
            params[name] = args[index];
            break;
          case 'undefined':
            break;
          default:
            error('Unexpected type of ' + name + '! Expected "string", got ' + _typeof(args[index]));
        }
      });
      break;

    case 'object':
      _extends(params, args[0]);
      break;

    default:
      error('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
      return false;
  }
  return params;
};

/**
 * Adapt a legacy inputValidator for use with expectRejections=false
 */
var adaptInputValidator = function adaptInputValidator(legacyValidator) {
  return function adaptedInputValidator(inputValue, extraParams) {
    return legacyValidator.call(this, inputValue, extraParams).then(function () {
      return undefined;
    }, function (validationError) {
      return validationError;
    });
  };
};

var swalPrefix = 'swal2-';

var prefix = function prefix(items) {
  var result = {};
  for (var i in items) {
    result[items[i]] = swalPrefix + items[i];
  }
  return result;
};

var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'icon-text', 'image', 'input', 'has-input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen']);

var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

// Remember state in cases where opening and handling a modal will fiddle with it.
var states = {
  previousBodyPadding: null
};

var hasClass = function hasClass(elem, className) {
  if (elem.classList) {
    return elem.classList.contains(className);
  }
  return false;
};

var focusInput = function focusInput(input) {
  input.focus();

  // place cursor at end of text in text input
  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915/1331425
    var val = input.value;
    input.value = '';
    input.value = val;
  }
};

var addOrRemoveClass = function addOrRemoveClass(target, classList, add) {
  if (!target || !classList) {
    return;
  }
  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean);
  }
  classList.forEach(function (className) {
    if (target.forEach) {
      target.forEach(function (elem) {
        add ? elem.classList.add(className) : elem.classList.remove(className);
      });
    } else {
      add ? target.classList.add(className) : target.classList.remove(className);
    }
  });
};

var addClass = function addClass(target, classList) {
  addOrRemoveClass(target, classList, true);
};

var removeClass = function removeClass(target, classList) {
  addOrRemoveClass(target, classList, false);
};

var getChildByClass = function getChildByClass(elem, className) {
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i];
    }
  }
};

var show = function show(elem) {
  elem.style.opacity = '';
  elem.style.display = elem.id === swalClasses.content ? 'block' : 'flex';
};

var hide = function hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var empty = function empty(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

// borrowed from jquery $(elem).is(':visible') implementation
var isVisible = function isVisible(elem) {
  return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};

var removeStyleProperty = function removeStyleProperty(elem, property) {
  if (elem.style.removeProperty) {
    elem.style.removeProperty(property);
  } else {
    elem.style.removeAttribute(property);
  }
};

var getContainer = function getContainer() {
  return document.body.querySelector('.' + swalClasses.container);
};

var elementByClass = function elementByClass(className) {
  var container = getContainer();
  return container ? container.querySelector('.' + className) : null;
};

var getPopup = function getPopup() {
  return elementByClass(swalClasses.popup);
};

var getIcons = function getIcons() {
  var popup = getPopup();
  return popup.querySelectorAll('.' + swalClasses.icon);
};

var getTitle = function getTitle() {
  return elementByClass(swalClasses.title);
};

var getContent = function getContent() {
  return elementByClass(swalClasses.content);
};

var getImage = function getImage() {
  return elementByClass(swalClasses.image);
};

var getProgressSteps = function getProgressSteps() {
  return elementByClass(swalClasses.progresssteps);
};

var getValidationError = function getValidationError() {
  return elementByClass(swalClasses.validationerror);
};

var getConfirmButton = function getConfirmButton() {
  return elementByClass(swalClasses.confirm);
};

var getCancelButton = function getCancelButton() {
  return elementByClass(swalClasses.cancel);
};

var getButtonsWrapper = function getButtonsWrapper() {
  warnOnce('swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead');
  return elementByClass(swalClasses.actions);
};

var getActions = function getActions() {
  return elementByClass(swalClasses.actions);
};

var getFooter = function getFooter() {
  return elementByClass(swalClasses.footer);
};

var getCloseButton = function getCloseButton() {
  return elementByClass(swalClasses.close);
};

var getFocusableElements = function getFocusableElements() {
  var focusableElementsWithTabindex = Array.prototype.slice.call(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
  // sort according to tabindex
  .sort(function (a, b) {
    a = parseInt(a.getAttribute('tabindex'));
    b = parseInt(b.getAttribute('tabindex'));
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  });

  // https://github.com/jkup/focusable/blob/master/index.js
  var otherFocusableElements = Array.prototype.slice.call(getPopup().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]'));

  return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements));
};

var isModal = function isModal() {
  return !document.body.classList.contains(swalClasses['toast-shown']);
};

var isToast = function isToast() {
  return document.body.classList.contains(swalClasses['toast-shown']);
};

var isLoading = function isLoading() {
  return getPopup().hasAttribute('data-loading');
};

// Detect Node env
var isNodeEnv = function isNodeEnv() {
  return typeof window === 'undefined' || typeof document === 'undefined';
};

var sweetHTML = ('\n <div aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.popup + '" tabindex="-1">\n   <div class="' + swalClasses.header + '">\n     <ul class="' + swalClasses.progresssteps + '"></ul>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">\n       <span class="' + swalClasses['icon-text'] + '">?</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">\n       <span class="' + swalClasses['icon-text'] + '">!</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">\n       <span class="' + swalClasses['icon-text'] + '">i</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + swalClasses.image + '" />\n     <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n     <button type="button" class="' + swalClasses.close + '">\xD7</button>\n   </div>\n   <div class="' + swalClasses.content + '">\n     <div id="' + swalClasses.content + '"></div>\n     <input class="' + swalClasses.input + '" />\n     <input type="file" class="' + swalClasses.file + '" />\n     <div class="' + swalClasses.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + swalClasses.select + '"></select>\n     <div class="' + swalClasses.radio + '"></div>\n     <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + swalClasses.textarea + '"></textarea>\n     <div class="' + swalClasses.validationerror + '" id="' + swalClasses.validationerror + '"></div>\n   </div>\n   <div class="' + swalClasses.actions + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <div class="' + swalClasses.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '');

/*
 * Add modal + backdrop to DOM
 */
var init = function init(params) {
  // Clean up the old popup if it exists
  var c = getContainer();
  if (c) {
    c.parentNode.removeChild(c);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);
  }

  if (isNodeEnv()) {
    error('SweetAlert2 requires document to initialize');
    return;
  }

  var container = document.createElement('div');
  container.className = swalClasses.container;
  container.innerHTML = sweetHTML;

  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  targetElement.appendChild(container);

  var popup = getPopup();
  var content = getContent();
  var input = getChildByClass(content, swalClasses.input);
  var file = getChildByClass(content, swalClasses.file);
  var range = content.querySelector('.' + swalClasses.range + ' input');
  var rangeOutput = content.querySelector('.' + swalClasses.range + ' output');
  var select = getChildByClass(content, swalClasses.select);
  var checkbox = content.querySelector('.' + swalClasses.checkbox + ' input');
  var textarea = getChildByClass(content, swalClasses.textarea);

  // a11y
  popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
  if (!params.toast) {
    popup.setAttribute('aria-modal', 'true');
  }

  var oldInputVal = void 0; // IE11 workaround, see #1109 for details
  var resetValidationError = function resetValidationError(e) {
    if (Swal.isVisible() && oldInputVal !== e.target.value) {
      Swal.resetValidationError();
    }
    oldInputVal = e.target.value;
  };

  input.oninput = resetValidationError;
  file.onchange = resetValidationError;
  select.onchange = resetValidationError;
  checkbox.onchange = resetValidationError;
  textarea.oninput = resetValidationError;

  range.oninput = function (e) {
    resetValidationError(e);
    rangeOutput.value = range.value;
  };

  range.onchange = function (e) {
    resetValidationError(e);
    range.nextSibling.value = range.value;
  };

  return popup;
};

var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
  if (!param) {
    return hide(target);
  }

  if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
    target.innerHTML = '';
    if (0 in param) {
      for (var i = 0; i in param; i++) {
        target.appendChild(param[i].cloneNode(true));
      }
    } else {
      target.appendChild(param.cloneNode(true));
    }
  } else if (param) {
    target.innerHTML = param;
  } else {}
  show(target);
};

var animationEndEvent = function () {
  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var testEl = document.createElement('div');
  var transEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd oanimationend',
    'animation': 'animationend'
  };
  for (var i in transEndEventNames) {
    if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
      return transEndEventNames[i];
    }
  }

  return false;
}();

// Measure width of scrollbar
// https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
var measureScrollbar = function measureScrollbar() {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (supportsTouch) {
    return 0;
  }
  var scrollDiv = document.createElement('div');
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

var fixScrollbar = function fixScrollbar() {
  // for queues, do not do this more than once
  if (states.previousBodyPadding !== null) {
    return;
  }
  // if the body has overflow
  if (document.body.scrollHeight > window.innerHeight) {
    // add padding so the content doesn't shift after removal of scrollbar
    states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
    document.body.style.paddingRight = states.previousBodyPadding + measureScrollbar() + 'px';
  }
};

var undoScrollbar = function undoScrollbar() {
  if (states.previousBodyPadding !== null) {
    document.body.style.paddingRight = states.previousBodyPadding;
    states.previousBodyPadding = null;
  }
};

// Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
var iOSfix = function iOSfix() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    var offset = document.body.scrollTop;
    document.body.style.top = offset * -1 + 'px';
    addClass(document.body, swalClasses.iosfix);
  }
};

var undoIOSfix = function undoIOSfix() {
  if (hasClass(document.body, swalClasses.iosfix)) {
    var offset = parseInt(document.body.style.top, 10);
    removeClass(document.body, swalClasses.iosfix);
    document.body.style.top = '';
    document.body.scrollTop = offset * -1;
  }
};

var globalState = {};

// Restore previous active (focused) element
var restoreActiveElement = function restoreActiveElement() {
  var x = window.scrollX;
  var y = window.scrollY;
  globalState.restoreFocusTimeout = setTimeout(function () {
    if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
      globalState.previousActiveElement.focus();
      globalState.previousActiveElement = null;
    }
  }, 100); // issues/900
  if (typeof x !== 'undefined' && typeof y !== 'undefined') {
    // IE doesn't have scrollX/scrollY support
    window.scrollTo(x, y);
  }
};

/*
 * Global function to close sweetAlert
 */
var close = function close(onClose, onAfterClose) {
  var container = getContainer();
  var popup = getPopup();
  if (!popup) {
    return;
  }

  if (onClose !== null && typeof onClose === 'function') {
    onClose(popup);
  }

  removeClass(popup, swalClasses.show);
  addClass(popup, swalClasses.hide);

  var removePopupAndResetState = function removePopupAndResetState() {
    if (!isToast()) {
      restoreActiveElement();
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, { capture: globalState.keydownListenerCapture });
      globalState.keydownHandlerAdded = false;
    }

    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
    }

    if (onAfterClose !== null && typeof onAfterClose === 'function') {
      setTimeout(function () {
        onAfterClose();
      });
    }
  };

  // If animation is supported, animate
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      if (hasClass(popup, swalClasses.hide)) {
        removePopupAndResetState();
      }
    });
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState();
  }
};

/*
 * Global function to determine if swal2 popup is shown
 */
var isVisible$1 = function isVisible() {
  return !!getPopup();
};

/*
 * Global function to click 'Confirm' button
 */
var clickConfirm = function clickConfirm() {
  return getConfirmButton().click();
};

/*
 * Global function to click 'Cancel' button
 */
var clickCancel = function clickCancel() {
  return getCancelButton().click();
};

function fire() {
  var Swal = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Swal, [null].concat(args)))();
}

/**
 * Extends a Swal class making it able to be instantiated without the `new` keyword (and thus without `Swal.fire`)
 * @param ParentSwal
 * @returns {NoNewKeywordSwal}
 */
function withNoNewKeyword(ParentSwal) {
  var NoNewKeywordSwal = function NoNewKeywordSwal() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!(this instanceof NoNewKeywordSwal)) {
      return new (Function.prototype.bind.apply(NoNewKeywordSwal, [null].concat(args)))();
    }
    Object.getPrototypeOf(NoNewKeywordSwal).apply(this, args);
  };
  NoNewKeywordSwal.prototype = _extends(Object.create(ParentSwal.prototype), { constructor: NoNewKeywordSwal });

  if (typeof Object.setPrototypeOf === 'function') {
    Object.setPrototypeOf(NoNewKeywordSwal, ParentSwal);
  } else {
    // Android 4.4
    // eslint-disable-next-line
    NoNewKeywordSwal.__proto__ = ParentSwal;
  }
  return NoNewKeywordSwal;
}

var defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  footer: '',
  type: null,
  toast: false,
  customClass: '',
  target: 'body',
  backdrop: true,
  animation: true,
  heightAuto: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  stopKeydownPropagation: true,
  keydownListenerCapture: false,
  showConfirmButton: true,
  showCancelButton: false,
  preConfirm: null,
  confirmButtonText: 'OK',
  confirmButtonAriaLabel: '',
  confirmButtonColor: null,
  confirmButtonClass: null,
  cancelButtonText: 'Cancel',
  cancelButtonAriaLabel: '',
  cancelButtonColor: null,
  cancelButtonClass: null,
  buttonsStyling: true,
  reverseButtons: false,
  focusConfirm: true,
  focusCancel: false,
  showCloseButton: false,
  closeButtonAriaLabel: 'Close this dialog',
  showLoaderOnConfirm: false,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
  imageAlt: '',
  imageClass: null,
  timer: null,
  width: null,
  padding: null,
  background: null,
  input: null,
  inputPlaceholder: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputClass: null,
  inputAttributes: {},
  inputValidator: null,
  grow: false,
  position: 'center',
  progressSteps: [],
  currentProgressStep: null,
  progressStepsDistance: null,
  onBeforeOpen: null,
  onAfterClose: null,
  onOpen: null,
  onClose: null,
  useRejections: false,
  expectRejections: false
};

var deprecatedParams = ['useRejections', 'expectRejections'];

/**
 * Is valid parameter
 * @param {String} paramName
 */
var isValidParameter = function isValidParameter(paramName) {
  return defaultParams.hasOwnProperty(paramName) || paramName === 'extraParams';
};

/**
 * Is deprecated parameter
 * @param {String} paramName
 */
var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
  return deprecatedParams.indexOf(paramName) !== -1;
};

/**
 * Show relevant warnings for given params
 *
 * @param params
 */
var showWarningsForParams = function showWarningsForParams(params) {
  for (var param in params) {
    if (!isValidParameter(param)) {
      warn('Unknown parameter "' + param + '"');
    }
    if (isDeprecatedParameter(param)) {
      warnOnce('The parameter "' + param + '" is deprecated and will be removed in the next major release.');
    }
  }
};

var deprecationWarning = '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.';
var defaults$1 = {};

function withGlobalDefaults(ParentSwal) {
  var SwalWithGlobalDefaults = function (_ParentSwal) {
    inherits(SwalWithGlobalDefaults, _ParentSwal);

    function SwalWithGlobalDefaults() {
      classCallCheck(this, SwalWithGlobalDefaults);
      return possibleConstructorReturn(this, (SwalWithGlobalDefaults.__proto__ || Object.getPrototypeOf(SwalWithGlobalDefaults)).apply(this, arguments));
    }

    createClass(SwalWithGlobalDefaults, [{
      key: '_main',
      value: function _main(params) {
        return get(SwalWithGlobalDefaults.prototype.__proto__ || Object.getPrototypeOf(SwalWithGlobalDefaults.prototype), '_main', this).call(this, _extends({}, defaults$1, params));
      }
    }], [{
      key: 'setDefaults',
      value: function setDefaults(params) {
        warnOnce(deprecationWarning);
        if (!params || (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
          throw new TypeError('SweetAlert2: The argument for setDefaults() is required and has to be a object');
        }
        showWarningsForParams(params);
        // assign valid params from `params` to `defaults`
        Object.keys(params).forEach(function (param) {
          if (ParentSwal.isValidParameter(param)) {
            defaults$1[param] = params[param];
          }
        });
      }
    }, {
      key: 'resetDefaults',
      value: function resetDefaults() {
        warnOnce(deprecationWarning);
        defaults$1 = {};
      }
    }]);
    return SwalWithGlobalDefaults;
  }(ParentSwal);

  // Set default params if `window._swalDefaults` is an object


  if (typeof window !== 'undefined' && _typeof(window._swalDefaults) === 'object') {
    SwalWithGlobalDefaults.setDefaults(window._swalDefaults);
  }

  return SwalWithGlobalDefaults;
}

/**
 * Returns an extended version of `Swal` containing `params` as defaults.
 * Useful for reusing Swal configuration.
 *
 * For example:
 *
 * Before:
 * const textPromptOptions = { input: 'text', showCancelButton: true }
 * const {value: firstName} = await Swal({ ...textPromptOptions, title: 'What is your first name?' })
 * const {value: lastName} = await Swal({ ...textPromptOptions, title: 'What is your last name?' })
 *
 * After:
 * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
 * const {value: firstName} = await TextPrompt('What is your first name?')
 * const {value: lastName} = await TextPrompt('What is your last name?')
 *
 * @param mixinParams
 */
function mixin(mixinParams) {
  var Swal = this;
  return withNoNewKeyword(function (_Swal) {
    inherits(MixinSwal, _Swal);

    function MixinSwal() {
      classCallCheck(this, MixinSwal);
      return possibleConstructorReturn(this, (MixinSwal.__proto__ || Object.getPrototypeOf(MixinSwal)).apply(this, arguments));
    }

    createClass(MixinSwal, [{
      key: '_main',
      value: function _main(params) {
        return get(MixinSwal.prototype.__proto__ || Object.getPrototypeOf(MixinSwal.prototype), '_main', this).call(this, _extends({}, mixinParams, params));
      }
    }]);
    return MixinSwal;
  }(Swal));
}

// private global state for the queue feature
var currentSteps = [];

/*
 * Global function for chaining sweetAlert popups
 */
var queue = function queue(steps) {
  var swal = this;
  currentSteps = steps;
  var resetQueue = function resetQueue() {
    currentSteps = [];
    document.body.removeAttribute('data-swal2-queue-step');
  };
  var queueResult = [];
  return new Promise(function (resolve, reject) {
    (function step(i, callback) {
      if (i < currentSteps.length) {
        document.body.setAttribute('data-swal2-queue-step', i);

        swal(currentSteps[i]).then(function (result) {
          if (typeof result.value !== 'undefined') {
            queueResult.push(result.value);
            step(i + 1, callback);
          } else {
            resetQueue();
            resolve({ dismiss: result.dismiss });
          }
        });
      } else {
        resetQueue();
        resolve({ value: queueResult });
      }
    })(0);
  });
};

/*
 * Global function for getting the index of current popup in queue
 */
var getQueueStep = function getQueueStep() {
  return document.body.getAttribute('data-swal2-queue-step');
};

/*
 * Global function for inserting a popup to the queue
 */
var insertQueueStep = function insertQueueStep(step, index) {
  if (index && index < currentSteps.length) {
    return currentSteps.splice(index, 0, step);
  }
  return currentSteps.push(step);
};

/*
 * Global function for deleting a popup from the queue
 */
var deleteQueueStep = function deleteQueueStep(index) {
  if (typeof currentSteps[index] !== 'undefined') {
    currentSteps.splice(index, 1);
  }
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
var showLoading = function showLoading() {
  var popup = getPopup();
  if (!popup) {
    Swal('');
  }
  popup = getPopup();
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();

  show(actions);
  show(confirmButton);
  addClass([popup, actions], swalClasses.loading);
  confirmButton.disabled = true;
  cancelButton.disabled = true;

  popup.setAttribute('data-loading', true);
  popup.setAttribute('aria-busy', true);
  popup.focus();
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
var getTimerLeft = function getTimerLeft() {
  return globalState.timeout && globalState.timeout.getTimerLeft();
};



var staticMethods = Object.freeze({
	isValidParameter: isValidParameter,
	isDeprecatedParameter: isDeprecatedParameter,
	argsToParams: argsToParams,
	adaptInputValidator: adaptInputValidator,
	close: close,
	closePopup: close,
	closeModal: close,
	closeToast: close,
	isVisible: isVisible$1,
	clickConfirm: clickConfirm,
	clickCancel: clickCancel,
	getPopup: getPopup,
	getTitle: getTitle,
	getContent: getContent,
	getImage: getImage,
	getButtonsWrapper: getButtonsWrapper,
	getActions: getActions,
	getConfirmButton: getConfirmButton,
	getCancelButton: getCancelButton,
	getFooter: getFooter,
	isLoading: isLoading,
	fire: fire,
	mixin: mixin,
	queue: queue,
	getQueueStep: getQueueStep,
	insertQueueStep: insertQueueStep,
	deleteQueueStep: deleteQueueStep,
	showLoading: showLoading,
	enableLoading: showLoading,
	getTimerLeft: getTimerLeft
});

// https://github.com/Riim/symbol-polyfill/blob/master/index.js

var _Symbol = typeof Symbol === 'function' ? Symbol : function () {
  var idCounter = 0;
  function _Symbol(key) {
    return '__' + key + '_' + Math.floor(Math.random() * 1e9) + '_' + ++idCounter + '__';
  }
  _Symbol.iterator = _Symbol('Symbol.iterator');
  return _Symbol;
}();

// WeakMap polyfill, needed for Android 4.4
// Related issue: https://github.com/sweetalert2/sweetalert2/issues/1071
// http://webreflection.blogspot.fi/2015/04/a-weakmap-polyfill-in-20-lines-of-code.html

var WeakMap$1 = typeof WeakMap === 'function' ? WeakMap : function (s, dP, hOP) {
  function WeakMap() {
    dP(this, s, { value: _Symbol('WeakMap') });
  }
  WeakMap.prototype = {
    'delete': function del(o) {
      delete o[this[s]];
    },
    get: function get(o) {
      return o[this[s]];
    },
    has: function has(o) {
      return hOP.call(o, this[s]);
    },
    set: function set(o, v) {
      dP(o, this[s], { configurable: true, value: v });
    }
  };
  return WeakMap;
}(_Symbol('WeakMap'), Object.defineProperty, {}.hasOwnProperty);

/**
 * This module containts `WeakMap`s for each effectively-"private  property" that a `swal` has.
 * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
 * This is the approach that Babel will probably take to implement private methods/fields
 *   https://github.com/tc39/proposal-private-methods
 *   https://github.com/babel/babel/pull/7555
 * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
 *   then we can use that language feature.
 */

var privateProps = {
  promise: new WeakMap$1(),
  innerParams: new WeakMap$1(),
  domCache: new WeakMap$1()
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
function hideLoading() {
  var innerParams = privateProps.innerParams.get(this);
  var domCache = privateProps.domCache.get(this);
  if (!innerParams.showConfirmButton) {
    hide(domCache.confirmButton);
    if (!innerParams.showCancelButton) {
      hide(domCache.actions);
    }
  }
  removeClass([domCache.popup, domCache.actions], swalClasses.loading);
  domCache.popup.removeAttribute('aria-busy');
  domCache.popup.removeAttribute('data-loading');
  domCache.confirmButton.disabled = false;
  domCache.cancelButton.disabled = false;
}

// Get input element by specified type or, if type isn't specified, by params.input
function getInput(inputType) {
  var innerParams = privateProps.innerParams.get(this);
  var domCache = privateProps.domCache.get(this);
  inputType = inputType || innerParams.input;
  if (!inputType) {
    return null;
  }
  switch (inputType) {
    case 'select':
    case 'textarea':
    case 'file':
      return getChildByClass(domCache.content, swalClasses[inputType]);
    case 'checkbox':
      return domCache.popup.querySelector('.' + swalClasses.checkbox + ' input');
    case 'radio':
      return domCache.popup.querySelector('.' + swalClasses.radio + ' input:checked') || domCache.popup.querySelector('.' + swalClasses.radio + ' input:first-child');
    case 'range':
      return domCache.popup.querySelector('.' + swalClasses.range + ' input');
    default:
      return getChildByClass(domCache.content, swalClasses.input);
  }
}

function enableButtons() {
  var domCache = privateProps.domCache.get(this);
  domCache.confirmButton.disabled = false;
  domCache.cancelButton.disabled = false;
}

function disableButtons() {
  var domCache = privateProps.domCache.get(this);
  domCache.confirmButton.disabled = true;
  domCache.cancelButton.disabled = true;
}

function enableConfirmButton() {
  var domCache = privateProps.domCache.get(this);
  domCache.confirmButton.disabled = false;
}

function disableConfirmButton() {
  var domCache = privateProps.domCache.get(this);
  domCache.confirmButton.disabled = true;
}

function enableInput() {
  var input = this.getInput();
  if (!input) {
    return false;
  }
  if (input.type === 'radio') {
    var radiosContainer = input.parentNode.parentNode;
    var radios = radiosContainer.querySelectorAll('input');
    for (var i = 0; i < radios.length; i++) {
      radios[i].disabled = false;
    }
  } else {
    input.disabled = false;
  }
}

function disableInput() {
  var input = this.getInput();
  if (!input) {
    return false;
  }
  if (input && input.type === 'radio') {
    var radiosContainer = input.parentNode.parentNode;
    var radios = radiosContainer.querySelectorAll('input');
    for (var i = 0; i < radios.length; i++) {
      radios[i].disabled = true;
    }
  } else {
    input.disabled = true;
  }
}

// Show block with validation error
function showValidationError(error) {
  var domCache = privateProps.domCache.get(this);
  domCache.validationError.innerHTML = error;
  var popupComputedStyle = window.getComputedStyle(domCache.popup);
  domCache.validationError.style.marginLeft = '-' + popupComputedStyle.getPropertyValue('padding-left');
  domCache.validationError.style.marginRight = '-' + popupComputedStyle.getPropertyValue('padding-right');
  show(domCache.validationError);

  var input = this.getInput();
  if (input) {
    input.setAttribute('aria-invalid', true);
    input.setAttribute('aria-describedBy', swalClasses.validationerror);
    focusInput(input);
    addClass(input, swalClasses.inputerror);
  }
}

// Hide block with validation error
function resetValidationError() {
  var domCache = privateProps.domCache.get(this);
  if (domCache.validationError) {
    hide(domCache.validationError);
  }

  var input = this.getInput();
  if (input) {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedBy');
    removeClass(input, swalClasses.inputerror);
  }
}

var Timer = function Timer(callback, delay) {
  classCallCheck(this, Timer);

  var id, started, running;
  var remaining = delay;
  this.start = function () {
    running = true;
    started = new Date();
    id = setTimeout(callback, remaining);
  };
  this.stop = function () {
    running = false;
    clearTimeout(id);
    remaining -= new Date() - started;
  };
  this.getTimerLeft = function () {
    if (running) {
      this.stop();
      this.start();
    }
    return remaining;
  };
  this.getStateRunning = function () {
    return running;
  };
  this.start();
};

var defaultInputValidators = {
  email: function email(string, extraParams) {
    return (/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.reject(extraParams && extraParams.validationMessage ? extraParams.validationMessage : 'Invalid email address')
    );
  },
  url: function url(string, extraParams) {
    // taken from https://stackoverflow.com/a/3809435/1331425
    return (/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(string) ? Promise.resolve() : Promise.reject(extraParams && extraParams.validationMessage ? extraParams.validationMessage : 'Invalid URL')
    );
  }
};

/**
 * Set type, text and actions on popup
 *
 * @param params
 * @returns {boolean}
 */
function setParameters(params) {
  // Use default `inputValidator` for supported input types if not provided
  if (!params.inputValidator) {
    Object.keys(defaultInputValidators).forEach(function (key) {
      if (params.input === key) {
        params.inputValidator = params.expectRejections ? defaultInputValidators[key] : Swal.adaptInputValidator(defaultInputValidators[key]);
      }
    });
  }

  // Determine if the custom target element is valid
  if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
    warn('Target parameter is not valid, defaulting to "body"');
    params.target = 'body';
  }

  var popup = void 0;
  var oldPopup = getPopup();
  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  // If the model target has changed, refresh the popup
  if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
    popup = init(params);
  } else {
    popup = oldPopup || init(params);
  }

  // Set popup width
  if (params.width) {
    popup.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;
  }

  // Set popup padding
  if (params.padding) {
    popup.style.padding = typeof params.padding === 'number' ? params.padding + 'px' : params.padding;
  }

  // Set popup background
  if (params.background) {
    popup.style.background = params.background;
  }
  var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
  var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
  for (var i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor;
  }

  var container = getContainer();
  var title = getTitle();
  var content = getContent().querySelector('#' + swalClasses.content);
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();
  var closeButton = getCloseButton();
  var footer = getFooter();

  // Title
  if (params.titleText) {
    title.innerText = params.titleText;
  } else if (params.title) {
    title.innerHTML = params.title.split('\n').join('<br />');
  }

  if (typeof params.backdrop === 'string') {
    getContainer().style.background = params.backdrop;
  } else if (!params.backdrop) {
    addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
  }

  // Content as HTML
  if (params.html) {
    parseHtmlToContainer(params.html, content);

    // Content as plain text
  } else if (params.text) {
    content.textContent = params.text;
    show(content);
  } else {
    hide(content);
  }

  // Position
  if (params.position in swalClasses) {
    addClass(container, swalClasses[params.position]);
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"');
    addClass(container, swalClasses.center);
  }

  // Grow
  if (params.grow && typeof params.grow === 'string') {
    var growClass = 'grow-' + params.grow;
    if (growClass in swalClasses) {
      addClass(container, swalClasses[growClass]);
    }
  }

  // Animation
  if (typeof params.animation === 'function') {
    params.animation = params.animation.call();
  }

  // Close button
  if (params.showCloseButton) {
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
    show(closeButton);
  } else {
    hide(closeButton);
  }

  // Default Class
  popup.className = swalClasses.popup;
  if (params.toast) {
    addClass([document.documentElement, document.body], swalClasses['toast-shown']);
    addClass(popup, swalClasses.toast);
  } else {
    addClass(popup, swalClasses.modal);
  }

  // Custom Class
  if (params.customClass) {
    addClass(popup, params.customClass);
  }

  // Progress steps
  var progressStepsContainer = getProgressSteps();
  var currentProgressStep = parseInt(params.currentProgressStep === null ? Swal.getQueueStep() : params.currentProgressStep, 10);
  if (params.progressSteps && params.progressSteps.length) {
    show(progressStepsContainer);
    empty(progressStepsContainer);
    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    params.progressSteps.forEach(function (step, index) {
      var circle = document.createElement('li');
      addClass(circle, swalClasses.progresscircle);
      circle.innerHTML = step;
      if (index === currentProgressStep) {
        addClass(circle, swalClasses.activeprogressstep);
      }
      progressStepsContainer.appendChild(circle);
      if (index !== params.progressSteps.length - 1) {
        var line = document.createElement('li');
        addClass(line, swalClasses.progressline);
        if (params.progressStepsDistance) {
          line.style.width = params.progressStepsDistance;
        }
        progressStepsContainer.appendChild(line);
      }
    });
  } else {
    hide(progressStepsContainer);
  }

  // Icon
  var icons = getIcons();
  for (var _i = 0; _i < icons.length; _i++) {
    hide(icons[_i]);
  }
  if (params.type) {
    var validType = false;
    for (var iconType in iconTypes) {
      if (params.type === iconType) {
        validType = true;
        break;
      }
    }
    if (!validType) {
      error('Unknown alert type: ' + params.type);
      return false;
    }
    var icon = popup.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
    show(icon);

    // Animate icon
    if (params.animation) {
      addClass(icon, 'swal2-animate-' + params.type + '-icon');
    }
  }

  // Custom image
  var image = getImage();
  if (params.imageUrl) {
    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt);
    show(image);

    if (params.imageWidth) {
      image.setAttribute('width', params.imageWidth);
    } else {
      image.removeAttribute('width');
    }

    if (params.imageHeight) {
      image.setAttribute('height', params.imageHeight);
    } else {
      image.removeAttribute('height');
    }

    image.className = swalClasses.image;
    if (params.imageClass) {
      addClass(image, params.imageClass);
    }
  } else {
    hide(image);
  }

  // Cancel button
  if (params.showCancelButton) {
    cancelButton.style.display = 'inline-block';
  } else {
    hide(cancelButton);
  }

  // Confirm button
  if (params.showConfirmButton) {
    removeStyleProperty(confirmButton, 'display');
  } else {
    hide(confirmButton);
  }

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showCancelButton) {
    hide(actions);
  } else {
    show(actions);
  }

  // Edit text on confirm and cancel buttons
  confirmButton.innerHTML = params.confirmButtonText;
  cancelButton.innerHTML = params.cancelButtonText;

  // ARIA labels for confirm and cancel buttons
  confirmButton.setAttribute('aria-label', params.confirmButtonAriaLabel);
  cancelButton.setAttribute('aria-label', params.cancelButtonAriaLabel);

  // Add buttons custom classes
  confirmButton.className = swalClasses.confirm;
  addClass(confirmButton, params.confirmButtonClass);
  cancelButton.className = swalClasses.cancel;
  addClass(cancelButton, params.cancelButtonClass);

  // Buttons styling
  if (params.buttonsStyling) {
    addClass([confirmButton, cancelButton], swalClasses.styled);

    // Buttons background colors
    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }
    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    }

    // Loading state
    var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
    confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
    confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
  } else {
    removeClass([confirmButton, cancelButton], swalClasses.styled);

    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
  }

  // Footer
  parseHtmlToContainer(params.footer, footer);

  // CSS animation
  if (params.animation === true) {
    removeClass(popup, swalClasses.noanimation);
  } else {
    addClass(popup, swalClasses.noanimation);
  }

  // showLoaderOnConfirm && preConfirm
  if (params.showLoaderOnConfirm && !params.preConfirm) {
    warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
  }
}

/**
 * Open popup, add necessary classes and styles, fix scrollbar
 *
 * @param {Array} params
 */
var openPopup = function openPopup(params) {
  var container = getContainer();
  var popup = getPopup();

  if (params.onBeforeOpen !== null && typeof params.onBeforeOpen === 'function') {
    params.onBeforeOpen(popup);
  }

  if (params.animation) {
    addClass(popup, swalClasses.show);
    addClass(container, swalClasses.fade);
    removeClass(popup, swalClasses.hide);
  } else {
    removeClass(popup, swalClasses.fade);
  }
  show(popup);

  // scrolling is 'hidden' until animation is done, after that 'auto'
  container.style.overflowY = 'hidden';
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      container.style.overflowY = 'auto';
    });
  } else {
    container.style.overflowY = 'auto';
  }

  addClass([document.documentElement, document.body, container], swalClasses.shown);
  if (params.heightAuto && params.backdrop && !params.toast) {
    addClass([document.documentElement, document.body], swalClasses['height-auto']);
  }

  if (isModal()) {
    fixScrollbar();
    iOSfix();
  }
  if (!globalState.previousActiveElement) {
    globalState.previousActiveElement = document.activeElement;
  }
  if (params.onOpen !== null && typeof params.onOpen === 'function') {
    setTimeout(function () {
      params.onOpen(popup);
    });
  }
};

function _main(userParams) {
  var _this = this;

  showWarningsForParams(userParams);

  var innerParams = _extends({}, defaultParams, userParams);
  setParameters(innerParams);
  Object.freeze(innerParams);
  privateProps.innerParams.set(this, innerParams);

  // clear the previous timer
  if (globalState.timeout) {
    globalState.timeout.stop();
    delete globalState.timeout;
  }

  // clear the restore focus timeout
  clearTimeout(globalState.restoreFocusTimeout);

  var domCache = {
    popup: getPopup(),
    container: getContainer(),
    content: getContent(),
    actions: getActions(),
    confirmButton: getConfirmButton(),
    cancelButton: getCancelButton(),
    closeButton: getCloseButton(),
    validationError: getValidationError(),
    progressSteps: getProgressSteps()
  };
  privateProps.domCache.set(this, domCache);

  var constructor = this.constructor;

  return new Promise(function (resolve, reject) {
    // functions to handle all resolving/rejecting/settling
    var succeedWith = function succeedWith(value) {
      constructor.closePopup(innerParams.onClose, innerParams.onAfterClose); // TODO: make closePopup an *instance* method
      if (innerParams.useRejections) {
        resolve(value);
      } else {
        resolve({ value: value });
      }
    };
    var dismissWith = function dismissWith(dismiss) {
      constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
      if (innerParams.useRejections) {
        reject(dismiss);
      } else {
        resolve({ dismiss: dismiss });
      }
    };
    var errorWith = function errorWith(error$$1) {
      constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
      reject(error$$1);
    };

    // Close on timer
    if (innerParams.timer) {
      globalState.timeout = new Timer(function () {
        dismissWith('timer');
        delete globalState.timeout;
      }, innerParams.timer);
    }

    // Get the value of the popup input
    var getInputValue = function getInputValue() {
      var input = _this.getInput();
      if (!input) {
        return null;
      }
      switch (innerParams.input) {
        case 'checkbox':
          return input.checked ? 1 : 0;
        case 'radio':
          return input.checked ? input.value : null;
        case 'file':
          return input.files.length ? input.files[0] : null;
        default:
          return innerParams.inputAutoTrim ? input.value.trim() : input.value;
      }
    };

    // input autofocus
    if (innerParams.input) {
      setTimeout(function () {
        var input = _this.getInput();
        if (input) {
          focusInput(input);
        }
      }, 0);
    }

    var confirm = function confirm(value) {
      if (innerParams.showLoaderOnConfirm) {
        constructor.showLoading(); // TODO: make showLoading an *instance* method
      }

      if (innerParams.preConfirm) {
        _this.resetValidationError();
        var preConfirmPromise = Promise.resolve().then(function () {
          return innerParams.preConfirm(value, innerParams.extraParams);
        });
        if (innerParams.expectRejections) {
          preConfirmPromise.then(function (preConfirmValue) {
            return succeedWith(preConfirmValue || value);
          }, function (validationError) {
            _this.hideLoading();
            if (validationError) {
              _this.showValidationError(validationError);
            }
          });
        } else {
          preConfirmPromise.then(function (preConfirmValue) {
            if (isVisible(domCache.validationError) || preConfirmValue === false) {
              _this.hideLoading();
            } else {
              succeedWith(preConfirmValue || value);
            }
          }, function (error$$1) {
            return errorWith(error$$1);
          });
        }
      } else {
        succeedWith(value);
      }
    };

    // Mouse interactions
    var onButtonEvent = function onButtonEvent(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var confirmButton = domCache.confirmButton,
          cancelButton = domCache.cancelButton;

      var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
      var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

      switch (e.type) {
        case 'click':
          // Clicked 'confirm'
          if (targetedConfirm && constructor.isVisible()) {
            _this.disableButtons();
            if (innerParams.input) {
              var inputValue = getInputValue();

              if (innerParams.inputValidator) {
                _this.disableInput();
                var validationPromise = Promise.resolve().then(function () {
                  return innerParams.inputValidator(inputValue, innerParams.extraParams);
                });
                if (innerParams.expectRejections) {
                  validationPromise.then(function () {
                    _this.enableButtons();
                    _this.enableInput();
                    confirm(inputValue);
                  }, function (validationError) {
                    _this.enableButtons();
                    _this.enableInput();
                    if (validationError) {
                      _this.showValidationError(validationError);
                    }
                  });
                } else {
                  validationPromise.then(function (validationError) {
                    _this.enableButtons();
                    _this.enableInput();
                    if (validationError) {
                      _this.showValidationError(validationError);
                    } else {
                      confirm(inputValue);
                    }
                  }, function (error$$1) {
                    return errorWith(error$$1);
                  });
                }
              } else {
                confirm(inputValue);
              }
            } else {
              confirm(true);
            }

            // Clicked 'cancel'
          } else if (targetedCancel && constructor.isVisible()) {
            _this.disableButtons();
            dismissWith(constructor.DismissReason.cancel);
          }
          break;
        default:
      }
    };

    var buttons = domCache.popup.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = onButtonEvent;
      buttons[i].onmouseover = onButtonEvent;
      buttons[i].onmouseout = onButtonEvent;
      buttons[i].onmousedown = onButtonEvent;
    }

    // Closing popup by close button
    domCache.closeButton.onclick = function () {
      dismissWith(constructor.DismissReason.close);
    };

    if (innerParams.toast) {
      // Closing popup by internal click
      domCache.popup.onclick = function (e) {
        if (innerParams.showConfirmButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.input) {
          return;
        }
        constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
        dismissWith(constructor.DismissReason.close);
      };
    } else {
      var ignoreOutsideClick = false;

      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      domCache.popup.onmousedown = function () {
        domCache.container.onmouseup = function (e) {
          domCache.container.onmouseup = undefined;
          // We only check if the mouseup target is the container because usually it doesn't
          // have any other direct children aside of the popup
          if (e.target === domCache.container) {
            ignoreOutsideClick = true;
          }
        };
      };

      // Ignore click events that had mousedown on the container but mouseup on the popup
      domCache.container.onmousedown = function () {
        domCache.popup.onmouseup = function (e) {
          domCache.popup.onmouseup = undefined;
          // We also need to check if the mouseup target is a child of the popup
          if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
            ignoreOutsideClick = true;
          }
        };
      };

      domCache.container.onclick = function (e) {
        if (ignoreOutsideClick) {
          ignoreOutsideClick = false;
          return;
        }
        if (e.target !== domCache.container) {
          return;
        }
        if (callIfFunction(innerParams.allowOutsideClick)) {
          dismissWith(constructor.DismissReason.backdrop);
        }
      };
    }

    // Reverse buttons (Confirm on the right side)
    if (innerParams.reverseButtons) {
      domCache.confirmButton.parentNode.insertBefore(domCache.cancelButton, domCache.confirmButton);
    } else {
      domCache.confirmButton.parentNode.insertBefore(domCache.confirmButton, domCache.cancelButton);
    }

    // Focus handling
    var setFocus = function setFocus(index, increment) {
      var focusableElements = getFocusableElements(innerParams.focusCancel);
      // search for visible elements and select the next possible match
      for (var _i = 0; _i < focusableElements.length; _i++) {
        index = index + increment;

        // rollover to first item
        if (index === focusableElements.length) {
          index = 0;

          // go to last item
        } else if (index === -1) {
          index = focusableElements.length - 1;
        }

        // determine if element is visible
        var el = focusableElements[index];
        if (isVisible(el)) {
          return el.focus();
        }
      }
      // no visible focusable elements, focus the popup
      domCache.popup.focus();
    };

    var keydownHandler = function keydownHandler(e, innerParams) {
      if (innerParams.stopKeydownPropagation) {
        e.stopPropagation();
      }

      var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
      ];

      if (e.key === 'Enter' && !e.isComposing) {
        if (e.target && _this.getInput() && e.target.outerHTML === _this.getInput().outerHTML) {
          if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
            return; // do not submit
          }

          constructor.clickConfirm();
          e.preventDefault();
        }

        // TAB
      } else if (e.key === 'Tab') {
        var targetElement = e.target || e.srcElement;

        var focusableElements = getFocusableElements(innerParams.focusCancel);
        var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
        for (var _i2 = 0; _i2 < focusableElements.length; _i2++) {
          if (targetElement === focusableElements[_i2]) {
            btnIndex = _i2;
            break;
          }
        }

        if (!e.shiftKey) {
          // Cycle to the next button
          setFocus(btnIndex, 1);
        } else {
          // Cycle to the prev button
          setFocus(btnIndex, -1);
        }
        e.stopPropagation();
        e.preventDefault();

        // ARROWS - switch focus between buttons
      } else if (arrowKeys.indexOf(e.key) !== -1) {
        // focus Cancel button if Confirm button is currently focused
        if (document.activeElement === domCache.confirmButton && isVisible(domCache.cancelButton)) {
          domCache.cancelButton.focus();
          // and vice versa
        } else if (document.activeElement === domCache.cancelButton && isVisible(domCache.confirmButton)) {
          domCache.confirmButton.focus();
        }

        // ESC
      } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(innerParams.allowEscapeKey) === true) {
        dismissWith(constructor.DismissReason.esc);
      }
    };

    if (globalState.keydownHandlerAdded) {
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, { capture: globalState.keydownListenerCapture });
      globalState.keydownHandlerAdded = false;
    }

    if (!innerParams.toast) {
      globalState.keydownHandler = function (e) {
        return keydownHandler(e, innerParams);
      };
      globalState.keydownTarget = innerParams.keydownListenerCapture ? window : domCache.popup;
      globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
      globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, { capture: globalState.keydownListenerCapture });
      globalState.keydownHandlerAdded = true;
    }

    _this.enableButtons();
    _this.hideLoading();
    _this.resetValidationError();

    if (innerParams.input) {
      addClass(document.body, swalClasses['has-input']);
    }

    // inputs
    var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
    var input = void 0;
    for (var _i3 = 0; _i3 < inputTypes.length; _i3++) {
      var inputClass = swalClasses[inputTypes[_i3]];
      var inputContainer = getChildByClass(domCache.content, inputClass);
      input = _this.getInput(inputTypes[_i3]);

      // set attributes
      if (input) {
        for (var j in input.attributes) {
          if (input.attributes.hasOwnProperty(j)) {
            var attrName = input.attributes[j].name;
            if (attrName !== 'type' && attrName !== 'value') {
              input.removeAttribute(attrName);
            }
          }
        }
        for (var attr in innerParams.inputAttributes) {
          input.setAttribute(attr, innerParams.inputAttributes[attr]);
        }
      }

      // set class
      inputContainer.className = inputClass;
      if (innerParams.inputClass) {
        addClass(inputContainer, innerParams.inputClass);
      }

      hide(inputContainer);
    }

    var populateInputOptions = void 0;
    switch (innerParams.input) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        input = getChildByClass(domCache.content, swalClasses.input);
        input.value = innerParams.inputValue;
        input.placeholder = innerParams.inputPlaceholder;
        input.type = innerParams.input;
        show(input);
        break;
      case 'file':
        input = getChildByClass(domCache.content, swalClasses.file);
        input.placeholder = innerParams.inputPlaceholder;
        input.type = innerParams.input;
        show(input);
        break;
      case 'range':
        var range = getChildByClass(domCache.content, swalClasses.range);
        var rangeInput = range.querySelector('input');
        var rangeOutput = range.querySelector('output');
        rangeInput.value = innerParams.inputValue;
        rangeInput.type = innerParams.input;
        rangeOutput.value = innerParams.inputValue;
        show(range);
        break;
      case 'select':
        var select = getChildByClass(domCache.content, swalClasses.select);
        select.innerHTML = '';
        if (innerParams.inputPlaceholder) {
          var placeholder = document.createElement('option');
          placeholder.innerHTML = innerParams.inputPlaceholder;
          placeholder.value = '';
          placeholder.disabled = true;
          placeholder.selected = true;
          select.appendChild(placeholder);
        }
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions.forEach(function (_ref) {
            var _ref2 = slicedToArray(_ref, 2),
                optionValue = _ref2[0],
                optionLabel = _ref2[1];

            var option = document.createElement('option');
            option.value = optionValue;
            option.innerHTML = optionLabel;
            if (innerParams.inputValue.toString() === optionValue.toString()) {
              option.selected = true;
            }
            select.appendChild(option);
          });
          show(select);
          select.focus();
        };
        break;
      case 'radio':
        var radio = getChildByClass(domCache.content, swalClasses.radio);
        radio.innerHTML = '';
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions.forEach(function (_ref3) {
            var _ref4 = slicedToArray(_ref3, 2),
                radioValue = _ref4[0],
                radioLabel = _ref4[1];

            var radioInput = document.createElement('input');
            var radioLabelElement = document.createElement('label');
            radioInput.type = 'radio';
            radioInput.name = swalClasses.radio;
            radioInput.value = radioValue;
            if (innerParams.inputValue.toString() === radioValue.toString()) {
              radioInput.checked = true;
            }
            radioLabelElement.innerHTML = radioLabel;
            radioLabelElement.insertBefore(radioInput, radioLabelElement.firstChild);
            radio.appendChild(radioLabelElement);
          });
          show(radio);
          var radios = radio.querySelectorAll('input');
          if (radios.length) {
            radios[0].focus();
          }
        };
        break;
      case 'checkbox':
        var checkbox = getChildByClass(domCache.content, swalClasses.checkbox);
        var checkboxInput = _this.getInput('checkbox');
        checkboxInput.type = 'checkbox';
        checkboxInput.value = 1;
        checkboxInput.id = swalClasses.checkbox;
        checkboxInput.checked = Boolean(innerParams.inputValue);
        var label = checkbox.getElementsByTagName('span');
        if (label.length) {
          checkbox.removeChild(label[0]);
        }
        label = document.createElement('span');
        label.innerHTML = innerParams.inputPlaceholder;
        checkbox.appendChild(label);
        show(checkbox);
        break;
      case 'textarea':
        var textarea = getChildByClass(domCache.content, swalClasses.textarea);
        textarea.value = innerParams.inputValue;
        textarea.placeholder = innerParams.inputPlaceholder;
        show(textarea);
        break;
      case null:
        break;
      default:
        error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + innerParams.input + '"');
        break;
    }

    if (innerParams.input === 'select' || innerParams.input === 'radio') {
      var processInputOptions = function processInputOptions(inputOptions) {
        return populateInputOptions(formatInputOptions(inputOptions));
      };
      if (isThenable(innerParams.inputOptions)) {
        constructor.showLoading();
        innerParams.inputOptions.then(function (inputOptions) {
          _this.hideLoading();
          processInputOptions(inputOptions);
        });
      } else if (_typeof(innerParams.inputOptions) === 'object') {
        processInputOptions(innerParams.inputOptions);
      } else {
        error('Unexpected type of inputOptions! Expected object, Map or Promise, got ' + _typeof(innerParams.inputOptions));
      }
    } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(innerParams.input) !== -1 && isThenable(innerParams.inputValue)) {
      constructor.showLoading();
      hide(input);
      innerParams.inputValue.then(function (inputValue) {
        input.value = innerParams.input === 'number' ? parseFloat(inputValue) || 0 : inputValue + '';
        show(input);
        _this.hideLoading();
      }).catch(function (err) {
        error('Error in inputValue promise: ' + err);
        input.value = '';
        show(input);
        _this.hideLoading();
      });
    }

    openPopup(innerParams);

    if (!innerParams.toast) {
      if (!callIfFunction(innerParams.allowEnterKey)) {
        if (document.activeElement) {
          document.activeElement.blur();
        }
      } else if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
        domCache.cancelButton.focus();
      } else if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
        domCache.confirmButton.focus();
      } else {
        setFocus(-1, 1);
      }
    }

    // fix scroll
    domCache.container.scrollTop = 0;
  });
}



var instanceMethods = Object.freeze({
	hideLoading: hideLoading,
	disableLoading: hideLoading,
	getInput: getInput,
	enableButtons: enableButtons,
	disableButtons: disableButtons,
	enableConfirmButton: enableConfirmButton,
	disableConfirmButton: disableConfirmButton,
	enableInput: enableInput,
	disableInput: disableInput,
	showValidationError: showValidationError,
	resetValidationError: resetValidationError,
	_main: _main
});

var currentInstance = void 0;

// SweetAlert constructor
function SweetAlert() {
  // Prevent run in Node env
  if (typeof window === 'undefined') {
    return;
  }

  // Check for the existence of Promise
  if (typeof Promise === 'undefined') {
    error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
  }

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (typeof args[0] === 'undefined') {
    error('SweetAlert2 expects at least 1 attribute!');
    return false;
  }

  currentInstance = this;

  var outerParams = Object.freeze(this.constructor.argsToParams(args));

  Object.defineProperties(this, {
    params: {
      value: outerParams,
      writable: false,
      enumerable: true
    }
  });

  var promise = this._main(this.params);
  privateProps.promise.set(this, promise);
}

// `catch` cannot be the name of a module export, so we define our thenable methods here instead
SweetAlert.prototype.then = function (onFulfilled, onRejected) {
  var promise = privateProps.promise.get(this);
  return promise.then(onFulfilled, onRejected);
};
SweetAlert.prototype.catch = function (onRejected) {
  var promise = privateProps.promise.get(this);
  return promise.catch(onRejected);
};
SweetAlert.prototype.finally = function (onFinally) {
  var promise = privateProps.promise.get(this);
  return promise.finally(onFinally);
};

// Assign instance methods from src/instanceMethods/*.js to prototype
_extends(SweetAlert.prototype, instanceMethods);

// Assign static methods from src/staticMethods/*.js to constructor
_extends(SweetAlert, staticMethods);

// Proxy to instance methods to constructor, for now, for backwards compatibility
Object.keys(instanceMethods).forEach(function (key) {
  SweetAlert[key] = function () {
    if (currentInstance) {
      var _currentInstance;

      return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
    }
  };
});

SweetAlert.DismissReason = DismissReason;

SweetAlert.noop = function () {};

SweetAlert.version = version;

var Swal = withNoNewKeyword(withGlobalDefaults(SweetAlert));
Swal.default = Swal;

return Swal;

})));
if (typeof window !== 'undefined' && window.Sweetalert2){  window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2}

"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,"@-webkit-keyframes swal2-show {\n" +
"  0% {\n" +
"    -webkit-transform: scale(0.7);\n" +
"            transform: scale(0.7); }\n" +
"  45% {\n" +
"    -webkit-transform: scale(1.05);\n" +
"            transform: scale(1.05); }\n" +
"  80% {\n" +
"    -webkit-transform: scale(0.95);\n" +
"            transform: scale(0.95); }\n" +
"  100% {\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1); } }\n" +
"\n" +
"@keyframes swal2-show {\n" +
"  0% {\n" +
"    -webkit-transform: scale(0.7);\n" +
"            transform: scale(0.7); }\n" +
"  45% {\n" +
"    -webkit-transform: scale(1.05);\n" +
"            transform: scale(1.05); }\n" +
"  80% {\n" +
"    -webkit-transform: scale(0.95);\n" +
"            transform: scale(0.95); }\n" +
"  100% {\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1); } }\n" +
"\n" +
"@-webkit-keyframes swal2-hide {\n" +
"  0% {\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1);\n" +
"    opacity: 1; }\n" +
"  100% {\n" +
"    -webkit-transform: scale(0.5);\n" +
"            transform: scale(0.5);\n" +
"    opacity: 0; } }\n" +
"\n" +
"@keyframes swal2-hide {\n" +
"  0% {\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1);\n" +
"    opacity: 1; }\n" +
"  100% {\n" +
"    -webkit-transform: scale(0.5);\n" +
"            transform: scale(0.5);\n" +
"    opacity: 0; } }\n" +
"\n" +
"@-webkit-keyframes swal2-animate-success-line-tip {\n" +
"  0% {\n" +
"    top: 1.1875em;\n" +
"    left: .0625em;\n" +
"    width: 0; }\n" +
"  54% {\n" +
"    top: 1.0625em;\n" +
"    left: .125em;\n" +
"    width: 0; }\n" +
"  70% {\n" +
"    top: 2.1875em;\n" +
"    left: -.375em;\n" +
"    width: 3.125em; }\n" +
"  84% {\n" +
"    top: 3em;\n" +
"    left: 1.3125em;\n" +
"    width: 1.0625em; }\n" +
"  100% {\n" +
"    top: 2.8125em;\n" +
"    left: .875em;\n" +
"    width: 1.5625em; } }\n" +
"\n" +
"@keyframes swal2-animate-success-line-tip {\n" +
"  0% {\n" +
"    top: 1.1875em;\n" +
"    left: .0625em;\n" +
"    width: 0; }\n" +
"  54% {\n" +
"    top: 1.0625em;\n" +
"    left: .125em;\n" +
"    width: 0; }\n" +
"  70% {\n" +
"    top: 2.1875em;\n" +
"    left: -.375em;\n" +
"    width: 3.125em; }\n" +
"  84% {\n" +
"    top: 3em;\n" +
"    left: 1.3125em;\n" +
"    width: 1.0625em; }\n" +
"  100% {\n" +
"    top: 2.8125em;\n" +
"    left: .875em;\n" +
"    width: 1.5625em; } }\n" +
"\n" +
"@-webkit-keyframes swal2-animate-success-line-long {\n" +
"  0% {\n" +
"    top: 3.375em;\n" +
"    right: 2.875em;\n" +
"    width: 0; }\n" +
"  65% {\n" +
"    top: 3.375em;\n" +
"    right: 2.875em;\n" +
"    width: 0; }\n" +
"  84% {\n" +
"    top: 2.1875em;\n" +
"    right: 0;\n" +
"    width: 3.4375em; }\n" +
"  100% {\n" +
"    top: 2.375em;\n" +
"    right: .5em;\n" +
"    width: 2.9375em; } }\n" +
"\n" +
"@keyframes swal2-animate-success-line-long {\n" +
"  0% {\n" +
"    top: 3.375em;\n" +
"    right: 2.875em;\n" +
"    width: 0; }\n" +
"  65% {\n" +
"    top: 3.375em;\n" +
"    right: 2.875em;\n" +
"    width: 0; }\n" +
"  84% {\n" +
"    top: 2.1875em;\n" +
"    right: 0;\n" +
"    width: 3.4375em; }\n" +
"  100% {\n" +
"    top: 2.375em;\n" +
"    right: .5em;\n" +
"    width: 2.9375em; } }\n" +
"\n" +
"@-webkit-keyframes swal2-rotate-success-circular-line {\n" +
"  0% {\n" +
"    -webkit-transform: rotate(-45deg);\n" +
"            transform: rotate(-45deg); }\n" +
"  5% {\n" +
"    -webkit-transform: rotate(-45deg);\n" +
"            transform: rotate(-45deg); }\n" +
"  12% {\n" +
"    -webkit-transform: rotate(-405deg);\n" +
"            transform: rotate(-405deg); }\n" +
"  100% {\n" +
"    -webkit-transform: rotate(-405deg);\n" +
"            transform: rotate(-405deg); } }\n" +
"\n" +
"@keyframes swal2-rotate-success-circular-line {\n" +
"  0% {\n" +
"    -webkit-transform: rotate(-45deg);\n" +
"            transform: rotate(-45deg); }\n" +
"  5% {\n" +
"    -webkit-transform: rotate(-45deg);\n" +
"            transform: rotate(-45deg); }\n" +
"  12% {\n" +
"    -webkit-transform: rotate(-405deg);\n" +
"            transform: rotate(-405deg); }\n" +
"  100% {\n" +
"    -webkit-transform: rotate(-405deg);\n" +
"            transform: rotate(-405deg); } }\n" +
"\n" +
"@-webkit-keyframes swal2-animate-error-x-mark {\n" +
"  0% {\n" +
"    margin-top: 1.625em;\n" +
"    -webkit-transform: scale(0.4);\n" +
"            transform: scale(0.4);\n" +
"    opacity: 0; }\n" +
"  50% {\n" +
"    margin-top: 1.625em;\n" +
"    -webkit-transform: scale(0.4);\n" +
"            transform: scale(0.4);\n" +
"    opacity: 0; }\n" +
"  80% {\n" +
"    margin-top: -.375em;\n" +
"    -webkit-transform: scale(1.15);\n" +
"            transform: scale(1.15); }\n" +
"  100% {\n" +
"    margin-top: 0;\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1);\n" +
"    opacity: 1; } }\n" +
"\n" +
"@keyframes swal2-animate-error-x-mark {\n" +
"  0% {\n" +
"    margin-top: 1.625em;\n" +
"    -webkit-transform: scale(0.4);\n" +
"            transform: scale(0.4);\n" +
"    opacity: 0; }\n" +
"  50% {\n" +
"    margin-top: 1.625em;\n" +
"    -webkit-transform: scale(0.4);\n" +
"            transform: scale(0.4);\n" +
"    opacity: 0; }\n" +
"  80% {\n" +
"    margin-top: -.375em;\n" +
"    -webkit-transform: scale(1.15);\n" +
"            transform: scale(1.15); }\n" +
"  100% {\n" +
"    margin-top: 0;\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1);\n" +
"    opacity: 1; } }\n" +
"\n" +
"@-webkit-keyframes swal2-animate-error-icon {\n" +
"  0% {\n" +
"    -webkit-transform: rotateX(100deg);\n" +
"            transform: rotateX(100deg);\n" +
"    opacity: 0; }\n" +
"  100% {\n" +
"    -webkit-transform: rotateX(0deg);\n" +
"            transform: rotateX(0deg);\n" +
"    opacity: 1; } }\n" +
"\n" +
"@keyframes swal2-animate-error-icon {\n" +
"  0% {\n" +
"    -webkit-transform: rotateX(100deg);\n" +
"            transform: rotateX(100deg);\n" +
"    opacity: 0; }\n" +
"  100% {\n" +
"    -webkit-transform: rotateX(0deg);\n" +
"            transform: rotateX(0deg);\n" +
"    opacity: 1; } }\n" +
"\n" +
"body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast {\n" +
"  flex-direction: column;\n" +
"  align-items: stretch; }\n" +
"  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-actions {\n" +
"    flex: 1;\n" +
"    align-self: stretch;\n" +
"    justify-content: flex-end;\n" +
"    height: 2.2em; }\n" +
"  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-loading {\n" +
"    justify-content: center; }\n" +
"  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-input {\n" +
"    height: 2em;\n" +
"    margin: .3125em auto;\n" +
"    font-size: 1em; }\n" +
"  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-validationerror {\n" +
"    font-size: 1em; }\n" +
"\n" +
"body.swal2-toast-shown > .swal2-container {\n" +
"  position: fixed;\n" +
"  background-color: transparent; }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-shown {\n" +
"    background-color: transparent; }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-top {\n" +
"    top: 0;\n" +
"    right: auto;\n" +
"    bottom: auto;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translateX(-50%);\n" +
"            transform: translateX(-50%); }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-top-end, body.swal2-toast-shown > .swal2-container.swal2-top-right {\n" +
"    top: 0;\n" +
"    right: 0;\n" +
"    bottom: auto;\n" +
"    left: auto; }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-top-start, body.swal2-toast-shown > .swal2-container.swal2-top-left {\n" +
"    top: 0;\n" +
"    right: auto;\n" +
"    bottom: auto;\n" +
"    left: 0; }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-center-start, body.swal2-toast-shown > .swal2-container.swal2-center-left {\n" +
"    top: 50%;\n" +
"    right: auto;\n" +
"    bottom: auto;\n" +
"    left: 0;\n" +
"    -webkit-transform: translateY(-50%);\n" +
"            transform: translateY(-50%); }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-center {\n" +
"    top: 50%;\n" +
"    right: auto;\n" +
"    bottom: auto;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translate(-50%, -50%);\n" +
"            transform: translate(-50%, -50%); }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-center-end, body.swal2-toast-shown > .swal2-container.swal2-center-right {\n" +
"    top: 50%;\n" +
"    right: 0;\n" +
"    bottom: auto;\n" +
"    left: auto;\n" +
"    -webkit-transform: translateY(-50%);\n" +
"            transform: translateY(-50%); }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-bottom-start, body.swal2-toast-shown > .swal2-container.swal2-bottom-left {\n" +
"    top: auto;\n" +
"    right: auto;\n" +
"    bottom: 0;\n" +
"    left: 0; }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-bottom {\n" +
"    top: auto;\n" +
"    right: auto;\n" +
"    bottom: 0;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translateX(-50%);\n" +
"            transform: translateX(-50%); }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-bottom-end, body.swal2-toast-shown > .swal2-container.swal2-bottom-right {\n" +
"    top: auto;\n" +
"    right: 0;\n" +
"    bottom: 0;\n" +
"    left: auto; }\n" +
"\n" +
".swal2-popup.swal2-toast {\n" +
"  flex-direction: row;\n" +
"  align-items: center;\n" +
"  width: auto;\n" +
"  padding: 0.625em;\n" +
"  box-shadow: 0 0 0.625em #d9d9d9;\n" +
"  overflow-y: hidden; }\n" +
"  .swal2-popup.swal2-toast .swal2-header {\n" +
"    flex-direction: row; }\n" +
"  .swal2-popup.swal2-toast .swal2-title {\n" +
"    justify-content: flex-start;\n" +
"    margin: 0 .6em;\n" +
"    font-size: 1em; }\n" +
"  .swal2-popup.swal2-toast .swal2-close {\n" +
"    position: initial; }\n" +
"  .swal2-popup.swal2-toast .swal2-content {\n" +
"    justify-content: flex-start;\n" +
"    font-size: 1em; }\n" +
"  .swal2-popup.swal2-toast .swal2-icon {\n" +
"    width: 2em;\n" +
"    min-width: 2em;\n" +
"    height: 2em;\n" +
"    margin: 0; }\n" +
"    .swal2-popup.swal2-toast .swal2-icon-text {\n" +
"      font-size: 2em;\n" +
"      font-weight: bold;\n" +
"      line-height: 1em; }\n" +
"    .swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring {\n" +
"      width: 2em;\n" +
"      height: 2em; }\n" +
"    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n" +
"      top: .875em;\n" +
"      width: 1.375em; }\n" +
"      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n" +
"        left: .3125em; }\n" +
"      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n" +
"        right: .3125em; }\n" +
"  .swal2-popup.swal2-toast .swal2-actions {\n" +
"    height: auto;\n" +
"    margin: 0 .3125em; }\n" +
"  .swal2-popup.swal2-toast .swal2-styled {\n" +
"    margin: 0 .3125em;\n" +
"    padding: .3125em .625em;\n" +
"    font-size: 1em; }\n" +
"    .swal2-popup.swal2-toast .swal2-styled:focus {\n" +
"      box-shadow: 0 0 0 0.0625em #fff, 0 0 0 0.125em rgba(50, 100, 150, 0.4); }\n" +
"  .swal2-popup.swal2-toast .swal2-success {\n" +
"    border-color: #a5dc86; }\n" +
"    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'] {\n" +
"      position: absolute;\n" +
"      width: 2em;\n" +
"      height: 2.8125em;\n" +
"      -webkit-transform: rotate(45deg);\n" +
"              transform: rotate(45deg);\n" +
"      border-radius: 50%; }\n" +
"      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n" +
"        top: -.25em;\n" +
"        left: -.9375em;\n" +
"        -webkit-transform: rotate(-45deg);\n" +
"                transform: rotate(-45deg);\n" +
"        -webkit-transform-origin: 2em 2em;\n" +
"                transform-origin: 2em 2em;\n" +
"        border-radius: 4em 0 0 4em; }\n" +
"      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n" +
"        top: -.25em;\n" +
"        left: .9375em;\n" +
"        -webkit-transform-origin: 0 2em;\n" +
"                transform-origin: 0 2em;\n" +
"        border-radius: 0 4em 4em 0; }\n" +
"    .swal2-popup.swal2-toast .swal2-success .swal2-success-ring {\n" +
"      width: 2em;\n" +
"      height: 2em; }\n" +
"    .swal2-popup.swal2-toast .swal2-success .swal2-success-fix {\n" +
"      top: 0;\n" +
"      left: .4375em;\n" +
"      width: .4375em;\n" +
"      height: 2.6875em; }\n" +
"    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'] {\n" +
"      height: .3125em; }\n" +
"      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='tip'] {\n" +
"        top: 1.125em;\n" +
"        left: .1875em;\n" +
"        width: .75em; }\n" +
"      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='long'] {\n" +
"        top: .9375em;\n" +
"        right: .1875em;\n" +
"        width: 1.375em; }\n" +
"  .swal2-popup.swal2-toast.swal2-show {\n" +
"    -webkit-animation: showSweetToast .5s;\n" +
"            animation: showSweetToast .5s; }\n" +
"  .swal2-popup.swal2-toast.swal2-hide {\n" +
"    -webkit-animation: hideSweetToast .2s forwards;\n" +
"            animation: hideSweetToast .2s forwards; }\n" +
"  .swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip {\n" +
"    -webkit-animation: animate-toast-success-tip .75s;\n" +
"            animation: animate-toast-success-tip .75s; }\n" +
"  .swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long {\n" +
"    -webkit-animation: animate-toast-success-long .75s;\n" +
"            animation: animate-toast-success-long .75s; }\n" +
"\n" +
"@-webkit-keyframes showSweetToast {\n" +
"  0% {\n" +
"    -webkit-transform: translateY(-0.625em) rotateZ(2deg);\n" +
"            transform: translateY(-0.625em) rotateZ(2deg);\n" +
"    opacity: 0; }\n" +
"  33% {\n" +
"    -webkit-transform: translateY(0) rotateZ(-2deg);\n" +
"            transform: translateY(0) rotateZ(-2deg);\n" +
"    opacity: .5; }\n" +
"  66% {\n" +
"    -webkit-transform: translateY(0.3125em) rotateZ(2deg);\n" +
"            transform: translateY(0.3125em) rotateZ(2deg);\n" +
"    opacity: .7; }\n" +
"  100% {\n" +
"    -webkit-transform: translateY(0) rotateZ(0);\n" +
"            transform: translateY(0) rotateZ(0);\n" +
"    opacity: 1; } }\n" +
"\n" +
"@keyframes showSweetToast {\n" +
"  0% {\n" +
"    -webkit-transform: translateY(-0.625em) rotateZ(2deg);\n" +
"            transform: translateY(-0.625em) rotateZ(2deg);\n" +
"    opacity: 0; }\n" +
"  33% {\n" +
"    -webkit-transform: translateY(0) rotateZ(-2deg);\n" +
"            transform: translateY(0) rotateZ(-2deg);\n" +
"    opacity: .5; }\n" +
"  66% {\n" +
"    -webkit-transform: translateY(0.3125em) rotateZ(2deg);\n" +
"            transform: translateY(0.3125em) rotateZ(2deg);\n" +
"    opacity: .7; }\n" +
"  100% {\n" +
"    -webkit-transform: translateY(0) rotateZ(0);\n" +
"            transform: translateY(0) rotateZ(0);\n" +
"    opacity: 1; } }\n" +
"\n" +
"@-webkit-keyframes hideSweetToast {\n" +
"  0% {\n" +
"    opacity: 1; }\n" +
"  33% {\n" +
"    opacity: .5; }\n" +
"  100% {\n" +
"    -webkit-transform: rotateZ(1deg);\n" +
"            transform: rotateZ(1deg);\n" +
"    opacity: 0; } }\n" +
"\n" +
"@keyframes hideSweetToast {\n" +
"  0% {\n" +
"    opacity: 1; }\n" +
"  33% {\n" +
"    opacity: .5; }\n" +
"  100% {\n" +
"    -webkit-transform: rotateZ(1deg);\n" +
"            transform: rotateZ(1deg);\n" +
"    opacity: 0; } }\n" +
"\n" +
"@-webkit-keyframes animate-toast-success-tip {\n" +
"  0% {\n" +
"    top: .5625em;\n" +
"    left: .0625em;\n" +
"    width: 0; }\n" +
"  54% {\n" +
"    top: .125em;\n" +
"    left: .125em;\n" +
"    width: 0; }\n" +
"  70% {\n" +
"    top: .625em;\n" +
"    left: -.25em;\n" +
"    width: 1.625em; }\n" +
"  84% {\n" +
"    top: 1.0625em;\n" +
"    left: .75em;\n" +
"    width: .5em; }\n" +
"  100% {\n" +
"    top: 1.125em;\n" +
"    left: .1875em;\n" +
"    width: .75em; } }\n" +
"\n" +
"@keyframes animate-toast-success-tip {\n" +
"  0% {\n" +
"    top: .5625em;\n" +
"    left: .0625em;\n" +
"    width: 0; }\n" +
"  54% {\n" +
"    top: .125em;\n" +
"    left: .125em;\n" +
"    width: 0; }\n" +
"  70% {\n" +
"    top: .625em;\n" +
"    left: -.25em;\n" +
"    width: 1.625em; }\n" +
"  84% {\n" +
"    top: 1.0625em;\n" +
"    left: .75em;\n" +
"    width: .5em; }\n" +
"  100% {\n" +
"    top: 1.125em;\n" +
"    left: .1875em;\n" +
"    width: .75em; } }\n" +
"\n" +
"@-webkit-keyframes animate-toast-success-long {\n" +
"  0% {\n" +
"    top: 1.625em;\n" +
"    right: 1.375em;\n" +
"    width: 0; }\n" +
"  65% {\n" +
"    top: 1.25em;\n" +
"    right: .9375em;\n" +
"    width: 0; }\n" +
"  84% {\n" +
"    top: .9375em;\n" +
"    right: 0;\n" +
"    width: 1.125em; }\n" +
"  100% {\n" +
"    top: .9375em;\n" +
"    right: .1875em;\n" +
"    width: 1.375em; } }\n" +
"\n" +
"@keyframes animate-toast-success-long {\n" +
"  0% {\n" +
"    top: 1.625em;\n" +
"    right: 1.375em;\n" +
"    width: 0; }\n" +
"  65% {\n" +
"    top: 1.25em;\n" +
"    right: .9375em;\n" +
"    width: 0; }\n" +
"  84% {\n" +
"    top: .9375em;\n" +
"    right: 0;\n" +
"    width: 1.125em; }\n" +
"  100% {\n" +
"    top: .9375em;\n" +
"    right: .1875em;\n" +
"    width: 1.375em; } }\n" +
"\n" +
"body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {\n" +
"  overflow-y: hidden; }\n" +
"\n" +
"body.swal2-height-auto {\n" +
"  height: auto !important; }\n" +
"\n" +
"body.swal2-no-backdrop .swal2-shown {\n" +
"  top: auto;\n" +
"  right: auto;\n" +
"  bottom: auto;\n" +
"  left: auto;\n" +
"  background-color: transparent; }\n" +
"  body.swal2-no-backdrop .swal2-shown > .swal2-modal {\n" +
"    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-top {\n" +
"    top: 0;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translateX(-50%);\n" +
"            transform: translateX(-50%); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-top-start, body.swal2-no-backdrop .swal2-shown.swal2-top-left {\n" +
"    top: 0;\n" +
"    left: 0; }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-top-end, body.swal2-no-backdrop .swal2-shown.swal2-top-right {\n" +
"    top: 0;\n" +
"    right: 0; }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-center {\n" +
"    top: 50%;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translate(-50%, -50%);\n" +
"            transform: translate(-50%, -50%); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-center-start, body.swal2-no-backdrop .swal2-shown.swal2-center-left {\n" +
"    top: 50%;\n" +
"    left: 0;\n" +
"    -webkit-transform: translateY(-50%);\n" +
"            transform: translateY(-50%); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-center-end, body.swal2-no-backdrop .swal2-shown.swal2-center-right {\n" +
"    top: 50%;\n" +
"    right: 0;\n" +
"    -webkit-transform: translateY(-50%);\n" +
"            transform: translateY(-50%); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-bottom {\n" +
"    bottom: 0;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translateX(-50%);\n" +
"            transform: translateX(-50%); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-bottom-start, body.swal2-no-backdrop .swal2-shown.swal2-bottom-left {\n" +
"    bottom: 0;\n" +
"    left: 0; }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-bottom-end, body.swal2-no-backdrop .swal2-shown.swal2-bottom-right {\n" +
"    right: 0;\n" +
"    bottom: 0; }\n" +
"\n" +
".swal2-container {\n" +
"  display: flex;\n" +
"  position: fixed;\n" +
"  top: 0;\n" +
"  right: 0;\n" +
"  bottom: 0;\n" +
"  left: 0;\n" +
"  flex-direction: row;\n" +
"  align-items: center;\n" +
"  justify-content: center;\n" +
"  padding: 10px;\n" +
"  background-color: transparent;\n" +
"  z-index: 1060;\n" +
"  overflow-x: hidden;\n" +
"  -webkit-overflow-scrolling: touch; }\n" +
"  .swal2-container.swal2-top {\n" +
"    align-items: flex-start; }\n" +
"  .swal2-container.swal2-top-start, .swal2-container.swal2-top-left {\n" +
"    align-items: flex-start;\n" +
"    justify-content: flex-start; }\n" +
"  .swal2-container.swal2-top-end, .swal2-container.swal2-top-right {\n" +
"    align-items: flex-start;\n" +
"    justify-content: flex-end; }\n" +
"  .swal2-container.swal2-center {\n" +
"    align-items: center; }\n" +
"  .swal2-container.swal2-center-start, .swal2-container.swal2-center-left {\n" +
"    align-items: center;\n" +
"    justify-content: flex-start; }\n" +
"  .swal2-container.swal2-center-end, .swal2-container.swal2-center-right {\n" +
"    align-items: center;\n" +
"    justify-content: flex-end; }\n" +
"  .swal2-container.swal2-bottom {\n" +
"    align-items: flex-end; }\n" +
"  .swal2-container.swal2-bottom-start, .swal2-container.swal2-bottom-left {\n" +
"    align-items: flex-end;\n" +
"    justify-content: flex-start; }\n" +
"  .swal2-container.swal2-bottom-end, .swal2-container.swal2-bottom-right {\n" +
"    align-items: flex-end;\n" +
"    justify-content: flex-end; }\n" +
"  .swal2-container.swal2-grow-fullscreen > .swal2-modal {\n" +
"    display: flex !important;\n" +
"    flex: 1;\n" +
"    align-self: stretch;\n" +
"    justify-content: center; }\n" +
"  .swal2-container.swal2-grow-row > .swal2-modal {\n" +
"    display: flex !important;\n" +
"    flex: 1;\n" +
"    align-content: center;\n" +
"    justify-content: center; }\n" +
"  .swal2-container.swal2-grow-column {\n" +
"    flex: 1;\n" +
"    flex-direction: column; }\n" +
"    .swal2-container.swal2-grow-column.swal2-top, .swal2-container.swal2-grow-column.swal2-center, .swal2-container.swal2-grow-column.swal2-bottom {\n" +
"      align-items: center; }\n" +
"    .swal2-container.swal2-grow-column.swal2-top-start, .swal2-container.swal2-grow-column.swal2-center-start, .swal2-container.swal2-grow-column.swal2-bottom-start, .swal2-container.swal2-grow-column.swal2-top-left, .swal2-container.swal2-grow-column.swal2-center-left, .swal2-container.swal2-grow-column.swal2-bottom-left {\n" +
"      align-items: flex-start; }\n" +
"    .swal2-container.swal2-grow-column.swal2-top-end, .swal2-container.swal2-grow-column.swal2-center-end, .swal2-container.swal2-grow-column.swal2-bottom-end, .swal2-container.swal2-grow-column.swal2-top-right, .swal2-container.swal2-grow-column.swal2-center-right, .swal2-container.swal2-grow-column.swal2-bottom-right {\n" +
"      align-items: flex-end; }\n" +
"    .swal2-container.swal2-grow-column > .swal2-modal {\n" +
"      display: flex !important;\n" +
"      flex: 1;\n" +
"      align-content: center;\n" +
"      justify-content: center; }\n" +
"  .swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right) > .swal2-modal {\n" +
"    margin: auto; }\n" +
"  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n" +
"    .swal2-container .swal2-modal {\n" +
"      margin: 0 !important; } }\n" +
"  .swal2-container.swal2-fade {\n" +
"    transition: background-color .1s; }\n" +
"  .swal2-container.swal2-shown {\n" +
"    background-color: rgba(0, 0, 0, 0.4); }\n" +
"\n" +
".swal2-popup {\n" +
"  display: none;\n" +
"  position: relative;\n" +
"  flex-direction: column;\n" +
"  justify-content: center;\n" +
"  width: 32em;\n" +
"  max-width: 100%;\n" +
"  padding: 1.25em;\n" +
"  border-radius: 0.3125em;\n" +
"  background: #fff;\n" +
"  font-family: inherit;\n" +
"  font-size: 1rem;\n" +
"  box-sizing: border-box; }\n" +
"  .swal2-popup:focus {\n" +
"    outline: none; }\n" +
"  .swal2-popup.swal2-loading {\n" +
"    overflow-y: hidden; }\n" +
"  .swal2-popup .swal2-header {\n" +
"    display: flex;\n" +
"    flex-direction: column;\n" +
"    align-items: center; }\n" +
"  .swal2-popup .swal2-title {\n" +
"    display: block;\n" +
"    position: relative;\n" +
"    max-width: 100%;\n" +
"    margin: 0 0 0.4em;\n" +
"    padding: 0;\n" +
"    color: #595959;\n" +
"    font-size: 1.875em;\n" +
"    font-weight: 600;\n" +
"    text-align: center;\n" +
"    text-transform: none;\n" +
"    word-wrap: break-word; }\n" +
"  .swal2-popup .swal2-actions {\n" +
"    align-items: center;\n" +
"    justify-content: center;\n" +
"    margin: 1.25em auto 0; }\n" +
"    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled] {\n" +
"      opacity: .4; }\n" +
"    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover {\n" +
"      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)); }\n" +
"    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active {\n" +
"      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); }\n" +
"    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm {\n" +
"      width: 2.5em;\n" +
"      height: 2.5em;\n" +
"      margin: .46875em;\n" +
"      padding: 0;\n" +
"      border: .25em solid transparent;\n" +
"      border-radius: 100%;\n" +
"      border-color: transparent;\n" +
"      background-color: transparent !important;\n" +
"      color: transparent;\n" +
"      cursor: default;\n" +
"      box-sizing: border-box;\n" +
"      -webkit-animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" +
"              animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" +
"      -webkit-user-select: none;\n" +
"         -moz-user-select: none;\n" +
"          -ms-user-select: none;\n" +
"              user-select: none; }\n" +
"    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel {\n" +
"      margin-right: 30px;\n" +
"      margin-left: 30px; }\n" +
"    .swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after {\n" +
"      display: inline-block;\n" +
"      width: 15px;\n" +
"      height: 15px;\n" +
"      margin-left: 5px;\n" +
"      border: 3px solid #999999;\n" +
"      border-radius: 50%;\n" +
"      border-right-color: transparent;\n" +
"      box-shadow: 1px 1px 1px #fff;\n" +
"      content: '';\n" +
"      -webkit-animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" +
"              animation: swal2-rotate-loading 1.5s linear 0s infinite normal; }\n" +
"  .swal2-popup .swal2-styled {\n" +
"    margin: 0 .3125em;\n" +
"    padding: .625em 2em;\n" +
"    font-weight: 500;\n" +
"    box-shadow: none; }\n" +
"    .swal2-popup .swal2-styled:not([disabled]) {\n" +
"      cursor: pointer; }\n" +
"    .swal2-popup .swal2-styled:focus {\n" +
"      outline: none;\n" +
"      box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4); }\n" +
"    .swal2-popup .swal2-styled::-moz-focus-inner {\n" +
"      border: 0; }\n" +
"  .swal2-popup .swal2-footer {\n" +
"    justify-content: center;\n" +
"    margin: 1.25em 0 0;\n" +
"    padding-top: 1em;\n" +
"    border-top: 1px solid #eee;\n" +
"    color: #545454;\n" +
"    font-size: 1em; }\n" +
"  .swal2-popup .swal2-image {\n" +
"    max-width: 100%;\n" +
"    margin: 1.25em auto; }\n" +
"  .swal2-popup .swal2-close {\n" +
"    position: absolute;\n" +
"    top: 0;\n" +
"    right: 0;\n" +
"    justify-content: center;\n" +
"    width: 1.2em;\n" +
"    height: 1.2em;\n" +
"    padding: 0;\n" +
"    transition: color 0.1s ease-out;\n" +
"    border: none;\n" +
"    border-radius: 0;\n" +
"    background: transparent;\n" +
"    color: #cccccc;\n" +
"    font-family: serif;\n" +
"    font-size: 2.5em;\n" +
"    line-height: 1.2;\n" +
"    cursor: pointer;\n" +
"    overflow: hidden; }\n" +
"    .swal2-popup .swal2-close:hover {\n" +
"      -webkit-transform: none;\n" +
"              transform: none;\n" +
"      color: #f27474; }\n" +
"  .swal2-popup > .swal2-input,\n" +
"  .swal2-popup > .swal2-file,\n" +
"  .swal2-popup > .swal2-textarea,\n" +
"  .swal2-popup > .swal2-select,\n" +
"  .swal2-popup > .swal2-radio,\n" +
"  .swal2-popup > .swal2-checkbox {\n" +
"    display: none; }\n" +
"  .swal2-popup .swal2-content {\n" +
"    justify-content: center;\n" +
"    margin: 0;\n" +
"    padding: 0;\n" +
"    color: #545454;\n" +
"    font-size: 1.125em;\n" +
"    font-weight: 300;\n" +
"    line-height: normal;\n" +
"    word-wrap: break-word; }\n" +
"  .swal2-popup #swal2-content {\n" +
"    text-align: center; }\n" +
"  .swal2-popup .swal2-input,\n" +
"  .swal2-popup .swal2-file,\n" +
"  .swal2-popup .swal2-textarea,\n" +
"  .swal2-popup .swal2-select,\n" +
"  .swal2-popup .swal2-radio,\n" +
"  .swal2-popup .swal2-checkbox {\n" +
"    margin: 1em auto; }\n" +
"  .swal2-popup .swal2-input,\n" +
"  .swal2-popup .swal2-file,\n" +
"  .swal2-popup .swal2-textarea {\n" +
"    width: 100%;\n" +
"    transition: border-color .3s, box-shadow .3s;\n" +
"    border: 1px solid #d9d9d9;\n" +
"    border-radius: 0.1875em;\n" +
"    font-size: 1.125em;\n" +
"    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n" +
"    box-sizing: border-box; }\n" +
"    .swal2-popup .swal2-input.swal2-inputerror,\n" +
"    .swal2-popup .swal2-file.swal2-inputerror,\n" +
"    .swal2-popup .swal2-textarea.swal2-inputerror {\n" +
"      border-color: #f27474 !important;\n" +
"      box-shadow: 0 0 2px #f27474 !important; }\n" +
"    .swal2-popup .swal2-input:focus,\n" +
"    .swal2-popup .swal2-file:focus,\n" +
"    .swal2-popup .swal2-textarea:focus {\n" +
"      border: 1px solid #b4dbed;\n" +
"      outline: none;\n" +
"      box-shadow: 0 0 3px #c4e6f5; }\n" +
"    .swal2-popup .swal2-input::-webkit-input-placeholder,\n" +
"    .swal2-popup .swal2-file::-webkit-input-placeholder,\n" +
"    .swal2-popup .swal2-textarea::-webkit-input-placeholder {\n" +
"      color: #cccccc; }\n" +
"    .swal2-popup .swal2-input:-ms-input-placeholder,\n" +
"    .swal2-popup .swal2-file:-ms-input-placeholder,\n" +
"    .swal2-popup .swal2-textarea:-ms-input-placeholder {\n" +
"      color: #cccccc; }\n" +
"    .swal2-popup .swal2-input::-ms-input-placeholder,\n" +
"    .swal2-popup .swal2-file::-ms-input-placeholder,\n" +
"    .swal2-popup .swal2-textarea::-ms-input-placeholder {\n" +
"      color: #cccccc; }\n" +
"    .swal2-popup .swal2-input::placeholder,\n" +
"    .swal2-popup .swal2-file::placeholder,\n" +
"    .swal2-popup .swal2-textarea::placeholder {\n" +
"      color: #cccccc; }\n" +
"  .swal2-popup .swal2-range input {\n" +
"    width: 80%; }\n" +
"  .swal2-popup .swal2-range output {\n" +
"    width: 20%;\n" +
"    font-weight: 600;\n" +
"    text-align: center; }\n" +
"  .swal2-popup .swal2-range input,\n" +
"  .swal2-popup .swal2-range output {\n" +
"    height: 2.625em;\n" +
"    margin: 1em auto;\n" +
"    padding: 0;\n" +
"    font-size: 1.125em;\n" +
"    line-height: 2.625em; }\n" +
"  .swal2-popup .swal2-input {\n" +
"    height: 2.625em;\n" +
"    padding: 0.75em; }\n" +
"    .swal2-popup .swal2-input[type='number'] {\n" +
"      max-width: 10em; }\n" +
"  .swal2-popup .swal2-file {\n" +
"    font-size: 1.125em; }\n" +
"  .swal2-popup .swal2-textarea {\n" +
"    height: 6.75em;\n" +
"    padding: 0.75em; }\n" +
"  .swal2-popup .swal2-select {\n" +
"    min-width: 50%;\n" +
"    max-width: 100%;\n" +
"    padding: .375em .625em;\n" +
"    color: #545454;\n" +
"    font-size: 1.125em; }\n" +
"  .swal2-popup .swal2-radio,\n" +
"  .swal2-popup .swal2-checkbox {\n" +
"    align-items: center;\n" +
"    justify-content: center; }\n" +
"    .swal2-popup .swal2-radio label,\n" +
"    .swal2-popup .swal2-checkbox label {\n" +
"      margin: 0 .6em;\n" +
"      font-size: 1.125em; }\n" +
"    .swal2-popup .swal2-radio input,\n" +
"    .swal2-popup .swal2-checkbox input {\n" +
"      margin: 0 .4em; }\n" +
"  .swal2-popup .swal2-validationerror {\n" +
"    display: none;\n" +
"    align-items: center;\n" +
"    justify-content: center;\n" +
"    padding: 0.625em;\n" +
"    background: #f0f0f0;\n" +
"    color: #666666;\n" +
"    font-size: 1em;\n" +
"    font-weight: 300;\n" +
"    overflow: hidden; }\n" +
"    .swal2-popup .swal2-validationerror::before {\n" +
"      display: inline-block;\n" +
"      width: 1.5em;\n" +
"      min-width: 1.5em;\n" +
"      height: 1.5em;\n" +
"      margin: 0 .625em;\n" +
"      border-radius: 50%;\n" +
"      background-color: #f27474;\n" +
"      color: #fff;\n" +
"      font-weight: 600;\n" +
"      line-height: 1.5em;\n" +
"      text-align: center;\n" +
"      content: '!';\n" +
"      zoom: normal; }\n" +
"\n" +
"@supports (-ms-accelerator: true) {\n" +
"  .swal2-range input {\n" +
"    width: 100% !important; }\n" +
"  .swal2-range output {\n" +
"    display: none; } }\n" +
"\n" +
"@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n" +
"  .swal2-range input {\n" +
"    width: 100% !important; }\n" +
"  .swal2-range output {\n" +
"    display: none; } }\n" +
"\n" +
"@-moz-document url-prefix() {\n" +
"  .swal2-close:focus {\n" +
"    outline: 2px solid rgba(50, 100, 150, 0.4); } }\n" +
"\n" +
".swal2-icon {\n" +
"  position: relative;\n" +
"  justify-content: center;\n" +
"  width: 5em;\n" +
"  height: 5em;\n" +
"  margin: 1.25em auto 1.875em;\n" +
"  border: .25em solid transparent;\n" +
"  border-radius: 50%;\n" +
"  line-height: 5em;\n" +
"  cursor: default;\n" +
"  box-sizing: content-box;\n" +
"  -webkit-user-select: none;\n" +
"     -moz-user-select: none;\n" +
"      -ms-user-select: none;\n" +
"          user-select: none;\n" +
"  zoom: normal; }\n" +
"  .swal2-icon-text {\n" +
"    font-size: 3.75em; }\n" +
"  .swal2-icon.swal2-error {\n" +
"    border-color: #f27474; }\n" +
"    .swal2-icon.swal2-error .swal2-x-mark {\n" +
"      position: relative;\n" +
"      flex-grow: 1; }\n" +
"    .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n" +
"      display: block;\n" +
"      position: absolute;\n" +
"      top: 2.3125em;\n" +
"      width: 2.9375em;\n" +
"      height: .3125em;\n" +
"      border-radius: .125em;\n" +
"      background-color: #f27474; }\n" +
"      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n" +
"        left: 1.0625em;\n" +
"        -webkit-transform: rotate(45deg);\n" +
"                transform: rotate(45deg); }\n" +
"      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n" +
"        right: 1em;\n" +
"        -webkit-transform: rotate(-45deg);\n" +
"                transform: rotate(-45deg); }\n" +
"  .swal2-icon.swal2-warning {\n" +
"    border-color: #facea8;\n" +
"    color: #f8bb86; }\n" +
"  .swal2-icon.swal2-info {\n" +
"    border-color: #9de0f6;\n" +
"    color: #3fc3ee; }\n" +
"  .swal2-icon.swal2-question {\n" +
"    border-color: #c9dae1;\n" +
"    color: #87adbd; }\n" +
"  .swal2-icon.swal2-success {\n" +
"    border-color: #a5dc86; }\n" +
"    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {\n" +
"      position: absolute;\n" +
"      width: 3.75em;\n" +
"      height: 7.5em;\n" +
"      -webkit-transform: rotate(45deg);\n" +
"              transform: rotate(45deg);\n" +
"      border-radius: 50%; }\n" +
"      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n" +
"        top: -.4375em;\n" +
"        left: -2.0635em;\n" +
"        -webkit-transform: rotate(-45deg);\n" +
"                transform: rotate(-45deg);\n" +
"        -webkit-transform-origin: 3.75em 3.75em;\n" +
"                transform-origin: 3.75em 3.75em;\n" +
"        border-radius: 7.5em 0 0 7.5em; }\n" +
"      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n" +
"        top: -.6875em;\n" +
"        left: 1.875em;\n" +
"        -webkit-transform: rotate(-45deg);\n" +
"                transform: rotate(-45deg);\n" +
"        -webkit-transform-origin: 0 3.75em;\n" +
"                transform-origin: 0 3.75em;\n" +
"        border-radius: 0 7.5em 7.5em 0; }\n" +
"    .swal2-icon.swal2-success .swal2-success-ring {\n" +
"      position: absolute;\n" +
"      top: -.25em;\n" +
"      left: -.25em;\n" +
"      width: 100%;\n" +
"      height: 100%;\n" +
"      border: 0.25em solid rgba(165, 220, 134, 0.3);\n" +
"      border-radius: 50%;\n" +
"      z-index: 2;\n" +
"      box-sizing: content-box; }\n" +
"    .swal2-icon.swal2-success .swal2-success-fix {\n" +
"      position: absolute;\n" +
"      top: .5em;\n" +
"      left: 1.625em;\n" +
"      width: .4375em;\n" +
"      height: 5.625em;\n" +
"      -webkit-transform: rotate(-45deg);\n" +
"              transform: rotate(-45deg);\n" +
"      z-index: 1; }\n" +
"    .swal2-icon.swal2-success [class^='swal2-success-line'] {\n" +
"      display: block;\n" +
"      position: absolute;\n" +
"      height: .3125em;\n" +
"      border-radius: .125em;\n" +
"      background-color: #a5dc86;\n" +
"      z-index: 2; }\n" +
"      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {\n" +
"        top: 2.875em;\n" +
"        left: .875em;\n" +
"        width: 1.5625em;\n" +
"        -webkit-transform: rotate(45deg);\n" +
"                transform: rotate(45deg); }\n" +
"      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {\n" +
"        top: 2.375em;\n" +
"        right: .5em;\n" +
"        width: 2.9375em;\n" +
"        -webkit-transform: rotate(-45deg);\n" +
"                transform: rotate(-45deg); }\n" +
"\n" +
".swal2-progresssteps {\n" +
"  align-items: center;\n" +
"  margin: 0 0 1.25em;\n" +
"  padding: 0;\n" +
"  font-weight: 600; }\n" +
"  .swal2-progresssteps li {\n" +
"    display: inline-block;\n" +
"    position: relative; }\n" +
"  .swal2-progresssteps .swal2-progresscircle {\n" +
"    width: 2em;\n" +
"    height: 2em;\n" +
"    border-radius: 2em;\n" +
"    background: #3085d6;\n" +
"    color: #fff;\n" +
"    line-height: 2em;\n" +
"    text-align: center;\n" +
"    z-index: 20; }\n" +
"    .swal2-progresssteps .swal2-progresscircle:first-child {\n" +
"      margin-left: 0; }\n" +
"    .swal2-progresssteps .swal2-progresscircle:last-child {\n" +
"      margin-right: 0; }\n" +
"    .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {\n" +
"      background: #3085d6; }\n" +
"      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {\n" +
"        background: #add8e6; }\n" +
"      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {\n" +
"        background: #add8e6; }\n" +
"  .swal2-progresssteps .swal2-progressline {\n" +
"    width: 2.5em;\n" +
"    height: .4em;\n" +
"    margin: 0 -1px;\n" +
"    background: #3085d6;\n" +
"    z-index: 10; }\n" +
"\n" +
"[class^='swal2'] {\n" +
"  -webkit-tap-highlight-color: transparent; }\n" +
"\n" +
".swal2-show {\n" +
"  -webkit-animation: swal2-show 0.3s;\n" +
"          animation: swal2-show 0.3s; }\n" +
"  .swal2-show.swal2-noanimation {\n" +
"    -webkit-animation: none;\n" +
"            animation: none; }\n" +
"\n" +
".swal2-hide {\n" +
"  -webkit-animation: swal2-hide 0.15s forwards;\n" +
"          animation: swal2-hide 0.15s forwards; }\n" +
"  .swal2-hide.swal2-noanimation {\n" +
"    -webkit-animation: none;\n" +
"            animation: none; }\n" +
"\n" +
"[dir='rtl'] .swal2-close {\n" +
"  right: auto;\n" +
"  left: 0; }\n" +
"\n" +
".swal2-animate-success-icon .swal2-success-line-tip {\n" +
"  -webkit-animation: swal2-animate-success-line-tip 0.75s;\n" +
"          animation: swal2-animate-success-line-tip 0.75s; }\n" +
"\n" +
".swal2-animate-success-icon .swal2-success-line-long {\n" +
"  -webkit-animation: swal2-animate-success-line-long 0.75s;\n" +
"          animation: swal2-animate-success-line-long 0.75s; }\n" +
"\n" +
".swal2-animate-success-icon .swal2-success-circular-line-right {\n" +
"  -webkit-animation: swal2-rotate-success-circular-line 4.25s ease-in;\n" +
"          animation: swal2-rotate-success-circular-line 4.25s ease-in; }\n" +
"\n" +
".swal2-animate-error-icon {\n" +
"  -webkit-animation: swal2-animate-error-icon 0.5s;\n" +
"          animation: swal2-animate-error-icon 0.5s; }\n" +
"  .swal2-animate-error-icon .swal2-x-mark {\n" +
"    -webkit-animation: swal2-animate-error-x-mark 0.5s;\n" +
"            animation: swal2-animate-error-x-mark 0.5s; }\n" +
"\n" +
"@-webkit-keyframes swal2-rotate-loading {\n" +
"  0% {\n" +
"    -webkit-transform: rotate(0deg);\n" +
"            transform: rotate(0deg); }\n" +
"  100% {\n" +
"    -webkit-transform: rotate(360deg);\n" +
"            transform: rotate(360deg); } }\n" +
"\n" +
"@keyframes swal2-rotate-loading {\n" +
"  0% {\n" +
"    -webkit-transform: rotate(0deg);\n" +
"            transform: rotate(0deg); }\n" +
"  100% {\n" +
"    -webkit-transform: rotate(360deg);\n" +
"            transform: rotate(360deg); } }");

/*



     Creative Tim Modifications

     Lines: 236 was changed from top: 5px to top: 50% and we added margin-top: -9px. In this way the close button will be aligned vertically
     Line:219 - modified when the icon is set, we add the class "alert-with-icon", so there will be enough space for the icon.
	 Lines: 179/222 - class() was changed to html() so we can add the Material Design Icons



*/


/*
 * Project: Bootstrap Notify = v3.1.5
 * Description: Turns standard Bootstrap alerts into "Growl-like" notifications.
 * Author: Mouse0270 aka Robert McIntosh
 * License: MIT License
 * Website: https://github.com/mouse0270/bootstrap-growl
 */

/* global define:false, require: false, jQuery:false */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    // Create the defaults once
    var defaults = {
        element: 'body',
        position: null,
        type: "info",
        allow_dismiss: true,
        allow_duplicates: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "center"
        },
        offset: 20,
        spacing: 10,
        z_index: 1062,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated bounceInDown',
            exit: 'animated bounceOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0}"  role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="mdi mdi-close"></i></button><i data-notify="icon" class="material-icons"></i><span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    };

    String.format = function() {
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
        }
        return str;
    };

    function isDuplicateNotification(notification) {
        var isDupe = false;

        $('[data-notify="container"]').each(function(i, el) {
            var $el = $(el);
            var title = $el.find('[data-notify="title"]').text().trim();
            var message = $el.find('[data-notify="message"]').html().trim();

            // The input string might be different than the actual parsed HTML string!
            // (<br> vs <br /> for example)
            // So we have to force-parse this as HTML here!
            var isSameTitle = title === $("<div>" + notification.settings.content.title + "</div>").html().trim();
            var isSameMsg = message === $("<div>" + notification.settings.content.message + "</div>").html().trim();
            var isSameType = $el.hasClass('alert-' + notification.settings.type);

            if (isSameTitle && isSameMsg && isSameType) {
                //we found the dupe. Set the var and stop checking.
                isDupe = true;
            }
            return !isDupe;
        });

        return isDupe;
    }

    function Notify(element, content, options) {
        // Setup Content of Notify
        var contentObj = {
            content: {
                message: typeof content === 'object' ? content.message : content,
                title: content.title ? content.title : '',
                icon: content.icon ? content.icon : '',
                url: content.url ? content.url : '#',
                target: content.target ? content.target : '-'
            }
        };

        options = $.extend(true, {}, contentObj, options);
        this.settings = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        if (this.settings.content.target === "-") {
            this.settings.content.target = this.settings.url_target;
        }
        this.animations = {
            start: 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
            end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
        };

        if (typeof this.settings.offset === 'number') {
            this.settings.offset = {
                x: this.settings.offset,
                y: this.settings.offset
            };
        }

        //if duplicate messages are not allowed, then only continue if this new message is not a duplicate of one that it already showing
        if (this.settings.allow_duplicates || (!this.settings.allow_duplicates && !isDuplicateNotification(this))) {
            this.init();
        }
    }

    $.extend(Notify.prototype, {
        init: function() {
            var self = this;

            this.buildNotify();
            if (this.settings.content.icon) {
                this.setIcon();
            }
            if (this.settings.content.url != "#") {
                this.styleURL();
            }
            this.styleDismiss();
            this.placement();
            this.bind();

            this.notify = {
                $ele: this.$ele,
                update: function(command, update) {
                    var commands = {};
                    if (typeof command === "string") {
                        commands[command] = update;
                    } else {
                        commands = command;
                    }
                    for (var cmd in commands) {
                        switch (cmd) {
                            case "type":
                                this.$ele.removeClass('alert-' + self.settings.type);
                                this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass('progress-bar-' + self.settings.type);
                                self.settings.type = commands[cmd];
                                this.$ele.addClass('alert-' + commands[cmd]).find('[data-notify="progressbar"] > .progress-bar').addClass('progress-bar-' + commands[cmd]);
                                break;
                            case "icon":
                                var $icon = this.$ele.find('[data-notify="icon"]');
                                if (self.settings.icon_type.toLowerCase() === 'class') {
                                    $icon.html(commands[cmd]);
                                } else {
                                    if (!$icon.is('img')) {
                                        $icon.find('img');
                                    }
                                    $icon.attr('src', commands[cmd]);
                                }
                                break;
                            case "progress":
                                var newDelay = self.settings.delay - (self.settings.delay * (commands[cmd] / 100));
                                this.$ele.data('notify-delay', newDelay);
                                this.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', commands[cmd]).css('width', commands[cmd] + '%');
                                break;
                            case "url":
                                this.$ele.find('[data-notify="url"]').attr('href', commands[cmd]);
                                break;
                            case "target":
                                this.$ele.find('[data-notify="url"]').attr('target', commands[cmd]);
                                break;
                            default:
                                this.$ele.find('[data-notify="' + cmd + '"]').html(commands[cmd]);
                        }
                    }
                    var posX = this.$ele.outerHeight() + parseInt(self.settings.spacing) + parseInt(self.settings.offset.y);
                    self.reposition(posX);
                },
                close: function() {
                    self.close();
                }
            };

        },
        buildNotify: function() {
            var content = this.settings.content;
            this.$ele = $(String.format(this.settings.template, this.settings.type, content.title, content.message, content.url, content.target));
            this.$ele.attr('data-notify-position', this.settings.placement.from + '-' + this.settings.placement.align);
            if (!this.settings.allow_dismiss) {
                this.$ele.find('[data-notify="dismiss"]').css('display', 'none');
            }
            if ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) {
                this.$ele.find('[data-notify="progressbar"]').remove();
            }
        },
        setIcon: function() {

            this.$ele.addClass('alert-with-icon');

            if (this.settings.icon_type.toLowerCase() === 'class') {
                this.$ele.find('[data-notify="icon"]').html(this.settings.content.icon);
            } else {
                if (this.$ele.find('[data-notify="icon"]').is('img')) {
                    this.$ele.find('[data-notify="icon"]').attr('src', this.settings.content.icon);
                } else {
                    this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />');
                }
            }
        },
        styleDismiss: function() {
            this.$ele.find('[data-notify="dismiss"]').css({
                position: 'absolute',
                right: '10px',
                top: '50%',
                marginTop: '-9px',
                zIndex: this.settings.z_index + 2
            });
        },
        styleURL: function() {
            this.$ele.find('[data-notify="url"]').css({
                backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
                height: '100%',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
                zIndex: this.settings.z_index + 1
            });
        },
        placement: function() {
            var self = this,
                offsetAmt = this.settings.offset.y,
                css = {
                    display: 'inline-block',
                    margin: '15px auto',
                    position: this.settings.position ? this.settings.position : (this.settings.element === 'body' ? 'fixed' : 'absolute'),
                    transition: 'all .5s ease-in-out',
                    zIndex: this.settings.z_index
                },
                hasAnimation = false,
                settings = this.settings;

            $('[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])').each(function() {
                offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) + parseInt($(this).outerHeight()) + parseInt(settings.spacing));
            });
            if (this.settings.newest_on_top === true) {
                offsetAmt = this.settings.offset.y;
            }
            css[this.settings.placement.from] = offsetAmt + 'px';

            switch (this.settings.placement.align) {
                case "left":
                case "right":
                    css[this.settings.placement.align] = this.settings.offset.x + 'px';
                    break;
                case "center":
                    css.left = 0;
                    css.right = 0;
                    break;
            }
            this.$ele.css(css).addClass(this.settings.animate.enter);
            $.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function(index, prefix) {
                self.$ele[0].style[prefix + 'AnimationIterationCount'] = 1;
            });

            $(this.settings.element).append(this.$ele);

            if (this.settings.newest_on_top === true) {
                offsetAmt = (parseInt(offsetAmt) + parseInt(this.settings.spacing)) + this.$ele.outerHeight();
                this.reposition(offsetAmt);
            }

            if ($.isFunction(self.settings.onShow)) {
                self.settings.onShow.call(this.$ele);
            }

            this.$ele.one(this.animations.start, function() {
                hasAnimation = true;
            }).one(this.animations.end, function() {
                if ($.isFunction(self.settings.onShown)) {
                    self.settings.onShown.call(this);
                }
            });

            setTimeout(function() {
                if (!hasAnimation) {
                    if ($.isFunction(self.settings.onShown)) {
                        self.settings.onShown.call(this);
                    }
                }
            }, 600);
        },
        bind: function() {
            var self = this;

            this.$ele.find('[data-notify="dismiss"]').on('click', function() {
                self.close();
            });

            this.$ele.mouseover(function() {
                $(this).data('data-hover', "true");
            }).mouseout(function() {
                $(this).data('data-hover', "false");
            });
            this.$ele.data('data-hover', "false");

            if (this.settings.delay > 0) {
                self.$ele.data('notify-delay', self.settings.delay);
                var timer = setInterval(function() {
                    var delay = parseInt(self.$ele.data('notify-delay')) - self.settings.timer;
                    if ((self.$ele.data('data-hover') === 'false' && self.settings.mouse_over === "pause") || self.settings.mouse_over != "pause") {
                        var percent = ((self.settings.delay - delay) / self.settings.delay) * 100;
                        self.$ele.data('notify-delay', delay);
                        self.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', percent).css('width', percent + '%');
                    }
                    if (delay <= -(self.settings.timer)) {
                        clearInterval(timer);
                        self.close();
                    }
                }, self.settings.timer);
            }
        },
        close: function() {
            var self = this,
                posX = parseInt(this.$ele.css(this.settings.placement.from)),
                hasAnimation = false;

            this.$ele.data('closing', 'true').addClass(this.settings.animate.exit);
            self.reposition(posX);

            if ($.isFunction(self.settings.onClose)) {
                self.settings.onClose.call(this.$ele);
            }

            this.$ele.one(this.animations.start, function() {
                hasAnimation = true;
            }).one(this.animations.end, function() {
                $(this).remove();
                if ($.isFunction(self.settings.onClosed)) {
                    self.settings.onClosed.call(this);
                }
            });

            setTimeout(function() {
                if (!hasAnimation) {
                    self.$ele.remove();
                    if (self.settings.onClosed) {
                        self.settings.onClosed(self.$ele);
                    }
                }
            }, 600);
        },
        reposition: function(posX) {
            var self = this,
                notifies = '[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])',
                $elements = this.$ele.nextAll(notifies);
            if (this.settings.newest_on_top === true) {
                $elements = this.$ele.prevAll(notifies);
            }
            $elements.each(function() {
                $(this).css(self.settings.placement.from, posX);
                posX = (parseInt(posX) + parseInt(self.settings.spacing)) + $(this).outerHeight();
            });
        }
    });

    $.notify = function(content, options) {
        var plugin = new Notify(this, content, options);
        return plugin.notify;
    };
    $.notifyDefaults = function(options) {
        defaults = $.extend(true, {}, defaults, options);
        return defaults;
    };
    $.notifyClose = function(command) {
        if (typeof command === "undefined" || command === "all") {
            $('[data-notify]').find('[data-notify="dismiss"]').trigger('click');
        } else {
            $('[data-notify-position="' + command + '"]').find('[data-notify="dismiss"]').trigger('click');
        }
    };

}));

/*! 
 * angular-hotkeys v1.5.0
 * https://chieffancypants.github.io/angular-hotkeys
 * Copyright (c) 2015 Wes Cruver
 * License: MIT
 */
!function(){"use strict";angular.module("cfp.hotkeys",[]).provider("hotkeys",["$injector",function(a){this.includeCheatSheet=!0,this.useNgRoute=a.has("ngViewDirective"),this.templateTitle="Keyboard Shortcuts:",this.templateHeader=null,this.templateFooter=null,this.template='<div class="cfp-hotkeys-container fade" ng-class="{in: helpVisible}" style="display: none;"><div class="cfp-hotkeys"><h4 class="cfp-hotkeys-title" ng-if="!header">{{ title }}</h4><div ng-bind-html="header" ng-if="header"></div><table><tbody><tr ng-repeat="hotkey in hotkeys | filter:{ description: \'!$$undefined$$\' }"><td class="cfp-hotkeys-keys"><span ng-repeat="key in hotkey.format() track by $index" class="cfp-hotkeys-key">{{ key }}</span></td><td class="cfp-hotkeys-text">{{ hotkey.description }}</td></tr></tbody></table><div ng-bind-html="footer" ng-if="footer"></div><div class="cfp-hotkeys-close" ng-click="toggleCheatSheet()">×</div></div></div>',this.cheatSheetHotkey="?",this.cheatSheetDescription="Show / hide this help menu",this.$get=["$rootElement","$rootScope","$compile","$window","$document",function(a,b,c,d,e){function f(a){var b={command:"⌘",shift:"⇧",left:"←",right:"→",up:"↑",down:"↓","return":"↩",backspace:"⌫"};a=a.split("+");for(var c=0;c<a.length;c++)"mod"===a[c]&&(d.navigator&&d.navigator.platform.indexOf("Mac")>=0?a[c]="command":a[c]="ctrl"),a[c]=b[a[c]]||a[c];return a.join(" + ")}function g(a,b,c,d,e,f){this.combo=a instanceof Array?a:[a],this.description=b,this.callback=c,this.action=d,this.allowIn=e,this.persistent=f,this._formated=null}function h(){for(var a=o.hotkeys.length;a--;){var b=o.hotkeys[a];b&&!b.persistent&&k(b)}}function i(){o.helpVisible=!o.helpVisible,o.helpVisible?(t=l("esc"),k("esc"),j("esc",t.description,i,null,["INPUT","SELECT","TEXTAREA"])):(k("esc"),t!==!1&&j(t))}function j(a,b,c,d,e,f){var h,i=["INPUT","SELECT","TEXTAREA"],j=Object.prototype.toString.call(a);if("[object Object]"===j&&(b=a.description,c=a.callback,d=a.action,f=a.persistent,e=a.allowIn,a=a.combo),b instanceof Function?(d=c,c=b,b="$$undefined$$"):angular.isUndefined(b)&&(b="$$undefined$$"),void 0===f&&(f=!0),"function"==typeof c){h=c,e instanceof Array||(e=[]);for(var k,l=0;l<e.length;l++)e[l]=e[l].toUpperCase(),k=i.indexOf(e[l]),-1!==k&&i.splice(k,1);c=function(a){var b=!0,c=a.target||a.srcElement,d=c.nodeName.toUpperCase();if((" "+c.className+" ").indexOf(" mousetrap ")>-1)b=!0;else for(var e=0;e<i.length;e++)if(i[e]===d){b=!1;break}b&&n(h.apply(this,arguments))}}"string"==typeof d?Mousetrap.bind(a,n(c),d):Mousetrap.bind(a,n(c));var m=new g(a,b,c,d,e,f);return o.hotkeys.push(m),m}function k(a){var b=a instanceof g?a.combo:a;if(Mousetrap.unbind(b),angular.isArray(b)){for(var c=!0,d=b.length;d--;)c=k(b[d])&&c;return c}var e=o.hotkeys.indexOf(l(b));return e>-1?(o.hotkeys[e].combo.length>1?o.hotkeys[e].combo.splice(o.hotkeys[e].combo.indexOf(b),1):o.hotkeys.splice(e,1),!0):!1}function l(a){if(!a)return o.hotkeys;for(var b,c=0;c<o.hotkeys.length;c++)if(b=o.hotkeys[c],b.combo.indexOf(a)>-1)return b;return!1}function m(a){return a.$id in p||(p[a.$id]=[],a.$on("$destroy",function(){for(var b=p[a.$id].length;b--;)k(p[a.$id].pop())})),{add:function(b){var c;return c=arguments.length>1?j.apply(this,arguments):j(b),p[a.$id].push(c),this}}}function n(a){return function(c,d){if(a instanceof Array){var e=a[0],f=a[1];a=function(a){f.scope.$eval(e)}}b.$apply(function(){a(c,l(d))})}}Mousetrap.prototype.stopCallback=function(a,b){return(" "+b.className+" ").indexOf(" mousetrap ")>-1?!1:b.contentEditable&&"true"==b.contentEditable},g.prototype.format=function(){if(null===this._formated){for(var a=this.combo[0],b=a.split(/[\s]/),c=0;c<b.length;c++)b[c]=f(b[c]);this._formated=b}return this._formated};var o=b.$new();o.hotkeys=[],o.helpVisible=!1,o.title=this.templateTitle,o.header=this.templateHeader,o.footer=this.templateFooter,o.toggleCheatSheet=i;var p=[];if(this.useNgRoute&&b.$on("$routeChangeSuccess",function(a,b){h(),b&&b.hotkeys&&angular.forEach(b.hotkeys,function(a){var c=a[2];("string"==typeof c||c instanceof String)&&(a[2]=[c,b]),a[5]=!1,j.apply(this,a)})}),this.includeCheatSheet){var q=e[0],r=a[0],s=angular.element(this.template);j(this.cheatSheetHotkey,this.cheatSheetDescription,i),(r===q||r===q.documentElement)&&(r=q.body),angular.element(r).append(c(s)(o))}var t=!1,u={add:j,del:k,get:l,bindTo:m,template:this.template,toggleCheatSheet:i,includeCheatSheet:this.includeCheatSheet,cheatSheetHotkey:this.cheatSheetHotkey,cheatSheetDescription:this.cheatSheetDescription,useNgRoute:this.useNgRoute,purgeHotkeys:h,templateTitle:this.templateTitle};return u}]}]).directive("hotkey",["hotkeys",function(a){return{restrict:"A",link:function(b,c,d){var e,f;angular.forEach(b.$eval(d.hotkey),function(b,c){f="string"==typeof d.hotkeyAllowIn?d.hotkeyAllowIn.split(/[\s,]+/):[],e=c,a.add({combo:c,description:d.hotkeyDescription,callback:b,action:d.hotkeyAction,allowIn:f})}),c.bind("$destroy",function(){a.del(e)})}}}]).run(["hotkeys",function(a){}])}(),function(a,b,c){function d(a,b,c){return a.addEventListener?void a.addEventListener(b,c,!1):void a.attachEvent("on"+b,c)}function e(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);return a.shiftKey||(b=b.toLowerCase()),b}return r[a.which]?r[a.which]:s[a.which]?s[a.which]:String.fromCharCode(a.which).toLowerCase()}function f(a,b){return a.sort().join(",")===b.sort().join(",")}function g(a){var b=[];return a.shiftKey&&b.push("shift"),a.altKey&&b.push("alt"),a.ctrlKey&&b.push("ctrl"),a.metaKey&&b.push("meta"),b}function h(a){return a.preventDefault?void a.preventDefault():void(a.returnValue=!1)}function i(a){return a.stopPropagation?void a.stopPropagation():void(a.cancelBubble=!0)}function j(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}function k(){if(!q){q={};for(var a in r)a>95&&112>a||r.hasOwnProperty(a)&&(q[r[a]]=a)}return q}function l(a,b,c){return c||(c=k()[a]?"keydown":"keypress"),"keypress"==c&&b.length&&(c="keydown"),c}function m(a){return"+"===a?["+"]:(a=a.replace(/\+{2}/g,"+plus"),a.split("+"))}function n(a,b){var c,d,e,f=[];for(c=m(a),e=0;e<c.length;++e)d=c[e],u[d]&&(d=u[d]),b&&"keypress"!=b&&t[d]&&(d=t[d],f.push("shift")),j(d)&&f.push(d);return b=l(d,f,b),{key:d,modifiers:f,action:b}}function o(a,c){return a===b?!1:a===c?!0:o(a.parentNode,c)}function p(a){function c(a){a=a||{};var b,c=!1;for(b in u)a[b]?c=!0:u[b]=0;c||(x=!1)}function k(a,b,c,d,e,g){var h,i,k=[],l=c.type;if(!s._callbacks[a])return[];for("keyup"==l&&j(a)&&(b=[a]),h=0;h<s._callbacks[a].length;++h)if(i=s._callbacks[a][h],(d||!i.seq||u[i.seq]==i.level)&&l==i.action&&("keypress"==l&&!c.metaKey&&!c.ctrlKey||f(b,i.modifiers))){var m=!d&&i.combo==e,n=d&&i.seq==d&&i.level==g;(m||n)&&s._callbacks[a].splice(h,1),k.push(i)}return k}function l(a,b,c,d){s.stopCallback(b,b.target||b.srcElement,c,d)||a(b,c)===!1&&(h(b),i(b))}function m(a){"number"!=typeof a.which&&(a.which=a.keyCode);var b=e(a);if(b)return"keyup"==a.type&&v===b?void(v=!1):void s.handleKey(b,g(a),a)}function o(){clearTimeout(t),t=setTimeout(c,1e3)}function q(a,b,d,f){function g(b){return function(){x=b,++u[a],o()}}function h(b){l(d,b,a),"keyup"!==f&&(v=e(b)),setTimeout(c,10)}u[a]=0;for(var i=0;i<b.length;++i){var j=i+1===b.length,k=j?h:g(f||n(b[i+1]).action);r(b[i],k,f,a,i)}}function r(a,b,c,d,e){s._directMap[a+":"+c]=b,a=a.replace(/\s+/g," ");var f,g=a.split(" ");return g.length>1?void q(a,g,b,c):(f=n(a,c),s._callbacks[f.key]=s._callbacks[f.key]||[],k(f.key,f.modifiers,{type:f.action},d,a,e),void s._callbacks[f.key][d?"unshift":"push"]({callback:b,modifiers:f.modifiers,action:f.action,seq:d,level:e,combo:a}))}var s=this;if(a=a||b,!(s instanceof p))return new p(a);s.target=a,s._callbacks={},s._directMap={};var t,u={},v=!1,w=!1,x=!1;s._handleKey=function(a,b,d){var e,f=k(a,b,d),g={},h=0,i=!1;for(e=0;e<f.length;++e)f[e].seq&&(h=Math.max(h,f[e].level));for(e=0;e<f.length;++e)if(f[e].seq){if(f[e].level!=h)continue;i=!0,g[f[e].seq]=1,l(f[e].callback,d,f[e].combo,f[e].seq)}else i||l(f[e].callback,d,f[e].combo);var m="keypress"==d.type&&w;d.type!=x||j(a)||m||c(g),w=i&&"keydown"==d.type},s._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)r(a[d],b,c)},d(a,"keypress",m),d(a,"keydown",m),d(a,"keyup",m)}for(var q,r={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},s={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},t={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},u={option:"alt",command:"meta","return":"enter",escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},v=1;20>v;++v)r[111+v]="f"+v;for(v=0;9>=v;++v)r[v+96]=v;p.prototype.bind=function(a,b,c){var d=this;return a=a instanceof Array?a:[a],d._bindMultiple.call(d,a,b,c),d},p.prototype.unbind=function(a,b){var c=this;return c.bind.call(c,a,function(){},b)},p.prototype.trigger=function(a,b){var c=this;return c._directMap[a+":"+b]&&c._directMap[a+":"+b]({},a),c},p.prototype.reset=function(){var a=this;return a._callbacks={},a._directMap={},a},p.prototype.stopCallback=function(a,b){var c=this;return(" "+b.className+" ").indexOf(" mousetrap ")>-1?!1:o(b,c.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable},p.prototype.handleKey=function(){var a=this;return a._handleKey.apply(a,arguments)},p.init=function(){var a=p(b);for(var c in a)"_"!==c.charAt(0)&&(p[c]=function(b){return function(){return a[b].apply(a,arguments)}}(c))},p.init(),a.Mousetrap=p,"undefined"!=typeof module&&module.exports&&(module.exports=p),"function"==typeof define&&define.amd&&define(function(){return p})}(window,document);
//! moment.js

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

/*
 * ui-bootstrap4
 * http://morgul.github.io/ui-bootstrap4/

 * Version: 3.0.6 - 2018-11-17
 * License: MIT
 */angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.collapse","ui.bootstrap.tabindex","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.common","ui.bootstrap.dateparser","ui.bootstrap.isClass","ui.bootstrap.datepicker","ui.bootstrap.position","ui.bootstrap.datepickerPopup","ui.bootstrap.debounce","ui.bootstrap.multiMap","ui.bootstrap.dropdown","ui.bootstrap.stackedMap","ui.bootstrap.modal","ui.bootstrap.paging","ui.bootstrap.pager","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]);
angular.module("ui.bootstrap.tpls", ["uib/template/accordion/accordion-group.html","uib/template/accordion/accordion.html","uib/template/alert/alert.html","uib/template/carousel/carousel.html","uib/template/carousel/slide.html","uib/template/datepicker/datepicker.html","uib/template/datepicker/day.html","uib/template/datepicker/month.html","uib/template/datepicker/year.html","uib/template/datepickerPopup/popup.html","uib/template/modal/window.html","uib/template/pager/pager.html","uib/template/pagination/pagination.html","uib/template/tooltip/tooltip-html-popup.html","uib/template/tooltip/tooltip-popup.html","uib/template/tooltip/tooltip-template-popup.html","uib/template/popover/popover-html.html","uib/template/popover/popover-template.html","uib/template/popover/popover.html","uib/template/progressbar/bar.html","uib/template/progressbar/progress.html","uib/template/progressbar/progressbar.html","uib/template/rating/rating.html","uib/template/tabs/tab.html","uib/template/tabs/tabset.html","uib/template/timepicker/timepicker.html","uib/template/typeahead/typeahead-match.html","uib/template/typeahead/typeahead-popup.html"]);
angular.module('ui.bootstrap.collapse', [])

  .directive('uibCollapse', ['$animate', '$q', '$parse', '$injector', function($animate, $q, $parse, $injector) {
    var $animateCss = $injector.has('$animateCss') ? $injector.get('$animateCss') : null;
    return {
      link: function(scope, element, attrs) {
        var expandingExpr = $parse(attrs.expanding),
          expandedExpr = $parse(attrs.expanded),
          collapsingExpr = $parse(attrs.collapsing),
          collapsedExpr = $parse(attrs.collapsed),
          horizontal = false,
          css = {},
          cssTo = {};

        init();

        function init() {
          horizontal = !!('horizontal' in attrs);
          if (horizontal) {
            css = {
              width: ''
            };
            cssTo = {width: '0'};
          } else {
            css = {
              height: ''
            };
            cssTo = {height: '0'};
          }
          if (!scope.$eval(attrs.uibCollapse)) {
            element.addClass('show')
              .addClass('collapse')
              .attr('aria-expanded', true)
              .attr('aria-hidden', false)
              .css(css);
          }
        }

        function getScrollFromElement(element) {
          if (horizontal) {
            return {width: element.scrollWidth + 'px'};
          }
          return {height: element.scrollHeight + 'px'};
        }

        function expand() {
          if (element.hasClass('collapse') && element.hasClass('show')) {
            return;
          }

          $q.resolve(expandingExpr(scope))
            .then(function() {
              element.removeClass('collapse')
                .addClass('collapsing')
                .attr('aria-expanded', true)
                .attr('aria-hidden', false);

              if ($animateCss) {
                $animateCss(element, {
                  addClass: 'show',
                  easing: 'ease',
                  css: {
                    overflow: 'hidden'
                  },
                  to: getScrollFromElement(element[0])
                }).start()['finally'](expandDone);
              } else {
                $animate.addClass(element, 'show', {
                  css: {
                    overflow: 'hidden'
                  },
                  to: getScrollFromElement(element[0])
                }).then(expandDone);
              }
            }, angular.noop);
        }

        function expandDone() {
          element.removeClass('collapsing')
            .addClass('collapse')
            .css(css);
          expandedExpr(scope);
        }

        function collapse() {
          if (!element.hasClass('collapse') && !element.hasClass('show')) {
            return collapseDone();
          }

          $q.resolve(collapsingExpr(scope))
            .then(function() {
              element
              // IMPORTANT: The width must be set before adding "collapsing" class.
              // Otherwise, the browser attempts to animate from width 0 (in
              // collapsing class) to the given width here.
                .css(getScrollFromElement(element[0]))
                // initially all card collapse have the collapse class, this removal
                // prevents the animation from jumping to collapsed state
                .removeClass('collapse')
                .addClass('collapsing')
                .attr('aria-expanded', false)
                .attr('aria-hidden', true);

              if ($animateCss) {
                $animateCss(element, {
                  removeClass: 'show',
                  to: cssTo
                }).start()['finally'](collapseDone);
              } else {
                $animate.removeClass(element, 'show', {
                  to: cssTo
                }).then(collapseDone);
              }
            }, angular.noop);
        }

        function collapseDone() {
          element.css(cssTo); // Required so that collapse works when animation is disabled
          element.removeClass('collapsing')
            .addClass('collapse');
          collapsedExpr(scope);
        }

        scope.$watch(attrs.uibCollapse, function(shouldCollapse) {
          if (shouldCollapse) {
            collapse();
          } else {
            expand();
          }
        });
      }
    };
  }]);

angular.module('ui.bootstrap.tabindex', [])

.directive('uibTabindexToggle', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      attrs.$observe('disabled', function(disabled) {
        attrs.$set('tabindex', disabled ? -1 : null);
      });
    }
  };
});

angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse', 'ui.bootstrap.tabindex'])

.constant('uibAccordionConfig', {
  closeOthers: true
})

.controller('UibAccordionController', ['$scope', '$attrs', 'uibAccordionConfig', function($scope, $attrs, accordionConfig) {
  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ?
      $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if (closeOthers) {
      angular.forEach(this.groups, function(group) {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function(event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  };
}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('uibAccordion', function() {
  return {
    controller: 'UibAccordionController',
    controllerAs: 'accordion',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/accordion/accordion.html';
    }
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('uibAccordionGroup', function() {
  return {
    require: '^uibAccordion',         // We need this directive to be inside an accordion
    transclude: true,              // It transcludes the contents of the directive into the template
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/accordion/accordion-group.html';
    },
    scope: {
      heading: '@',               // Interpolate the heading attribute onto this scope
      cardClass: '@?',           // Ditto with cardClass
      isOpen: '=?',
      isDisabled: '=?'
    },
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
    },
    link: function(scope, element, attrs, accordionCtrl) {
      element.addClass('card');
      accordionCtrl.addGroup(scope);

      scope.openClass = attrs.openClass || 'card-open';
      scope.cardClass = attrs.cardClass || 'card-default';
      scope.$watch('isOpen', function(value) {
        element.toggleClass(scope.openClass, !!value);
        if (value) {
          accordionCtrl.closeOthers(scope);
        }
      });

      scope.toggleOpen = function($event) {
        if (!scope.isDisabled) {
          if (!$event || $event.which === 32) {
            scope.isOpen = !scope.isOpen;
          }
        }
      };

      var id = 'accordiongroup-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
      scope.headingId = id + '-tab';
      scope.cardId = id + '-card';
    }
  };
})

// Use accordion-heading below an accordion-group to provide a heading containing HTML
.directive('uibAccordionHeading', function() {
  return {
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^uibAccordionGroup',
    link: function(scope, element, attrs, accordionGroupCtrl, transclude) {
      // Pass the heading to the accordion-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
      accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
.directive('uibAccordionTransclude', function() {
  return {
    require: '^uibAccordionGroup',
    link: function(scope, element, attrs, controller) {
      scope.$watch(function() { return controller[attrs.uibAccordionTransclude]; }, function(heading) {
        if (heading) {
          var elem = angular.element(element[0].querySelector(getHeaderSelectors()));
          elem.html('');
          elem.append(heading);
        }
      });
    }
  };

  function getHeaderSelectors() {
      return 'uib-accordion-header,' +
          'data-uib-accordion-header,' +
          'x-uib-accordion-header,' +
          'uib\\:accordion-header,' +
          '[uib-accordion-header],' +
          '[data-uib-accordion-header],' +
          '[x-uib-accordion-header]';
  }
});

angular.module('ui.bootstrap.alert', [])

.controller('UibAlertController', ['$scope', '$element', '$attrs', '$interpolate', '$timeout', function($scope, $element, $attrs, $interpolate, $timeout) {
  $scope.closeable = !!$attrs.close;
  $element.addClass('alert');
  $attrs.$set('role', 'alert');
  if ($scope.closeable) {
    $element.addClass('alert-dismissible');
  }

  var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
    $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;

  if (dismissOnTimeout) {
    $timeout(function() {
      $scope.close();
    }, parseInt(dismissOnTimeout, 10));
  }
}])

.directive('uibAlert', function() {
  return {
    controller: 'UibAlertController',
    controllerAs: 'alert',
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/alert/alert.html';
    },
    transclude: true,
    scope: {
      close: '&'
    }
  };
});

angular.module('ui.bootstrap.buttons', [])

.constant('uibButtonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
})

.controller('UibButtonsController', ['uibButtonConfig', function(buttonConfig) {
  this.activeClass = buttonConfig.activeClass || 'active';
  this.toggleEvent = buttonConfig.toggleEvent || 'click';
}])

.directive('uibBtnRadio', ['$parse', function($parse) {
  return {
    require: ['uibBtnRadio', 'ngModel'],
    controller: 'UibButtonsController',
    controllerAs: 'buttons',
    link: function(scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      var uncheckableExpr = $parse(attrs.uibUncheckable);

      element.find('input').css({display: 'none'});

      //model -> UI
      ngModelCtrl.$render = function() {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.uibBtnRadio)));
      };

      //ui->model
      element.on(buttonsCtrl.toggleEvent, function() {
        if (attrs.disabled) {
          return;
        }

        var isActive = element.hasClass(buttonsCtrl.activeClass);

        if (!isActive || angular.isDefined(attrs.uncheckable)) {
          scope.$apply(function() {
            ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.uibBtnRadio));
            ngModelCtrl.$render();
          });
        }
      });

      if (attrs.uibUncheckable) {
        scope.$watch(uncheckableExpr, function(uncheckable) {
          attrs.$set('uncheckable', uncheckable ? '' : undefined);
        });
      }
    }
  };
}])

.directive('uibBtnCheckbox', function() {
  return {
    require: ['uibBtnCheckbox', 'ngModel'],
    controller: 'UibButtonsController',
    controllerAs: 'button',
    link: function(scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      element.find('input').css({display: 'none'});

      function getTrueValue() {
        return getCheckboxValue(attrs.btnCheckboxTrue, true);
      }

      function getFalseValue() {
        return getCheckboxValue(attrs.btnCheckboxFalse, false);
      }

      function getCheckboxValue(attribute, defaultValue) {
        return angular.isDefined(attribute) ? scope.$eval(attribute) : defaultValue;
      }

      //model -> UI
      ngModelCtrl.$render = function() {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
      };

      //ui->model
      element.on(buttonsCtrl.toggleEvent, function() {
        if (attrs.disabled) {
          return;
        }

        scope.$apply(function() {
          ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
          ngModelCtrl.$render();
        });
      });
    }
  };
});

angular.module('ui.bootstrap.carousel', [])

.controller('UibCarouselController', ['$scope', '$element', '$interval', '$timeout', '$animate', function($scope, $element, $interval, $timeout, $animate) {
  var self = this,
    slides = self.slides = $scope.slides = [],
    SLIDE_DIRECTION = 'uib-slideDirection',
    currentIndex = $scope.active,
    currentInterval, isPlaying;

  var destroyed = false;
  $element.addClass('carousel');

  self.addSlide = function(slide, element) {
    slides.push({
      slide: slide,
      element: element
    });
    slides.sort(function(a, b) {
      return +a.slide.index - +b.slide.index;
    });
    //if this is the first slide or the slide is set to active, select it
    if (slide.index === $scope.active || slides.length === 1 && !angular.isNumber($scope.active)) {
      if ($scope.$currentTransition) {
        $scope.$currentTransition = null;
      }

      currentIndex = slide.index;
      $scope.active = slide.index;
      setActive(currentIndex);
      self.select(slides[findSlideIndex(slide)]);
      if (slides.length === 1) {
        $scope.play();
      }
    }
  };

  self.getCurrentIndex = function() {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].slide.index === currentIndex) {
        return i;
      }
    }
  };

  self.next = $scope.next = function() {
    var newIndex = (self.getCurrentIndex() + 1) % slides.length;

    if (newIndex === 0 && $scope.noWrap()) {
      $scope.pause();
      return;
    }

    return self.select(slides[newIndex], 'next');
  };

  self.prev = $scope.prev = function() {
    var newIndex = self.getCurrentIndex() - 1 < 0 ? slides.length - 1 : self.getCurrentIndex() - 1;

    if ($scope.noWrap() && newIndex === slides.length - 1) {
      $scope.pause();
      return;
    }

    return self.select(slides[newIndex], 'prev');
  };

  self.removeSlide = function(slide) {
    var index = findSlideIndex(slide);

    //get the index of the slide inside the carousel
    slides.splice(index, 1);
    if (slides.length > 0 && currentIndex === index) {
      if (index >= slides.length) {
        currentIndex = slides.length - 1;
        $scope.active = currentIndex;
        setActive(currentIndex);
        self.select(slides[slides.length - 1]);
      } else {
        currentIndex = index;
        $scope.active = currentIndex;
        setActive(currentIndex);
        self.select(slides[index]);
      }
    } else if (currentIndex > index) {
      currentIndex--;
      $scope.active = currentIndex;
    }

    //clean the active value when no more slide
    if (slides.length === 0) {
      currentIndex = null;
      $scope.active = null;
    }
  };

  /* direction: "prev" or "next" */
  self.select = $scope.select = function(nextSlide, direction) {
    var nextIndex = findSlideIndex(nextSlide.slide);
    //Decide direction if it's not given
    if (direction === undefined) {
      direction = nextIndex > self.getCurrentIndex() ? 'next' : 'prev';
    }
    //Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide.slide.index !== currentIndex &&
      !$scope.$currentTransition) {
      goNext(nextSlide.slide, nextIndex, direction);
    }
  };

  /* Allow outside people to call indexOf on slides array */
  $scope.indexOfSlide = function(slide) {
    return +slide.slide.index;
  };

  $scope.isActive = function(slide) {
    return $scope.active === slide.slide.index;
  };

  $scope.isPrevDisabled = function() {
    return $scope.active === 0 && $scope.noWrap();
  };

  $scope.isNextDisabled = function() {
    return $scope.active === slides.length - 1 && $scope.noWrap();
  };

  $scope.pause = function() {
    if (!$scope.noPause) {
      isPlaying = false;
      resetTimer();
    }
  };

  $scope.play = function() {
    if (!isPlaying) {
      isPlaying = true;
      restartTimer();
    }
  };

  $element.on('mouseenter', $scope.pause);
  $element.on('mouseleave', $scope.play);

  $scope.$on('$destroy', function() {
    destroyed = true;
    resetTimer();
  });

  $scope.$watch('noTransition', function(noTransition) {
    $animate.enabled($element, !noTransition);
  });

  $scope.$watch('interval', restartTimer);

  $scope.$watchCollection('slides', resetTransition);

  $scope.$watch('active', function(index) {
    if (angular.isNumber(index) && currentIndex !== index) {
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].slide.index === index) {
          index = i;
          break;
        }
      }

      var slide = slides[index];
      if (slide) {
        setActive(index);
        self.select(slides[index]);
        currentIndex = index;
      }
    }
  });

  function getSlideByIndex(index) {
    for (var i = 0, l = slides.length; i < l; ++i) {
      if (slides[i].index === index) {
        return slides[i];
      }
    }
  }

  function setActive(index) {
    for (var i = 0; i < slides.length; i++) {
      slides[i].slide.active = i === index;
    }
  }

  function goNext(slide, index, direction) {
    if (destroyed) {
      return;
    }

    angular.extend(slide, {direction: direction});
    angular.extend(slides[currentIndex].slide || {}, {direction: direction});
    if ($animate.enabled($element) && !$scope.$currentTransition &&
      slides[index].element && self.slides.length > 1) {
      slides[index].element.data(SLIDE_DIRECTION, slide.direction);
      var currentIdx = self.getCurrentIndex();

      if (angular.isNumber(currentIdx) && slides[currentIdx].element) {
        slides[currentIdx].element.data(SLIDE_DIRECTION, slide.direction);
      }

      $scope.$currentTransition = true;
      $animate.on('addClass', slides[index].element, function(element, phase) {
        if (phase === 'close') {
          $scope.$currentTransition = null;
          $animate.off('addClass', element);
        }
      });
    }

    $scope.active = slide.index;
    currentIndex = slide.index;
    setActive(index);

    //every time you change slides, reset the timer
    restartTimer();
  }

  function findSlideIndex(slide) {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].slide === slide) {
        return i;
      }
    }
  }

  function resetTimer() {
    if (currentInterval) {
      $interval.cancel(currentInterval);
      currentInterval = null;
    }
  }

  function resetTransition(slides) {
    if (!slides.length) {
      $scope.$currentTransition = null;
    }
  }

  function restartTimer() {
    resetTimer();
    var interval = +$scope.interval;
    if (!isNaN(interval) && interval > 0) {
      currentInterval = $interval(timerFn, interval);
    }
  }

  function timerFn() {
    var interval = +$scope.interval;
    if (isPlaying && !isNaN(interval) && interval > 0 && slides.length) {
      $scope.next();
    } else {
      $scope.pause();
    }
  }
}])

.directive('uibCarousel', function() {
  return {
    transclude: true,
    controller: 'UibCarouselController',
    controllerAs: 'carousel',
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/carousel/carousel.html';
    },
    scope: {
      active: '=?',
      interval: '=',
      noTransition: '=',
      noPause: '=',
      noWrap: '&'
    }
  };
})

.directive('uibSlide', ['$animate', function($animate) {
  return {
    require: '^uibCarousel',
    restrict: 'A',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/carousel/slide.html';
    },
    scope: {
      actual: '=?',
      index: '=?'
    },
    link: function (scope, element, attrs, carouselCtrl) {
      element.addClass('carousel-item');
      carouselCtrl.addSlide(scope, element);
      //when the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function() {
        carouselCtrl.removeSlide(scope);
      });

      scope.$watch('active', function(active) {
        $animate[active ? 'addClass' : 'removeClass'](element, 'active');
      });
    }
  };
}])

.animation('.carousel-item', ['$animateCss',
function($animateCss) {
  var SLIDE_DIRECTION = 'uib-slideDirection';
  var classPrefix = 'carousel-item-';

  function removeClass(element, className, callback) {
    element.removeClass(className);
    if (callback) {
      callback();
    }
  }

  return {
    beforeAddClass: function(element, className, done) {
      if (className === 'active') {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction === 'next' ? classPrefix + 'left' : classPrefix + 'right';
        var removeClassFn = removeClass.bind(this, element, [directionClass, classPrefix + direction].join(' '), done);
        element.addClass(classPrefix + direction);

        $animateCss(element, {addClass: directionClass})
          .start()
          .done(removeClassFn);

        return function() {
          stopped = true;
        };
      }
      done();
    },
    beforeRemoveClass: function (element, className, done) {
      if (className === 'active') {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction === 'next' ? classPrefix + 'left' : classPrefix + 'right';
        var removeClassFn = removeClass.bind(this, element, directionClass, done);

        $animateCss(element, {addClass: directionClass})
          .start()
          .done(removeClassFn);

        return function() {
          stopped = true;
        };
      }
      done();
    }
  };
}]);

angular.module('ui.bootstrap.common', []);

angular.module('ui.bootstrap.dateparser', [])

.service('uibDateParser', ['$log', '$locale', 'dateFilter', 'orderByFilter', 'filterFilter', function($log, $locale, dateFilter, orderByFilter, filterFilter) {
  // Pulled from https://github.com/mbostock/d3/blob/master/src/format/requote.js
  var SPECIAL_CHARACTERS_REGEXP = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

  var localeId;
  var formatCodeToRegex;

  this.init = function() {
    localeId = $locale.id;

    this.parsers = {};
    this.formatters = {};

    formatCodeToRegex = [
      {
        key: 'yyyy',
        regex: '\\d{4}',
        apply: function(value) { this.year = +value; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'yyyy');
        }
      },
      {
        key: 'yy',
        regex: '\\d{2}',
        apply: function(value) { value = +value; this.year = value < 69 ? value + 2000 : value + 1900; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'yy');
        }
      },
      {
        key: 'y',
        regex: '\\d{1,4}',
        apply: function(value) { this.year = +value; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'y');
        }
      },
      {
        key: 'M!',
        regex: '0?[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) {
          var value = date.getMonth();
          if (/^[0-9]$/.test(value)) {
            return dateFilter(date, 'MM');
          }

          return dateFilter(date, 'M');
        }
      },
      {
        key: 'MMMM',
        regex: $locale.DATETIME_FORMATS.MONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.MONTH.indexOf(value); },
        formatter: function(date) { return dateFilter(date, 'MMMM'); }
      },
      {
        key: 'MMM',
        regex: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value); },
        formatter: function(date) { return dateFilter(date, 'MMM'); }
      },
      {
        key: 'MM',
        regex: '0[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) { return dateFilter(date, 'MM'); }
      },
      {
        key: 'M',
        regex: '[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) { return dateFilter(date, 'M'); }
      },
      {
        key: 'd!',
        regex: '[0-2]?[0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) {
          var value = date.getDate();
          if (/^[1-9]$/.test(value)) {
            return dateFilter(date, 'dd');
          }

          return dateFilter(date, 'd');
        }
      },
      {
        key: 'dd',
        regex: '[0-2][0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) { return dateFilter(date, 'dd'); }
      },
      {
        key: 'd',
        regex: '[1-2]?[0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) { return dateFilter(date, 'd'); }
      },
      {
        key: 'EEEE',
        regex: $locale.DATETIME_FORMATS.DAY.join('|'),
        formatter: function(date) { return dateFilter(date, 'EEEE'); }
      },
      {
        key: 'EEE',
        regex: $locale.DATETIME_FORMATS.SHORTDAY.join('|'),
        formatter: function(date) { return dateFilter(date, 'EEE'); }
      },
      {
        key: 'HH',
        regex: '(?:0|1)[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'HH'); }
      },
      {
        key: 'hh',
        regex: '0[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'hh'); }
      },
      {
        key: 'H',
        regex: '1?[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'H'); }
      },
      {
        key: 'h',
        regex: '[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'h'); }
      },
      {
        key: 'mm',
        regex: '[0-5][0-9]',
        apply: function(value) { this.minutes = +value; },
        formatter: function(date) { return dateFilter(date, 'mm'); }
      },
      {
        key: 'm',
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.minutes = +value; },
        formatter: function(date) { return dateFilter(date, 'm'); }
      },
      {
        key: 'sss',
        regex: '[0-9][0-9][0-9]',
        apply: function(value) { this.milliseconds = +value; },
        formatter: function(date) { return dateFilter(date, 'sss'); }
      },
      {
        key: 'ss',
        regex: '[0-5][0-9]',
        apply: function(value) { this.seconds = +value; },
        formatter: function(date) { return dateFilter(date, 'ss'); }
      },
      {
        key: 's',
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.seconds = +value; },
        formatter: function(date) { return dateFilter(date, 's'); }
      },
      {
        key: 'a',
        regex: $locale.DATETIME_FORMATS.AMPMS.join('|'),
        apply: function(value) {
          if (this.hours === 12) {
            this.hours = 0;
          }

          if (value === 'PM') {
            this.hours += 12;
          }
        },
        formatter: function(date) { return dateFilter(date, 'a'); }
      },
      {
        key: 'Z',
        regex: '[+-]\\d{4}',
        apply: function(value) {
          var matches = value.match(/([+-])(\d{2})(\d{2})/),
            sign = matches[1],
            hours = matches[2],
            minutes = matches[3];
          this.hours += toInt(sign + hours);
          this.minutes += toInt(sign + minutes);
        },
        formatter: function(date) {
          return dateFilter(date, 'Z');
        }
      },
      {
        key: 'ww',
        regex: '[0-4][0-9]|5[0-3]',
        formatter: function(date) { return dateFilter(date, 'ww'); }
      },
      {
        key: 'w',
        regex: '[0-9]|[1-4][0-9]|5[0-3]',
        formatter: function(date) { return dateFilter(date, 'w'); }
      },
      {
        key: 'GGGG',
        regex: $locale.DATETIME_FORMATS.ERANAMES.join('|').replace(/\s/g, '\\s'),
        formatter: function(date) { return dateFilter(date, 'GGGG'); }
      },
      {
        key: 'GGG',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return dateFilter(date, 'GGG'); }
      },
      {
        key: 'GG',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return dateFilter(date, 'GG'); }
      },
      {
        key: 'G',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return dateFilter(date, 'G'); }
      }
    ];

    if (angular.version.major >= 1 && angular.version.minor > 4) {
      formatCodeToRegex.push({
        key: 'LLLL',
        regex: $locale.DATETIME_FORMATS.STANDALONEMONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.STANDALONEMONTH.indexOf(value); },
        formatter: function(date) { return dateFilter(date, 'LLLL'); }
      });
    }
  };

  this.init();

  function getFormatCodeToRegex(key) {
    return filterFilter(formatCodeToRegex, {key: key}, true)[0];
  }

  this.getParser = function (key) {
    var f = getFormatCodeToRegex(key);
    return f && f.apply || null;
  };

  this.overrideParser = function (key, parser) {
    var f = getFormatCodeToRegex(key);
    if (f && angular.isFunction(parser)) {
      this.parsers = {};
      f.apply = parser;
    }
  }.bind(this);

  function createParser(format) {
    var map = [], regex = format.split('');

    // check for literal values
    var quoteIndex = format.indexOf('\'');
    if (quoteIndex > -1) {
      var inLiteral = false;
      format = format.split('');
      for (var i = quoteIndex; i < format.length; i++) {
        if (inLiteral) {
          if (format[i] === '\'') {
            if (i + 1 < format.length && format[i+1] === '\'') { // escaped single quote
              format[i+1] = '$';
              regex[i+1] = '';
            } else { // end of literal
              regex[i] = '';
              inLiteral = false;
            }
          }
          format[i] = '$';
        } else {
          if (format[i] === '\'') { // start of literal
            format[i] = '$';
            regex[i] = '';
            inLiteral = true;
          }
        }
      }

      format = format.join('');
    }

    angular.forEach(formatCodeToRegex, function(data) {
      var index = format.indexOf(data.key);

      if (index > -1) {
        format = format.split('');

        regex[index] = '(' + data.regex + ')';
        format[index] = '$'; // Custom symbol to define consumed part of format
        for (var i = index + 1, n = index + data.key.length; i < n; i++) {
          regex[i] = '';
          format[i] = '$';
        }
        format = format.join('');

        map.push({
          index: index,
          key: data.key,
          apply: data.apply,
          matcher: data.regex
        });
      }
    });

    return {
      regex: new RegExp('^' + regex.join('') + '$'),
      map: orderByFilter(map, 'index')
    };
  }

  function createFormatter(format) {
    var formatters = [];
    var i = 0;
    var formatter, literalIdx;
    while (i < format.length) {
      if (angular.isNumber(literalIdx)) {
        if (format.charAt(i) === '\'') {
          if (i + 1 >= format.length || format.charAt(i + 1) !== '\'') {
            formatters.push(constructLiteralFormatter(format, literalIdx, i));
            literalIdx = null;
          }
        } else if (i === format.length) {
          while (literalIdx < format.length) {
            formatter = constructFormatterFromIdx(format, literalIdx);
            formatters.push(formatter);
            literalIdx = formatter.endIdx;
          }
        }

        i++;
        continue;
      }

      if (format.charAt(i) === '\'') {
        literalIdx = i;
        i++;
        continue;
      }

      formatter = constructFormatterFromIdx(format, i);

      formatters.push(formatter.parser);
      i = formatter.endIdx;
    }

    return formatters;
  }

  function constructLiteralFormatter(format, literalIdx, endIdx) {
    return function() {
      return format.substr(literalIdx + 1, endIdx - literalIdx - 1);
    };
  }

  function constructFormatterFromIdx(format, i) {
    var currentPosStr = format.substr(i);
    for (var j = 0; j < formatCodeToRegex.length; j++) {
      if (new RegExp('^' + formatCodeToRegex[j].key).test(currentPosStr)) {
        var data = formatCodeToRegex[j];
        return {
          endIdx: i + data.key.length,
          parser: data.formatter
        };
      }
    }

    return {
      endIdx: i + 1,
      parser: function() {
        return currentPosStr.charAt(0);
      }
    };
  }

  this.filter = function(date, format) {
    if (!angular.isDate(date) || isNaN(date) || !format) {
      return '';
    }

    format = $locale.DATETIME_FORMATS[format] || format;

    if ($locale.id !== localeId) {
      this.init();
    }

    if (!this.formatters[format]) {
      this.formatters[format] = createFormatter(format);
    }

    var formatters = this.formatters[format];

    return formatters.reduce(function(str, formatter) {
      return str + formatter(date);
    }, '');
  };

  this.parse = function(input, format, baseDate) {
    if (!angular.isString(input) || !format) {
      return input;
    }

    format = $locale.DATETIME_FORMATS[format] || format;
    format = format.replace(SPECIAL_CHARACTERS_REGEXP, '\\$&');

    if ($locale.id !== localeId) {
      this.init();
    }

    if (!this.parsers[format]) {
      this.parsers[format] = createParser(format, 'apply');
    }

    var parser = this.parsers[format],
        regex = parser.regex,
        map = parser.map,
        results = input.match(regex),
        tzOffset = false;
    if (results && results.length) {
      var fields, dt;
      if (angular.isDate(baseDate) && !isNaN(baseDate.getTime())) {
        fields = {
          year: baseDate.getFullYear(),
          month: baseDate.getMonth(),
          date: baseDate.getDate(),
          hours: baseDate.getHours(),
          minutes: baseDate.getMinutes(),
          seconds: baseDate.getSeconds(),
          milliseconds: baseDate.getMilliseconds()
        };
      } else {
        if (baseDate) {
          $log.warn('dateparser:', 'baseDate is not a valid date');
        }
        fields = { year: 1900, month: 0, date: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
      }

      for (var i = 1, n = results.length; i < n; i++) {
        var mapper = map[i - 1];
        if (mapper.matcher === 'Z') {
          tzOffset = true;
        }

        if (mapper.apply) {
          mapper.apply.call(fields, results[i]);
        }
      }

      var datesetter = tzOffset ? Date.prototype.setUTCFullYear :
        Date.prototype.setFullYear;
      var timesetter = tzOffset ? Date.prototype.setUTCHours :
        Date.prototype.setHours;

      if (isValid(fields.year, fields.month, fields.date)) {
        if (angular.isDate(baseDate) && !isNaN(baseDate.getTime()) && !tzOffset) {
          dt = new Date(baseDate);
          datesetter.call(dt, fields.year, fields.month, fields.date);
          timesetter.call(dt, fields.hours, fields.minutes,
            fields.seconds, fields.milliseconds);
        } else {
          dt = new Date(0);
          datesetter.call(dt, fields.year, fields.month, fields.date);
          timesetter.call(dt, fields.hours || 0, fields.minutes || 0,
            fields.seconds || 0, fields.milliseconds || 0);
        }
      }

      return dt;
    }
  };

  // Check if date is valid for specific month (and year for February).
  // Month: 0 = Jan, 1 = Feb, etc
  function isValid(year, month, date) {
    if (date < 1) {
      return false;
    }

    if (month === 1 && date > 28) {
      return date === 29 && (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0);
    }

    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return date < 31;
    }

    return true;
  }

  function toInt(str) {
    return parseInt(str, 10);
  }

  this.toTimezone = toTimezone;
  this.fromTimezone = fromTimezone;
  this.timezoneToOffset = timezoneToOffset;
  this.addDateMinutes = addDateMinutes;
  this.convertTimezoneToLocal = convertTimezoneToLocal;

  function toTimezone(date, timezone) {
    return date && timezone ? convertTimezoneToLocal(date, timezone) : date;
  }

  function fromTimezone(date, timezone) {
    return date && timezone ? convertTimezoneToLocal(date, timezone, true) : date;
  }

  //https://github.com/angular/angular.js/blob/622c42169699ec07fc6daaa19fe6d224e5d2f70e/src/Angular.js#L1207
  function timezoneToOffset(timezone, fallback) {
    timezone = timezone.replace(/:/g, '');
    var requestedTimezoneOffset = Date.parse('Jan 01, 1970 00:00:00 ' + timezone) / 60000;
    return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
  }

  function addDateMinutes(date, minutes) {
    date = new Date(date.getTime());
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  function convertTimezoneToLocal(date, timezone, reverse) {
    reverse = reverse ? -1 : 1;
    var dateTimezoneOffset = date.getTimezoneOffset();
    var timezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
    return addDateMinutes(date, reverse * (timezoneOffset - dateTimezoneOffset));
  }
}]);

// Avoiding use of ng-class as it creates a lot of watchers when a class is to be applied to
// at most one element.
angular.module('ui.bootstrap.isClass', [])
.directive('uibIsClass', [
         '$animate',
function ($animate) {
  //                    11111111          22222222
  var ON_REGEXP = /^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/;
  //                    11111111           22222222
  var IS_REGEXP = /^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;

  var dataPerTracked = {};

  return {
    restrict: 'A',
    compile: function(tElement, tAttrs) {
      var linkedScopes = [];
      var instances = [];
      var expToData = {};
      var lastActivated = null;
      var onExpMatches = tAttrs.uibIsClass.match(ON_REGEXP);
      var onExp = onExpMatches[2];
      var expsStr = onExpMatches[1];
      var exps = expsStr.split(',');

      return linkFn;

      function linkFn(scope, element, attrs) {
        linkedScopes.push(scope);
        instances.push({
          scope: scope,
          element: element
        });

        exps.forEach(function(exp, k) {
          addForExp(exp, scope);
        });

        scope.$on('$destroy', removeScope);
      }

      function addForExp(exp, scope) {
        var matches = exp.match(IS_REGEXP);
        var clazz = scope.$eval(matches[1]);
        var compareWithExp = matches[2];
        var data = expToData[exp];
        if (!data) {
          var watchFn = function(compareWithVal) {
            var newActivated = null;
            instances.some(function(instance) {
              var thisVal = instance.scope.$eval(onExp);
              if (thisVal === compareWithVal) {
                newActivated = instance;
                return true;
              }
            });
            if (data.lastActivated !== newActivated) {
              if (data.lastActivated) {
                $animate.removeClass(data.lastActivated.element, clazz);
              }
              if (newActivated) {
                $animate.addClass(newActivated.element, clazz);
              }
              data.lastActivated = newActivated;
            }
          };
          expToData[exp] = data = {
            lastActivated: null,
            scope: scope,
            watchFn: watchFn,
            compareWithExp: compareWithExp,
            watcher: scope.$watch(compareWithExp, watchFn)
          };
        }
        data.watchFn(scope.$eval(compareWithExp));
      }

      function removeScope(e) {
        var removedScope = e.targetScope;
        var index = linkedScopes.indexOf(removedScope);
        linkedScopes.splice(index, 1);
        instances.splice(index, 1);
        if (linkedScopes.length) {
          var newWatchScope = linkedScopes[0];
          angular.forEach(expToData, function(data) {
            if (data.scope === removedScope) {
              data.watcher = newWatchScope.$watch(data.compareWithExp, data.watchFn);
              data.scope = newWatchScope;
            }
          });
        } else {
          expToData = {};
        }
      }
    }
  };
}]);
angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.dateparser', 'ui.bootstrap.isClass'])

.value('$datepickerSuppressError', false)

.value('$datepickerLiteralWarning', true)

.constant('uibDatepickerConfig', {
  datepickerMode: 'day',
  formatDay: 'dd',
  formatMonth: 'MMMM',
  formatYear: 'yyyy',
  formatDayHeader: 'EEE',
  formatDayTitle: 'MMMM yyyy',
  formatMonthTitle: 'yyyy',
  maxDate: null,
  maxMode: 'year',
  minDate: null,
  minMode: 'day',
  monthColumns: 3,
  ngModelOptions: {},
  shortcutPropagation: false,
  showWeeks: true,
  yearColumns: 5,
  yearRows: 4
})

.controller('UibDatepickerController', ['$scope', '$element', '$attrs', '$parse', '$interpolate', '$locale', '$log', 'dateFilter', 'uibDatepickerConfig', '$datepickerLiteralWarning', '$datepickerSuppressError', 'uibDateParser',
  function($scope, $element, $attrs, $parse, $interpolate, $locale, $log, dateFilter, datepickerConfig, $datepickerLiteralWarning, $datepickerSuppressError, dateParser) {
  var self = this,
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl;
      ngModelOptions = {},
      watchListeners = [];

  $element.addClass('uib-datepicker');
  $attrs.$set('role', 'application');

  if (!$scope.datepickerOptions) {
    $scope.datepickerOptions = {};
  }

  // Modes chain
  this.modes = ['day', 'month', 'year'];

  [
    'customClass',
    'dateDisabled',
    'datepickerMode',
    'formatDay',
    'formatDayHeader',
    'formatDayTitle',
    'formatMonth',
    'formatMonthTitle',
    'formatYear',
    'maxDate',
    'maxMode',
    'minDate',
    'minMode',
    'monthColumns',
    'showWeeks',
    'shortcutPropagation',
    'startingDay',
    'yearColumns',
    'yearRows'
  ].forEach(function(key) {
    switch (key) {
      case 'customClass':
      case 'dateDisabled':
        $scope[key] = $scope.datepickerOptions[key] || angular.noop;
        break;
      case 'datepickerMode':
        $scope.datepickerMode = angular.isDefined($scope.datepickerOptions.datepickerMode) ?
          $scope.datepickerOptions.datepickerMode : datepickerConfig.datepickerMode;
        break;
      case 'formatDay':
      case 'formatDayHeader':
      case 'formatDayTitle':
      case 'formatMonth':
      case 'formatMonthTitle':
      case 'formatYear':
        self[key] = angular.isDefined($scope.datepickerOptions[key]) ?
          $interpolate($scope.datepickerOptions[key])($scope.$parent) :
          datepickerConfig[key];
        break;
      case 'monthColumns':
      case 'showWeeks':
      case 'shortcutPropagation':
      case 'yearColumns':
      case 'yearRows':
        self[key] = angular.isDefined($scope.datepickerOptions[key]) ?
          $scope.datepickerOptions[key] : datepickerConfig[key];
        break;
      case 'startingDay':
        if (angular.isDefined($scope.datepickerOptions.startingDay)) {
          self.startingDay = $scope.datepickerOptions.startingDay;
        } else if (angular.isNumber(datepickerConfig.startingDay)) {
          self.startingDay = datepickerConfig.startingDay;
        } else {
          self.startingDay = ($locale.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7;
        }

        break;
      case 'maxDate':
      case 'minDate':
        $scope.$watch('datepickerOptions.' + key, function(value) {
          if (value) {
            if (angular.isDate(value)) {
              self[key] = dateParser.fromTimezone(new Date(value), ngModelOptions.getOption('timezone'));
            } else {
              if ($datepickerLiteralWarning) {
                $log.warn('Literal date support has been deprecated, please switch to date object usage');
              }

              self[key] = new Date(dateFilter(value, 'medium'));
            }
          } else {
            self[key] = datepickerConfig[key] ?
              dateParser.fromTimezone(new Date(datepickerConfig[key]), ngModelOptions.getOption('timezone')) :
              null;
          }

          self.refreshView();
        });

        break;
      case 'maxMode':
      case 'minMode':
        if ($scope.datepickerOptions[key]) {
          $scope.$watch(function() { return $scope.datepickerOptions[key]; }, function(value) {
            self[key] = $scope[key] = angular.isDefined(value) ? value : $scope.datepickerOptions[key];
            if (key === 'minMode' && self.modes.indexOf($scope.datepickerOptions.datepickerMode) < self.modes.indexOf(self[key]) ||
              key === 'maxMode' && self.modes.indexOf($scope.datepickerOptions.datepickerMode) > self.modes.indexOf(self[key])) {
              $scope.datepickerMode = self[key];
              $scope.datepickerOptions.datepickerMode = self[key];
            }
          });
        } else {
          self[key] = $scope[key] = datepickerConfig[key] || null;
        }

        break;
    }
  });

  $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);

  $scope.disabled = angular.isDefined($attrs.disabled) || false;
  if (angular.isDefined($attrs.ngDisabled)) {
    watchListeners.push($scope.$parent.$watch($attrs.ngDisabled, function(disabled) {
      $scope.disabled = disabled;
      self.refreshView();
    }));
  }

  $scope.isActive = function(dateObject) {
    if (self.compare(dateObject.date, self.activeDate) === 0) {
      $scope.activeDateId = dateObject.uid;
      return true;
    }
    return false;
  };

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;
    ngModelOptions = extractOptions(ngModelCtrl);

    if ($scope.datepickerOptions.initDate) {
      self.activeDate = dateParser.fromTimezone($scope.datepickerOptions.initDate, ngModelOptions.getOption('timezone')) || new Date();
      $scope.$watch('datepickerOptions.initDate', function(initDate) {
        if (initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) || ngModelCtrl.$invalid)) {
          self.activeDate = dateParser.fromTimezone(initDate, ngModelOptions.getOption('timezone'));
          self.refreshView();
        }
      });
    } else {
      self.activeDate = new Date();
    }

    var date = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date();
    this.activeDate = !isNaN(date) ?
      dateParser.fromTimezone(date, ngModelOptions.getOption('timezone')) :
      dateParser.fromTimezone(new Date(), ngModelOptions.getOption('timezone'));

    ngModelCtrl.$render = function() {
      self.render();
    };
  };

  this.render = function() {
    if (ngModelCtrl.$viewValue) {
      var date = new Date(ngModelCtrl.$viewValue),
          isValid = !isNaN(date);

      if (isValid) {
        this.activeDate = dateParser.fromTimezone(date, ngModelOptions.getOption('timezone'));
      } else if (!$datepickerSuppressError) {
        $log.error('Datepicker directive: "ng-model" value must be a Date object');
      }
    }
    this.refreshView();
  };

  this.refreshView = function() {
    if (this.element) {
      $scope.selectedDt = null;
      this._refreshView();
      if ($scope.activeDt) {
        $scope.activeDateId = $scope.activeDt.uid;
      }

      var date = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
      date = dateParser.fromTimezone(date, ngModelOptions.getOption('timezone'));
      ngModelCtrl.$setValidity('dateDisabled', !date ||
        this.element && !this.isDisabled(date));
    }
  };

  this.createDateObject = function(date, format) {
    var model = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
    model = dateParser.fromTimezone(model, ngModelOptions.getOption('timezone'));
    var today = new Date();
    today = dateParser.fromTimezone(today, ngModelOptions.getOption('timezone'));
    var time = this.compare(date, today);
    var dt = {
      date: date,
      label: dateParser.filter(date, format),
      selected: model && this.compare(date, model) === 0,
      disabled: this.isDisabled(date),
      past: time < 0,
      current: time === 0,
      future: time > 0,
      customClass: this.customClass(date) || null
    };

    if (model && this.compare(date, model) === 0) {
      $scope.selectedDt = dt;
    }

    if (self.activeDate && this.compare(dt.date, self.activeDate) === 0) {
      $scope.activeDt = dt;
    }

    return dt;
  };

  this.isDisabled = function(date) {
    return $scope.disabled ||
      this.minDate && this.compare(date, this.minDate) < 0 ||
      this.maxDate && this.compare(date, this.maxDate) > 0 ||
      $scope.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode});
  };

  this.customClass = function(date) {
    return $scope.customClass({date: date, mode: $scope.datepickerMode});
  };

  // Split array into smaller arrays
  this.split = function(arr, size) {
    var arrays = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  };

  $scope.select = function(date) {
    if ($scope.datepickerMode === self.minMode) {
      var dt = ngModelCtrl.$viewValue ? dateParser.fromTimezone(new Date(ngModelCtrl.$viewValue), ngModelOptions.getOption('timezone')) : new Date(0, 0, 0, 0, 0, 0, 0);
      dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      dt = dateParser.toTimezone(dt, ngModelOptions.getOption('timezone'));
      ngModelCtrl.$setViewValue(dt);
      ngModelCtrl.$render();
    } else {
      self.activeDate = date;
      setMode(self.modes[self.modes.indexOf($scope.datepickerMode) - 1]);

      $scope.$emit('uib:datepicker.mode');
    }

    $scope.$broadcast('uib:datepicker.focus');
  };

  $scope.move = function(direction) {
    var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),
        month = self.activeDate.getMonth() + direction * (self.step.months || 0);
    self.activeDate.setFullYear(year, month, 1);
    self.refreshView();
  };

  $scope.toggleMode = function(direction) {
    direction = direction || 1;

    if ($scope.datepickerMode === self.maxMode && direction === 1 ||
      $scope.datepickerMode === self.minMode && direction === -1) {
      return;
    }

    setMode(self.modes[self.modes.indexOf($scope.datepickerMode) + direction]);

    $scope.$emit('uib:datepicker.mode');
  };

  // Key event mapper
  $scope.keys = { 13: 'enter', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home', 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

  var focusElement = function() {
    self.element[0].focus();
  };

  // Listen for focus requests from popup directive
  $scope.$on('uib:datepicker.focus', focusElement);

  $scope.keydown = function(evt) {
    var key = $scope.keys[evt.which];

    if (!key || evt.shiftKey || evt.altKey || $scope.disabled) {
      return;
    }

    evt.preventDefault();
    if (!self.shortcutPropagation) {
      evt.stopPropagation();
    }

    if (key === 'enter' || key === 'space') {
      if (self.isDisabled(self.activeDate)) {
        return; // do nothing
      }
      $scope.select(self.activeDate);
    } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
      $scope.toggleMode(key === 'up' ? 1 : -1);
    } else {
      self.handleKeyDown(key, evt);
      self.refreshView();
    }
  };

  $element.on('keydown', function(evt) {
    $scope.$apply(function() {
      $scope.keydown(evt);
    });
  });

  $scope.$on('$destroy', function() {
    //Clear all watch listeners on destroy
    while (watchListeners.length) {
      watchListeners.shift()();
    }
  });

  function setMode(mode) {
    $scope.datepickerMode = mode;
    $scope.datepickerOptions.datepickerMode = mode;
  }

  function extractOptions(ngModelCtrl) {
    var ngModelOptions;

    if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
      // guarantee a value
      ngModelOptions = ngModelCtrl.$options ||
        $scope.datepickerOptions.ngModelOptions ||
        datepickerConfig.ngModelOptions ||
        {};

      // mimic 1.6+ api
      ngModelOptions.getOption = function (key) {
        return ngModelOptions[key];
      };
    } else { // in angular >=1.6 $options is always present
      // ng-model-options defaults timezone to null; don't let its precedence squash a non-null value
      var timezone = ngModelCtrl.$options.getOption('timezone') ||
        ($scope.datepickerOptions.ngModelOptions ? $scope.datepickerOptions.ngModelOptions.timezone : null) ||
        (datepickerConfig.ngModelOptions ? datepickerConfig.ngModelOptions.timezone : null);

      // values passed to createChild override existing values
      ngModelOptions = ngModelCtrl.$options // start with a ModelOptions instance
        .createChild(datepickerConfig.ngModelOptions) // lowest precedence
        .createChild($scope.datepickerOptions.ngModelOptions)
        .createChild(ngModelCtrl.$options) // highest precedence
        .createChild({timezone: timezone}); // to keep from squashing a non-null value
    }

    return ngModelOptions;
  }
}])

.controller('UibDaypickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  this.step = { months: 1 };
  this.element = $element;
  function getDaysInMonth(year, month) {
    return month === 1 && year % 4 === 0 &&
      (year % 100 !== 0 || year % 400 === 0) ? 29 : DAYS_IN_MONTH[month];
  }

  this.init = function(ctrl) {
    angular.extend(ctrl, this);
    scope.showWeeks = ctrl.showWeeks;
    ctrl.refreshView();
  };

  this.getDates = function(startDate, n) {
    var dates = new Array(n), current = new Date(startDate), i = 0, date;
    while (i < n) {
      date = new Date(current);
      dates[i++] = date;
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  this._refreshView = function() {
    var year = this.activeDate.getFullYear(),
      month = this.activeDate.getMonth(),
      firstDayOfMonth = new Date(this.activeDate);

    firstDayOfMonth.setFullYear(year, month, 1);

    var difference = this.startingDay - firstDayOfMonth.getDay(),
      numDisplayedFromPreviousMonth = difference > 0 ?
        7 - difference : - difference,
      firstDate = new Date(firstDayOfMonth);

    if (numDisplayedFromPreviousMonth > 0) {
      firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
    }

    // 42 is the number of days on a six-week calendar
    var days = this.getDates(firstDate, 42);
    for (var i = 0; i < 42; i ++) {
      days[i] = angular.extend(this.createDateObject(days[i], this.formatDay), {
        secondary: days[i].getMonth() !== month,
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.labels = new Array(7);
    for (var j = 0; j < 7; j++) {
      scope.labels[j] = {
        abbr: dateFilter(days[j].date, this.formatDayHeader),
        full: dateFilter(days[j].date, 'EEEE')
      };
    }

    scope.title = dateFilter(this.activeDate, this.formatDayTitle);
    scope.rows = this.split(days, 7);

    if (scope.showWeeks) {
      scope.weekNumbers = [];
      var thursdayIndex = (4 + 7 - this.startingDay) % 7,
          numWeeks = scope.rows.length;
      for (var curWeek = 0; curWeek < numWeeks; curWeek++) {
        scope.weekNumbers.push(
          getISO8601WeekNumber(scope.rows[curWeek][thursdayIndex].date));
      }
    }
  };

  this.compare = function(date1, date2) {
    var _date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var _date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    _date1.setFullYear(date1.getFullYear());
    _date2.setFullYear(date2.getFullYear());
    return _date1 - _date2;
  };

  function getISO8601WeekNumber(date) {
    var checkDate = new Date(date);
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
    var time = checkDate.getTime();
    checkDate.setMonth(0); // Compare with Jan 1
    checkDate.setDate(1);
    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
  }

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getDate();

    if (key === 'left') {
      date = date - 1;
    } else if (key === 'up') {
      date = date - 7;
    } else if (key === 'right') {
      date = date + 1;
    } else if (key === 'down') {
      date = date + 7;
    } else if (key === 'pageup' || key === 'pagedown') {
      var month = this.activeDate.getMonth() + (key === 'pageup' ? - 1 : 1);
      this.activeDate.setMonth(month, 1);
      date = Math.min(getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth()), date);
    } else if (key === 'home') {
      date = 1;
    } else if (key === 'end') {
      date = getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
    }
    this.activeDate.setDate(date);
  };
}])

.controller('UibMonthpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  this.step = { years: 1 };
  this.element = $element;

  this.init = function(ctrl) {
    angular.extend(ctrl, this);
    ctrl.refreshView();
  };

  this._refreshView = function() {
    var months = new Array(12),
        year = this.activeDate.getFullYear(),
        date;

    for (var i = 0; i < 12; i++) {
      date = new Date(this.activeDate);
      date.setFullYear(year, i, 1);
      months[i] = angular.extend(this.createDateObject(date, this.formatMonth), {
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.title = dateFilter(this.activeDate, this.formatMonthTitle);
    scope.rows = this.split(months, this.monthColumns);
    scope.yearHeaderColspan = this.monthColumns > 3 ? this.monthColumns - 2 : 1;
  };

  this.compare = function(date1, date2) {
    var _date1 = new Date(date1.getFullYear(), date1.getMonth());
    var _date2 = new Date(date2.getFullYear(), date2.getMonth());
    _date1.setFullYear(date1.getFullYear());
    _date2.setFullYear(date2.getFullYear());
    return _date1 - _date2;
  };

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getMonth();

    if (key === 'left') {
      date = date - 1;
    } else if (key === 'up') {
      date = date - this.monthColumns;
    } else if (key === 'right') {
      date = date + 1;
    } else if (key === 'down') {
      date = date + this.monthColumns;
    } else if (key === 'pageup' || key === 'pagedown') {
      var year = this.activeDate.getFullYear() + (key === 'pageup' ? - 1 : 1);
      this.activeDate.setFullYear(year);
    } else if (key === 'home') {
      date = 0;
    } else if (key === 'end') {
      date = 11;
    }
    this.activeDate.setMonth(date);
  };
}])

.controller('UibYearpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  var columns, range;
  this.element = $element;

  function getStartingYear(year) {
    return parseInt((year - 1) / range, 10) * range + 1;
  }

  this.yearpickerInit = function() {
    columns = this.yearColumns;
    range = this.yearRows * columns;
    this.step = { years: range };
  };

  this._refreshView = function() {
    var years = new Array(range), date;

    for (var i = 0, start = getStartingYear(this.activeDate.getFullYear()); i < range; i++) {
      date = new Date(this.activeDate);
      date.setFullYear(start + i, 0, 1);
      years[i] = angular.extend(this.createDateObject(date, this.formatYear), {
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.title = [years[0].label, years[range - 1].label].join(' - ');
    scope.rows = this.split(years, columns);
    scope.columns = columns;
  };

  this.compare = function(date1, date2) {
    return date1.getFullYear() - date2.getFullYear();
  };

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getFullYear();

    if (key === 'left') {
      date = date - 1;
    } else if (key === 'up') {
      date = date - columns;
    } else if (key === 'right') {
      date = date + 1;
    } else if (key === 'down') {
      date = date + columns;
    } else if (key === 'pageup' || key === 'pagedown') {
      date += (key === 'pageup' ? - 1 : 1) * range;
    } else if (key === 'home') {
      date = getStartingYear(this.activeDate.getFullYear());
    } else if (key === 'end') {
      date = getStartingYear(this.activeDate.getFullYear()) + range - 1;
    }
    this.activeDate.setFullYear(date);
  };
}])

.directive('uibDatepicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/datepicker.html';
    },
    scope: {
      datepickerOptions: '=?'
    },
    require: ['uibDatepicker', '^ngModel'],
    restrict: 'A',
    controller: 'UibDatepickerController',
    controllerAs: 'datepicker',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      datepickerCtrl.init(ngModelCtrl);
    }
  };
})

.directive('uibDaypicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/day.html';
    },
    require: ['^uibDatepicker', 'uibDaypicker'],
    restrict: 'A',
    controller: 'UibDaypickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0],
        daypickerCtrl = ctrls[1];

      daypickerCtrl.init(datepickerCtrl);
    }
  };
})

.directive('uibMonthpicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/month.html';
    },
    require: ['^uibDatepicker', 'uibMonthpicker'],
    restrict: 'A',
    controller: 'UibMonthpickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0],
        monthpickerCtrl = ctrls[1];

      monthpickerCtrl.init(datepickerCtrl);
    }
  };
})

.directive('uibYearpicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/year.html';
    },
    require: ['^uibDatepicker', 'uibYearpicker'],
    restrict: 'A',
    controller: 'UibYearpickerController',
    link: function(scope, element, attrs, ctrls) {
      var ctrl = ctrls[0];
      angular.extend(ctrl, ctrls[1]);
      ctrl.yearpickerInit();

      ctrl.refreshView();
    }
  };
});

angular.module('ui.bootstrap.position', [])

  /**
   * A set of utility methods for working with the DOM.
   * It is meant to be used where we need to absolute-position elements in
   * relation to another element (this is the case for tooltips, popovers,
   * typeahead suggestions etc.).
   */
  .factory('$uibPosition', ['$document', '$window', function($document, $window) {
    /**
     * Used by scrollbarWidth() function to cache scrollbar's width.
     * Do not access this variable directly, use scrollbarWidth() instead.
     */
    var SCROLLBAR_WIDTH;
    /**
     * scrollbar on body and html element in IE and Edge overlay
     * content and should be considered 0 width.
     */
    var BODY_SCROLLBAR_WIDTH;
    var OVERFLOW_REGEX = {
      normal: /(auto|scroll)/,
      hidden: /(auto|scroll|hidden)/
    };
    var PLACEMENT_REGEX = {
      auto: /\s?auto?\s?/i,
      primary: /^(top|bottom|left|right)$/,
      secondary: /^(top|bottom|left|right|center)$/,
      vertical: /^(top|bottom)$/
    };
    var BODY_REGEX = /(HTML|BODY)/;

    return {

      /**
       * Provides a raw DOM element from a jQuery/jQLite element.
       *
       * @param {element} elem - The element to convert.
       *
       * @returns {element} A HTML element.
       */
      getRawNode: function(elem) {
        return elem.nodeName ? elem : elem[0] || elem;
      },

      /**
       * Provides a parsed number for a style property.  Strips
       * units and casts invalid numbers to 0.
       *
       * @param {string} value - The style value to parse.
       *
       * @returns {number} A valid number.
       */
      parseStyle: function(value) {
        value = parseFloat(value);
        return isFinite(value) ? value : 0;
      },

      /**
       * Provides the closest positioned ancestor.
       *
       * @param {element} element - The element to get the offest parent for.
       *
       * @returns {element} The closest positioned ancestor.
       */
      offsetParent: function(elem) {
        elem = this.getRawNode(elem);

        var offsetParent = elem.offsetParent || $document[0].documentElement;

        function isStaticPositioned(el) {
          return ($window.getComputedStyle(el).position || 'static') === 'static';
        }

        while (offsetParent && offsetParent !== $document[0].documentElement && isStaticPositioned(offsetParent)) {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || $document[0].documentElement;
      },

      /**
       * Provides the scrollbar width, concept from TWBS measureScrollbar()
       * function in https://github.com/twbs/bootstrap/blob/master/js/modal.js
       * In IE and Edge, scollbar on body and html element overlay and should
       * return a width of 0.
       *
       * @returns {number} The width of the browser scollbar.
       */
      scrollbarWidth: function(isBody) {
        if (isBody) {
          if (angular.isUndefined(BODY_SCROLLBAR_WIDTH)) {
            var bodyElem = $document.find('body');
            bodyElem.addClass('uib-position-body-scrollbar-measure');
            BODY_SCROLLBAR_WIDTH = $window.innerWidth - bodyElem[0].clientWidth;
            BODY_SCROLLBAR_WIDTH = isFinite(BODY_SCROLLBAR_WIDTH) ? BODY_SCROLLBAR_WIDTH : 0;
            bodyElem.removeClass('uib-position-body-scrollbar-measure');
          }
          return BODY_SCROLLBAR_WIDTH;
        }

        if (angular.isUndefined(SCROLLBAR_WIDTH)) {
          var scrollElem = angular.element('<div class="uib-position-scrollbar-measure"></div>');
          $document.find('body').append(scrollElem);
          SCROLLBAR_WIDTH = scrollElem[0].offsetWidth - scrollElem[0].clientWidth;
          SCROLLBAR_WIDTH = isFinite(SCROLLBAR_WIDTH) ? SCROLLBAR_WIDTH : 0;
          scrollElem.remove();
        }

        return SCROLLBAR_WIDTH;
      },

      /**
       * Provides the padding required on an element to replace the scrollbar.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**scrollbarWidth**: the width of the scrollbar</li>
       *     <li>**widthOverflow**: whether the the width is overflowing</li>
       *     <li>**right**: the amount of right padding on the element needed to replace the scrollbar</li>
       *     <li>**rightOriginal**: the amount of right padding currently on the element</li>
       *     <li>**heightOverflow**: whether the the height is overflowing</li>
       *     <li>**bottom**: the amount of bottom padding on the element needed to replace the scrollbar</li>
       *     <li>**bottomOriginal**: the amount of bottom padding currently on the element</li>
       *   </ul>
       */
      scrollbarPadding: function(elem) {
        elem = this.getRawNode(elem);

        var elemStyle = $window.getComputedStyle(elem);
        var paddingRight = this.parseStyle(elemStyle.paddingRight);
        var paddingBottom = this.parseStyle(elemStyle.paddingBottom);
        var scrollParent = this.scrollParent(elem, false, true);
        var scrollbarWidth = this.scrollbarWidth(BODY_REGEX.test(scrollParent.tagName));

        return {
          scrollbarWidth: scrollbarWidth,
          widthOverflow: scrollParent.scrollWidth > scrollParent.clientWidth,
          right: paddingRight + scrollbarWidth,
          originalRight: paddingRight,
          heightOverflow: scrollParent.scrollHeight > scrollParent.clientHeight,
          bottom: paddingBottom + scrollbarWidth,
          originalBottom: paddingBottom
        };
      },

      /**
       * Checks to see if the element is scrollable.
       *
       * @param {element} elem - The element to check.
       * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
       *   default is false.
       *
       * @returns {boolean} Whether the element is scrollable.
       */
      isScrollable: function(elem, includeHidden) {
        elem = this.getRawNode(elem);

        var overflowRegex = includeHidden ? OVERFLOW_REGEX.hidden : OVERFLOW_REGEX.normal;
        var elemStyle = $window.getComputedStyle(elem);
        return overflowRegex.test(elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX);
      },

      /**
       * Provides the closest scrollable ancestor.
       * A port of the jQuery UI scrollParent method:
       * https://github.com/jquery/jquery-ui/blob/master/ui/scroll-parent.js
       *
       * @param {element} elem - The element to find the scroll parent of.
       * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
       *   default is false.
       * @param {boolean=} [includeSelf=false] - Should the element being passed be
       * included in the scrollable llokup.
       *
       * @returns {element} A HTML element.
       */
      scrollParent: function(elem, includeHidden, includeSelf) {
        elem = this.getRawNode(elem);

        var overflowRegex = includeHidden ? OVERFLOW_REGEX.hidden : OVERFLOW_REGEX.normal;
        var documentEl = $document[0].documentElement;
        var elemStyle = $window.getComputedStyle(elem);
        if (includeSelf && overflowRegex.test(elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX)) {
          return elem;
        }
        var excludeStatic = elemStyle.position === 'absolute';
        var scrollParent = elem.parentElement || documentEl;

        if (scrollParent === documentEl || elemStyle.position === 'fixed') {
          return documentEl;
        }

        while (scrollParent.parentElement && scrollParent !== documentEl) {
          var spStyle = $window.getComputedStyle(scrollParent);
          if (excludeStatic && spStyle.position !== 'static') {
            excludeStatic = false;
          }

          if (!excludeStatic && overflowRegex.test(spStyle.overflow + spStyle.overflowY + spStyle.overflowX)) {
            break;
          }
          scrollParent = scrollParent.parentElement;
        }

        return scrollParent;
      },

      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/ - distance to closest positioned
       * ancestor.  Does not account for margins by default like jQuery position.
       *
       * @param {element} elem - The element to caclulate the position on.
       * @param {boolean=} [includeMargins=false] - Should margins be accounted
       * for, default is false.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**width**: the width of the element</li>
       *     <li>**height**: the height of the element</li>
       *     <li>**top**: distance to top edge of offset parent</li>
       *     <li>**left**: distance to left edge of offset parent</li>
       *   </ul>
       */
      position: function(elem, includeMagins) {
        elem = this.getRawNode(elem);

        var elemOffset = this.offset(elem);
        if (includeMagins) {
          var elemStyle = $window.getComputedStyle(elem);
          elemOffset.top -= this.parseStyle(elemStyle.marginTop);
          elemOffset.left -= this.parseStyle(elemStyle.marginLeft);
        }
        var parent = this.offsetParent(elem);
        var parentOffset = {top: 0, left: 0};

        if (parent !== $document[0].documentElement) {
          parentOffset = this.offset(parent);
          parentOffset.top += parent.clientTop - parent.scrollTop;
          parentOffset.left += parent.clientLeft - parent.scrollLeft;
        }

        return {
          width: Math.round(angular.isNumber(elemOffset.width) ? elemOffset.width : elem.offsetWidth),
          height: Math.round(angular.isNumber(elemOffset.height) ? elemOffset.height : elem.offsetHeight),
          top: Math.round(elemOffset.top - parentOffset.top),
          left: Math.round(elemOffset.left - parentOffset.left)
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/ - distance to viewport.  Does
       * not account for borders, margins, or padding on the body
       * element.
       *
       * @param {element} elem - The element to calculate the offset on.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**width**: the width of the element</li>
       *     <li>**height**: the height of the element</li>
       *     <li>**top**: distance to top edge of viewport</li>
       *     <li>**right**: distance to bottom edge of viewport</li>
       *   </ul>
       */
      offset: function(elem, includeMargins) {
        elem = this.getRawNode(elem);

        var elemBCR = elem.getBoundingClientRect();
        var offset = {
          width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : elem.offsetWidth),
          height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : elem.offsetHeight),
          top: Math.round(elemBCR.top + ($window.pageYOffset || $document[0].documentElement.scrollTop)),
          left: Math.round(elemBCR.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft))
        };

        if (includeMargins) {
          var styles = window.getComputedStyle(elem);
          var verticalMargin = this.parseStyle(styles.marginTop) + this.parseStyle(styles.marginBottom);
          var horisontalMargin = this.parseStyle(styles.marginLeft) + this.parseStyle(styles.marginRight);

          offset.height += verticalMargin;
          offset.width += horisontalMargin;
        }

        return offset;
      },

      /**
       * Provides offset distance to the closest scrollable ancestor
       * or viewport.  Accounts for border and scrollbar width.
       *
       * Right and bottom dimensions represent the distance to the
       * respective edge of the viewport element.  If the element
       * edge extends beyond the viewport, a negative value will be
       * reported.
       *
       * @param {element} elem - The element to get the viewport offset for.
       * @param {boolean=} [useDocument=false] - Should the viewport be the document element instead
       * of the first scrollable element, default is false.
       * @param {boolean=} [includePadding=true] - Should the padding on the offset parent element
       * be accounted for, default is true.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**top**: distance to the top content edge of viewport element</li>
       *     <li>**bottom**: distance to the bottom content edge of viewport element</li>
       *     <li>**left**: distance to the left content edge of viewport element</li>
       *     <li>**right**: distance to the right content edge of viewport element</li>
       *   </ul>
       */
      viewportOffset: function(elem, useDocument, includePadding) {
        elem = this.getRawNode(elem);
        includePadding = includePadding !== false ? true : false;

        var elemBCR = elem.getBoundingClientRect();
        var offsetBCR = {top: 0, left: 0, bottom: 0, right: 0};

        var offsetParent = useDocument ? $document[0].documentElement : this.scrollParent(elem);
        var offsetParentBCR = offsetParent.getBoundingClientRect();

        offsetBCR.top = offsetParentBCR.top + offsetParent.clientTop;
        offsetBCR.left = offsetParentBCR.left + offsetParent.clientLeft;
        if (offsetParent === $document[0].documentElement) {
          offsetBCR.top += $window.pageYOffset;
          offsetBCR.left += $window.pageXOffset;
        }
        offsetBCR.bottom = offsetBCR.top + offsetParent.clientHeight;
        offsetBCR.right = offsetBCR.left + offsetParent.clientWidth;

        if (includePadding) {
          var offsetParentStyle = $window.getComputedStyle(offsetParent);
          offsetBCR.top += this.parseStyle(offsetParentStyle.paddingTop);
          offsetBCR.bottom -= this.parseStyle(offsetParentStyle.paddingBottom);
          offsetBCR.left += this.parseStyle(offsetParentStyle.paddingLeft);
          offsetBCR.right -= this.parseStyle(offsetParentStyle.paddingRight);
        }

        return {
          top: Math.round(elemBCR.top - offsetBCR.top),
          bottom: Math.round(offsetBCR.bottom - elemBCR.bottom),
          left: Math.round(elemBCR.left - offsetBCR.left),
          right: Math.round(offsetBCR.right - elemBCR.right)
        };
      },

      /**
       * Provides an array of placement values parsed from a placement string.
       * Along with the 'auto' indicator, supported placement strings are:
       *   <ul>
       *     <li>top: element on top, horizontally centered on host element.</li>
       *     <li>top-left: element on top, left edge aligned with host element left edge.</li>
       *     <li>top-right: element on top, lerightft edge aligned with host element right edge.</li>
       *     <li>bottom: element on bottom, horizontally centered on host element.</li>
       *     <li>bottom-left: element on bottom, left edge aligned with host element left edge.</li>
       *     <li>bottom-right: element on bottom, right edge aligned with host element right edge.</li>
       *     <li>left: element on left, vertically centered on host element.</li>
       *     <li>left-top: element on left, top edge aligned with host element top edge.</li>
       *     <li>left-bottom: element on left, bottom edge aligned with host element bottom edge.</li>
       *     <li>right: element on right, vertically centered on host element.</li>
       *     <li>right-top: element on right, top edge aligned with host element top edge.</li>
       *     <li>right-bottom: element on right, bottom edge aligned with host element bottom edge.</li>
       *   </ul>
       * A placement string with an 'auto' indicator is expected to be
       * space separated from the placement, i.e: 'auto bottom-left'  If
       * the primary and secondary placement values do not match 'top,
       * bottom, left, right' then 'top' will be the primary placement and
       * 'center' will be the secondary placement.  If 'auto' is passed, true
       * will be returned as the 3rd value of the array.
       *
       * @param {string} placement - The placement string to parse.
       *
       * @returns {array} An array with the following values
       * <ul>
       *   <li>**[0]**: The primary placement.</li>
       *   <li>**[1]**: The secondary placement.</li>
       *   <li>**[2]**: If auto is passed: true, else undefined.</li>
       * </ul>
       */
      parsePlacement: function(placement) {
        var autoPlace = PLACEMENT_REGEX.auto.test(placement);
        if (autoPlace) {
          placement = placement.replace(PLACEMENT_REGEX.auto, '');
        }

        placement = placement.split('-');

        placement[0] = placement[0] || 'top';
        if (!PLACEMENT_REGEX.primary.test(placement[0])) {
          placement[0] = 'top';
        }

        placement[1] = placement[1] || 'center';
        if (!PLACEMENT_REGEX.secondary.test(placement[1])) {
          placement[1] = 'center';
        }

        if (autoPlace) {
          placement[2] = true;
        } else {
          placement[2] = false;
        }

        return placement;
      },

      /**
       * Provides coordinates for an element to be positioned relative to
       * another element.  Passing 'auto' as part of the placement parameter
       * will enable smart placement - where the element fits. i.e:
       * 'auto left-top' will check to see if there is enough space to the left
       * of the hostElem to fit the targetElem, if not place right (same for secondary
       * top placement).  Available space is calculated using the viewportOffset
       * function.
       *
       * @param {element} hostElem - The element to position against.
       * @param {element} targetElem - The element to position.
       * @param {string=} [placement=top] - The placement for the targetElem,
       *   default is 'top'. 'center' is assumed as secondary placement for
       *   'top', 'left', 'right', and 'bottom' placements.  Available placements are:
       *   <ul>
       *     <li>top</li>
       *     <li>top-right</li>
       *     <li>top-left</li>
       *     <li>bottom</li>
       *     <li>bottom-left</li>
       *     <li>bottom-right</li>
       *     <li>left</li>
       *     <li>left-top</li>
       *     <li>left-bottom</li>
       *     <li>right</li>
       *     <li>right-top</li>
       *     <li>right-bottom</li>
       *   </ul>
       * @param {boolean=} [appendToBody=false] - Should the top and left values returned
       *   be calculated from the body element, default is false.
       * @param {boolean=} [includeMargins=false] - Should margins count into targetElem width
       *    in position claculation
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**top**: Value for targetElem top.</li>
       *     <li>**left**: Value for targetElem left.</li>
       *     <li>**placement**: The resolved placement.</li>
       *   </ul>
       */
      positionElements: function(hostElem, targetElem, placement, appendToBody, includeMargins) {
        hostElem = this.getRawNode(hostElem);
        targetElem = this.getRawNode(targetElem);

        // need to read from prop to support tests.
        var targetWidth = angular.isDefined(targetElem.offsetWidth) ? targetElem.offsetWidth : targetElem.prop('offsetWidth');
        var targetHeight = angular.isDefined(targetElem.offsetHeight) ? targetElem.offsetHeight : targetElem.prop('offsetHeight');

        if (includeMargins) {
          var styles = window.getComputedStyle(targetElem);
          var verticalMargin = this.parseStyle(styles.marginTop) + this.parseStyle(styles.marginBottom);
          var horisontalMargin = this.parseStyle(styles.marginLeft) + this.parseStyle(styles.marginRight);

          targetHeight += verticalMargin;
          targetWidth += horisontalMargin;
        }

        placement = this.parsePlacement(placement);

        var hostElemPos = appendToBody ? this.offset(hostElem) : this.position(hostElem);
        var targetElemPos = {top: 0, left: 0, placement: ''};

        if (placement[2]) {
          var viewportOffset = this.viewportOffset(hostElem, appendToBody);

          var targetElemStyle = $window.getComputedStyle(targetElem);
          var adjustedSize = {
            width: targetWidth + Math.round(Math.abs(this.parseStyle(targetElemStyle.marginLeft) + this.parseStyle(targetElemStyle.marginRight))),
            height: targetHeight + Math.round(Math.abs(this.parseStyle(targetElemStyle.marginTop) + this.parseStyle(targetElemStyle.marginBottom)))
          };

          placement[0] = placement[0] === 'top' && adjustedSize.height > viewportOffset.top && adjustedSize.height <= viewportOffset.bottom ? 'bottom' :
            placement[0] === 'bottom' && adjustedSize.height > viewportOffset.bottom && adjustedSize.height <= viewportOffset.top ? 'top' :
              placement[0] === 'left' && adjustedSize.width > viewportOffset.left && adjustedSize.width <= viewportOffset.right ? 'right' :
                placement[0] === 'right' && adjustedSize.width > viewportOffset.right && adjustedSize.width <= viewportOffset.left ? 'left' :
                  placement[0];

          placement[1] = placement[1] === 'top' && adjustedSize.height - hostElemPos.height > viewportOffset.bottom && adjustedSize.height - hostElemPos.height <= viewportOffset.top ? 'bottom' :
            placement[1] === 'bottom' && adjustedSize.height - hostElemPos.height > viewportOffset.top && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom ? 'top' :
              placement[1] === 'left' && adjustedSize.width - hostElemPos.width > viewportOffset.right && adjustedSize.width - hostElemPos.width <= viewportOffset.left ? 'right' :
                placement[1] === 'right' && adjustedSize.width - hostElemPos.width > viewportOffset.left && adjustedSize.width - hostElemPos.width <= viewportOffset.right ? 'left' :
                  placement[1];

          if (placement[1] === 'center') {
            if (PLACEMENT_REGEX.vertical.test(placement[0])) {
              var xOverflow = hostElemPos.width / 2 - targetWidth / 2;
              if (viewportOffset.left + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.right) {
                placement[1] = 'left';
              } else if (viewportOffset.right + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.left) {
                placement[1] = 'right';
              }
            } else {
              var yOverflow = hostElemPos.height / 2 - adjustedSize.height / 2;
              if (viewportOffset.top + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom) {
                placement[1] = 'top';
              } else if (viewportOffset.bottom + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.top) {
                placement[1] = 'bottom';
              }
            }
          }
        }

        switch (placement[0]) {
          case 'top':
            targetElemPos.top = hostElemPos.top - targetHeight;
            break;
          case 'bottom':
            targetElemPos.top = hostElemPos.top + hostElemPos.height;
            break;
          case 'left':
            targetElemPos.left = hostElemPos.left - targetWidth;
            break;
          case 'right':
            targetElemPos.left = hostElemPos.left + hostElemPos.width;
            break;
        }

        switch (placement[1]) {
          case 'top':
            targetElemPos.top = hostElemPos.top;
            break;
          case 'bottom':
            targetElemPos.top = hostElemPos.top + hostElemPos.height - targetHeight;
            break;
          case 'left':
            targetElemPos.left = hostElemPos.left;
            break;
          case 'right':
            targetElemPos.left = hostElemPos.left + hostElemPos.width - targetWidth;
            break;
          case 'center':
            if (PLACEMENT_REGEX.vertical.test(placement[0])) {
              targetElemPos.left = hostElemPos.left + hostElemPos.width / 2 - targetWidth / 2;
            } else {
              targetElemPos.top = hostElemPos.top + hostElemPos.height / 2 - targetHeight / 2;
            }
            break;
        }

        targetElemPos.top = Math.round(targetElemPos.top);
        targetElemPos.left = Math.round(targetElemPos.left);
        targetElemPos.placement = placement[1] === 'center' ? placement[0] : placement[0] + '-' + placement[1];

        return targetElemPos;
      },

      /**
       * Provides a way to adjust the top positioning after first
       * render to correctly align element to top after content
       * rendering causes resized element height
       *
       * @param {array} placementClasses - The array of strings of classes
       * element should have.
       * @param {object} containerPosition - The object with container
       * position information
       * @param {number} initialHeight - The initial height for the elem.
       * @param {number} currentHeight - The current height for the elem.
       */
      adjustTop: function(placementClasses, containerPosition, initialHeight, currentHeight) {
        if (placementClasses.indexOf('top') !== -1 && initialHeight !== currentHeight) {
          return {
            top: containerPosition.top - currentHeight + 'px'
          };
        }
      },

      /**
       * Provides a way for positioning tooltip & dropdown
       * arrows when using placement options beyond the standard
       * left, right, top, or bottom.
       *
       * @param {element} elem - The tooltip/dropdown element.
       * @param {string} placement - The placement for the elem.
       */
      positionArrow: function(elem, placement) {
        elem = this.getRawNode(elem);
        var isTooltip = true;

        var innerElem = elem.querySelector('.tooltip-inner');
        if (!innerElem) {
          if (angular.element(elem).hasClass('popover')) {
            isTooltip = false;
          } else {
            return;
          }
        }

        var arrowElem = elem.querySelector('.arrow');
        if (!arrowElem) {
          return;
        }

        var arrowCss = {
          top: '',
          bottom: '',
          left: '',
          right: ''
        };

        placement = this.parsePlacement(placement);
        if (placement[1] === 'center') {
          var arrowElemOffset = this.offset(arrowElem, true);
          if (PLACEMENT_REGEX.vertical.test(placement[0])) {
            var aHW = arrowElemOffset.width / 2;
            var eHW = this.offset(elem).width / 2;
            var left = eHW - aHW;
            arrowCss.left = '' + left + 'px';
          } else {
            var aHH = arrowElemOffset.height / 2;
            var eHH = this.offset(elem).height / 2;
            var top = eHH - aHH;
            arrowCss.top = '' + top + 'px';
          }
        }

        var borderProp = 'border-' + placement[0] + '-width';
        var borderWidth = $window.getComputedStyle(arrowElem)[borderProp];

        var borderRadiusProp = 'border-';
        if (PLACEMENT_REGEX.vertical.test(placement[0])) {
          borderRadiusProp += placement[0] + '-' + placement[1];
        } else {
          borderRadiusProp += placement[1] + '-' + placement[0];
        }
        borderRadiusProp += '-radius';
        var borderRadius = $window.getComputedStyle(isTooltip ? innerElem : elem)[borderRadiusProp];

        if (isTooltip) {
          switch (placement[0]) {
            case 'top':
              arrowCss.bottom = '0';
              break;
            case 'bottom':
              arrowCss.top = '0';
              break;
            case 'left':
              arrowCss.right = '0';
              break;
            case 'right':
              arrowCss.left = '0';
              break;
          }
        }

        arrowCss[placement[1]] = borderRadius;

        angular.element(arrowElem).css(arrowCss);
      }
    };
  }]);

angular.module('ui.bootstrap.datepickerPopup', ['ui.bootstrap.datepicker', 'ui.bootstrap.position'])

.value('$datepickerPopupLiteralWarning', true)

.constant('uibDatepickerPopupConfig', {
  altInputFormats: [],
  appendToBody: false,
  clearText: 'Clear',
  closeOnDateSelection: true,
  closeText: 'Done',
  currentText: 'Today',
  datepickerPopup: 'yyyy-MM-dd',
  datepickerPopupTemplateUrl: 'uib/template/datepickerPopup/popup.html',
  datepickerTemplateUrl: 'uib/template/datepicker/datepicker.html',
  html5Types: {
    date: 'yyyy-MM-dd',
    'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
    'month': 'yyyy-MM'
  },
  onOpenFocus: true,
  showButtonBar: true,
  placement: 'auto bottom-left'
})

.controller('UibDatepickerPopupController', ['$scope', '$element', '$attrs', '$compile', '$log', '$parse', '$window', '$document', '$rootScope', '$uibPosition', 'dateFilter', 'uibDateParser', 'uibDatepickerPopupConfig', '$timeout', 'uibDatepickerConfig', '$datepickerPopupLiteralWarning',
function($scope, $element, $attrs, $compile, $log, $parse, $window, $document, $rootScope, $position, dateFilter, dateParser, datepickerPopupConfig, $timeout, datepickerConfig, $datepickerPopupLiteralWarning) {
  var cache = {},
    isHtml5DateInput = false;
  var dateFormat, closeOnDateSelection, appendToBody, onOpenFocus,
    datepickerPopupTemplateUrl, datepickerTemplateUrl, popupEl, datepickerEl, scrollParentEl,
    ngModel, ngModelOptions, $popup, altInputFormats, watchListeners = [];

  this.init = function(_ngModel_) {
    ngModel = _ngModel_;
    ngModelOptions = extractOptions(ngModel);
    closeOnDateSelection = angular.isDefined($attrs.closeOnDateSelection) ?
      $scope.$parent.$eval($attrs.closeOnDateSelection) :
      datepickerPopupConfig.closeOnDateSelection;
    appendToBody = angular.isDefined($attrs.datepickerAppendToBody) ?
      $scope.$parent.$eval($attrs.datepickerAppendToBody) :
      datepickerPopupConfig.appendToBody;
    onOpenFocus = angular.isDefined($attrs.onOpenFocus) ?
      $scope.$parent.$eval($attrs.onOpenFocus) : datepickerPopupConfig.onOpenFocus;
    datepickerPopupTemplateUrl = angular.isDefined($attrs.datepickerPopupTemplateUrl) ?
      $attrs.datepickerPopupTemplateUrl :
      datepickerPopupConfig.datepickerPopupTemplateUrl;
    datepickerTemplateUrl = angular.isDefined($attrs.datepickerTemplateUrl) ?
      $attrs.datepickerTemplateUrl : datepickerPopupConfig.datepickerTemplateUrl;
    altInputFormats = angular.isDefined($attrs.altInputFormats) ?
      $scope.$parent.$eval($attrs.altInputFormats) :
      datepickerPopupConfig.altInputFormats;

    $scope.showButtonBar = angular.isDefined($attrs.showButtonBar) ?
      $scope.$parent.$eval($attrs.showButtonBar) :
      datepickerPopupConfig.showButtonBar;

    if (datepickerPopupConfig.html5Types[$attrs.type]) {
      dateFormat = datepickerPopupConfig.html5Types[$attrs.type];
      isHtml5DateInput = true;
    } else {
      dateFormat = $attrs.uibDatepickerPopup || datepickerPopupConfig.datepickerPopup;
      $attrs.$observe('uibDatepickerPopup', function(value, oldValue) {
        var newDateFormat = value || datepickerPopupConfig.datepickerPopup;
        // Invalidate the $modelValue to ensure that formatters re-run
        // FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764
        if (newDateFormat !== dateFormat) {
          dateFormat = newDateFormat;
          ngModel.$modelValue = null;

          if (!dateFormat) {
            throw new Error('uibDatepickerPopup must have a date format specified.');
          }
        }
      });
    }

    if (!dateFormat) {
      throw new Error('uibDatepickerPopup must have a date format specified.');
    }

    if (isHtml5DateInput && $attrs.uibDatepickerPopup) {
      throw new Error('HTML5 date input types do not support custom formats.');
    }

    // popup element used to display calendar
    popupEl = angular.element(
      "<div uib-datepicker-popup-wrap data-ng-class=\"{'show': isOpen}\"><div uib-datepicker></div></div>"
    );

    popupEl.attr({
      'ng-model': 'date',
      'ng-change': 'dateSelection(date)',
      'template-url': datepickerPopupTemplateUrl
    });

    // datepicker element
    datepickerEl = angular.element(popupEl.children()[0]);
    datepickerEl.attr('template-url', datepickerTemplateUrl);

    if (!$scope.datepickerOptions) {
      $scope.datepickerOptions = {};
    }

    if (isHtml5DateInput) {
      if ($attrs.type === 'month') {
        $scope.datepickerOptions.datepickerMode = 'month';
        $scope.datepickerOptions.minMode = 'month';
      }
    }

    datepickerEl.attr('datepicker-options', 'datepickerOptions');

    if (!isHtml5DateInput) {
      // Internal API to maintain the correct ng-invalid-[key] class
      ngModel.$$parserName = 'date';
      ngModel.$validators.date = validator;
      ngModel.$parsers.unshift(parseDate);
      ngModel.$formatters.push(function(value) {
        if (ngModel.$isEmpty(value)) {
          $scope.date = value;
          return value;
        }

        if (angular.isNumber(value)) {
          value = new Date(value);
        }

        $scope.date = dateParser.fromTimezone(value, ngModelOptions.getOption('timezone'));

        return dateParser.filter($scope.date, dateFormat);
      });
    } else {
      ngModel.$formatters.push(function(value) {
        $scope.date = dateParser.fromTimezone(value, ngModelOptions.getOption('timezone'));
        return value;
      });
    }

    // Detect changes in the view from the text box
    ngModel.$viewChangeListeners.push(function() {
      $scope.date = parseDateString(ngModel.$viewValue);
    });

    $element.on('keydown', inputKeydownBind);

    $popup = $compile(popupEl)($scope);
    // Prevent jQuery cache memory leak (template is now redundant after linking)
    popupEl.remove();

    if (appendToBody) {
      $document.find('body').append($popup);
    } else {
      $element.after($popup);
    }

    $scope.$on('$destroy', function() {
      if ($scope.isOpen === true) {
        if (!$rootScope.$$phase) {
          $scope.$apply(function() {
            $scope.isOpen = false;
          });
        }
      }

      $popup.remove();
      $element.off('keydown', inputKeydownBind);
      $document.off('click', documentClickBind);
      if (scrollParentEl) {
        scrollParentEl.off('scroll', positionPopup);
      }
      angular.element($window).off('resize', positionPopup);

      //Clear all watch listeners on destroy
      while (watchListeners.length) {
        watchListeners.shift()();
      }
    });
  };

  $scope.getText = function(key) {
    return $scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];
  };

  $scope.isDisabled = function(date) {
    if (date === 'today') {
      date = dateParser.fromTimezone(new Date(), ngModelOptions.getOption('timezone'));
    }

    var dates = {};
    angular.forEach(['minDate', 'maxDate'], function(key) {
      if (!$scope.datepickerOptions[key]) {
        dates[key] = null;
      } else if (angular.isDate($scope.datepickerOptions[key])) {
        dates[key] = new Date($scope.datepickerOptions[key]);
      } else {
        if ($datepickerPopupLiteralWarning) {
          $log.warn('Literal date support has been deprecated, please switch to date object usage');
        }

        dates[key] = new Date(dateFilter($scope.datepickerOptions[key], 'medium'));
      }
    });

    return $scope.datepickerOptions &&
      dates.minDate && $scope.compare(date, dates.minDate) < 0 ||
      dates.maxDate && $scope.compare(date, dates.maxDate) > 0;
  };

  $scope.compare = function(date1, date2) {
    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  };

  // Inner change
  $scope.dateSelection = function(dt) {
    $scope.date = dt;
    var date = $scope.date ? dateParser.filter($scope.date, dateFormat) : null; // Setting to NULL is necessary for form validators to function
    $element.val(date);
    ngModel.$setViewValue(date);

    if (closeOnDateSelection) {
      $scope.isOpen = false;
      $element[0].focus();
    }
  };

  $scope.keydown = function(evt) {
    if (evt.which === 27) {
      evt.stopPropagation();
      $scope.isOpen = false;
      $element[0].focus();
    }
  };

  $scope.select = function(date, evt) {
    evt.stopPropagation();

    if (date === 'today') {
      var today = new Date();
      if (angular.isDate($scope.date)) {
        date = new Date($scope.date);
        date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
      } else {
        date = dateParser.fromTimezone(today, ngModelOptions.getOption('timezone'));
        date.setHours(0, 0, 0, 0);
      }
    }
    $scope.dateSelection(date);
  };

  $scope.close = function(evt) {
    evt.stopPropagation();

    $scope.isOpen = false;
    $element[0].focus();
  };

  $scope.disabled = angular.isDefined($attrs.disabled) || false;
  if ($attrs.ngDisabled) {
    watchListeners.push($scope.$parent.$watch($parse($attrs.ngDisabled), function(disabled) {
      $scope.disabled = disabled;
    }));
  }

  $scope.$watch('isOpen', function(value) {
    if (value) {
      if (!$scope.disabled) {
        $timeout(function() {
          positionPopup();

          if (onOpenFocus) {
            $scope.$broadcast('uib:datepicker.focus');
          }

          $document.on('click', documentClickBind);

          var placement = $attrs.popupPlacement ? $attrs.popupPlacement : datepickerPopupConfig.placement;
          if (appendToBody || $position.parsePlacement(placement)[2]) {
            scrollParentEl = scrollParentEl || angular.element($position.scrollParent($element));
            if (scrollParentEl) {
              scrollParentEl.on('scroll', positionPopup);
            }
          } else {
            scrollParentEl = null;
          }

          angular.element($window).on('resize', positionPopup);
        }, 0, false);
      } else {
        $scope.isOpen = false;
      }
    } else {
      $document.off('click', documentClickBind);
      if (scrollParentEl) {
        scrollParentEl.off('scroll', positionPopup);
      }
      angular.element($window).off('resize', positionPopup);
    }
  });

  function cameltoDash(string) {
    return string.replace(/([A-Z])/g, function($1) { return '-' + $1.toLowerCase(); });
  }

  function parseDateString(viewValue) {
    var date = dateParser.parse(viewValue, dateFormat, $scope.date);
    if (isNaN(date)) {
      for (var i = 0; i < altInputFormats.length; i++) {
        date = dateParser.parse(viewValue, altInputFormats[i], $scope.date);
        if (!isNaN(date)) {
          return date;
        }
      }
    }
    return date;
  }

  function parseDate(viewValue) {
    if (angular.isNumber(viewValue)) {
      // presumably timestamp to date object
      viewValue = new Date(viewValue);
    }

    if (!viewValue) {
      return null;
    }

    if (angular.isDate(viewValue) && !isNaN(viewValue)) {
      return viewValue;
    }

    if (angular.isString(viewValue)) {
      var date = parseDateString(viewValue);
      if (!isNaN(date)) {
        return dateParser.toTimezone(date, ngModelOptions.getOption('timezone'));
      }
    }

    return ngModelOptions.getOption('allowInvalid') ? viewValue : undefined;
  }

  function validator(modelValue, viewValue) {
    var value = modelValue || viewValue;

    if (!$attrs.ngRequired && !value) {
      return true;
    }

    if (angular.isNumber(value)) {
      value = new Date(value);
    }

    if (!value) {
      return true;
    }

    if (angular.isDate(value) && !isNaN(value)) {
      return true;
    }

    if (angular.isString(value)) {
      return !isNaN(parseDateString(value));
    }

    return false;
  }

  function documentClickBind(event) {
    if (!$scope.isOpen && $scope.disabled) {
      return;
    }

    var popup = $popup[0];
    var dpContainsTarget = $element[0].contains(event.target);
    // The popup node may not be an element node
    // In some browsers (IE) only element nodes have the 'contains' function
    var popupContainsTarget = popup.contains !== undefined && popup.contains(event.target);
    if ($scope.isOpen && !(dpContainsTarget || popupContainsTarget)) {
      $scope.$apply(function() {
        $scope.isOpen = false;
      });
    }
  }

  function inputKeydownBind(evt) {
    if (evt.which === 27 && $scope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.$apply(function() {
        $scope.isOpen = false;
      });
      $element[0].focus();
    } else if (evt.which === 40 && !$scope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.$apply(function() {
        $scope.isOpen = true;
      });
    }
  }

  function positionPopup() {
    if ($scope.isOpen) {
      var dpElement = angular.element($popup[0].querySelector('.uib-datepicker-popup'));
      var placement = $attrs.popupPlacement ? $attrs.popupPlacement : datepickerPopupConfig.placement;
      var position = $position.positionElements($element, dpElement, placement, appendToBody);
      dpElement.css({top: position.top + 'px', left: position.left + 'px'});
      if (dpElement.hasClass('uib-position-measure')) {
        dpElement.removeClass('uib-position-measure');
      }
    }
  }

  function extractOptions(ngModelCtrl) {
    var ngModelOptions;

    if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
      // guarantee a value
      ngModelOptions = angular.isObject(ngModelCtrl.$options) ?
        ngModelCtrl.$options :
        {
          timezone: null
        };

      // mimic 1.6+ api
      ngModelOptions.getOption = function (key) {
        return ngModelOptions[key];
      };
    } else { // in angular >=1.6 $options is always present
      ngModelOptions = ngModelCtrl.$options;
    }

    return ngModelOptions;
  }

  $scope.$on('uib:datepicker.mode', function() {
    $timeout(positionPopup, 0, false);
  });
}])

.directive('uibDatepickerPopup', function() {
  return {
    require: ['ngModel', 'uibDatepickerPopup'],
    controller: 'UibDatepickerPopupController',
    scope: {
      datepickerOptions: '=?',
      isOpen: '=?',
      currentText: '@',
      clearText: '@',
      closeText: '@'
    },
    link: function(scope, element, attrs, ctrls) {
      var ngModel = ctrls[0],
        ctrl = ctrls[1];

      ctrl.init(ngModel);
    }
  };
})

.directive('uibDatepickerPopupWrap', function() {
  return {
    restrict: 'A',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepickerPopup/popup.html';
    }
  };
});

angular.module('ui.bootstrap.debounce', [])
/**
 * A helper, internal service that debounces a function
 */
  .factory('$$debounce', ['$timeout', function($timeout) {
    return function(callback, debounceTime) {
      var timeoutPromise;

      return function() {
        var self = this;
        var args = Array.prototype.slice.call(arguments);
        if (timeoutPromise) {
          $timeout.cancel(timeoutPromise);
        }

        timeoutPromise = $timeout(function() {
          callback.apply(self, args);
        }, debounceTime);
      };
    };
  }]);

angular.module('ui.bootstrap.multiMap', [])
/**
 * A helper, internal data structure that stores all references attached to key
 */
  .factory('$$multiMap', function() {
    return {
      createNew: function() {
        var map = {};

        return {
          entries: function() {
            return Object.keys(map).map(function(key) {
              return {
                key: key,
                value: map[key]
              };
            });
          },
          get: function(key) {
            return map[key];
          },
          hasKey: function(key) {
            return !!map[key];
          },
          keys: function() {
            return Object.keys(map);
          },
          put: function(key, value) {
            if (!map[key]) {
              map[key] = [];
            }

            map[key].push(value);
          },
          remove: function(key, value) {
            var values = map[key];

            if (!values) {
              return;
            }

            var idx = values.indexOf(value);

            if (idx !== -1) {
              values.splice(idx, 1);
            }

            if (!values.length) {
              delete map[key];
            }
          }
        };
      }
    };
  });

angular.module('ui.bootstrap.dropdown', ['ui.bootstrap.multiMap', 'ui.bootstrap.position'])

.constant('uibDropdownConfig', {
  appendToOpenClass: 'uib-dropdown-open',
  openClass: 'show'
})

.service('uibDropdownService', ['$document', '$rootScope', '$$multiMap', function($document, $rootScope, $$multiMap) {
  var openScope = null;
  var openedContainers = $$multiMap.createNew();

  this.isOnlyOpen = function(dropdownScope, appendTo) {
    var openedDropdowns = openedContainers.get(appendTo);
    if (openedDropdowns) {
      var openDropdown = openedDropdowns.reduce(function(toClose, dropdown) {
        if (dropdown.scope === dropdownScope) {
          return dropdown;
        }

        return toClose;
      }, {});
      if (openDropdown) {
        return openedDropdowns.length === 1;
      }
    }

    return false;
  };

  this.open = function(dropdownScope, element, appendTo) {
    if (!openScope) {
      $document.on('click', closeDropdown);
    }

    if (openScope && openScope !== dropdownScope) {
      openScope.isOpen = false;
    }

    openScope = dropdownScope;

    if (!appendTo) {
      return;
    }

    var openedDropdowns = openedContainers.get(appendTo);
    if (openedDropdowns) {
      var openedScopes = openedDropdowns.map(function(dropdown) {
        return dropdown.scope;
      });
      if (openedScopes.indexOf(dropdownScope) === -1) {
        openedContainers.put(appendTo, {
          scope: dropdownScope
        });
      }
    } else {
      openedContainers.put(appendTo, {
        scope: dropdownScope
      });
    }
  };

  this.close = function(dropdownScope, element, appendTo) {
    if (openScope === dropdownScope) {
      $document.off('click', closeDropdown);
      $document.off('keydown', this.keybindFilter);
      openScope = null;
    }

    if (!appendTo) {
      return;
    }

    var openedDropdowns = openedContainers.get(appendTo);
    if (openedDropdowns) {
      var dropdownToClose = openedDropdowns.reduce(function(toClose, dropdown) {
        if (dropdown.scope === dropdownScope) {
          return dropdown;
        }

        return toClose;
      }, {});
      if (dropdownToClose) {
        openedContainers.remove(appendTo, dropdownToClose);
      }
    }
  };

  var closeDropdown = function(evt) {
    // This method may still be called during the same mouse event that
    // unbound this event handler. So check openScope before proceeding.
    if (!openScope || !openScope.isOpen) { return; }

    if (evt && openScope.getAutoClose() === 'disabled') { return; }

    if (evt && evt.which === 3) { return; }

    var toggleElement = openScope.getToggleElement();
    if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
      return;
    }

    var dropdownElement = openScope.getDropdownElement();
    if (evt && openScope.getAutoClose() === 'outsideClick' &&
      dropdownElement && dropdownElement[0].contains(evt.target)) {
      return;
    }

    openScope.isOpen = false;

    if (!$rootScope.$$phase) {
      openScope.$apply();
    }
  };

  this.keybindFilter = function(evt) {
    if (!openScope) {
      // see this.close as ESC could have been pressed which kills the scope so we can not proceed
      return;
    }

    var dropdownElement = openScope.getDropdownElement();
    var toggleElement = openScope.getToggleElement();
    var dropdownElementTargeted = dropdownElement && dropdownElement[0].contains(evt.target);
    var toggleElementTargeted = toggleElement && toggleElement[0].contains(evt.target);
    if (evt.which === 27) {
      evt.stopPropagation();
      openScope.focusToggleElement();
      closeDropdown();
    } else if (openScope.isKeynavEnabled() && [38, 40].indexOf(evt.which) !== -1 && openScope.isOpen && (dropdownElementTargeted || toggleElementTargeted)) {
      evt.preventDefault();
      evt.stopPropagation();
      openScope.focusDropdownEntry(evt.which);
    }
  };
}])

.controller('UibDropdownController', ['$scope', '$element', '$attrs', '$parse', 'uibDropdownConfig', 'uibDropdownService', '$animate', '$uibPosition', '$document', '$compile', '$templateRequest', function($scope, $element, $attrs, $parse, dropdownConfig, uibDropdownService, $animate, $position, $document, $compile, $templateRequest) {
  var self = this,
    scope = $scope.$new(), // create a child scope so we are not polluting original one
    templateScope,
    appendToOpenClass = dropdownConfig.appendToOpenClass,
    openClass = dropdownConfig.openClass,
    getIsOpen,
    setIsOpen = angular.noop,
    toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
    keynavEnabled = false,
    selectedOption = null,
    body = $document.find('body');

  $element.addClass('dropdown');

  this.init = function() {
    if ($attrs.isOpen) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function(value) {
        scope.isOpen = !!value;
      });
    }

    keynavEnabled = angular.isDefined($attrs.keyboardNav);
  };

  this.toggle = function(open) {
    scope.isOpen = arguments.length ? !!open : !scope.isOpen;
    if (angular.isFunction(setIsOpen)) {
      setIsOpen(scope, scope.isOpen);
    }

    return scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

  scope.getAutoClose = function() {
    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
  };

  scope.getElement = function() {
    return $element;
  };

  scope.isKeynavEnabled = function() {
    return keynavEnabled;
  };

  scope.focusDropdownEntry = function(keyCode) {
    var elems = self.dropdownMenu ? //If append to body is used.
      angular.element(self.dropdownMenu).find('.dropdown-item') :
      $element.find('div').eq(0).find('a.');

    switch (keyCode) {
      case 40: {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = 0;
        } else {
          self.selectedOption = self.selectedOption === elems.length - 1 ?
            self.selectedOption :
            self.selectedOption + 1;
        }
        break;
      }
      case 38: {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = elems.length - 1;
        } else {
          self.selectedOption = self.selectedOption === 0 ?
            0 : self.selectedOption - 1;
        }
        break;
      }
    }

    elems[self.selectedOption].focus();
  };

  scope.getDropdownElement = function() {
    return self.dropdownMenu;
  };

  scope.focusToggleElement = function() {
    if (self.toggleElement) {
      self.toggleElement[0].focus();
    }
  };

  function removeDropdownMenu() {
    $element.append(self.dropdownMenu);
  }

  scope.$watch('isOpen', function(isOpen, wasOpen) {
    var appendTo = null,
      appendToBody = false;

    if (angular.isDefined($attrs.dropdownAppendTo)) {
      var appendToEl = $parse($attrs.dropdownAppendTo)(scope);
      if (appendToEl) {
        appendTo = angular.element(appendToEl);
      }
    }

    if (angular.isDefined($attrs.dropdownAppendToBody)) {
      var appendToBodyValue = $parse($attrs.dropdownAppendToBody)(scope);
      if (appendToBodyValue !== false) {
        appendToBody = true;
      }
    }

    if (appendToBody && !appendTo) {
      appendTo = body;
    }

    if (appendTo && self.dropdownMenu) {
      if (isOpen) {
        appendTo.append(self.dropdownMenu);
        $element.on('$destroy', removeDropdownMenu);
      } else {
        $element.off('$destroy', removeDropdownMenu);
        removeDropdownMenu();
      }
    }

    if (appendTo && self.dropdownMenu) {
      var pos = $position.positionElements($element, self.dropdownMenu, 'bottom-left', true),
        css,
        rightalign,
        scrollbarPadding,
        scrollbarWidth = 0;

      css = {
        top: pos.top + 'px',
        display: isOpen ? 'block' : 'none'
      };

      rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
      if (!rightalign) {
        css.left = pos.left + 'px';
        css.right = 'auto';
      } else {
        css.left = 'auto';
        scrollbarPadding = $position.scrollbarPadding(appendTo);

        if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
          scrollbarWidth = scrollbarPadding.scrollbarWidth;
        }

        css.right = window.innerWidth - scrollbarWidth -
          (pos.left + $element.prop('offsetWidth')) + 'px';
      }

      // Need to adjust our positioning to be relative to the appendTo container
      // if it's not the body element
      if (!appendToBody) {
        var appendOffset = $position.offset(appendTo);

        css.top = pos.top - appendOffset.top + 'px';

        if (!rightalign) {
          css.left = pos.left - appendOffset.left + 'px';
        } else {
          css.right = window.innerWidth -
            (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
        }
      }

      self.dropdownMenu.css(css);
    }

    // find openContainer by uib-dropdown-menu directive
    var openContainer = appendTo ? appendTo : angular.element($element[0].querySelector("[uib-dropdown-menu]"));
    var dropdownOpenClass = appendTo ? appendToOpenClass : openClass;
    var hasOpenClass = openContainer.hasClass(dropdownOpenClass);
    var isOnlyOpen = uibDropdownService.isOnlyOpen($scope, appendTo);

    if (hasOpenClass === !isOpen) {
      var toggleClass;
      if (appendTo) {
        toggleClass = !isOnlyOpen ? 'addClass' : 'removeClass';
      } else {
        toggleClass = isOpen ? 'addClass' : 'removeClass';
      }

      // original Bootstrap 4 dropdown sets openClass on both dropdownMenu and element
      $animate[toggleClass]($element, dropdownOpenClass);

      $animate[toggleClass](openContainer, dropdownOpenClass).then(function() {
        if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
          toggleInvoker($scope, { open: !!isOpen });
        }
      });
    }

    if (isOpen) {
      if (self.dropdownMenuTemplateUrl) {
        $templateRequest(self.dropdownMenuTemplateUrl).then(function(tplContent) {
          templateScope = scope.$new();
          $compile(tplContent.trim())(templateScope, function(dropdownElement) {
            var newEl = dropdownElement;
            self.dropdownMenu.replaceWith(newEl);
            self.dropdownMenu = newEl;
            $animate.addClass(self.dropdownMenu, dropdownOpenClass);
            $document.on('keydown', uibDropdownService.keybindFilter);
          });
        });
      } else {
        $document.on('keydown', uibDropdownService.keybindFilter);
      }

      scope.focusToggleElement();
      uibDropdownService.open(scope, $element, appendTo);
    } else {
      uibDropdownService.close(scope, $element, appendTo);
      if (self.dropdownMenuTemplateUrl) {
        if (templateScope) {
          templateScope.$destroy();
        }
        var newEl = angular.element('<div class="dropdown-menu"></div>');
        self.dropdownMenu.replaceWith(newEl);
        self.dropdownMenu = newEl;
      }

      self.selectedOption = null;
    }

    if (angular.isFunction(setIsOpen)) {
      setIsOpen($scope, isOpen);
    }
  });
}])

.directive('uibDropdown', function() {
  return {
    controller: 'UibDropdownController',
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init();
    }
  };
})

.directive('uibDropdownMenu', function() {
  return {
    restrict: 'A',
    require: '?^uibDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl || angular.isDefined(attrs.dropdownNested)) {
        return;
      }

      element.addClass('dropdown-menu');

      var tplUrl = attrs.templateUrl;
      if (tplUrl) {
        dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
      }

      if (!dropdownCtrl.dropdownMenu) {
        dropdownCtrl.dropdownMenu = element;
      }
    }
  };
})

.directive('uibDropdownToggle', function() {
  return {
    require: '?^uibDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl) {
        return;
      }

      element.addClass('dropdown-toggle');

      dropdownCtrl.toggleElement = element;

      var toggleDropdown = function(event) {
        event.preventDefault();

        if (!element.hasClass('disabled') && !attrs.disabled) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      };

      element.on('click', toggleDropdown);

      var openDropdown = function(event) {
        if (event.which === 40 && !dropdownCtrl.isOpen()) {
          event.preventDefault();
          event.stopPropagation();

          if (!element.hasClass('disabled') && !attrs.disabled) {
            scope.$apply(function() {
              dropdownCtrl.toggle();
            });
          }
        }
      };

      element.on('keydown', openDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.off('click', toggleDropdown);
        element.off('keydown', openDropdown);
      });
    }
  };
});

angular.module('ui.bootstrap.stackedMap', [])
/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function() {
    return {
      createNew: function() {
        var stack = [];

        return {
          add: function(key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function(key) {
            for (var i = 0; i < stack.length; i++) {
              if (key === stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function() {
            return stack[stack.length - 1];
          },
          remove: function(key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key === stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function() {
            return stack.pop();
          },
          length: function() {
            return stack.length;
          }
        };
      }
    };
  });
angular.module('ui.bootstrap.modal', ['ui.bootstrap.multiMap', 'ui.bootstrap.stackedMap', 'ui.bootstrap.position'])
/**
 * Pluggable resolve mechanism for the modal resolve resolution
 * Supports UI Router's $resolve service
 */
  .provider('$uibResolve', function() {
    var resolve = this;
    this.resolver = null;

    this.setResolver = function(resolver) {
      this.resolver = resolver;
    };

    this.$get = ['$injector', '$q', function($injector, $q) {
      var resolver = resolve.resolver ? $injector.get(resolve.resolver) : null;
      return {
        resolve: function(invocables, locals, parent, self) {
          if (resolver) {
            return resolver.resolve(invocables, locals, parent, self);
          }

          var promises = [];

          angular.forEach(invocables, function(value) {
            if (angular.isFunction(value) || angular.isArray(value)) {
              promises.push($q.resolve($injector.invoke(value)));
            } else if (angular.isString(value)) {
              promises.push($q.resolve($injector.get(value)));
            } else {
              promises.push($q.resolve(value));
            }
          });

          return $q.all(promises).then(function(resolves) {
            var resolveObj = {};
            var resolveIter = 0;
            angular.forEach(invocables, function(value, key) {
              resolveObj[key] = resolves[resolveIter++];
            });

            return resolveObj;
          });
        }
      };
    }];
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('uibModalBackdrop', ['$uibModalStack', '$q', '$animate',
  function($modalStack, $q, $animate) {
    return {
      restrict: 'A',
      compile: function(tElement, tAttrs) {
        tElement.addClass(tAttrs.backdropClass);
        return linkFn;
      }
    };

    function linkFn(scope, element, attrs) {

      // Deferred object that will be resolved when this modal is rendered.
      var modalRenderDeferObj = $q.defer();
      // Resolve render promise post-digest
      scope.$$postDigest(function() {
        modalRenderDeferObj.resolve();
      });

      modalRenderDeferObj.promise.then(function() {
        if (attrs.modalInClass) {
          $animate.addClass(element, attrs.modalInClass);
        }
      });

      if (attrs.modalInClass) {
        scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
          var done = setIsAsync();
          if (scope.modalOptions.animation) {
            $animate.removeClass(element, attrs.modalInClass).then(done);
          } else {
            done();
          }
        });
      }


    }
  }])

  .directive('uibModalWindow', ['$uibModalStack', '$q', '$animateCss', '$document',
  function($modalStack, $q, $animateCss, $document) {
    return {
      scope: {
        index: '@'
      },
      restrict: 'A',
      transclude: true,
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateUrl || 'uib/template/modal/window.html';
      },
      link: function(scope, element, attrs) {
        element.addClass(attrs.windowTopClass || '');
        scope.size = attrs.size;

        scope.close = function(evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop &&
            modal.value.backdrop !== 'static' &&
            evt.target === evt.currentTarget) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };

        // moved from template to fix issue #2280
        element.on('click', scope.close);

        // This property is only added to the scope for the purpose of detecting when this directive is rendered.
        // We can detect that by using this property in the template associated with this directive and then use
        // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
        scope.$isRendered = true;

        // Deferred object that will be resolved when this modal is rendered.
        var modalRenderDeferObj = $q.defer();
        // Resolve render promise post-digest
        scope.$$postDigest(function() {
          modalRenderDeferObj.resolve();
        });

        modalRenderDeferObj.promise.then(function() {
          var animationPromise = null;

          if (attrs.modalInClass) {
            animationPromise = $animateCss(element, {
              addClass: attrs.modalInClass
            }).start();

            scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
              var done = setIsAsync();
              $animateCss(element, {
                removeClass: attrs.modalInClass
              }).start().then(done);
            });
          }


          $q.when(animationPromise).then(function() {
            // Notify {@link $modalStack} that modal is rendered.
            var modal = $modalStack.getTop();
            if (modal) {
              $modalStack.modalRendered(modal.key);
            }

            /**
             * If something within the freshly-opened modal already has focus (perhaps via a
             * directive that causes focus) then there's no need to try to focus anything.
             */
            if (!($document[0].activeElement && element[0].contains($document[0].activeElement))) {
              var inputWithAutofocus = element[0].querySelector('[autofocus]');
              /**
               * Auto-focusing of a freshly-opened modal element causes any child elements
               * with the autofocus attribute to lose focus. This is an issue on touch
               * based devices which will show and then hide the onscreen keyboard.
               * Attempts to refocus the autofocus element via JavaScript will not reopen
               * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
               * the modal element if the modal does not contain an autofocus element.
               */
              if (inputWithAutofocus) {
                inputWithAutofocus.focus();
              } else {
                element[0].focus();
              }
            }
          });
        });
      }
    };
  }])

  .directive('uibModalAnimationClass', function() {
    return {
      compile: function(tElement, tAttrs) {
        if (tAttrs.modalAnimation) {
          tElement.addClass(tAttrs.uibModalAnimationClass);
        }
      }
    };
  })

  .directive('uibModalTransclude', ['$animate', function($animate) {
    return {
      link: function(scope, element, attrs, controller, transclude) {
        transclude(scope.$parent, function(clone) {
          element.empty();
          $animate.enter(clone, element);
        });
      }
    };
  }])

  .factory('$uibModalStack', ['$animate', '$animateCss', '$document',
    '$compile', '$rootScope', '$q', '$$multiMap', '$$stackedMap', '$uibPosition',
    function($animate, $animateCss, $document, $compile, $rootScope, $q, $$multiMap, $$stackedMap, $uibPosition) {
      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var openedClasses = $$multiMap.createNew();
      var $modalStack = {
        NOW_CLOSING_EVENT: 'modal.stack.now-closing'
      };
      var topModalIndex = 0;
      var previousTopOpenedModal = null;
      var ARIA_HIDDEN_ATTRIBUTE_NAME = 'data-bootstrap-modal-aria-hidden-count';

      //Modal focus behavior
      var tabbableSelector = 'a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']), ' +
        'button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']), textarea:not([disabled]):not([tabindex=\'-1\']), ' +
        'iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]';
      var scrollbarPadding;
      var SNAKE_CASE_REGEXP = /[A-Z]/g;

      // TODO: extract into common dependency with tooltip
      function snake_case(name) {
        var separator = '-';
        return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
          return (pos ? separator : '') + letter.toLowerCase();
        });
      }

      function isVisible(element) {
        return !!(element.offsetWidth ||
          element.offsetHeight ||
          element.getClientRects().length);
      }

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }

        // If any backdrop exist, ensure that it's index is always
        // right below the top modal
        if (topBackdropIndex > -1 && topBackdropIndex < topModalIndex) {
          topBackdropIndex = topModalIndex;
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance, elementToReceiveFocus) {
        var modalWindow = openedWindows.get(modalInstance).value;
        var appendToElement = modalWindow.appendTo;

        //clean up the stack
        openedWindows.remove(modalInstance);
        previousTopOpenedModal = openedWindows.top();
        if (previousTopOpenedModal) {
          topModalIndex = parseInt(previousTopOpenedModal.value.modalDomEl.attr('index'), 10);
        }

        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function() {
          var modalBodyClass = modalWindow.openedClass || OPENED_MODAL_CLASS;
          openedClasses.remove(modalBodyClass, modalInstance);
          var areAnyOpen = openedClasses.hasKey(modalBodyClass);
          appendToElement.toggleClass(modalBodyClass, areAnyOpen);
          if (!areAnyOpen && scrollbarPadding && scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
            if (scrollbarPadding.originalRight) {
              appendToElement.css({paddingRight: scrollbarPadding.originalRight + 'px'});
            } else {
              appendToElement.css({paddingRight: ''});
            }
            scrollbarPadding = null;
          }
          toggleTopWindowClass(true);
        }, modalWindow.closedDeferred);
        checkRemoveBackdrop();

        //move focus to specified element if available, or else to body
        if (elementToReceiveFocus && elementToReceiveFocus.focus) {
          elementToReceiveFocus.focus();
        } else if (appendToElement.focus) {
          appendToElement.focus();
        }
      }

      // Add or remove "windowTopClass" from the top window in the stack
      function toggleTopWindowClass(toggleSwitch) {
        var modalWindow;

        if (openedWindows.length() > 0) {
          modalWindow = openedWindows.top().value;
          modalWindow.modalDomEl.toggleClass(modalWindow.windowTopClass || '', toggleSwitch);
        }
      }

      function checkRemoveBackdrop() {
        //remove backdrop if no longer needed
        if (backdropDomEl && backdropIndex() === -1) {
          var backdropScopeRef = backdropScope;
          removeAfterAnimate(backdropDomEl, backdropScope, function() {
            backdropScopeRef = null;
          });
          backdropDomEl = undefined;
          backdropScope = undefined;
        }
      }

      function removeAfterAnimate(domEl, scope, done, closedDeferred) {
        var asyncDeferred;
        var asyncPromise = null;
        var setIsAsync = function() {
          if (!asyncDeferred) {
            asyncDeferred = $q.defer();
            asyncPromise = asyncDeferred.promise;
          }

          return function asyncDone() {
            asyncDeferred.resolve();
          };
        };
        scope.$broadcast($modalStack.NOW_CLOSING_EVENT, setIsAsync);

        // Note that it's intentional that asyncPromise might be null.
        // That's when setIsAsync has not been called during the
        // NOW_CLOSING_EVENT broadcast.
        return $q.when(asyncPromise).then(afterAnimating);

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          $animate.leave(domEl).then(function() {
            if (done) {
              done();
            }

            domEl.remove();
            if (closedDeferred) {
              closedDeferred.resolve();
            }
          });

          scope.$destroy();
        }
      }

      $document.on('keydown', keydownListener);

      $rootScope.$on('$destroy', function() {
        $document.off('keydown', keydownListener);
      });

      function keydownListener(evt) {
        if (evt.isDefaultPrevented()) {
          return evt;
        }

        var modal = openedWindows.top();
        if (modal) {
          switch (evt.which) {
            case 27: {
              if (modal.value.keyboard) {
                evt.preventDefault();
                $rootScope.$apply(function() {
                  $modalStack.dismiss(modal.key, 'escape key press');
                });
              }
              break;
            }
            case 9: {
              var list = $modalStack.loadFocusElementList(modal);
              var focusChanged = false;
              if (evt.shiftKey) {
                if ($modalStack.isFocusInFirstItem(evt, list) || $modalStack.isModalFocused(evt, modal)) {
                  focusChanged = $modalStack.focusLastFocusableElement(list);
                }
              } else {
                if ($modalStack.isFocusInLastItem(evt, list)) {
                  focusChanged = $modalStack.focusFirstFocusableElement(list);
                }
              }

              if (focusChanged) {
                evt.preventDefault();
                evt.stopPropagation();
              }

              break;
            }
          }
        }
      }

      $modalStack.open = function(modalInstance, modal) {
        var modalOpener = $document[0].activeElement,
          modalBodyClass = modal.openedClass || OPENED_MODAL_CLASS;

        toggleTopWindowClass(false);

        // Store the current top first, to determine what index we ought to use
        // for the current top modal
        previousTopOpenedModal = openedWindows.top();

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          renderDeferred: modal.renderDeferred,
          closedDeferred: modal.closedDeferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard,
          openedClass: modal.openedClass,
          windowTopClass: modal.windowTopClass,
          animation: modal.animation,
          appendTo: modal.appendTo
        });

        openedClasses.put(modalBodyClass, modalInstance);

        var appendToElement = modal.appendTo,
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.modalOptions = modal;
          backdropScope.index = currBackdropIndex;
          backdropDomEl = angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');
          backdropDomEl.attr({
            'class': 'modal-backdrop',
            'ng-style': '{\'z-index\': 1040 + (index && 1 || 0) + index*10}',
            'uib-modal-animation-class': 'fade',
            'modal-in-class': 'show'
          });
          if (modal.backdropClass) {
            backdropDomEl.addClass(modal.backdropClass);
          }

          if (modal.animation) {
            backdropDomEl.attr('modal-animation', 'true');
          }

          $animate.enter($compile(backdropDomEl)(backdropScope), appendToElement);
          scrollbarPadding = $uibPosition.scrollbarPadding(appendToElement);
          if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
            appendToElement.css({paddingRight: scrollbarPadding.right + 'px'});
          }
        }

        var content;
        if (modal.component) {
          content = document.createElement(snake_case(modal.component.name));
          content = angular.element(content);
          content.attr({
            resolve: '$resolve',
            'modal-instance': '$uibModalInstance',
            close: '$close($value)',
            dismiss: '$dismiss($value)'
          });
        } else {
          content = modal.content;
        }

        // Set the top modal index based on the index of the previous top modal
        topModalIndex = previousTopOpenedModal ? parseInt(previousTopOpenedModal.value.modalDomEl.attr('index'), 10) + 1 : 0;
        var angularDomEl = angular.element('<div uib-modal-window="modal-window"></div>');
        angularDomEl.attr({
          'class': 'modal',
          'template-url': modal.windowTemplateUrl,
          'window-top-class': modal.windowTopClass,
          'role': 'dialog',
          'aria-labelledby': modal.ariaLabelledBy,
          'aria-describedby': modal.ariaDescribedBy,
          'size': modal.size,
          'index': topModalIndex,
          'animate': 'animate',
          'ng-style': '{\'z-index\': 1050 + $$topModalIndex*10, display: \'block\'}',
          'tabindex': -1,
          'uib-modal-animation-class': 'tada',
          'modal-in-class': 'show'
        }).append(content);
        if (modal.windowClass) {
          angularDomEl.addClass(modal.windowClass);
        }

        if (modal.animation) {
          angularDomEl.attr('modal-animation', 'true');
        }

        appendToElement.addClass(modalBodyClass);
        if (modal.scope) {
          // we need to explicitly add the modal index to the modal scope
          // because it is needed by ngStyle to compute the zIndex property.
          modal.scope.$$topModalIndex = topModalIndex;
        }
        $animate.enter($compile(angularDomEl)(modal.scope), appendToElement);

        openedWindows.top().value.modalDomEl = angularDomEl;
        openedWindows.top().value.modalOpener = modalOpener;

        applyAriaHidden(angularDomEl);

        function applyAriaHidden(el) {
          if (!el || el[0].tagName === 'BODY') {
            return;
          }

          getSiblings(el).forEach(function(sibling) {
            var elemIsAlreadyHidden = sibling.getAttribute('aria-hidden') === 'true',
              ariaHiddenCount = parseInt(sibling.getAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME), 10);

            if (!ariaHiddenCount) {
              ariaHiddenCount = elemIsAlreadyHidden ? 1 : 0;
            }

            sibling.setAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME, ariaHiddenCount + 1);
            sibling.setAttribute('aria-hidden', 'true');
          });

          return applyAriaHidden(el.parent());

          function getSiblings(el) {
            var children = el.parent() ? el.parent().children() : [];

            return Array.prototype.filter.call(children, function(child) {
              return child !== el[0];
            });
          }
        }
      };

      function broadcastClosing(modalWindow, resultOrReason, closing) {
        return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented;
      }

      function unhideBackgroundElements() {
        Array.prototype.forEach.call(
          document.querySelectorAll('[' + ARIA_HIDDEN_ATTRIBUTE_NAME + ']'),
          function(hiddenEl) {
            var ariaHiddenCount = parseInt(hiddenEl.getAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME), 10),
              newHiddenCount = ariaHiddenCount - 1;
            hiddenEl.setAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME, newHiddenCount);

            if (!newHiddenCount) {
              hiddenEl.removeAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME);
              hiddenEl.removeAttribute('aria-hidden');
            }
          }
        );
      }

      $modalStack.close = function(modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        unhideBackgroundElements();
        if (modalWindow && broadcastClosing(modalWindow, result, true)) {
          modalWindow.value.modalScope.$$uibDestructionScheduled = true;
          modalWindow.value.deferred.resolve(result);
          removeModalWindow(modalInstance, modalWindow.value.modalOpener);
          return true;
        }

        return !modalWindow;
      };

      $modalStack.dismiss = function(modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        unhideBackgroundElements();
        if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
          modalWindow.value.modalScope.$$uibDestructionScheduled = true;
          modalWindow.value.deferred.reject(reason);
          removeModalWindow(modalInstance, modalWindow.value.modalOpener);
          return true;
        }
        return !modalWindow;
      };

      $modalStack.dismissAll = function(reason) {
        var topModal = this.getTop();
        while (topModal && this.dismiss(topModal.key, reason)) {
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function() {
        return openedWindows.top();
      };

      $modalStack.modalRendered = function(modalInstance) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.renderDeferred.resolve();
        }
      };

      $modalStack.focusFirstFocusableElement = function(list) {
        if (list.length > 0) {
          list[0].focus();
          return true;
        }
        return false;
      };

      $modalStack.focusLastFocusableElement = function(list) {
        if (list.length > 0) {
          list[list.length - 1].focus();
          return true;
        }
        return false;
      };

      $modalStack.isModalFocused = function(evt, modalWindow) {
        if (evt && modalWindow) {
          var modalDomEl = modalWindow.value.modalDomEl;
          if (modalDomEl && modalDomEl.length) {
            return (evt.target || evt.srcElement) === modalDomEl[0];
          }
        }
        return false;
      };

      $modalStack.isFocusInFirstItem = function(evt, list) {
        if (list.length > 0) {
          return (evt.target || evt.srcElement) === list[0];
        }
        return false;
      };

      $modalStack.isFocusInLastItem = function(evt, list) {
        if (list.length > 0) {
          return (evt.target || evt.srcElement) === list[list.length - 1];
        }
        return false;
      };

      $modalStack.loadFocusElementList = function(modalWindow) {
        if (modalWindow) {
          var modalDomE1 = modalWindow.value.modalDomEl;
          if (modalDomE1 && modalDomE1.length) {
            var elements = modalDomE1[0].querySelectorAll(tabbableSelector);
            return elements ?
              Array.prototype.filter.call(elements, function(element) {
                return isVisible(element);
              }) : elements;
          }
        }
      };

      return $modalStack;
    }])

  .provider('$uibModal', function() {
    var $modalProvider = {
      options: {
        animation: true,
        backdrop: true, //can also be false or 'static'
        keyboard: true
      },
      $get: ['$rootScope', '$q', '$document', '$templateRequest', '$controller', '$uibResolve', '$uibModalStack',
        function ($rootScope, $q, $document, $templateRequest, $controller, $uibResolve, $modalStack) {
          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $templateRequest(angular.isFunction(options.templateUrl) ?
                options.templateUrl() : options.templateUrl);
          }

          var promiseChain = null;
          $modal.getPromiseChain = function() {
            return promiseChain;
          };

          $modal.open = function(modalOptions) {
            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();
            var modalClosedDeferred = $q.defer();
            var modalRenderDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              closed: modalClosedDeferred.promise,
              rendered: modalRenderDeferred.promise,
              close: function (result) {
                return $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                return $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};
            modalOptions.appendTo = modalOptions.appendTo || $document.find('body').eq(0);

            if (!modalOptions.appendTo.length) {
              throw new Error('appendTo element not found. Make sure that the element passed is in DOM.');
            }

            //verify options
            if (!modalOptions.component && !modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of component or template or templateUrl options is required.');
            }

            var templateAndResolvePromise;
            if (modalOptions.component) {
              templateAndResolvePromise = $q.when($uibResolve.resolve(modalOptions.resolve, {}, null, null));
            } else {
              templateAndResolvePromise =
                $q.all([getTemplatePromise(modalOptions), $uibResolve.resolve(modalOptions.resolve, {}, null, null)]);
            }

            function resolveWithTemplate() {
              return templateAndResolvePromise;
            }

            // Wait for the resolution of the existing promise chain.
            // Then switch to our own combined promise dependency (regardless of how the previous modal fared).
            // Then add to $modalStack and resolve opened.
            // Finally clean up the chain variable if no subsequent modal has overwritten it.
            var samePromise;
            samePromise = promiseChain = $q.all([promiseChain])
              .then(resolveWithTemplate, resolveWithTemplate)
              .then(function resolveSuccess(tplAndVars) {
                var providedScope = modalOptions.scope || $rootScope;

                var modalScope = providedScope.$new();
                modalScope.$close = modalInstance.close;
                modalScope.$dismiss = modalInstance.dismiss;

                modalScope.$on('$destroy', function() {
                  if (!modalScope.$$uibDestructionScheduled) {
                    modalScope.$dismiss('$uibUnscheduledDestruction');
                  }
                });

                var modal = {
                  scope: modalScope,
                  deferred: modalResultDeferred,
                  renderDeferred: modalRenderDeferred,
                  closedDeferred: modalClosedDeferred,
                  animation: modalOptions.animation,
                  backdrop: modalOptions.backdrop,
                  keyboard: modalOptions.keyboard,
                  backdropClass: modalOptions.backdropClass,
                  windowTopClass: modalOptions.windowTopClass,
                  windowClass: modalOptions.windowClass,
                  windowTemplateUrl: modalOptions.windowTemplateUrl,
                  ariaLabelledBy: modalOptions.ariaLabelledBy,
                  ariaDescribedBy: modalOptions.ariaDescribedBy,
                  size: modalOptions.size,
                  openedClass: modalOptions.openedClass,
                  appendTo: modalOptions.appendTo
                };

                var component = {};
                var ctrlInstance, ctrlInstantiate, ctrlLocals = {};

                if (modalOptions.component) {
                  constructLocals(component, false, true, false);
                  component.name = modalOptions.component;
                  modal.component = component;
                } else if (modalOptions.controller) {
                  constructLocals(ctrlLocals, true, false, true);

                  // the third param will make the controller instantiate later,private api
                  // @see https://github.com/angular/angular.js/blob/master/src/ng/controller.js#L126
                  ctrlInstantiate = $controller(modalOptions.controller, ctrlLocals, true, modalOptions.controllerAs);
                  if (modalOptions.controllerAs && modalOptions.bindToController) {
                    ctrlInstance = ctrlInstantiate.instance;
                    ctrlInstance.$close = modalScope.$close;
                    ctrlInstance.$dismiss = modalScope.$dismiss;
                    angular.extend(ctrlInstance, {
                      $resolve: ctrlLocals.$scope.$resolve
                    }, providedScope);
                  }

                  ctrlInstance = ctrlInstantiate();

                  if (angular.isFunction(ctrlInstance.$onInit)) {
                    ctrlInstance.$onInit();
                  }
                }

                if (!modalOptions.component) {
                  modal.content = tplAndVars[0];
                }

                $modalStack.open(modalInstance, modal);
                modalOpenedDeferred.resolve(true);

                function constructLocals(obj, template, instanceOnScope, injectable) {
                  obj.$scope = modalScope;
                  obj.$scope.$resolve = {};
                  if (instanceOnScope) {
                    obj.$scope.$uibModalInstance = modalInstance;
                  } else {
                    obj.$uibModalInstance = modalInstance;
                  }

                  var resolves = template ? tplAndVars[1] : tplAndVars;
                  angular.forEach(resolves, function(value, key) {
                    if (injectable) {
                      obj[key] = value;
                    }

                    obj.$scope.$resolve[key] = value;
                  });
                }
            }, function resolveError(reason) {
              modalOpenedDeferred.reject(reason);
              modalResultDeferred.reject(reason);
            })['finally'](function() {
              if (promiseChain === samePromise) {
                promiseChain = null;
              }
            });

            return modalInstance;
          };

          return $modal;
        }
      ]
    };

    return $modalProvider;
  });

angular.module('ui.bootstrap.paging', [])
/**
 * Helper internal service for generating common controller code between the
 * pager and pagination components
 */
.factory('uibPaging', ['$parse', function($parse) {
  return {
    create: function(ctrl, $scope, $attrs) {
      ctrl.setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;
      ctrl.ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl
      ctrl._watchers = [];

      ctrl.init = function(ngModelCtrl, config) {
        ctrl.ngModelCtrl = ngModelCtrl;
        ctrl.config = config;

        ngModelCtrl.$render = function() {
          ctrl.render();
        };

        if ($attrs.itemsPerPage) {
          ctrl._watchers.push($scope.$parent.$watch($attrs.itemsPerPage, function(value) {
            ctrl.itemsPerPage = parseInt(value, 10);
            $scope.totalPages = ctrl.calculateTotalPages();
            ctrl.updatePage();
          }));
        } else {
          ctrl.itemsPerPage = config.itemsPerPage;
        }

        $scope.$watch('totalItems', function(newTotal, oldTotal) {
          if (angular.isDefined(newTotal) || newTotal !== oldTotal) {
            $scope.totalPages = ctrl.calculateTotalPages();
            ctrl.updatePage();
          }
        });
      };

      ctrl.calculateTotalPages = function() {
        var totalPages = ctrl.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / ctrl.itemsPerPage);
        return Math.max(totalPages || 0, 1);
      };

      ctrl.render = function() {
        $scope.page = parseInt(ctrl.ngModelCtrl.$viewValue, 10) || 1;
      };

      $scope.selectPage = function(page, evt) {
        if (evt) {
          evt.preventDefault();
        }

        var clickAllowed = !$scope.ngDisabled || !evt;
        if (clickAllowed && $scope.page !== page && page > 0 && page <= $scope.totalPages) {
          if (evt && evt.target) {
            evt.target.blur();
          }
          ctrl.ngModelCtrl.$setViewValue(page);
          ctrl.ngModelCtrl.$render();
        }
      };

      $scope.getText = function(key) {
        return $scope[key + 'Text'] || ctrl.config[key + 'Text'];
      };

      $scope.noPrevious = function() {
        return $scope.page === 1;
      };

      $scope.noNext = function() {
        return $scope.page === $scope.totalPages;
      };

      ctrl.updatePage = function() {
        ctrl.setNumPages($scope.$parent, $scope.totalPages); // Readonly variable

        if ($scope.page > $scope.totalPages) {
          $scope.selectPage($scope.totalPages);
        } else {
          ctrl.ngModelCtrl.$render();
        }
      };

      $scope.$on('$destroy', function() {
        while (ctrl._watchers.length) {
          ctrl._watchers.shift()();
        }
      });
    }
  };
}]);

angular.module('ui.bootstrap.pager', ['ui.bootstrap.paging', 'ui.bootstrap.tabindex'])

.controller('UibPagerController', ['$scope', '$attrs', 'uibPaging', 'uibPagerConfig', function($scope, $attrs, uibPaging, uibPagerConfig) {
  $scope.align = angular.isDefined($attrs.align) ? $scope.$parent.$eval($attrs.align) : uibPagerConfig.align;

  uibPaging.create(this, $scope, $attrs);
}])

.constant('uibPagerConfig', {
  itemsPerPage: 10,
  previousText: '« Previous',
  nextText: 'Next »',
  align: true
})

.directive('uibPager', ['uibPagerConfig', function(uibPagerConfig) {
  return {
    scope: {
      totalItems: '=',
      previousText: '@',
      nextText: '@',
      ngDisabled: '='
    },
    require: ['uibPager', '?ngModel'],
    restrict: 'A',
    controller: 'UibPagerController',
    controllerAs: 'pager',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/pager/pager.html';
    },
    link: function(scope, element, attrs, ctrls) {
      element.addClass('pager');
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
        return; // do nothing if no ng-model
      }

      paginationCtrl.init(ngModelCtrl, uibPagerConfig);
    }
  };
}]);

angular.module('ui.bootstrap.pagination', ['ui.bootstrap.paging', 'ui.bootstrap.tabindex'])
.controller('UibPaginationController', ['$scope', '$attrs', '$parse', 'uibPaging', 'uibPaginationConfig', function($scope, $attrs, $parse, uibPaging, uibPaginationConfig) {
  var ctrl = this;
  // Setup configuration parameters
  var maxSize = angular.isDefined($attrs.maxSize) ? $scope.$parent.$eval($attrs.maxSize) : uibPaginationConfig.maxSize,
    rotate = angular.isDefined($attrs.rotate) ? $scope.$parent.$eval($attrs.rotate) : uibPaginationConfig.rotate,
    forceEllipses = angular.isDefined($attrs.forceEllipses) ? $scope.$parent.$eval($attrs.forceEllipses) : uibPaginationConfig.forceEllipses,
    boundaryLinkNumbers = angular.isDefined($attrs.boundaryLinkNumbers) ? $scope.$parent.$eval($attrs.boundaryLinkNumbers) : uibPaginationConfig.boundaryLinkNumbers,
    pageLabel = angular.isDefined($attrs.pageLabel) ? function(idx) { return $scope.$parent.$eval($attrs.pageLabel, {$page: idx}); } : angular.identity;
  $scope.boundaryLinks = angular.isDefined($attrs.boundaryLinks) ? $scope.$parent.$eval($attrs.boundaryLinks) : uibPaginationConfig.boundaryLinks;
  $scope.directionLinks = angular.isDefined($attrs.directionLinks) ? $scope.$parent.$eval($attrs.directionLinks) : uibPaginationConfig.directionLinks;
  $attrs.$set('role', 'menu');

  uibPaging.create(this, $scope, $attrs);

  if ($attrs.maxSize) {
    ctrl._watchers.push($scope.$parent.$watch($parse($attrs.maxSize), function(value) {
      maxSize = parseInt(value, 10);
      ctrl.render();
    }));
  }

  // Create page object used in template
  function makePage(number, text, isActive) {
    return {
      number: number,
      text: text,
      active: isActive
    };
  }

  function getPages(currentPage, totalPages) {
    var pages = [];

    // Default page limits
    var startPage = 1, endPage = totalPages;
    var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;

    // recompute if maxSize
    if (isMaxSized) {
      if (rotate) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
        endPage = startPage + maxSize - 1;

        // Adjust if limit is exceeded
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - maxSize + 1;
        }
      } else {
        // Visible pages are paginated with maxSize
        startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;

        // Adjust last page if limit is exceeded
        endPage = Math.min(startPage + maxSize - 1, totalPages);
      }
    }

    // Add page number links
    for (var number = startPage; number <= endPage; number++) {
      var page = makePage(number, pageLabel(number), number === currentPage);
      pages.push(page);
    }

    // Add links to move between page sets
    if (isMaxSized && maxSize > 0 && (!rotate || forceEllipses || boundaryLinkNumbers)) {
      if (startPage > 1) {
        if (!boundaryLinkNumbers || startPage > 3) { //need ellipsis for all options unless range is too close to beginning
        var previousPageSet = makePage(startPage - 1, '...', false);
        pages.unshift(previousPageSet);
      }
        if (boundaryLinkNumbers) {
          if (startPage === 3) { //need to replace ellipsis when the buttons would be sequential
            var secondPageLink = makePage(2, '2', false);
            pages.unshift(secondPageLink);
          }
          //add the first page
          var firstPageLink = makePage(1, '1', false);
          pages.unshift(firstPageLink);
        }
      }

      if (endPage < totalPages) {
        if (!boundaryLinkNumbers || endPage < totalPages - 2) { //need ellipsis for all options unless range is too close to end
        var nextPageSet = makePage(endPage + 1, '...', false);
        pages.push(nextPageSet);
      }
        if (boundaryLinkNumbers) {
          if (endPage === totalPages - 2) { //need to replace ellipsis when the buttons would be sequential
            var secondToLastPageLink = makePage(totalPages - 1, totalPages - 1, false);
            pages.push(secondToLastPageLink);
          }
          //add the last page
          var lastPageLink = makePage(totalPages, totalPages, false);
          pages.push(lastPageLink);
        }
      }
    }
    return pages;
  }

  var originalRender = this.render;
  this.render = function() {
    originalRender();
    if ($scope.page > 0 && $scope.page <= $scope.totalPages) {
      $scope.pages = getPages($scope.page, $scope.totalPages);
    }
  };
}])

.constant('uibPaginationConfig', {
  itemsPerPage: 10,
  boundaryLinks: false,
  boundaryLinkNumbers: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: true,
  forceEllipses: false
})

.directive('uibPagination', ['$parse', 'uibPaginationConfig', function($parse, uibPaginationConfig) {
  return {
    scope: {
      totalItems: '=',
      firstText: '@',
      previousText: '@',
      nextText: '@',
      lastText: '@',
      ngDisabled:'='
    },
    require: ['uibPagination', '?ngModel'],
    restrict: 'A',
    controller: 'UibPaginationController',
    controllerAs: 'pagination',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/pagination/pagination.html';
    },
    link: function(scope, element, attrs, ctrls) {
      element.addClass('pagination');
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
         return; // do nothing if no ng-model
      }

      paginationCtrl.init(ngModelCtrl, uibPaginationConfig);
    }
  };
}]);

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module('ui.bootstrap.tooltip', ['ui.bootstrap.position', 'ui.bootstrap.stackedMap'])

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider('$uibTooltip', function() {
  // The default options tooltip and popover.
  var defaultOptions = {
    placement: 'top',
    placementClassPrefix: 'bs-tooltip-',
    animation: true,
    popupDelay: 0,
    popupCloseDelay: 0,
    useContentExp: false
  };

  // Default hide triggers for each show trigger
  var triggerMap = {
    'mouseenter': 'mouseleave',
    'click': 'click',
    'outsideClick': 'outsideClick',
    'focus': 'blur',
    'none': ''
  };

  // The options specified to the provider globally.
  var globalOptions = {};

  /**
   * `options({})` allows global configuration of all tooltips in the
   * application.
   *
   *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
   */
	this.options = function(value) {
		angular.extend(globalOptions, value);
	};

  /**
   * This allows you to extend the set of trigger mappings available. E.g.:
   *
   *   $tooltipProvider.setTriggers( { 'openTrigger': 'closeTrigger' } );
   */
  this.setTriggers = function setTriggers(triggers) {
    angular.extend(triggerMap, triggers);
  };

  /**
   * This is a helper function for translating camel-case to snake_case.
   */
  function snake_case(name) {
    var regexp = /[A-Z]/g;
    var separator = '-';
    return name.replace(regexp, function(letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }

  /**
   * Returns the actual instance of the $tooltip service.
   * TODO support multiple triggers
   */
  this.$get = ['$window', '$compile', '$timeout', '$document', '$uibPosition', '$interpolate', '$rootScope', '$parse', '$$stackedMap', function($window, $compile, $timeout, $document, $position, $interpolate, $rootScope, $parse, $$stackedMap) {
    var openedTooltips = $$stackedMap.createNew();
    $document.on('keyup', keypressListener);

    $rootScope.$on('$destroy', function() {
      $document.off('keyup', keypressListener);
    });

    function keypressListener(e) {
      if (e.which === 27) {
        var last = openedTooltips.top();
        if (last) {
          last.value.close();
          last = null;
        }
      }
    }

    return function $tooltip(ttType, prefix, defaultTriggerShow, options) {
      options = angular.extend({}, defaultOptions, globalOptions, options);

      /**
       * Returns an object of show and hide triggers.
       *
       * If a trigger is supplied,
       * it is used to show the tooltip; otherwise, it will use the `trigger`
       * option passed to the `$tooltipProvider.options` method; else it will
       * default to the trigger supplied to this directive factory.
       *
       * The hide trigger is based on the show trigger. If the `trigger` option
       * was passed to the `$tooltipProvider.options` method, it will use the
       * mapped trigger from `triggerMap` or the passed trigger if the map is
       * undefined; otherwise, it uses the `triggerMap` value of the show
       * trigger; else it will just use the show trigger.
       */
      function getTriggers(trigger) {
        var show = (trigger || options.trigger || defaultTriggerShow).split(' ');
        var hide = show.map(function(trigger) {
          return triggerMap[trigger] || trigger;
        });
        return {
          show: show,
          hide: hide
        };
      }

      var directiveName = snake_case(ttType);

      var startSym = $interpolate.startSymbol();
      var endSym = $interpolate.endSymbol();
      var template =
        '<div '+ directiveName + '-popup ' +
          'uib-title="' + startSym + 'title' + endSym + '" ' +
          (options.useContentExp ?
            'content-exp="contentExp()" ' :
            'content="' + startSym + 'content' + endSym + '" ') +
          'origin-scope="origScope" ' +
          'class="uib-position-measure ' + prefix + '" ' +
          'tooltip-animation-class="fade"' +
          'uib-tooltip-classes ' +
          'ng-class="{ show: isOpen }" ' +
          '>' +
        '</div>';

      return {
        compile: function(tElem, tAttrs) {
          var tooltipLinker = $compile(template);

          return function link(scope, element, attrs, tooltipCtrl) {
            var tooltip;
            var tooltipLinkedScope;
            var transitionTimeout;
            var showTimeout;
            var hideTimeout;
            var positionTimeout;
            var adjustmentTimeout;
            var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
            var triggers = getTriggers(undefined);
            var hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);
            var ttScope = scope.$new(true);
            var repositionScheduled = false;
            var isOpenParse = angular.isDefined(attrs[prefix + 'IsOpen']) ? $parse(attrs[prefix + 'IsOpen']) : false;
            var contentParse = options.useContentExp ? $parse(attrs[ttType]) : false;
            var observers = [];
            var lastPlacement;

            var positionTooltip = function() {
              // check if tooltip exists and is not empty
              if (!tooltip || !tooltip.html()) { return; }

              if (!positionTimeout) {
                positionTimeout = $timeout(function() {
                  var placementClasses = $position.parsePlacement(ttScope.placement);
                  var placement = placementClasses[1] === 'center' ? placementClasses[0] : placementClasses[0] + '-' + placementClasses[1];
				  
                  // need to add classes prior to placement to allow correct tooltip width calculations
                  if (!tooltip.hasClass(placementClasses[0])) {
                    tooltip.removeClass(lastPlacement.split('-')[0]);
                    tooltip.addClass(placementClasses[0]);
                  }

                  if (!tooltip.hasClass(options.placementClassPrefix + placement)) {
                    tooltip.removeClass(options.placementClassPrefix + lastPlacement);
                    tooltip.addClass(options.placementClassPrefix + placement);
                  }
                  
                  // Take into account tooltup margins, since boostrap css draws tooltip arrow inside margins
                  var ttPosition = $position.positionElements(element, tooltip, ttScope.placement, appendToBody, true);
                  var initialHeight = angular.isDefined(tooltip.offsetHeight) ? tooltip.offsetHeight : tooltip.prop('offsetHeight');
                  var elementPos = appendToBody ? $position.offset(element) : $position.position(element);
                  tooltip.css({ top: ttPosition.top + 'px', left: ttPosition.left + 'px' });

                  adjustmentTimeout = $timeout(function() {
                    var currentHeight = angular.isDefined(tooltip.offsetHeight) ? tooltip.offsetHeight : tooltip.prop('offsetHeight');
                    var adjustment = $position.adjustTop(placementClasses, elementPos, initialHeight, currentHeight);
                    if (adjustment) {
                      tooltip.css(adjustment);
                    }
                    adjustmentTimeout = null;
                  }, 0, false);

                  // first time through tt element will have the
                  // uib-position-measure class or if the placement
                  // has changed we need to position the arrow.
                  if (tooltip.hasClass('uib-position-measure')) {
                    $position.positionArrow(tooltip, ttPosition.placement);
                    tooltip.removeClass('uib-position-measure');
                  } else if (lastPlacement !== ttPosition.placement) {
                    $position.positionArrow(tooltip, ttPosition.placement);
                  }
                  lastPlacement = ttPosition.placement;

                  positionTimeout = null;
                }, 0, false);
              }
            };

            // Set up the correct scope to allow transclusion later
            ttScope.origScope = scope;

            // By default, the tooltip is not open.
            // TODO add ability to start tooltip opened
            ttScope.isOpen = false;

            function toggleTooltipBind() {
              if (!ttScope.isOpen) {
                showTooltipBind();
              } else {
                hideTooltipBind();
              }
            }

            // Show the tooltip with delay if specified, otherwise show it immediately
            function showTooltipBind() {
              if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
                return;
              }

              cancelHide();
              prepareTooltip();

              if (ttScope.popupDelay) {
                // Do nothing if the tooltip was already scheduled to pop-up.
                // This happens if show is triggered multiple times before any hide is triggered.
                if (!showTimeout) {
                  showTimeout = $timeout(show, ttScope.popupDelay, false);
                }
              } else {
                show();
              }
            }

            function hideTooltipBind() {
              cancelShow();

              if (ttScope.popupCloseDelay) {
                if (!hideTimeout) {
                  hideTimeout = $timeout(hide, ttScope.popupCloseDelay, false);
                }
              } else {
                hide();
              }
            }

            // Show the tooltip popup element.
            function show() {
              cancelShow();
              cancelHide();

              // Don't show empty tooltips.
              if (!ttScope.content) {
                return angular.noop;
              }

              createTooltip();

              // And show the tooltip.
              ttScope.$evalAsync(function() {
                ttScope.isOpen = true;
                assignIsOpen(true);
                positionTooltip();
              });
            }

            function cancelShow() {
              if (showTimeout) {
                $timeout.cancel(showTimeout);
                showTimeout = null;
              }

              if (positionTimeout) {
                $timeout.cancel(positionTimeout);
                positionTimeout = null;
              }
            }

            // Hide the tooltip popup element.
            function hide() {
              if (!ttScope) {
                return;
              }

              // First things first: we don't show it anymore.
              ttScope.$evalAsync(function() {
                if (ttScope) {
                  ttScope.isOpen = false;
                  assignIsOpen(false);
                  // And now we remove it from the DOM. However, if we have animation, we
                  // need to wait for it to expire beforehand.
                  // FIXME: this is a placeholder for a port of the transitions library.
                  // The fade transition in TWBS is 150ms.
                  if (ttScope.animation) {
                    if (!transitionTimeout) {
                      transitionTimeout = $timeout(removeTooltip, 150, false);
                    }
                  } else {
                    removeTooltip();
                  }
                }
              });
            }

            function cancelHide() {
              if (hideTimeout) {
                $timeout.cancel(hideTimeout);
                hideTimeout = null;
              }

              if (transitionTimeout) {
                $timeout.cancel(transitionTimeout);
                transitionTimeout = null;
              }
            }

            function createTooltip() {
              // There can only be one tooltip element per directive shown at once.
              if (tooltip) {
                return;
              }

              tooltipLinkedScope = ttScope.$new();
              tooltip = tooltipLinker(tooltipLinkedScope, function(tooltip) {
                if (appendToBody) {
                  $document.find('body').append(tooltip);
                } else {
                  element.after(tooltip);
                }
              });

              openedTooltips.add(ttScope, {
                close: hide
              });

              prepObservers();
            }

            function removeTooltip() {
              cancelShow();
              cancelHide();
              unregisterObservers();

              if (tooltip) {
                tooltip.remove();

                tooltip = null;
                if (adjustmentTimeout) {
                  $timeout.cancel(adjustmentTimeout);
                }
              }

              openedTooltips.remove(ttScope);

              if (tooltipLinkedScope) {
                tooltipLinkedScope.$destroy();
                tooltipLinkedScope = null;
              }
            }

            /**
             * Set the initial scope values. Once
             * the tooltip is created, the observers
             * will be added to keep things in sync.
             */
            function prepareTooltip() {
              ttScope.title = attrs[prefix + 'Title'];
              if (contentParse) {
                ttScope.content = contentParse(scope);
              } else {
                ttScope.content = attrs[ttType];
              }

              ttScope.popupClass = attrs[prefix + 'Class'];
              ttScope.placement = angular.isDefined(attrs[prefix + 'Placement']) ? attrs[prefix + 'Placement'] : options.placement;
              var placement = $position.parsePlacement(ttScope.placement);
              lastPlacement = placement[1] ? placement[0] + '-' + placement[1] : placement[0];

              var delay = parseInt(attrs[prefix + 'PopupDelay'], 10);
              var closeDelay = parseInt(attrs[prefix + 'PopupCloseDelay'], 10);
              ttScope.popupDelay = !isNaN(delay) ? delay : options.popupDelay;
              ttScope.popupCloseDelay = !isNaN(closeDelay) ? closeDelay : options.popupCloseDelay;
            }

            function assignIsOpen(isOpen) {
              if (isOpenParse && angular.isFunction(isOpenParse.assign)) {
                isOpenParse.assign(scope, isOpen);
              }
            }

            ttScope.contentExp = function() {
              return ttScope.content;
            };

            /**
             * Observe the relevant attributes.
             */
            attrs.$observe('disabled', function(val) {
              if (val) {
                cancelShow();
              }

              if (val && ttScope.isOpen) {
                hide();
              }
            });

            if (isOpenParse) {
              scope.$watch(isOpenParse, function(val) {
                if (ttScope && !val === ttScope.isOpen) {
                  toggleTooltipBind();
                }
              });
            }

            function prepObservers() {
              observers.length = 0;

              if (contentParse) {
                observers.push(
                  scope.$watch(contentParse, function(val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    }
                  })
                );

                observers.push(
                  tooltipLinkedScope.$watch(function() {
                    if (!repositionScheduled) {
                      repositionScheduled = true;
                      tooltipLinkedScope.$$postDigest(function() {
                        repositionScheduled = false;
                        if (ttScope && ttScope.isOpen) {
                          positionTooltip();
                        }
                      });
                    }
                  })
                );
              } else {
                observers.push(
                  attrs.$observe(ttType, function(val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    } else {
                      positionTooltip();
                    }
                  })
                );
              }

              observers.push(
                attrs.$observe(prefix + 'Title', function(val) {
                  ttScope.title = val;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );

              observers.push(
                attrs.$observe(prefix + 'Placement', function(val) {
                  ttScope.placement = val ? val : options.placement;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );
            }

            function unregisterObservers() {
              if (observers.length) {
                angular.forEach(observers, function(observer) {
                  observer();
                });
                observers.length = 0;
              }
            }

            // hide tooltips/popovers for outsideClick trigger
            function bodyHideTooltipBind(e) {
              if (!ttScope || !ttScope.isOpen || !tooltip) {
                return;
              }
              // make sure the tooltip/popover link or tool tooltip/popover itself were not clicked
              if (!element[0].contains(e.target) && !tooltip[0].contains(e.target)) {
                hideTooltipBind();
              }
            }

            // KeyboardEvent handler to hide the tooltip on Escape key press
            function hideOnEscapeKey(e) {
              if (e.which === 27) {
                hideTooltipBind();
              }
            }

            var unregisterTriggers = function() {
              triggers.show.forEach(function(trigger) {
                if (trigger === 'outsideClick') {
                  element.off('click', toggleTooltipBind);
                } else {
                  element.off(trigger, showTooltipBind);
                  element.off(trigger, toggleTooltipBind);
                }
                element.off('keypress', hideOnEscapeKey);
              });
              triggers.hide.forEach(function(trigger) {
                if (trigger === 'outsideClick') {
                  $document.off('click', bodyHideTooltipBind);
                } else {
                  element.off(trigger, hideTooltipBind);
                }
              });
            };

            function prepTriggers() {
              var showTriggers = [], hideTriggers = [];
              var val = scope.$eval(attrs[prefix + 'Trigger']);
              unregisterTriggers();

              if (angular.isObject(val)) {
                Object.keys(val).forEach(function(key) {
                  showTriggers.push(key);
                  hideTriggers.push(val[key]);
                });
                triggers = {
                  show: showTriggers,
                  hide: hideTriggers
                };
              } else {
                triggers = getTriggers(val);
              }

              if (triggers.show !== 'none') {
                triggers.show.forEach(function(trigger, idx) {
                  if (trigger === 'outsideClick') {
                    element.on('click', toggleTooltipBind);
                    $document.on('click', bodyHideTooltipBind);
                  } else if (trigger === triggers.hide[idx]) {
                    element.on(trigger, toggleTooltipBind);
                  } else if (trigger) {
                    element.on(trigger, showTooltipBind);
                    element.on(triggers.hide[idx], hideTooltipBind);
                  }
                  element.on('keypress', hideOnEscapeKey);
                });
              }
            }

            prepTriggers();

            var animation = scope.$eval(attrs[prefix + 'Animation']);
            ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;

            var appendToBodyVal;
            var appendKey = prefix + 'AppendToBody';
            if (appendKey in attrs && attrs[appendKey] === undefined) {
              appendToBodyVal = true;
            } else {
              appendToBodyVal = scope.$eval(attrs[appendKey]);
            }

            appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;

            // Make sure tooltip is destroyed and removed.
            scope.$on('$destroy', function onDestroyTooltip() {
              unregisterTriggers();
              removeTooltip();
              ttScope = null;
            });
          };
        }
      };
    };
  }];
})

// This is mostly ngInclude code but with a custom scope
.directive('uibTooltipTemplateTransclude', [
         '$animate', '$sce', '$compile', '$templateRequest',
function ($animate, $sce, $compile, $templateRequest) {
  return {
    link: function(scope, elem, attrs) {
      var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

      var changeCounter = 0,
        currentScope,
        previousElement,
        currentElement;

      var cleanupLastIncludeContent = function() {
        if (previousElement) {
          previousElement.remove();
          previousElement = null;
        }

        if (currentScope) {
          currentScope.$destroy();
          currentScope = null;
        }

        if (currentElement) {
          $animate.leave(currentElement).then(function() {
            previousElement = null;
          });
          previousElement = currentElement;
          currentElement = null;
        }
      };

      scope.$watch($sce.parseAsResourceUrl(attrs.uibTooltipTemplateTransclude), function(src) {
        var thisChangeId = ++changeCounter;

        if (src) {
          //set the 2nd param to true to ignore the template request error so that the inner
          //contents and scope can be cleaned up.
          $templateRequest(src, true).then(function(response) {
            if (thisChangeId !== changeCounter) { return; }
            var newScope = origScope.$new();
            var template = response;

            var clone = $compile(template)(newScope, function(clone) {
              cleanupLastIncludeContent();
              $animate.enter(clone, elem);
            });

            currentScope = newScope;
            currentElement = clone;

            currentScope.$emit('$includeContentLoaded', src);
          }, function() {
            if (thisChangeId === changeCounter) {
              cleanupLastIncludeContent();
              scope.$emit('$includeContentError', src);
            }
          });
          scope.$emit('$includeContentRequested', src);
        } else {
          cleanupLastIncludeContent();
        }
      });

      scope.$on('$destroy', cleanupLastIncludeContent);
    }
  };
}])

/**
 * Note that it's intentional that these classes are *not* applied through $animate.
 * They must not be animated as they're expected to be present on the tooltip on
 * initialization.
 */
.directive('uibTooltipClasses', ['$uibPosition', function($uibPosition) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // need to set the primary position so the
      // arrow has space during position measure.
      // tooltip.positionTooltip()
      if (scope.placement) {
        // // There are no top-left etc... classes
        // // in TWBS, so we need the primary position.
        var position = $uibPosition.parsePlacement(scope.placement);
        element.addClass(position[0]);
      }

      if (scope.popupClass) {
        element.addClass(scope.popupClass);
      }

      if (scope.animation) {
        element.addClass(attrs.tooltipAnimationClass);
      }
    }
  };
}])

.directive('uibTooltipPopup', function() {
  return {
    restrict: 'A',
    scope: { content: '@' },
    templateUrl: 'uib/template/tooltip/tooltip-popup.html'
  };
})

.directive('uibTooltip', [ '$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltip', 'tooltip', 'mouseenter');
}])

.directive('uibTooltipTemplatePopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&', originScope: '&' },
    templateUrl: 'uib/template/tooltip/tooltip-template-popup.html'
  };
})

.directive('uibTooltipTemplate', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltipTemplate', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}])

.directive('uibTooltipHtmlPopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&' },
    templateUrl: 'uib/template/tooltip/tooltip-html-popup.html'
  };
})

.directive('uibTooltipHtml', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltipHtml', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}]);

/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, and selector delegatation.
 */
angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip'])

.directive('uibPopoverTemplatePopup', function() {
  return {
    restrict: 'A',
    scope: { uibTitle: '@', contentExp: '&', originScope: '&' },
    templateUrl: 'uib/template/popover/popover-template.html'
  };
})

.directive('uibPopoverTemplate', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopoverTemplate', 'popover', 'click', {
    placementClassPrefix: 'bs-popover-',
    useContentExp: true
  });
}])

.directive('uibPopoverHtmlPopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&', uibTitle: '@' },
    templateUrl: 'uib/template/popover/popover-html.html'
  };
})

.directive('uibPopoverHtml', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopoverHtml', 'popover', 'click', {
    placementClassPrefix: 'bs-popover-',
    useContentExp: true
  });
}])

.directive('uibPopoverPopup', function() {
  return {
    restrict: 'A',
    scope: { uibTitle: '@', content: '@' },
    templateUrl: 'uib/template/popover/popover.html'
  };
})

.directive('uibPopover', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopover', 'popover', 'click', {
    placementClassPrefix: 'bs-popover-'
  });
}]);

angular.module('ui.bootstrap.progressbar', [])

.constant('uibProgressConfig', {
  animate: true,
  max: 100
})

.controller('UibProgressController', ['$scope', '$attrs', 'uibProgressConfig', function($scope, $attrs, progressConfig) {
  var self = this,
      animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

  this.bars = [];
  $scope.max = getMaxOrDefault();

  this.addBar = function(bar, element, attrs) {
    if (!animate) {
      element.css({'transition': 'none'});
    }

    this.bars.push(bar);

    bar.max = getMaxOrDefault();
    bar.title = attrs && angular.isDefined(attrs.title) ? attrs.title : 'progressbar';

    bar.$watch('value', function(value) {
      bar.recalculatePercentage();
    });

    bar.recalculatePercentage = function() {
      var totalPercentage = self.bars.reduce(function(total, bar) {
        bar.percent = +(100 * bar.value / bar.max).toFixed(2);
        return total + bar.percent;
      }, 0);

      if (totalPercentage > 100) {
        bar.percent -= totalPercentage - 100;
      }
    };

    bar.$on('$destroy', function() {
      element = null;
      self.removeBar(bar);
    });
  };

  this.removeBar = function(bar) {
    this.bars.splice(this.bars.indexOf(bar), 1);
    this.bars.forEach(function (bar) {
      bar.recalculatePercentage();
    });
  };

  //$attrs.$observe('maxParam', function(maxParam) {
  $scope.$watch('maxParam', function(maxParam) {
    self.bars.forEach(function(bar) {
      bar.max = getMaxOrDefault();
      bar.recalculatePercentage();
    });
  });

  function getMaxOrDefault () {
    return angular.isDefined($scope.maxParam) ? $scope.maxParam : progressConfig.max;
  }
}])

.directive('uibProgress', function() {
  return {
    replace: true,
    transclude: true,
    controller: 'UibProgressController',
    require: 'uibProgress',
    scope: {
      maxParam: '=?max'
    },
    templateUrl: 'uib/template/progressbar/progress.html'
  };
})

.directive('uibBar', function() {
  return {
    replace: true,
    transclude: true,
    require: '^uibProgress',
    scope: {
      value: '=',
      type: '@',
      striped: '=?'
    },
    templateUrl: 'uib/template/progressbar/bar.html',
    link: function(scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, element, attrs);
    }
  };
})

.directive('uibProgressbar', function() {
  return {
    replace: true,
    transclude: true,
    controller: 'UibProgressController',
    scope: {
      value: '=',
      maxParam: '=?max',
      type: '@',
      striped: '=?'
    },
    templateUrl: 'uib/template/progressbar/progressbar.html',
    link: function(scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, angular.element(element.children()[0]), {title: attrs.title});
    }
  };
});

angular.module('ui.bootstrap.rating', [])

.constant('uibRatingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null,
  enableReset: true,
  titles: ['one', 'two', 'three', 'four', 'five']
})

.controller('UibRatingController', ['$scope', '$attrs', 'uibRatingConfig', function($scope, $attrs, ratingConfig) {
  var ngModelCtrl = { $setViewValue: angular.noop },
    self = this;

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.push(function(value) {
      if (angular.isNumber(value) && value << 0 !== value) {
        value = Math.round(value);
      }

      return value;
    });

    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
    this.enableReset = angular.isDefined($attrs.enableReset) ?
      $scope.$parent.$eval($attrs.enableReset) : ratingConfig.enableReset;
    var tmpTitles = angular.isDefined($attrs.titles) ? $scope.$parent.$eval($attrs.titles) : ratingConfig.titles;
    this.titles = angular.isArray(tmpTitles) && tmpTitles.length > 0 ?
      tmpTitles : ratingConfig.titles;

    var ratingStates = angular.isDefined($attrs.ratingStates) ?
      $scope.$parent.$eval($attrs.ratingStates) :
      new Array(angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max);
    $scope.range = this.buildTemplateObjects(ratingStates);
  };

  this.buildTemplateObjects = function(states) {
    for (var i = 0, n = states.length; i < n; i++) {
      states[i] = angular.extend({ index: i }, { stateOn: this.stateOn, stateOff: this.stateOff, title: this.getTitle(i) }, states[i]);
    }
    return states;
  };

  this.getTitle = function(index) {
    if (index >= this.titles.length) {
      return index + 1;
    }

    return this.titles[index];
  };

  $scope.rate = function(value) {
    if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
      var newViewValue = self.enableReset && ngModelCtrl.$viewValue === value ? 0 : value;
      ngModelCtrl.$setViewValue(newViewValue);
      ngModelCtrl.$render();
    }
  };

  $scope.enter = function(value) {
    if (!$scope.readonly) {
      $scope.value = value;
    }
    $scope.onHover({value: value});
  };

  $scope.reset = function() {
    $scope.value = ngModelCtrl.$viewValue;
    $scope.onLeave();
  };

  $scope.onKeydown = function(evt) {
    if (/(37|38|39|40)/.test(evt.which)) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? 1 : -1));
    }
  };

  this.render = function() {
    $scope.value = ngModelCtrl.$viewValue;
    $scope.title = self.getTitle($scope.value - 1);
  };
}])

.directive('uibRating', function() {
  return {
    require: ['uibRating', 'ngModel'],
    restrict: 'A',
    scope: {
      readonly: '=?readOnly',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'UibRatingController',
    templateUrl: 'uib/template/rating/rating.html',
    link: function(scope, element, attrs, ctrls) {
      var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      ratingCtrl.init(ngModelCtrl);
    }
  };
});

angular.module('ui.bootstrap.tabs', [])

.controller('UibTabsetController', ['$scope', function ($scope) {
  var ctrl = this,
    oldIndex;
  ctrl.tabs = [];

  ctrl.select = function(index, evt) {
    if (!destroyed) {
      var previousIndex = findTabIndex(oldIndex);
      var previousSelected = ctrl.tabs[previousIndex];
      if (previousSelected) {
        previousSelected.tab.onDeselect({
          $event: evt,
          $selectedIndex: index
        });
        if (evt && evt.isDefaultPrevented()) {
          return;
        }
        previousSelected.tab.active = false;
      }

      var selected = ctrl.tabs[index];
      if (selected) {
        selected.tab.onSelect({
          $event: evt
        });
        selected.tab.active = true;
        ctrl.active = selected.index;
        oldIndex = selected.index;
      } else if (!selected && angular.isDefined(oldIndex)) {
        ctrl.active = null;
        oldIndex = null;
      }
    }
  };

  ctrl.addTab = function addTab(tab) {
    ctrl.tabs.push({
      tab: tab,
      index: tab.index
    });
    ctrl.tabs.sort(function(t1, t2) {
      if (t1.index > t2.index) {
        return 1;
      }

      if (t1.index < t2.index) {
        return -1;
      }

      return 0;
    });

    if (tab.index === ctrl.active || !angular.isDefined(ctrl.active) && ctrl.tabs.length === 1) {
      var newActiveIndex = findTabIndex(tab.index);
      ctrl.select(newActiveIndex);
    }
  };

  ctrl.removeTab = function removeTab(tab) {
    var index;
    for (var i = 0; i < ctrl.tabs.length; i++) {
      if (ctrl.tabs[i].tab === tab) {
        index = i;
        break;
      }
    }

    if (ctrl.tabs[index].index === ctrl.active) {
      var newActiveTabIndex = index === ctrl.tabs.length - 1 ?
        index - 1 : index + 1 % ctrl.tabs.length;
      ctrl.select(newActiveTabIndex);
    }

    ctrl.tabs.splice(index, 1);
  };

  $scope.$watch('tabset.active', function(val) {
    if (angular.isDefined(val) && val !== oldIndex) {
      ctrl.select(findTabIndex(val));
    }
  });

  var destroyed;
  $scope.$on('$destroy', function() {
    destroyed = true;
  });

  function findTabIndex(index) {
    for (var i = 0; i < ctrl.tabs.length; i++) {
      if (ctrl.tabs[i].index === index) {
        return i;
      }
    }
  }
}])

.directive('uibTabset', function() {
  return {
    transclude: true,
    replace: true,
    scope: {},
    bindToController: {
      active: '=?',
      type: '@'
    },
    controller: 'UibTabsetController',
    controllerAs: 'tabset',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/tabs/tabset.html';
    },
    link: function(scope, element, attrs) {
      scope.vertical = angular.isDefined(attrs.vertical) ?
        scope.$parent.$eval(attrs.vertical) : false;
      scope.justified = angular.isDefined(attrs.justified) ?
        scope.$parent.$eval(attrs.justified) : false;
    }
  };
})

.directive('uibTab', ['$parse', function($parse) {
  return {
    require: '^uibTabset',
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/tabs/tab.html';
    },
    transclude: true,
    scope: {
      heading: '@',
      index: '=?',
      classes: '@?',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
                          //once it inserts the tab's content into the dom
      onDeselect: '&deselect'
    },
    controller: function() {
      //Empty controller so other directives can require being 'under' a tab
    },
    controllerAs: 'tab',
    link: function(scope, elm, attrs, tabsetCtrl, transclude) {
      scope.disabled = false;
      if (attrs.disable) {
        scope.$parent.$watch($parse(attrs.disable), function(value) {
          scope.disabled = !! value;
        });
      }

      if (angular.isUndefined(attrs.index)) {
        if (tabsetCtrl.tabs && tabsetCtrl.tabs.length) {
          scope.index = Math.max.apply(null, tabsetCtrl.tabs.map(function(t) { return t.index; })) + 1;
        } else {
          scope.index = 0;
        }
      }

      if (angular.isUndefined(attrs.classes)) {
        scope.classes = '';
      }

      scope.select = function(evt) {
        if (!scope.disabled) {
          var index;
          for (var i = 0; i < tabsetCtrl.tabs.length; i++) {
            if (tabsetCtrl.tabs[i].tab === scope) {
              index = i;
              break;
            }
          }

          tabsetCtrl.select(index, evt);
        }
      };

      tabsetCtrl.addTab(scope);
      scope.$on('$destroy', function() {
        tabsetCtrl.removeTab(scope);
      });

      //We need to transclude later, once the content container is ready.
      //when this link happens, we're inside a tab heading.
      scope.$transcludeFn = transclude;
    }
  };
}])

.directive('uibTabHeadingTransclude', function() {
  return {
    restrict: 'A',
    require: '^uibTab',
    link: function(scope, elm) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
})

.directive('uibTabContentTransclude', function() {
  return {
    restrict: 'A',
    require: '^uibTabset',
    link: function(scope, elm, attrs) {
      var tab = scope.$eval(attrs.uibTabContentTransclude).tab;

      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };

  function isTabHeading(node) {
    return node.tagName && (
      node.hasAttribute('uib-tab-heading') ||
      node.hasAttribute('data-uib-tab-heading') ||
      node.hasAttribute('x-uib-tab-heading') ||
      node.tagName.toLowerCase() === 'uib-tab-heading' ||
      node.tagName.toLowerCase() === 'data-uib-tab-heading' ||
      node.tagName.toLowerCase() === 'x-uib-tab-heading' ||
      node.tagName.toLowerCase() === 'uib:tab-heading'
    );
  }
});

angular.module('ui.bootstrap.timepicker', [])

.constant('uibTimepickerConfig', {
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  showMeridian: true,
  showSeconds: false,
  meridians: null,
  readonlyInput: false,
  mousewheel: true,
  arrowkeys: true,
  showSpinners: true,
  templateUrl: 'uib/template/timepicker/timepicker.html'
})

.controller('UibTimepickerController', ['$scope', '$element', '$attrs', '$parse', '$log', '$locale', 'uibTimepickerConfig', function($scope, $element, $attrs, $parse, $log, $locale, timepickerConfig) {
  var hoursModelCtrl, minutesModelCtrl, secondsModelCtrl;
  var selected = new Date(),
    watchers = [],
    ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
    meridians = angular.isDefined($attrs.meridians) ? $scope.$parent.$eval($attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS,
    padHours = angular.isDefined($attrs.padHours) ? $scope.$parent.$eval($attrs.padHours) : true;

  $scope.tabindex = angular.isDefined($attrs.tabindex) ? $attrs.tabindex : 0;
  $element.removeAttr('tabindex');

  this.init = function(ngModelCtrl_, inputs) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.unshift(function(modelValue) {
      return modelValue ? new Date(modelValue) : null;
    });

    var hoursInputEl = inputs.eq(0),
        minutesInputEl = inputs.eq(1),
        secondsInputEl = inputs.eq(2);

    hoursModelCtrl = hoursInputEl.controller('ngModel');
    minutesModelCtrl = minutesInputEl.controller('ngModel');
    secondsModelCtrl = secondsInputEl.controller('ngModel');

    var mousewheel = angular.isDefined($attrs.mousewheel) ? $scope.$parent.$eval($attrs.mousewheel) : timepickerConfig.mousewheel;

    if (mousewheel) {
      this.setupMousewheelEvents(hoursInputEl, minutesInputEl, secondsInputEl);
    }

    var arrowkeys = angular.isDefined($attrs.arrowkeys) ? $scope.$parent.$eval($attrs.arrowkeys) : timepickerConfig.arrowkeys;
    if (arrowkeys) {
      this.setupArrowkeyEvents(hoursInputEl, minutesInputEl, secondsInputEl);
    }

    $scope.readonlyInput = angular.isDefined($attrs.readonlyInput) ? $scope.$parent.$eval($attrs.readonlyInput) : timepickerConfig.readonlyInput;
    this.setupInputEvents(hoursInputEl, minutesInputEl, secondsInputEl);
  };

  var hourStep = timepickerConfig.hourStep;
  if ($attrs.hourStep) {
    watchers.push($scope.$parent.$watch($parse($attrs.hourStep), function(value) {
      hourStep = +value;
    }));
  }

  var minuteStep = timepickerConfig.minuteStep;
  if ($attrs.minuteStep) {
    watchers.push($scope.$parent.$watch($parse($attrs.minuteStep), function(value) {
      minuteStep = +value;
    }));
  }

  var min;
  watchers.push($scope.$parent.$watch($parse($attrs.min), function(value) {
    var dt = new Date(value);
    min = isNaN(dt) ? undefined : dt;
  }));

  var max;
  watchers.push($scope.$parent.$watch($parse($attrs.max), function(value) {
    var dt = new Date(value);
    max = isNaN(dt) ? undefined : dt;
  }));

  var disabled = false;
  if ($attrs.ngDisabled) {
    watchers.push($scope.$parent.$watch($parse($attrs.ngDisabled), function(value) {
      disabled = value;
    }));
  }

  $scope.noIncrementHours = function() {
    var incrementedSelected = addMinutes(selected, hourStep * 60);
    return disabled || incrementedSelected > max ||
      incrementedSelected < selected && incrementedSelected < min;
  };

  $scope.noDecrementHours = function() {
    var decrementedSelected = addMinutes(selected, -hourStep * 60);
    return disabled || decrementedSelected < min ||
      decrementedSelected > selected && decrementedSelected > max;
  };

  $scope.noIncrementMinutes = function() {
    var incrementedSelected = addMinutes(selected, minuteStep);
    return disabled || incrementedSelected > max ||
      incrementedSelected < selected && incrementedSelected < min;
  };

  $scope.noDecrementMinutes = function() {
    var decrementedSelected = addMinutes(selected, -minuteStep);
    return disabled || decrementedSelected < min ||
      decrementedSelected > selected && decrementedSelected > max;
  };

  $scope.noIncrementSeconds = function() {
    var incrementedSelected = addSeconds(selected, secondStep);
    return disabled || incrementedSelected > max ||
      incrementedSelected < selected && incrementedSelected < min;
  };

  $scope.noDecrementSeconds = function() {
    var decrementedSelected = addSeconds(selected, -secondStep);
    return disabled || decrementedSelected < min ||
      decrementedSelected > selected && decrementedSelected > max;
  };

  $scope.noToggleMeridian = function() {
    if (selected.getHours() < 12) {
      return disabled || addMinutes(selected, 12 * 60) > max;
    }

    return disabled || addMinutes(selected, -12 * 60) < min;
  };

  var secondStep = timepickerConfig.secondStep;
  if ($attrs.secondStep) {
    watchers.push($scope.$parent.$watch($parse($attrs.secondStep), function(value) {
      secondStep = +value;
    }));
  }

  $scope.showSeconds = timepickerConfig.showSeconds;
  if ($attrs.showSeconds) {
    watchers.push($scope.$parent.$watch($parse($attrs.showSeconds), function(value) {
      $scope.showSeconds = !!value;
    }));
  }

  // 12H / 24H mode
  $scope.showMeridian = timepickerConfig.showMeridian;
  if ($attrs.showMeridian) {
    watchers.push($scope.$parent.$watch($parse($attrs.showMeridian), function(value) {
      $scope.showMeridian = !!value;

      if (ngModelCtrl.$error.time) {
        // Evaluate from template
        var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
        if (angular.isDefined(hours) && angular.isDefined(minutes)) {
          selected.setHours(hours);
          refresh();
        }
      } else {
        updateTemplate();
      }
    }));
  }

  // Get $scope.hours in 24H mode if valid
  function getHoursFromTemplate() {
    var hours = +$scope.hours;
    var valid = $scope.showMeridian ? hours > 0 && hours < 13 :
      hours >= 0 && hours < 24;
    if (!valid || $scope.hours === '') {
      return undefined;
    }

    if ($scope.showMeridian) {
      if (hours === 12) {
        hours = 0;
      }
      if ($scope.meridian === meridians[1]) {
        hours = hours + 12;
      }
    }
    return hours;
  }

  function getMinutesFromTemplate() {
    var minutes = +$scope.minutes;
    var valid = minutes >= 0 && minutes < 60;
    if (!valid || $scope.minutes === '') {
      return undefined;
    }
    return minutes;
  }

  function getSecondsFromTemplate() {
    var seconds = +$scope.seconds;
    return seconds >= 0 && seconds < 60 ? seconds : undefined;
  }

  function pad(value, noPad) {
    if (value === null) {
      return '';
    }

    return angular.isDefined(value) && value.toString().length < 2 && !noPad ?
      '0' + value : value.toString();
  }

  // Respond on mousewheel spin
  this.setupMousewheelEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
    var isScrollingUp = function(e) {
      if (e.originalEvent) {
        e = e.originalEvent;
      }
      //pick correct delta variable depending on event
      var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
      return e.detail || delta > 0;
    };

    hoursInputEl.on('mousewheel wheel', function(e) {
      if (!disabled) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementHours() : $scope.decrementHours());
      }
      e.preventDefault();
    });

    minutesInputEl.on('mousewheel wheel', function(e) {
      if (!disabled) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementMinutes() : $scope.decrementMinutes());
      }
      e.preventDefault();
    });

     secondsInputEl.on('mousewheel wheel', function(e) {
      if (!disabled) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementSeconds() : $scope.decrementSeconds());
      }
      e.preventDefault();
    });
  };

  // Respond on up/down arrowkeys
  this.setupArrowkeyEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
    hoursInputEl.on('keydown', function(e) {
      if (!disabled) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementHours();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementHours();
          $scope.$apply();
        }
      }
    });

    minutesInputEl.on('keydown', function(e) {
      if (!disabled) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementMinutes();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementMinutes();
          $scope.$apply();
        }
      }
    });

    secondsInputEl.on('keydown', function(e) {
      if (!disabled) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementSeconds();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementSeconds();
          $scope.$apply();
        }
      }
    });
  };

  this.setupInputEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
    if ($scope.readonlyInput) {
      $scope.updateHours = angular.noop;
      $scope.updateMinutes = angular.noop;
      $scope.updateSeconds = angular.noop;
      return;
    }

    var invalidate = function(invalidHours, invalidMinutes, invalidSeconds) {
      ngModelCtrl.$setViewValue(null);
      ngModelCtrl.$setValidity('time', false);
      if (angular.isDefined(invalidHours)) {
        $scope.invalidHours = invalidHours;
        if (hoursModelCtrl) {
          hoursModelCtrl.$setValidity('hours', false);
        }
      }

      if (angular.isDefined(invalidMinutes)) {
        $scope.invalidMinutes = invalidMinutes;
        if (minutesModelCtrl) {
          minutesModelCtrl.$setValidity('minutes', false);
        }
      }

      if (angular.isDefined(invalidSeconds)) {
        $scope.invalidSeconds = invalidSeconds;
        if (secondsModelCtrl) {
          secondsModelCtrl.$setValidity('seconds', false);
        }
      }
    };

    $scope.updateHours = function() {
      var hours = getHoursFromTemplate(),
        minutes = getMinutesFromTemplate();

      ngModelCtrl.$setDirty();

      if (angular.isDefined(hours) && angular.isDefined(minutes)) {
        selected.setHours(hours);
        selected.setMinutes(minutes);
        if (selected < min || selected > max) {
          invalidate(true);
        } else {
          refresh('h');
        }
      } else {
        invalidate(true);
      }
    };

    hoursInputEl.on('blur', function(e) {
      ngModelCtrl.$setTouched();
      if (modelIsEmpty()) {
        makeValid();
      } else if ($scope.hours === null || $scope.hours === '') {
        invalidate(true);
      } else if (!$scope.invalidHours && $scope.hours < 10) {
        $scope.$apply(function() {
          $scope.hours = pad($scope.hours, !padHours);
        });
      }
    });

    $scope.updateMinutes = function() {
      var minutes = getMinutesFromTemplate(),
        hours = getHoursFromTemplate();

      ngModelCtrl.$setDirty();

      if (angular.isDefined(minutes) && angular.isDefined(hours)) {
        selected.setHours(hours);
        selected.setMinutes(minutes);
        if (selected < min || selected > max) {
          invalidate(undefined, true);
        } else {
          refresh('m');
        }
      } else {
        invalidate(undefined, true);
      }
    };

    minutesInputEl.on('blur', function(e) {
      ngModelCtrl.$setTouched();
      if (modelIsEmpty()) {
        makeValid();
      } else if ($scope.minutes === null) {
        invalidate(undefined, true);
      } else if (!$scope.invalidMinutes && $scope.minutes < 10) {
        $scope.$apply(function() {
          $scope.minutes = pad($scope.minutes);
        });
      }
    });

    $scope.updateSeconds = function() {
      var seconds = getSecondsFromTemplate();

      ngModelCtrl.$setDirty();

      if (angular.isDefined(seconds)) {
        selected.setSeconds(seconds);
        refresh('s');
      } else {
        invalidate(undefined, undefined, true);
      }
    };

    secondsInputEl.on('blur', function(e) {
      if (modelIsEmpty()) {
        makeValid();
      } else if (!$scope.invalidSeconds && $scope.seconds < 10) {
        $scope.$apply( function() {
          $scope.seconds = pad($scope.seconds);
        });
      }
    });

  };

  this.render = function() {
    var date = ngModelCtrl.$viewValue;

    if (isNaN(date)) {
      ngModelCtrl.$setValidity('time', false);
      $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
    } else {
      if (date) {
        selected = date;
      }

      if (selected < min || selected > max) {
        ngModelCtrl.$setValidity('time', false);
        $scope.invalidHours = true;
        $scope.invalidMinutes = true;
      } else {
        makeValid();
      }
      updateTemplate();
    }
  };

  // Call internally when we know that model is valid.
  function refresh(keyboardChange) {
    makeValid();
    ngModelCtrl.$setViewValue(new Date(selected));
    updateTemplate(keyboardChange);
  }

  function makeValid() {
    if (hoursModelCtrl) {
      hoursModelCtrl.$setValidity('hours', true);
    }

    if (minutesModelCtrl) {
      minutesModelCtrl.$setValidity('minutes', true);
    }

    if (secondsModelCtrl) {
      secondsModelCtrl.$setValidity('seconds', true);
    }

    ngModelCtrl.$setValidity('time', true);
    $scope.invalidHours = false;
    $scope.invalidMinutes = false;
    $scope.invalidSeconds = false;
  }

  function updateTemplate(keyboardChange) {
    if (!ngModelCtrl.$modelValue) {
      $scope.hours = null;
      $scope.minutes = null;
      $scope.seconds = null;
      $scope.meridian = meridians[0];
    } else {
      var hours = selected.getHours(),
        minutes = selected.getMinutes(),
        seconds = selected.getSeconds();

      if ($scope.showMeridian) {
        hours = hours === 0 || hours === 12 ? 12 : hours % 12; // Convert 24 to 12 hour system
      }

      $scope.hours = keyboardChange === 'h' ? hours : pad(hours, !padHours);
      if (keyboardChange !== 'm') {
        $scope.minutes = pad(minutes);
      }
      $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];

      if (keyboardChange !== 's') {
        $scope.seconds = pad(seconds);
      }
      $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
    }
  }

  function addSecondsToSelected(seconds) {
    selected = addSeconds(selected, seconds);
    refresh();
  }

  function addMinutes(selected, minutes) {
    return addSeconds(selected, minutes*60);
  }

  function addSeconds(date, seconds) {
    var dt = new Date(date.getTime() + seconds * 1000);
    var newDate = new Date(date);
    newDate.setHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());
    return newDate;
  }

  function modelIsEmpty() {
    return ($scope.hours === null || $scope.hours === '') &&
      ($scope.minutes === null || $scope.minutes === '') &&
      (!$scope.showSeconds || $scope.showSeconds && ($scope.seconds === null || $scope.seconds === ''));
  }

  $scope.showSpinners = angular.isDefined($attrs.showSpinners) ?
    $scope.$parent.$eval($attrs.showSpinners) : timepickerConfig.showSpinners;

  $scope.incrementHours = function() {
    if (!$scope.noIncrementHours()) {
      addSecondsToSelected(hourStep * 60 * 60);
    }
  };

  $scope.decrementHours = function() {
    if (!$scope.noDecrementHours()) {
      addSecondsToSelected(-hourStep * 60 * 60);
    }
  };

  $scope.incrementMinutes = function() {
    if (!$scope.noIncrementMinutes()) {
      addSecondsToSelected(minuteStep * 60);
    }
  };

  $scope.decrementMinutes = function() {
    if (!$scope.noDecrementMinutes()) {
      addSecondsToSelected(-minuteStep * 60);
    }
  };

  $scope.incrementSeconds = function() {
    if (!$scope.noIncrementSeconds()) {
      addSecondsToSelected(secondStep);
    }
  };

  $scope.decrementSeconds = function() {
    if (!$scope.noDecrementSeconds()) {
      addSecondsToSelected(-secondStep);
    }
  };

  $scope.toggleMeridian = function() {
    var minutes = getMinutesFromTemplate(),
        hours = getHoursFromTemplate();

    if (!$scope.noToggleMeridian()) {
      if (angular.isDefined(minutes) && angular.isDefined(hours)) {
        addSecondsToSelected(12 * 60 * (selected.getHours() < 12 ? 60 : -60));
      } else {
        $scope.meridian = $scope.meridian === meridians[0] ? meridians[1] : meridians[0];
      }
    }
  };

  $scope.blur = function() {
    ngModelCtrl.$setTouched();
  };

  $scope.$on('$destroy', function() {
    while (watchers.length) {
      watchers.shift()();
    }
  });
}])

.directive('uibTimepicker', ['uibTimepickerConfig', function(uibTimepickerConfig) {
  return {
    require: ['uibTimepicker', '?^ngModel'],
    restrict: 'A',
    controller: 'UibTimepickerController',
    controllerAs: 'timepicker',
    scope: {},
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || uibTimepickerConfig.templateUrl;
    },
    link: function(scope, element, attrs, ctrls) {
      var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (ngModelCtrl) {
        timepickerCtrl.init(ngModelCtrl, element.find('input'));
      }
    }
  };
}]);

angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.debounce', 'ui.bootstrap.position'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('uibTypeaheadParser', ['$parse', function($parse) {
    //                      000001111111100000000000002222222200000000000000003333333333333330000000000044444444000
    var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
      parse: function(input) {
        var match = input.match(TYPEAHEAD_REGEXP);
        if (!match) {
          throw new Error(
            'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
              ' but got "' + input + '".');
        }

        return {
          itemName: match[3],
          source: $parse(match[4]),
          viewMapper: $parse(match[2] || match[1]),
          modelMapper: $parse(match[1])
        };
      }
    };
  }])

  .controller('UibTypeaheadController', ['$scope', '$element', '$attrs', '$compile', '$parse', '$q', '$timeout', '$document', '$window', '$rootScope', '$$debounce', '$uibPosition', 'uibTypeaheadParser',
    function(originalScope, element, attrs, $compile, $parse, $q, $timeout, $document, $window, $rootScope, $$debounce, $position, typeaheadParser) {
    var HOT_KEYS = [9, 13, 27, 38, 40];
    var eventDebounceTime = 200;
    var modelCtrl, ngModelOptions;
    //SUPPORTED ATTRIBUTES (OPTIONS)

    //minimal no of characters that needs to be entered before typeahead kicks-in
    var minLength = originalScope.$eval(attrs.typeaheadMinLength);
    if (!minLength && minLength !== 0) {
      minLength = 1;
    }

    originalScope.$watch(attrs.typeaheadMinLength, function (newVal) {
        minLength = !newVal && newVal !== 0 ? 1 : newVal;
    });

    //minimal wait time after last character typed before typeahead kicks-in
    var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

    //should it restrict model values to the ones selected from the popup only?
    var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;
    originalScope.$watch(attrs.typeaheadEditable, function (newVal) {
      isEditable = newVal !== false;
    });

    //binding to a variable that indicates if matches are being retrieved asynchronously
    var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

    //a function to determine if an event should cause selection
    var isSelectEvent = attrs.typeaheadShouldSelect ? $parse(attrs.typeaheadShouldSelect) : function(scope, vals) {
      var evt = vals.$event;
      return evt.which === 13 || evt.which === 9;
    };

    //a callback executed when a match is selected
    var onSelectCallback = $parse(attrs.typeaheadOnSelect);

    //should it select highlighted popup value when losing focus?
    var isSelectOnBlur = angular.isDefined(attrs.typeaheadSelectOnBlur) ? originalScope.$eval(attrs.typeaheadSelectOnBlur) : false;

    //binding to a variable that indicates if there were no results after the query is completed
    var isNoResultsSetter = $parse(attrs.typeaheadNoResults).assign || angular.noop;

    var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

    var appendToBody = attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

    var appendTo = attrs.typeaheadAppendTo ?
      originalScope.$eval(attrs.typeaheadAppendTo) : null;

    var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

    //If input matches an item of the list exactly, select it automatically
    var selectOnExact = attrs.typeaheadSelectOnExact ? originalScope.$eval(attrs.typeaheadSelectOnExact) : false;

    //binding to a variable that indicates if dropdown is open
    var isOpenSetter = $parse(attrs.typeaheadIsOpen).assign || angular.noop;

    var showHint = originalScope.$eval(attrs.typeaheadShowHint) || false;

    //INTERNAL VARIABLES

    //model setter executed upon match selection
    var parsedModel = $parse(attrs.ngModel);
    var invokeModelSetter = $parse(attrs.ngModel + '($$$p)');
    var $setModelValue = function(scope, newValue) {
      if (angular.isFunction(parsedModel(originalScope)) &&
        ngModelOptions.getOption('getterSetter')) {
        return invokeModelSetter(scope, {$$$p: newValue});
      }

      return parsedModel.assign(scope, newValue);
    };

    //expressions used by typeahead
    var parserResult = typeaheadParser.parse(attrs.uibTypeahead);

    var hasFocus;

    //Used to avoid bug in iOS webview where iOS keyboard does not fire
    //mousedown & mouseup events
    //Issue #3699
    var selected;

    //create a child scope for the typeahead directive so we are not polluting original scope
    //with typeahead-specific data (matches, query etc.)
    var scope = originalScope.$new();
    var offDestroy = originalScope.$on('$destroy', function() {
      scope.$destroy();
    });
    scope.$on('$destroy', offDestroy);

    // WAI-ARIA
    var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
    element.attr({
      'aria-autocomplete': 'list',
      'aria-expanded': false,
      'aria-owns': popupId
    });

    var inputsContainer, hintInputElem;
    //add read-only input to show hint
    if (showHint) {
      inputsContainer = angular.element('<div></div>');
      inputsContainer.css('position', 'relative');
      element.after(inputsContainer);
      hintInputElem = element.clone();
      hintInputElem.attr('placeholder', '');
      hintInputElem.attr('tabindex', '-1');
      hintInputElem.val('');
      hintInputElem.css({
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
        'border-color': 'transparent',
        'box-shadow': 'none',
        'opacity': 1,
        'background': 'none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)',
        'color': '#999'
      });
      element.css({
        'position': 'relative',
        'vertical-align': 'top',
        'background-color': 'transparent'
      });

      if (hintInputElem.attr('id')) {
        hintInputElem.removeAttr('id'); // remove duplicate id if present.
      }
      inputsContainer.append(hintInputElem);
      hintInputElem.after(element);
    }

    //pop-up element used to display matches
    var popUpEl = angular.element('<div uib-typeahead-popup></div>');
    popUpEl.attr({
      id: popupId,
      matches: 'matches',
      active: 'activeIdx',
      select: 'select(activeIdx, evt)',
      'move-in-progress': 'moveInProgress',
      query: 'query',
      position: 'position',
      'assign-is-open': 'assignIsOpen(isOpen)',
      debounce: 'debounceUpdate'
    });
    //custom item template
    if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
      popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
    }

    if (angular.isDefined(attrs.typeaheadPopupTemplateUrl)) {
      popUpEl.attr('popup-template-url', attrs.typeaheadPopupTemplateUrl);
    }

    var resetHint = function() {
      if (showHint) {
        hintInputElem.val('');
      }
    };

    var resetMatches = function() {
      scope.matches = [];
      scope.activeIdx = -1;
      element.attr('aria-expanded', false);
      resetHint();
    };

    var getMatchId = function(index) {
      return popupId + '-option-' + index;
    };

    // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
    // This attribute is added or removed automatically when the `activeIdx` changes.
    scope.$watch('activeIdx', function(index) {
      if (index < 0) {
        element.removeAttr('aria-activedescendant');
      } else {
        element.attr('aria-activedescendant', getMatchId(index));
      }
    });

    var inputIsExactMatch = function(inputValue, index) {
      if (scope.matches.length > index && inputValue) {
        return inputValue.toUpperCase() === scope.matches[index].label.toUpperCase();
      }

      return false;
    };

    var getMatchesAsync = function(inputValue, evt) {
      var locals = {$viewValue: inputValue};
      isLoadingSetter(originalScope, true);
      isNoResultsSetter(originalScope, false);
      $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
        //it might happen that several async queries were in progress if a user were typing fast
        //but we are interested only in responses that correspond to the current view value
        var onCurrentRequest = inputValue === modelCtrl.$viewValue;
        if (onCurrentRequest && hasFocus) {
          if (matches && matches.length > 0) {
            scope.activeIdx = focusFirst ? 0 : -1;
            isNoResultsSetter(originalScope, false);
            scope.matches.length = 0;

            //transform labels
            for (var i = 0; i < matches.length; i++) {
              locals[parserResult.itemName] = matches[i];
              scope.matches.push({
                id: getMatchId(i),
                label: parserResult.viewMapper(scope, locals),
                model: matches[i]
              });
            }

            scope.query = inputValue;
            //position pop-up with matches - we need to re-calculate its position each time we are opening a window
            //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
            //due to other elements being rendered
            recalculatePosition();

            element.attr('aria-expanded', true);

            //Select the single remaining option if user input matches
            if (selectOnExact && scope.matches.length === 1 && inputIsExactMatch(inputValue, 0)) {
              if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
                $$debounce(function() {
                  scope.select(0, evt);
                }, angular.isNumber(scope.debounceUpdate) ? scope.debounceUpdate : scope.debounceUpdate['default']);
              } else {
                scope.select(0, evt);
              }
            }

            if (showHint) {
              var firstLabel = scope.matches[0].label;
              if (angular.isString(inputValue) &&
                inputValue.length > 0 &&
                firstLabel.slice(0, inputValue.length).toUpperCase() === inputValue.toUpperCase()) {
                hintInputElem.val(inputValue + firstLabel.slice(inputValue.length));
              } else {
                hintInputElem.val('');
              }
            }
          } else {
            resetMatches();
            isNoResultsSetter(originalScope, true);
          }
        }
        if (onCurrentRequest) {
          isLoadingSetter(originalScope, false);
        }
      }, function() {
        resetMatches();
        isLoadingSetter(originalScope, false);
        isNoResultsSetter(originalScope, true);
      });
    };

    // bind events only if appendToBody params exist - performance feature
    if (appendToBody) {
      angular.element($window).on('resize', fireRecalculating);
      $document.find('body').on('scroll', fireRecalculating);
    }

    // Declare the debounced function outside recalculating for
    // proper debouncing
    var debouncedRecalculate = $$debounce(function() {
      // if popup is visible
      if (scope.matches.length) {
        recalculatePosition();
      }

      scope.moveInProgress = false;
    }, eventDebounceTime);

    // Default progress type
    scope.moveInProgress = false;

    function fireRecalculating() {
      if (!scope.moveInProgress) {
        scope.moveInProgress = true;
        scope.$digest();
      }

      debouncedRecalculate();
    }

    // recalculate actual position and set new values to scope
    // after digest loop is popup in right position
    function recalculatePosition() {
      scope.position = appendToBody ? $position.offset(element) : $position.position(element);
      scope.position.top += element.prop('offsetHeight');
    }

    //we need to propagate user's query so we can higlight matches
    scope.query = undefined;

    //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
    var timeoutPromise;

    var scheduleSearchWithTimeout = function(inputValue) {
      timeoutPromise = $timeout(function() {
        getMatchesAsync(inputValue);
      }, waitTime);
    };

    var cancelPreviousTimeout = function() {
      if (timeoutPromise) {
        $timeout.cancel(timeoutPromise);
      }
    };

    resetMatches();

    scope.assignIsOpen = function (isOpen) {
      isOpenSetter(originalScope, isOpen);
    };

    scope.select = function(activeIdx, evt) {
      //called from within the $digest() cycle
      var locals = {};
      var model, item;

      selected = true;
      locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
      model = parserResult.modelMapper(originalScope, locals);
      $setModelValue(originalScope, model);
      modelCtrl.$setValidity('editable', true);
      modelCtrl.$setValidity('parse', true);

      onSelectCallback(originalScope, {
        $item: item,
        $model: model,
        $label: parserResult.viewMapper(originalScope, locals),
        $event: evt
      });

      resetMatches();

      //return focus to the input element if a match was selected via a mouse click event
      // use timeout to avoid $rootScope:inprog error
      if (scope.$eval(attrs.typeaheadFocusOnSelect) !== false) {
        $timeout(function() { element[0].focus(); }, 0, false);
      }
    };

    //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
    element.on('keydown', function(evt) {
      //typeahead is open and an "interesting" key was pressed
      if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
        return;
      }

      var shouldSelect = isSelectEvent(originalScope, {$event: evt});

      /**
       * if there's nothing selected (i.e. focusFirst) and enter or tab is hit
       * or
       * shift + tab is pressed to bring focus to the previous element
       * then clear the results
       */
      if (scope.activeIdx === -1 && shouldSelect || evt.which === 9 && !!evt.shiftKey) {
        resetMatches();
        scope.$digest();
        return;
      }

      evt.preventDefault();
      var target;
      switch (evt.which) {
        case 27: // escape
          evt.stopPropagation();

          resetMatches();
          originalScope.$digest();
          break;
        case 38: // up arrow
          scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
          scope.$digest();
          target = popUpEl[0].querySelectorAll('.uib-typeahead-match')[scope.activeIdx];
          target.parentNode.scrollTop = target.offsetTop;
          break;
        case 40: // down arrow
          scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
          scope.$digest();
          target = popUpEl[0].querySelectorAll('.uib-typeahead-match')[scope.activeIdx];
          target.parentNode.scrollTop = target.offsetTop;
          break;
        default:
          if (shouldSelect) {
            scope.$apply(function() {
              if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
                $$debounce(function() {
                  scope.select(scope.activeIdx, evt);
                }, angular.isNumber(scope.debounceUpdate) ? scope.debounceUpdate : scope.debounceUpdate['default']);
              } else {
                scope.select(scope.activeIdx, evt);
              }
            });
          }
      }
    });

    element.on('focus', function (evt) {
      hasFocus = true;
      if (minLength === 0 && !modelCtrl.$viewValue) {
        $timeout(function() {
          getMatchesAsync(modelCtrl.$viewValue, evt);
        }, 0);
      }
    });

    element.on('blur', function(evt) {
      if (isSelectOnBlur && scope.matches.length && scope.activeIdx !== -1 && !selected) {
        selected = true;
        scope.$apply(function() {
          if (angular.isObject(scope.debounceUpdate) && angular.isNumber(scope.debounceUpdate.blur)) {
            $$debounce(function() {
              scope.select(scope.activeIdx, evt);
            }, scope.debounceUpdate.blur);
          } else {
            scope.select(scope.activeIdx, evt);
          }
        });
      }
      if (!isEditable && modelCtrl.$error.editable) {
        modelCtrl.$setViewValue();
        scope.$apply(function() {
          // Reset validity as we are clearing
          modelCtrl.$setValidity('editable', true);
          modelCtrl.$setValidity('parse', true);
        });
        element.val('');
      }
      hasFocus = false;
      selected = false;
    });

    // Keep reference to click handler to unbind it.
    var dismissClickHandler = function(evt) {
      // Issue #3973
      // Firefox treats right click as a click on document
      if (element[0] !== evt.target && evt.which !== 3 && scope.matches.length !== 0) {
        resetMatches();
        if (!$rootScope.$$phase) {
          originalScope.$digest();
        }
      }
    };

    $document.on('click', dismissClickHandler);

    originalScope.$on('$destroy', function() {
      $document.off('click', dismissClickHandler);
      if (appendToBody || appendTo) {
        $popup.remove();
      }

      if (appendToBody) {
        angular.element($window).off('resize', fireRecalculating);
        $document.find('body').off('scroll', fireRecalculating);
      }
      // Prevent jQuery cache memory leak
      popUpEl.remove();

      if (showHint) {
          inputsContainer.remove();
      }
    });

    var $popup = $compile(popUpEl)(scope);

    if (appendToBody) {
      $document.find('body').append($popup);
    } else if (appendTo) {
      angular.element(appendTo).eq(0).append($popup);
    } else {
      element.after($popup);
    }

    this.init = function(_modelCtrl) {
      modelCtrl = _modelCtrl;
      ngModelOptions = extractOptions(modelCtrl);

      scope.debounceUpdate = $parse(ngModelOptions.getOption('debounce'))(originalScope);

      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      modelCtrl.$parsers.unshift(function(inputValue) {
        hasFocus = true;

        if (minLength === 0 || inputValue && inputValue.length >= minLength) {
          if (waitTime > 0) {
            cancelPreviousTimeout();
            scheduleSearchWithTimeout(inputValue);
          } else {
            getMatchesAsync(inputValue);
          }
        } else {
          isLoadingSetter(originalScope, false);
          cancelPreviousTimeout();
          resetMatches();
        }

        if (isEditable) {
          return inputValue;
        }

        if (!inputValue) {
          // Reset in case user had typed something previously.
          modelCtrl.$setValidity('editable', true);
          return null;
        }

        modelCtrl.$setValidity('editable', false);
        return undefined;
      });

      modelCtrl.$formatters.push(function(modelValue) {
        var candidateViewValue, emptyViewValue;
        var locals = {};

        // The validity may be set to false via $parsers (see above) if
        // the model is restricted to selected values. If the model
        // is set manually it is considered to be valid.
        if (!isEditable) {
          modelCtrl.$setValidity('editable', true);
        }

        if (inputFormatter) {
          locals.$model = modelValue;
          return inputFormatter(originalScope, locals);
        }

        //it might happen that we don't have enough info to properly render input value
        //we need to check for this situation and simply return model value if we can't apply custom formatting
        locals[parserResult.itemName] = modelValue;
        candidateViewValue = parserResult.viewMapper(originalScope, locals);
        locals[parserResult.itemName] = undefined;
        emptyViewValue = parserResult.viewMapper(originalScope, locals);

        return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
      });
    };

    function extractOptions(ngModelCtrl) {
      var ngModelOptions;

      if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
        // guarantee a value
        ngModelOptions = ngModelCtrl.$options || {};

        // mimic 1.6+ api
        ngModelOptions.getOption = function (key) {
          return ngModelOptions[key];
        };
      } else { // in angular >=1.6 $options is always present
        ngModelOptions = ngModelCtrl.$options;
      }

      return ngModelOptions;
    }
  }])

  .directive('uibTypeahead', function() {
    return {
      controller: 'UibTypeaheadController',
      require: ['ngModel', 'uibTypeahead'],
      link: function(originalScope, element, attrs, ctrls) {
        ctrls[1].init(ctrls[0]);
      }
    };
  })

  .directive('uibTypeaheadPopup', ['$$debounce', function($$debounce) {
    return {
      scope: {
        matches: '=',
        query: '=',
        active: '=',
        position: '&',
        moveInProgress: '=',
        select: '&',
        assignIsOpen: '&',
        debounce: '&'
      },
      replace: true,
      templateUrl: function(element, attrs) {
        return attrs.popupTemplateUrl || 'uib/template/typeahead/typeahead-popup.html';
      },
      link: function(scope, element, attrs) {
        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function() {
          var isDropdownOpen = scope.matches.length > 0;
          scope.assignIsOpen({ isOpen: isDropdownOpen });
          return isDropdownOpen;
        };

        scope.isActive = function(matchIdx) {
          return scope.active === matchIdx;
        };

        scope.selectActive = function(matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function(activeIdx, evt) {
          var debounce = scope.debounce();
          if (angular.isNumber(debounce) || angular.isObject(debounce)) {
            $$debounce(function() {
              scope.select({activeIdx: activeIdx, evt: evt});
            }, angular.isNumber(debounce) ? debounce : debounce['default']);
          } else {
            scope.select({activeIdx: activeIdx, evt: evt});
          }
        };
      }
    };
  }])

  .directive('uibTypeaheadMatch', ['$templateRequest', '$compile', '$parse', function($templateRequest, $compile, $parse) {
    return {
      scope: {
        index: '=',
        match: '=',
        query: '='
      },
      link: function(scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'uib/template/typeahead/typeahead-match.html';
        $templateRequest(tplUrl).then(function(tplContent) {
          var tplEl = angular.element(tplContent.trim());
          element.replaceWith(tplEl);
          $compile(tplEl)(scope);
        });
      }
    };
  }])

  .filter('uibTypeaheadHighlight', ['$sce', '$injector', '$log', function($sce, $injector, $log) {
    var isSanitizePresent;
    isSanitizePresent = $injector.has('$sanitize');

    function escapeRegexp(queryToEscape) {
      // Regex: capture the whole query string and replace it with the string that will be used to match
      // the results, for example if the capture is "a" the result will be \a
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    function containsHtml(matchItem) {
      return /<.*>/g.test(matchItem);
    }

    return function(matchItem, query) {
      if (!isSanitizePresent && containsHtml(matchItem)) {
        $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
      }
      matchItem = query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem; // Replaces the capture string with a the same string inside of a "strong" tag
      if (!isSanitizePresent) {
        matchItem = $sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
      }
      return matchItem;
    };
  }]);

angular.module("uib/template/accordion/accordion-group.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/accordion/accordion-group.html",
    "<div role=\"tab\" id=\"{{::headingId}}\" aria-selected=\"{{isOpen}}\" class=\"card-header\" ng-keypress=\"toggleOpen($event)\">\n" +
    "  <h5 class=\"mb-0\">\n" +
    "    <a role=\"button\" data-toggle=\"collapse\" href aria-expanded=\"{{isOpen}}\" aria-controls=\"{{::cardId}}\" tabindex=\"0\" class=\"accordion-toggle\"  ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\" ng-disabled=\"isDisabled\" uib-tabindex-toggle><span uib-accordion-header ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
    "  </h5>\n" +
    "</div>\n" +
    "<div id=\"{{::cardId}}\" aria-labelledby=\"{{::headingId}}\" aria-hidden=\"{{!isOpen}}\" role=\"tabcard\" class=\"card-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
    "  <div class=\"card-body\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/accordion/accordion.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/accordion/accordion.html",
    "<div role=\"tablist\" ng-transclude></div>\n" +
    "");
}]);

angular.module("uib/template/alert/alert.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/alert/alert.html",
    "<button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close({$event: $event})\">\n" +
    "  <span aria-hidden=\"true\">&times;</span>\n" +
    "  <span class=\"sr-only\">Close</span>\n" +
    "</button>\n" +
    "<div ng-transclude></div>\n" +
    "");
}]);

angular.module("uib/template/carousel/carousel.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/carousel/carousel.html",
    "<div class=\"carousel-inner\" ng-transclude></div>\n" +
    "<a role=\"button\" href class=\"carousel-control-prev\" ng-click=\"prev()\" ng-class=\"{ disabled: isPrevDisabled() }\" ng-show=\"slides.length > 1\">\n" +
    "    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n" +
    "    <span class=\"sr-only\">Previous</span>\n" +
    "</a>\n" +
    "<a role=\"button\" href class=\"carousel-control-next\" ng-click=\"next()\" ng-class=\"{ disabled: isNextDisabled() }\" ng-show=\"slides.length > 1\">\n" +
    "    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n" +
    "    <span class=\"sr-only\">Next</span>\n" +
    "</a>\n" +
    "<ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +
    "  <li ng-repeat=\"slide in slides | orderBy:indexOfSlide track by $index\" ng-class=\"{ active: isActive(slide) }\" ng-click=\"select(slide)\">\n" +
    "    <span class=\"sr-only\">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if=\"isActive(slide)\">, currently active</span></span>\n" +
    "  </li>\n" +
    "</ol>\n" +
    "");
}]);

angular.module("uib/template/carousel/slide.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/carousel/slide.html",
    "<div class=\"text-center\" ng-transclude></div>\n" +
    "");
}]);

angular.module("uib/template/datepicker/datepicker.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/datepicker/datepicker.html",
    "<div ng-switch=\"datepickerMode\">\n" +
    "  <div uib-daypicker ng-switch-when=\"day\" tabindex=\"0\" class=\"uib-daypicker\"></div>\n" +
    "  <div uib-monthpicker ng-switch-when=\"month\" tabindex=\"0\" class=\"uib-monthpicker\"></div>\n" +
    "  <div uib-yearpicker ng-switch-when=\"year\" tabindex=\"0\" class=\"uib-yearpicker\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/datepicker/day.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/datepicker/day.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>\n" +
    "        <button type=\"button\" class=\"btn btn-secondary btn-sm float-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\">\n" +
    "          <i aria-hidden=\"true\" class=\"fa-svg-icon\">\n" +
    "            <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z\"/></svg>\n" +
    "          </i>\n" +
    "          <span class=\"sr-only\">previous</span>\n" +
    "        </button>\n" +
    "      </th>\n" +
    "      <th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-secondary btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
    "      <th>\n" +
    "        <button type=\"button\" class=\"btn btn-secondary btn-sm float-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\">\n" +
    "          <i aria-hidden=\"true\" class=\"fa-svg-icon\">\n" +
    "            <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z\"/></svg>\n" +
    "          </i>\n" +
    "          <span class=\"sr-only\">next</span>\n" +
    "        </button>\n" +
    "      </th>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <th ng-if=\"showWeeks\" class=\"text-center\"></th>\n" +
    "      <th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\">{{::label.abbr}}</small></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr class=\"uib-weeks\" ng-repeat=\"row in rows track by $index\" role=\"row\">\n" +
    "      <td ng-if=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    "      <td ng-repeat=\"dt in row\" class=\"uib-day text-center\" role=\"gridcell\"\n" +
    "        id=\"{{::dt.uid}}\"\n" +
    "        ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" class=\"btn btn-secondary btn-sm\"\n" +
    "          uib-is-class=\"\n" +
    "            'btn-info' for selectedDt,\n" +
    "            'active' for activeDt\n" +
    "            on dt\"\n" +
    "          ng-click=\"select(dt.date)\"\n" +
    "          ng-disabled=\"::dt.disabled\"\n" +
    "          tabindex=\"-1\"><span ng-class=\"::{'text-muted': dt.secondary, 'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("uib/template/datepicker/month.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/datepicker/month.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>\n" +
    "        <button type=\"button\" class=\"btn btn-secondary btn-sm float-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\">\n" +
    "          <i aria-hidden=\"true\" class=\"fa-svg-icon\">\n" +
    "            <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z\"/></svg>\n" +
    "          </i>\n" +
    "          <span class=\"sr-only\">previous</span>\n" +
    "        </button>\n" +
    "      </th>\n" +
    "      <th colspan=\"{{::yearHeaderColspan}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-secondary btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
    "      <th>\n" +
    "        <button type=\"button\" class=\"btn btn-secondary btn-sm float-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\">\n" +
    "          <i aria-hidden=\"true\" class=\"fa-svg-icon\">\n" +
    "            <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z\"/></svg>\n" +
    "          </i>\n" +
    "          <span class=\"sr-only\">next</span>\n" +
    "        </button>\n" +
    "      </th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr class=\"uib-months\" ng-repeat=\"row in rows track by $index\" role=\"row\">\n" +
    "      <td ng-repeat=\"dt in row\" class=\"uib-month text-center\" role=\"gridcell\"\n" +
    "        id=\"{{::dt.uid}}\"\n" +
    "        ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" class=\"btn btn-secondary\"\n" +
    "          uib-is-class=\"\n" +
    "            'btn-info' for selectedDt,\n" +
    "            'active' for activeDt\n" +
    "            on dt\"\n" +
    "          ng-click=\"select(dt.date)\"\n" +
    "          ng-disabled=\"::dt.disabled\"\n" +
    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("uib/template/datepicker/year.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/datepicker/year.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "  <tr>\n" +
    "    <th>\n" +
    "      <button type=\"button\" class=\"btn btn-secondary btn-sm float-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\">\n" +
    "        <i aria-hidden=\"true\" class=\"fa-svg-icon\">\n" +
    "          <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z\"/></svg>\n" +
    "        </i>\n" +
    "        <span class=\"sr-only\">previous</span>\n" +
    "      </button>\n" +
    "    </th>\n" +
    "    <th colspan=\"{{::columns - 2}}\">\n" +
    "      <button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\"\n" +
    "              class=\"btn btn-secondary btn-sm uib-title\" ng-click=\"toggleMode()\"\n" +
    "              ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\">\n" +
    "        <strong>{{title}}</strong>\n" +
    "      </button>\n" +
    "    </th>\n" +
    "    <th>\n" +
    "      <button type=\"button\" class=\"btn btn-secondary btn-sm float-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\">\n" +
    "        <i aria-hidden=\"true\" class=\"fa-svg-icon\">\n" +
    "          <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z\"/></svg>\n" +
    "        </i>\n" +
    "        <span class=\"sr-only\">next</span>\n" +
    "      </button>\n" +
    "    </th>\n" +
    "  </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "  <tr class=\"uib-years\" ng-repeat=\"row in rows track by $index\" role=\"row\">\n" +
    "    <td ng-repeat=\"dt in row\" class=\"uib-year text-center\" role=\"gridcell\"\n" +
    "        id=\"{{::dt.uid}}\"\n" +
    "        ng-class=\"::dt.customClass\">\n" +
    "      <button type=\"button\" class=\"btn btn-secondary\"\n" +
    "              uib-is-class=\"\n" +
    "            'btn-info' for selectedDt,\n" +
    "            'active' for activeDt\n" +
    "            on dt\"\n" +
    "              ng-click=\"select(dt.date)\"\n" +
    "              ng-disabled=\"::dt.disabled\"\n" +
    "              tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("uib/template/datepickerPopup/popup.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/datepickerPopup/popup.html",
    "<ul role=\"presentation\" class=\"uib-datepicker-popup dropdown-menu uib-position-measure\" dropdown-nested ng-if=\"isOpen\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
    "  <li ng-transclude></li>\n" +
    "  <li ng-if=\"showButtonBar\" class=\"uib-button-bar\">\n" +
    "    <span class=\"btn-group float-left\">\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-info uib-datepicker-current\" ng-click=\"select('today', $event)\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-danger uib-clear\" ng-click=\"select(null, $event)\">{{ getText('clear') }}</button>\n" +
    "    </span>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-success float-right uib-close\" ng-click=\"close($event)\">{{ getText('close') }}</button>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("uib/template/modal/window.html", []).run(["$templateCache", function ($templateCache) {
  //$templateCache.put("uib/template/modal/window.html",
  //  "<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n" +
  //    "");
 //Override Modal Template by aMACEzing
    $templateCache.put("uib/template/modal/window.html",
        "<div class=\"modal-dialog modal-dialog-centered {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content border-0 rounded-0\" uib-modal-transclude></div></div>\n" +
        "");
}]);

angular.module("uib/template/pager/pager.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/pager/pager.html",
    "<li ng-class=\"{disabled: noPrevious()||ngDisabled, previous: align}\"><a href ng-click=\"selectPage(page - 1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle>{{::getText('previous')}}</a></li>\n" +
    "<li ng-class=\"{disabled: noNext()||ngDisabled, next: align}\"><a href ng-click=\"selectPage(page + 1, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle>{{::getText('next')}}</a></li>\n" +
    "");
}]);

angular.module("uib/template/pagination/pagination.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/pagination/pagination.html",
    "<li role=\"menuitem\" ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"page-item\"><a href ng-click=\"selectPage(1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle class=\"page-link\">{{::getText('first')}}</a></li>\n" +
    "<li role=\"menuitem\" ng-if=\"::directionLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"page-item\"><a href ng-click=\"selectPage(page - 1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle class=\"page-link\">{{::getText('previous')}}</a></li>\n" +
    "<li role=\"menuitem\" ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active,disabled: ngDisabled&&!page.active}\" class=\"page-item\"><a href ng-click=\"selectPage(page.number, $event)\" ng-disabled=\"ngDisabled&&!page.active\" uib-tabindex-toggle class=\"page-link\">{{page.text}}</a></li>\n" +
    "<li role=\"menuitem\" ng-if=\"::directionLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"page-item\"><a href ng-click=\"selectPage(page + 1, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle class=\"page-link\">{{::getText('next')}}</a></li>\n" +
    "<li role=\"menuitem\" ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"page-item\"><a href ng-click=\"selectPage(totalPages, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle class=\"page-link\">{{::getText('last')}}</a></li>\n" +
    "");
}]);

angular.module("uib/template/tooltip/tooltip-html-popup.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/tooltip/tooltip-html-popup.html",
    "<div class=\"arrow\"></div>\n" +
    "<div class=\"tooltip-inner\" ng-bind-html=\"contentExp()\"></div>\n" +
    "");
}]);

angular.module("uib/template/tooltip/tooltip-popup.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/tooltip/tooltip-popup.html",
    "<div class=\"arrow\"></div>\n" +
    "<div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "");
}]);

angular.module("uib/template/tooltip/tooltip-template-popup.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/tooltip/tooltip-template-popup.html",
    "<div class=\"arrow\"></div>\n" +
    "<div class=\"tooltip-inner\"\n" +
    "  uib-tooltip-template-transclude=\"contentExp()\"\n" +
    "  tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
    "");
}]);

angular.module("uib/template/popover/popover-html.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/popover/popover-html.html",
    "<div class=\"arrow\"></div>\n" +
    "<h3 class=\"popover-header\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
    "<div class=\"popover-body\" ng-bind-html=\"contentExp()\"></div>\n" +
    "");
}]);

angular.module("uib/template/popover/popover-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/popover/popover-template.html",
    "<div class=\"arrow\"></div>\n" +
    "\n" +
    "<h3 class=\"popover-header\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
    "<div class=\"popover-body\"\n" +
    "  uib-tooltip-template-transclude=\"contentExp()\"\n" +
    "  tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
    "");
}]);

angular.module("uib/template/popover/popover.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/popover/popover.html",
    "<div class=\"arrow\"></div>\n" +
    "<h3 class=\"popover-header\" ng-bind=\"uibTitle\" ng-if=\"uibTitle\"></h3>\n" +
    "<div class=\"popover-body\" ng-bind=\"content\"></div>\n" +
    "");
}]);

angular.module("uib/template/progressbar/bar.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/progressbar/bar.html",
    "<div class=\"progress-bar\" ng-class=\"[type ? 'bg-' + type : '', striped ? 'progress-bar-striped' : '']\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" ng-transclude></div>\n" +
    "");
}]);

angular.module("uib/template/progressbar/progress.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/progressbar/progress.html",
    "<div class=\"progress\" ng-transclude aria-labelledby=\"{{::title}}\"></div>");
}]);

angular.module("uib/template/progressbar/progressbar.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/progressbar/progressbar.html",
    "<div class=\"progress\">\n" +
    "  <div class=\"progress-bar\" ng-class=\"[type ? 'bg-' + type : '', striped ? 'progress-bar-striped' : '']\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/rating/rating.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/rating/rating.html",
    "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\" aria-valuetext=\"{{title}}\">\n" +
    "    <span ng-repeat-start=\"r in range track by $index\" class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
    "    <i ng-repeat-end ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"fa-svg-icon\" ng-class=\"$index < value && (r.stateOn || 'star') || (r.stateOff || 'star-empty')\" ng-attr-title=\"{{r.title}}\">\n" +
    "        <svg data-ng-if=\"$index < value\" width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z\"/></svg>\n" +
    "        <svg data-ng-if=\"$index >= value\" width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1201 1004l306-297-422-62-189-382-189 382-422 62 306 297-73 421 378-199 377 199zm527-357q0 22-26 48l-363 354 86 500q1 7 1 20 0 50-41 50-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z\"/></svg>\n" +
    "    </i>\n" +
    "</span>\n" +
    "");
}]);

angular.module("uib/template/tabs/tab.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/tabs/tab.html",
    "<li class=\"uib-tab nav-item\">\n" +
    "  <a href ng-click=\"select($event)\" ng-class=\"[{active: active, disabled: disabled}, classes]\" class=\"nav-link\" uib-tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("uib/template/tabs/tabset.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/tabs/tabset.html",
    "<div>\n" +
    "  <ul class=\"nav nav-{{tabset.type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\"\n" +
    "         ng-repeat=\"tab in tabset.tabs\"\n" +
    "         ng-class=\"{active: tabset.active === tab.index}\"\n" +
    "         uib-tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("uib/template/timepicker/timepicker.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/timepicker/timepicker.html",
    "<table class=\"uib-timepicker\">\n" +
    "  <tbody>\n" +
    "    <tr class=\"text-center\" ng-show=\"::showSpinners\">\n" +
    "      <td class=\"uib-increment hours\">\n" +
    "        <a ng-click=\"incrementHours()\" ng-class=\"{disabled: noIncrementHours()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementHours()\" tabindex=\"-1\">\n" +
    "          <span class=\"fa-svg-icon\">\n" +
    "            <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531 531q-19 19-45 19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19 45-19t45 19l742 741q19 19 19 45.5t-19 45.5z\"/></svg>\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </td>\n" +
    "      <td>&nbsp;</td>\n" +
    "      <td class=\"uib-increment minutes\">\n" +
    "        <a ng-click=\"incrementMinutes()\" ng-class=\"{disabled: noIncrementMinutes()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementMinutes()\" tabindex=\"-1\">\n" +
    "          <span class=\"fa-svg-icon\">\n" +
    "            <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531 531q-19 19-45 19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19 45-19t45 19l742 741q19 19 19 45.5t-19 45.5z\"/></svg>\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </td>\n" +
    "      <td ng-show=\"showSeconds\">&nbsp;</td>\n" +
    "      <td ng-show=\"showSeconds\" class=\"uib-increment seconds\">\n" +
    "        <a ng-click=\"incrementSeconds()\" ng-class=\"{disabled: noIncrementSeconds()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementSeconds()\" tabindex=\"-1\">\n" +
    "          <span class=\"fa-svg-icon\">\n" +
    "            <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531 531q-19 19-45 19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19 45-19t45 19l742 741q19 19 19 45.5t-19 45.5z\"/></svg>\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </td>\n" +
    "      <td ng-show=\"showMeridian\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <td class=\"form-group uib-time hours\" ng-class=\"{'has-error': invalidHours}\">\n" +
    "        <input type=\"text\" placeholder=\"HH\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\" ng-disabled=\"noIncrementHours()\" ng-blur=\"blur()\">\n" +
    "      </td>\n" +
    "      <td class=\"uib-separator\">:</td>\n" +
    "      <td class=\"form-group uib-time minutes\" ng-class=\"{'has-error': invalidMinutes}\">\n" +
    "        <input type=\"text\" placeholder=\"MM\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\" ng-disabled=\"noIncrementMinutes()\" ng-blur=\"blur()\">\n" +
    "      </td>\n" +
    "      <td ng-show=\"showSeconds\" class=\"uib-separator\">:</td>\n" +
    "      <td class=\"form-group uib-time seconds\" ng-class=\"{'has-error': invalidSeconds}\" ng-show=\"showSeconds\">\n" +
    "        <input type=\"text\" placeholder=\"SS\" ng-model=\"seconds\" ng-change=\"updateSeconds()\" class=\"form-control text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\" ng-disabled=\"noIncrementSeconds()\" ng-blur=\"blur()\">\n" +
    "      </td>\n" +
    "      <td ng-show=\"showMeridian\" class=\"uib-time am-pm\"><button type=\"button\" ng-class=\"{disabled: noToggleMeridian()}\" class=\"btn btn-secondary text-center\" ng-click=\"toggleMeridian()\" ng-disabled=\"noToggleMeridian()\" tabindex=\"{{::tabindex}}\">{{meridian}}</button></td>\n" +
    "    </tr>\n" +
    "    <tr class=\"text-center\" ng-show=\"::showSpinners\">\n" +
    "      <td class=\"uib-decrement hours\">\n" +
    "        <a ng-click=\"decrementHours()\" ng-class=\"{disabled: noDecrementHours()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementHours()\" tabindex=\"-1\">\n" +
    "          <span class=\"fa-svg-icon\">\n" +
    "            <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z\"/></svg>\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </td>\n" +
    "      <td>&nbsp;</td>\n" +
    "      <td class=\"uib-decrement minutes\">\n" +
    "        <a ng-click=\"decrementMinutes()\" ng-class=\"{disabled: noDecrementMinutes()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementMinutes()\" tabindex=\"-1\">\n" +
    "          <span class=\"fa-svg-icon\">\n" +
    "            <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z\"/></svg>\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </td>\n" +
    "      <td ng-show=\"showSeconds\">&nbsp;</td>\n" +
    "      <td ng-show=\"showSeconds\" class=\"uib-decrement seconds\">\n" +
    "        <a ng-click=\"decrementSeconds()\" ng-class=\"{disabled: noDecrementSeconds()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementSeconds()\" tabindex=\"-1\">\n" +
    "          <span class=\"fa-svg-icon\">\n" +
    "            <svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z\"/></svg>\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </td>\n" +
    "      <td ng-show=\"showMeridian\"></td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("uib/template/typeahead/typeahead-match.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/typeahead/typeahead-match.html",
    "<a href\n" +
    "   tabindex=\"-1\"\n" +
    "   class=\"dropdown-item\"\n" +
    "   ng-bind-html=\"match.label | uibTypeaheadHighlight:query\"\n" +
    "   ng-attr-title=\"{{match.label}}\"></a>\n" +
    "");
}]);

angular.module("uib/template/typeahead/typeahead-popup.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/typeahead/typeahead-popup.html",
    "<ul class=\"dropdown-menu\" ng-show=\"isOpen() && !moveInProgress\" ng-style=\"{top: position().top+'px', left: position().left+'px'}\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
    "    <li class=\"uib-typeahead-match\" ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index, $event)\" role=\"option\" id=\"{{::match.id}}\">\n" +
    "        <div uib-typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);
angular.module('ui.bootstrap.carousel').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibCarouselCss && angular.element(document).find('head').prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>'); angular.$$uibCarouselCss = true; });
angular.module('ui.bootstrap.common').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibCommonCss && angular.element(document).find('head').prepend('<style type="text/css">.fa-svg-icon{display:inline-block;vertical-align:middle;min-width:1em;min-height:1em;height:100%;position:relative;top:-1px;}.fa-svg-icon svg{position:absolute;top:0;left:0;width:100%;height:100%;}.fa-svg-icon svg g,.fa-svg-icon svg path{fill:currentColor;}</style>'); angular.$$uibCommonCss = true; });
angular.module('ui.bootstrap.datepicker').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibDatepickerCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-left,.uib-right{width:100%}</style>'); angular.$$uibDatepickerCss = true; });
angular.module('ui.bootstrap.position').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibPositionCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'); angular.$$uibPositionCss = true; });
angular.module('ui.bootstrap.datepickerPopup').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibDatepickerpopupCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-datepicker-popup.dropdown-menu{display:block;float:none;margin:0;}.uib-button-bar{padding:10px;}</style>'); angular.$$uibDatepickerpopupCss = true; });
angular.module('ui.bootstrap.tooltip').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTooltipCss && angular.element(document).find('head').prepend('<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow,[uib-popover-html-popup].popover.top-left > .arrow,[uib-popover-html-popup].popover.top-right > .arrow,[uib-popover-html-popup].popover.bottom-left > .arrow,[uib-popover-html-popup].popover.bottom-right > .arrow,[uib-popover-html-popup].popover.left-top > .arrow,[uib-popover-html-popup].popover.left-bottom > .arrow,[uib-popover-html-popup].popover.right-top > .arrow,[uib-popover-html-popup].popover.right-bottom > .arrow,[uib-popover-template-popup].popover.top-left > .arrow,[uib-popover-template-popup].popover.top-right > .arrow,[uib-popover-template-popup].popover.bottom-left > .arrow,[uib-popover-template-popup].popover.bottom-right > .arrow,[uib-popover-template-popup].popover.left-top > .arrow,[uib-popover-template-popup].popover.left-bottom > .arrow,[uib-popover-template-popup].popover.right-top > .arrow,[uib-popover-template-popup].popover.right-bottom > .arrow{top:auto;bottom:auto;left:auto;right:auto;margin:0;}[uib-popover-popup].popover,[uib-popover-html-popup].popover,[uib-popover-template-popup].popover{display:block !important;}</style>'); angular.$$uibTooltipCss = true; });
angular.module('ui.bootstrap.timepicker').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTimepickerCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-time input{width:50px !important;}</style>'); angular.$$uibTimepickerCss = true; });
angular.module('ui.bootstrap.typeahead').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTypeaheadCss && angular.element(document).find('head').prepend('<style type="text/css">[uib-typeahead-popup].dropdown-menu{display:block;}</style>'); angular.$$uibTypeaheadCss = true; });
/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&e<=0&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.$element.is(":visible")&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return"left"===c&&b>h-e&&b<h+e?d=a:"right"===c&&b>h-f-e&&b<h-f+e?d=a+1:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),d===-1},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){for(b=this._items.length,c=this._items[--b].width(),d=this.$element.width();b--&&(c+=this._items[b].width()+this.settings.margin,!(c>d)););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=f*-1*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&a.namespace.indexOf("owl")!==-1?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&e*-1||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c),e=[],f=0;a.each(d,function(b,c){e.push(a(c).height())}),f=Math.max.apply(null,e),this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};if(b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="//www.youtube.com/embed/'+f.id+"?autoplay=1&rel=0&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type?c='<iframe src="//player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>':"vzaar"===f.type&&(c='<iframe frameborder="0"height="'+h+'"width="'+g+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/'+f.id+'/player?autoplay=true"></iframe>'),a('<div class="owl-video-frame">'+c+"</div>").insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},
a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._timeout=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._core.settings.autoplay&&this._setAutoPlayInterval()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(a,b){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._setAutoPlayInterval())},e.prototype._getNextTimeout=function(d,e){return this._timeout&&b.clearTimeout(this._timeout),b.setTimeout(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout)},e.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout()},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearTimeout(this._timeout),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);
(function() {
  var Util,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in custom) {
        value = custom[key];
        if (value != null) {
          defaults[key] = value;
        }
      }
      return defaults;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    return Util;

  })();

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = __bind(this.scrollCallback, this);
      this.scrollHandler = __bind(this.scrollHandler, this);
      this.start = __bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
    }

    WOW.prototype.init = function() {
      var _ref;
      this.element = window.document.documentElement;
      this.boxes = this.element.getElementsByClassName(this.config.boxClass);
      if (this.boxes.length) {
        if (this.disabled()) {
          return this.resetStyle();
        } else {
          if ((_ref = document.readyState) === "interactive" || _ref === "complete") {
            return this.start();
          } else {
            return document.addEventListener('DOMContentLoaded', this.start);
          }
        }
      }
    };

    WOW.prototype.start = function() {
      var box, _i, _len, _ref;
      _ref = this.boxes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        this.applyStyle(box, true);
      }
      window.addEventListener('scroll', this.scrollHandler, false);
      window.addEventListener('resize', this.scrollHandler, false);
      return this.interval = setInterval(this.scrollCallback, 50);
    };

    WOW.prototype.stop = function() {
      window.removeEventListener('scroll', this.scrollHandler, false);
      window.removeEventListener('resize', this.scrollHandler, false);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      return box.className = "" + box.className + " " + this.config.animateClass;
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return box.setAttribute('style', this.customStyle(hidden, duration, delay, iteration));
    };

    WOW.prototype.resetStyle = function() {
      var box, _i, _len, _ref, _results;
      _ref = this.boxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        _results.push(box.setAttribute('style', 'visibility: visible;'));
      }
      return _results;
    };

    WOW.prototype.customStyle = function(hidden, duration, delay, iteration) {
      var style;
      style = hidden ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;" : "visibility: visible;";
      if (duration) {
        style += "-webkit-animation-duration: " + duration + "; -moz-animation-duration: " + duration + "; animation-duration: " + duration + ";";
      }
      if (delay) {
        style += "-webkit-animation-delay: " + delay + "; -moz-animation-delay: " + delay + "; animation-delay: " + delay + ";";
      }
      if (iteration) {
        style += "-webkit-animation-iteration-count: " + iteration + "; -moz-animation-iteration-count: " + iteration + "; animation-iteration-count: " + iteration + ";";
      }
      return style;
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var _i, _len, _ref, _results;
          _ref = this.boxes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            _results.push(box);
          }
          return _results;
        }).call(this);
        if (!this.boxes.length) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + this.element.clientHeight - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util || (this._util = new Util());
    };

    WOW.prototype.disabled = function() {
      return this.config.mobile === false && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

}).call(this);
