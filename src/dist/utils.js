"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderElementAndUpdateDom = renderElementAndUpdateDom;
exports.renderRootDomElement = renderRootDomElement;
var _lodash = _interopRequireDefault(require("lodash"));
var _debug = require("./debug");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// pure primite element tree are considered DOM equivalent
// return the before and after pure primite element tree so we know the diff
function renderElement(element) {
  var currentElement = element;

  // get the pureElement before the change
  while (!currentElement.isPrimitive) {
    currentElement = currentElement.renderedTo;
  }
  var prevVDomRoot = currentElement;
  var nextVDOMRoot = renderElementRecursive(element);
  return [prevVDomRoot, nextVDOMRoot];
}

// we will get a new root points to the pure primitive element tree
function renderElementRecursive(element) {
  var currentElement = element;
  while (!currentElement.isPrimitive) {
    var nextElement = currentElement.render();
    nextElement.parent = currentElement.parent;
    nextElement.renderedBy = currentElement;
    currentElement.renderedTo = nextElement;
    currentElement = nextElement;
  }
  currentElement.children = currentElement.children.map(renderElementRecursive);
  return currentElement;
}
function createDomElementRecursive(purePrimitiveElement) {
  var domElement = purePrimitiveElement._createDomElement();
  purePrimitiveElement._domElement = domElement;
  var _iterator = _createForOfIteratorHelper(purePrimitiveElement.children),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var childElement = _step.value;
      domElement.appendChild(createDomElementRecursive(childElement));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return domElement;
}
function applyDiff(prevPurePrimitiveElement, nextPurePrimitiveElement, parentDomElement, domElement) {
  var debugPrefix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var debugApplyDiff = _debug.debug_options['applyDiff'];
  if (debugApplyDiff) {
    console.log("".concat(debugPrefix, "[applyDiff]: enter, actual VDOM=").concat(prevPurePrimitiveElement, ", expect VDOM=").concat(nextPurePrimitiveElement, ", parentDom=").concat(parentDomElement ? parentDomElement.nodeName : 'null', ", dom=").concat(domElement ? domElement.nodeName : 'null'));
  }
  if (_lodash["default"].isNull(domElement)) {
    parentDomElement.appendChild(createDomElementRecursive(nextPurePrimitiveElement));
    if (debugApplyDiff) {
      console.log("".concat(debugPrefix, "[applyDiff]: exit"));
    }
    return;
  }
  if (prevPurePrimitiveElement.getTagName() === nextPurePrimitiveElement.getTagName()) {
    if (debugApplyDiff) {
      console.log("".concat(debugPrefix, "[applyDiff]: reuse, tag is ").concat(prevPurePrimitiveElement.getTagName()));
    }
    // we will reuse the DOM
    nextPurePrimitiveElement._updateDomElement(prevPurePrimitiveElement, domElement);
    nextPurePrimitiveElement._domElement = domElement;
    var commonChildrenLen = Math.min(prevPurePrimitiveElement.children.length, nextPurePrimitiveElement.children.length);
    if (debugApplyDiff) {
      console.log("".concat(debugPrefix, "[applyDiff]: actual VDOM has ").concat(prevPurePrimitiveElement.children.length, " children, expect VDOM has ").concat(nextPurePrimitiveElement.children.length, " children"));
    }
    var _iterator2 = _createForOfIteratorHelper(_lodash["default"].range(commonChildrenLen)),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _i2 = _step2.value;
        applyDiff(prevPurePrimitiveElement.children[_i2], nextPurePrimitiveElement.children[_i2], domElement, prevPurePrimitiveElement.children[_i2]._domElement, debugPrefix + '    ');
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    for (var i = commonChildrenLen; i < nextPurePrimitiveElement.children.length; i++) {
      var childElement = nextPurePrimitiveElement.children[i];
      applyDiff(null, childElement, domElement, null, debugPrefix + '    ');
    }
    for (var _i = commonChildrenLen; _i < prevPurePrimitiveElement.children.length; _i++) {
      (0, _debug.DEBUG_DOM_REMOVE)(domElement, domElement.lastChild);
      domElement.removeChild(domElement.lastChild);
    }
  } else {
    if (debugApplyDiff) {
      console.log("".concat(debugPrefix, "[applyDiff]: cannot reuse, expect tag: ").concat(nextPurePrimitiveElement.getTagName(), ", actual tag: ").concat(prevPurePrimitiveElement.getTagName()));
    }
    // cannot reuse the DOM
    var newDomElement = nextPurePrimitiveElement._createDomElement();
    nextPurePrimitiveElement._domElement = newDomElement;
    var _iterator3 = _createForOfIteratorHelper(nextPurePrimitiveElement.children),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _childElement = _step3.value;
        applyDiff(null, _childElement, newDomElement, null, debugPrefix + '    ');
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
  var purePrimitiveElementRoot = renderElementRecursive(element);
  parentDomElement.insertBefore(createDomElementRecursive(purePrimitiveElementRoot), parentDomElement.firstChild);
}

// an element has change, we need to re-render, and apply the DOM
// with the new rendered result
function renderElementAndUpdateDom(element) {
  var debugRenderElement = _debug.debug_options['render-element'];
  if (debugRenderElement) {
    console.log("[renderElementAndUpdateDom]: enter, element=".concat(element));
  }
  var currentElement = null;

  // v DOM before the update
  currentElement = element;
  while (!currentElement.isPrimitive) {
    currentElement = currentElement.renderedTo;
  }
  var prevPurePrimitiveElement = currentElement;
  var domElement = prevPurePrimitiveElement._domElement;

  // now perform the update
  var nextPurePrimitiveElement = renderElementRecursive(element);
  applyDiff(prevPurePrimitiveElement, nextPurePrimitiveElement, null, domElement);
  if (debugRenderElement) {
    console.log("[renderElementAndUpdateDom]: exit");
  }
}
