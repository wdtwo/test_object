//绑定方法
var handleTouchEvent = function(id){

	var pos = 2;	//0 通用 1 水平 2垂直



	var ele = document.getElementById(id);
	//判断时候发支持touch
	var touch_bool = ('ontouchstart' in document) ? true :false;
	//console.log(touch_bool);	//测试 ==> true
	var touch_start,touch_move,touch_end;
	var touch_start_x = 0,touch_start_y = 0,
		touch_move_x = 0,touch_move_y = 0,
		touch_distance_x = 0,touch_distance_y = 0;
	var pc_lock = false;	//pc端移动事件锁
	//事件类别
	if(touch_bool){
		touch_start = 'touchstart',
		touch_move = 'touchmove',
		touch_end = 'touchend';
	}else{
		touch_start = 'mousedown',
		touch_move = 'mousemove',
		touch_end = 'mouseup';
	}

	//事件绑定
	ele.addEventListener(touch_start,touch_start_fun,false);
	ele.addEventListener(touch_move,touch_move_fun,false);
	ele.addEventListener(touch_end,touch_end_fun,false);

	//执行方法
	//按下方法获取坐标
	function touch_start_fun(event){
		if(touch_bool){
			touch_start_x = parseInt(event.touches[0].clientX);
			touch_start_y = parseInt(event.touches[0].clientY);
		}else{
			touch_start_x = parseInt(event.clientX);
			touch_start_y = parseInt(event.clientY);
		}
		pc_lock = true;
	}
	//移动坐标获取
	function touch_move_fun(event){
		if(pc_lock){
			if(touch_bool){
				touch_move_x = parseInt(event.changedTouches[0].clientX);
				touch_move_y = parseInt(event.changedTouches[0].clientY);
			}else{
				touch_move_x = parseInt(event.clientX);
				touch_move_y = parseInt(event.clientY);
			}
			move();
		}
	}
	function move(){
		ele.removeAttribute('style');
		touch_distance_x = (pos == 0 || pos == 1) ? (touch_move_x - touch_start_x) : 0;
		touch_distance_y = (pos == 0 || pos == 2) ? (touch_move_y - touch_start_y) : 0;
		//ele.innerHTML =  ((touch_move_x - touch_start_x) + ',' + (touch_move_y - touch_start_y));
		ele.style.left = touch_distance_x + 'px';
		ele.style.top = touch_distance_y + 'px';
	}

	//抬起方法
	function touch_end_fun(event){
		pc_lock = false;
		dir(touch_distance_x,touch_distance_y);
		ele.setAttribute('style','transition:all ease 500ms');
		ele.style.left = 0;
		ele.style.top = 0;
	}
	function dir(x,y){
		if(x > 50){
			ele.innerHTML = ('向右');
		}
		if(x < -50){
			ele.innerHTML = ('向左');
		}
		if(y > 50){
			ele.innerHTML = ('向下');
		}
		if(y < -50){
			ele.innerHTML = ('向上');
		}
	}






}













window.onload = function(){
	//实例化
	var tocuh_1 = new handleTouchEvent('touch_1');
}
