import DOMNodeCollection from './dom_node_collection.js';

const $l = (selector) => {
    if (typeof selector === 'string') {
        const nodeList = document.querySelectorAll(selector);
        return new DOMNodeCollection(Array.from(nodeList));
    } else if (selector instanceof HTMLElement) {
        return new DOMNodeCollection([selector]);
    }
};

window.$l = $l;

