"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOriginalElement = getOriginalElement;
exports.renderRootDomElement = renderRootDomElement;
exports.updateDomElement = updateDomElement;
exports.updateDomElementForElement = updateDomElementForElement;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// render an element until it becomes a primitive element
// while it's children could still be non primitive element
function renderToPrimitive(element) {
  var renderedBy = null;
  var renderedElement = element;
  while (!renderedElement.isPrimitive) {
    renderedElement = renderedElement.render();
    renderedElement.renderedBy = renderedBy;
    renderedBy = renderedElement;
  }
  return renderedElement;
}

// render a DOM element with a component
function renderRootDomElement(domElement, element) {
  updateDomElement(element, domElement, null);
}

// render an element, it was previously cached at cachedDomElement
function updateDomElement(element, parentDomElement, cachedDomElement) {
  var primitiveElement = renderToPrimitive(element);
  var originalElement = getOriginalElement(element);
  if (!_lodash["default"].isNull(cachedDomElement) && primitiveElement._canReuse(cachedDomElement)) {
    originalElement._domElement = cachedDomElement;
    var childIndex = 0,
      childDomElement = cachedDomElement.firstChild,
      nextChildDomElement = null;
    for (;;) {
      if (childIndex >= primitiveElement.children.length) {
        break;
      }
      // need to get this before we replace childDomElement
      nextChildDomElement = _lodash["default"].isNull(childDomElement) ? null : childDomElement.nextSibling;
      var childElement = primitiveElement.children[childIndex];
      updateDomElement(childElement, cachedDomElement, childDomElement);
      childIndex += 1;
      childDomElement = nextChildDomElement;
    }

    // apply attribute change

    // delete the remaining nodes
    var domElementToDeleteList = [];
    while (!_lodash["default"].isNull(childDomElement)) {
      domElementToDeleteList.push(childDomElement);
      childDomElement = childDomElement.nextSibling;
    }
    for (var _i = 0, _domElementToDeleteLi = domElementToDeleteList; _i < _domElementToDeleteLi.length; _i++) {
      var domElementToDelete = _domElementToDeleteLi[_i];
      cachedDomElement.removeChild(domElementToDelete);
    }
    primitiveElement._updateDomElement(cachedDomElement);
    return;
  }

  // cannot reuse cached DOM
  var domElement = primitiveElement._createDomElement();
  originalElement._domElement = domElement;
  var _iterator = _createForOfIteratorHelper(primitiveElement.children),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _childElement = _step.value;
      updateDomElement(_childElement, domElement, null);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (_lodash["default"].isNull(cachedDomElement)) {
    parentDomElement.appendChild(domElement);
  } else {
    parentDomElement.replaceChild(domElement, cachedDomElement);
  }
  return;
}

// update an element's DOM render after element is updated
function updateDomElementForElement(element) {
  var originalElement = getOriginalElement(element);
  var cachedDomElement = originalElement._domElement;
  updateDomElement(element, cachedDomElement.parentNode, cachedDomElement);
}
function getOriginalElement(element) {
  var r;
  for (r = element; !_lodash["default"].isNull(r.renderedBy); r = r.renderedBy) {}
  return r;
}
