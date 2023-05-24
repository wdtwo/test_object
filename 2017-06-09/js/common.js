//内容缩放 移动端不同屏幕大小的缩放
(function($) {
	var autoScale = function() {
		//屏幕大小
		var winW = document.documentElement.clientWidth;
		var winH = document.documentElement.clientHeight;
		var scaleW = Math.min(winW,winH)/ 320;
		scaleW = Math.min (2,scaleW);
		var cssText = '-webkit-transform: scale(' + scaleW +');transform: scale(' + scaleW +');-webkit-transform-origin: top;transform-origin: top;';
		$('.wrap').attr('style', cssText);
		cssText = '-webkit-transform: scale(' + scaleW +');transform: scale(' + scaleW +');-webkit-transform-origin: bottom;transform-origin: bottom;';
		$('.wrap-bottom').attr('style', cssText);
	};
	autoScale();
})($);
