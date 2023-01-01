"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentFactory = exports.Component = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _immer = _interopRequireDefault(require("immer"));
var _utils = require("./utils");
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
var Component = /*#__PURE__*/function () {
  // true for primitive element

  // other component that renders this component

  function Component(props, children) {
    _classCallCheck(this, Component);
    _defineProperty(this, "state", {});
    _defineProperty(this, "parent", null);
    _defineProperty(this, "isPrimitive", false);
    _defineProperty(this, "_domElement", null);
    _defineProperty(this, "renderedBy", null);
    this.props = props;
    this.children = children;
  }
  _createClass(Component, [{
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "setState",
    value: function setState(changer) {
      this.state = (0, _immer["default"])(this.state, changer);
      (0, _utils.updateDomElementForElement)(this);
    }
  }]);
  return Component;
}();
exports.Component = Component;
var NullComponent = /*#__PURE__*/function (_Component) {
  _inherits(NullComponent, _Component);
  var _super = _createSuper(NullComponent);
  function NullComponent(text) {
    var _this;
    _classCallCheck(this, NullComponent);
    _this = _super.call(this, {}, []);
    _this.isPrimitive = true;
    return _this;
  }
  _createClass(NullComponent, [{
    key: "_createDomElement",
    value: function _createDomElement() {
      return document.createComment("for null component");
    }
  }, {
    key: "_updateDomElement",
    value: function _updateDomElement(domElement) {}
  }, {
    key: "_canReuse",
    value: function _canReuse(domElement) {
      return domElement.nodeName === "#comment";
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
    _this2._text = text;
    _this2.isPrimitive = true;
    return _this2;
  }
  _createClass(TextComponent, [{
    key: "_createDomElement",
    value: function _createDomElement() {
      return document.createTextNode(this._text);
    }
  }, {
    key: "_updateDomElement",
    value: function _updateDomElement(domElement) {
      if (domElement.nodeValue !== this._text) {
        domElement.nodeValue = this._text;
      }
    }
  }, {
    key: "_canReuse",
    value: function _canReuse(domElement) {
      return domElement.nodeName === "#text";
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
      key: "_canReuse",
      value: function _canReuse(domElement) {
        return domElement.nodeName.toLowerCase() === tag;
      }
    }, {
      key: "_createDomElement",
      value: function _createDomElement() {
        var ele = document.createElement(tag);
        for (var key in this.props) {
          var value = this.props[key];
          if (eventHandlerProps.has(key)) {
            ele[key] = value;
          } else {
            ele.setAttribute(key, value);
          }
        }
        return ele;
      }
    }, {
      key: "_updateDomElement",
      value: function _updateDomElement(domElement) {
        var attrNames = domElement.getAttributeNames();
        // remove unwanted attributes from DOM
        var _iterator2 = _createForOfIteratorHelper(attrNames),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _attrName = _step2.value;
            if (!(_attrName in this.props)) {
              if (eventHandlerProps.has(_attrName)) {
                domElement[_attrName] = null;
              } else {
                domElement.removeAttribute(_attrName);
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        for (var attrName in this.props) {
          var attrValue = this.props[attrName];
          if (eventHandlerProps.has(attrName)) {
            domElement[attrName] = attrValue;
          } else {
            if (domElement.getAttribute(attrName) !== attrValue) {
              domElement.setAttribute(attrName, attrValue);
            }
          }
        }
      }
    }, {
      key: "render",
      value: function render() {}
    }]);
    return PrimitiveComponent;
  }(Component);
  return PrimitiveComponent;
}
var componentFactory = function componentFactory(type) {
  return function () {
    for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
      children[_key] = arguments[_key];
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

// https://www.tutorialrepublic.com/html-reference/html5-tags.php
exports.componentFactory = componentFactory;
["a", "abbr",
// "acronym",
"address",
// "applet",
"area", "article", "aside", "audio", "b", "base",
// "basefont",
"bdi", "bdo",
// "big",
"blockquote", "body", "br", "button", "canvas", "caption",
// "center",
"cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog",
// "dir",
"div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure",
// "font",
"footer", "form",
// "frame",
// "frameset",
"head", "header", "hgroup", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav",
// "noframes",
"noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span",
// "strike",
"strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track",
// "tt",
"u", "ul", "var", "video", "wbr"].forEach(function (tagName) {
  window[tagName] = componentFactory(_primitiveComponent(tagName));
});
