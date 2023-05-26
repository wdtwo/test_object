
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
	};
	autoScale();
})(jQuery);




$(function(){
	var body = $('body'),lunpan = $('.lunpan'),lock = true,timer = null,end_deg = 0,start_deg = 0;
	//启动的点击事件
	$('.zhizhen').on('click',function(){
		if(lock){
			lock = false;
			$('.lunpan img').removeAttr('style');
			end_deg = parseInt(Math.random() * 360);	//结束位置随机数
			ran_rotate(5,4000,start_deg,end_deg);	//最大旋转周期  旋转时间  初始位置 结束位置(可传入后台随机数,防止控制台修改随机方法)
			start_deg = end_deg;
		}
	})
	function ran_rotate(count,timer,deg_start,deg_end){		
		var count = count || 3,//默认旋转圈数
		timer = timer || 5000,	//默认旋转时间
		deg_start = deg_start || 0,	//初始角度
		deg_end = deg_end || 0;	//默认旋转角度
		//添加旋转动画
		$('.lunpan img').css({
			"transition":"all " + timer + "ms ease-in-out",
			"transform":"rotate(" + (count * 360 + deg_end) + "deg)",
			"-webkit-transition":"all " + timer + "ms ease-in-out",
			"-webkit-transform":"rotate(" + (count * 360 + deg_end) + "deg)"
		});
		//结束后的返回效果
		window.setTimeout(function(){
			$('.lunpan img').removeAttr('style').css({
				"transform":"rotate(" + deg_end + "deg)",
				"-webkit-transform":"rotate(" + deg_end + "deg)"
			});
			alert(deg_end);	//结束的返回值
			lock = true;
		},timer + 300);
		
	}
	//返回获得奖品信息(取决于随机数)	逆时针计算角度
	function prize(number){
		var n = -(number % 360);
		if((n < 30 && n >= 0) || (n > 330 && n <=360)){
			return '50000';
		}
		if(n >= 30 && n < 90){
			return '谢谢';
		}
		if(n >= 90 && n < 150){
			return '尚客优娃娃';
		}
		if(n >= 150 && n < 210){
			return '尚客优抱枕';
		}
		if(n >= 210 && n < 270){
			return '魅族手机';
		}
		if(n >= 270 && n <= 330){
			return '20000';
		}
		return '谢谢';	//如果传入的number不是一个数字或者不符合范围要求则返回'谢谢'!
	}
})

