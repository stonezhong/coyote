import _ from "lodash";

import {debug_options, DEBUG_DOM_REMOVE, DEBUG_DOM_REPLACE} from "./debug";


// pure primite element tree are considered DOM equivalent
// return the before and after pure primite element tree so we know the diff
function renderElement(element) {
    let currentElement = element;
    
    // get the pureElement before the change
    while (!currentElement.isPrimitive) {
        currentElement = currentElement.renderedTo;
    }
    let prevVDomRoot = currentElement;
    let nextVDOMRoot = renderElementRecursive(element);

    return [prevVDomRoot, nextVDOMRoot];
}


// we will get a new root points to the pure primitive element tree
function renderElementRecursive(element) {
    let currentElement = element;
   
    while (!currentElement.isPrimitive) {
        const nextElement = currentElement.render();
        nextElement.parent = currentElement.parent;
        nextElement.renderedBy = currentElement;
        currentElement.renderedTo = nextElement;
        currentElement = nextElement;
    }

    currentElement.children = currentElement.children.map(renderElementRecursive);

    return currentElement;
}

function createDomElementRecursive(purePrimitiveElement) {
    const domElement = purePrimitiveElement._createDomElement();
    purePrimitiveElement._domElement = domElement;
    for (const childElement of purePrimitiveElement.children) {
        domElement.appendChild(createDomElementRecursive(childElement));
    }
    return domElement;
}

function applyDiff(prevPurePrimitiveElement, nextPurePrimitiveElement, parentDomElement, domElement, debugPrefix='') {
    const debugApplyDiff = debug_options['applyDiff'];

    if (debugApplyDiff) {
        console.log(`${debugPrefix}[applyDiff]: enter, actual VDOM=${prevPurePrimitiveElement}, expect VDOM=${nextPurePrimitiveElement}, parentDom=${parentDomElement?parentDomElement.nodeName:'null'}, dom=${domElement?domElement.nodeName:'null'}`);
    }

    if (_.isNull(domElement)) {
        parentDomElement.appendChild(
            createDomElementRecursive(nextPurePrimitiveElement)
        )
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: exit`)
        }
        return;
    }

    if (prevPurePrimitiveElement.getTagName() === nextPurePrimitiveElement.getTagName()) {
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: reuse, tag is ${prevPurePrimitiveElement.getTagName()}`);
        }
        // we will reuse the DOM
        nextPurePrimitiveElement._updateDomElement(prevPurePrimitiveElement, domElement);
        nextPurePrimitiveElement._domElement = domElement;

        const commonChildrenLen = Math.min(prevPurePrimitiveElement.children.length, nextPurePrimitiveElement.children.length);
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: actual VDOM has ${prevPurePrimitiveElement.children.length} children, expect VDOM has ${nextPurePrimitiveElement.children.length} children`);
        }
        for (let i of _.range(commonChildrenLen)) {
            applyDiff(
                prevPurePrimitiveElement.children[i],
                nextPurePrimitiveElement.children[i],
                domElement,
                prevPurePrimitiveElement.children[i]._domElement,
                debugPrefix+'    '
            )
        }

        for (let i = commonChildrenLen; i < nextPurePrimitiveElement.children.length; i ++) {
            const childElement = nextPurePrimitiveElement.children[i];
            applyDiff(null, childElement, domElement, null, debugPrefix+'    ');
        }

        for (let i = commonChildrenLen; i < prevPurePrimitiveElement.children.length; i ++) {
            DEBUG_DOM_REMOVE(domElement, domElement.lastChild);
            domElement.removeChild(domElement.lastChild);
        }
    } else {
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: cannot reuse, expect tag: ${nextPurePrimitiveElement.getTagName()}, actual tag: ${prevPurePrimitiveElement.getTagName()}`);
        }
        // cannot reuse the DOM
        const newDomElement = nextPurePrimitiveElement._createDomElement();
        nextPurePrimitiveElement._domElement = newDomElement;
        for (const childElement of nextPurePrimitiveElement.children) {
            applyDiff(null, childElement, newDomElement, null, debugPrefix+'    ');
        }
        DEBUG_DOM_REPLACE(domElement.parentNode, domElement, newDomElement);
        domElement.parentNode.replaceChild(newDomElement, domElement);
    }
    if (debugApplyDiff) {
        console.log(`${debugPrefix}[applyDiff]: exit`)
    }
}

export function renderRootDomElement(parentDomElement, element) {
    const purePrimitiveElementRoot = renderElementRecursive(element);
    parentDomElement.insertBefore(
        createDomElementRecursive(purePrimitiveElementRoot),
        parentDomElement.firstChild
    )
}

// an element has change, we need to re-render, and apply the DOM
// with the new rendered result
export function renderElementAndUpdateDom(element) {
    const debugRenderElement = debug_options['render-element'];

    if (debugRenderElement) {
        console.log(`[renderElementAndUpdateDom]: enter, element=${element}`)
    }

    let currentElement = null;

    // v DOM before the update
    currentElement = element;
    while (!currentElement.isPrimitive) {
        currentElement = currentElement.renderedTo;
    }
    const prevPurePrimitiveElement = currentElement;
    const domElement = prevPurePrimitiveElement._domElement;

    // now perform the update
    const nextPurePrimitiveElement = renderElementRecursive(element);
    applyDiff(prevPurePrimitiveElement, nextPurePrimitiveElement, null, domElement);

    if (debugRenderElement) {
        console.log(`[renderElementAndUpdateDom]: exit`)
    }
}

