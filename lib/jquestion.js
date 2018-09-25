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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class DOMNodeCollection {
    contructor(nodes) {
        this.nodes = nodes;
    }

    each(callback) {
        this.nodes.forEach(callback);
    }

    html(html) {
        if (typeof html === 'string') {
            this.each( el => el.innerHTML = html);
            return this;
        } else if (this.nodes.length != 0) {
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
            this.each( el => el.innerHTML += children );
        } else if (children instanceof DOMNodeCollection) {
            this.each( el => {
                children.each( child => {
                    clonedChild = child.cloneNode(true);
                    el.innerHTML += clonedChild;
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
            return this;
        } else if (typeof attributeName === string) {
            if (value === null) {
                this.each( el => el.removeAttribute(attributeName));
            } else if (value === undefined) {
                return this.nodes[0].getAttribute(attributeName);
            } else {
                this.each( el => el.setAttribute(attributeName, value));
            }
        }
    }

    addClass(...classes) {
        classess = classes.split(' ');
    }
}

/* harmony default export */ __webpack_exports__["default"] = (DOMNodeCollection);

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_node_collection.js */ "./lib/dom_node_collection.js");


const $l = (selector) => {
    if (typeof selector === 'string') {
        const nodeList = document.querySelectorAll(selector);
        return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__["default"](Array.from(nodeList));
    } else if (selector instanceof HTMLElement) {
        return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__["default"]([selector]);
    }
};

window.$l = $l;



/***/ })

/******/ });
//# sourceMappingURL=jquestion.js.map