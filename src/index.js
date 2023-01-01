/*******************************************************************************************
 * Terminologies
 * 
 * component                -- refers to javascript class Component or decendent
 * element                  -- an instance of a component
 * DOM element              -- see https://developer.mozilla.org/en-US/docs/Web/API/Element
 * primitive component      -- a component for HTML native tags, like div, p, table, etc
 * primitive element        -- an element of a primitive component
 * pure primitive element   -- a primitive element while all it's transitive children are
 *                             primitive element
 * ------------------------------------------------------------------------------------------
 * 
 * Rules
 * 
 * An element's props should never change after element is constructed
 * An element's status should be immutable
 *     -- if it changes, a new status object should be replacing the old status
 *     -- we can use status1 === status2 to check if they are the same
 *     -- it is recommended to use immer to manage status
 * element's fields start with _ are reserved for internal usage, user should never access those fields.
 *     For example, _isPrimitive
 * 
 * User should call componentFactory to create component factory, and use it to create element.
*******************************************************************************************/


export {Component, componentFactory, div, hr, p} from './components';
export {renderRootDomElement} from './utils';
