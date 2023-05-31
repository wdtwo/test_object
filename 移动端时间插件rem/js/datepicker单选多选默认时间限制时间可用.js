// let a = new datePicker({
//     dateDefault:"2023-04-08",//默认日期
//     dateStart:"2023-03-31",//开始日期
//     dateEnd:"2023-04-20",//结束日期
//     disabled:[],//禁用的时间
//     multiple:1,//多选 1是单选 
//     callback:function(e){
//         console.log(e);
//     }
// })



var datePicker = function(obj){
    var obj = obj || {}
    //多选保存选中的日期
    let dateSave = []
    //引用插件
    let today;
    //多选还是单选
    let multiple = obj.multiple || 1;
    //开始时间和结束时间
    let dateStart = obj.dateStart || "1970-01-01";
    let dateEnd = obj.dateEnd || "2099-12-31";

    //回调函数
    let callback = obj.callback || function(){
        console.log("默认callback");
    }
    if(window.dayjs){
        //设置默认值
        today = dayjs(obj.dateDefault || Date());
        //默认添加选中值
        dateSave.push(today.format('YYYY-MM-DD'))
       
    }else{
        console.warn("请引用dayjs")
        return false;
    }
    //-----------默认参数------------





    

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
        if(!this.getAttribute('class').includes('disabled')){
            setNowDate(-1)
            callback('点击了前一个月')
        }
        
    })
    //右按键添加事件
    rightBtn.addEventListener('click',function(){
        if(!this.getAttribute('class').includes('disabled')){
            setNowDate(1)
            callback('点击了后一个月')
        }
    })
    function setNowDate(num){

        //前一个月
        if(num < 0 && today.startOf('month').valueOf() > dayjs(dateStart).startOf('month').valueOf()){
            today = today.subtract(1, 'month')
        }
        //后一个月
        if(num > 0){
            today = today.add(1, 'month')
        }

        //移除已有的标签
        function empty(){
            if(dateDay.firstChild){
                dateDay.removeChild(dateDay.firstChild)
                empty()
            }
        }
        empty()
        
        
        //添加显示的时间
        //如果多选则不显示日
        dateText.innerHTML = multiple <= 1 ? today.format('YYYY-MM-DD') : today.format('YYYY-MM')
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
        addDaysEle((daysLen + nowWeek) % 7 != 0 ? (7 - (daysLen + nowWeek) % 7) : 0,false,'disabled')
        
        //翻页按钮是否可以点击
        if(today.startOf('month').valueOf() > dayjs(dateStart).startOf('month').valueOf()){
            leftBtn.setAttribute('class',"btn-left")
        }else{
            leftBtn.setAttribute('class',"btn-left disabled")
        }
        //翻页按钮是否可以点击
        if(today.startOf('month').valueOf() < dayjs(dateEnd).startOf('month').valueOf()){
            rightBtn.setAttribute('class',"btn-right")
        }else{
            rightBtn.setAttribute('class',"btn-right disabled")
        }
        if(multiple <= 1){
            dateSave[0] = today.format('YYYY-MM-DD')
            callback(dayjs(dateSave[0]).valueOf() > dayjs(dateStart).valueOf() ? dateSave[0] : "")
        }else{
            callback( dateSave)
        }
        
    }
    setNowDate()
    

    //添加日元素
    function addDaysEle(len,showText,className){
        let eleArr = []

        //根据开始日期判断锁定的日期
        //console.log(dateStart);
        let disleft,disright;
        if(showText){
            if(dayjs(dateStart).format("YYYY-MM") == today.format('YYYY-MM')){
                disleft = dayjs(dateStart).date()
            }
            if(dayjs(dateEnd).format("YYYY-MM") == today.format('YYYY-MM')){
                disright = dayjs(dateEnd).date()
            }
        }
        
        for(let a = 1;a <= len;a++){
            //是否显示内容
            let v = showText ? addZero(a) : ""
            let ele = document.createElement('li')
            eleArr.push(ele)
            ele.innerHTML = v
            //是否添加class
            ele.setAttribute('class',className)
            //如果超过最大范围则禁用
            if((disleft && v <= disleft) || (disright && v > disright)){
                ele.setAttribute('class',"disabled")
            }
            if(multiple <= 1){
                //单选默认值精确到日
                if(v == today.date()){
                    ele.setAttribute('class',"active")
                    
                    if(dateStart.includes(today.format('YYYY-MM')) && v <= dayjs(dateStart).date()){
                        ele.setAttribute('class',"active disabled")
                    }
                }
            }else{
                //多选默认值精确到年月日
                if(dateSave.includes(`${today.format('YYYY-MM')}-${v}`)){
                    ele.setAttribute('class',"active")
                }
            }
            
            dateDay.appendChild(ele)
            ele.addEventListener('click',function(){
                //判断是否为禁用状态
                if(!ele.getAttribute("class").includes("disabled")){
                    if(multiple <= 1){
                        //单选
                        //取消所有选中状态
                        for(let a of eleArr){
                            //如果本来就是锁定的继续锁定 没有锁定的为空
                            a.setAttribute('class',a.getAttribute('class').includes('disabled') ? "disabled":"")
                        }
                        //给点击的添加选中状态
                        this.setAttribute('class',"active")
                        //更改日期
                        today = today.date(v)
                        dateText.innerHTML = today.format('YYYY-MM-DD')
                        callback(dateText.innerHTML)
                    }else{
                        //多选
                        //如果当前已经被选中 那么则取消选中
                        let index = dateSave.indexOf(today.date(v).format('YYYY-MM-DD'))
                        //console.log(index);
                        if(index >= 0){
                            //删除找到的元素
                            dateSave.splice(index,1)
                            //给点击的删除选中状态
                            this.setAttribute('class',"")
                        }else{
                            //如果超过了最大值则不可点击
                            if(dateSave.length < multiple){
                               //给点击的添加选中状态
                                this.setAttribute('class',"active")
                                //更改日期
                                today = today.date(v)
                                dateText.innerHTML = today.format('YYYY-MM')
                                dateSave.push(today.format('YYYY-MM-DD'))
                            }
                            
                        }
                        callback(dateSave)
                    }
                   
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



















