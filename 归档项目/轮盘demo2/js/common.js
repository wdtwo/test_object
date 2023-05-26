
//内容缩放 移动端不同屏幕大小的缩放
(function($) {
	var autoScale = function() {
		//屏幕大小
		var winW = document.documentElement.clientWidth;
		var winH = document.documentElement.clientHeight;
		
		var scaleW = Math.min(winW,winH)/ 750;
		scaleW = Math.min (1,scaleW);
		var cssText = '-webkit-transform: scale(' + scaleW +');transform: scale(' + scaleW +');-webkit-transform-origin: top;transform-origin: top;';
		$('.wrap').attr('style', cssText);
	};
	autoScale();
})(jQuery);

$.fn.extend({
	lunpan:function(obj){
		var body = $('body'),
				lunpan = $('.lunpan'),
				lock = true,
				timer = null,
				end_deg = 0,
				start_deg = 0;
				
		var t = $(this);
		var zhizhen = t.find('.zhizhen');
		var zhuan = t.find('.zhuan');
		
		function ran_rotate(count,timer,deg_start,deg_end){
			var count     = count || 3,//默认旋转圈数
				  timer     = timer || 5000,	//默认旋转时间
				  deg_start = deg_start || 0,	//初始角度
					deg_end   = deg_end || 0;	//默认旋转角度
			//添加旋转动画
			zhuan.css({
				"transition":"all " + timer + "ms ease-in-out",
				"transform":"rotate(" + (count * 360 + deg_end) + "deg)",
				"-webkit-transition":"all " + timer + "ms ease-in-out",
				"-webkit-transform":"rotate(" + (count * 360 + deg_end) + "deg)"
			});
			//结束后的返回效果
			setTimeout(function(){
				zhuan.removeAttr('style').css({
					"transform":"rotate(" + deg_end + "deg)",
					"-webkit-transform":"rotate(" + deg_end + "deg)"
				});
				//alert(deg_end);	//结束的返回值
				prize(deg_end);
				lock = true;
			},timer + 300);
			
		}
		function start(end_deg){
			end_deg = end_deg;
			if(lock){
				lock = false;
				zhuan.removeAttr('style');
				ran_rotate(5,4000,start_deg,end_deg);	//最大旋转周期  旋转时间  初始位置 结束位置(可传入后台随机数,防止控制台修改随机方法)
				start_deg = end_deg;
			}
		}
		//实物
		function prizesw(name,tel){
			$(".prize-sw .name").html(name);
			$(".prize-sw .tel").html(tel);
			$(".prize-sw").show();
		}
		//积分
		function prizejf(num){
			$(".prize-jf .num").html(num);
			$(".prize-jf").show();
		}
		//优惠券
		function prizeyhq(num){
			$(".prize-yhq .num").html(num);
			$(".prize-yhq").show();
		}
		
		//返回获得奖品信息(取决于随机数)	逆时针计算角度
		function prize(number){
			var n = (number % 360);
			$(".prize").show();
			var str = '';
			if(n < 45 && n >= 0){
				//return '贷款支持';
				str = 8;
				prizesw('礼盒1',"1234")
			}
			if(n >= 45 && n < 90){
				//return '谢谢';
				str = 7;
				prizejf(200)
			}
			if(n >= 90 && n < 135){
				str = 6;
				prizeyhq(10)
			}
			if(n >= 135 && n < 180){
				str = 5;
				prizeyhq(8)
			}
			if(n >= 180 && n < 225){
				str = 4;
				prizesw('礼盒2',"7890")
			}
			if(n >= 225 && n <= 270){
				str = 3;
				prizejf(200)
			}
			if(n >= 270 && n <= 315){
				str = 2;
				prizeyhq(10)
			}
			if(n >= 315 && n <= 359){
				str = 1;
				prizeyhq(8)
			}
			window.setTimeout(function(){
				console.clear();
				console.log(str);
			},1000)
			return false;	//如果传入的number不是一个数字或者不符合范围要求则返回'谢谢'!
		}
		return {
			start : start
		}
	}
})

//隐藏弹窗
$(".prize .close,.prize .bg-shadow").on('click',function(){
	$(this).parents('.prize').hide();
	$(this).parents('.prize').find('.in').hide();
})
//后退
$(".go-back").on('click',function(){
	history.back();
})
//屏蔽缩放卡顿视觉
setTimeout(function(){
	$("body").show()
},200)
