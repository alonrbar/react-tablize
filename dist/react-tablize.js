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
  !*** ./src/index.ts + 16 modules ***!
  \***********************************/
/*! exports provided: GridViewProps, GridView, ColumnBodyProps, ColumnBody, ColumnHeadProps, ColumnHead, TableBodyProps, TableBody, TableCell, TableColumnProps, TableColumn, TableHeadProps, TableHead, TableRow, TableViewProps, TableView */
/*! ModuleConcatenation bailout: Cannot concat with external "@emotion/styled" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "emotion-theming" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react-virtualized-auto-sizer" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react-window" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("react");

// CONCATENATED MODULE: ./src/grid/GridView.tsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var GridViewProps = function GridViewProps() {
  _classCallCheck(this, GridViewProps);
};
var GridView_GridView =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(GridView, _React$PureComponent);

  function GridView() {
    _classCallCheck(this, GridView);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridView).apply(this, arguments));
  }

  _createClass(GridView, [{
    key: "render",
    value: function render() {
      return external_react_["createElement"]("h1", null, "Hi!");
    }
  }]);

  return GridView;
}(external_react_["PureComponent"]);
// CONCATENATED MODULE: ./src/grid/index.ts

// CONCATENATED MODULE: ./src/table/ColumnBody.tsx
function ColumnBody_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ColumnBody_typeof = function _typeof(obj) { return typeof obj; }; } else { ColumnBody_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ColumnBody_typeof(obj); }

function ColumnBody_possibleConstructorReturn(self, call) { if (call && (ColumnBody_typeof(call) === "object" || typeof call === "function")) { return call; } return ColumnBody_assertThisInitialized(self); }

function ColumnBody_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ColumnBody_getPrototypeOf(o) { ColumnBody_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ColumnBody_getPrototypeOf(o); }

function ColumnBody_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ColumnBody_setPrototypeOf(subClass, superClass); }

function ColumnBody_setPrototypeOf(o, p) { ColumnBody_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ColumnBody_setPrototypeOf(o, p); }

function ColumnBody_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var ColumnBodyProps = function ColumnBodyProps() {
  ColumnBody_classCallCheck(this, ColumnBodyProps);

  _defineProperty(this, "children", void 0);
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

function ColumnHead_possibleConstructorReturn(self, call) { if (call && (ColumnHead_typeof(call) === "object" || typeof call === "function")) { return call; } return ColumnHead_assertThisInitialized(self); }

function ColumnHead_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ColumnHead_getPrototypeOf(o) { ColumnHead_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ColumnHead_getPrototypeOf(o); }

function ColumnHead_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ColumnHead_setPrototypeOf(subClass, superClass); }

function ColumnHead_setPrototypeOf(o, p) { ColumnHead_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ColumnHead_setPrototypeOf(o, p); }

function ColumnHead_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ColumnHead_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var ColumnHeadProps = function ColumnHeadProps() {
  ColumnHead_classCallCheck(this, ColumnHeadProps);

  ColumnHead_defineProperty(this, "height", '40px');

  ColumnHead_defineProperty(this, "children", void 0);
};
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

function TableHead_possibleConstructorReturn(self, call) { if (call && (TableHead_typeof(call) === "object" || typeof call === "function")) { return call; } return TableHead_assertThisInitialized(self); }

function TableHead_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableHead_getPrototypeOf(o) { TableHead_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableHead_getPrototypeOf(o); }

function TableHead_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableHead_setPrototypeOf(subClass, superClass); }

function TableHead_setPrototypeOf(o, p) { TableHead_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableHead_setPrototypeOf(o, p); }

function TableHead_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableHead_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var TableHeadProps = function TableHeadProps() {
  TableHead_classCallCheck(this, TableHeadProps);

  TableHead_defineProperty(this, "height", '40px');

  TableHead_defineProperty(this, "children", void 0);
};
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
// EXTERNAL MODULE: external "emotion-theming"
var external_emotion_theming_ = __webpack_require__("emotion-theming");

// EXTERNAL MODULE: external "react-virtualized-auto-sizer"
var external_react_virtualized_auto_sizer_ = __webpack_require__("react-virtualized-auto-sizer");
var external_react_virtualized_auto_sizer_default = /*#__PURE__*/__webpack_require__.n(external_react_virtualized_auto_sizer_);

// EXTERNAL MODULE: external "react-window"
var external_react_window_ = __webpack_require__("react-window");

// CONCATENATED MODULE: ./src/utils/ErrorBoundary.tsx
function ErrorBoundary_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ErrorBoundary_typeof = function _typeof(obj) { return typeof obj; }; } else { ErrorBoundary_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ErrorBoundary_typeof(obj); }

function ErrorBoundary_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ErrorBoundary_createClass(Constructor, protoProps, staticProps) { if (protoProps) ErrorBoundary_defineProperties(Constructor.prototype, protoProps); if (staticProps) ErrorBoundary_defineProperties(Constructor, staticProps); return Constructor; }

function ErrorBoundary_possibleConstructorReturn(self, call) { if (call && (ErrorBoundary_typeof(call) === "object" || typeof call === "function")) { return call; } return ErrorBoundary_assertThisInitialized(self); }

function ErrorBoundary_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ErrorBoundary_getPrototypeOf(o) { ErrorBoundary_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ErrorBoundary_getPrototypeOf(o); }

function ErrorBoundary_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ErrorBoundary_setPrototypeOf(subClass, superClass); }

function ErrorBoundary_setPrototypeOf(o, p) { ErrorBoundary_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ErrorBoundary_setPrototypeOf(o, p); }

function ErrorBoundary_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ErrorBoundary_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var ErrorBoundaryState = function ErrorBoundaryState() {
  ErrorBoundary_classCallCheck(this, ErrorBoundaryState);

  ErrorBoundary_defineProperty(this, "hasError", void 0);
};

var ErrorBoundary_ErrorBoundary =
/*#__PURE__*/
function (_React$Component) {
  ErrorBoundary_inherits(ErrorBoundary, _React$Component);

  function ErrorBoundary(props) {
    var _this;

    ErrorBoundary_classCallCheck(this, ErrorBoundary);

    _this = ErrorBoundary_possibleConstructorReturn(this, ErrorBoundary_getPrototypeOf(ErrorBoundary).call(this, props));
    _this.state = {
      hasError: false
    };
    return _this;
  }

  ErrorBoundary_createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      this.setState({
        hasError: true
      });
      console.error(error);
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

      return elem.type === type || elem.type.prototype instanceof type || type.isPrototypeOf(elem.type);
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
// CONCATENATED MODULE: ./src/utils/utils.ts
function isNullOrUndefined(val) {
  return val === null || val === undefined;
}
function asArray(val) {
  if (Array.isArray(val)) return val;
  return [val];
}
function cssSizeString(size) {
  if (Number.isFinite(size)) return size + 'px';
  return size;
}
// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__("@emotion/styled");
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);

// CONCATENATED MODULE: ./src/styled.ts

var styledWithTheme = styled_default.a;

// CONCATENATED MODULE: ./src/table/style.tsx
function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n    flex: 1;\n    padding: 8px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n    flex: 1;\n    display: flex;\n    justify-content: stretch;\n\n    border-top: ", ";\n\n    &:first-of-type {\n        border-top: none;\n    }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    flex-flow: column;\n\n    vertical-align: middle;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    flex: 1;\n    display: flex;\n    padding: 8px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    align-items: flex-end;\n    vertical-align: bottom;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    flex: 1;\n    display: flex;\n    justify-content: stretch;\n\n    ", ": ", ";\n\n    border-bottom: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    flex-flow: column;\n\n    overflow-y: hidden;\n\n    font-weight: bold;\n    vertical-align: middle;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    background-color: #fff;\n    width: 100%;\n    overflow-y: hidden;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

 //
// constants
//

var scrollbarWidth = '17px';
var tableBorder = '1px solid #ddd'; //
// table
//

var StyledTableView = styledWithTheme.div(_templateObject()); //
// head
//

var StyledTableHead = styledWithTheme.div(_templateObject2());
var StyledTableHeadRow = styledWithTheme.div(_templateObject3(), function (props) {
  return props.theme.dir === 'rtl' ? 'padding-left' : 'padding-dir';
}, scrollbarWidth, tableBorder);
var StyledTableHeadCell = styledWithTheme.div(_templateObject4()); //
// body
//

var StyledTableBody = styledWithTheme.div(_templateObject5());
var StyledTableBodyRow = styledWithTheme.div(_templateObject6(), tableBorder);
var StyledTableBodyCell = styledWithTheme.div(_templateObject7());
// CONCATENATED MODULE: ./src/table/TableView.tsx
function TableView_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TableView_typeof = function _typeof(obj) { return typeof obj; }; } else { TableView_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TableView_typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TableView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TableView_createClass(Constructor, protoProps, staticProps) { if (protoProps) TableView_defineProperties(Constructor.prototype, protoProps); if (staticProps) TableView_defineProperties(Constructor, staticProps); return Constructor; }

function TableView_possibleConstructorReturn(self, call) { if (call && (TableView_typeof(call) === "object" || typeof call === "function")) { return call; } return TableView_assertThisInitialized(self); }

function TableView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TableView_getPrototypeOf(o) { TableView_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TableView_getPrototypeOf(o); }

function TableView_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TableView_setPrototypeOf(subClass, superClass); }

function TableView_setPrototypeOf(o, p) { TableView_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TableView_setPrototypeOf(o, p); }

function TableView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TableView_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















var flattenDeep = __webpack_require__(/*! lodash.flattendeep */ "lodash.flattendeep");

var TableViewProps = function TableViewProps() {
  TableView_classCallCheck(this, TableViewProps);

  TableView_defineProperty(this, "items", void 0);

  TableView_defineProperty(this, "itemId", void 0);

  TableView_defineProperty(this, "children", void 0);

  TableView_defineProperty(this, "dir", 'ltr');

  TableView_defineProperty(this, "className", void 0);

  TableView_defineProperty(this, "style", void 0);

  TableView_defineProperty(this, "rowHeight", 50);

  TableView_defineProperty(this, "emptyMessage", "No Items to Display");

  TableView_defineProperty(this, "overscanCount", 20);
};

var TableViewState = function TableViewState() {
  TableView_classCallCheck(this, TableViewState);

  TableView_defineProperty(this, "selectedItems", {});
};

var TableView_TableView =
/*#__PURE__*/
function (_React$PureComponent) {
  TableView_inherits(TableView, _React$PureComponent);

  //
  // nested types
  //
  //
  // component code
  //
  function TableView(props) {
    var _this;

    TableView_classCallCheck(this, TableView);

    _this = TableView_possibleConstructorReturn(this, TableView_getPrototypeOf(TableView).call(this, props));
    _this.state = new TableViewState();
    return _this;
  } //
  // render methods
  //


  TableView_createClass(TableView, [{
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
        style: Object.assign({}, this.props.style, this.getHeights())
      }, this.renderTableHead(head), this.renderTableBody(head, body))));
    }
  }, {
    key: "renderTableHead",
    value: function renderTableHead(head) {
      var _this2 = this;

      if (!head) return null;
      return external_react_["createElement"](StyledTableHead, {
        style: {
          height: head.props.height
        }
      }, external_react_["createElement"](StyledTableHeadRow, null, external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, external_react_["Children"].map(head.props.children, function (cell, index) {
        var headCell = cell;

        var cellProps = _this2.getHeadCellProps(headCell);

        if (cellProps.visible === false) return null;

        var cellContent = _this2.getHeadCellContent(headCell);

        return external_react_["createElement"](StyledTableHeadCell, _extends({
          key: index
        }, cellProps), external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, cellContent));
      }))));
    }
  }, {
    key: "renderTableBody",
    value: function renderTableBody(head, body) {
      var headProps = this.getHeadProps(head);
      var heightValues = this.getHeights();
      var bodyHeight = "calc(".concat(heightValues.height, " - ").concat(headProps.height, ")");
      var bodyMinHeight = "calc(".concat(heightValues.minHeight, " - ").concat(headProps.height, ")");
      var bodyMaxHeight = "calc(".concat(heightValues.maxHeight, " - ").concat(headProps.height, ")");
      return external_react_["createElement"](StyledTableBody, {
        style: {
          direction: this.props.dir,
          height: bodyHeight,
          minHeight: bodyMinHeight,
          maxHeight: bodyMaxHeight
        }
      }, external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, this.renderTableRows(body)));
    }
  }, {
    key: "renderTableRows",
    value: function renderTableRows(body) {
      var _this3 = this;

      // placeholder
      if (this.props.items.length === 0 || !this.hasBody(body)) {
        return this.renderItemsPlaceHolder();
      } // table rows


      return external_react_["createElement"](external_react_virtualized_auto_sizer_default.a, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return external_react_["createElement"](external_react_window_["FixedSizeList"], {
          style: {
            outline: 'none'
          },
          direction: _this3.props.dir,
          layout: "vertical",
          height: height,
          width: width,
          itemCount: _this3.props.items.length,
          itemSize: _this3.props.rowHeight
        }, function (_ref2) {
          var index = _ref2.index,
              style = _ref2.style;
          var rowRender = body.props.children;
          if (!rowRender) return null;
          var item = _this3.props.items[index];
          var row = rowRender(item, index);

          var _this3$getRowProps = _this3.getRowProps(row),
              rowStyle = _this3$getRowProps.style,
              rowProps = _objectWithoutProperties(_this3$getRowProps, ["style"]);

          var rowKey = _this3.getRowKey(rowProps, item, index);

          var rowContent = _this3.getRowContent(row);

          return external_react_["createElement"](StyledTableBodyRow, _extends({
            style: Object.assign({}, style, rowStyle || {}),
            key: rowKey
          }, rowProps), external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, asArray(rowContent).map(function (cell, columnIndex) {
            var cellProps = _this3.getCellProps(cell);

            if (cellProps.visible === false) return null;
            return external_react_["createElement"](StyledTableBodyCell, _extends({
              key: columnIndex
            }, cellProps), external_react_["createElement"](ErrorBoundary_ErrorBoundary, null, _this3.getCellContent(cell)));
          })));
        });
      });
    }
  }, {
    key: "renderItemsPlaceHolder",
    value: function renderItemsPlaceHolder() {
      return external_react_["createElement"]("div", null, external_react_["createElement"]("div", {
        style: {
          textAlign: 'center'
        }
      }, this.props.emptyMessage));
    }
  }, {
    key: "getTheme",
    value: function getTheme() {
      return {
        dir: this.props.dir
      };
    }
  }, {
    key: "getHeights",
    value: function getHeights() {
      var height = (this.props.style || {}).height;
      var minHeight = (this.props.style || {}).minHeight;
      var maxHeight = (this.props.style || {}).maxHeight;

      if (height === undefined && minHeight === undefined) {
        height = TableView.defaultHeight;
      }

      height = cssSizeString(height);
      minHeight = cssSizeString(minHeight);
      maxHeight = cssSizeString(maxHeight);
      return {
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight
      };
    } //
    // item methods
    //

  }, {
    key: "getItemId",
    value: function getItemId(item, index) {
      if (typeof this.props.itemId === 'function') {
        return this.props.itemId(item, index);
      } else {
        return item.id;
      }
    } //
    // components structure handling
    //  

  }, {
    key: "createHeadFromColumns",
    value: function createHeadFromColumns(columns) {
      var head = external_react_["createElement"](TableHead, null, columns.map(function (col) {
        return reactUtils_ReactUtils.singleChildOfType(col, ColumnHead).props.children;
      }));
      return head;
    }
  }, {
    key: "createBodyFromColumns",
    value: function createBodyFromColumns(columns) {
      var body = external_react_["createElement"](TableBody, null, function (item, itemIndex) {
        return columns.map(function (col, columnIndex) {
          var cellRender = reactUtils_ReactUtils.singleChildOfType(col, ColumnBody).props.children;
          if (!cellRender) return null;
          return cellRender(item, itemIndex, columnIndex);
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
        return new TableHeadProps();
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
    value: function getRowKey(rowProps, item, index) {
      if (!isNullOrUndefined(rowProps.key)) return rowProps.key;
      var itemId = this.getItemId(item, index);
      if (!isNullOrUndefined(itemId)) return itemId;
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
    }
  }]);

  return TableView;
}(external_react_["PureComponent"]);

TableView_defineProperty(TableView_TableView, "defaultHeight", '35vh');

TableView_defineProperty(TableView_TableView, "Head", TableHead);

TableView_defineProperty(TableView_TableView, "Body", TableBody);

TableView_defineProperty(TableView_TableView, "Row", TableRow);

TableView_defineProperty(TableView_TableView, "Cell", TableCell);

TableView_defineProperty(TableView_TableView, "Column", TableColumn);

TableView_defineProperty(TableView_TableView, "defaultProps", new TableViewProps());
// CONCATENATED MODULE: ./src/table/index.ts








// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport GridViewProps */__webpack_require__.d(__webpack_exports__, "GridViewProps", function() { return GridViewProps; });
/* concated harmony reexport GridView */__webpack_require__.d(__webpack_exports__, "GridView", function() { return GridView_GridView; });
/* concated harmony reexport ColumnBodyProps */__webpack_require__.d(__webpack_exports__, "ColumnBodyProps", function() { return ColumnBodyProps; });
/* concated harmony reexport ColumnBody */__webpack_require__.d(__webpack_exports__, "ColumnBody", function() { return ColumnBody; });
/* concated harmony reexport ColumnHeadProps */__webpack_require__.d(__webpack_exports__, "ColumnHeadProps", function() { return ColumnHeadProps; });
/* concated harmony reexport ColumnHead */__webpack_require__.d(__webpack_exports__, "ColumnHead", function() { return ColumnHead; });
/* concated harmony reexport TableBodyProps */__webpack_require__.d(__webpack_exports__, "TableBodyProps", function() { return TableBodyProps; });
/* concated harmony reexport TableBody */__webpack_require__.d(__webpack_exports__, "TableBody", function() { return TableBody; });
/* concated harmony reexport TableCell */__webpack_require__.d(__webpack_exports__, "TableCell", function() { return TableCell; });
/* concated harmony reexport TableColumnProps */__webpack_require__.d(__webpack_exports__, "TableColumnProps", function() { return TableColumnProps; });
/* concated harmony reexport TableColumn */__webpack_require__.d(__webpack_exports__, "TableColumn", function() { return TableColumn; });
/* concated harmony reexport TableHeadProps */__webpack_require__.d(__webpack_exports__, "TableHeadProps", function() { return TableHeadProps; });
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