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
      if (value === null) {
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

  val(value) {
    this.each( node => {
      if (node.value !== undefined) node.value = value;
    });
  }
}

module.exports = DOMNodeCollection;