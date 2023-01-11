import _ from "lodash";

import {debug_options, DEBUG_DOM_REMOVE, DEBUG_DOM_REPLACE} from "./debug";
import {Component, TextComponent} from "./components";

function collectKeyedChildren(element, keyedChildren) {
    if (_.isNull(element)) {
        return;
    }
    element.props.children.forEach(childElement => {
        if (!(childElement instanceof Component)) {
            return;
        }
        const key = childElement.props.key;
        if (!_.isUndefined(key)) {
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
    if (!(newElement instanceof Component) || !(prevElement instanceof Component)) {
        return newElement;
    }

    // cannot merge if they are component, but not the same component class
    if (newElement.constructor !== prevElement.constructor) {
        return newElement;
    }

    const newChildren = [];

    let i = 0, j = 0;
    while (i < newElement.props.children.length) {
        const newChild = newElement.props.children[i]; 
        i++;
        if (!(newChild instanceof Component)) {
            // non-Component child do not need merge
            newChildren.push(newChild);
            j++;
            continue;
        }

        const childKey = newChild.props.key;
        if (_.isUndefined(childKey)) {
            // non-keyed-component
            while (
                (j < prevElement.props.children.length) && 
                (prevElement.props.children[j] instanceof Component) &&
                (!_.isUndefined(prevElement.props.children[j].props.key))
            ) {
                // skip all keyed component children since we are not keyed
                j++;
            }
            const prevChild = (j < prevElement.props.children.length)?prevElement.props.children[j]:null;
            newChildren.push(mergeElement(newChild, prevChild, prevKeyedChildren));
            j++;
        } else {
            const prevChild = (childKey in prevKeyedChildren)?prevKeyedChildren[childKey]:null;
            newChildren.push(mergeElement(newChild, prevChild, prevKeyedChildren));
        }
    }

    
    if (prevElement.__cyoIsPrimitive) {
        // primitive element is never stateful, so no need to merge
        newElement.props.children = newChildren;
        return newElement;
    }

    prevElement.props = {...newElement.props, children: newChildren};
    // TODO: define a lifecycle method so we can notify component about this property change
    return prevElement;
}

// we will get a new root points to the pure primitive element tree
function renderElementRecursive(element) {
    let currentElement = element;

    while (!currentElement.__cyoIsPrimitive) {
        const prevKeyedChildren = {};
        collectKeyedChildren(currentElement.__cyoRenderedTo, prevKeyedChildren);
        const nextElement = mergeElement(
            currentElement.__cyoWrapRender(),
            currentElement.__cyoRenderedTo,
            prevKeyedChildren
        );
        nextElement.__cyoRenderedBy = currentElement;
        currentElement.__cyoRenderedTo = nextElement;
        currentElement = nextElement;
    }

    currentElement.props.children.forEach(renderElementRecursive);
}

function extractVDOMTree(element) {
    // given a rendered element, get the v-dom tree
    let currentElement = element;
    while (!currentElement.__cyoIsPrimitive) {
        currentElement = currentElement.__cyoRenderedTo;
    }

    const vDomElement = {
        element: currentElement,
    }

    vDomElement.children = currentElement.props.children.map(extractVDOMTree);
    return vDomElement;
}

function createDomElementRecursive(vDomElement) {
    const domElement = vDomElement.element.__cyoCreateDomElement();

    vDomElement.element.__cyoDomElement = domElement;
    for (const childVDomElement of vDomElement.children) {
        domElement.appendChild(createDomElementRecursive(childVDomElement));
    }
    return domElement;
}

function applyDiff(prevVDomElement, nextVDomElement, parentDomElement, domElement, debugPrefix='') {
    const debugApplyDiff = debug_options['applyDiff'];

    if (debugApplyDiff) {
        console.log(`${debugPrefix}[applyDiff]: enter, actual VDOM=${prevVDomElement.element}, expect VDOM=${nextVDomElement.element}, parentDom=${parentDomElement?parentDomElement.nodeName:'null'}, dom=${domElement?domElement.nodeName:'null'}`);
    }

    if (_.isNull(domElement)) {
        parentDomElement.appendChild(
            createDomElementRecursive(nextVDomElement)
        );
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: exit`)
        }
        return;
    }

    if (prevVDomElement.element.__cyoGetTagName() === nextVDomElement.element.__cyoGetTagName()) {
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: reuse, tag is ${prevPurePrimitiveElement.__cyoGetTagName()}`);
        }
        // we will reuse the physical DOM
        nextVDomElement.element.__cyoUpdateDomElement(prevVDomElement.element, domElement);
        nextVDomElement.element.__cyoDomElement = domElement;

        const commonChildrenLen = Math.min(prevVDomElement.children.length, nextVDomElement.children.length);
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: actual VDOM has ${prevPurePrimitiveElement.children.length} children, expect VDOM has ${nextPurePrimitiveElement.children.length} children`);
        }
        for (let i of _.range(commonChildrenLen)) {
            applyDiff(
                prevVDomElement.children[i],
                nextVDomElement.children[i],
                domElement,
                prevVDomElement.children[i].element.__cyoDomElement,
                debugPrefix+'    '
            )
        }

        for (let i = commonChildrenLen; i < nextVDomElement.children.length; i ++) {
            const childVDomElement = nextVDomElement.children[i];
            applyDiff(null, childVDomElement, domElement, null, debugPrefix+'    ');
        }

        for (let i = commonChildrenLen; i < prevVDomElement.children.length; i ++) {
            DEBUG_DOM_REMOVE(domElement, domElement.lastChild);
            domElement.removeChild(domElement.lastChild);
        }
    } else {
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: cannot reuse, expect tag: ${nextPurePrimitiveElement.getTagName()}, actual tag: ${prevPurePrimitiveElement.getTagName()}`);
        }
        // cannot reuse the DOM
        const newDomElement = nextVDomElement.element.__cyoCreateDomElement();
        nextVDomElement.element.__cyoDomElement = newDomElement;
        for (const childVDomElement of nextVDomElement.children) {
            applyDiff(null, childVDomElement, newDomElement, null, debugPrefix+'    ');
        }
        DEBUG_DOM_REPLACE(domElement.parentNode, domElement, newDomElement);
        domElement.parentNode.replaceChild(newDomElement, domElement);
    }
    if (debugApplyDiff) {
        console.log(`${debugPrefix}[applyDiff]: exit`)
    }
}

export function renderRootDomElement(parentDomElement, element) {
    renderElementRecursive(element);
    const vDomElement = extractVDOMTree(element);
    parentDomElement.insertBefore(
        createDomElementRecursive(vDomElement),
        parentDomElement.firstChild
    );
}

// an element has change, we need to re-render, and apply the DOM
// with the new rendered result
export function renderElementAndUpdateDom(element) {
    const debugRenderElement = debug_options['render-element'];

    if (debugRenderElement) {
        console.log(`[renderElementAndUpdateDom]: enter, element=${element}`)
    }

    // find the VDOM root for the component to be updated
    const prevVDomElement = extractVDOMTree(element);
    // perform the update
    renderElementRecursive(element);
    // get the new VDOM tree
    const nextVDomElement = extractVDOMTree(element);
    // update physical DOM
    applyDiff(prevVDomElement, nextVDomElement, null, prevVDomElement.__cyoDomElement);

    if (debugRenderElement) {
        console.log(`[renderElementAndUpdateDom]: exit`)
    }
}

