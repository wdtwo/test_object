

// 语言选择
$('body').on('click',function(){
    if($('.language').hasClass("showlist")){
        $('.language').removeClass('showlist')
    }
})
$(".language dt").on('click',function(e){
    e.stopPropagation(); // 禁止冒泡
    if($('.language').hasClass("showlist")){
        $(this).parent().removeClass('showlist')
    }else{
        $(this).parent().addClass('showlist')
    }
})

$('.btn-menu').on('click',function(){
    $(".menu").addClass("curr")

})
$('.menu').on('click',function(e){
    e.stopPropagation()
    $(".menu").removeClass('curr')
    
})
