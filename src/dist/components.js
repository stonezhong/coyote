"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TBODY = exports.TABLE = exports.SVG = exports.SUP = exports.SUMMARY = exports.SUB = exports.STYLE = exports.STRONG = exports.SPAN = exports.SOURCE = exports.SMALL = exports.SELECT = exports.SECTION = exports.SCRIPT = exports.SAMP = exports.S = exports.RUBY = exports.RT = exports.RP = exports.Q = exports.PROGRESS = exports.PRE = exports.PICTURE = exports.PARAM = exports.P = exports.OUTPUT = exports.OPTION = exports.OPTGROUP = exports.OL = exports.OBJECT = exports.NOSCRIPT = exports.NAV = exports.METER = exports.META = exports.MENUITEM = exports.MENU = exports.MARK = exports.MAP = exports.MAIN = exports.LINK = exports.LI = exports.LEGEND = exports.LABEL = exports.KEYGEN = exports.KBD = exports.INS = exports.INPUT = exports.IMG = exports.IFRAME = exports.I = exports.HTML = exports.HR = exports.HGROUP = exports.HEADER = exports.HEAD = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.FORM = exports.FOOTER = exports.FIGURE = exports.FIGCAPTION = exports.FIELDSET = exports.EMBED = exports.EM = exports.DT = exports.DL = exports.DIV = exports.DIALOG = exports.DFN = exports.DETAILS = exports.DEL = exports.DD = exports.DATALIST = exports.DATA = exports.Component = exports.COLGROUP = exports.COL = exports.CODE = exports.CITE = exports.CAPTION = exports.CANVAS = exports.BUTTON = exports.BR = exports.BODY = exports.BLOCKQUOTE = exports.BDO = exports.BDI = exports.BASE = exports.B = exports.AUDIO = exports.ASIDE = exports.ARTICLE = exports.AREA = exports.ADDRESS = exports.ABBR = exports.A = void 0;
exports.componentFactory = exports.WBR = exports.VIDEO = exports.VAR = exports.UL = exports.U = exports.TRACK = exports.TR = exports.TITLE = exports.TIME = exports.THEAD = exports.TH = exports.TFOOT = exports.TEXTAREA = exports.TEMPLATE = exports.TD = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _immer = _interopRequireDefault(require("immer"));
var _utils = require("./utils");
var _debug = require("./debug");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var eventHandlerProps = new Set(['onclick']);

/***********************************************************************************************
 * element                          an instance of component
 * primitive element                an element whose isPrimitive is true. They can only come from 
 *                                  NullComponent, TextComponent or PrimitiveComponent
 *                                  We also consider primitive element to be "virtual DOM"
 * _domElement                      only primitive element has _domElement, they point to the DOM 
 *                                  element a primitive element referes to
 * 
 *              
 * 
 */
var Component = /*#__PURE__*/function () {
  // points to the parent element

  // true for primitive element
  // other element that produce this element via render()
  // the element this element renders to via render()

  function Component(props, children) {
    _classCallCheck(this, Component);
    _defineProperty(this, "state", {});
    _defineProperty(this, "parent", null);
    _defineProperty(this, "isPrimitive", false);
    _defineProperty(this, "renderedBy", null);
    _defineProperty(this, "renderedTo", null);
    this.props = props; // always a raw object, e.g. {x: 1, y: 2}
    this.children = children; // an array
  }
  _createClass(Component, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.constructor.name);
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "setState",
    value: function setState(changer) {
      this.state = (0, _immer["default"])(this.state, changer);
      (0, _utils.renderElementAndUpdateDom)(this);
    }
  }]);
  return Component;
}();
exports.Component = Component;
var NullComponent = /*#__PURE__*/function (_Component) {
  _inherits(NullComponent, _Component);
  var _super = _createSuper(NullComponent);
  // this is usually act as placeholder for null or false for 

  function NullComponent(text) {
    var _this;
    _classCallCheck(this, NullComponent);
    _this = _super.call(this, {}, []);
    _defineProperty(_assertThisInitialized(_this), "_domElement", null);
    _this.isPrimitive = true;
    return _this;
  }
  _createClass(NullComponent, [{
    key: "toString",
    value: function toString() {
      return "Null";
    }
  }, {
    key: "_createDomElement",
    value: function _createDomElement() {
      (0, _debug.DEBUG_CREATE_NULL_NODE)();
      return document.createComment("for null component");
    }
  }, {
    key: "_updateDomElement",
    value: function _updateDomElement(cachedElement, domElement) {}
  }, {
    key: "getTagName",
    value: function getTagName() {
      return "#comment";
    }
  }]);
  return NullComponent;
}(Component);
;
var TextComponent = /*#__PURE__*/function (_Component2) {
  _inherits(TextComponent, _Component2);
  var _super2 = _createSuper(TextComponent);
  function TextComponent(text) {
    var _this2;
    _classCallCheck(this, TextComponent);
    _this2 = _super2.call(this, {}, []);
    _defineProperty(_assertThisInitialized(_this2), "_domElement", null);
    _this2._text = text;
    _this2.isPrimitive = true;
    return _this2;
  }
  _createClass(TextComponent, [{
    key: "toString",
    value: function toString() {
      return "Text(".concat(this._text, ")");
    }
  }, {
    key: "_createDomElement",
    value: function _createDomElement() {
      (0, _debug.DEBUG_CREATE_TEXT_NODE)(this._text);
      return document.createTextNode(this._text);
    }
  }, {
    key: "_updateDomElement",
    value: function _updateDomElement(cachedElement, domElement) {
      if (this._text !== cachedElement._text) {
        (0, _debug.DEBUG_UPDATE_TEXT_NODE)(this._text);
        domElement.nodeValue = this._text;
      }
    }
  }, {
    key: "getTagName",
    value: function getTagName() {
      return "#text";
    }
  }]);
  return TextComponent;
}(Component);
;
function _primitiveComponent(tag) {
  var PrimitiveComponent = /*#__PURE__*/function (_Component3) {
    _inherits(PrimitiveComponent, _Component3);
    var _super3 = _createSuper(PrimitiveComponent);
    function PrimitiveComponent(props, children) {
      var _this3;
      _classCallCheck(this, PrimitiveComponent);
      _this3 = _super3.call(this, props, children.map(function (child) {
        if (child instanceof Component) {
          return child;
        }
        if (_lodash["default"].isString(child)) {
          var ret = new TextComponent(child);
          return ret;
        }
        if (!child) {
          var _ret = new NullComponent();
          return _ret;
        }
        throw new Error("Invalid child: ".concat(child));
      }));
      _defineProperty(_assertThisInitialized(_this3), "_domElement", null);
      var _iterator = _createForOfIteratorHelper(_this3.children),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          child.parent = _assertThisInitialized(_this3);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      _this3.isPrimitive = true;
      return _this3;
    }
    _createClass(PrimitiveComponent, [{
      key: "toString",
      value: function toString() {
        return tag;
      }
    }, {
      key: "getTagName",
      value: function getTagName() {
        return tag;
      }
    }, {
      key: "_set_dom_attr",
      value: function _set_dom_attr(domElement, attrName, attrValue) {
        (0, _debug.DEBUG_DOM_ATTR_SET)(domElement, attrName, attrValue);
        if (eventHandlerProps.has(attrName)) {
          domElement[attrName] = attrValue;
        } else {
          domElement.setAttribute(attrName, attrValue);
        }
      }
    }, {
      key: "_remove_dom_attr",
      value: function _remove_dom_attr(domElement, attrName) {
        (0, _debug.DEBUG_DOM_ATTR_REMOVE)(domElement, attrName);
        if (eventHandlerProps.has(attrName)) {
          domElement[attrName] = null;
        } else {
          domElement.removeAttribute(attrName);
        }
      }
    }, {
      key: "_createDomElement",
      value: function _createDomElement() {
        (0, _debug.DEBUG_DOM_CREATE)(tag);
        var domElement = document.createElement(tag);
        for (var key in this.props) {
          this._set_dom_attr(domElement, key, this.props[key]);
        }
        return domElement;
      }
    }, {
      key: "_updateDomElement",
      value: function _updateDomElement(cachedElement, domElement) {
        var prevPropKeys = new Set(Object.keys(cachedElement.props));
        var propKeys = new Set(Object.keys(this.props));
        for (var _i = 0, _Object$keys = Object.keys(cachedElement.props); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          if (!propKeys.has(key)) {
            this._remove_dom_attr(domElement, key);
          }
        }
        for (var _i2 = 0, _Object$keys2 = Object.keys(this.props); _i2 < _Object$keys2.length; _i2++) {
          var _key = _Object$keys2[_i2];
          var value = this.props[_key];
          if (prevPropKeys.has(_key)) {
            if (cachedElement.props[_key] !== value) {
              this._set_dom_attr(domElement, _key, value);
            }
          } else {
            this._set_dom_attr(domElement, _key, value);
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        throw new Error("render should never be called on primitive element!");
      }
    }]);
    return PrimitiveComponent;
  }(Component);
  return PrimitiveComponent;
}
var componentFactory = function componentFactory(type) {
  return function () {
    for (var _len = arguments.length, children = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      children[_key2] = arguments[_key2];
    }
    if (children.length == 0) {
      return new type({}, []);
    }
    var first = children[0];
    if (!_lodash["default"].isNull(first) && first.constructor == Object) {
      return new type(first, children.slice(1));
    }
    return new type({}, children);
  };
};

// generated code
exports.componentFactory = componentFactory;
var A = componentFactory(_primitiveComponent('a'));
exports.A = A;
var ABBR = componentFactory(_primitiveComponent('abbr'));
exports.ABBR = ABBR;
var ADDRESS = componentFactory(_primitiveComponent('address'));
exports.ADDRESS = ADDRESS;
var AREA = componentFactory(_primitiveComponent('area'));
exports.AREA = AREA;
var ARTICLE = componentFactory(_primitiveComponent('article'));
exports.ARTICLE = ARTICLE;
var ASIDE = componentFactory(_primitiveComponent('aside'));
exports.ASIDE = ASIDE;
var AUDIO = componentFactory(_primitiveComponent('audio'));
exports.AUDIO = AUDIO;
var B = componentFactory(_primitiveComponent('b'));
exports.B = B;
var BASE = componentFactory(_primitiveComponent('base'));
exports.BASE = BASE;
var BDI = componentFactory(_primitiveComponent('bdi'));
exports.BDI = BDI;
var BDO = componentFactory(_primitiveComponent('bdo'));
exports.BDO = BDO;
var BLOCKQUOTE = componentFactory(_primitiveComponent('blockquote'));
exports.BLOCKQUOTE = BLOCKQUOTE;
var BODY = componentFactory(_primitiveComponent('body'));
exports.BODY = BODY;
var BR = componentFactory(_primitiveComponent('br'));
exports.BR = BR;
var BUTTON = componentFactory(_primitiveComponent('button'));
exports.BUTTON = BUTTON;
var CANVAS = componentFactory(_primitiveComponent('canvas'));
exports.CANVAS = CANVAS;
var CAPTION = componentFactory(_primitiveComponent('caption'));
exports.CAPTION = CAPTION;
var CITE = componentFactory(_primitiveComponent('cite'));
exports.CITE = CITE;
var CODE = componentFactory(_primitiveComponent('code'));
exports.CODE = CODE;
var COL = componentFactory(_primitiveComponent('col'));
exports.COL = COL;
var COLGROUP = componentFactory(_primitiveComponent('colgroup'));
exports.COLGROUP = COLGROUP;
var DATA = componentFactory(_primitiveComponent('data'));
exports.DATA = DATA;
var DATALIST = componentFactory(_primitiveComponent('datalist'));
exports.DATALIST = DATALIST;
var DD = componentFactory(_primitiveComponent('dd'));
exports.DD = DD;
var DEL = componentFactory(_primitiveComponent('del'));
exports.DEL = DEL;
var DETAILS = componentFactory(_primitiveComponent('details'));
exports.DETAILS = DETAILS;
var DFN = componentFactory(_primitiveComponent('dfn'));
exports.DFN = DFN;
var DIALOG = componentFactory(_primitiveComponent('dialog'));
exports.DIALOG = DIALOG;
var DIV = componentFactory(_primitiveComponent('div'));
exports.DIV = DIV;
var DL = componentFactory(_primitiveComponent('dl'));
exports.DL = DL;
var DT = componentFactory(_primitiveComponent('dt'));
exports.DT = DT;
var EM = componentFactory(_primitiveComponent('em'));
exports.EM = EM;
var EMBED = componentFactory(_primitiveComponent('embed'));
exports.EMBED = EMBED;
var FIELDSET = componentFactory(_primitiveComponent('fieldset'));
exports.FIELDSET = FIELDSET;
var FIGCAPTION = componentFactory(_primitiveComponent('figcaption'));
exports.FIGCAPTION = FIGCAPTION;
var FIGURE = componentFactory(_primitiveComponent('figure'));
exports.FIGURE = FIGURE;
var FOOTER = componentFactory(_primitiveComponent('footer'));
exports.FOOTER = FOOTER;
var FORM = componentFactory(_primitiveComponent('form'));
exports.FORM = FORM;
var HEAD = componentFactory(_primitiveComponent('head'));
exports.HEAD = HEAD;
var HEADER = componentFactory(_primitiveComponent('header'));
exports.HEADER = HEADER;
var HGROUP = componentFactory(_primitiveComponent('hgroup'));
exports.HGROUP = HGROUP;
var H1 = componentFactory(_primitiveComponent('h1'));
exports.H1 = H1;
var H2 = componentFactory(_primitiveComponent('h2'));
exports.H2 = H2;
var H3 = componentFactory(_primitiveComponent('h3'));
exports.H3 = H3;
var H4 = componentFactory(_primitiveComponent('h4'));
exports.H4 = H4;
var H5 = componentFactory(_primitiveComponent('h5'));
exports.H5 = H5;
var H6 = componentFactory(_primitiveComponent('h6'));
exports.H6 = H6;
var HR = componentFactory(_primitiveComponent('hr'));
exports.HR = HR;
var HTML = componentFactory(_primitiveComponent('html'));
exports.HTML = HTML;
var I = componentFactory(_primitiveComponent('i'));
exports.I = I;
var IFRAME = componentFactory(_primitiveComponent('iframe'));
exports.IFRAME = IFRAME;
var IMG = componentFactory(_primitiveComponent('img'));
exports.IMG = IMG;
var INPUT = componentFactory(_primitiveComponent('input'));
exports.INPUT = INPUT;
var INS = componentFactory(_primitiveComponent('ins'));
exports.INS = INS;
var KBD = componentFactory(_primitiveComponent('kbd'));
exports.KBD = KBD;
var KEYGEN = componentFactory(_primitiveComponent('keygen'));
exports.KEYGEN = KEYGEN;
var LABEL = componentFactory(_primitiveComponent('label'));
exports.LABEL = LABEL;
var LEGEND = componentFactory(_primitiveComponent('legend'));
exports.LEGEND = LEGEND;
var LI = componentFactory(_primitiveComponent('li'));
exports.LI = LI;
var LINK = componentFactory(_primitiveComponent('link'));
exports.LINK = LINK;
var MAIN = componentFactory(_primitiveComponent('main'));
exports.MAIN = MAIN;
var MAP = componentFactory(_primitiveComponent('map'));
exports.MAP = MAP;
var MARK = componentFactory(_primitiveComponent('mark'));
exports.MARK = MARK;
var MENU = componentFactory(_primitiveComponent('menu'));
exports.MENU = MENU;
var MENUITEM = componentFactory(_primitiveComponent('menuitem'));
exports.MENUITEM = MENUITEM;
var META = componentFactory(_primitiveComponent('meta'));
exports.META = META;
var METER = componentFactory(_primitiveComponent('meter'));
exports.METER = METER;
var NAV = componentFactory(_primitiveComponent('nav'));
exports.NAV = NAV;
var NOSCRIPT = componentFactory(_primitiveComponent('noscript'));
exports.NOSCRIPT = NOSCRIPT;
var OBJECT = componentFactory(_primitiveComponent('object'));
exports.OBJECT = OBJECT;
var OL = componentFactory(_primitiveComponent('ol'));
exports.OL = OL;
var OPTGROUP = componentFactory(_primitiveComponent('optgroup'));
exports.OPTGROUP = OPTGROUP;
var OPTION = componentFactory(_primitiveComponent('option'));
exports.OPTION = OPTION;
var OUTPUT = componentFactory(_primitiveComponent('output'));
exports.OUTPUT = OUTPUT;
var P = componentFactory(_primitiveComponent('p'));
exports.P = P;
var PARAM = componentFactory(_primitiveComponent('param'));
exports.PARAM = PARAM;
var PICTURE = componentFactory(_primitiveComponent('picture'));
exports.PICTURE = PICTURE;
var PRE = componentFactory(_primitiveComponent('pre'));
exports.PRE = PRE;
var PROGRESS = componentFactory(_primitiveComponent('progress'));
exports.PROGRESS = PROGRESS;
var Q = componentFactory(_primitiveComponent('q'));
exports.Q = Q;
var RP = componentFactory(_primitiveComponent('rp'));
exports.RP = RP;
var RT = componentFactory(_primitiveComponent('rt'));
exports.RT = RT;
var RUBY = componentFactory(_primitiveComponent('ruby'));
exports.RUBY = RUBY;
var S = componentFactory(_primitiveComponent('s'));
exports.S = S;
var SAMP = componentFactory(_primitiveComponent('samp'));
exports.SAMP = SAMP;
var SCRIPT = componentFactory(_primitiveComponent('script'));
exports.SCRIPT = SCRIPT;
var SECTION = componentFactory(_primitiveComponent('section'));
exports.SECTION = SECTION;
var SELECT = componentFactory(_primitiveComponent('select'));
exports.SELECT = SELECT;
var SMALL = componentFactory(_primitiveComponent('small'));
exports.SMALL = SMALL;
var SOURCE = componentFactory(_primitiveComponent('source'));
exports.SOURCE = SOURCE;
var SPAN = componentFactory(_primitiveComponent('span'));
exports.SPAN = SPAN;
var STRONG = componentFactory(_primitiveComponent('strong'));
exports.STRONG = STRONG;
var STYLE = componentFactory(_primitiveComponent('style'));
exports.STYLE = STYLE;
var SUB = componentFactory(_primitiveComponent('sub'));
exports.SUB = SUB;
var SUMMARY = componentFactory(_primitiveComponent('summary'));
exports.SUMMARY = SUMMARY;
var SUP = componentFactory(_primitiveComponent('sup'));
exports.SUP = SUP;
var SVG = componentFactory(_primitiveComponent('svg'));
exports.SVG = SVG;
var TABLE = componentFactory(_primitiveComponent('table'));
exports.TABLE = TABLE;
var TBODY = componentFactory(_primitiveComponent('tbody'));
exports.TBODY = TBODY;
var TD = componentFactory(_primitiveComponent('td'));
exports.TD = TD;
var TEMPLATE = componentFactory(_primitiveComponent('template'));
exports.TEMPLATE = TEMPLATE;
var TEXTAREA = componentFactory(_primitiveComponent('textarea'));
exports.TEXTAREA = TEXTAREA;
var TFOOT = componentFactory(_primitiveComponent('tfoot'));
exports.TFOOT = TFOOT;
var TH = componentFactory(_primitiveComponent('th'));
exports.TH = TH;
var THEAD = componentFactory(_primitiveComponent('thead'));
exports.THEAD = THEAD;
var TIME = componentFactory(_primitiveComponent('time'));
exports.TIME = TIME;
var TITLE = componentFactory(_primitiveComponent('title'));
exports.TITLE = TITLE;
var TR = componentFactory(_primitiveComponent('tr'));
exports.TR = TR;
var TRACK = componentFactory(_primitiveComponent('track'));
exports.TRACK = TRACK;
var U = componentFactory(_primitiveComponent('u'));
exports.U = U;
var UL = componentFactory(_primitiveComponent('ul'));
exports.UL = UL;
var VAR = componentFactory(_primitiveComponent('var'));
exports.VAR = VAR;
var VIDEO = componentFactory(_primitiveComponent('video'));
exports.VIDEO = VIDEO;
var WBR = componentFactory(_primitiveComponent('wbr'));
exports.WBR = WBR;
