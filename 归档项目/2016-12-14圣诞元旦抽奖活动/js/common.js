//点击无延迟
FastClick.attach(document.body);
//内容缩放 移动端不同屏幕大小的缩放
(function() {
	var autoScale = function() {
		//屏幕大小
		var winW = $(window).width();
		var winH = $(window).height();
		var scaleW = Math.min(winW,winH)/ 320;
		scaleW = Math.min (2,scaleW);
		var cssText = '-webkit-transform: scale(' + scaleW +');transform: scale(' + scaleW +');-webkit-transform-origin: top;transform-origin: top;';
		$('.wrap').attr('style', cssText);
	};
	autoScale();
})($);

/*雪花模块*/
(function(){
	var snow = $('.snow'),num = 20,slow = 10,fast = 25,con = 280,minw = 10,maxw = 35; 
						//最多个数        最慢组度            最快速度          布局宽度          雪花最小宽度    雪花最大宽度
	var timer = setInterval(function(){
		var img = $('<img />');
		img.attr('src','images/snow.png');
		var ranTime = parseInt(Math.random() * (fast - slow)) + slow;
		var cssText = 'left:' + parseInt(Math.random() * con) + 'px;width:' + (parseInt(Math.random() * (maxw - minw)) + minw) + 'px;animation:mysnow ' + ranTime + 's infinite linear;-webkit-animation:mysnow ' + ranTime + 's infinite linear;';
		img.attr('style',cssText);
		snow.append(img);
		if($('.snow img').length > num){
			clearInterval(timer);
		}
	},1500);
})($);

$(function(){
	//关闭弹窗
	$('.close').on('click',function(){
		$(this).parents('.dialog').hide();
		$(this).parents('.dialog_b').hide();
	})
	
	/*模拟跳转*/	
	//领取优惠券
	$('.lq input[type=button]').on('click',function(){
		go_dialog('dia_novip');
	})
	//前往注册
	$('.dia_novip .input_btn').on('click',function(){
		go_dialog('dia_reg');
	})
	//注册
	$('.dia_reg .input_btn').on('click',function(){
		go_dialog('dia_over');
	})
	//不要贪心
	$('.dia_over .over').on('click',function(){
		$('.lq,.dialog').hide();
		$('.lqcg').show();
	})
	//去预定
	$('.lqcg input').on('click',function(){
		$('.lqcg,.dialog').hide();
		$('.lq').show();
	})
	function go_dialog(t){
		$('.dialog').show();
		$('.dialog_b').hide();
		$('.' + t).show();
	}
});
