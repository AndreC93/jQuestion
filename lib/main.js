const DOMNodeCollection = require("./dom_node_collection");

const _documentReadyCallbacks = [];
let _documentReady = false;

document.addEventListener("DOMContentLoaded", function () {
  _documentReadyCallbacks.forEach( callback => callback() );
  _documentReady = true;
});

window.$j = (selector) => {
  if (typeof selector === 'string') {
    const nodes = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(nodes));
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === 'function') {
    handleDocReadyCallback(selector);
  }
};

handleDocReadyCallback = func => {
  if (_documentReady) {
    func();
  } else {
    _documentReadyCallbacks.push(callback);
  }
}

window.$j.extend = function (base, ...objs) {
  objs.forEach( obj => {
    for (const key in obj) {
      base[key] = obj[key];
    }
  });
  return base;
};

window.$j.ajax = function (options) {
  const defaults = {
    url: window.location.href,
    success: () => 'AJAX call successful',
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    error: () => 'An error occurred',
  };

  options = window.$j.extend(defaults, options);
  options.method = options.method.toUpperCase();

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url, true);
  xhr.onload = function () {
    if (xhr.status < 400) {
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }
  };
  xhr.send(JSON.stringify(options.data));
};
