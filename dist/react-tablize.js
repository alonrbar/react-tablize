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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!***********************************!*\
  !*** ./src/index.ts + 24 modules ***!
  \***********************************/
/*! exports provided: GridView, ColumnBodyProps, ColumnBody, ColumnHead, TableBodyProps, TableBody, TableCell, TableColumnProps, TableColumn, TableHead, TableRow, TableViewProps, TableView */
/*! ModuleConcatenation bailout: Cannot concat with external "@emotion/styled" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "emotion-theming" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react-custom-scrollbars" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react-virtualized-auto-sizer" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react-window" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "emotion-theming"
var external_emotion_theming_ = __webpack_require__("emotion-theming");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("react");

// EXTERNAL MODULE: external "react-virtualized-auto-sizer"
var external_react_virtualized_auto_sizer_ = __webpack_require__("react-virtualized-auto-sizer");
var external_react_virtualized_auto_sizer_default = /*#__PURE__*/__webpack_require__.n(external_react_virtualized_auto_sizer_);

// EXTERNAL MODULE: external "react-window"
var external_react_window_ = __webpack_require__("react-window");

// CONCATENATED MODULE: ./src/utils/ErrorBoundary.tsx
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

var ErrorBoundary_ErrorBoundary =
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
        return external_react_["createElement"]("span", null, "X");
      }

      return this.props.children !== undefined ? this.props.children : null;
    }
  }]);

  return ErrorBoundary;
}(external_react_["Component"]);
// CONCATENATED MODULE: ./src/utils/reactUtils.ts
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
    key: "getProps",
    //
    // props
    //
    value: function getProps(elem) {
      return elem && elem.props || {};
    } //
    // react element
    //

  }, {
    key: "elementInstanceOf",
    value: function elementInstanceOf(elem, type) {
      if (!elem) return false;
      if (!elem.type) return false; // https://stackoverflow.com/questions/39387405/using-instanceof-to-test-for-base-class-of-a-react-component
      // https://stackoverflow.com/questions/14486110/how-to-check-if-a-javascript-class-inherits-another-without-creating-an-obj
      // https://stackoverflow.com/questions/2464426/whats-the-difference-between-isprototypeof-and-instanceof-in-javascript

      return elem.type === type || elem.type.prototype instanceof type || Object.prototype.isPrototypeOf.call(type, elem.type);
    }
  }, {
    key: "isReactFragment",
    value: function isReactFragment(elem) {
      return external_react_["isValidElement"](elem) && elem.type === external_react_["Fragment"];
    } //
    // react children
    //

  }, {
    key: "addPropsToChildren",
    value: function addPropsToChildren(children, createPropsToAdd) {
      // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
      return external_react_["Children"].map(children, function (child, index) {
        var propsToAdd = createPropsToAdd(child, index);
        return external_react_["cloneElement"](child, propsToAdd);
      });
    }
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
    } // tslint:disable-next-line:ban-types

  }, {
    key: "singleFunctionChild",
    value: function singleFunctionChild(parentElement) {
      if (!parentElement) return null;
      if (!parentElement.props) return null;
      var children = parentElement.props.children;
      if (typeof parentElement.props.children !== 'function') return null;
      return children;
    }
  }]);

  return ReactUtils;
}();
// CONCATENATED MODULE: ./src/utils/sizeUtils.ts
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
    key: "geElementHeights",
    value: function geElementHeights(component, defaultHeight) {
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
  }, {
    key: "getBodyHeights",
    value: function getBodyHeights(table, head, defaultHeights) {
      var totalHeights = this.geElementHeights(table, defaultHeights.total);
      var headHeight = this.getHeadHeight(head, defaultHeights.head);
      var bodyHeights = this.geElementHeights(table, undefined);
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
        return this.geElementHeights(head, defaultHeight).height;
      }

      return 0;
    }
  }, {
    key: "cssSizeString",
    value: function cssSizeString(size) {
      if (Number.isFinite(size)) return size + 'px';
      return size;
    }
  }]);

  return SizeUtils;
}();
// CONCATENATED MODULE: ./src/utils/utils.ts
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
function randomInt() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MIN_SAFE_INTEGER;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_SAFE_INTEGER;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function range(count) {
  // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
  return _toConsumableArray(Array(count || 0).keys());
}
// CONCATENATED MODULE: ./src/utils/index.ts




// CONCATENATED MODULE: ./src/grid/GridBody.tsx
function GridBody_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { GridBody_typeof = function _typeof(obj) { return typeof obj; }; } else { GridBody_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return GridBody_typeof(obj); }

function GridBody_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GridBody_possibleConstructorReturn(self, call) { if (call && (GridBody_typeof(call) === "object" || typeof call === "function")) { return call; } return GridBody_assertThisInitialized(self); }

function GridBody_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function GridBody_getPrototypeOf(o) { GridBody_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return GridBody_getPrototypeOf(o); }

function GridBody_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) GridBody_setPrototypeOf(subClass, superClass); }

function GridBody_setPrototypeOf(o, p) { GridBody_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return GridBody_setPrototypeOf(o, p); }


var GridBody =
/*#__PURE__*/
function (_React$PureComponent) {
  GridBody_inherits(GridBody, _React$PureComponent);

  function GridBody() {
    GridBody_classCallCheck(this, GridBody);

    return GridBody_possibleConstructorReturn(this, GridBody_getPrototypeOf(GridBody).apply(this, arguments));
  }

  return GridBody;
}(external_react_["PureComponent"]);
// CONCATENATED MODULE: ./src/grid/GridCell.tsx
function GridCell_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { GridCell_typeof = function _typeof(obj) { return typeof obj; }; } else { GridCell_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return GridCell_typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function GridCell_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GridCell_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GridCell_createClass(Constructor, protoProps, staticProps) { if (protoProps) GridCell_defineProperties(Constructor.prototype, protoProps); if (staticProps) GridCell_defineProperties(Constructor, staticProps); return Constructor; }

function GridCell_possibleConstructorReturn(self, call) { if (call && (GridCell_typeof(call) === "object" || typeof call === "function")) { return call; } return GridCell_assertThisInitialized(self); }

function GridCell_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function GridCell_getPrototypeOf(o) { GridCell_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return GridCell_getPrototypeOf(o); }

function GridCell_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) GridCell_setPrototypeOf(subClass, superClass); }

function GridCell_setPrototypeOf(o, p) { GridCell_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return GridCell_setPrototypeOf(o, p); }

function GridCell_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var GridCellSymbol = '__ReactTablize__GridCell__' + randomInt(0);
var GridCell =
/*#__PURE__*/
function (_React$PureComponent) {
  GridCell_inherits(GridCell, _React$PureComponent);

  function GridCell() {
    GridCell_classCallCheck(this, GridCell);

    return GridCell_possibleConstructorReturn(this, GridCell_getPrototypeOf(GridCell).apply(this, arguments));
  }

  GridCell_createClass(GridCell, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }], [{
    key: "extract",
    value: function extract(cell) {
      if (cell && cell.props && cell.props[GridCellSymbol]) {
        var _cell$props = cell.props,
            cellElemChildren = _cell$props.children,
            cellElemProps = _objectWithoutProperties(_cell$props, ["children"]);

        return {
          props: cellElemProps,
          content: cellElemChildren
        };
      } else {
        return {
          props: {},
          content: cell
        };
      }
    }
  }]);

  return GridCell;
}(external_react_["PureComponent"]);

GridCell_defineProperty(GridCell, "defaultProps", GridCell_defineProperty({}, GridCellSymbol, true));
// CONCATENATED MODULE: ./src/grid/GridFooter.tsx
function GridFooter_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { GridFooter_typeof = function _typeof(obj) { return typeof obj; }; } else { GridFooter_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return GridFooter_typeof(obj); }

function GridFooter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GridFooter_possibleConstructorReturn(self, call) { if (call && (GridFooter_typeof(call) === "object" || typeof call === "function")) { return call; } return GridFooter_assertThisInitialized(self); }

function GridFooter_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function GridFooter_getPrototypeOf(o) { GridFooter_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return GridFooter_getPrototypeOf(o); }

function GridFooter_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) GridFooter_setPrototypeOf(subClass, superClass); }

function GridFooter_setPrototypeOf(o, p) { GridFooter_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return GridFooter_setPrototypeOf(o, p); }


var GridFooter =
/*#__PURE__*/
function (_React$PureComponent) {
  GridFooter_inherits(GridFooter, _React$PureComponent);

  function GridFooter() {
    GridFooter_classCallCheck(this, GridFooter);

    return GridFooter_possibleConstructorReturn(this, GridFooter_getPrototypeOf(GridFooter).apply(this, arguments));
  }

  return GridFooter;
}(external_react_["PureComponent"]);
// CONCATENATED MODULE: ./src/grid/GridHead.tsx
function GridHead_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { GridHead_typeof = function _typeof(obj) { return typeof obj; }; } else { GridHead_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return GridHead_typeof(obj); }

function GridHead_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GridHead_possibleConstructorReturn(self, call) { if (call && (GridHead_typeof(call) === "object" || typeof call === "function")) { return call; } return GridHead_assertThisInitialized(self); }

function GridHead_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function GridHead_getPrototypeOf(o) { GridHead_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return GridHead_getPrototypeOf(o); }

function GridHead_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) GridHead_setPrototypeOf(subClass, superClass); }

function GridHead_setPrototypeOf(o, p) { GridHead_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return GridHead_setPrototypeOf(o, p); }


var GridHead =
/*#__PURE__*/
function (_React$PureComponent) {
  GridHead_inherits(GridHead, _React$PureComponent);

  function GridHead() {
    GridHead_classCallCheck(this, GridHead);

    return GridHead_possibleConstructorReturn(this, GridHead_getPrototypeOf(GridHead).apply(this, arguments));
  }

  return GridHead;
}(external_react_["PureComponent"]);
// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__("@emotion/styled");
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);

// CONCATENATED MODULE: ./src/styled.ts

var styledWithTheme = styled_default.a;

// CONCATENATED MODULE: ./src/grid/style.tsx
function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n    label: grid-body-cell;\n\n    display: flex;\n\n    height: 100%;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n\n    align-items: center;\n    vertical-align: middle;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    label: grid-body;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    label: grid-head-cell;\n\n    display: flex;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n\n    align-items: flex-end;\n    vertical-align: bottom;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    label: grid-head;\n\n    display: flex;\n\n    font-weight: bold;\n    vertical-align: middle;\n\n    ", ": ", "px;\n    border-bottom: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    label: grid-view;\n\n    width: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

 //
// constants
//

var scrollbarWidth = 17;
var tableBorder = '1px solid #ddd'; //
// grid
//

var StyledGridView = styledWithTheme.div(_templateObject()); //
// head
//

var StyledGridHead = styledWithTheme.div(_templateObject2(), function (props) {
  return props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right';
}, scrollbarWidth, tableBorder);
var StyledGridHeadCell = styledWithTheme.div(_templateObject3()); //
// body
//

var StyledGridBody = styledWithTheme.div(_templateObject4());
var StyledGridBodyCell = styledWithTheme.div(_templateObject5());
// CONCATENATED MODULE: ./src/grid/GridView.tsx
function GridView_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { GridView_typeof = function _typeof(obj) { return typeof obj; }; } else { GridView_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return GridView_typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function GridView_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = GridView_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function GridView_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function GridView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GridView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GridView_createClass(Constructor, protoProps, staticProps) { if (protoProps) GridView_defineProperties(Constructor.prototype, protoProps); if (staticProps) GridView_defineProperties(Constructor, staticProps); return Constructor; }

function GridView_possibleConstructorReturn(self, call) { if (call && (GridView_typeof(call) === "object" || typeof call === "function")) { return call; } return GridView_assertThisInitialized(self); }

function GridView_getPrototypeOf(o) { GridView_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return GridView_getPrototypeOf(o); }

function GridView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function GridView_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) GridView_setPrototypeOf(subClass, superClass); }

function GridView_setPrototypeOf(o, p) { GridView_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return GridView_setPrototypeOf(o, p); }

function GridView_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var GridView_GridView =
/*#__PURE__*/
function (_React$PureComponent) {
  GridView_inherits(GridView, _React$PureComponent);

  function GridView() {
    var _getPrototypeOf2;

    var _this;

    GridView_classCallCheck(this, GridView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = GridView_possibleConstructorReturn(this, (_getPrototypeOf2 = GridView_getPrototypeOf(GridView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    GridView_defineProperty(GridView_assertThisInitialized(_this), "headList", external_react_["createRef"]());

    GridView_defineProperty(GridView_assertThisInitialized(_this), "mainBodyGrid", external_react_["createRef"]());

    GridView_defineProperty(GridView_assertThisInitialized(_this), "freezedColumnsGrid", external_react_["createRef"]());

    GridView_defineProperty(GridView_assertThisInitialized(_this), "syncScroll", function (e) {
      var scrollTop = e.scrollTop,
          scrollLeft = e.scrollLeft; // synchronize head

      if (_this.headList.current) {
        _this.headList.current.scrollTo(scrollLeft);
      } // synchronize frozen body columns


      if (_this.freezedColumnsGrid.current) {
        _this.freezedColumnsGrid.current.scrollTo({
          scrollTop: scrollTop
        });
      }
    });

    GridView_defineProperty(GridView_assertThisInitialized(_this), "getColumnWidth", function (colIndex) {
      if (typeof _this.props.columnWidth === 'function') return _this.props.columnWidth(colIndex);
      return _this.props.columnWidth;
    });

    GridView_defineProperty(GridView_assertThisInitialized(_this), "getRowHeight", function (rowHeightProp) {
      return function (rowIndex) {
        if (typeof rowHeightProp === 'function') return rowHeightProp(rowIndex);
        return rowHeightProp;
      };
    });

    return _this;
  }

  GridView_createClass(GridView, [{
    key: "render",
    value: function render() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      var _this$props = this.props,
          columnCount = _this$props.columnCount,
          columnWidth = _this$props.columnWidth,
          children = _this$props.children,
          divProps = GridView_objectWithoutProperties(_this$props, ["columnCount", "columnWidth", "children"]);

      return external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, external_react_["createElement"](external_emotion_theming_["ThemeProvider"], {
        theme: this.getTheme()
      }, external_react_["createElement"](StyledGridView, _extends({}, divProps, {
        style: Object.assign({
          direction: this.props.dir
        }, this.props.style, SizeUtils.geElementHeights(this, GridView.defaultHeight))
      }), this.renderHead(), this.renderBody(), this.renderFooter())));
    }
  }, {
    key: "renderHead",
    value: function renderHead() {
      var _this2 = this;

      var head = reactUtils_ReactUtils.singleChildOfType(this, GridHead);
      if (!head) return null;

      var _head$props = head.props,
          cellRender = _head$props.children,
          divProps = GridView_objectWithoutProperties(_head$props, ["children"]);

      var freezeColumns = this.props.freezeColumns || 0;
      return external_react_["createElement"](StyledGridHead, _extends({}, divProps, {
        style: Object.assign({}, head.props.style, SizeUtils.geElementHeights(head, GridView.defaultHeadHeight))
      }), external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, external_react_["createElement"](external_react_virtualized_auto_sizer_default.a, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return external_react_["createElement"]("div", {
          style: {
            width: width,
            height: height,
            display: 'flex'
          }
        }, range(freezeColumns).map(function (columnIndex) {
          return _this2.renderHeadCell({
            cellRender: cellRender,
            columnIndex: columnIndex,
            isScrolling: false
          });
        }), external_react_["createElement"](external_react_window_["VariableSizeList"], {
          ref: _this2.headList,
          direction: _this2.props.dir,
          style: {
            overflow: 'hidden'
          },
          layout: "horizontal",
          height: height,
          width: width - _this2.getFrozenColumnsWidth(),
          itemCount: _this2.props.columnCount - freezeColumns,
          itemSize: function itemSize(colIndex) {
            return _this2.getColumnWidth(colIndex + freezeColumns);
          },
          overscanCount: _this2.props.overscanColumnsCount,
          useIsScrolling: _this2.props.useIsScrolling
        }, function (_ref2) {
          var index = _ref2.index,
              style = _ref2.style,
              isScrolling = _ref2.isScrolling;
          return _this2.renderHeadCell({
            cellRender: cellRender,
            columnIndex: index + freezeColumns,
            isScrolling: isScrolling,
            style: style
          });
        }));
      })));
    }
  }, {
    key: "renderHeadCell",
    value: function renderHeadCell(args) {
      var columnIndex = args.columnIndex,
          cellRender = args.cellRender,
          isScrolling = args.isScrolling,
          style = args.style; // create the cell

      var cell = cellRender({
        columnIndex: columnIndex,
        isScrolling: isScrolling
      }); // get cell props & content

      var _GridCell$extract = GridCell.extract(cell),
          cellProps = _GridCell$extract.props,
          cellContent = _GridCell$extract.content;

      var columnWidth = this.getColumnWidth(columnIndex); // render

      return external_react_["createElement"](StyledGridHeadCell, _extends({
        key: columnIndex
      }, cellProps, {
        style: Object.assign({
          width: columnWidth
        }, cellProps.style, style)
      }), external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, cellContent));
    }
  }, {
    key: "renderBody",
    value: function renderBody() {
      var _this3 = this;

      var body = reactUtils_ReactUtils.singleChildOfType(this, GridBody);
      if (!body) return null;

      var _body$props = body.props,
          cellRender = _body$props.children,
          rowCount = _body$props.rowCount,
          rowHeight = _body$props.rowHeight,
          divProps = GridView_objectWithoutProperties(_body$props, ["children", "rowCount", "rowHeight"]);

      var head = reactUtils_ReactUtils.singleChildOfType(this, GridHead);
      var heights = SizeUtils.getBodyHeights(this, head, {
        total: GridView.defaultHeight,
        head: GridView.defaultHeadHeight
      });
      var freezeColumns = this.props.freezeColumns || 0;
      var frozenColumnsWidth = this.getFrozenColumnsWidth();
      return external_react_["createElement"](StyledGridBody, _extends({}, divProps, {
        style: Object.assign({}, divProps.style, heights)
      }), external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, external_react_["createElement"](external_react_virtualized_auto_sizer_default.a, null, function (_ref3) {
        var height = _ref3.height,
            width = _ref3.width;
        return external_react_["createElement"]("div", {
          style: {
            width: width,
            height: height,
            display: 'flex'
          }
        }, external_react_["createElement"](external_react_window_["VariableSizeGrid"], {
          ref: _this3.freezedColumnsGrid,
          direction: _this3.props.dir,
          style: {
            overflow: 'hidden'
          },
          height: height - scrollbarWidth,
          width: frozenColumnsWidth,
          columnCount: freezeColumns,
          columnWidth: _this3.getColumnWidth,
          rowCount: rowCount,
          rowHeight: _this3.getRowHeight(rowHeight),
          overscanRowsCount: _this3.props.overscanRowsCount,
          useIsScrolling: _this3.props.useIsScrolling
        }, function (_ref4) {
          var rowIndex = _ref4.rowIndex,
              columnIndex = _ref4.columnIndex,
              style = _ref4.style,
              isScrolling = _ref4.isScrolling;
          return _this3.renderBodyCell({
            cellRender: cellRender,
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            isScrolling: isScrolling,
            style: style
          });
        }), external_react_["createElement"](external_react_window_["VariableSizeGrid"], {
          ref: _this3.mainBodyGrid,
          direction: _this3.props.dir,
          height: height,
          width: width - frozenColumnsWidth,
          columnCount: _this3.props.columnCount - freezeColumns,
          columnWidth: function columnWidth(colIndex) {
            return _this3.getColumnWidth(colIndex + freezeColumns);
          },
          rowCount: rowCount,
          rowHeight: _this3.getRowHeight(rowHeight),
          onScroll: _this3.syncScroll,
          overscanRowsCount: _this3.props.overscanRowsCount,
          overscanColumnsCount: _this3.props.overscanColumnsCount,
          useIsScrolling: _this3.props.useIsScrolling
        }, function (_ref5) {
          var rowIndex = _ref5.rowIndex,
              columnIndex = _ref5.columnIndex,
              style = _ref5.style,
              isScrolling = _ref5.isScrolling;
          return _this3.renderBodyCell({
            cellRender: cellRender,
            rowIndex: rowIndex,
            columnIndex: columnIndex + freezeColumns,
            isScrolling: isScrolling,
            style: style
          });
        }));
      })));
    }
  }, {
    key: "renderBodyCell",
    value: function renderBodyCell(args) {
      var rowIndex = args.rowIndex,
          columnIndex = args.columnIndex,
          cellRender = args.cellRender,
          isScrolling = args.isScrolling,
          style = args.style; // create the cell

      var cell = cellRender({
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        isScrolling: isScrolling
      }); // get cell props & content

      var _GridCell$extract2 = GridCell.extract(cell),
          cellProps = _GridCell$extract2.props,
          cellContent = _GridCell$extract2.content; // render


      return external_react_["createElement"](StyledGridBodyCell, _extends({
        key: "[ ".concat(rowIndex, ", ").concat(columnIndex, " ]")
      }, cellProps, {
        style: Object.assign({}, cellProps.style, style)
      }), external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, cellContent));
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var footer = reactUtils_ReactUtils.singleChildOfType(this, GridFooter);
      if (!footer) return null;
      return external_react_["createElement"]("span", null, "Footer");
    } //
    // event handlers
    //

  }, {
    key: "getTheme",
    //
    // helpers
    //
    value: function getTheme() {
      return {
        dir: this.props.dir
      };
    }
  }, {
    key: "getFrozenColumnsWidth",
    value: function getFrozenColumnsWidth() {
      if (!this.props.freezeColumns) return 0;
      var width = range(this.props.freezeColumns).map(this.getColumnWidth).reduce(function (a, b) {
        return a + b;
      }, 0);
      return width;
    }
  }]);

  return GridView;
}(external_react_["PureComponent"]);

GridView_defineProperty(GridView_GridView, "defaultHeight", '35vh');

GridView_defineProperty(GridView_GridView, "defaultHeadHeight", '40px');

GridView_defineProperty(GridView_GridView, "Head", GridHead);

GridView_defineProperty(GridView_GridView, "Body", GridBody);

GridView_defineProperty(GridView_GridView, "Cell", GridCell);

GridView_defineProperty(GridView_GridView, "defaultProps", {
  overscanRowsCount: 1,
  overscanColumnsCount: 1
});
// CONCATENATED MODULE: ./src/grid/index.ts

// CONCATENATED MODULE: ./src/table/ColumnBody.tsx
function ColumnBody_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ColumnBody_typeof = function _typeof(obj) { return typeof obj; }; } else { ColumnBody_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ColumnBody_typeof(obj); }

function ColumnBody_possibleConstructorReturn(self, call) { if (call && (ColumnBody_typeof(call) === "object" || typeof call === "function")) { return call; } return ColumnBody_assertThisInitialized(self); }

function ColumnBody_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ColumnBody_getPrototypeOf(o) { ColumnBody_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ColumnBody_getPrototypeOf(o); }

function ColumnBody_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ColumnBody_setPrototypeOf(subClass, superClass); }

function ColumnBody_setPrototypeOf(o, p) { ColumnBody_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ColumnBody_setPrototypeOf(o, p); }

function ColumnBody_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ColumnBody_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var ColumnBodyProps = function ColumnBodyProps() {
  ColumnBody_classCallCheck(this, ColumnBodyProps);

  ColumnBody_defineProperty(this, "children", void 0);
};
var ColumnBody =
/*#__PURE__*/
function (_React$PureComponent) {
  ColumnBody_inherits(ColumnBody, _React$PureComponent);

  function ColumnBody() {
    ColumnBody_classCallCheck(this, ColumnBody);

    return ColumnBody_possibleConstructorReturn(this, ColumnBody_getPrototypeOf(ColumnBody).apply(this, arguments));
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
// CONCATENATED MODULE: ./src/table/TableBody.tsx
function TableBody_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableBody_typeof = function _typeof(obj) { return typeof obj; }; } else { TableBody_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableBody_typeof(obj); }

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
var TableBody =
/*#__PURE__*/
function (_React$PureComponent) {
  TableBody_inherits(TableBody, _React$PureComponent);

  function TableBody() {
    TableBody_classCallCheck(this, TableBody);

    return TableBody_possibleConstructorReturn(this, TableBody_getPrototypeOf(TableBody).apply(this, arguments));
  }

  return TableBody;
}(external_react_["PureComponent"]);
// CONCATENATED MODULE: ./src/table/TableCell.tsx
function TableCell_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableCell_typeof = function _typeof(obj) { return typeof obj; }; } else { TableCell_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableCell_typeof(obj); }

function TableCell_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableCell_possibleConstructorReturn(self, call) { if (call && (TableCell_typeof(call) === "object" || typeof call === "function")) { return call; } return TableCell_assertThisInitialized(self); }

function TableCell_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableCell_getPrototypeOf(o) { TableCell_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableCell_getPrototypeOf(o); }

function TableCell_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableCell_setPrototypeOf(subClass, superClass); }

function TableCell_setPrototypeOf(o, p) { TableCell_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableCell_setPrototypeOf(o, p); }


var TableCell =
/*#__PURE__*/
function (_React$PureComponent) {
  TableCell_inherits(TableCell, _React$PureComponent);

  function TableCell() {
    TableCell_classCallCheck(this, TableCell);

    return TableCell_possibleConstructorReturn(this, TableCell_getPrototypeOf(TableCell).apply(this, arguments));
  }

  return TableCell;
}(external_react_["PureComponent"]);
// CONCATENATED MODULE: ./src/table/TableColumn.tsx
function TableColumn_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableColumn_typeof = function _typeof(obj) { return typeof obj; }; } else { TableColumn_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableColumn_typeof(obj); }

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
var TableColumn =
/*#__PURE__*/
function (_React$PureComponent) {
  TableColumn_inherits(TableColumn, _React$PureComponent);

  function TableColumn() {
    TableColumn_classCallCheck(this, TableColumn);

    return TableColumn_possibleConstructorReturn(this, TableColumn_getPrototypeOf(TableColumn).apply(this, arguments));
  }

  return TableColumn;
}(external_react_["PureComponent"]);
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
// CONCATENATED MODULE: ./src/table/TableRow.tsx
function TableRow_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableRow_typeof = function _typeof(obj) { return typeof obj; }; } else { TableRow_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableRow_typeof(obj); }

function TableRow_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableRow_possibleConstructorReturn(self, call) { if (call && (TableRow_typeof(call) === "object" || typeof call === "function")) { return call; } return TableRow_assertThisInitialized(self); }

function TableRow_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableRow_getPrototypeOf(o) { TableRow_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableRow_getPrototypeOf(o); }

function TableRow_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableRow_setPrototypeOf(subClass, superClass); }

function TableRow_setPrototypeOf(o, p) { TableRow_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableRow_setPrototypeOf(o, p); }


var TableRow =
/*#__PURE__*/
function (_React$PureComponent) {
  TableRow_inherits(TableRow, _React$PureComponent);

  function TableRow() {
    TableRow_classCallCheck(this, TableRow);

    return TableRow_possibleConstructorReturn(this, TableRow_getPrototypeOf(TableRow).apply(this, arguments));
  }

  return TableRow;
}(external_react_["PureComponent"]);
// EXTERNAL MODULE: external "react-custom-scrollbars"
var external_react_custom_scrollbars_ = __webpack_require__("react-custom-scrollbars");
var external_react_custom_scrollbars_default = /*#__PURE__*/__webpack_require__.n(external_react_custom_scrollbars_);

// CONCATENATED MODULE: ./src/table/CustomScrollbars.tsx
function CustomScrollbars_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { CustomScrollbars_typeof = function _typeof(obj) { return typeof obj; }; } else { CustomScrollbars_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return CustomScrollbars_typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { CustomScrollbars_defineProperty(target, key, source[key]); }); } return target; }

function CustomScrollbars_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CustomScrollbars_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CustomScrollbars_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CustomScrollbars_createClass(Constructor, protoProps, staticProps) { if (protoProps) CustomScrollbars_defineProperties(Constructor.prototype, protoProps); if (staticProps) CustomScrollbars_defineProperties(Constructor, staticProps); return Constructor; }

function CustomScrollbars_possibleConstructorReturn(self, call) { if (call && (CustomScrollbars_typeof(call) === "object" || typeof call === "function")) { return call; } return CustomScrollbars_assertThisInitialized(self); }

function CustomScrollbars_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function CustomScrollbars_getPrototypeOf(o) { CustomScrollbars_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return CustomScrollbars_getPrototypeOf(o); }

function CustomScrollbars_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) CustomScrollbars_setPrototypeOf(subClass, superClass); }

function CustomScrollbars_setPrototypeOf(o, p) { CustomScrollbars_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return CustomScrollbars_setPrototypeOf(o, p); }



var CustomScrollbars_CustomScrollbars =
/*#__PURE__*/
function (_React$PureComponent) {
  CustomScrollbars_inherits(CustomScrollbars, _React$PureComponent);

  function CustomScrollbars() {
    CustomScrollbars_classCallCheck(this, CustomScrollbars);

    return CustomScrollbars_possibleConstructorReturn(this, CustomScrollbars_getPrototypeOf(CustomScrollbars).apply(this, arguments));
  }

  CustomScrollbars_createClass(CustomScrollbars, [{
    key: "render",
    value: function render() {
      return external_react_["createElement"](external_react_custom_scrollbars_default.a, {
        style: _objectSpread({}, this.props.style, {
          overflow: 'hidden',
          direction: 'ltr'
        }),
        onScroll: this.props.onScroll
      }, this.props.children);
    }
  }]);

  return CustomScrollbars;
}(external_react_["PureComponent"]);
// CONCATENATED MODULE: ./src/table/style.tsx
function _templateObject9() {
  var data = style_taggedTemplateLiteral(["\n    min-width: 40px;\n    max-width: 50px;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = style_taggedTemplateLiteral(["\n    flex: 1;\n    padding: 8px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = style_taggedTemplateLiteral(["\n    flex: 1;\n    display: flex;\n    justify-content: stretch;\n\n    ", ";\n\n    &:first-of-type {\n        border-top: none;\n    }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = style_taggedTemplateLiteral(["\n    display: flex;\n    flex-flow: column;\n\n    vertical-align: middle;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function style_templateObject5() {
  var data = style_taggedTemplateLiteral(["\n    min-width: 40px;\n    max-width: 50px;\n"]);

  style_templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function style_templateObject4() {
  var data = style_taggedTemplateLiteral(["\n    flex: 1;\n    display: flex;\n    padding: 8px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    align-items: flex-end;\n    vertical-align: bottom;\n"]);

  style_templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function style_templateObject3() {
  var data = style_taggedTemplateLiteral(["\n    flex: 1;\n    display: flex;\n    justify-content: stretch;\n\n    ", ": ", ";\n    ", ";\n"]);

  style_templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function style_templateObject2() {
  var data = style_taggedTemplateLiteral(["\n    display: flex;\n    flex-flow: column;\n\n    overflow-y: hidden;\n\n    font-weight: bold;\n    vertical-align: middle;\n"]);

  style_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function style_templateObject() {
  var data = style_taggedTemplateLiteral(["\n    width: 100%;\n    overflow-y: hidden;\n"]);

  style_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function style_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

 //
// constants
//

var style_scrollbarWidth = '17px';
var style_tableBorder = '1px solid #ddd'; //
// table
//

var StyledTableView = styledWithTheme.div(style_templateObject()); //
// head
//

var StyledTableHead = styledWithTheme.div(style_templateObject2());
var TableHeadRow = styledWithTheme.div(style_templateObject3(), function (props) {
  return props.theme.dir === 'rtl' ? 'padding-left' : 'padding-right';
}, style_scrollbarWidth, function (props) {
  return props.theme.hairlines ? "border-bottom: ".concat(style_tableBorder) : '';
});
var TableHeadCell = styledWithTheme.div(style_templateObject4());
var LineNumberHeadCell = styledWithTheme(TableHeadCell)(style_templateObject5()); //
// body
//

var StyledTableBody = styledWithTheme.div(_templateObject6());
var TableBodyRow = styledWithTheme.div(_templateObject7(), function (props) {
  return props.theme.hairlines ? "border-top: ".concat(style_tableBorder) : '';
});
var TableBodyCell = styledWithTheme.div(_templateObject8());
var LineNumberBodyCell = styledWithTheme(TableBodyCell)(_templateObject9());
// CONCATENATED MODULE: ./src/table/TableView.tsx
function TableView_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableView_typeof = function _typeof(obj) { return typeof obj; }; } else { TableView_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableView_typeof(obj); }

function TableView_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { TableView_defineProperty(target, key, source[key]); }); } return target; }

function TableView_extends() { TableView_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return TableView_extends.apply(this, arguments); }

function TableView_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = TableView_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function TableView_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function TableView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TableView_createClass(Constructor, protoProps, staticProps) { if (protoProps) TableView_defineProperties(Constructor.prototype, protoProps); if (staticProps) TableView_defineProperties(Constructor, staticProps); return Constructor; }

function TableView_possibleConstructorReturn(self, call) { if (call && (TableView_typeof(call) === "object" || typeof call === "function")) { return call; } return TableView_assertThisInitialized(self); }

function TableView_getPrototypeOf(o) { TableView_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableView_getPrototypeOf(o); }

function TableView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableView_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableView_setPrototypeOf(subClass, superClass); }

function TableView_setPrototypeOf(o, p) { TableView_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableView_setPrototypeOf(o, p); }

function TableView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableView_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















var flattenDeep = __webpack_require__(/*! lodash.flattendeep */ "lodash.flattendeep");

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

  TableView_defineProperty(this, "lineNumbers", void 0);

  TableView_defineProperty(this, "customScrollbars", void 0);

  TableView_defineProperty(this, "hairlines", void 0);

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
        this.tableElement.current.resetAfterIndex(0, false);
      }

      this.forceUpdate();
    } //
    // render methods
    //

  }, {
    key: "render",
    value: function render() {
      // head & body
      var head = reactUtils_ReactUtils.singleChildOfType(this, TableHead);
      var body = reactUtils_ReactUtils.singleChildOfType(this, TableBody);
      var columns = reactUtils_ReactUtils.childrenOfType(this, TableColumn); // columns

      if (columns && columns.length) {
        if (head || body) throw new Error('Can not specify head and/or body when specifying table columns.');
        head = this.createHeadFromColumns(columns);
        body = this.createBodyFromColumns(columns);
      } // render


      return external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, external_react_["createElement"](external_emotion_theming_["ThemeProvider"], {
        theme: this.getTheme()
      }, external_react_["createElement"](StyledTableView, {
        className: this.props.className,
        style: Object.assign({}, this.props.style, SizeUtils.geElementHeights(this, TableView.defaultHeight))
      }, this.renderTableHead(head), this.renderTableBody(head, body))));
    }
  }, {
    key: "renderTableHead",
    value: function renderTableHead(head) {
      var _this2 = this;

      if (!head) return null;

      var _head$props = head.props,
          children = _head$props.children,
          divProps = TableView_objectWithoutProperties(_head$props, ["children"]);

      return external_react_["createElement"](StyledTableHead, TableView_extends({}, divProps, {
        style: Object.assign({}, head.props.style, SizeUtils.geElementHeights(head, TableView.defaultHeadHeight))
      }), external_react_["createElement"](TableHeadRow, null, external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, this.props.lineNumbers && external_react_["createElement"](LineNumberHeadCell, null), external_react_["Children"].map(children, function (cell, index) {
        var headCell = cell;

        var cellProps = _this2.getHeadCellProps(headCell);

        if (cellProps.visible === false) return null;

        var cellContent = _this2.getHeadCellContent(headCell);

        return external_react_["createElement"](TableHeadCell, TableView_extends({
          key: index
        }, cellProps), external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, cellContent));
      }))));
    }
  }, {
    key: "renderTableBody",
    value: function renderTableBody(head, body) {
      var heights = SizeUtils.getBodyHeights(this, head, {
        total: TableView.defaultHeight,
        head: TableView.defaultHeadHeight
      });
      return external_react_["createElement"](StyledTableBody, {
        style: TableView_objectSpread({
          direction: this.props.dir
        }, heights)
      }, external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, this.renderTableRows(body)));
    }
  }, {
    key: "renderTableRows",
    value: function renderTableRows(body) {
      var _this3 = this;

      // placeholder
      if (this.props.rowCount === 0 || !this.hasBody(body)) {
        return this.renderItemsPlaceHolder();
      } // table rows


      var rowRender = body.props.children;
      return external_react_["createElement"](external_react_virtualized_auto_sizer_default.a, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return _this3.props.isVirtual !== false ? _this3.renderTableRows_virtual(width, height, rowRender) : _this3.renderTableRows_nonVirtual(width, height, rowRender);
      });
    }
  }, {
    key: "renderTableRows_virtual",
    value: function renderTableRows_virtual(width, height, rowRender) {
      var _this4 = this;

      return external_react_["createElement"](external_react_window_["VariableSizeList"], {
        ref: this.tableElement,
        style: {
          outline: 'none'
        },
        outerElementType: this.getOuterElementType(),
        direction: this.props.dir,
        layout: "vertical",
        height: height,
        width: width,
        itemCount: this.props.rowCount,
        itemSize: this.getRowHeight
      }, function (_ref2) {
        var index = _ref2.index,
            style = _ref2.style;
        return _this4.renderBodyRow(index, rowRender, style);
      });
    }
  }, {
    key: "renderTableRows_nonVirtual",
    value: function renderTableRows_nonVirtual(width, height, rowRender) {
      var _this5 = this;

      return external_react_["createElement"](this.getOuterElementType() || 'div', {
        style: {
          height: height,
          width: width,
          direction: this.props.dir,
          outline: 'none',
          overflow: 'auto'
        }
      }, rowRender && Array(this.props.rowCount).fill(0).map(function (_, index) {
        return _this5.renderBodyRow(index, rowRender, {
          height: _this5.getRowHeight(index)
        });
      }));
    }
  }, {
    key: "renderBodyRow",
    value: function renderBodyRow(index, rowRender, style) {
      var _this6 = this;

      if (!rowRender) return null;
      var row = rowRender(index);

      var _this$getRowProps = this.getRowProps(row),
          rowStyle = _this$getRowProps.style,
          rowProps = TableView_objectWithoutProperties(_this$getRowProps, ["style"]);

      var rowKey = this.getRowKey(rowProps, index);
      var rowContent = this.getRowContent(row);
      return external_react_["createElement"](TableBodyRow, TableView_extends({
        style: Object.assign({}, style, rowStyle),
        key: rowKey
      }, rowProps), external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, this.props.lineNumbers && external_react_["createElement"](LineNumberBodyCell, null, index + 1), asArray(rowContent).map(function (cell, columnIndex) {
        var cellProps = _this6.getCellProps(cell);

        if (cellProps.visible === false) return null;
        return external_react_["createElement"](TableBodyCell, TableView_extends({
          key: columnIndex
        }, cellProps), external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, _this6.getCellContent(cell)));
      })));
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
    // components structure handling
    //  

  }, {
    key: "createHeadFromColumns",
    value: function createHeadFromColumns(columns) {
      if (columns.every(function (col) {
        return !reactUtils_ReactUtils.singleChildOfType(col, ColumnHead);
      })) return null;
      var head = external_react_["createElement"](TableHead, null, columns.map(function (col) {
        var colHead = reactUtils_ReactUtils.singleChildOfType(col, ColumnHead);
        if (!colHead) return null; // eslint-disable-next-line react/jsx-key

        return external_react_["createElement"](TableCell, colHead.props);
      }));
      return head;
    }
  }, {
    key: "createBodyFromColumns",
    value: function createBodyFromColumns(columns) {
      var body = external_react_["createElement"](TableBody, null, function (rowIndex) {
        return columns.map(function (col, columnIndex) {
          var cellRender = reactUtils_ReactUtils.singleChildOfType(col, ColumnBody).props.children;
          if (!cellRender) return null;
          return cellRender({
            rowIndex: rowIndex,
            columnIndex: columnIndex
          });
        });
      });
      return body;
    }
  }, {
    key: "getHeadProps",
    value: function getHeadProps(head) {
      if (reactUtils_ReactUtils.elementInstanceOf(head, TableRow)) {
        return head.props;
      } else {
        return {};
      }
    }
  }, {
    key: "getHeadCellProps",
    value: function getHeadCellProps(cell) {
      // cell element
      if (reactUtils_ReactUtils.elementInstanceOf(cell, TableCell)) return cell.props || {}; // default props

      return {};
    }
  }, {
    key: "getHeadCellContent",
    value: function getHeadCellContent(cell) {
      if (reactUtils_ReactUtils.elementInstanceOf(cell, TableCell)) {
        return cell.props.children;
      }

      return cell;
    }
  }, {
    key: "hasBody",
    value: function hasBody(body) {
      if (!body) return false;
      if (isNullOrUndefined(body.props.children)) return false;
      if (typeof body.props.children === 'function') return true;
      if (Array.isArray(body.props.children)) return body.props.children.length > 0;
      var childrenCount = external_react_["Children"].count(body.props.children);
      return childrenCount > 0;
    }
  }, {
    key: "getRowProps",
    value: function getRowProps(row) {
      if (reactUtils_ReactUtils.elementInstanceOf(row, TableRow)) return row.props || {}; // default props

      return {};
    }
  }, {
    key: "getRowContent",
    value: function getRowContent(row) {
      var content = row; // fragment element

      if (reactUtils_ReactUtils.isReactFragment(content)) {
        throw new Error('Can not use React.Fragment as row content. Consider wrapping your content with a row element.');
      } // row element


      if (reactUtils_ReactUtils.elementInstanceOf(content, TableRow)) {
        content = content.props.children;
      } // actual content


      if (Array.isArray(content)) {
        content = flattenDeep(content);
      }

      return content;
    }
  }, {
    key: "getRowKey",
    value: function getRowKey(rowProps, index) {
      if (!isNullOrUndefined(rowProps.key)) return rowProps.key;
      if (typeof this.props.rowKey === 'function') return this.props.rowKey(index);
      return index;
    }
  }, {
    key: "getCellProps",
    value: function getCellProps(cell) {
      // cell element
      if (reactUtils_ReactUtils.elementInstanceOf(cell, TableCell)) return cell.props || {}; // default props

      return {};
    }
  }, {
    key: "getCellContent",
    value: function getCellContent(cell) {
      var content = cell; // cell element

      if (reactUtils_ReactUtils.elementInstanceOf(content, TableCell)) {
        content = content.props.children;
      } // actual content


      return content || null;
    } //
    // helpers
    //

  }, {
    key: "getTheme",
    value: function getTheme() {
      return {
        dir: this.props.dir,
        hairlines: this.props.hairlines !== false
      };
    }
  }, {
    key: "getOuterElementType",
    value: function getOuterElementType() {
      return this.props.customScrollbars ? CustomScrollbars_CustomScrollbars : undefined;
    }
  }]);

  return TableView;
}(external_react_["PureComponent"]);

TableView_defineProperty(TableView_TableView, "defaultHeight", '35vh');

TableView_defineProperty(TableView_TableView, "defaultHeadHeight", '40px');

TableView_defineProperty(TableView_TableView, "Head", TableHead);

TableView_defineProperty(TableView_TableView, "Body", TableBody);

TableView_defineProperty(TableView_TableView, "Row", TableRow);

TableView_defineProperty(TableView_TableView, "Cell", TableCell);

TableView_defineProperty(TableView_TableView, "Column", TableColumn);

TableView_defineProperty(TableView_TableView, "defaultProps", new TableViewProps());
// CONCATENATED MODULE: ./src/table/index.ts








// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport GridView */__webpack_require__.d(__webpack_exports__, "GridView", function() { return GridView_GridView; });
/* concated harmony reexport ColumnBodyProps */__webpack_require__.d(__webpack_exports__, "ColumnBodyProps", function() { return ColumnBodyProps; });
/* concated harmony reexport ColumnBody */__webpack_require__.d(__webpack_exports__, "ColumnBody", function() { return ColumnBody; });
/* concated harmony reexport ColumnHead */__webpack_require__.d(__webpack_exports__, "ColumnHead", function() { return ColumnHead; });
/* concated harmony reexport TableBodyProps */__webpack_require__.d(__webpack_exports__, "TableBodyProps", function() { return TableBodyProps; });
/* concated harmony reexport TableBody */__webpack_require__.d(__webpack_exports__, "TableBody", function() { return TableBody; });
/* concated harmony reexport TableCell */__webpack_require__.d(__webpack_exports__, "TableCell", function() { return TableCell; });
/* concated harmony reexport TableColumnProps */__webpack_require__.d(__webpack_exports__, "TableColumnProps", function() { return TableColumnProps; });
/* concated harmony reexport TableColumn */__webpack_require__.d(__webpack_exports__, "TableColumn", function() { return TableColumn; });
/* concated harmony reexport TableHead */__webpack_require__.d(__webpack_exports__, "TableHead", function() { return TableHead; });
/* concated harmony reexport TableRow */__webpack_require__.d(__webpack_exports__, "TableRow", function() { return TableRow; });
/* concated harmony reexport TableViewProps */__webpack_require__.d(__webpack_exports__, "TableViewProps", function() { return TableViewProps; });
/* concated harmony reexport TableView */__webpack_require__.d(__webpack_exports__, "TableView", function() { return TableView_TableView; });



/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Alon\Documents\devel\react-tablize\src\index.ts */"./src/index.ts");


/***/ }),

/***/ "@emotion/styled":
/*!**********************************!*\
  !*** external "@emotion/styled" ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("@emotion/styled");

/***/ }),

/***/ "emotion-theming":
/*!**********************************!*\
  !*** external "emotion-theming" ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("emotion-theming");

/***/ }),

/***/ "lodash.flattendeep":
/*!*************************************!*\
  !*** external "lodash.flattendeep" ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("lodash.flattendeep");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-custom-scrollbars":
/*!******************************************!*\
  !*** external "react-custom-scrollbars" ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("react-custom-scrollbars");

/***/ }),

/***/ "react-virtualized-auto-sizer":
/*!***********************************************!*\
  !*** external "react-virtualized-auto-sizer" ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("react-virtualized-auto-sizer");

/***/ }),

/***/ "react-window":
/*!*******************************!*\
  !*** external "react-window" ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("react-window");

/***/ })

/******/ });
});
//# sourceMappingURL=react-tablize.js.map