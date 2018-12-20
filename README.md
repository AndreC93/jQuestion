# jQuestion
A JavaScript library for making HTML manipulation and traversal, event handling, and AJAX easier. It has a simple API for developers of all levels.

## Live Demo
[Text Speed Test](http://www.andrechow.com/jQuestion/ "Text Speed Test"): A typing speed test that tests how fast you can type a random Harry Potter quote, built using only jQuestion and JavaScript. Type time and words per minute are shown on completion.


## Set Up
* Place this `<script src="https://cdn.jsdelivr.net/gh/AndreC93/jQuestion@master/lib/jquestion.js"></script>` inside your HTML file. 

## DOM Manipulation and Traversal
* Use `$j(selector)` to select HTML elements from the page. 
    * The selector can be a string, such as 'body' or '.first-input'
    * The selector can be a HTMLElement. 
    * The selector can be a jQuestion instance, making most methods chainable.

* Use `$j(callback)` to queue up functions to be invoked when the DOM is loaded. 

### Many methods available to alter or select elements relative to selected element: 
   * `.html(string)`: use to overwrite the innerHTML of all the selected elements, or if given no argument, will return the innerHTML of the first element in the selected elements.
   * `.empty()`: will replace all innerHTML of the selected elements with ''.
   * `.append(children)`: use to append HTML elements to each of the selected elements, works with strings (such as `<p>Hello</p>`), HTML elements, or instances of jQuestion. 
   * `.attr(attributeName, value)`: use to set a certain attribute(s) of the selected elements. 
      * If attributeName is a string:
        * and value is null or '', will remove that attribute from all selected elements
        * and value is undefined or not given, will return the value of that attributeName from the first selected element. 
        * and value is defined as anything else, will set that attribute for each selected element with the value.
      * If attributeName is an object:
        * Attributes with the name of each Key will be assigned with the corresponding Value to each selected element.
   * `.addClass(classes)`: use to add a HTML class or classes to each selected element. For multiple classes to be added at once, separate them with a space within the same string.
   * `.removeClass(classes)`: use to remove a HTML class or classes from each selected element. For multiple classes to be removed at once, separate them with a space within the same string.
   * `.children()`: selects all immediate children of the selected elements and returns them as a new instance of jQuestion.
   * `.parent()`: selects all immediate parents of the selected elements and returns them as a new instance of jQuestion.
   * `.find(selector)`: selects all children (recursively) that match the given selector and returns them as a new instance of jQuestion.
   * `.remove()`: removes all selected elements from the DOM.
   * `.val(value)`: use to set the value on all selected nodes with the given value, if no value given, '' is used by default.

## Event Handling
* `.on()` and `.off()` methods used to add and remove event handlers to selected elements.
  * `.on(eventName, callback)`: attaches the event listener for eventName and will invoke the callback on event trigger.
  *  `.off(eventName, callback)`: removes the event listener for eventName, and removes all the associated callbacks attached. 

## AJAX
* `$j.ajax()` allows for the sending of HTTP requests.
  * `$j.extend(base, ...objs)`: use to merge objects together. receives base as an object and merges any number of objects passed in as objs to base, returning base. 
  * `$j.ajax(options)`: use to send AJAX requests to other URLs. Receives options as an object and sends out an AJAX request with the data within options. By default, if no method is given, 'GET' will be the method used. Success and error callbacks should be passed in. 