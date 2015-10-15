require(['base'], function ($) {
	var initPageTime = Date.now();

	//TODO:带锚点进来的布局会乱
	if (location.hash) {
		location.replace(location.href.replace(/#\w+/,''));
	}

	function checkReadyState() {
		if (document.readyState === 'complete') {
			var now = Date.now();
			var costTime = now - initPageTime;

			setTimeout(initPage, 999 - costTime);
		}
	}

	function initPage() {
		var body = $('body');
		var mainPanel = $('.panel-main');
		var leftPanel = $('.panel-left');
		var scrollBtn = $('#scroll-btn');
		var menuBtn = $('.icon-strips');

		body.classList.remove('loading');

		$.on(scrollBtn, 'tap', riseInfo);
		$.on(menuBtn, 'tap', autoPanel);

		//防止在菜单上滑动导致右边界面滚动
		$.on(leftPanel, 'touchmove', function (e) {
			e.preventDefault();
		});

		$.on(leftPanel, 'click', function (e) {
			var target = e.target;

			if (target.tagName === 'A') {
				var elem = $(target.dataset.href);
				var top = elem.offsetTop;
				var curPos = $('body').scrollTop;

				riseInfo();
				autoPanel(e, true);
				setTimeout(function () {
					var timer = setInterval(function () {
						if (curPos < top) {
							curPos += 10;
							$('body').scrollTop = curPos;
						} else {
							$('body').scrollTop = top;
							clearInterval(timer);
						}
					}, 1);
				}, 500);
			}
		});

		function riseInfo() {
			mainPanel.classList.add('panel-main-free');
		}

		function autoPanel(e, notPreventDefault) {
			var leftPanelWidth = leftPanel.offsetWidth;

			e.stopPropagation();
			!notPreventDefault && e.preventDefault();

			if (body.classList.contains('panel-on')) {
				body.classList.remove('panel-on');
			} else {
				body.classList.add('panel-on');
				//点击右侧界面隐藏菜单
				$.on(mainPanel, 'tap', function handler(e) {
					e.preventDefault();
					body.classList.remove('panel-on');
					$.off(mainPanel, 'tap', handler);
				});
			}
		}
	}

	checkReadyState();
	$.on(document, 'readystatechange', checkReadyState);
});