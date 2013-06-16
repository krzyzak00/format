format
======

jQuery string format plugin
 
Adds Python-like format function to jQuery.
This is basic implementation and it doesn't cover all Python format features.

#Call params:
* @param {string} string
* @param {mixed} variables
* @return {string} formated string

#Usage examples:
```javascript
$.fn.format('The quick {} {} jumped over the {} {}', "brown", "fox", "lazy", "dog");
```
```javascript
  $.fn.format('The quick {0} {2} jumped over the {1} {3}', "brown", "lazy", "fox", "dog");
```
```javascript
$.fn.format('The quick {_brown_} {_fox_} jumped over the {_lazy_} {_dog_}', {
  _brown_: "brown",
	_fox_: "Fox",
	_lazy_: "lazy",
	_dog_: "Dog"
});
```
```javascript
$.fn.format('The quick {0} {1} jumped over the {2} {3}', {
	0: "brown",
	1: "fox",
	2: "lazy",
	3: "dog"
});
```
