import _ from "lodash";
import produce from "immer"

import {updateDomElementForElement} from "./utils";

const eventHandlerProps = new Set(['onclick']);

export class Component {
    state = {}
    parent = null;

    isPrimitive = false;             // true for primitive element
    _domElement = null;
    renderedBy = null;                // other component that renders this component

    constructor(props, children) {
        this.props = props;
        this.children = children;
    }

    getState() {
        return this.state;
    }

    setState(changer) {
        this.state = produce(this.state, changer);
        updateDomElementForElement(this);
    }
}

class NullComponent extends Component {
    constructor(text) {
        super({}, []);
        this.isPrimitive = true;
    }
    _createDomElement() {
        return document.createComment("for null component");
    }
    _updateDomElement(domElement) {
    }
    _canReuse(domElement) {
        return domElement.nodeName === "#comment";
    }
};

class TextComponent extends Component {
    constructor(text) {
        super({}, []);
        this._text = text;
        this.isPrimitive = true;
    }
    _createDomElement() {
        return document.createTextNode(this._text);
    }
    _updateDomElement(domElement) {
        if (domElement.nodeValue !== this._text) {
            domElement.nodeValue = this._text;
        }
    }
    _canReuse(domElement) {
        return domElement.nodeName === "#text";
    }
};

function _primitiveComponent(tag) {
    class PrimitiveComponent extends Component {
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
        _canReuse(domElement) {
            return domElement.nodeName.toLowerCase() === tag;
        }
        _createDomElement() {
            const ele = document.createElement(tag);
            for (const key in this.props) {
                const value = this.props[key];
                if (eventHandlerProps.has(key)) {
                    ele[key] = value;
                } else {
                    ele.setAttribute(key, value);
                }
            }
            return ele;
        }
        _updateDomElement(domElement) {
            const attrNames = domElement.getAttributeNames();
            // remove unwanted attributes from DOM
            for (const attrName of attrNames) {
                if (!(attrName in this.props)) {
                    if (eventHandlerProps.has(attrName)) {
                        domElement[attrName] = null;
                    } else {
                        domElement.removeAttribute(attrName);
                    }
                }
            }

            for (const attrName in this.props) {
                const attrValue = this.props[attrName];
                if (eventHandlerProps.has(attrName)) {
                    domElement[attrName] = attrValue;
                } else {
                    if (domElement.getAttribute(attrName) !== attrValue) {
                        domElement.setAttribute(attrName, attrValue);
                    }
                }
            }
        }
        render() {
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
