const DOMNodeCollection = require("./dom_node_collection");

const _documentReadyCallbacks = [];
let _documentReady = false;

window.$j = (selector) => {
  if (typeof selector === 'string') {
    const nodes = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(nodes));
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === 'function') {
    _documentReady ? selector() : _documentReadyCallbacks.push(selector);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  _documentReadyCallbacks.forEach( callback => callback() );
});

window.$j.extend = function (obj, ...objs) {
  for (let i = 0; i < objs.length; i++) {
    const currObj = objs[i];
    Object.keys(currObj).forEach((key) => obj[key] = currObj[key]);
  }
  return obj;
};

window.$j.ajax = function (options) {
  const defaults = {
    url: window.location.href,
    success: function () { console.log('no callback given'); },
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    error: function () { console.log('no callback given'); }
  };
  const ajaxValues = window.$j.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(ajaxValues.method, ajaxValues.url);
  xhr.onload = function () {
    if (xhr.status < 400) {
      ajaxValues.success(JSON.parse(xhr.response).data);
    } else {
      ajaxValues.error(xhr);
    }
  };
  xhr.send(ajaxValues);
};

function delayedInvoker(e) {
  delayedFunctions.forEach((el) => {
    el(e);
  });
}