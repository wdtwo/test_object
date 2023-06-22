/* 初始化副导航按钮 */
$(".con-tabs a[target=frame-0]").on('click',function(){
	var t = $(this);
	t.parent().addClass('active').siblings().removeClass('active');
	iframeChange(0);
	return false;
})

/* 阻止左侧菜单a标签默认行为 并执行相应代码 */
$("a[target='_blank']").on('click',function(){
	var t = $(this);
	var title  = t.find('span').html(),
		iframe = t.data('iframe'),
		url    = t.attr('href');
	var con_tabs  = $(".con-tabs");//副菜单容器
	var site_page = $(".site-page");//iframe外层容器
	/* 判断是否存在（页面已经存在iframe） */
	if(con_tabs.find(`[target=frame-${iframe}]`).attr('target')){
		/* 存在就切换 */	
		navChange(iframe);
		iframeChange(iframe);
	}else{
		/* 添加iframe */
		$(".page-container iframe").removeClass('active');
		iframeCreate(url,iframe);
		/* 添加副菜单按钮 */
		$(".con-tabs li").removeClass('active');
		navCreate(url,iframe,title);
		con_tabs_w();
		btn_show();
	}
	return false;
})

/* 创建副导航按钮并添加事件*/
function navCreate(url,iframe,title){
	var ele = `
		<li class="active">
			<a 
				href="${url}"
				data-url="" 
				target="frame-${iframe}" 
				title="${title}" 
				rel="contents">
				<span>${title}</span>
				<i class="icon wb-close-mini"></i>
			</a>
		</li>
	`;
	$(".con-tabs").append(ele);
	$(`.con-tabs a[target=frame-${iframe}]`).on('click',function(){
		var t = $(this);
		var id = t.attr('target').split('-')[1];
		t.parent().addClass('active').siblings().removeClass('active');
		iframeChange(id);
		menuSetActive(id);
		
		return false;
	})
	/* 副导航关闭按钮 */
	$(`.con-tabs a[target=frame-${iframe}] i`).on("click",function(){
		var t = $(this);
		var li = t.parents('li');
		var id = t.parent().attr('target').split('-')[1];
		
		/* 判断自己是否是当前选中状态 如果不是则只做删除操作 */
		if(t.parents('li').hasClass('active')){
			var prev_id = li.prev().find('a').attr('target').split('-')[1];
			navDel(id);//删除按钮
			iframeChange(prev_id);
			li.prev().addClass('active');
			menuSetActive(prev_id);
		}
		li.remove();
		iframeDel(id);
		
		con_tabs_w();
		btn_show();
		
		return false;
	})
}

/*删除副导航按钮*/
function navDel(id){
	$(".site-page").find(`iframe[name=frame-${id}]`).remove();
}

/* 副导航按钮切换*/
function navChange(id){
	$(".con-tabs").find('a').parent().removeClass('active');
	$(".con-tabs").find(`a[target=frame-${id}]`).parent().addClass('active');
}
/* 创建iframe*/
function iframeCreate(url,iframe){
	$(".page-container").append(`
		<iframe 
			src="${url}" 
			frameborder="0" 
			name="frame-${iframe}" 
			class="page-frame animation-fade active">
		</iframe>
	`);
}
/*删除iframe*/
function iframeDel(id){
	$(".page-container iframe[name=frame-"+id+"]").remove();
}
/*切换iframe*/
function iframeChange(id){
	$(".site-page").find(`iframe[name=frame-${id}]`).addClass('active').siblings().removeClass('active');
}

/* 菜单高亮 */
$(".site-menu-item").on('hover',function(){
	$(this).addClass('hover');
})
/* 菜单点击 */
$(".site-menu-item").on('click',function(){
	var t = $(this);
	var has = t.hasClass('open');
	t.siblings().removeClass('open');
	!has ? t.addClass('open') : t.removeClass('open');
})
/* 左侧菜单点击后选中状态 */
$(".site-menu-item a[target]").on('click',function(){
	var t = $(this);
	t.parents('.site-menu').find('a').parent().removeClass('active');
	t.parents('li').addClass('active');
})

/* 副导航，当前页面操作*/
/* 刷新 */
$(".dropdown-item.reload-page").on('click',function(){
	var ele = $(".site-page iframe.active");
	$(".site-page .page-container").append(ele.clone());
	ele.remove();
})
/* 关闭其他 */
$(".dropdown-item.close-other").on('click',function(){
	$(".con-tabs li.active a").parent().siblings(':not(:first-child)').remove();
	$(".site-page iframe.active").siblings(':not(:first-child)').remove();
	var id = $(".con-tabs li.active a").attr('target').split('-')[1];
	//console.log(id);
	nav2_move(0);
	btn_show();
	
	menuSetActive(id);
})
/* 关闭所有 */
$(".dropdown-item.close-all").on('click',function(){
	$(".con-tabs li:not(:first-child)").remove();
	$(".site-page iframe:not(:first-child)").remove();
	$(".con-tabs li").addClass('active');
	$(".site-page iframe").addClass('active');
	nav2_move(0);
	btn_show();
	
	menuSetActive(undefined);
})

/*左右切换按钮*/
function nav2_func(){
	var prev  = $("#nav2_prev"),
		next  = $("#nav2_next");
	var index = 0;
	prev.on('click',function(){
		if(index > 0){
			index--;
			nav2_move(index);
		}
	})
	next.on('click',function(){
		var w = $(".contabs-scroll").width();
		/* 最后留几个显示 */
		if(index < $(".con-tabs li").length-(Math.floor(w/105))){
			index++;
			nav2_move(index);
		}
	})
}
nav2_func();

/* 执行点击后的移动操作 */
function nav2_move(index){
	$(".con-tabs").css('left',`-${index*105}px`);
}

/* 副导航盒子宽度 */
function con_tabs_w(){
	$(".con-tabs").width($(".con-tabs li").length * 105);
}
/* 操作按钮显示隐藏 */
function btn_show(){
	var prev = $("#nav2_prev"),
		next = $("#nav2_next");
	if($(".con-tabs li").length * 105 > $(".contabs-scroll").width()){
		prev.removeClass('hide');
		next.removeClass('hide');
		//console.log('显示');
	}else{
		prev.addClass('hide');
		next.addClass('hide');
		//console.log('隐藏');
	}
}

/* 左侧菜单设置当前选中项 */
function menuSetActive(e){
	$(".tab-pane .active").removeClass('active');
	$(".tab-pane .open").removeClass('open');
	if(e){
		var ele = $(`.tab-pane li a[data-iframe=${e}]`);
		ele.parent('li').addClass('active');
		ele.parents('li').addClass('open');
	}
}

$(".hamburger").on('click',function(){
	var t = $(this);
	if(t.hasClass("hided")){
		t.removeClass('hided')
		$(".site-menubar").addClass('show');
	}else{
		t.addClass('hided')
		$(".site-menubar").removeClass('show');
	}
})




