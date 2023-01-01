"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEBUG_CREATE_NULL_NODE = DEBUG_CREATE_NULL_NODE;
exports.DEBUG_CREATE_TEXT_NODE = DEBUG_CREATE_TEXT_NODE;
exports.DEBUG_DOM_ATTR_REMOVE = DEBUG_DOM_ATTR_REMOVE;
exports.DEBUG_DOM_ATTR_SET = DEBUG_DOM_ATTR_SET;
exports.DEBUG_DOM_CREATE = DEBUG_DOM_CREATE;
exports.DEBUG_DOM_REMOVE = DEBUG_DOM_REMOVE;
exports.DEBUG_DOM_REPLACE = DEBUG_DOM_REPLACE;
exports.DEBUG_UPDATE_TEXT_NODE = DEBUG_UPDATE_TEXT_NODE;
exports.debug_options = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var debug_options = {
  "dom-create": false,
  "dom-remove": false,
  "dom-replace": false,
  "dom-attr-set": false,
  "dom-attr-remove": false,
  "dom-create-text": false,
  "dom-update-text": false,
  "dom-create-null": false,
  "applyDiff": false,
  "render-element": false
};
exports.debug_options = debug_options;
function DEBUG_CREATE_TEXT_NODE(text) {
  if (debug_options["dom-create-text"]) {
    console.log("[dom-create-text]: ".concat(text));
  }
}
function DEBUG_UPDATE_TEXT_NODE(text) {
  if (debug_options["dom-update-text"]) {
    console.log("[dom-update-text]: ".concat(text));
  }
}
function DEBUG_CREATE_NULL_NODE() {
  if (debug_options["dom-create-null"]) {
    console.log("[dom-create-null]");
  }
}
function DEBUG_DOM_ATTR_SET(domElement, attrName, attrValue) {
  if (debug_options["dom-attr-set"]) {
    console.log("[dom-attr-set]: dom=".concat(domElement.nodeName, ", ").concat(attrName, "=").concat(attrValue));
  }
}
function DEBUG_DOM_ATTR_REMOVE(domElement, attrName) {
  if (debug_options["dom-attr-remove"]) {
    console.log("[dom-attr-remove]: dom=".concat(domElement.nodeName, ", attribute=").concat(attrName));
  }
}
function DEBUG_DOM_CREATE(tag) {
  if (debug_options["dom-create"]) {
    console.log("[dom-create]: ".concat(tag));
  }
}
function DEBUG_DOM_REMOVE(parentDomElement, childDomElement) {
  if (debug_options["dom-remove"]) {
    console.log("[dom-remove]: parent=".concat(parentDomElement.nodeName, ", ").concat(childDomElement.nodeName));
  }
}
function DEBUG_DOM_REPLACE(parentDomElement, oldChildDomElement, newChildDomElement) {
  if (debug_options["dom-replace"]) {
    console.log("[dom-replace]: parent=".concat(parentDomElement.nodeName, ", ").concat(oldChildDomElement.nodeName, " ==> ").concat(newChildDomElement.nodeName));
  }
}
