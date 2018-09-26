/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor (nodes) {
    this.nodes = nodes;
  }

  each (callback) {
    this.nodes.forEach(node => callback(node));
  }

  html (html) {
    if (typeof html === 'string') {
      this.each( node => node.innerHTML = html);
      return this;
    } else if (this.nodes.length !== 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
    return this;
  }

  append(children) {
    if (this.nodes.length === 0) return null;

    if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
      children = $l(children);
    }

    if (typeof children === 'string') {
      this.each( node => node.innerHTML += children );
    } else if (children instanceof DOMNodeCollection) {
      this.each( node => {
        children.each( child => {
          clonedChild = child.cloneNode(true);
          node.innerHTML += clonedChild;
        })
      });
    }

    return this;
  }

  attr(attributeName, value) {
    if (this.nodes.length === 0) return null; 

    if (typeof attributeName === 'object') {
      for (let key in attributeName) {
        this.attr(key, attributeName[key]);
      }
    } else if (typeof attributeName === 'string') {
      if (value === null || value === '') {
        this.each( node => node.removeAttribute(attributeName));
      } else if (value === undefined) {
        return this.nodes[0].getAttribute(attributeName);
      } else {
        this.each( node => node.setAttribute(attributeName, value));
      }
    }

    return this;
  }

  addClass(classes) {
    this.each( node => {
      const existingClasses = node.getAttribute('class');
      const newClasses = existingClasses ? (existingClasses + ' ' + classes) : classes;
      node.setAttribute('class', newClasses);
    });
    return this;
  }

  removeClass(classesToRemove) {
    classesToRemove = classesToRemove.split(' ');
    this.each( node => {
      const existingClasses = node.getAttribute('class').split(' ');
      const filteredClasses = existingClasses.filter( existingClass => !classesToRemove.includes(existingClass));
      node.setAttribute('class', filteredClasses.join(' '));
    });
    return this;
  }

  children() {
    let allChildren = [];
    this.each( node => allChildren = allChildren.concat(Array.from(node.children)) );
    return new DOMNodeCollection(allChildren);
  }

  parent() {
    parents = [];
    this.each( node => parents.push(node.parentNode()));
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let found = [];
    this.each( node => {
      const arrOfNodes = Array.from(node.querySelectorAll(selector))
      found = found.concat(arrOfNodes);
    });
    return new DOMNodeCollection(found);
  }

  remove() {
    this.each( node => node.remove() );
    this.nodes = [];
  }

  on(eventName, callback) {
    this.each( node => {
      node.addEventListener(eventName, callback);
      const eventKey = `jquestionEvent-${eventName}`;
      if (node[eventKey] === undefined) node[eventKey] = [];
      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.each( node => {
      const eventKey = `jquestionEvent-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach( callback => {
          node.removeEventListener(eventName, callback)
        });
      }
      node[eventKey] = [];
    });
  }

  val(value = '') {
    this.each( node => {
      if (node.value !== undefined) node.value = value;
    });
  }

  bind(eventName, callback) {
    this.each(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `jquestionEvent-${eventName}`;
      if (node[eventKey] === undefined) node[eventKey] = [];
      node[eventKey].push(callback);
    });
  }
}

module.exports = DOMNodeCollection;

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ "./lib/dom_node_collection.js");

const _documentReadyCallbacks = [];
let _documentReady = false;

document.addEventListener("DOMContentLoaded", () => {
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
    type: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    error: () => 'An error occurred',
  };

  options = window.$j.extend(defaults, options);
  options.type = options.type.toUpperCase();

  const xhr = new XMLHttpRequest();
  xhr.open(options.type, options.url, true);
  xhr.onload = function () {
    if (xhr.status < 400) {
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }
  };
  xhr.send(JSON.stringify(options.data));
};


/***/ })

/******/ });
//# sourceMappingURL=jquestion.js.map