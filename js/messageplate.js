/**
 * File: messageplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 * Last Edited: 19 May 2015
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Tools
// Touch check
// Variables
// Component
// Prototype component

// Tools
// ---------------------------------------------------------------------------------------
var tool = {
	addEvent: function($elem, $type, $eventHandle) {
		if ($elem == null || typeof($elem) == 'undefined') return;
		if ($elem.addEventListener) {
			$elem.addEventListener($type, $eventHandle, false);
		} else if ($elem.attachEvent) {
			$elem.attachEvent("on" + $type, $eventHandle);
		} else {
			$elem["on" + $type] = $eventHandle;
		}
	},
	classAdd: function($selector, $class) {
		var $crtClass = $selector.className;

		if ($selector.className.indexOf($class) === -1) {
			$selector.className = $selector.className === '' ? $class : $selector.className + ' ' + $class;
		}
	},
	classRemove: function($selector, $class) {
		var $crtClass = $selector.className;

		if ($crtClass.indexOf($class) > -1) {
			$selector.className = $selector.className.split(' ').filter(function($val) {
				return $val != $class;
			}).toString().replace(/,/g, ' ');
		}
	},
	hasClass: function($element, $class) {
		return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
	},
	idAdd: function($selector, $id) {
		$selector.setAttribute('id', $id);
	},
	isTouch: function() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	},
	getIndex: function($node) {
		return [].indexOf.call($node.parentNode.children, $node);
	},
	log: function($text) {
		if (window.console) {
			console.log($text);
		}
	},
	remove: function($selector) {
		if ($selector.charAt(0) === '#') {
			var $element = document.getElementById($selector.substring(1));
			if ($element !== null) {
				$element.parentNode.removeChild($element);
			}
		} else if ($selector.charAt(0) === '.') {
			var $elements = document.querySelectorAll($selector);
			for (var $i = $elements.length - 1; $i >= 0; $i--) {
				if ($elements[$i] !== null) {
					$elements[$i].parentNode.removeChild($element);
				}
			}
		}
	},
	wrap: function($element, $tag, $className) {
		var $wrapper = document.createElement($tag);
		var $tempElement = $element.cloneNode(true);
		$wrapper.className = $className;

		$element.parentNode.insertBefore($wrapper, $element).appendChild($tempElement);
		$element.parentNode.removeChild($element);
	}
};

// Touch check
// ---------------------------------------------------------------------------------------
var $htmlElement = document.getElementsByTagName('html')[0];
if (!tool.isTouch() && !tool.hasClass($htmlElement, 'message-no-touch')) {
	tool.classAdd($htmlElement, 'message-no-touch');
}

// Variables
// ---------------------------------------------------------------------------------------
var $messageBox = document.createElement('div');
var $messageOverlay = document.createElement('div');
var $messageBoxHTML = '';

$messageBoxHTML += '<a class="message-close"></a>';
$messageBoxHTML += '<div class="message-type"></div>';
$messageBoxHTML += '<div class="message-heading"></div>';
$messageBoxHTML += '<div class="message-text"></div>';

$messageBox.id = 'message-box';
$messageBox.innerHTML = $messageBoxHTML;
$messageOverlay.id = 'message-overlay';

// Component
// ---------------------------------------------------------------------------------------
function Messageplate($userOptions) {

	// Setup
	this.options = {
		close: 'close',
		heading: false,
		message: false,
		overlay: true,
		type: false
	};

	// User options
	if (typeof $userOptions === 'object') {
		for (var $optionKey in $userOptions) {
			if ($userOptions.hasOwnProperty($optionKey)) {
				this.options[$optionKey] = $userOptions[$optionKey];
			}
		}
	}

	this.setupMessageBox();
	this.setupOverlay();
};

// Prototype component
// ---------------------------------------------------------------------------------------
Messageplate.prototype = {
	removeMessageBox: function() {
		tool.remove('#message-box');
	},
	setupMessageBox: function() {
		this.removeMessageBox();
		document.getElementsByTagName('body')[0].appendChild($messageBox);

		var $messageBoxId = document.getElementById('message-box');
		$messageBoxId.querySelector('.message-close').innerHTML = this.options.close !== false ? this.options.close : '';
		$messageBoxId.querySelector('.message-type').innerHTML = this.options.type !== false ? '<div class="type-' + this.options.type + '"><div class="line-one"></div><div class="line-two"></div></div>' : '';
		$messageBoxId.querySelector('.message-heading').innerHTML = this.options.heading !== false ? '<h6>' + this.options.heading + '</h6>' : '';
		$messageBoxId.querySelector('.message-text').innerHTML = this.options.message !== false ? this.options.message : '';

		// Reveal
		setTimeout(function() {
			tool.classAdd(document.getElementsByTagName('html')[0], 'message-reveal');
		}, 50);

		// Hide
		$messageBoxId.querySelector('.message-close').onclick = function() {
			tool.classRemove(document.getElementsByTagName('html')[0], 'message-reveal');
		};
	},
	setupOverlay: function() {
		if ((this.options.overlay === true) && (document.getElementById('message-overlay') === null)) {
			document.getElementsByTagName('body')[0].appendChild($messageOverlay);
			document.getElementById('message-overlay').onclick = function() {
				tool.classRemove(document.getElementsByTagName('html')[0], 'message-reveal');
			};
		}
	}
};