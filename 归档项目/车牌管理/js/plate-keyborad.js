//车牌键盘
let plateKeyBorad =  function(func){
    //绑定显示的元素
    let ele = document.createElement('div')
        ele.setAttribute('id',"plate-keyborad")

    let arrArea = '京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使';
    let arrLetter = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    //保存车牌数据
    let plateStr = []
    let keyboradArea = document.createElement('div')
        keyboradArea.setAttribute('class',"keyborad-area")
    //生成地区键盘的内容
    for(a of arrArea){
        let e = document.createElement('div')
        let o = a
        e.innerHTML = o
        e.addEventListener('click',function(){
            judgePlateLen(o)
        })
        keyboradArea.appendChild(e)
    }
    //占位好看
    for(a of "ABCDEF"){
        let e = document.createElement('div')
        e.innerHTML = a
        e.setAttribute('class',"disabled")
        keyboradArea.appendChild(e)
    }
    //添加删除按钮
    let areaDel = document.createElement('div')
        areaDel.setAttribute('class',"del")
        areaDel.addEventListener('click',function(){
            delPlate()
        })
    keyboradArea.appendChild(areaDel)

    let keyboradLetter = document.createElement('div')
        keyboradLetter.setAttribute('class',"keyborad-letter ")
    //生成字母键盘的内容
    for(a of arrLetter){
        let e = document.createElement('div')
        let o = a
        e.innerHTML = a
        //车牌内没有的字母
        if(["I","O"].includes(a)){
            e.setAttribute('class',"disabled")
        }else{
            e.addEventListener('click',function(){
                judgePlateLen(o)
            })
        }
        keyboradLetter.appendChild(e)
    }
    //添加删除按钮
    let letterDel = document.createElement('div')
        letterDel.setAttribute('class',"del")
        letterDel.addEventListener('click',function(){
            delPlate()
        })
    keyboradLetter.appendChild(letterDel)

    //把元素添加到页面中
    ele.appendChild(keyboradArea)
    ele.appendChild(keyboradLetter)
    document.body.appendChild(ele)

    function judgePlateLen(letter){
        if(changeWait){
            plateStr[changeNum] = letter
            //console.log(plateStr);
            if(func.callback){
                func.callback({list:plateStr})
            }else{
                callback({type:plateStr})
            }
            changeWait = false
            return false;
        }
        //如果有则是添加 如果没有则是删除
        
        //添加完成以后点击数组也不会增加了
        if(plateStr.length >= 8){
            console.log('新能源车添加完成');
            if(letter){
                plateStr[plateStr.length-1] = letter
            }
        }else{
            if(letter){
                //向数组中添加新字符
                plateStr.push(letter)
            }
        }
        if(plateStr.length == 7){
            console.log('燃油车添加完成');
        }
        if(plateStr.length <= 0){
            keyboradLetter.style.display = "none"
            keyboradArea.style.display = "flex"
        }
        //如果长度大于1则显示字母键盘
        if(plateStr.length >= 1){
            keyboradArea.style.display = "none"
            keyboradLetter.style.display = "flex"
        }
        //console.log(plateStr);
        if(func.callback){
            func.callback({list:plateStr})
        }else{
            callback({type:plateStr})
        }
    }
    //删除最后一位
    function delPlate(){
        plateStr.pop()
        judgePlateLen()
    }
    //回调
    function callback(obj){
        console.log(obj.plateStr);
    }
    //点击了元素开始等待更改单个数据更改完了以后改回状态
    let changeWait = false
    let changeNum = -1
    //更改车牌
    function change(num){
        changeNum = num
        changeWait = true
        if(num <= 0){
            keyboradLetter.style.display = "none"
            keyboradArea.style.display = "flex"
        }else{
            keyboradArea.style.display = "none"
            keyboradLetter.style.display = "flex"
        }
    }
    return {
        change
    }
}