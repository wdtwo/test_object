$.fn.extend({
	//内容缩放 移动端不同屏幕大小的缩放
	autoScale:function(obj){
		if(obj == undefined){var obj = new Object();}
		const settings = {
			origin:obj.origin || 'top',//放大圆心
			skew: obj.skew || 0,//补差
			x:obj.x || 0
		}
		let t = $(this);
		let [winW,winH] = [document.documentElement.clientWidth,document.documentElement.clientHeight];
		let scaleW = (Math.min(winW,winH)/ 750);
			scaleW = Math.min (1,scaleW);
		let cssText =  `-webkit-transform: scale(${scaleW}) translateX(${settings.x});
						transform: scale(${scaleW}) translateX(${settings.x});
						-webkit-transform-origin:${settings.origin};
						transform-origin:${settings.origin}`;
		t.attr('style', cssText);
	}
})
$(".wrap").autoScale();


