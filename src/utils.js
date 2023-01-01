import _ from "lodash";


// render an element until it becomes a primitive element
// while it's children could still be non primitive element
function renderToPrimitive(element) {
    let renderedBy = null;
    let renderedElement = element;
    while (!renderedElement._isPrimitive) {
        renderedElement = renderedElement.render();
        renderedElement.renderedBy = renderedBy;
        renderedBy = renderedElement;
    }
    return renderedElement;
}


// render a DOM element with a component
export function renderRootDomElement(domElement, element) {
    updateDomElement(element, domElement, null);
}

// render an element, it was previously cached at cachedDomElement
export function updateDomElement(element, parentDomElement, cachedDomElement) {
    
    const primitiveElement = renderToPrimitive(element);
    const originalElement = getOriginalElement(element);

    if (!_.isNull(cachedDomElement) && primitiveElement._canReuse(cachedDomElement)) {
        originalElement._domElement = cachedDomElement;
        let childIndex = 0, childDomElement = cachedDomElement.firstChild, nextChildDomElement = null;
        for (;;) {
            if (childIndex >= primitiveElement.children.length) {
                break;
            }
            // need to get this before we replace childDomElement
            nextChildDomElement = _.isNull(childDomElement)?null:childDomElement.nextSibling;

            const childElement = primitiveElement.children[childIndex];
            updateDomElement(childElement, cachedDomElement, childDomElement);

            childIndex += 1;
            childDomElement = nextChildDomElement;
        }

        // apply attribute change

        // delete the remaining nodes
        const domElementToDeleteList = [];
        while (!_.isNull(childDomElement)) {
            domElementToDeleteList.push(childDomElement);
            childDomElement = childDomElement.nextSibling;
        }
        for (const domElementToDelete of domElementToDeleteList) {
            cachedDomElement.removeChild(domElementToDelete);
        }
        primitiveElement._updateDomElement(cachedDomElement);
        return;
    }

    // cannot reuse cached DOM
    const domElement = primitiveElement._getDomElement();
    originalElement._domElement = domElement;
    for (const childElement of primitiveElement.children) {
        updateDomElement(childElement, domElement, null);
    }
    if (_.isNull(cachedDomElement)) {
        parentDomElement.appendChild(domElement);
    } else {
        parentDomElement.replaceChild(domElement, cachedDomElement);
    }
    return;
}

// update an element's DOM render after element is updated
export function updateDomElementForElement(element) {
    const originalElement = getOriginalElement(element);
    const cachedDomElement = originalElement._domElement;
    updateDomElement(element, cachedDomElement.parentNode, cachedDomElement);
}

export function getOriginalElement(element) {
    let r;
    for (r = element; !_.isNull(r.renderedBy); r = r.renderedBy) {
    }
    return r;
}

