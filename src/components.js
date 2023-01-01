import _ from "lodash";
import produce from "immer"

import {renderElementAndUpdateDom} from "./utils";
import {
    DEBUG_CREATE_TEXT_NODE, DEBUG_UPDATE_TEXT_NODE, DEBUG_CREATE_NULL_NODE,
    DEBUG_DOM_ATTR_SET, DEBUG_DOM_ATTR_REMOVE,
    DEBUG_DOM_CREATE
} from "./debug";

const eventHandlerProps = new Set(['onclick']);

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

export class Component {
    state = {}
    parent = null;                  // points to the parent element

    isPrimitive = false;             // true for primitive element
    renderedBy = null;               // other element that produce this element via render()
    renderedTo = null;               // the element this element renders to via render()

    constructor(props, children) {
        this.props = props;          // always a raw object, e.g. {x: 1, y: 2}
        this.children = children;    // an array
    }

    toString() {
        return `${this.constructor.name}`;
    }

    getState() {
        return this.state;
    }

    setState(changer) {
        this.state = produce(this.state, changer);
        renderElementAndUpdateDom(this);
    }
}

class NullComponent extends Component {
    // this is usually act as placeholder for null or false for 
    _domElement = null;

    constructor(text) {
        super({}, []);
        this.isPrimitive = true;
    }

    toString() {
        return `Null`;
    }

    _createDomElement() {
        DEBUG_CREATE_NULL_NODE();
        return document.createComment("for null component");
    }
    _updateDomElement(cachedElement, domElement) {
    }
    getTagName() {
        return "#comment";
    }
};

class TextComponent extends Component {
    _domElement = null;

    constructor(text) {
        super({}, []);
        this._text = text;
        this.isPrimitive = true;
    }
    toString() {
        return `Text(${this._text})`;
    }
    _createDomElement() {
        DEBUG_CREATE_TEXT_NODE(this._text);
        return document.createTextNode(this._text);
    }
    _updateDomElement(cachedElement, domElement) {
        if (this._text !== cachedElement._text) {
            DEBUG_UPDATE_TEXT_NODE(this._text);
            domElement.nodeValue = this._text;
        }
    }
    getTagName() {
        return "#text";
    }
};

function _primitiveComponent(tag) {
    class PrimitiveComponent extends Component {
        _domElement = null;

        constructor(props, children) {
            super(props, children.map(
                child => {
                    if (child instanceof Component) {
                        return child;
                    }
                    if (_.isString(child)) {
                        const ret = new TextComponent(child);
                        return ret;
                    }
                    if (!child) {
                        const ret = new NullComponent();
                        return ret;
                    }
                    throw new Error(`Invalid child: ${child}`);
                }
            ));
            for (const child of this.children) {
                child.parent = this;
            }
            this.isPrimitive = true;
        }

        toString() {
            return tag;
        }
    
        getTagName() {
            return tag;
        }

        _set_dom_attr(domElement, attrName, attrValue) {
            DEBUG_DOM_ATTR_SET(domElement, attrName, attrValue);
            if (eventHandlerProps.has(attrName)) {
                domElement[attrName] = attrValue;
            } else {
                domElement.setAttribute(attrName, attrValue);
            }
        }

        _remove_dom_attr(domElement, attrName) {
            DEBUG_DOM_ATTR_REMOVE(domElement, attrName);
            if (eventHandlerProps.has(attrName)) {
                domElement[attrName] = null;
            } else {
                domElement.removeAttribute(attrName);
            }
        }

        _createDomElement() {
            DEBUG_DOM_CREATE(tag);
            const domElement = document.createElement(tag);
            for (const key in this.props) {
                this._set_dom_attr(domElement, key, this.props[key]);
            }
            return domElement;
        }

        _updateDomElement(cachedElement, domElement) {
            const prevPropKeys = new Set(Object.keys(cachedElement.props));
            const propKeys = new Set(Object.keys(this.props));

            for (let key of Object.keys(cachedElement.props)) {
                if (!propKeys.has(key)) {
                    this._remove_dom_attr(domElement, key);
                }
            }

            for (let key of Object.keys(this.props)) {
                const value = this.props[key];
                if (prevPropKeys.has(key)) {
                    if (cachedElement.props[key] !== value) {
                        this._set_dom_attr(domElement, key, value);
                    }
                } else {
                    this._set_dom_attr(domElement, key, value);
                }
            }
        }
        render() {
            throw new Error("render should never be called on primitive element!");
        }
    }
    return PrimitiveComponent;
}

export const componentFactory = type => (...children) => {
    if (children.length == 0) {
        return new type({}, []);
    }

    const first = children[0];
    if (!_.isNull(first) && first.constructor == Object) {
        return new type(first, children.slice(1));
    }

    return new type({}, children);
};

// https://www.tutorialrepublic.com/html-reference/html5-tags.php
[
    "a",
    "abbr",
    // "acronym",
    "address",
    // "applet",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    // "basefont",
    "bdi",
    "bdo",
    // "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    // "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    // "dir",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    // "font",
    "footer",
    "form",
    // "frame",
    // "frameset",
    "head",
    "header",
    "hgroup",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    // "noframes",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    // "strike",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "svg",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    // "tt",
    "u",
    "ul",
    "var",
    "video",
    "wbr"
].forEach(tagName => {
    window[tagName] = componentFactory(_primitiveComponent(tagName));
});
