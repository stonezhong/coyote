import _ from "lodash";

import {debug_options, DEBUG_DOM_REMOVE, DEBUG_DOM_REPLACE} from "./debug";

// function collectKeyedChildren(element, keyedChildren) {
//     element.props.children.forEach((childElement) => {
//         const key = childElement.props.key;
//         if (!_.isUndefined(key)) {
//             keyedChildren[key] = childElement;
//         }
//         collectKeyedChildren(childElement, keyedChildren);
//         return;
//     });
// }

// // when we render a component, the output MUST be merged with previous rendered
// // output so we can preserve element STATUS
// function renderWithMerge(element) {
//     const keyedChildren = {};
//     const render = this.render();
//     if 
//     collectKeyedChildren(render, keyedChildren);

//     const lastRender = element._lastRender;
//     const render = element.render();

//     mergeFromLastRender(render, element._lastRender, keyedChildren);
//     element._lastRender = render;
//     return render;
// }


// we will get a new root points to the pure primitive element tree
function renderElementRecursive(element) {
    let currentElement = element;
   
    while (!currentElement.__cyoIsPrimitive) {
        const nextElement = currentElement.__cyoWrapRender();
        nextElement.__cyoRenderedBy = currentElement;
        currentElement.__cyoRenderedTo = nextElement;
        currentElement = nextElement;
    }

    currentElement.props.children = currentElement.props.children.map(renderElementRecursive);

    return currentElement;
}

function createDomElementRecursive(purePrimitiveElement) {
    const domElement = purePrimitiveElement.__cyoCreateDomElement();
    purePrimitiveElement.__cyoDomElement = domElement;
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

    if (prevPurePrimitiveElement.__cyoGetTagName() === nextPurePrimitiveElement.__cyoGetTagName()) {
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: reuse, tag is ${prevPurePrimitiveElement.__cyoGetTagName()}`);
        }
        // we will reuse the DOM
        nextPurePrimitiveElement.__cyoUpdateDomElement(prevPurePrimitiveElement, domElement);
        nextPurePrimitiveElement.__cyoDomElement = domElement;

        const commonChildrenLen = Math.min(prevPurePrimitiveElement.props.children.length, nextPurePrimitiveElement.props.children.length);
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: actual VDOM has ${prevPurePrimitiveElement.children.length} children, expect VDOM has ${nextPurePrimitiveElement.children.length} children`);
        }
        for (let i of _.range(commonChildrenLen)) {
            applyDiff(
                prevPurePrimitiveElement.props.children[i],
                nextPurePrimitiveElement.props.children[i],
                domElement,
                prevPurePrimitiveElement.props.children[i]._domElement,
                debugPrefix+'    '
            )
        }

        for (let i = commonChildrenLen; i < nextPurePrimitiveElement.props.children.length; i ++) {
            const childElement = nextPurePrimitiveElement.props.children[i];
            applyDiff(null, childElement, domElement, null, debugPrefix+'    ');
        }

        for (let i = commonChildrenLen; i < prevPurePrimitiveElement.props.children.length; i ++) {
            DEBUG_DOM_REMOVE(domElement, domElement.lastChild);
            domElement.removeChild(domElement.lastChild);
        }
    } else {
        if (debugApplyDiff) {
            console.log(`${debugPrefix}[applyDiff]: cannot reuse, expect tag: ${nextPurePrimitiveElement.getTagName()}, actual tag: ${prevPurePrimitiveElement.getTagName()}`);
        }
        // cannot reuse the DOM
        const newDomElement = nextPurePrimitiveElement.__cyoCreateDomElement();
        nextPurePrimitiveElement.__cyoDomElement = newDomElement;
        for (const childElement of nextPurePrimitiveElement.props.children) {
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
    while (!currentElement.__cyoIsPrimitive) {
        currentElement = currentElement.__cyoRenderedTo;
    }
    const prevPurePrimitiveElement = currentElement;
    const domElement = prevPurePrimitiveElement.__cyoDomElement;

    // now perform the update
    const nextPurePrimitiveElement = renderElementRecursive(element);
    applyDiff(prevPurePrimitiveElement, nextPurePrimitiveElement, null, domElement);

    if (debugRenderElement) {
        console.log(`[renderElementAndUpdateDom]: exit`)
    }
}

