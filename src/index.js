// /*******************************************************************************************
//  * Terminologies
//  * 
//  * component                -- refers to javascript class Component or decendent
//  * element                  -- an instance of a component
//  * DOM element              -- see https://developer.mozilla.org/en-US/docs/Web/API/Element
//  * primitive component      -- a component for HTML native tags, like div, p, table, etc
//  * primitive element        -- an element of a primitive component
//  * pure primitive element   -- a primitive element while all it's transitive children are
//  *                             primitive element
//  * ------------------------------------------------------------------------------------------
//  * 
//  * Rules
//  * 
//  * An element's props should never change after element is constructed
//  * An element's status should be immutable
//  *     -- if it changes, a new status object should be replacing the old status
//  *     -- we can use status1 === status2 to check if they are the same
//  *     -- it is recommended to use immer to manage status
//  * element's fields start with _ are reserved for internal usage, user should never access those fields.
//  *     For example, isPrimitive
//  * 
//  * User should call componentFactory to create component factory, and use it to create element.
// *******************************************************************************************/


export {Component, componentFactory} from './components';
export {renderRootDomElement} from './utils';
export {
    A,ABBR,ADDRESS,AREA,ARTICLE,ASIDE,AUDIO,B,BASE,BDI,BDO,BLOCKQUOTE,BODY,BR,BUTTON,CANVAS,CAPTION,CITE,CODE,COL,COLGROUP,DATA,DATALIST,DD,DEL,DETAILS,DFN,DIALOG,DIV,DL,DT,EM,EMBED,FIELDSET,FIGCAPTION,FIGURE,FOOTER,FORM,HEAD,HEADER,HGROUP,H1,H2,H3,H4,H5,H6,HR,HTML,I,IFRAME,IMG,INPUT,INS,KBD,KEYGEN,LABEL,LEGEND,LI,LINK,MAIN,MAP,MARK,MENU,MENUITEM,META,METER,NAV,NOSCRIPT,OBJECT,OL,OPTGROUP,OPTION,OUTPUT,P,PARAM,PICTURE,PRE,PROGRESS,Q,RP,RT,RUBY,S,SAMP,SCRIPT,SECTION,SELECT,SMALL,SOURCE,SPAN,STRONG,STYLE,SUB,SUMMARY,SUP,SVG,TABLE,TBODY,TD,TEMPLATE,TEXTAREA,TFOOT,TH,THEAD,TIME,TITLE,TR,TRACK,U,UL,VAR,VIDEO,WBR,
} from "./components";
