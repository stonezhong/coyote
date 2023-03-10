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
 * __cyoDomElement                  only primitive element has _domElement, they point to the DOM 
 *                                  element a primitive element referes to
 * 
 *              
 * 
 */

export class Component {
    __cyoIsPrimitive = false;        // true for primitive element
    __cyoRenderedBy = null;          // other element that produce this element via render()
    __cyoRenderedTo = null;          // the element this element renders to via render()

    state = {}

    constructor(props, children) {
        this.props = {...props, children};
    }

    // for debugging purpose only
    toString() {
        return `${this.constructor.name}`;
    }

    setState(changer) {
        this.state = produce(this.state, changer);
        renderElementAndUpdateDom(this);
    }

    __cyoWrapRender() {
        const output = this.render();
        if (_.isString(output))  {
            return new TextComponent(output);
        }
        if (!output) {
            return new NullComponent();
        }
        if (output instanceof Component) {
            return output;
        }
        throw new Error("Invalid render result!");
    }
}

class NullComponent extends Component {
    // this is usually act as placeholder for null or false for 
    __cyoDomElement = null;

    constructor(text) {
        super({}, []);
        this.__cyoIsPrimitive = true;
    }

    toString() {
        return `Null`;
    }

    __cyoCreateDomElement() {
        DEBUG_CREATE_NULL_NODE();
        return document.createComment("for null component");
    }
    
    __cyoUpdateDomElement(cachedElement, domElement) {
    }

    __cyoGetTagName() {
        return "#comment";
    }
};

class TextComponent extends Component {
    __cyoDomElement = null;
    __cyoText = null;

    constructor(text) {
        super({}, []);
        this.__cyoText = text;
        this.__cyoIsPrimitive = true;
    }
    toString() {
        return `Text(${this.__cyoText})>`;
    }
    
    __cyoCreateDomElement() {
        DEBUG_CREATE_TEXT_NODE(this.__cyoText);
        return document.createTextNode(this.__cyoText);
    }

    __cyoUpdateDomElement(cachedElement, domElement) {
        if (this.__cyoText !== cachedElement.__cyoText) {
            DEBUG_UPDATE_TEXT_NODE(this.__cyoText);
            domElement.nodeValue = this.__cyoText;
        }
    }
    
    __cyoGetTagName() {
        return "#text";
    }
};


function _primitiveComponent(tag) {
    class PrimitiveComponent extends Component {
        __cyoDomElement = null;

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
            this.__cyoIsPrimitive = true;
        }

        toString() {
            return tag;
        }
    
        __cyoGetTagName() {
            return tag;
        }

        __cyoGetPhysicalProps() {
            return Object.entries(this.props).filter(
                ([k, v]) => (k !=='children' && k !== 'key')
            );
        }
    
        __cyoSetDomAttr(domElement, attrName, attrValue) {
            DEBUG_DOM_ATTR_SET(domElement, attrName, attrValue);
            if (eventHandlerProps.has(attrName)) {
                domElement[attrName] = attrValue;
            } else {
                domElement.setAttribute(attrName, attrValue);
            }
        }

        __cyoRemoveDomAttr(domElement, attrName) {
            DEBUG_DOM_ATTR_REMOVE(domElement, attrName);
            if (eventHandlerProps.has(attrName)) {
                domElement[attrName] = null;
            } else {
                domElement.removeAttribute(attrName);
            }
        }

        __cyoCreateDomElement() {
            DEBUG_DOM_CREATE(tag);
            const domElement = document.createElement(tag);
            this.__cyoGetPhysicalProps().forEach(([propKey, propValue]) => {
                this.__cyoSetDomAttr(domElement, propKey, propValue);
            });
            return domElement;
        }

        __cyoUpdateDomElement(cachedElement, domElement) {
            const cachedPropKeys = new Set(
                cachedElement.__cyoGetPhysicalProps().map(([propKey, propValue]) => propKey)
            );
            const propKeys = new Set(
                this.__cyoGetPhysicalProps().map(([propKey, propValue]) => propKey)
            );

            cachedElement.__cyoGetPhysicalProps().forEach(([propKey, propValue]) => {
                if (!propKeys.has(propKey)) {
                    this.__cyoRemoveDomAttr(domElement, propKey);
                }
            });

            this.__cyoGetPhysicalProps().forEach(([propKey, propValue]) => {
                if (cachedPropKeys.has(propKey)) {
                    if (cachedElement.props[propKey] !== propValue) {
                        this.__cyoSetDomAttr(domElement, propKey, propValue);
                    }
                } else {
                    this.__cyoSetDomAttr(domElement, propKey, propValue);
                }
            });
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

// generated code
export const A = componentFactory(_primitiveComponent('a'));
export const ABBR = componentFactory(_primitiveComponent('abbr'));
export const ADDRESS = componentFactory(_primitiveComponent('address'));
export const AREA = componentFactory(_primitiveComponent('area'));
export const ARTICLE = componentFactory(_primitiveComponent('article'));
export const ASIDE = componentFactory(_primitiveComponent('aside'));
export const AUDIO = componentFactory(_primitiveComponent('audio'));
export const B = componentFactory(_primitiveComponent('b'));
export const BASE = componentFactory(_primitiveComponent('base'));
export const BDI = componentFactory(_primitiveComponent('bdi'));
export const BDO = componentFactory(_primitiveComponent('bdo'));
export const BLOCKQUOTE = componentFactory(_primitiveComponent('blockquote'));
export const BODY = componentFactory(_primitiveComponent('body'));
export const BR = componentFactory(_primitiveComponent('br'));
export const BUTTON = componentFactory(_primitiveComponent('button'));
export const CANVAS = componentFactory(_primitiveComponent('canvas'));
export const CAPTION = componentFactory(_primitiveComponent('caption'));
export const CITE = componentFactory(_primitiveComponent('cite'));
export const CODE = componentFactory(_primitiveComponent('code'));
export const COL = componentFactory(_primitiveComponent('col'));
export const COLGROUP = componentFactory(_primitiveComponent('colgroup'));
export const DATA = componentFactory(_primitiveComponent('data'));
export const DATALIST = componentFactory(_primitiveComponent('datalist'));
export const DD = componentFactory(_primitiveComponent('dd'));
export const DEL = componentFactory(_primitiveComponent('del'));
export const DETAILS = componentFactory(_primitiveComponent('details'));
export const DFN = componentFactory(_primitiveComponent('dfn'));
export const DIALOG = componentFactory(_primitiveComponent('dialog'));
export const DIV = componentFactory(_primitiveComponent('div'));
export const DL = componentFactory(_primitiveComponent('dl'));
export const DT = componentFactory(_primitiveComponent('dt'));
export const EM = componentFactory(_primitiveComponent('em'));
export const EMBED = componentFactory(_primitiveComponent('embed'));
export const FIELDSET = componentFactory(_primitiveComponent('fieldset'));
export const FIGCAPTION = componentFactory(_primitiveComponent('figcaption'));
export const FIGURE = componentFactory(_primitiveComponent('figure'));
export const FOOTER = componentFactory(_primitiveComponent('footer'));
export const FORM = componentFactory(_primitiveComponent('form'));
export const HEAD = componentFactory(_primitiveComponent('head'));
export const HEADER = componentFactory(_primitiveComponent('header'));
export const HGROUP = componentFactory(_primitiveComponent('hgroup'));
export const H1 = componentFactory(_primitiveComponent('h1'));
export const H2 = componentFactory(_primitiveComponent('h2'));
export const H3 = componentFactory(_primitiveComponent('h3'));
export const H4 = componentFactory(_primitiveComponent('h4'));
export const H5 = componentFactory(_primitiveComponent('h5'));
export const H6 = componentFactory(_primitiveComponent('h6'));
export const HR = componentFactory(_primitiveComponent('hr'));
export const HTML = componentFactory(_primitiveComponent('html'));
export const I = componentFactory(_primitiveComponent('i'));
export const IFRAME = componentFactory(_primitiveComponent('iframe'));
export const IMG = componentFactory(_primitiveComponent('img'));
export const INPUT = componentFactory(_primitiveComponent('input'));
export const INS = componentFactory(_primitiveComponent('ins'));
export const KBD = componentFactory(_primitiveComponent('kbd'));
export const KEYGEN = componentFactory(_primitiveComponent('keygen'));
export const LABEL = componentFactory(_primitiveComponent('label'));
export const LEGEND = componentFactory(_primitiveComponent('legend'));
export const LI = componentFactory(_primitiveComponent('li'));
export const LINK = componentFactory(_primitiveComponent('link'));
export const MAIN = componentFactory(_primitiveComponent('main'));
export const MAP = componentFactory(_primitiveComponent('map'));
export const MARK = componentFactory(_primitiveComponent('mark'));
export const MENU = componentFactory(_primitiveComponent('menu'));
export const MENUITEM = componentFactory(_primitiveComponent('menuitem'));
export const META = componentFactory(_primitiveComponent('meta'));
export const METER = componentFactory(_primitiveComponent('meter'));
export const NAV = componentFactory(_primitiveComponent('nav'));
export const NOSCRIPT = componentFactory(_primitiveComponent('noscript'));
export const OBJECT = componentFactory(_primitiveComponent('object'));
export const OL = componentFactory(_primitiveComponent('ol'));
export const OPTGROUP = componentFactory(_primitiveComponent('optgroup'));
export const OPTION = componentFactory(_primitiveComponent('option'));
export const OUTPUT = componentFactory(_primitiveComponent('output'));
export const P = componentFactory(_primitiveComponent('p'));
export const PARAM = componentFactory(_primitiveComponent('param'));
export const PICTURE = componentFactory(_primitiveComponent('picture'));
export const PRE = componentFactory(_primitiveComponent('pre'));
export const PROGRESS = componentFactory(_primitiveComponent('progress'));
export const Q = componentFactory(_primitiveComponent('q'));
export const RP = componentFactory(_primitiveComponent('rp'));
export const RT = componentFactory(_primitiveComponent('rt'));
export const RUBY = componentFactory(_primitiveComponent('ruby'));
export const S = componentFactory(_primitiveComponent('s'));
export const SAMP = componentFactory(_primitiveComponent('samp'));
export const SCRIPT = componentFactory(_primitiveComponent('script'));
export const SECTION = componentFactory(_primitiveComponent('section'));
export const SELECT = componentFactory(_primitiveComponent('select'));
export const SMALL = componentFactory(_primitiveComponent('small'));
export const SOURCE = componentFactory(_primitiveComponent('source'));
export const SPAN = componentFactory(_primitiveComponent('span'));
export const STRONG = componentFactory(_primitiveComponent('strong'));
export const STYLE = componentFactory(_primitiveComponent('style'));
export const SUB = componentFactory(_primitiveComponent('sub'));
export const SUMMARY = componentFactory(_primitiveComponent('summary'));
export const SUP = componentFactory(_primitiveComponent('sup'));
export const SVG = componentFactory(_primitiveComponent('svg'));
export const TABLE = componentFactory(_primitiveComponent('table'));
export const TBODY = componentFactory(_primitiveComponent('tbody'));
export const TD = componentFactory(_primitiveComponent('td'));
export const TEMPLATE = componentFactory(_primitiveComponent('template'));
export const TEXTAREA = componentFactory(_primitiveComponent('textarea'));
export const TFOOT = componentFactory(_primitiveComponent('tfoot'));
export const TH = componentFactory(_primitiveComponent('th'));
export const THEAD = componentFactory(_primitiveComponent('thead'));
export const TIME = componentFactory(_primitiveComponent('time'));
export const TITLE = componentFactory(_primitiveComponent('title'));
export const TR = componentFactory(_primitiveComponent('tr'));
export const TRACK = componentFactory(_primitiveComponent('track'));
export const U = componentFactory(_primitiveComponent('u'));
export const UL = componentFactory(_primitiveComponent('ul'));
export const VAR = componentFactory(_primitiveComponent('var'));
export const VIDEO = componentFactory(_primitiveComponent('video'));
export const WBR = componentFactory(_primitiveComponent('wbr'));
