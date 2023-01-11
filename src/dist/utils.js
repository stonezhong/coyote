"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderElementAndUpdateDom = renderElementAndUpdateDom;
exports.renderRootDomElement = renderRootDomElement;
var _lodash = _interopRequireDefault(require("lodash"));
var _debug = require("./debug");
var _components = require("./components");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function collectKeyedChildren(element, keyedChildren) {
  if (_lodash["default"].isNull(element)) {
    return;
  }
  element.props.children.forEach(function (childElement) {
    if (!(childElement instanceof _components.Component)) {
      return;
    }
    var key = childElement.props.key;
    if (!_lodash["default"].isUndefined(key)) {
      keyedChildren[key] = childElement;
    }
    collectKeyedChildren(childElement, keyedChildren);
    return;
  });
}

// try best to reuse prevElement, return the element that should be used
function mergeElement(newElement, prevElement, prevKeyedChildren) {
  // a element has been rendered to newElement
  // the element was previously rendered to prevElement

  // cannot merge if one of them are not element
  if (!(newElement instanceof _components.Component) || !(prevElement instanceof _components.Component)) {
    return newElement;
  }

  // cannot merge if they are component, but not the same component class
  if (newElement.constructor !== prevElement.constructor) {
    return newElement;
  }
  var newChildren = [];
  var i = 0,
    j = 0;
  while (i < newElement.props.children.length) {
    var newChild = newElement.props.children[i];
    i++;
    if (!(newChild instanceof _components.Component)) {
      // non-Component child do not need merge
      newChildren.push(newChild);
      j++;
      continue;
    }
    var childKey = newChild.props.key;
    if (_lodash["default"].isUndefined(childKey)) {
      // non-keyed-component
      while (j < prevElement.props.children.length && prevElement.props.children[j] instanceof _components.Component && !_lodash["default"].isUndefined(prevElement.props.children[j].props.key)) {
        // skip all keyed component children since we are not keyed
        j++;
      }
      var prevChild = j < prevElement.props.children.length ? prevElement.props.children[j] : null;
      newChildren.push(mergeElement(newChild, prevChild, prevKeyedChildren));
      j++;
    } else {
      var _prevChild = childKey in prevKeyedChildren ? prevKeyedChildren[childKey] : null;
      newChildren.push(mergeElement(newChild, _prevChild, prevKeyedChildren));
    }
  }
  if (prevElement.__cyoIsPrimitive) {
    // primitive element is never stateful, so no need to merge
    newElement.props.children = newChildren;
    return newElement;
  }
  prevElement.props = _objectSpread(_objectSpread({}, newElement.props), {}, {
    children: newChildren
  });
  // TODO: define a lifecycle method so we can notify component about this property change
  return prevElement;
}

// we will get a new root points to the pure primitive element tree
function renderElementRecursive(element) {
  var currentElement = element;
  while (!currentElement.__cyoIsPrimitive) {
    var prevKeyedChildren = {};
    collectKeyedChildren(currentElement.__cyoRenderedTo, prevKeyedChildren);
    var nextElement = mergeElement(currentElement.__cyoWrapRender(), currentElement.__cyoRenderedTo, prevKeyedChildren);
    nextElement.__cyoRenderedBy = currentElement;
    currentElement.__cyoRenderedTo = nextElement;
    currentElement = nextElement;
  }
  currentElement.props.children.forEach(renderElementRecursive);
}
function extractVDOMTree(element) {
  // given a rendered element, get the v-dom tree
  var currentElement = element;
  while (!currentElement.__cyoIsPrimitive) {
    currentElement = currentElement.__cyoRenderedTo;
  }
  var vDomElement = {
    element: currentElement
  };
  vDomElement.children = currentElement.props.children.map(extractVDOMTree);
  return vDomElement;
}
function createDomElementRecursive(vDomElement) {
  var domElement = vDomElement.element.__cyoCreateDomElement();
  vDomElement.element.__cyoDomElement = domElement;
  var _iterator = _createForOfIteratorHelper(vDomElement.children),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var childVDomElement = _step.value;
      domElement.appendChild(createDomElementRecursive(childVDomElement));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return domElement;
}
function applyDiff(prevVDomElement, nextVDomElement, parentDomElement, domElement) {
  var debugPrefix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var debugApplyDiff = _debug.debug_options['applyDiff'];
  if (debugApplyDiff) {
    console.log("".concat(debugPrefix, "[applyDiff]: enter, actual VDOM=").concat(prevVDomElement.element, ", expect VDOM=").concat(nextVDomElement.element, ", parentDom=").concat(parentDomElement ? parentDomElement.nodeName : 'null', ", dom=").concat(domElement ? domElement.nodeName : 'null'));
  }
  if (_lodash["default"].isNull(domElement)) {
    parentDomElement.appendChild(createDomElementRecursive(nextVDomElement));
    if (debugApplyDiff) {
      console.log("".concat(debugPrefix, "[applyDiff]: exit"));
    }
    return;
  }
  if (prevVDomElement.element.__cyoGetTagName() === nextVDomElement.element.__cyoGetTagName()) {
    if (debugApplyDiff) {
      console.log("".concat(debugPrefix, "[applyDiff]: reuse, tag is ").concat(prevPurePrimitiveElement.__cyoGetTagName()));
    }
    // we will reuse the physical DOM
    nextVDomElement.element.__cyoUpdateDomElement(prevVDomElement.element, domElement);
    nextVDomElement.element.__cyoDomElement = domElement;
    var commonChildrenLen = Math.min(prevVDomElement.children.length, nextVDomElement.children.length);
    if (debugApplyDiff) {
      console.log("".concat(debugPrefix, "[applyDiff]: actual VDOM has ").concat(prevPurePrimitiveElement.children.length, " children, expect VDOM has ").concat(nextPurePrimitiveElement.children.length, " children"));
    }
    var _iterator2 = _createForOfIteratorHelper(_lodash["default"].range(commonChildrenLen)),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _i2 = _step2.value;
        applyDiff(prevVDomElement.children[_i2], nextVDomElement.children[_i2], domElement, prevVDomElement.children[_i2].element.__cyoDomElement, debugPrefix + '    ');
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    for (var i = commonChildrenLen; i < nextVDomElement.children.length; i++) {
      var childVDomElement = nextVDomElement.children[i];
      applyDiff(null, childVDomElement, domElement, null, debugPrefix + '    ');
    }
    for (var _i = commonChildrenLen; _i < prevVDomElement.children.length; _i++) {
      (0, _debug.DEBUG_DOM_REMOVE)(domElement, domElement.lastChild);
      domElement.removeChild(domElement.lastChild);
    }
  } else {
    if (debugApplyDiff) {
      console.log("".concat(debugPrefix, "[applyDiff]: cannot reuse, expect tag: ").concat(nextPurePrimitiveElement.getTagName(), ", actual tag: ").concat(prevPurePrimitiveElement.getTagName()));
    }
    // cannot reuse the DOM
    var newDomElement = nextVDomElement.element.__cyoCreateDomElement();
    nextVDomElement.element.__cyoDomElement = newDomElement;
    var _iterator3 = _createForOfIteratorHelper(nextVDomElement.children),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _childVDomElement = _step3.value;
        applyDiff(null, _childVDomElement, newDomElement, null, debugPrefix + '    ');
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    (0, _debug.DEBUG_DOM_REPLACE)(domElement.parentNode, domElement, newDomElement);
    domElement.parentNode.replaceChild(newDomElement, domElement);
  }
  if (debugApplyDiff) {
    console.log("".concat(debugPrefix, "[applyDiff]: exit"));
  }
}
function renderRootDomElement(parentDomElement, element) {
  renderElementRecursive(element);
  var vDomElement = extractVDOMTree(element);
  parentDomElement.insertBefore(createDomElementRecursive(vDomElement), parentDomElement.firstChild);
}

// an element has change, we need to re-render, and apply the DOM
// with the new rendered result
function renderElementAndUpdateDom(element) {
  var debugRenderElement = _debug.debug_options['render-element'];
  if (debugRenderElement) {
    console.log("[renderElementAndUpdateDom]: enter, element=".concat(element));
  }

  // find the VDOM root for the component to be updated
  var prevVDomElement = extractVDOMTree(element);
  // perform the update
  renderElementRecursive(element);
  // get the new VDOM tree
  var nextVDomElement = extractVDOMTree(element);
  // update physical DOM
  applyDiff(prevVDomElement, nextVDomElement, null, prevVDomElement.__cyoDomElement);
  if (debugRenderElement) {
    console.log("[renderElementAndUpdateDom]: exit");
  }
}
