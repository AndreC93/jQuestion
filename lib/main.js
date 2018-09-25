const DOMNodeCollection = require("./dom_node_collection");

const _documentReadyCallbacks = [];
let _documentReady = false;

window.$l = (selector) => {
    if (typeof selector === 'string') {
        const nodes = document.querySelectorAll(selector);
        return new DOMNodeCollection(Array.from(nodes));
    } else if (selector instanceof HTMLElement) {
        return new DOMNodeCollection([selector]);
    }
};

