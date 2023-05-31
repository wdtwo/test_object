// let a = new datePicker({
//     dateDefault:"2023-01-06",//默认日期
//     callback:function(e){//回调函数
//         console.log(e);
//     }
// })



var datePicker = function(obj){
    var obj = obj || {}
    //保存选中的日期
    let dateSave = ""
    //引用插件
    let today;
    if(window.dayjs){
        today = dayjs(obj.dateDefault || Date());
    }else{
        console.warn("请引用dayjs")
        return false;
    }
    //设置默认值
    var settings = {
        dateDefault : today.format('YYYY-MM-DD')
    }
    dateSave = settings.dateDefault
    //回调函数
    let callback = obj.callback || function(){
        console.log("默认callback:",dateSave);
    }

    //新建时间插件容器
    let datePickerContent = document.createElement('div')
        datePickerContent.setAttribute('id','datepicker')

    //创建显示日期容器
    let dateShow = document.createElement('div')
        dateShow.setAttribute('class','date-show')
    //创建周排列容器
    let dateWeek = document.createElement('ul')
        dateWeek.setAttribute('class','date-week')
    //创建日期容器
    let dateDay = document.createElement('ul')
        dateDay.setAttribute('class','date-day')


    //添加左按钮
    let leftBtn = document.createElement('div')
        leftBtn.setAttribute('class',"btn-left")
    //添加右按钮
    let rightBtn = document.createElement('div')
        rightBtn.setAttribute('class',"btn-right")
    //添加日期显示
    let dateText = document.createElement('div')
        dateText.setAttribute('class',"date-text")
    dateShow.appendChild(leftBtn)
    dateShow.appendChild(dateText)
    dateShow.appendChild(rightBtn)
    

    //左按键添加事件
    leftBtn.addEventListener('click',function(){
        setNowDate(-1)
        callback('点击了前一个月')
    })
    //右按键添加事件
    rightBtn.addEventListener('click',function(){
        setNowDate(1)
        callback('点击了后一个月')
    })
    function setNowDate(num){
        //移除已有的标签
        function empty(){
            if(dateDay.firstChild){
                dateDay.removeChild(dateDay.firstChild)
                empty()
            }
        }
        empty()
        
        //前一个月
        if(num < 0) today = today.subtract(1, 'month')
        //后一个月
        if(num > 0) today = today.add(1, 'month')
        //添加显示的时间
        dateText.innerHTML = today.format('YYYY-MM-DD')

        //获取当前月份第一天是星期几
        let nowWeek = today.startOf('month').day()
        //console.log(nowWeek);
        nowWeek = nowWeek <= 6 ? nowWeek : 0
        //获取当前月有多少天
        let daysLen = today.daysInMonth()

        //添加前空白占位
        addDaysEle(nowWeek,false,'disabled')
        //添加日期
        addDaysEle(daysLen,true,'')
        //添加后空白占位
        let a1 = (daysLen + nowWeek) % 7 != 0 ? (7 - (daysLen + nowWeek) % 7) : 0
        addDaysEle(a1,false,'disabled')
    }
    setNowDate()
    

    //添加日元素
    function addDaysEle(len,showText,className){
        let eleArr = []
        for(let a = 1;a <= len;a++){
            //是否显示内容
            let v = showText ? addZero(a) : ""
            let ele = document.createElement('li')
            eleArr.push(ele)
            ele.innerHTML = v
            //是否添加class
            ele.setAttribute('class',className)
            //默认选中当前日
            if(v == today.date()){
                ele.setAttribute('class',"active")
            }
            dateDay.appendChild(ele)
            ele.addEventListener('click',function(){
                //判断是否为禁用状态
                if(!ele.getAttribute("class").includes("disabled")){
                    //取消所有选中状态
                    for(let a of eleArr){
                        a.setAttribute('class',"")
                    }
                    //给点击的添加选中状态
                    this.setAttribute('class',"active")

                    //更改日期
                    today = today.date(v)
                    dateText.innerHTML = today.format('YYYY-MM-DD')
                    callback(today.format('YYYY-MM-DD'))
                }
            })

        } 
    }
    //补0
    function addZero(num){
        let len = new Array(2 - num.toString().length)
        len.push(num)
        return len.join('0')
    }
    //创建周内容
    let week = ["日","一","二","三","四","五","六"]
    for(let a of week){
        let ele = document.createElement('li')
        ele.innerHTML = a
        dateWeek.appendChild(ele)
    }

    //添加三层容器
    datePickerContent.appendChild(dateShow)
    datePickerContent.appendChild(dateWeek)
    datePickerContent.appendChild(dateDay)
    //添加到网页内
    document.body.appendChild(datePickerContent)


}



















