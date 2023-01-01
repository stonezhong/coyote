import _ from "lodash";

export const debug_options = {
    "dom-create":       false,
    "dom-remove":       false,
    "dom-replace":      false,
    "dom-attr-set":     false,
    "dom-attr-remove":  false,
    "dom-create-text":  false,
    "dom-update-text":  false,
    "dom-create-null":  false,
    "applyDiff":        false,
    "render-element":   false,
};

export function DEBUG_CREATE_TEXT_NODE(text) {
    if (debug_options["dom-create-text"]) {
        console.log(`[dom-create-text]: ${text}`);
    }
}

export function DEBUG_UPDATE_TEXT_NODE(text) {
    if (debug_options["dom-update-text"]) {
        console.log(`[dom-update-text]: ${text}`);
    }
}

export function DEBUG_CREATE_NULL_NODE() {
    if (debug_options["dom-create-null"]) {
        console.log(`[dom-create-null]`);
    }
}

export function DEBUG_DOM_ATTR_SET(domElement, attrName, attrValue) {
    if (debug_options["dom-attr-set"]) {
        console.log(`[dom-attr-set]: dom=${domElement.nodeName}, ${attrName}=${attrValue}`);
    }
}

export function DEBUG_DOM_ATTR_REMOVE(domElement, attrName) {
    if (debug_options["dom-attr-remove"]) {
        console.log(`[dom-attr-remove]: dom=${domElement.nodeName}, attribute=${attrName}`);
    }
}

export function DEBUG_DOM_CREATE(tag) {
    if (debug_options["dom-create"]) {
        console.log(`[dom-create]: ${tag}`);
    }
}

export function DEBUG_DOM_REMOVE(parentDomElement, childDomElement) {
    if (debug_options["dom-remove"]) {
        console.log(`[dom-remove]: parent=${parentDomElement.nodeName}, ${childDomElement.nodeName}`);
    }
}

export function DEBUG_DOM_REPLACE(parentDomElement, oldChildDomElement, newChildDomElement) {
    if (debug_options["dom-replace"]) {
        console.log(`[dom-replace]: parent=${parentDomElement.nodeName}, ${oldChildDomElement.nodeName} ==> ${newChildDomElement.nodeName}`);
    }
}
