require(['base'], function ($) {
	var initPageTime = Date.now();
	var body = $('body');
	var mainPanel = $('.panel-main');
	var scrollBtn = $('#scroll-btn');
	var banner = $('.banner');

	function checkReadyState() {
		if (document.readyState === 'complete') {
			var now = Date.now();
			var costTime = now - initPageTime;

			setTimeout(function () {
				body.classList.remove('loading');
			}, 999 - costTime);
		}
	}

	checkReadyState();
	$.on(document, 'readystatechange', checkReadyState);

	$.on(scrollBtn, 'click', function () {
		mainPanel.classList.add('panel-main-free');
	});
});