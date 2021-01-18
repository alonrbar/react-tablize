import { createElement, Component, Children, cloneElement, PureComponent, createRef, forwardRef, isValidElement } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import Scrollbars from 'react-custom-scrollbars';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary(props) {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    _this = _super.call(this, props);
    _this.state = {
      hasError: false
    };
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      this.setState({
        hasError: true
      });
      console.error(error); // eslint-disable-line no-console
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return /*#__PURE__*/createElement("span", null, "X");
      }

      return this.props.children !== undefined ? this.props.children : null;
    }
  }]);

  return ErrorBoundary;
}(Component);

var DomUtils = /*#__PURE__*/function () {
  function DomUtils() {
    _classCallCheck(this, DomUtils);
  }

  _createClass(DomUtils, null, [{
    key: "scrollbarWidth",
    get: function get() {
      if (this._scrollbarWidth !== null) return this._scrollbarWidth; // https://github.com/sonicdoe/measure-scrollbar/blob/master/index.js

      var div = document.createElement('div');
      div.style.width = '100px';
      div.style.height = '100px';
      div.style.overflow = 'scroll';
      div.style.position = 'absolute';
      div.style.top = '-9999px';
      document.body.appendChild(div);
      this._scrollbarWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      return this._scrollbarWidth;
    }
    /**
     * TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
     * Chrome does not seem to adhere; its scrollLeft values are positive (measured relative to the left).
     * Safari's elastic bounce makes detecting this even more complicated wrt potential false positives.
     * The safest way to check this is to intentionally set a negative offset,
     * and then verify that the subsequent "scroll" event matches the negative offset.
     * If it does not match, then we can assume a non-standard RTL scroll implementation.
     *
     * From: https://github.com/bvaughn/react-window/blob/master/src/domHelpers.js
     */

  }, {
    key: "rtlOffsetType",
    get: function get() {
      if (DomUtils._rtlOffsetType) return DomUtils._rtlOffsetType;
      var outerDiv = document.createElement('div');
      var outerStyle = outerDiv.style;
      outerStyle.width = '50px';
      outerStyle.height = '50px';
      outerStyle.overflow = 'scroll';
      outerStyle.direction = 'rtl';
      var innerDiv = document.createElement('div');
      var innerStyle = innerDiv.style;
      innerStyle.width = '100px';
      innerStyle.height = '100px';
      outerDiv.appendChild(innerDiv);
      document.body.appendChild(outerDiv);

      if (outerDiv.scrollLeft > 0) {
        DomUtils._rtlOffsetType = 'positive-descending';
      } else {
        outerDiv.scrollLeft = 1;

        if (outerDiv.scrollLeft === 0) {
          DomUtils._rtlOffsetType = 'negative';
        } else {
          DomUtils._rtlOffsetType = 'positive-ascending';
        }
      }

      document.body.removeChild(outerDiv);
      return DomUtils._rtlOffsetType;
    }
  }, {
    key: "isPositionStickySupported",
    get: function get() {
      // https://github.com/dollarshaveclub/stickybits/issues/35#issuecomment-549929578
      if (DomUtils._isPositionStickySupported !== null) return DomUtils._isPositionStickySupported;
      var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
      var testElementStyle = document.head.style;

      for (var i = 0; i < prefix.length; i += 1) {
        testElementStyle.position = "".concat(prefix[i], "sticky");
      }

      DomUtils._isPositionStickySupported = testElementStyle.position === 'sticky';
      return DomUtils._isPositionStickySupported;
    }
  }]);

  return DomUtils;
}();

_defineProperty(DomUtils, "_scrollbarWidth", null);

_defineProperty(DomUtils, "_rtlOffsetType", void 0);

_defineProperty(DomUtils, "_isPositionStickySupported", null);

var ReactUtils = /*#__PURE__*/function () {
  function ReactUtils() {
    _classCallCheck(this, ReactUtils);
  }

  _createClass(ReactUtils, null, [{
    key: "addPropsToChildren",
    value: function addPropsToChildren(children, createPropsToAdd) {
      // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
      return Children.map(children, function (child, index) {
        var propsToAdd = createPropsToAdd(child, index);
        return cloneElement(child, propsToAdd);
      });
    }
  }, {
    key: "childrenOfType",
    value: function childrenOfType(parentElement, type) {
      var children = ReactUtils.childrenArray(parentElement);
      if (!children) return null;
      return children.filter(function (child) {
        return ReactUtils.elementInstanceOf(child, type);
      });
    }
    /**
     * Return the only child that matches the given type.  
     * If more than one child matches an error is thrown.  
     * 
     * Notice that this function gives no indication of the total number of
     * children, only the number of matching children.
     * @param parentElement 
     * @param type 
     */

  }, {
    key: "singleChildOfType",
    value: function singleChildOfType(parentElement, type) {
      var matchingChildren = ReactUtils.childrenOfType(parentElement, type);
      if (!matchingChildren || !matchingChildren.length) return null;
      if (matchingChildren.length > 1) throw new Error("Only one ".concat(type.name, " child element is allowed."));
      return matchingChildren[0];
    }
  }, {
    key: "compareKeys",
    value: function compareKeys(a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }

      return 0;
    } //
    // private methods
    //

  }, {
    key: "childrenArray",
    value: function childrenArray(parentElement) {
      if (!parentElement) return null;
      if (!parentElement.props) return null;
      var children = parentElement.props.children;
      if (Array.isArray(children)) return children;
      return Children.map(children, function (child) {
        return child;
      });
    }
  }, {
    key: "elementInstanceOf",
    value: function elementInstanceOf(elem, type) {
      if (!elem) return false;
      if (!elem.type) return false; // https://stackoverflow.com/questions/39387405/using-instanceof-to-test-for-base-class-of-a-react-component
      // https://stackoverflow.com/questions/14486110/how-to-check-if-a-javascript-class-inherits-another-without-creating-an-obj
      // https://stackoverflow.com/questions/2464426/whats-the-difference-between-isprototypeof-and-instanceof-in-javascript

      return elem.type === type || elem.type.prototype instanceof type || Object.prototype.isPrototypeOf.call(type, elem.type);
    }
  }]);

  return ReactUtils;
}();

var ScrollUtils = /*#__PURE__*/function () {
  function ScrollUtils() {
    _classCallCheck(this, ScrollUtils);
  }

  _createClass(ScrollUtils, null, [{
    key: "normalizeScrollEvent",
    value: function normalizeScrollEvent(e, docDir) {
      var _e$currentTarget = e.currentTarget,
          scrollTop = _e$currentTarget.scrollTop,
          scrollLeft = _e$currentTarget.scrollLeft;
      var _e$currentTarget2 = e.currentTarget,
          scrollHeight = _e$currentTarget2.scrollHeight,
          scrollWidth = _e$currentTarget2.scrollWidth,
          clientHeight = _e$currentTarget2.clientHeight,
          clientWidth = _e$currentTarget2.clientWidth; // RTL support

      var normalizedScrollLeft = scrollLeft;

      if (docDir === 'rtl') {
        switch (DomUtils.rtlOffsetType) {
          case 'negative':
            normalizedScrollLeft = -scrollLeft;
            break;

          case 'positive-ascending':
            // noop
            break;

          case 'positive-descending':
          default:
            normalizedScrollLeft = scrollWidth - clientWidth - scrollLeft;
            break;
        }
      } // fix scroll offset to prevent "over scroll"


      var normalizedScrollTop = Math.min(scrollTop, scrollHeight - clientHeight);
      normalizedScrollTop = Math.max(0, scrollTop);
      normalizedScrollLeft = Math.min(normalizedScrollLeft, scrollWidth - clientWidth);
      normalizedScrollLeft = Math.max(0, normalizedScrollLeft);
      return {
        scrollTop: normalizedScrollTop,
        rawScrollLeft: scrollLeft,
        normalizedScrollLeft: normalizedScrollLeft
      };
    }
  }]);

  return ScrollUtils;
}();

var SizeUtils = /*#__PURE__*/function () {
  function SizeUtils() {
    _classCallCheck(this, SizeUtils);
  }

  _createClass(SizeUtils, null, [{
    key: "cssSizeString",
    value: function cssSizeString(size) {
      if (Number.isFinite(size)) return size + 'px';
      return size;
    }
  }, {
    key: "getElementHeights",
    value: function getElementHeights(component, defaultHeight) {
      var style = component && component.props.style || {};
      var height = style.height;
      var minHeight = style.minHeight;
      var maxHeight = style.maxHeight;

      if (height === undefined && minHeight === undefined) {
        height = defaultHeight;
      }

      height = this.cssSizeString(height);
      minHeight = this.cssSizeString(minHeight);
      maxHeight = this.cssSizeString(maxHeight);
      return {
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight
      };
    }
  }]);

  return SizeUtils;
}();

function isNullOrUndefined(val) {
  return val === null || val === undefined;
}
function asArray(val) {
  if (Array.isArray(val)) return val;
  return [val];
}
function areShallowEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }

  var keysA = Object.keys(a);
  var keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (var _i = 0, _keysA = keysA; _i < _keysA.length; _i++) {
    var key = _keysA[_i];
    if (a[key] !== b[key]) return false;
  }

  return true;
}

var RecycleManager = /*#__PURE__*/function () {
  function RecycleManager() {
    _classCallCheck(this, RecycleManager);

    _defineProperty(this, "stableKeySource", 0);

    _defineProperty(this, "freeKeysPool", {});

    _defineProperty(this, "usedKeysOriginalToStable", {});
  }

  _createClass(RecycleManager, [{
    key: "freeUnusedKeys",
    //
    // public methods
    //
    value: function freeUnusedKeys(nextOriginalKeys) {
      var nextKeys = nextOriginalKeys.slice();
      nextKeys.sort();
      var prevKeys = Object.keys(this.usedKeysOriginalToStable);
      prevKeys.sort();
      var nextIndex = nextKeys.length - 1;
      var prevIndex = prevKeys.length - 1;

      while (nextIndex >= 0 && prevIndex >= 0) {
        var nextOriginal = nextKeys[nextIndex];
        var prevOriginal = prevKeys[prevIndex];

        if (nextOriginal === prevOriginal) {
          // still using the key - don't free
          nextIndex--;
          prevIndex--;
        } else if (nextOriginal > prevOriginal) {
          // still using the key - don't free
          nextIndex--;
        } else {
          // not using the key - return to pool
          this.freeUnusedKey(prevOriginal);
          prevIndex--;
        }
      } // return remaining keys to pool


      while (prevIndex >= 0) {
        var _prevOriginal = prevKeys[prevIndex];
        this.freeUnusedKey(_prevOriginal);
        prevIndex--;
      }
    }
  }, {
    key: "getStableKey",
    value: function getStableKey(originalKey) {
      if (this.usedKeysOriginalToStable[originalKey] !== undefined) {
        return this.usedKeysOriginalToStable[originalKey];
      } else {
        var stableKey = this.getNextKeyFromPool();
        this.usedKeysOriginalToStable[originalKey] = stableKey;
        return stableKey;
      }
    } //
    // private methods
    //

  }, {
    key: "getNextKeyFromPool",
    value: function getNextKeyFromPool() {
      // find next key in pool        
      var result;

      for (var key in this.freeKeysPool) {
        if (this.freeKeysPool.hasOwnProperty(key)) {
          result = key;
          break;
        }
      }

      if (result === undefined) {
        // generate new key
        result = this.stableKeySource;
        this.stableKeySource++;
      } else {
        // remove from pool
        delete this.freeKeysPool[result];
      }

      return result;
    }
  }, {
    key: "freeUnusedKey",
    value: function freeUnusedKey(originalKey) {
      var stableKey = this.usedKeysOriginalToStable[originalKey];
      delete this.usedKeysOriginalToStable[originalKey];
      this.freeKeysPool[stableKey] = true;
    }
  }]);

  return RecycleManager;
}();

/***
 * Each `VirtualWindow` creates a constant number of these `VirtualCell`s and just
 * moves them around. This is much more efficient than creating a new cell on
 * each scroll.
 *
 * based on:
 * https://github.com/Flipkart/recyclerlistview/blob/master/src/platform/web/viewrenderer/ViewRenderer.tsx
 */
var VirtualCell = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(VirtualCell, _React$PureComponent);

  var _super = _createSuper(VirtualCell);

  function VirtualCell() {
    _classCallCheck(this, VirtualCell);

    return _super.apply(this, arguments);
  }

  _createClass(VirtualCell, [{
    key: "render",
    value: function render() {
      var _ref;

      var rightOrLeft = this.props.direction === 'rtl' ? 'right' : 'left'; // https://rtl-css.net/tutorial/quick-tip-rtling-css3-transform-functions-translate-and-translatex

      var transformModifier = this.props.direction === 'rtl' ? -1 : 1;
      var transform = "translate(".concat(this.props.left * transformModifier, "px,").concat(this.props.top, "px)");
      return /*#__PURE__*/createElement("div", {
        className: this.props.className,
        style: (_ref = {
          boxSizing: 'border-box',
          height: this.props.height,
          width: this.props.width,
          position: "absolute"
        }, _defineProperty(_ref, rightOrLeft, 0), _defineProperty(_ref, "top", 0), _defineProperty(_ref, "willChange", "transform"), _defineProperty(_ref, "transform", transform), _ref)
      }, this.props.children);
    }
  }]);

  return VirtualCell;
}(PureComponent);

var CalcData = function CalcData() {
  _classCallCheck(this, CalcData);

  _defineProperty(this, "cache", {});

  _defineProperty(this, "lastMeasuredIndex", -1);

  _defineProperty(this, "lastFromPosition", -1);
};

/**
 * Calculates the index, size and position of all visible items within a given
 * range.
 *
 * based on:
 * - https://github.com/bvaughn/react-window/blob/master/src/VariableSizeGrid.js
 * - https://github.com/fulcrumapp/react-virtual-grid/blob/master/src/grid-calculator.js
 * - https://github.com/ranneyd/sticky-table/blob/master/src/useVirtual.js
 */
var WindowCalculator = /*#__PURE__*/function () {
  function WindowCalculator() {
    _classCallCheck(this, WindowCalculator);

    _defineProperty(this, "data", {
      column: new CalcData(),
      row: new CalcData()
    });
  }

  _createClass(WindowCalculator, [{
    key: "elementsInRange",
    //
    // public methods
    //
    value: function elementsInRange(elementType, fromPosition, toPosition, elementsOverscan, elementSize, minElementsCountToReturn, totalElementsCount) {
      var fromIndex = this.findNearestItem(elementType, fromPosition, totalElementsCount, elementSize);
      var toIndex = this.findNearestItem(elementType, toPosition, totalElementsCount, elementSize); // Determine scroll direction and set overscan accordingly

      if (fromPosition < this.data[elementType].lastFromPosition) {
        fromIndex -= elementsOverscan;
      } else {
        toIndex += elementsOverscan;
      }

      this.data[elementType].lastFromPosition = fromPosition; // Enforce "minElementsCountToReturn"

      while (toIndex - fromIndex + 1 < minElementsCountToReturn) {
        if (toIndex + 1 < totalElementsCount) {
          toIndex++;
        } else {
          fromIndex--;
        }
      } // Prevent range error


      fromIndex = Math.max(0, fromIndex);
      toIndex = Math.min(toIndex, totalElementsCount - 1); // Get elements info

      var info = [];

      for (var i = fromIndex; i <= toIndex; i++) {
        info.push(this.getElementInfo(elementType, i, elementSize));
      }

      return info;
    }
  }, {
    key: "getTotalSize",
    value: function getTotalSize(elementType, elementSize, estimatedElementSize, elementsCount) {
      // Handle unmeasured elements
      var lastMeasuredIndex;
      var totalSizeOfUnmeasuredElements = 0;

      if (typeof elementSize === "function" && !estimatedElementSize) {
        // Dynamic element size and no estimation - force evaluation of all unmeasured elements.
        this.getElementInfo(elementType, elementsCount - 1, elementSize); // Update last measured index after evaluation

        lastMeasuredIndex = Math.min(this.data[elementType].lastMeasuredIndex, elementsCount - 1);
      } else {
        // Constant element size - use simple multiplication for unmeasured elements.
        lastMeasuredIndex = Math.min(this.data[elementType].lastMeasuredIndex, elementsCount - 1);
        var numUnmeasuredElementsCount = elementsCount - lastMeasuredIndex - 1;
        var elementSizeOrEstimate = typeof elementSize === "number" ? elementSize : estimatedElementSize;
        totalSizeOfUnmeasuredElements = numUnmeasuredElementsCount * elementSizeOrEstimate;
      } // Get total size of already measured elements


      var totalSizeOfMeasuredElements = 0;

      if (lastMeasuredIndex >= 0) {
        var cache = this.data[elementType].cache;
        var lastMeasuredElemInfo = cache[lastMeasuredIndex];
        totalSizeOfMeasuredElements = lastMeasuredElemInfo.position + lastMeasuredElemInfo.size;
      } // Sum and return


      return totalSizeOfMeasuredElements + totalSizeOfUnmeasuredElements;
    } //
    // private methods
    //

  }, {
    key: "findNearestItem",
    value: function findNearestItem(elementType, position, maxIndex, elementSize) {
      var _cache$lastMeasuredIn, _cache$lastMeasuredIn2;

      var _this$data$elementTyp = this.data[elementType],
          lastMeasuredIndex = _this$data$elementTyp.lastMeasuredIndex,
          cache = _this$data$elementTyp.cache;
      var lastMeasuredPosition = (_cache$lastMeasuredIn = (_cache$lastMeasuredIn2 = cache[lastMeasuredIndex]) === null || _cache$lastMeasuredIn2 === void 0 ? void 0 : _cache$lastMeasuredIn2.position) !== null && _cache$lastMeasuredIn !== void 0 ? _cache$lastMeasuredIn : -1;

      if (lastMeasuredPosition >= position) {
        // If we've already measured items within this range just use a binary search as it's faster.
        return this.findNearestItemBinarySearch(elementType, lastMeasuredIndex, 0, position, elementSize);
      } else {
        // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
        // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
        // The overall complexity for this approach is O(log n).
        return this.findNearestItemExponentialSearch(elementType, Math.max(lastMeasuredIndex, 0), maxIndex, position, elementSize);
      }
    }
  }, {
    key: "findNearestItemBinarySearch",
    value: function findNearestItemBinarySearch(elementType, high, low, position, elementSize) {
      while (low <= high) {
        var middle = low + Math.floor((high - low) / 2);
        var currentPosition = this.getElementInfo(elementType, middle, elementSize).position;

        if (currentPosition === position) {
          return middle;
        } else if (currentPosition < position) {
          low = middle + 1;
        } else if (currentPosition > position) {
          high = middle - 1;
        }
      }

      if (low > 0) {
        return low - 1;
      } else {
        return 0;
      }
    }
  }, {
    key: "findNearestItemExponentialSearch",
    value: function findNearestItemExponentialSearch(elementType, index, maxIndex, position, elementSize) {
      var interval = 1;

      while (index < maxIndex && this.getElementInfo(elementType, index, elementSize).position < position) {
        index += interval;
        interval *= 2;
      }

      return this.findNearestItemBinarySearch(elementType, Math.min(index, maxIndex - 1), Math.floor(index / 2), position, elementSize);
    }
  }, {
    key: "getElementInfo",
    value: function getElementInfo(elementType, elementIndex, elementSize) {
      var _this$data$elementTyp2 = this.data[elementType],
          lastMeasuredIndex = _this$data$elementTyp2.lastMeasuredIndex,
          cache = _this$data$elementTyp2.cache; // fill missing cache entries

      if (elementIndex > lastMeasuredIndex) {
        var position = 0; // skipped already cached entries

        if (lastMeasuredIndex !== -1) {
          var elementInfo = cache[lastMeasuredIndex];
          position = elementInfo.position + elementInfo.size;
        } // add new cache entries


        for (var index = lastMeasuredIndex + 1; index <= elementIndex; index++) {
          var _cache$index;

          var size = this.getSize(index, elementSize, (_cache$index = cache[index]) === null || _cache$index === void 0 ? void 0 : _cache$index.size);
          cache[index] = {
            index: index,
            position: position,
            size: size
          };
          position += size;
        }

        this.data[elementType].lastMeasuredIndex = elementIndex;
      }

      return cache[elementIndex];
    }
  }, {
    key: "getSize",
    value: function getSize(index, elementSize, cache) {
      if (cache !== null && cache !== undefined) return cache;
      if (typeof elementSize === "number") return elementSize;
      if (typeof elementSize === "function") return elementSize(index);
      throw new Error("Invalid argument '".concat("elementSize", "' expected a number or a function ") + "but received '".concat(_typeof(elementSize), "': ").concat(elementSize, "."));
    }
  }]);

  return WindowCalculator;
}();

var VirtualWindowProps = function VirtualWindowProps() {
  _classCallCheck(this, VirtualWindowProps);

  _defineProperty(this, "direction", 'ltr');

  _defineProperty(this, "controlledScroll", void 0);

  _defineProperty(this, "scrollDirection", 'both');

  _defineProperty(this, "height", void 0);

  _defineProperty(this, "width", void 0);

  _defineProperty(this, "columnCount", void 0);

  _defineProperty(this, "rowCount", void 0);

  _defineProperty(this, "columnWidth", void 0);

  _defineProperty(this, "rowHeight", void 0);

  _defineProperty(this, "overscanColumnsCount", 0);

  _defineProperty(this, "overscanRowCount", 0);

  _defineProperty(this, "innerElementType", 'div');

  _defineProperty(this, "innerRef", void 0);

  _defineProperty(this, "outerElementType", 'div');

  _defineProperty(this, "outerRef", void 0);

  _defineProperty(this, "className", void 0);

  _defineProperty(this, "style", void 0);

  _defineProperty(this, "children", void 0);
};

var VirtualWindowState = function VirtualWindowState() {
  _classCallCheck(this, VirtualWindowState);

  _defineProperty(this, "scrollTop", 0);

  _defineProperty(this, "scrollLeft", 0);

  _defineProperty(this, "opacity", void 0);
};

var VirtualWindow = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(VirtualWindow, _React$PureComponent);

  var _super = _createSuper(VirtualWindow);

  _createClass(VirtualWindow, [{
    key: "className",
    get: function get() {
      return this.props.className || "VirtualWindow";
    }
    /**
     * Make sure to return a constant number of elements, this is important for
     * recycling purposes.
     */

  }]);

  function VirtualWindow(props) {
    var _this;

    _classCallCheck(this, VirtualWindow);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "minColumnsToRender", 0);

    _defineProperty(_assertThisInitialized(_this), "minRowsToRender", 0);

    _defineProperty(_assertThisInitialized(_this), "windowCalc", new WindowCalculator());

    _defineProperty(_assertThisInitialized(_this), "recycler", new RecycleManager());

    _defineProperty(_assertThisInitialized(_this), "prevProps", void 0);

    _defineProperty(_assertThisInitialized(_this), "containerElement", createRef());

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function (e) {
      var normalized = ScrollUtils.normalizeScrollEvent(e, _this.props.direction);

      _this.setScrollState({
        scrollTop: normalized.scrollTop,
        scrollLeft: normalized.normalizedScrollLeft
      });
    });

    _this.state = new VirtualWindowState();
    return _this;
  } //
  // public methods
  //


  _createClass(VirtualWindow, [{
    key: "scrollTo",
    value: function scrollTo(e) {
      this.containerElementScroll({
        scrollTop: e.scrollTop,
        scrollLeft: e.rawScrollLeft
      });
      this.setScrollState({
        scrollTop: e.scrollTop,
        scrollLeft: e.normalizedScrollLeft
      });
    }
  }, {
    key: "getScrollableHeight",
    value: function getScrollableHeight() {
      return this.windowCalc.getTotalSize('row', this.props.rowHeight, null, // this.props.estimatedRowHeight,
      this.props.rowCount);
    }
  }, {
    key: "getScrollableWidth",
    value: function getScrollableWidth() {
      return this.windowCalc.getTotalSize('column', this.props.columnWidth, null, // this.props.estimatedColumnWidth,
      this.props.columnCount);
    }
  }, {
    key: "clearCache",
    value: function clearCache() {
      this.windowCalc = new WindowCalculator();
      this.minColumnsToRender = 0;
      this.minRowsToRender = 0;
    } //
    // life cycle
    //

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.direction === 'rtl' && !areShallowEqual(this.props, prevProps)) {
        this.rtlRedrawHack();
      }

      if (this.props.outerRef) {
        this.props.outerRef.current = this.containerElement.current;
      }
    } //
    // render methods
    //

  }, {
    key: "render",
    value: function render() {
      if (!areShallowEqual(this.props, this.prevProps)) {
        this.prevProps = this.props;
        this.clearCache();
      }

      var overflow = this.props.controlledScroll ? 'hidden' : 'auto';
      var onScroll = this.props.controlledScroll ? undefined : this.handleScroll;
      return (// outer element - container
        createElement(this.props.outerElementType, {
          ref: this.containerElement,
          className: this.className + '_Container',
          style: _objectSpread2({
            direction: this.props.direction,
            height: this.props.height,
            width: this.props.width,
            position: 'relative',
            overflow: overflow
          }, this.props.style, {
            opacity: this.state.opacity
          }),
          onScroll: onScroll
        }, // inner element - scrollable area
        createElement(this.props.innerElementType, {
          ref: this.props.innerRef,
          className: this.className + '_ScrollableArea',
          style: {
            height: this.getScrollableHeight(),
            width: this.getScrollableWidth()
          }
        }, this.renderCells()))
      );
    }
  }, {
    key: "renderCells",
    value: function renderCells() {
      // get cell indexes to render
      var columns = this.windowCalc.elementsInRange('column', this.state.scrollLeft, this.state.scrollLeft + this.props.width, this.props.overscanColumnsCount, this.props.columnWidth, this.minColumnsToRender, this.props.columnCount);
      var rows = this.windowCalc.elementsInRange('row', this.state.scrollTop, this.state.scrollTop + this.props.height, this.props.overscanRowCount, this.props.rowHeight, this.minRowsToRender, this.props.rowCount); // always render the same amount of items (important for recycling)

      this.minColumnsToRender = columns.length;
      this.minRowsToRender = rows.length; // free unused stable keys before rendering

      var originalKeys = [];

      var _iterator = _createForOfIteratorHelper(rows),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var row = _step.value;

          var _iterator3 = _createForOfIteratorHelper(columns),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var col = _step3.value;
              originalKeys.push(this.getCellOriginalKey(col.index, row.index));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.recycler.freeUnusedKeys(originalKeys); // render cells

      var cells = [];

      var _iterator2 = _createForOfIteratorHelper(rows),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _row = _step2.value;

          var _iterator4 = _createForOfIteratorHelper(columns),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _col = _step4.value;
              var originalKey = this.getCellOriginalKey(_col.index, _row.index);
              var stableKey = this.recycler.getStableKey(originalKey);
              cells.push(this.renderCell(_col, _row, stableKey));
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        } // sort the cells by key order (important for recycling)

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      cells.sort(function (a, b) {
        return ReactUtils.compareKeys(a.key, b.key);
      });
      return cells;
    }
  }, {
    key: "renderCell",
    value: function renderCell(col, row, stableKey) {
      return /*#__PURE__*/createElement(VirtualCell, {
        className: this.className + '_Cell',
        key: stableKey,
        direction: this.props.direction,
        height: row.size,
        width: col.size,
        top: row.position,
        left: col.position
      }, this.props.children({
        colIndex: col.index,
        rowIndex: row.index,
        height: row.size,
        width: col.size
      }));
    } //
    // scroll handlers
    //

  }, {
    key: "containerElementScroll",
    value: function containerElementScroll(e) {
      var _this2 = this;

      switch (this.props.scrollDirection) {
        case 'both':
          window.requestAnimationFrame(function () {
            _this2.containerElement.current.scrollTop = e.scrollTop;
            _this2.containerElement.current.scrollLeft = e.scrollLeft;
          });
          break;

        case 'vertical':
          window.requestAnimationFrame(function () {
            _this2.containerElement.current.scrollTop = e.scrollTop;
          });
          break;

        case 'horizontal':
          window.requestAnimationFrame(function () {
            _this2.containerElement.current.scrollLeft = e.scrollLeft;
          });
          break;

        case 'none':
          break;

        default:
          throw new Error("Invalid ".concat("scrollDirection", " value: '").concat(this.props.scrollDirection, "'."));
      }
    }
  }, {
    key: "setScrollState",
    value: function setScrollState(e) {
      switch (this.props.scrollDirection) {
        case 'both':
          this.setState(e);
          break;

        case 'vertical':
          this.setState({
            scrollTop: e.scrollTop
          });
          break;

        case 'horizontal':
          this.setState({
            scrollLeft: e.scrollLeft
          });
          break;

        case 'none':
          break;

        default:
          throw new Error("Invalid ".concat("scrollDirection", " value: '").concat(this.props.scrollDirection, "'."));
      }
    } //
    // render helpers
    //

  }, {
    key: "getCellOriginalKey",
    value: function getCellOriginalKey(colIndex, rowIndex) {
      return "".concat(colIndex, ", ").concat(rowIndex);
    }
  }, {
    key: "rtlRedrawHack",
    value: function rtlRedrawHack() {
      var _ref,
          _this$props$style,
          _this3 = this;

      // There's an issue when dynamically removing columns in RTL.
      // For some reason Chrome does not correctly redraw in RTL mode...
      // https://stackoverflow.com/questions/8840580/force-dom-redraw-refresh-on-chrome-mac#29946331
      var opacity = ((_ref = (_this$props$style = this.props.style) === null || _this$props$style === void 0 ? void 0 : _this$props$style.opacity) !== null && _ref !== void 0 ? _ref : 1) - 0.01;
      this.setState({
        opacity: opacity
      }, function () {
        return setTimeout(function () {
          return _this3.setState({
            opacity: undefined
          });
        }, 0);
      });
    }
  }]);

  return VirtualWindow;
}(PureComponent);

_defineProperty(VirtualWindow, "defaultProps", new VirtualWindowProps());

var TileKey;

(function (TileKey) {
  TileKey["HeaderLeft"] = "Header_Left";
  TileKey["HeaderCenter"] = "Header_Center";
  TileKey["HeaderRight"] = "Header_Right";
  TileKey["BodyLeft"] = "Body_Left";
  TileKey["BodyCenter"] = "Body_Center";
  TileKey["BodyRight"] = "Body_Right";
  TileKey["FooterLeft"] = "Footer_Left";
  TileKey["FooterCenter"] = "Footer_Center";
  TileKey["FooterRight"] = "Footer_Right";
})(TileKey || (TileKey = {}));

var GridState = function GridState() {
  _classCallCheck(this, GridState);

  _defineProperty(this, "scrollTop", 0);

  _defineProperty(this, "normalizedScrollLeft", 0);

  _defineProperty(this, "rawScrollLeft", void 0);
};

var GridProps = function GridProps() {
  _classCallCheck(this, GridProps);

  _defineProperty(this, "columnCount", void 0);

  _defineProperty(this, "rowCount", void 0);

  _defineProperty(this, "columnWidth", void 0);

  _defineProperty(this, "rowHeight", void 0);

  _defineProperty(this, "overscanColumnsCount", 0);

  _defineProperty(this, "overscanRowCount", 0);

  _defineProperty(this, "fixedHeaderHeight", 0);

  _defineProperty(this, "fixedFooterHeight", 0);

  _defineProperty(this, "fixedLeftWidth", 0);

  _defineProperty(this, "fixedRightWidth", 0);

  _defineProperty(this, "style", void 0);

  _defineProperty(this, "className", void 0);

  _defineProperty(this, "onClick", void 0);

  _defineProperty(this, "onScroll", void 0);

  _defineProperty(this, "children", void 0);
};
var Grid = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Grid, _React$PureComponent);

  var _super = _createSuper(Grid);

  _createClass(Grid, [{
    key: "direction",
    get: function get() {
      var _this$props$style;

      return ((_this$props$style = this.props.style) === null || _this$props$style === void 0 ? void 0 : _this$props$style.direction) === 'rtl' ? 'rtl' : 'ltr';
    }
  }, {
    key: "activeTiles",
    get: function get() {
      return Object.keys(this.tiles);
    }
  }]);

  function Grid(_props) {
    var _this;

    _classCallCheck(this, Grid);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "width", 0);

    _defineProperty(_assertThisInitialized(_this), "height", 0);

    _defineProperty(_assertThisInitialized(_this), "tiles", {});

    _defineProperty(_assertThisInitialized(_this), "initialCalculator", new WindowCalculator());

    _defineProperty(_assertThisInitialized(_this), "prevProps", void 0);

    _defineProperty(_assertThisInitialized(_this), "renderTile", function (tileKey) {
      var _this$tiles$tileKey = _this.tiles[tileKey],
          ref = _this$tiles$tileKey.ref,
          props = _this$tiles$tileKey.props,
          rowIndexOffset = _this$tiles$tileKey.rowIndexOffset,
          columnIndexOffset = _this$tiles$tileKey.columnIndexOffset;
      return /*#__PURE__*/createElement(VirtualWindow, _extends({
        key: tileKey,
        ref: ref
      }, props), function (renderProps) {
        return _this.props.children({
          tileKey: tileKey,
          tilePosition: _this.getTilePosition(tileKey),
          absRowIndex: renderProps.rowIndex + rowIndexOffset,
          absColIndex: renderProps.colIndex + columnIndexOffset,
          relRowIndex: renderProps.rowIndex,
          relColIndex: renderProps.colIndex,
          height: renderProps.height,
          width: renderProps.width
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function (e) {
      var _this$props$onScroll, _this$props;

      var normalized = ScrollUtils.normalizeScrollEvent(e, _this.direction);
      var isRtl = _this.direction === 'rtl';

      if (!DomUtils.isPositionStickySupported || isRtl) {
        // Need to restore tiles position
        _this.setState({
          scrollTop: normalized.scrollTop,
          normalizedScrollLeft: normalized.normalizedScrollLeft,
          rawScrollLeft: normalized.rawScrollLeft
        });
      } // Scroll tiles content


      var _iterator = _createForOfIteratorHelper(_this.activeTiles),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tileKey = _step.value;
          var ref = _this.tiles[tileKey].ref;
          ref.current.scrollTo(normalized);
        } // Raise the onScroll event

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      (_this$props$onScroll = (_this$props = _this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props, {
        scrollTop: normalized.scrollTop,
        scrollLeft: normalized.normalizedScrollLeft
      });
    });

    _this.state = new GridState();
    _this.tiles = _this.createTilesMap();
    return _this;
  }

  _createClass(Grid, [{
    key: "refresh",
    value: function refresh() {
      this.clearCache();
      this.forceUpdate();
    } //
    // render methods
    //

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!areShallowEqual(this.props, this.prevProps)) {
        this.prevProps = this.props;
        this.clearCache();
      }

      return /*#__PURE__*/createElement(ErrorBoundary, null, /*#__PURE__*/createElement("div", {
        className: this.props.className,
        style: _objectSpread2({
          direction: this.direction,
          width: '100%'
        }, this.props.style, {}, SizeUtils.getElementHeights(this, Grid.defaultHeight)),
        onClick: this.props.onClick
      }, /*#__PURE__*/createElement(AutoSizer, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return _this2.renderGrid(width, height);
      })));
    }
  }, {
    key: "renderGrid",
    value: function renderGrid(width, height) {
      var _this3 = this;

      // assign width and height
      if (this.width !== width || this.height !== height) {
        setTimeout(function () {
          return _this3.refresh();
        }, 0);
      }

      this.width = width;
      this.height = height; // render

      return /*#__PURE__*/createElement("div", {
        className: this.createClassName('Main_Container'),
        style: _objectSpread2({
          direction: this.direction,
          position: 'relative',
          height: this.getContainerHeight(),
          width: this.getContainerWidth(),
          overflow: 'auto'
        }, this.props.style),
        onScroll: this.handleScroll
      }, /*#__PURE__*/createElement("div", {
        className: this.createClassName('Main_ScrollableArea'),
        style: {
          height: this.getScrollableHeight(),
          width: this.getScrollableWidth()
        }
      }, this.renderTilesRow('header'), this.renderTilesRow('body'), this.renderTilesRow('footer')));
    }
  }, {
    key: "renderTilesRow",
    value: function renderTilesRow(rowKey) {
      var _this4 = this,
          _this$state$rawScroll,
          _ref2;

      var tileKeys = this.getTilesInRow(rowKey);
      if (!(tileKeys === null || tileKeys === void 0 ? void 0 : tileKeys.length)) return null;
      var firstTile = this.tiles[tileKeys[0]];
      var isRtl = this.direction === 'rtl';
      var rightOrLeft = isRtl ? 'right' : 'left';
      var isSticky = DomUtils.isPositionStickySupported;
      var position = isSticky ? 'sticky' : 'absolute';
      var topOffset = isSticky ? 0 : this.state.scrollTop;
      var leftOffset = isSticky ? 0 : this.state.normalizedScrollLeft;
      var width = tileKeys.map(function (key) {
        return _this4.tiles[key].props.width;
      }).reduce(function (total, cur) {
        return total + cur;
      }, 0); // https://stackoverflow.com/questions/58578298/position-sticky-with-direction-rtl-not-working

      var marginLeft = isSticky && isRtl ? (_this$state$rawScroll = this.state.rawScrollLeft) !== null && _this$state$rawScroll !== void 0 ? _this$state$rawScroll : this.getScrollableWidth() - width : 0;
      return /*#__PURE__*/createElement("div", {
        className: this.createClassName('TilesRow'),
        style: (_ref2 = {
          display: 'flex',
          position: position,
          top: firstTile.tileRowTop + topOffset
        }, _defineProperty(_ref2, rightOrLeft, 0 + leftOffset), _defineProperty(_ref2, "marginLeft", marginLeft), _defineProperty(_ref2, "height", firstTile.props.height), _defineProperty(_ref2, "width", width), _ref2)
      }, tileKeys.map(this.renderTile));
    }
  }, {
    key: "clearCache",
    //
    // render helpers
    //
    value: function clearCache() {
      this.initialCalculator = new WindowCalculator();
      this.tiles = this.createTilesMap();
    }
  }, {
    key: "getTilesInRow",
    value: function getTilesInRow(rowKey) {
      var _this5 = this;

      return this.activeTiles.filter(function (key) {
        return _this5.tiles[key].position.vertical === rowKey;
      });
    }
  }, {
    key: "createTilesMap",
    value: function createTilesMap() {
      this.resetTiles();
      var map = {};
      var hasHeader = !!this.props.fixedHeaderHeight;
      var hasFooter = !!this.props.fixedFooterHeight;
      var hasFixedLeftColumn = !!this.props.fixedLeftWidth;
      var hasFixedRightColumn = !!this.props.fixedRightWidth;
      var createTilesMapEntry = this.createTileMapEntryFactory(); // header

      if (hasHeader) {
        if (hasFixedLeftColumn) {
          map[TileKey.HeaderLeft] = createTilesMapEntry(TileKey.HeaderLeft);
        }

        map[TileKey.HeaderCenter] = createTilesMapEntry(TileKey.HeaderCenter);

        if (hasFixedRightColumn) {
          map[TileKey.HeaderRight] = createTilesMapEntry(TileKey.HeaderRight);
        }
      } // body


      if (hasFixedLeftColumn) {
        map[TileKey.BodyLeft] = createTilesMapEntry(TileKey.BodyLeft);
      }

      map[TileKey.BodyCenter] = createTilesMapEntry(TileKey.BodyCenter);

      if (hasFixedRightColumn) {
        map[TileKey.BodyRight] = createTilesMapEntry(TileKey.BodyRight);
      } // footer


      if (hasFooter) {
        if (hasFixedLeftColumn) {
          map[TileKey.FooterLeft] = createTilesMapEntry(TileKey.FooterLeft);
        }

        map[TileKey.FooterCenter] = createTilesMapEntry(TileKey.FooterCenter);

        if (hasFixedRightColumn) {
          map[TileKey.FooterRight] = createTilesMapEntry(TileKey.FooterRight);
        }
      }

      return map;
    }
  }, {
    key: "createTileMapEntryFactory",
    value: function createTileMapEntryFactory() {
      var _this6 = this;

      // calculate base dimensions
      var horizontalScrollbarWidth = this.getHorizontalScrollbarWidth();
      var verticalScrollbarWidth = this.getVerticalScrollbarWidth();
      var containerHeight = this.getContainerHeight();
      var containerWidth = this.getContainerWidth();
      var headerHeight = this.props.fixedHeaderHeight;
      var footerHeight = this.props.fixedFooterHeight;
      var bodyHeight = containerHeight - horizontalScrollbarWidth - headerHeight - footerHeight;
      var leftWidth = this.props.fixedLeftWidth;
      var rightWidth = this.props.fixedRightWidth;
      var centerWidth = containerWidth - verticalScrollbarWidth - leftWidth - rightWidth; // create factory method

      return function (tileKey) {
        var _this6$getTilePositio = _this6.getTilePosition(tileKey),
            vertical = _this6$getTilePositio.vertical,
            horizontal = _this6$getTilePositio.horizontal;

        var isVerticalFixed = vertical === 'header' || vertical === 'footer';
        var isHorizontalFixed = horizontal === 'left' || horizontal === 'right';
        var isCorner = isVerticalFixed && isHorizontalFixed;
        return {
          ref: createRef(),
          position: {
            vertical: vertical,
            horizontal: horizontal
          },
          tileRowTop: vertical === 'header' ? 0 : vertical === 'body' ? headerHeight : headerHeight + bodyHeight,
          rowIndexOffset: vertical === 'header' ? 0 : vertical === 'body' ? headerHeight && 1 : _this6.props.rowCount + (headerHeight && 1),
          columnIndexOffset: horizontal === 'left' ? 0 : horizontal === 'center' ? leftWidth && 1 : _this6.props.columnCount + (leftWidth && 1),
          props: {
            className: _this6.createClassName(tileKey),
            controlledScroll: true,
            scrollDirection: isCorner ? 'none' : isVerticalFixed ? 'horizontal' : isHorizontalFixed ? 'vertical' : 'both',
            direction: _this6.direction,
            height: vertical === 'header' ? headerHeight : vertical === 'body' ? bodyHeight : footerHeight,
            width: horizontal === 'left' ? leftWidth : horizontal === 'center' ? centerWidth : rightWidth,
            columnCount: horizontal === 'left' ? 1 : horizontal === 'center' ? _this6.props.columnCount : 1,
            rowCount: vertical === 'header' ? 1 : vertical === 'body' ? _this6.props.rowCount : 1,
            columnWidth: horizontal === 'left' ? leftWidth : horizontal === 'center' ? _this6.props.columnWidth : rightWidth,
            rowHeight: vertical === 'header' ? headerHeight : vertical === 'body' ? _this6.props.rowHeight : footerHeight,
            overscanColumnsCount: horizontal === 'left' ? 0 : horizontal === 'center' ? _this6.props.overscanColumnsCount : 0,
            overscanRowCount: vertical === 'header' ? 0 : vertical === 'body' ? _this6.props.overscanRowCount : 0
          }
        };
      };
    }
  }, {
    key: "getTilePosition",
    value: function getTilePosition(tileKey) {
      var _tileKey$toLowerCase$ = tileKey.toLowerCase().split('_'),
          _tileKey$toLowerCase$2 = _slicedToArray(_tileKey$toLowerCase$, 2),
          vertical = _tileKey$toLowerCase$2[0],
          horizontal = _tileKey$toLowerCase$2[1];

      return {
        vertical: vertical,
        horizontal: horizontal
      };
    }
  }, {
    key: "resetTiles",
    value: function resetTiles() {
      var _iterator2 = _createForOfIteratorHelper(this.activeTiles),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _this$tiles$tileKey$r;

          var tileKey = _step2.value;
          (_this$tiles$tileKey$r = this.tiles[tileKey].ref.current) === null || _this$tiles$tileKey$r === void 0 ? void 0 : _this$tiles$tileKey$r.clearCache();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.tiles = {};
    }
  }, {
    key: "getContainerHeight",
    value: function getContainerHeight() {
      var scrollableHeight = this.getScrollableHeight();
      var horizontalScrollbarWidth = this.getHorizontalScrollbarWidth();
      return Math.min(this.height, scrollableHeight + horizontalScrollbarWidth);
    }
  }, {
    key: "getContainerWidth",
    value: function getContainerWidth() {
      var scrollableWidth = this.getScrollableWidth();
      var verticalScrollbarWidth = this.getVerticalScrollbarWidth();
      return Math.min(this.width, scrollableWidth + verticalScrollbarWidth);
    }
  }, {
    key: "getScrollableHeight",
    value: function getScrollableHeight() {
      var headerHeight = this.props.fixedHeaderHeight;
      var footerHeight = this.props.fixedFooterHeight;
      var bodyHeight = this.getBodyScrollableHeight();
      return bodyHeight + headerHeight + footerHeight;
    }
  }, {
    key: "getScrollableWidth",
    value: function getScrollableWidth() {
      var leftWidth = this.props.fixedLeftWidth;
      var rightWidth = this.props.fixedRightWidth;
      var bodyWidth = this.getBodyScrollableWidth();
      return bodyWidth + leftWidth + rightWidth;
    }
  }, {
    key: "getBodyScrollableHeight",
    value: function getBodyScrollableHeight() {
      var _this$tiles$TileKey$B, _this$tiles$TileKey$B2;

      var body = (_this$tiles$TileKey$B = this.tiles[TileKey.BodyCenter]) === null || _this$tiles$TileKey$B === void 0 ? void 0 : (_this$tiles$TileKey$B2 = _this$tiles$TileKey$B.ref) === null || _this$tiles$TileKey$B2 === void 0 ? void 0 : _this$tiles$TileKey$B2.current;
      if (body) return body.getScrollableHeight(); // Body not rendered yet - have to calculate independently.  
      // Not so DRY, breaks encapsulation and not very efficient either but I
      // couldn't find a better way to do that which is not terribly ugly...

      return this.initialCalculator.getTotalSize('row', this.props.rowHeight, null, // this.props.estimatedRowHeight,
      this.props.rowCount);
    }
  }, {
    key: "getBodyScrollableWidth",
    value: function getBodyScrollableWidth() {
      var _this$tiles$TileKey$B3, _this$tiles$TileKey$B4;

      var body = (_this$tiles$TileKey$B3 = this.tiles[TileKey.BodyCenter]) === null || _this$tiles$TileKey$B3 === void 0 ? void 0 : (_this$tiles$TileKey$B4 = _this$tiles$TileKey$B3.ref) === null || _this$tiles$TileKey$B4 === void 0 ? void 0 : _this$tiles$TileKey$B4.current;
      if (body) return body.getScrollableWidth(); // Body not rendered yet - have to calculate independently.  
      // Not so DRY, breaks encapsulation and not very efficient either but I
      // couldn't find a better way to do that which is not terribly ugly...

      return this.initialCalculator.getTotalSize('column', this.props.columnWidth, null, // this.props.estimatedColumnWidth,
      this.props.columnCount);
    }
  }, {
    key: "getVerticalScrollbarWidth",
    value: function getVerticalScrollbarWidth() {
      var scrollableHeight = this.getScrollableHeight();
      var hasVerticalScrollbar = scrollableHeight > this.height;
      return hasVerticalScrollbar && DomUtils.scrollbarWidth || 0;
    }
  }, {
    key: "getHorizontalScrollbarWidth",
    value: function getHorizontalScrollbarWidth() {
      var scrollableWidth = this.getScrollableWidth();
      var hasHorizontalScrollbar = scrollableWidth > this.width;
      return hasHorizontalScrollbar && DomUtils.scrollbarWidth || 0;
    }
    /**
     * We are only using classes for easier debug inspection...
     */

  }, {
    key: "createClassName",
    value: function createClassName(className) {
      return "ReactTablize__VirtualGrid__".concat(className);
    }
  }]);

  return Grid;
}(PureComponent);

_defineProperty(Grid, "defaultHeight", '35vh');

_defineProperty(Grid, "defaultProps", new GridProps());

var CustomScrollbarsInner = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(CustomScrollbarsInner, _React$PureComponent);

  var _super = _createSuper(CustomScrollbarsInner);

  function CustomScrollbarsInner() {
    _classCallCheck(this, CustomScrollbarsInner);

    return _super.apply(this, arguments);
  }

  _createClass(CustomScrollbarsInner, [{
    key: "render",
    value: function render() {
      var _this = this;

      // https://github.com/bvaughn/react-window/issues/110#issuecomment-469061213
      var refSetter = function refSetter(elem) {
        if (!_this.props.forwardedRef) return;
        var ref = (elem || {}).view;

        if (typeof _this.props.forwardedRef === 'function') {
          _this.props.forwardedRef(ref);
        } else {
          _this.props.forwardedRef.current = ref;
        }
      };

      return /*#__PURE__*/createElement(Scrollbars, {
        ref: refSetter,
        style: _objectSpread2({}, this.props.style, {
          overflow: 'hidden',
          direction: 'ltr'
        }),
        onScroll: this.props.onScroll
      }, this.props.children);
    }
  }]);

  return CustomScrollbarsInner;
}(PureComponent);

var CustomScrollbars = forwardRef(function (props, ref) {
  return /*#__PURE__*/createElement(CustomScrollbarsInner, _extends({}, props, {
    forwardedRef: ref
  }));
});
CustomScrollbars.displayName = 'CustomScrollbars';

var List = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(List, _React$PureComponent);

  var _super = _createSuper(List);

  function List() {
    var _this;

    _classCallCheck(this, List);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "windowRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "initialCalculator", new WindowCalculator());

    return _this;
  }

  _createClass(List, [{
    key: "refresh",
    value: function refresh() {
      if (this.windowRef.current) {
        this.windowRef.current.clearCache();
      }

      this.forceUpdate();
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(offset) {
      if (this.windowRef.current) {
        var top = this.isHorizontal ? undefined : offset;
        var left = this.isHorizontal ? offset : undefined;
        this.windowRef.current.scrollTo({
          scrollTop: top,
          rawScrollLeft: left,
          normalizedScrollLeft: left
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/createElement(VirtualWindow, {
        ref: this.windowRef,
        direction: this.props.dir,
        scrollDirection: this.isHorizontal ? 'horizontal' : 'vertical',
        style: Object.assign({
          outline: 'none'
        }, this.props.style),
        outerElementType: this.getOuterElementType(),
        height: this.props.height,
        width: this.props.width,
        columnCount: this.isHorizontal ? this.props.itemCount : 1,
        rowCount: this.isHorizontal ? 1 : this.props.itemCount,
        columnWidth: this.isHorizontal ? this.props.itemSize : this.props.width - this.getVerticalScrollbarWidth(),
        rowHeight: this.isHorizontal ? this.props.height - this.getHorizontalScrollbarWidth() : this.props.itemSize,
        overscanColumnsCount: this.isHorizontal ? this.props.overscan : 0,
        overscanRowCount: this.isHorizontal ? 0 : this.props.overscan
      }, function (cellProps) {
        return _this2.renderRow(cellProps);
      });
    }
  }, {
    key: "renderRow",
    value: function renderRow(cellProps) {
      var index = this.props.layout === 'horizontal' ? cellProps.colIndex : cellProps.rowIndex;
      var row = this.props.children(index);
      return cloneElement(row, {
        style: _objectSpread2({}, row.props.style)
      });
    } //
    // render helpers
    //

  }, {
    key: "getVerticalScrollbarWidth",
    value: function getVerticalScrollbarWidth() {
      var scrollableHeight = this.getScrollableHeight();
      var hasVerticalScrollbar = scrollableHeight > this.props.height;
      return hasVerticalScrollbar && DomUtils.scrollbarWidth || 0;
    }
  }, {
    key: "getHorizontalScrollbarWidth",
    value: function getHorizontalScrollbarWidth() {
      var scrollableWidth = this.getScrollableWidth();
      var hasHorizontalScrollbar = scrollableWidth > this.props.width;
      return hasHorizontalScrollbar && DomUtils.scrollbarWidth || 0;
    }
  }, {
    key: "getScrollableHeight",
    value: function getScrollableHeight() {
      if (this.windowRef.current) return this.windowRef.current.getScrollableHeight(); // Body not rendered yet - have to calculate independently.  
      // Not so DRY, breaks encapsulation and not very efficient either but I
      // couldn't find a better way to do that which is not terribly ugly...

      return this.initialCalculator.getTotalSize('row', this.props.itemSize, undefined, this.props.itemCount);
    }
  }, {
    key: "getScrollableWidth",
    value: function getScrollableWidth() {
      if (this.windowRef.current) return this.windowRef.current.getScrollableWidth(); // Body not rendered yet - have to calculate independently.  
      // Not so DRY, breaks encapsulation and not very efficient either but I
      // couldn't find a better way to do that which is not terribly ugly...

      return this.initialCalculator.getTotalSize('column', this.props.itemSize, undefined, this.props.itemCount);
    }
  }, {
    key: "getOuterElementType",
    value: function getOuterElementType() {
      return this.props.customScrollbar ? CustomScrollbars : undefined;
    }
  }, {
    key: "isHorizontal",
    get: function get() {
      return this.props.layout === 'horizontal';
    }
  }]);

  return List;
}(PureComponent);

var ColumnBodyProps = function ColumnBodyProps() {
  _classCallCheck(this, ColumnBodyProps);

  _defineProperty(this, "children", void 0);
};
var ColumnBody = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ColumnBody, _React$PureComponent);

  var _super = _createSuper(ColumnBody);

  function ColumnBody() {
    _classCallCheck(this, ColumnBody);

    return _super.apply(this, arguments);
  }

  return ColumnBody;
}(PureComponent);

var ColumnHead = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ColumnHead, _React$PureComponent);

  var _super = _createSuper(ColumnHead);

  function ColumnHead() {
    _classCallCheck(this, ColumnHead);

    return _super.apply(this, arguments);
  }

  return ColumnHead;
}(PureComponent);

var tableBorder = '1px solid #ddd';
var table = function table() {
  return {
    width: '100%',
    overflowY: 'hidden'
  };
};
var tableCell = function tableCell(theme) {
  var style = {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    boxSizing: 'border-box'
  };

  if (theme.defaultTheme) {
    style.padding = 8;
    style.verticalAlign = 'middle';
  }

  return style;
};
var tableHead = function tableHead(theme) {
  var style = {
    direction: theme.dir,
    display: 'flex',
    overflowY: 'hidden'
  };
  /* add padding to compensate for scrollbar width */

  if (theme.dir === 'rtl') {
    style.paddingLeft = DomUtils.scrollbarWidth;
  } else {
    style.paddingRight = DomUtils.scrollbarWidth;
  }

  if (theme) {
    style.borderBottom = tableBorder;
  }

  return style;
};
var tableBody = function tableBody() {
  return {
    /* no style... */
  };
};
var tableRow = function tableRow(index, theme) {
  var style = {
    display: 'flex',
    justifyContent: 'stretch',
    height: '100%',
    width: '100%'
  };

  if (theme.defaultTheme) {
    style.borderTop = index === 0 ? 'none' : tableBorder;
  }

  return style;
};

var TableBodyProps = function TableBodyProps() {
  _classCallCheck(this, TableBodyProps);

  _defineProperty(this, "children", void 0);
};
var TableBody = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TableBody, _React$PureComponent);

  var _super = _createSuper(TableBody);

  function TableBody() {
    _classCallCheck(this, TableBody);

    return _super.apply(this, arguments);
  }

  _createClass(TableBody, null, [{
    key: "hasChildren",
    value: function hasChildren(body) {
      if (!body) return false;
      if (isNullOrUndefined(body.props.children)) return false;
      if (typeof body.props.children === 'function') return true;
      if (Array.isArray(body.props.children)) return body.props.children.length > 0;
      var childrenCount = Children.count(body.props.children);
      return childrenCount > 0;
    }
  }]);

  return TableBody;
}(PureComponent);

var TableCellSymbol = '__ReactTablize__TableCell__';
var TableCell = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TableCell, _React$PureComponent);

  var _super = _createSuper(TableCell);

  function TableCell() {
    _classCallCheck(this, TableCell);

    return _super.apply(this, arguments);
  }

  _createClass(TableCell, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/createElement("div", _extends({}, this.props, {
        style: _objectSpread2({}, tableCell({}), {}, this.props.style)
      }), /*#__PURE__*/createElement(ErrorBoundary, null, this.props.children));
    }
  }], [{
    key: "isTableCell",
    value: function isTableCell(cell) {
      return isValidElement(cell) && cell.props[TableCellSymbol];
    }
  }, {
    key: "getCellProps",
    value: function getCellProps(cell) {
      return TableCell.isTableCell(cell) && cell.props || {};
    }
  }, {
    key: "getCellContent",
    value: function getCellContent(cell) {
      return TableCell.isTableCell(cell) ? cell.props.children : cell;
    }
  }]);

  return TableCell;
}(PureComponent);

_defineProperty(TableCell, "defaultProps", _defineProperty({}, TableCellSymbol, true));

var TableHead = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TableHead, _React$PureComponent);

  var _super = _createSuper(TableHead);

  function TableHead() {
    _classCallCheck(this, TableHead);

    return _super.apply(this, arguments);
  }

  return TableHead;
}(PureComponent);

var TableColumnProps = function TableColumnProps() {
  _classCallCheck(this, TableColumnProps);

  _defineProperty(this, "children", void 0);
};
var TableColumn = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TableColumn, _React$PureComponent);

  var _super = _createSuper(TableColumn);

  function TableColumn() {
    _classCallCheck(this, TableColumn);

    return _super.apply(this, arguments);
  }

  _createClass(TableColumn, null, [{
    key: "createHeadFromColumns",
    value: function createHeadFromColumns(columns) {
      if (columns.every(function (col) {
        return !ReactUtils.singleChildOfType(col, ColumnHead);
      })) return null;
      var head = /*#__PURE__*/createElement(TableHead, null, columns.map(function (col) {
        var colHead = ReactUtils.singleChildOfType(col, ColumnHead);
        if (!colHead) return null; // eslint-disable-next-line react/jsx-key

        return /*#__PURE__*/createElement(TableCell, colHead.props);
      }));
      return head;
    }
  }, {
    key: "createBodyFromColumns",
    value: function createBodyFromColumns(columns) {
      var body = /*#__PURE__*/createElement(TableBody, null, function (rowIndex) {
        return columns.map(function (col, columnIndex) {
          var cellRender = ReactUtils.singleChildOfType(col, ColumnBody).props.children;
          if (!cellRender) return null;
          return cellRender({
            rowIndex: rowIndex,
            columnIndex: columnIndex
          });
        });
      });
      return body;
    }
  }]);

  return TableColumn;
}(PureComponent);

var flattenDeep = require('lodash.flattendeep');

var TableRowSymbol = '__ReactTablize__TableRow__';
/**
 * One or more cells.
 */

var TableRow = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TableRow, _React$PureComponent);

  var _super = _createSuper(TableRow);

  function TableRow() {
    _classCallCheck(this, TableRow);

    return _super.apply(this, arguments);
  }

  _createClass(TableRow, [{
    key: "render",
    value: function render() {
      var rowIndex = this.props.key;
      return /*#__PURE__*/createElement("div", _extends({}, this.props, {
        style: _objectSpread2({}, tableRow(rowIndex, {}), {}, this.props.style)
      }), /*#__PURE__*/createElement(ErrorBoundary, null, this.props.children));
    }
  }], [{
    key: "isTableRow",
    value: function isTableRow(row) {
      return isValidElement(row) && row.props[TableRowSymbol];
    }
  }, {
    key: "getRowProps",
    value: function getRowProps(row) {
      return TableRow.isTableRow(row) && row.props || {};
    }
  }, {
    key: "getRowContent",
    value: function getRowContent(row) {
      var content = row; // row element

      if (TableRow.isTableRow(content)) {
        content = content.props.children;
      } // actual content


      if (Array.isArray(content)) {
        content = flattenDeep(content);
      }

      return content;
    }
  }]);

  return TableRow;
}(PureComponent);

_defineProperty(TableRow, "defaultProps", _defineProperty({}, TableRowSymbol, true));

/**
 * Applicable only on non-virtual tables.
 */
var RowAutoSize = function RowAutoSize() {
  return undefined;
};
var TableProps = function TableProps() {
  _classCallCheck(this, TableProps);

  _defineProperty(this, "rowCount", void 0);

  _defineProperty(this, "rowKey", void 0);

  _defineProperty(this, "children", void 0);

  _defineProperty(this, "dir", 'ltr');

  _defineProperty(this, "className", void 0);

  _defineProperty(this, "style", void 0);

  _defineProperty(this, "rowHeight", 50);

  _defineProperty(this, "placeholder", void 0);

  _defineProperty(this, "defaultStyle", true);

  _defineProperty(this, "customScrollbars", void 0);

  _defineProperty(this, "overscanCount", 20);
};
var Table = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Table, _React$PureComponent);

  var _super = _createSuper(Table);

  function Table() {
    var _this;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "tableElement", createRef());

    _defineProperty(_assertThisInitialized(_this), "getRowHeight", function (rowIndex) {
      if (typeof _this.props.rowHeight === 'function') return _this.props.rowHeight(rowIndex);
      return _this.props.rowHeight;
    });

    return _this;
  }

  _createClass(Table, [{
    key: "refresh",
    //
    // public methods
    //
    value: function refresh() {
      if (this.tableElement.current) {
        this.tableElement.current.refresh();
      }

      this.forceUpdate();
    } //
    // render methods
    //

  }, {
    key: "render",
    value: function render() {
      // head & body
      var head = ReactUtils.singleChildOfType(this, TableHead);
      var body = ReactUtils.singleChildOfType(this, TableBody);
      var columns = ReactUtils.childrenOfType(this, TableColumn); // columns

      if (columns && columns.length) {
        if (head || body) throw new Error('Can not specify head and/or body when specifying table columns.');
        head = TableColumn.createHeadFromColumns(columns);
        body = TableColumn.createBodyFromColumns(columns);
      } // render


      return /*#__PURE__*/createElement(ErrorBoundary, null, /*#__PURE__*/createElement("div", {
        className: this.props.className,
        style: _objectSpread2({}, table(), {}, this.props.style, {}, SizeUtils.getElementHeights(this, Table.defaultHeight))
      }, this.renderHead(head), this.renderBody(head, body)));
    }
  }, {
    key: "renderHead",
    value: function renderHead(head) {
      if (!head) return null;

      var _head$props = head.props,
          children = _head$props.children,
          divProps = _objectWithoutProperties(_head$props, ["children"]);

      return /*#__PURE__*/createElement("div", _extends({
        dir: this.props.dir
      }, divProps, {
        style: _objectSpread2({}, tableHead(this.getTheme()), {}, head.props.style, {}, SizeUtils.getElementHeights(head, Table.defaultHeadHeight))
      }), Children.map(children, this.renderCell));
    }
  }, {
    key: "renderBody",
    value: function renderBody(head, body) {
      var _this2 = this;

      var bodyHeights = this.getBodyHeights(this, head, {
        total: Table.defaultHeight,
        head: Table.defaultHeadHeight
      });
      var showPlaceholder = this.props.rowCount === 0 || !TableBody.hasChildren(body);
      var rowRender = body === null || body === void 0 ? void 0 : body.props.children;
      return /*#__PURE__*/createElement("div", {
        style: _objectSpread2({}, tableBody(), {
          direction: this.props.dir
        }, bodyHeights)
      }, /*#__PURE__*/createElement(ErrorBoundary, null, showPlaceholder && this.renderRowsPlaceholder(), !showPlaceholder && /*#__PURE__*/createElement(AutoSizer, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return /*#__PURE__*/createElement(List, {
          ref: _this2.tableElement,
          style: {
            outline: 'none'
          },
          dir: _this2.props.dir,
          layout: "vertical",
          height: height,
          width: width,
          itemCount: _this2.props.rowCount,
          itemSize: _this2.getRowHeight,
          overscan: _this2.props.overscanCount,
          customScrollbar: _this2.props.customScrollbars
        }, function (index) {
          return _this2.renderBodyRow(index, rowRender);
        });
      })));
    }
  }, {
    key: "renderBodyRow",
    value: function renderBodyRow(index, rowRender) {
      if (!rowRender) return null;
      var row = rowRender(index);
      var rowContent = TableRow.getRowContent(row);
      rowContent = asArray(rowContent).map(this.renderCell); // already a row - just adjust the content

      if (TableRow.isTableRow(row)) {
        var rowKey = this.getRowKey(row.props, index);
        return cloneElement(row, {
          key: rowKey
        }, rowContent);
      } // not a row - wrap content with row element
      else {
          var _rowKey = this.getRowKey({}, index);

          return /*#__PURE__*/createElement(TableRow, {
            key: _rowKey
          }, rowContent);
        }
    }
  }, {
    key: "renderCell",
    value: function renderCell(cell, columnIndex) {
      var cellProps = TableCell.getCellProps(cell);
      if (cellProps.visible === false) return null; // already a cell - just add key and return

      if (TableCell.isTableCell(cell)) {
        return cloneElement(cell, {
          key: columnIndex
        });
      } // not a cell - wrap content with cell element


      return /*#__PURE__*/createElement(TableCell, {
        key: columnIndex
      }, cell);
    }
  }, {
    key: "renderRowsPlaceholder",
    value: function renderRowsPlaceholder() {
      if (this.props.placeholder) return this.props.placeholder;
      return /*#__PURE__*/createElement("div", null, /*#__PURE__*/createElement("div", {
        style: {
          textAlign: 'center'
        }
      }, "No Items to Display"));
    } //
    // helpers
    //

  }, {
    key: "getTheme",
    value: function getTheme() {
      return {
        dir: this.props.dir,
        defaultTheme: this.props.defaultStyle
      };
    }
  }, {
    key: "getRowKey",
    value: function getRowKey(rowProps, index) {
      if (!isNullOrUndefined(rowProps.key)) return rowProps.key;
      if (typeof this.props.rowKey === 'function') return this.props.rowKey(index);
      return index;
    }
  }, {
    key: "getBodyHeights",
    value: function getBodyHeights(table, head, defaultHeights) {
      var totalHeights = SizeUtils.getElementHeights(table, defaultHeights.total);
      var headHeight = this.getHeadHeight(head, defaultHeights.head);
      var bodyHeights = SizeUtils.getElementHeights(table, undefined);
      var height = bodyHeights.height || totalHeights.height;
      var minHeight = bodyHeights.minHeight || totalHeights.minHeight;
      var maxHeight = bodyHeights.maxHeight || totalHeights.maxHeight;

      if (headHeight) {
        height = "calc(".concat(height, " - ").concat(headHeight, ")");
        if (minHeight) minHeight = "calc(".concat(minHeight, " - ").concat(headHeight, ")");
        if (maxHeight) maxHeight = "calc(".concat(maxHeight, " - ").concat(headHeight, ")");
      }

      return {
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight
      };
    }
  }, {
    key: "getHeadHeight",
    value: function getHeadHeight(head, defaultHeight) {
      if (head) {
        return SizeUtils.getElementHeights(head, defaultHeight).height;
      }

      return 0;
    }
  }]);

  return Table;
}(PureComponent);

_defineProperty(Table, "defaultHeight", '35vh');

_defineProperty(Table, "defaultHeadHeight", '40px');

_defineProperty(Table, "Head", TableHead);

_defineProperty(Table, "Body", TableBody);

_defineProperty(Table, "Row", TableRow);

_defineProperty(Table, "Cell", TableCell);

_defineProperty(Table, "Column", TableColumn);

_defineProperty(Table, "defaultProps", new TableProps());

export { ColumnBody, ColumnBodyProps, ColumnHead, Grid, GridProps, List, RowAutoSize, Table, TableBody, TableBodyProps, TableCell, TableColumn, TableColumnProps, TableHead, TableProps, TableRow, TileKey };
