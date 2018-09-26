# jQuestion
A JavaScript library for making HTML manipulation and traversal, event handling, and AJAX much more straightforward. It has an easy to learn API for developers of all levels.

## Set Up
* Place this `<script src="https://rawgit.com/AndreC93/jQuestion/master/lib/jquestion.js"></script>` inside your HTML file. 

## DOM Manipulation and Traversal
* Use `$j(selector)` to select HTML elements from the page. 
    * The selector can be a string, such as 'body' or '.first-input'
    * The selector can be a HTMLElement. 
    * The selector can be a jQuestion instance, making most methods chainable. 
* Use `$j(callback)` to queue up functions to be invoked when the DOM is loaded. 
* Many methods available to alter or select elements relative to selected element: 
   * `.html(string)`: use to overwrite the innerHTML of all the selected elements, or if given no argument, will return the inner