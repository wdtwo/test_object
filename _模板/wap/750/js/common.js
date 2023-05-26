$.fn.extend({
	//内容缩放 移动端不同屏幕大小的缩放
	autoScale:function(obj){
		if(obj == undefined){var obj = new Object();}
		var settings = {
			origin:obj.origin || 'top',//放大圆心
			skew: obj.skew || 0,//补差
			x:obj.x || 0
		}
		var t = $(this);
		var winW = document.documentElement.clientWidth;
		var scaleW = (Math.min(winW/ 750));
			scaleW = Math.min (1,scaleW);
		var cssText =  '-webkit-transform: scale('+scaleW+') translateX('+settings.x+');';
			cssText += 'transform: scale('+scaleW+') translateX('+settings.x+');';
			cssText += '-webkit-transform-origin:'+settings.origin+';';
			cssText += 'transform-origin:'+settings.origin+';';
		t.attr('style', cssText);
	}
})
$(".wrap").autoScale();
$("header").autoScale({
	'origin' : 'top'
});
$(".menu-box").autoScale({
	'origin' : 'top'
});

$("footer").autoScale({
	'origin' : 'bottom'
});
