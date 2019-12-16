(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("react-tablize", [], factory);
	else if(typeof exports === 'object')
		exports["react-tablize"] = factory();
	else
		root["react-tablize"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/internal/utils/domUtils.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DomUtils =
/*#__PURE__*/
function () {
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
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/internal/utils/reactUtils.ts
function reactUtils_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function reactUtils_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function reactUtils_createClass(Constructor, protoProps, staticProps) { if (protoProps) reactUtils_defineProperties(Constructor.prototype, protoProps); if (staticProps) reactUtils_defineProperties(Constructor, staticProps); return Constructor; }


var reactUtils_ReactUtils =
/*#__PURE__*/
function () {
  function ReactUtils() {
    reactUtils_classCallCheck(this, ReactUtils);
  }

  reactUtils_createClass(ReactUtils, null, [{
    key: "addPropsToChildren",
    value: function addPropsToChildren(children, createPropsToAdd) {
      // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
      return external_react_["Children"].map(children, function (child, index) {
        var propsToAdd = createPropsToAdd(child, index);
        return external_react_["cloneElement"](child, propsToAdd);
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
      return external_react_["Children"].map(children, function (child) {
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
// CONCATENATED MODULE: ./src/internal/utils/scrollUtils.ts
function scrollUtils_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function scrollUtils_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function scrollUtils_createClass(Constructor, protoProps, staticProps) { if (protoProps) scrollUtils_defineProperties(Constructor.prototype, protoProps); if (staticProps) scrollUtils_defineProperties(Constructor, staticProps); return Constructor; }


var scrollUtils_ScrollUtils =
/*#__PURE__*/
function () {
  function ScrollUtils() {
    scrollUtils_classCallCheck(this, ScrollUtils);
  }

  scrollUtils_createClass(ScrollUtils, null, [{
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
// CONCATENATED MODULE: ./src/internal/utils/sizeUtils.ts
function sizeUtils_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sizeUtils_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function sizeUtils_createClass(Constructor, protoProps, staticProps) { if (protoProps) sizeUtils_defineProperties(Constructor.prototype, protoProps); if (staticProps) sizeUtils_defineProperties(Constructor, staticProps); return Constructor; }

var SizeUtils =
/*#__PURE__*/
function () {
  function SizeUtils() {
    sizeUtils_classCallCheck(this, SizeUtils);
  }

  sizeUtils_createClass(SizeUtils, null, [{
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
// CONCATENATED MODULE: ./src/internal/utils/utils.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function isNullOrUndefined(val) {
  return val === null || val === undefined;
}
function asArray(val) {
  if (Array.isArray(val)) return val;
  return [val];
}
function range(count) {
  // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
  return _toConsumableArray(Array(count || 0).keys());
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
// CONCATENATED MODULE: ./src/internal/utils/index.ts
/* concated harmony reexport DomUtils */__webpack_require__.d(__webpack_exports__, "a", function() { return DomUtils; });
/* concated harmony reexport ReactUtils */__webpack_require__.d(__webpack_exports__, "b", function() { return reactUtils_ReactUtils; });
/* concated harmony reexport ScrollUtils */__webpack_require__.d(__webpack_exports__, "c", function() { return scrollUtils_ScrollUtils; });
/* concated harmony reexport SizeUtils */__webpack_require__.d(__webpack_exports__, "d", function() { return SizeUtils; });
/* concated harmony reexport isNullOrUndefined */__webpack_require__.d(__webpack_exports__, "g", function() { return isNullOrUndefined; });
/* concated harmony reexport asArray */__webpack_require__.d(__webpack_exports__, "f", function() { return asArray; });
/* unused concated harmony import range */
/* concated harmony reexport areShallowEqual */__webpack_require__.d(__webpack_exports__, "e", function() { return areShallowEqual; });






/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TileKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return VirtualGridProps; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var VirtualGridProps = function VirtualGridProps() {
  _classCallCheck(this, VirtualGridProps);

  _defineProperty(this, "onScroll", void 0);

  _defineProperty(this, "height", void 0);

  _defineProperty(this, "width", void 0);

  _defineProperty(this, "columnCount", void 0);

  _defineProperty(this, "rowCount", void 0);

  _defineProperty(this, "columnWidth", void 0);

  _defineProperty(this, "rowHeight", void 0);

  _defineProperty(this, "estimatedColumnWidth", void 0);

  _defineProperty(this, "estimatedRowHeight", void 0);

  _defineProperty(this, "overscanColumnsCount", 0);

  _defineProperty(this, "overscanRowCount", 0);

  _defineProperty(this, "fixedHeaderHeight", 0);

  _defineProperty(this, "fixedFooterHeight", 0);

  _defineProperty(this, "fixedLeftWidth", 0);

  _defineProperty(this, "fixedRightWidth", 0);

  _defineProperty(this, "style", void 0);

  _defineProperty(this, "tileStyle", void 0);

  _defineProperty(this, "children", void 0);
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorBoundary; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var ErrorBoundaryState = function ErrorBoundaryState() {
  _classCallCheck(this, ErrorBoundaryState);

  _defineProperty(this, "hasError", void 0);
};

var ErrorBoundary =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  function ErrorBoundary(props) {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ErrorBoundary).call(this, props));
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
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "X");
      }

      return this.props.children !== undefined ? this.props.children : null;
    }
  }]);

  return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/internal/window/recycleManager.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RecycleManager =
/*#__PURE__*/
function () {
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
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/internal/window/VirtualCell.tsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function VirtualCell_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function VirtualCell_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function VirtualCell_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function VirtualCell_createClass(Constructor, protoProps, staticProps) { if (protoProps) VirtualCell_defineProperties(Constructor.prototype, protoProps); if (staticProps) VirtualCell_defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/***
 * Each `VirtualWindow` creates a constant number of these `VirtualCell`s and just
 * moves them around. This is much more efficient than creating a new cell on
 * each scroll.
 *
 * based on:
 * https://github.com/Flipkart/recyclerlistview/blob/master/src/platform/web/viewrenderer/ViewRenderer.tsx
 */
var VirtualCell_VirtualCell =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(VirtualCell, _React$PureComponent);

  function VirtualCell() {
    VirtualCell_classCallCheck(this, VirtualCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(VirtualCell).apply(this, arguments));
  }

  VirtualCell_createClass(VirtualCell, [{
    key: "render",
    value: function render() {
      var _ref;

      var rightOrLeft = this.props.direction === 'rtl' ? 'right' : 'left'; // https://rtl-css.net/tutorial/quick-tip-rtling-css3-transform-functions-translate-and-translatex

      var transformModifier = this.props.direction === 'rtl' ? -1 : 1;
      var transform = "translate(".concat(this.props.left * transformModifier, "px,").concat(this.props.top, "px)");
      return external_react_["createElement"]("div", {
        className: this.props.className,
        style: (_ref = {
          boxSizing: 'border-box',
          height: this.props.height,
          width: this.props.width,
          position: "absolute"
        }, VirtualCell_defineProperty(_ref, rightOrLeft, 0), VirtualCell_defineProperty(_ref, "top", 0), VirtualCell_defineProperty(_ref, "willChange", "transform"), VirtualCell_defineProperty(_ref, "transform", transform), _ref)
      }, this.props.children);
    }
  }]);

  return VirtualCell;
}(external_react_["PureComponent"]);
// EXTERNAL MODULE: ./src/internal/utils/index.ts + 5 modules
var utils = __webpack_require__(1);

// CONCATENATED MODULE: ./src/internal/window/windowCalculator.ts
function windowCalculator_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { windowCalculator_typeof = function _typeof(obj) { return typeof obj; }; } else { windowCalculator_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return windowCalculator_typeof(obj); }

function windowCalculator_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function windowCalculator_createClass(Constructor, protoProps, staticProps) { if (protoProps) windowCalculator_defineProperties(Constructor.prototype, protoProps); if (staticProps) windowCalculator_defineProperties(Constructor, staticProps); return Constructor; }

function windowCalculator_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function windowCalculator_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CalcData = function CalcData() {
  windowCalculator_classCallCheck(this, CalcData);

  windowCalculator_defineProperty(this, "cache", {});

  windowCalculator_defineProperty(this, "lastMeasuredIndex", -1);

  windowCalculator_defineProperty(this, "lastFromPosition", -1);
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
var WindowCalculator =
/*#__PURE__*/
function () {
  function WindowCalculator() {
    windowCalculator_classCallCheck(this, WindowCalculator);

    windowCalculator_defineProperty(this, "data", {
      column: new CalcData(),
      row: new CalcData()
    });
  }

  windowCalculator_createClass(WindowCalculator, [{
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

      this.data[elementType].lastFromPosition = fromPosition; // Prevent range error

      fromIndex = Math.max(0, fromIndex);
      toIndex = Math.min(toIndex, totalElementsCount - 1); // Enforce "minElementsCountToReturn"

      while (toIndex - fromIndex + 1 < minElementsCountToReturn) {
        if (toIndex + 1 < totalElementsCount) {
          toIndex++;
        } else {
          fromIndex--;
        }
      } // Get elements info


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
      var _ref, _cache$lastMeasuredIn;

      var _this$data$elementTyp = this.data[elementType],
          lastMeasuredIndex = _this$data$elementTyp.lastMeasuredIndex,
          cache = _this$data$elementTyp.cache;
      var lastMeasuredPosition = (_ref = (_cache$lastMeasuredIn = cache[lastMeasuredIndex]) === null || _cache$lastMeasuredIn === void 0 ? void 0 : _cache$lastMeasuredIn.position) !== null && _ref !== void 0 ? _ref : -1;

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
      throw new Error("Invalid argument '".concat("elementSize", "' expected a number or a function ") + "but received '".concat(windowCalculator_typeof(elementSize), "': ").concat(elementSize, "."));
    }
  }]);

  return WindowCalculator;
}();
// CONCATENATED MODULE: ./src/internal/window/VirtualWindow.tsx
function VirtualWindow_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { VirtualWindow_typeof = function _typeof(obj) { return typeof obj; }; } else { VirtualWindow_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return VirtualWindow_typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { VirtualWindow_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function VirtualWindow_possibleConstructorReturn(self, call) { if (call && (VirtualWindow_typeof(call) === "object" || typeof call === "function")) { return call; } return VirtualWindow_assertThisInitialized(self); }

function VirtualWindow_getPrototypeOf(o) { VirtualWindow_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return VirtualWindow_getPrototypeOf(o); }

function VirtualWindow_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function VirtualWindow_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function VirtualWindow_createClass(Constructor, protoProps, staticProps) { if (protoProps) VirtualWindow_defineProperties(Constructor.prototype, protoProps); if (staticProps) VirtualWindow_defineProperties(Constructor, staticProps); return Constructor; }

function VirtualWindow_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) VirtualWindow_setPrototypeOf(subClass, superClass); }

function VirtualWindow_setPrototypeOf(o, p) { VirtualWindow_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return VirtualWindow_setPrototypeOf(o, p); }

function VirtualWindow_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function VirtualWindow_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var VirtualWindowProps = function VirtualWindowProps() {
  VirtualWindow_classCallCheck(this, VirtualWindowProps);

  VirtualWindow_defineProperty(this, "direction", 'ltr');

  VirtualWindow_defineProperty(this, "controlledScroll", void 0);

  VirtualWindow_defineProperty(this, "scrollDirection", 'both');

  VirtualWindow_defineProperty(this, "height", void 0);

  VirtualWindow_defineProperty(this, "width", void 0);

  VirtualWindow_defineProperty(this, "columnCount", void 0);

  VirtualWindow_defineProperty(this, "rowCount", void 0);

  VirtualWindow_defineProperty(this, "columnWidth", void 0);

  VirtualWindow_defineProperty(this, "rowHeight", void 0);

  VirtualWindow_defineProperty(this, "estimatedColumnWidth", void 0);

  VirtualWindow_defineProperty(this, "estimatedRowHeight", void 0);

  VirtualWindow_defineProperty(this, "overscanColumnsCount", 0);

  VirtualWindow_defineProperty(this, "overscanRowCount", 0);

  VirtualWindow_defineProperty(this, "innerElementType", 'div');

  VirtualWindow_defineProperty(this, "innerRef", void 0);

  VirtualWindow_defineProperty(this, "outerElementType", 'div');

  VirtualWindow_defineProperty(this, "outerRef", void 0);

  VirtualWindow_defineProperty(this, "className", void 0);

  VirtualWindow_defineProperty(this, "style", void 0);

  VirtualWindow_defineProperty(this, "children", void 0);
};

var VirtualWindowState = function VirtualWindowState() {
  VirtualWindow_classCallCheck(this, VirtualWindowState);

  VirtualWindow_defineProperty(this, "scrollTop", 0);

  VirtualWindow_defineProperty(this, "scrollLeft", 0);
};

var VirtualWindow_VirtualWindow =
/*#__PURE__*/
function (_React$PureComponent) {
  VirtualWindow_inherits(VirtualWindow, _React$PureComponent);

  VirtualWindow_createClass(VirtualWindow, [{
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

    VirtualWindow_classCallCheck(this, VirtualWindow);

    _this = VirtualWindow_possibleConstructorReturn(this, VirtualWindow_getPrototypeOf(VirtualWindow).call(this, props));

    VirtualWindow_defineProperty(VirtualWindow_assertThisInitialized(_this), "minColumnsToRender", 0);

    VirtualWindow_defineProperty(VirtualWindow_assertThisInitialized(_this), "minRowsToRender", 0);

    VirtualWindow_defineProperty(VirtualWindow_assertThisInitialized(_this), "windowCalc", new WindowCalculator());

    VirtualWindow_defineProperty(VirtualWindow_assertThisInitialized(_this), "recycler", new RecycleManager());

    VirtualWindow_defineProperty(VirtualWindow_assertThisInitialized(_this), "containerElement", external_react_["createRef"]());

    VirtualWindow_defineProperty(VirtualWindow_assertThisInitialized(_this), "handleScroll", function (e) {
      var normalized = utils["c" /* ScrollUtils */].normalizeScrollEvent(e, _this.props.direction);

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


  VirtualWindow_createClass(VirtualWindow, [{
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
      return this.windowCalc.getTotalSize('row', this.props.rowHeight, this.props.estimatedRowHeight, this.props.rowCount);
    }
  }, {
    key: "getScrollableWidth",
    value: function getScrollableWidth() {
      return this.windowCalc.getTotalSize('column', this.props.columnWidth, this.props.estimatedColumnWidth, this.props.columnCount);
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
    key: "componentDidMount",
    value: function componentDidMount() {
      this.clearCache();
      this.forceUpdate();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!Object(utils["e" /* areShallowEqual */])(this.props, prevProps)) {
        this.clearCache();
        this.forceUpdate();
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
      var overflow = this.props.controlledScroll ? 'hidden' : 'auto';
      var onScroll = this.props.controlledScroll ? undefined : this.handleScroll;
      return (// outer element - container
        external_react_["createElement"](this.props.outerElementType, {
          ref: this.containerElement,
          className: this.className + '_Container',
          style: _objectSpread({
            direction: this.props.direction,
            height: this.props.height,
            width: this.props.width,
            position: 'relative',
            overflow: overflow
          }, this.props.style),
          onScroll: onScroll
        }, // inner element - scrollable area
        external_react_["createElement"](this.props.innerElementType, {
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var row = _step.value;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = columns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var col = _step3.value;
              originalKeys.push(this.getCellOriginalKey(col.index, row.index));
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.recycler.freeUnusedKeys(originalKeys); // render cells

      var cells = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = rows[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _row = _step2.value;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = columns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _col = _step4.value;
              var originalKey = this.getCellOriginalKey(_col.index, _row.index);
              var stableKey = this.recycler.getStableKey(originalKey);
              cells.push(this.renderCell(_col, _row, stableKey));
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        } // sort the cells by key order (important for recycling)

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      cells.sort(function (a, b) {
        return utils["b" /* ReactUtils */].compareKeys(a.key, b.key);
      });
      return cells;
    }
  }, {
    key: "renderCell",
    value: function renderCell(col, row, stableKey) {
      return external_react_["createElement"](VirtualCell_VirtualCell, {
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
  }]);

  return VirtualWindow;
}(external_react_["PureComponent"]);

VirtualWindow_defineProperty(VirtualWindow_VirtualWindow, "defaultProps", new VirtualWindowProps());
// CONCATENATED MODULE: ./src/internal/window/index.ts
/* unused concated harmony import RecycleManager */
/* unused concated harmony import VirtualCell */
/* unused concated harmony import VirtualWindowProps */
/* concated harmony reexport VirtualWindow */__webpack_require__.d(__webpack_exports__, "a", function() { return VirtualWindow_VirtualWindow; });
/* concated harmony reexport WindowCalculator */__webpack_require__.d(__webpack_exports__, "b", function() { return WindowCalculator; });





/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@emotion/styled-base");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-virtualized-auto-sizer");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomScrollbars; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var CustomScrollbarsInner =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CustomScrollbarsInner, _React$PureComponent);

  function CustomScrollbarsInner() {
    _classCallCheck(this, CustomScrollbarsInner);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomScrollbarsInner).apply(this, arguments));
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

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_1___default.a, {
        ref: refSetter,
        style: _objectSpread({}, this.props.style, {
          overflow: 'hidden',
          direction: 'ltr'
        }),
        onScroll: this.props.onScroll
      }, this.props.children);
    }
  }]);

  return CustomScrollbarsInner;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var CustomScrollbars = react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"](function (props, ref) {
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](CustomScrollbarsInner, _extends({}, props, {
    forwardedRef: ref
  }));
});
CustomScrollbars.displayName = 'CustomScrollbars';

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_List__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_List__WEBPACK_IMPORTED_MODULE_0__, "NonVirtualList")) __webpack_require__.d(__webpack_exports__, "NonVirtualList", function() { return _List__WEBPACK_IMPORTED_MODULE_0__["NonVirtualList"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_List__WEBPACK_IMPORTED_MODULE_0__, "VirtualList")) __webpack_require__.d(__webpack_exports__, "VirtualList", function() { return _List__WEBPACK_IMPORTED_MODULE_0__["VirtualList"]; });

/* harmony import */ var _NonVirtualList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NonVirtualList", function() { return _NonVirtualList__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _VirtualList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VirtualList", function() { return _VirtualList__WEBPACK_IMPORTED_MODULE_2__["a"]; });





/***/ }),
/* 9 */
/***/ (function(module, exports) {



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NonVirtualList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CustomScrollbars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var NonVirtualList =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(NonVirtualList, _React$PureComponent);

  function NonVirtualList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NonVirtualList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NonVirtualList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "disableScrollEvents", false);

    _defineProperty(_assertThisInitialized(_this), "listRef", react__WEBPACK_IMPORTED_MODULE_0__["createRef"]());

    _defineProperty(_assertThisInitialized(_this), "scrollTo", function (scrollOffset) {
      var currentInner = _this.listRef.current;

      if (currentInner) {
        if (scrollOffset === undefined) return;
        var currentOffset = _this.isHorizontal ? currentInner.scrollLeft : currentInner.scrollTop;
        if (scrollOffset === currentOffset) return;
        _this.disableScrollEvents = true;
        currentInner.scrollTo({
          top: _this.isHorizontal ? undefined : scrollOffset,
          left: _this.isHorizontal ? scrollOffset : undefined
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnScroll", function (e) {
      if (_this.disableScrollEvents) {
        _this.disableScrollEvents = false;
        return;
      }

      if (!_this.props.onScroll) return;
      var _e$currentTarget = e.currentTarget,
          scrollTop = _e$currentTarget.scrollTop,
          scrollLeft = _e$currentTarget.scrollLeft;

      _this.props.onScroll(_this.isHorizontal ? scrollLeft : scrollTop);
    });

    return _this;
  }

  _createClass(NonVirtualList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var listStyle = _defineProperty({
        height: this.props.height,
        width: this.props.width,
        direction: this.props.dir,
        boxSizing: 'content-box',
        outline: 'none',
        overflow: 'auto'
      }, this.isHorizontal ? 'overflowY' : 'overflowX', 'hidden');

      if (this.isHorizontal) {
        listStyle.display = 'flex';
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](this.getListElementType(), {
        ref: this.listRef,
        style: listStyle,
        onScroll: this.handleOnScroll
      }, // rows
      Array(this.props.itemCount).fill(0).map(function (_, index) {
        var _ref;

        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          key: index,
          style: (_ref = {}, _defineProperty(_ref, _this2.isHorizontal ? 'minWidth' : 'minHeight', _this2.props.itemSize(index)), _defineProperty(_ref, _this2.isHorizontal ? 'height' : 'width', _this2.isHorizontal ? _this2.props.height : _this2.props.width), _ref)
        }, _this2.props.children(index));
      }));
    }
  }, {
    key: "getListElementType",
    value: function getListElementType() {
      return this.props.customScrollbar ? _CustomScrollbars__WEBPACK_IMPORTED_MODULE_1__[/* CustomScrollbars */ "a"] : 'div';
    }
  }, {
    key: "isHorizontal",
    get: function get() {
      return this.props.layout === 'horizontal';
    }
  }]);

  return NonVirtualList;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VirtualList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CustomScrollbars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var VirtualList =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(VirtualList, _React$PureComponent);

  function VirtualList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, VirtualList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(VirtualList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "windowRef", react__WEBPACK_IMPORTED_MODULE_0__["createRef"]());

    _defineProperty(_assertThisInitialized(_this), "initialCalculator", new _window__WEBPACK_IMPORTED_MODULE_3__[/* WindowCalculator */ "b"]());

    return _this;
  }

  _createClass(VirtualList, [{
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

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_window__WEBPACK_IMPORTED_MODULE_3__[/* VirtualWindow */ "a"], {
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
      return react__WEBPACK_IMPORTED_MODULE_0__["cloneElement"](row, {
        style: _objectSpread({}, row.props.style)
      });
    } //
    // render helpers
    //

  }, {
    key: "getVerticalScrollbarWidth",
    value: function getVerticalScrollbarWidth() {
      var scrollableHeight = this.getScrollableHeight();
      var hasVerticalScrollbar = scrollableHeight > this.props.height;
      return hasVerticalScrollbar && _utils__WEBPACK_IMPORTED_MODULE_2__[/* DomUtils */ "a"].scrollbarWidth || 0;
    }
  }, {
    key: "getHorizontalScrollbarWidth",
    value: function getHorizontalScrollbarWidth() {
      var scrollableWidth = this.getScrollableWidth();
      var hasHorizontalScrollbar = scrollableWidth > this.props.width;
      return hasHorizontalScrollbar && _utils__WEBPACK_IMPORTED_MODULE_2__[/* DomUtils */ "a"].scrollbarWidth || 0;
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
      return this.props.customScrollbar ? _CustomScrollbars__WEBPACK_IMPORTED_MODULE_1__[/* CustomScrollbars */ "a"] : undefined;
    }
  }, {
    key: "isHorizontal",
    get: function get() {
      return this.props.layout === 'horizontal';
    }
  }]);

  return VirtualList;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),
/* 12 */
/***/ (function(module, exports) {



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/table/ColumnBody.tsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var ColumnBodyProps = function ColumnBodyProps() {
  _classCallCheck(this, ColumnBodyProps);

  _defineProperty(this, "children", void 0);
};
var ColumnBody =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ColumnBody, _React$PureComponent);

  function ColumnBody() {
    _classCallCheck(this, ColumnBody);

    return _possibleConstructorReturn(this, _getPrototypeOf(ColumnBody).apply(this, arguments));
  }

  return ColumnBody;
}(external_react_["PureComponent"]);
// CONCATENATED MODULE: ./src/table/ColumnHead.tsx
function ColumnHead_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ColumnHead_typeof = function _typeof(obj) { return typeof obj; }; } else { ColumnHead_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ColumnHead_typeof(obj); }

function ColumnHead_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ColumnHead_possibleConstructorReturn(self, call) { if (call && (ColumnHead_typeof(call) === "object" || typeof call === "function")) { return call; } return ColumnHead_assertThisInitialized(self); }

function ColumnHead_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ColumnHead_getPrototypeOf(o) { ColumnHead_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ColumnHead_getPrototypeOf(o); }

function ColumnHead_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ColumnHead_setPrototypeOf(subClass, superClass); }

function ColumnHead_setPrototypeOf(o, p) { ColumnHead_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ColumnHead_setPrototypeOf(o, p); }


var ColumnHead =
/*#__PURE__*/
function (_React$PureComponent) {
  ColumnHead_inherits(ColumnHead, _React$PureComponent);

  function ColumnHead() {
    ColumnHead_classCallCheck(this, ColumnHead);

    return ColumnHead_possibleConstructorReturn(this, ColumnHead_getPrototypeOf(ColumnHead).apply(this, arguments));
  }

  return ColumnHead;
}(external_react_["PureComponent"]);
// EXTERNAL MODULE: ./src/internal/utils/index.ts + 5 modules
var utils = __webpack_require__(1);

// CONCATENATED MODULE: ./src/table/TableBody.tsx
function TableBody_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableBody_typeof = function _typeof(obj) { return typeof obj; }; } else { TableBody_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableBody_typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function TableBody_possibleConstructorReturn(self, call) { if (call && (TableBody_typeof(call) === "object" || typeof call === "function")) { return call; } return TableBody_assertThisInitialized(self); }

function TableBody_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableBody_getPrototypeOf(o) { TableBody_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableBody_getPrototypeOf(o); }

function TableBody_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableBody_setPrototypeOf(subClass, superClass); }

function TableBody_setPrototypeOf(o, p) { TableBody_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableBody_setPrototypeOf(o, p); }

function TableBody_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableBody_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var TableBodyProps = function TableBodyProps() {
  TableBody_classCallCheck(this, TableBodyProps);

  TableBody_defineProperty(this, "children", void 0);
};
var TableBody_TableBody =
/*#__PURE__*/
function (_React$PureComponent) {
  TableBody_inherits(TableBody, _React$PureComponent);

  function TableBody() {
    TableBody_classCallCheck(this, TableBody);

    return TableBody_possibleConstructorReturn(this, TableBody_getPrototypeOf(TableBody).apply(this, arguments));
  }

  _createClass(TableBody, null, [{
    key: "hasChildren",
    value: function hasChildren(body) {
      if (!body) return false;
      if (Object(utils["g" /* isNullOrUndefined */])(body.props.children)) return false;
      if (typeof body.props.children === 'function') return true;
      if (Array.isArray(body.props.children)) return body.props.children.length > 0;
      var childrenCount = external_react_["Children"].count(body.props.children);
      return childrenCount > 0;
    }
  }]);

  return TableBody;
}(external_react_["PureComponent"]);
// EXTERNAL MODULE: ./src/internal/ErrorBoundary.tsx
var ErrorBoundary = __webpack_require__(3);

// EXTERNAL MODULE: external "@emotion/styled-base"
var styled_base_ = __webpack_require__(5);
var styled_base_default = /*#__PURE__*/__webpack_require__.n(styled_base_);

// CONCATENATED MODULE: ./src/table/style.tsx


var StyledTableView = styled_base_default()("div", {
  target: "ea4b5ar0",
  label: "StyledTableView"
})( true ? {
  name: "1bhr7rw",
  styles: "width:100%;overflow-y:hidden;"
} : undefined);
var StyledTableHead = styled_base_default()("div", {
  target: "ea4b5ar1",
  label: "StyledTableHead"
})("display:flex;overflow-y:hidden;", function (props) {
  return props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right';
}, ":", utils["a" /* DomUtils */].scrollbarWidth, "px;" + ( true ? "" : undefined));
var StyledTableBody = styled_base_default()("div", {
  target: "ea4b5ar2",
  label: "StyledTableBody"
})( true ? "" : undefined);
var StyledTableRow = styled_base_default()("div", {
  target: "ea4b5ar3",
  label: "StyledTableRow"
})( true ? {
  name: "k008qs",
  styles: "display:flex;"
} : undefined);
var StyledTableCell = styled_base_default()("div", {
  target: "ea4b5ar4",
  label: "StyledTableCell"
})( true ? {
  name: "n7ngvn",
  styles: "flex:1;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box;"
} : undefined);
// CONCATENATED MODULE: ./src/table/TableCell.tsx
function TableCell_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableCell_typeof = function _typeof(obj) { return typeof obj; }; } else { TableCell_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableCell_typeof(obj); }

function TableCell_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableCell_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TableCell_createClass(Constructor, protoProps, staticProps) { if (protoProps) TableCell_defineProperties(Constructor.prototype, protoProps); if (staticProps) TableCell_defineProperties(Constructor, staticProps); return Constructor; }

function TableCell_possibleConstructorReturn(self, call) { if (call && (TableCell_typeof(call) === "object" || typeof call === "function")) { return call; } return TableCell_assertThisInitialized(self); }

function TableCell_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableCell_getPrototypeOf(o) { TableCell_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableCell_getPrototypeOf(o); }

function TableCell_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableCell_setPrototypeOf(subClass, superClass); }

function TableCell_setPrototypeOf(o, p) { TableCell_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableCell_setPrototypeOf(o, p); }

function TableCell_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var TableCellSymbol = '__ReactTablize__TableCell__';
var TableCell_TableCell =
/*#__PURE__*/
function (_React$PureComponent) {
  TableCell_inherits(TableCell, _React$PureComponent);

  function TableCell() {
    TableCell_classCallCheck(this, TableCell);

    return TableCell_possibleConstructorReturn(this, TableCell_getPrototypeOf(TableCell).apply(this, arguments));
  }

  TableCell_createClass(TableCell, [{
    key: "render",
    value: function render() {
      return external_react_["createElement"](StyledTableCell, this.props, external_react_["createElement"](ErrorBoundary["a" /* ErrorBoundary */], null, this.props.children));
    }
  }], [{
    key: "isTableCell",
    value: function isTableCell(cell) {
      return external_react_["isValidElement"](cell) && cell.props[TableCellSymbol];
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
}(external_react_["PureComponent"]);

TableCell_defineProperty(TableCell_TableCell, "defaultProps", TableCell_defineProperty({}, TableCellSymbol, true));
// CONCATENATED MODULE: ./src/table/TableHead.tsx
function TableHead_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableHead_typeof = function _typeof(obj) { return typeof obj; }; } else { TableHead_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableHead_typeof(obj); }

function TableHead_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableHead_possibleConstructorReturn(self, call) { if (call && (TableHead_typeof(call) === "object" || typeof call === "function")) { return call; } return TableHead_assertThisInitialized(self); }

function TableHead_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableHead_getPrototypeOf(o) { TableHead_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableHead_getPrototypeOf(o); }

function TableHead_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableHead_setPrototypeOf(subClass, superClass); }

function TableHead_setPrototypeOf(o, p) { TableHead_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableHead_setPrototypeOf(o, p); }


var TableHead =
/*#__PURE__*/
function (_React$PureComponent) {
  TableHead_inherits(TableHead, _React$PureComponent);

  function TableHead() {
    TableHead_classCallCheck(this, TableHead);

    return TableHead_possibleConstructorReturn(this, TableHead_getPrototypeOf(TableHead).apply(this, arguments));
  }

  return TableHead;
}(external_react_["PureComponent"]);
// CONCATENATED MODULE: ./src/table/TableColumn.tsx
function TableColumn_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableColumn_typeof = function _typeof(obj) { return typeof obj; }; } else { TableColumn_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableColumn_typeof(obj); }

function TableColumn_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TableColumn_createClass(Constructor, protoProps, staticProps) { if (protoProps) TableColumn_defineProperties(Constructor.prototype, protoProps); if (staticProps) TableColumn_defineProperties(Constructor, staticProps); return Constructor; }

function TableColumn_possibleConstructorReturn(self, call) { if (call && (TableColumn_typeof(call) === "object" || typeof call === "function")) { return call; } return TableColumn_assertThisInitialized(self); }

function TableColumn_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableColumn_getPrototypeOf(o) { TableColumn_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableColumn_getPrototypeOf(o); }

function TableColumn_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableColumn_setPrototypeOf(subClass, superClass); }

function TableColumn_setPrototypeOf(o, p) { TableColumn_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableColumn_setPrototypeOf(o, p); }

function TableColumn_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableColumn_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var TableColumnProps = function TableColumnProps() {
  TableColumn_classCallCheck(this, TableColumnProps);

  TableColumn_defineProperty(this, "children", void 0);
};
var TableColumn_TableColumn =
/*#__PURE__*/
function (_React$PureComponent) {
  TableColumn_inherits(TableColumn, _React$PureComponent);

  function TableColumn() {
    TableColumn_classCallCheck(this, TableColumn);

    return TableColumn_possibleConstructorReturn(this, TableColumn_getPrototypeOf(TableColumn).apply(this, arguments));
  }

  TableColumn_createClass(TableColumn, null, [{
    key: "createHeadFromColumns",
    value: function createHeadFromColumns(columns) {
      if (columns.every(function (col) {
        return !utils["b" /* ReactUtils */].singleChildOfType(col, ColumnHead);
      })) return null;
      var head = external_react_["createElement"](TableHead, null, columns.map(function (col) {
        var colHead = utils["b" /* ReactUtils */].singleChildOfType(col, ColumnHead);
        if (!colHead) return null; // eslint-disable-next-line react/jsx-key

        return external_react_["createElement"](TableCell_TableCell, colHead.props);
      }));
      return head;
    }
  }, {
    key: "createBodyFromColumns",
    value: function createBodyFromColumns(columns) {
      var body = external_react_["createElement"](TableBody_TableBody, null, function (rowIndex) {
        return columns.map(function (col, columnIndex) {
          var cellRender = utils["b" /* ReactUtils */].singleChildOfType(col, ColumnBody).props.children;
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
}(external_react_["PureComponent"]);
// CONCATENATED MODULE: ./src/table/TableRow.tsx
function TableRow_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableRow_typeof = function _typeof(obj) { return typeof obj; }; } else { TableRow_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableRow_typeof(obj); }

function TableRow_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableRow_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TableRow_createClass(Constructor, protoProps, staticProps) { if (protoProps) TableRow_defineProperties(Constructor.prototype, protoProps); if (staticProps) TableRow_defineProperties(Constructor, staticProps); return Constructor; }

function TableRow_possibleConstructorReturn(self, call) { if (call && (TableRow_typeof(call) === "object" || typeof call === "function")) { return call; } return TableRow_assertThisInitialized(self); }

function TableRow_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableRow_getPrototypeOf(o) { TableRow_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableRow_getPrototypeOf(o); }

function TableRow_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableRow_setPrototypeOf(subClass, superClass); }

function TableRow_setPrototypeOf(o, p) { TableRow_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableRow_setPrototypeOf(o, p); }

function TableRow_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var flattenDeep = __webpack_require__(19);

var TableRowSymbol = '__ReactTablize__TableRow__';
/**
 * One or more cells.
 */

var TableRow_TableRow =
/*#__PURE__*/
function (_React$PureComponent) {
  TableRow_inherits(TableRow, _React$PureComponent);

  function TableRow() {
    TableRow_classCallCheck(this, TableRow);

    return TableRow_possibleConstructorReturn(this, TableRow_getPrototypeOf(TableRow).apply(this, arguments));
  }

  TableRow_createClass(TableRow, [{
    key: "render",
    value: function render() {
      return external_react_["createElement"](StyledTableRow, this.props, external_react_["createElement"](ErrorBoundary["a" /* ErrorBoundary */], null, this.props.children));
    }
  }], [{
    key: "isTableRow",
    value: function isTableRow(row) {
      return external_react_["isValidElement"](row) && row.props[TableRowSymbol];
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
}(external_react_["PureComponent"]);

TableRow_defineProperty(TableRow_TableRow, "defaultProps", TableRow_defineProperty({}, TableRowSymbol, true));
// EXTERNAL MODULE: external "emotion-theming"
var external_emotion_theming_ = __webpack_require__(15);

// EXTERNAL MODULE: external "react-virtualized-auto-sizer"
var external_react_virtualized_auto_sizer_ = __webpack_require__(6);
var external_react_virtualized_auto_sizer_default = /*#__PURE__*/__webpack_require__.n(external_react_virtualized_auto_sizer_);

// EXTERNAL MODULE: ./src/internal/list/index.ts
var list = __webpack_require__(8);

// CONCATENATED MODULE: ./src/table/TableView.tsx
function TableView_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableView_typeof = function _typeof(obj) { return typeof obj; }; } else { TableView_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableView_typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { TableView_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function TableView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TableView_createClass(Constructor, protoProps, staticProps) { if (protoProps) TableView_defineProperties(Constructor.prototype, protoProps); if (staticProps) TableView_defineProperties(Constructor, staticProps); return Constructor; }

function TableView_possibleConstructorReturn(self, call) { if (call && (TableView_typeof(call) === "object" || typeof call === "function")) { return call; } return TableView_assertThisInitialized(self); }

function TableView_getPrototypeOf(o) { TableView_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableView_getPrototypeOf(o); }

function TableView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableView_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableView_setPrototypeOf(subClass, superClass); }

function TableView_setPrototypeOf(o, p) { TableView_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableView_setPrototypeOf(o, p); }

function TableView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableView_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














/**
 * Applicable only on non-virtual tables.
 */
var RowAutoSize = function RowAutoSize() {
  return undefined;
};
var TableViewProps = function TableViewProps() {
  TableView_classCallCheck(this, TableViewProps);

  TableView_defineProperty(this, "isVirtual", void 0);

  TableView_defineProperty(this, "rowCount", void 0);

  TableView_defineProperty(this, "rowKey", void 0);

  TableView_defineProperty(this, "children", void 0);

  TableView_defineProperty(this, "dir", 'ltr');

  TableView_defineProperty(this, "className", void 0);

  TableView_defineProperty(this, "style", void 0);

  TableView_defineProperty(this, "rowHeight", 50);

  TableView_defineProperty(this, "emptyMessage", "No Items to Display");

  TableView_defineProperty(this, "customScrollbars", void 0);

  TableView_defineProperty(this, "keyScroll", void 0);

  TableView_defineProperty(this, "overscanCount", 20);
};
var TableView_TableView =
/*#__PURE__*/
function (_React$PureComponent) {
  TableView_inherits(TableView, _React$PureComponent);

  function TableView() {
    var _getPrototypeOf2;

    var _this;

    TableView_classCallCheck(this, TableView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = TableView_possibleConstructorReturn(this, (_getPrototypeOf2 = TableView_getPrototypeOf(TableView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    TableView_defineProperty(TableView_assertThisInitialized(_this), "tableElement", external_react_["createRef"]());

    TableView_defineProperty(TableView_assertThisInitialized(_this), "getRowHeight", function (rowIndex) {
      if (typeof _this.props.rowHeight === 'function') return _this.props.rowHeight(rowIndex);
      return _this.props.rowHeight;
    });

    return _this;
  }

  TableView_createClass(TableView, [{
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
      var head = utils["b" /* ReactUtils */].singleChildOfType(this, TableHead);
      var body = utils["b" /* ReactUtils */].singleChildOfType(this, TableBody_TableBody);
      var columns = utils["b" /* ReactUtils */].childrenOfType(this, TableColumn_TableColumn); // columns

      if (columns && columns.length) {
        if (head || body) throw new Error('Can not specify head and/or body when specifying table columns.');
        head = TableColumn_TableColumn.createHeadFromColumns(columns);
        body = TableColumn_TableColumn.createBodyFromColumns(columns);
      } // render


      return external_react_["createElement"](ErrorBoundary["a" /* ErrorBoundary */], null, external_react_["createElement"](external_emotion_theming_["ThemeProvider"], {
        theme: this.getTheme()
      }, external_react_["createElement"](StyledTableView, {
        className: this.props.className,
        style: _objectSpread({}, this.props.style, {}, utils["d" /* SizeUtils */].getElementHeights(this, TableView.defaultHeight))
      }, this.renderTableHead(head), this.renderTableBody(head, body))));
    }
  }, {
    key: "renderTableHead",
    value: function renderTableHead(head) {
      if (!head) return null;

      var _head$props = head.props,
          children = _head$props.children,
          divProps = _objectWithoutProperties(_head$props, ["children"]);

      return external_react_["createElement"](StyledTableHead, _extends({}, divProps, {
        style: _objectSpread({
          direction: this.props.dir
        }, head.props.style, {}, utils["d" /* SizeUtils */].getElementHeights(head, TableView.defaultHeadHeight))
      }), external_react_["Children"].map(children, this.renderCell));
    }
  }, {
    key: "renderTableBody",
    value: function renderTableBody(head, body) {
      var bodyHeights = this.getBodyHeights(this, head, {
        total: TableView.defaultHeight,
        head: TableView.defaultHeadHeight
      });
      return external_react_["createElement"](StyledTableBody, {
        style: _objectSpread({
          direction: this.props.dir
        }, bodyHeights)
      }, external_react_["createElement"](ErrorBoundary["a" /* ErrorBoundary */], null, this.renderTableRows(body)));
    }
  }, {
    key: "renderTableRows",
    value: function renderTableRows(body) {
      var _this2 = this;

      // placeholder
      if (this.props.rowCount === 0 || !TableBody_TableBody.hasChildren(body)) {
        return this.renderItemsPlaceHolder();
      } // table rows


      var rowRender = body.props.children;
      var ListComponent = this.getListComponent();
      return external_react_["createElement"](external_react_virtualized_auto_sizer_default.a, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return external_react_["createElement"](ListComponent, {
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
      });
    }
  }, {
    key: "renderBodyRow",
    value: function renderBodyRow(index, rowRender) {
      if (!rowRender) return null;
      var row = rowRender(index);
      var rowContent = TableRow_TableRow.getRowContent(row);
      rowContent = Object(utils["f" /* asArray */])(rowContent).map(this.renderCell); // already a row - just adjust the content

      if (TableRow_TableRow.isTableRow(row)) {
        var rowKey = this.getRowKey(row.props, index);
        return external_react_["cloneElement"](row, {
          key: rowKey
        }, rowContent);
      } // not a row - wrap content with row element
      else {
          var _rowKey = this.getRowKey({}, index);

          return external_react_["createElement"](TableRow_TableRow, {
            key: _rowKey
          }, rowContent);
        }
    }
  }, {
    key: "renderCell",
    value: function renderCell(cell, columnIndex) {
      var cellProps = TableCell_TableCell.getCellProps(cell);
      if (cellProps.visible === false) return null; // already a cell - just add key and return

      if (TableCell_TableCell.isTableCell(cell)) {
        return external_react_["cloneElement"](cell, {
          key: columnIndex
        });
      } // not a cell - wrap content with cell element


      return external_react_["createElement"](TableCell_TableCell, {
        key: columnIndex
      }, cell);
    }
  }, {
    key: "renderItemsPlaceHolder",
    value: function renderItemsPlaceHolder() {
      return external_react_["createElement"]("div", null, external_react_["createElement"]("div", {
        style: {
          textAlign: 'center'
        }
      }, this.props.emptyMessage));
    } //
    // helpers
    //

  }, {
    key: "getTheme",
    value: function getTheme() {
      return {
        dir: this.props.dir
      };
    }
  }, {
    key: "getListComponent",
    value: function getListComponent() {
      return this.props.isVirtual !== false ? list["VirtualList"] : list["NonVirtualList"];
    }
  }, {
    key: "getRowKey",
    value: function getRowKey(rowProps, index) {
      if (!Object(utils["g" /* isNullOrUndefined */])(rowProps.key)) return rowProps.key;
      if (typeof this.props.rowKey === 'function') return this.props.rowKey(index);
      return index;
    }
  }, {
    key: "getBodyHeights",
    value: function getBodyHeights(table, head, defaultHeights) {
      var totalHeights = utils["d" /* SizeUtils */].getElementHeights(table, defaultHeights.total);
      var headHeight = this.getHeadHeight(head, defaultHeights.head);
      var bodyHeights = utils["d" /* SizeUtils */].getElementHeights(table, undefined);
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
        return utils["d" /* SizeUtils */].getElementHeights(head, defaultHeight).height;
      }

      return 0;
    }
  }]);

  return TableView;
}(external_react_["PureComponent"]);

TableView_defineProperty(TableView_TableView, "defaultHeight", '35vh');

TableView_defineProperty(TableView_TableView, "defaultHeadHeight", '40px');

TableView_defineProperty(TableView_TableView, "Head", TableHead);

TableView_defineProperty(TableView_TableView, "Body", TableBody_TableBody);

TableView_defineProperty(TableView_TableView, "Row", TableRow_TableRow);

TableView_defineProperty(TableView_TableView, "Cell", TableCell_TableCell);

TableView_defineProperty(TableView_TableView, "Column", TableColumn_TableColumn);

TableView_defineProperty(TableView_TableView, "defaultProps", new TableViewProps());
// CONCATENATED MODULE: ./src/table/index.ts
/* concated harmony reexport ColumnBodyProps */__webpack_require__.d(__webpack_exports__, "b", function() { return ColumnBodyProps; });
/* concated harmony reexport ColumnBody */__webpack_require__.d(__webpack_exports__, "a", function() { return ColumnBody; });
/* concated harmony reexport ColumnHead */__webpack_require__.d(__webpack_exports__, "c", function() { return ColumnHead; });
/* concated harmony reexport TableBodyProps */__webpack_require__.d(__webpack_exports__, "f", function() { return TableBodyProps; });
/* concated harmony reexport TableBody */__webpack_require__.d(__webpack_exports__, "e", function() { return TableBody_TableBody; });
/* concated harmony reexport TableCell */__webpack_require__.d(__webpack_exports__, "g", function() { return TableCell_TableCell; });
/* concated harmony reexport TableColumnProps */__webpack_require__.d(__webpack_exports__, "i", function() { return TableColumnProps; });
/* concated harmony reexport TableColumn */__webpack_require__.d(__webpack_exports__, "h", function() { return TableColumn_TableColumn; });
/* concated harmony reexport TableHead */__webpack_require__.d(__webpack_exports__, "j", function() { return TableHead; });
/* concated harmony reexport TableRow */__webpack_require__.d(__webpack_exports__, "k", function() { return TableRow_TableRow; });
/* concated harmony reexport RowAutoSize */__webpack_require__.d(__webpack_exports__, "d", function() { return RowAutoSize; });
/* concated harmony reexport TableViewProps */__webpack_require__.d(__webpack_exports__, "m", function() { return TableViewProps; });
/* concated harmony reexport TableView */__webpack_require__.d(__webpack_exports__, "l", function() { return TableView_TableView; });









/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);

// EXTERNAL MODULE: external "react-virtualized-auto-sizer"
var external_react_virtualized_auto_sizer_ = __webpack_require__(6);
var external_react_virtualized_auto_sizer_default = /*#__PURE__*/__webpack_require__.n(external_react_virtualized_auto_sizer_);

// EXTERNAL MODULE: ./src/internal/ErrorBoundary.tsx
var ErrorBoundary = __webpack_require__(3);

// EXTERNAL MODULE: ./src/internal/utils/index.ts + 5 modules
var utils = __webpack_require__(1);

// EXTERNAL MODULE: ./src/internal/window/index.ts + 4 modules
var internal_window = __webpack_require__(4);

// EXTERNAL MODULE: ./src/internal/grid/virtualGridProps.ts
var virtualGridProps = __webpack_require__(2);

// CONCATENATED MODULE: ./src/internal/grid/VirtualGrid.tsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var VirtualGridState = function VirtualGridState() {
  _classCallCheck(this, VirtualGridState);

  _defineProperty(this, "scrollTop", 0);

  _defineProperty(this, "scrollLeft", 0);
};

var VirtualGrid_VirtualGrid =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(VirtualGrid, _React$PureComponent);

  _createClass(VirtualGrid, [{
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
  }, {
    key: "headerTiles",
    get: function get() {
      var _this2 = this;

      return this.activeTiles.filter(function (key) {
        return _this2.tiles[key].position.vertical === 'header';
      });
    }
  }, {
    key: "bodyTiles",
    get: function get() {
      var _this3 = this;

      return this.activeTiles.filter(function (key) {
        return _this3.tiles[key].position.vertical === 'body';
      });
    }
  }, {
    key: "footerTiles",
    get: function get() {
      var _this4 = this;

      return this.activeTiles.filter(function (key) {
        return _this4.tiles[key].position.vertical === 'footer';
      });
    }
  }]);

  function VirtualGrid(_props) {
    var _this;

    _classCallCheck(this, VirtualGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VirtualGrid).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "tiles", {});

    _defineProperty(_assertThisInitialized(_this), "initialCalculator", new internal_window["b" /* WindowCalculator */]());

    _defineProperty(_assertThisInitialized(_this), "renderTile", function (tileKey) {
      var _this$tiles$tileKey = _this.tiles[tileKey],
          ref = _this$tiles$tileKey.ref,
          props = _this$tiles$tileKey.props,
          rowIndexOffset = _this$tiles$tileKey.rowIndexOffset,
          columnIndexOffset = _this$tiles$tileKey.columnIndexOffset;
      return external_react_["createElement"](internal_window["a" /* VirtualWindow */], _extends({
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
      var normalized = utils["c" /* ScrollUtils */].normalizeScrollEvent(e, _this.direction);

      if (!utils["a" /* DomUtils */].isPositionStickySupported) {
        // Need to restore tiles position
        _this.setState({
          scrollTop: normalized.scrollTop,
          scrollLeft: normalized.normalizedScrollLeft
        });
      } // Scroll tiles content


      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.activeTiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tileKey = _step.value;
          var ref = _this.tiles[tileKey].ref;
          ref.current.scrollTo(normalized);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    _this.state = new VirtualGridState();
    _this.tiles = _this.createTilesMap();
    return _this;
  } //
  // life cycle
  //


  _createClass(VirtualGrid, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!Object(utils["e" /* areShallowEqual */])(this.props, prevProps)) {
        this.initialCalculator = new internal_window["b" /* WindowCalculator */]();
        this.tiles = this.createTilesMap();
        this.forceUpdate();
      }
    } //
    // render methods
    //

  }, {
    key: "render",
    value: function render() {
      return external_react_["createElement"]("div", {
        className: this.createClassName('Main_Container'),
        style: _objectSpread({
          direction: this.direction,
          position: 'relative',
          height: this.getContainerHeight(),
          width: this.getContainerWidth(),
          overflow: 'auto'
        }, this.props.style),
        onScroll: this.handleScroll
      }, external_react_["createElement"]("div", {
        className: this.createClassName('Main_ScrollableArea'),
        style: {
          height: this.getScrollableHeight(),
          width: this.getScrollableWidth()
        }
      }, this.renderTilesRow(this.headerTiles), this.renderTilesRow(this.bodyTiles), this.renderTilesRow(this.footerTiles)));
    }
  }, {
    key: "renderTilesRow",
    value: function renderTilesRow(tileKeys) {
      var _this5 = this,
          _ref;

      if (!(tileKeys === null || tileKeys === void 0 ? void 0 : tileKeys.length)) return null;
      var firstTile = this.tiles[tileKeys[0]];
      var rightOrLeft = this.direction === 'rtl' ? 'right' : 'left';
      var isSticky = utils["a" /* DomUtils */].isPositionStickySupported;
      var position = isSticky ? 'sticky' : 'absolute';
      var topOffset = isSticky ? 0 : this.state.scrollTop;
      var leftOffset = isSticky ? 0 : this.state.scrollLeft;
      var width = tileKeys.map(function (key) {
        return _this5.tiles[key].props.width;
      }).reduce(function (total, cur) {
        return total + cur;
      }, 0);
      return external_react_["createElement"]("div", {
        style: (_ref = {
          display: 'flex',
          position: position,
          top: firstTile.tileRowTop + topOffset
        }, _defineProperty(_ref, rightOrLeft, 0 + leftOffset), _defineProperty(_ref, "height", firstTile.props.height), _defineProperty(_ref, "width", width), _ref)
      }, tileKeys.map(this.renderTile));
    }
  }, {
    key: "createTilesMap",
    //
    // render helpers
    //
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
          map[virtualGridProps["a" /* TileKey */].HeaderLeft] = createTilesMapEntry(virtualGridProps["a" /* TileKey */].HeaderLeft);
        }

        map[virtualGridProps["a" /* TileKey */].HeaderCenter] = createTilesMapEntry(virtualGridProps["a" /* TileKey */].HeaderCenter);

        if (hasFixedRightColumn) {
          map[virtualGridProps["a" /* TileKey */].HeaderRight] = createTilesMapEntry(virtualGridProps["a" /* TileKey */].HeaderRight);
        }
      } // body


      if (hasFixedLeftColumn) {
        map[virtualGridProps["a" /* TileKey */].BodyLeft] = createTilesMapEntry(virtualGridProps["a" /* TileKey */].BodyLeft);
      }

      map[virtualGridProps["a" /* TileKey */].BodyCenter] = createTilesMapEntry(virtualGridProps["a" /* TileKey */].BodyCenter);

      if (hasFixedRightColumn) {
        map[virtualGridProps["a" /* TileKey */].BodyRight] = createTilesMapEntry(virtualGridProps["a" /* TileKey */].BodyRight);
      } // footer


      if (hasFooter) {
        if (hasFixedLeftColumn) {
          map[virtualGridProps["a" /* TileKey */].FooterLeft] = createTilesMapEntry(virtualGridProps["a" /* TileKey */].FooterLeft);
        }

        map[virtualGridProps["a" /* TileKey */].FooterCenter] = createTilesMapEntry(virtualGridProps["a" /* TileKey */].FooterCenter);

        if (hasFixedRightColumn) {
          map[virtualGridProps["a" /* TileKey */].FooterRight] = createTilesMapEntry(virtualGridProps["a" /* TileKey */].FooterRight);
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
          ref: external_react_["createRef"](),
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
            estimatedColumnWidth: horizontal === 'left' ? leftWidth : horizontal === 'center' ? _this6.props.estimatedColumnWidth : rightWidth,
            estimatedRowHeight: vertical === 'header' ? headerHeight : vertical === 'body' ? _this6.props.estimatedRowHeight : footerHeight,
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
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.activeTiles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var tileKey = _step2.value;
          this.tiles[tileKey].ref.current.clearCache();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.tiles = {};
    }
  }, {
    key: "getContainerHeight",
    value: function getContainerHeight() {
      var scrollableHeight = this.getScrollableHeight();
      var horizontalScrollbarWidth = this.getHorizontalScrollbarWidth();
      return Math.min(this.props.height, scrollableHeight + horizontalScrollbarWidth);
    }
  }, {
    key: "getContainerWidth",
    value: function getContainerWidth() {
      var scrollableWidth = this.getScrollableWidth();
      var verticalScrollbarWidth = this.getVerticalScrollbarWidth();
      return Math.min(this.props.width, scrollableWidth + verticalScrollbarWidth);
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

      var body = (_this$tiles$TileKey$B = this.tiles[virtualGridProps["a" /* TileKey */].BodyCenter]) === null || _this$tiles$TileKey$B === void 0 ? void 0 : (_this$tiles$TileKey$B2 = _this$tiles$TileKey$B.ref) === null || _this$tiles$TileKey$B2 === void 0 ? void 0 : _this$tiles$TileKey$B2.current;
      if (body) return body.getScrollableHeight(); // Body not rendered yet - have to calculate independently.  
      // Not so DRY, breaks encapsulation and not very efficient either but I
      // couldn't find a better way to do that which is not terribly ugly...

      return this.initialCalculator.getTotalSize('row', this.props.rowHeight, this.props.estimatedRowHeight, this.props.rowCount);
    }
  }, {
    key: "getBodyScrollableWidth",
    value: function getBodyScrollableWidth() {
      var _this$tiles$TileKey$B3, _this$tiles$TileKey$B4;

      var body = (_this$tiles$TileKey$B3 = this.tiles[virtualGridProps["a" /* TileKey */].BodyCenter]) === null || _this$tiles$TileKey$B3 === void 0 ? void 0 : (_this$tiles$TileKey$B4 = _this$tiles$TileKey$B3.ref) === null || _this$tiles$TileKey$B4 === void 0 ? void 0 : _this$tiles$TileKey$B4.current;
      if (body) return body.getScrollableWidth(); // Body not rendered yet - have to calculate independently.  
      // Not so DRY, breaks encapsulation and not very efficient either but I
      // couldn't find a better way to do that which is not terribly ugly...

      return this.initialCalculator.getTotalSize('column', this.props.columnWidth, this.props.estimatedColumnWidth, this.props.columnCount);
    }
  }, {
    key: "getVerticalScrollbarWidth",
    value: function getVerticalScrollbarWidth() {
      var scrollableHeight = this.getScrollableHeight();
      var hasVerticalScrollbar = scrollableHeight > this.props.height;
      return hasVerticalScrollbar && utils["a" /* DomUtils */].scrollbarWidth || 0;
    }
  }, {
    key: "getHorizontalScrollbarWidth",
    value: function getHorizontalScrollbarWidth() {
      var scrollableWidth = this.getScrollableWidth();
      var hasHorizontalScrollbar = scrollableWidth > this.props.width;
      return hasHorizontalScrollbar && utils["a" /* DomUtils */].scrollbarWidth || 0;
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

  return VirtualGrid;
}(external_react_["PureComponent"]);

_defineProperty(VirtualGrid_VirtualGrid, "defaultProps", new virtualGridProps["b" /* VirtualGridProps */]());
// CONCATENATED MODULE: ./src/internal/grid/index.ts


// CONCATENATED MODULE: ./src/grid/GridView.tsx
function GridView_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { GridView_typeof = function _typeof(obj) { return typeof obj; }; } else { GridView_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return GridView_typeof(obj); }

function GridView_extends() { GridView_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return GridView_extends.apply(this, arguments); }

function GridView_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function GridView_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { GridView_ownKeys(source, true).forEach(function (key) { GridView_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { GridView_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function GridView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GridView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GridView_createClass(Constructor, protoProps, staticProps) { if (protoProps) GridView_defineProperties(Constructor.prototype, protoProps); if (staticProps) GridView_defineProperties(Constructor, staticProps); return Constructor; }

function GridView_possibleConstructorReturn(self, call) { if (call && (GridView_typeof(call) === "object" || typeof call === "function")) { return call; } return GridView_assertThisInitialized(self); }

function GridView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function GridView_getPrototypeOf(o) { GridView_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return GridView_getPrototypeOf(o); }

function GridView_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) GridView_setPrototypeOf(subClass, superClass); }

function GridView_setPrototypeOf(o, p) { GridView_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return GridView_setPrototypeOf(o, p); }

function GridView_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var GridView_GridView =
/*#__PURE__*/
function (_React$PureComponent) {
  GridView_inherits(GridView, _React$PureComponent);

  function GridView() {
    GridView_classCallCheck(this, GridView);

    return GridView_possibleConstructorReturn(this, GridView_getPrototypeOf(GridView).apply(this, arguments));
  }

  GridView_createClass(GridView, [{
    key: "render",
    value: function render() {
      var _this = this;

      return external_react_["createElement"](ErrorBoundary["a" /* ErrorBoundary */], null, external_react_["createElement"]("div", {
        style: GridView_objectSpread({
          direction: this.direction,
          width: '100%'
        }, this.props.style, {}, utils["d" /* SizeUtils */].getElementHeights(this, GridView.defaultHeight))
      }, external_react_["createElement"](external_react_virtualized_auto_sizer_default.a, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return external_react_["createElement"](VirtualGrid_VirtualGrid, GridView_extends({}, _this.props, {
          height: height,
          width: width
        }));
      })));
    }
  }, {
    key: "direction",
    get: function get() {
      var _this$props$style;

      return ((_this$props$style = this.props.style) === null || _this$props$style === void 0 ? void 0 : _this$props$style.direction) === 'rtl' ? 'rtl' : 'ltr';
    }
  }]);

  return GridView;
}(external_react_["PureComponent"]);

GridView_defineProperty(GridView_GridView, "defaultHeight", '35vh');
// CONCATENATED MODULE: ./src/grid/index.ts
/* concated harmony reexport GridView */__webpack_require__.d(__webpack_exports__, "a", function() { return GridView_GridView; });


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("emotion-theming");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-custom-scrollbars");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridView", function() { return _grid__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColumnBodyProps", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColumnBody", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColumnHead", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableBodyProps", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableBody", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableCell", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableColumnProps", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableColumn", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableHead", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableRow", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["k"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RowAutoSize", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableViewProps", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["m"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableView", function() { return _table__WEBPACK_IMPORTED_MODULE_1__["l"]; });

/* harmony import */ var _internal_grid_virtualGridProps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TileKey", function() { return _internal_grid_virtualGridProps__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VirtualGridProps", function() { return _internal_grid_virtualGridProps__WEBPACK_IMPORTED_MODULE_2__["b"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_3__) if(["GridView","ColumnBodyProps","ColumnBody","ColumnHead","TableBodyProps","TableBody","TableCell","TableColumnProps","TableColumn","TableHead","TableRow","RowAutoSize","TableViewProps","TableView","TileKey","VirtualGridProps","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_3__[key]; }) }(__WEBPACK_IMPORT_KEY__));





/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("lodash.flattendeep");

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-tablize.js.map