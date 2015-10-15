define(function (require, exports, module) {
	function $(selector) {
		var elements = document.querySelectorAll(selector);
		return elements.length > 1 ? elements : elements[0]; 
	}

	$.isMobile = /mobile/ig.test(navigator.userAgent);

	$.on = function (element, evtName, fn, useCapture) {
		if (evtName === 'tap') {
			evtName = this.isMobile ? 'touchstart' : 'click';	
		}
		element.addEventListener(evtName, fn, useCapture);
	};

	$.off = function (element, evtName, fn, useCapture) {
		if (evtName === 'tap') {
			evtName = this.isMobile ? 'touchstart' : 'click';	
		}
		element.removeEventListener(evtName, fn, useCapture);
	};

	return $;
});