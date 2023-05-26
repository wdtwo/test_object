$(function(){	
	
	//图片上传方法
	var cvsCreateImg = function(t,f){
		var t = t,
			f = f;
		var cvs = document.querySelector(t);
	    	cvs.width=510;
	    	cvs.height=510;
	    var ctx = cvs.getContext('2d');
	    drawImg('images/'+cvs.getAttribute('s'),[0,0,cvs.width,cvs.height]);
	    //绘图方法 没啥可说的
	    function drawImg(src,arr){
	    	var img = new Image();
		    	img.src = src;
			    img.onload = function (){
			    	window.setTimeout(function(){
			    		ctx.drawImage(img,arr[0],arr[1],arr[2],arr[3]);
			    	},10);
			    }
	    }
		function rotateImg(img,x,y,w,h,deg){
			ctx.save();
			ctx.translate(cvs.width/2,cvs.height/2);
			ctx.rotate(deg * Math.PI / 180);
			ctx.drawImage(img,x - cvs.width/2,y - cvs.height/2,w,h);
			ctx.translate(0,-cvs.width);
			ctx.restore();
		}
	    //上传控件绑定
		document.querySelector(f).addEventListener('change',function readFile(e){
		    var file = this.files[0];
		    if(!/image\/\w+/.test(file.type)){
		        alert("请确保文件为图像类型");
		        return false;
		    }
			var orient = 0;
			EXIF.getData(e.target.files[0], function() {
		         orient = EXIF.getTag(this, 'Orientation');
		    });
		    var reader = new FileReader();
		    	reader.readAsDataURL(file);
		    	reader.onload = function(){
	            	compressImg(this.result,orient);
	        	}
		},false);
		function imgDir(img){
			var scale = img.width / img.height;
			var x,y,w,h;
			if(scale <= 1){	
				w = cvs.width;
				h = cvs.width * img.height / img.width;
				x = 0;
				y = -parseInt(h - cvs.height) / 2;
			}else{
				w = cvs.height * img.width / img.height;
				h = cvs.height;
				x = -parseInt(w - cvs.width) / 2;
				y = 0;
			}
			return {
				x:x,y:y,w:w,h:h
			};
		}
		//输出图片base64
		function compressImg(imgData,orient){
			var img = new Image();
				img.src = imgData;
				img.onload = function(){ 
					clearCvs();
					var dir = imgDir(img);
					if(orient == 1 || orient == undefined){
						ctx.drawImage(img, dir.x, dir.y, dir.w, dir.h);
					}else{
						switch(orient){  
	                        case 6:
	                            rotateImg(img, dir.x, dir.y, dir.w, dir.h,90);
	                            break;  
	                        case 8:
	                            rotateImg(img, dir.x, dir.y, dir.w, dir.h,-90);
	                            break;  
	                        case 3:
	                            rotateImg(img, dir.x, dir.y, dir.w, dir.h,180);
	                            break;  
	                    }      
					}
					$('.upimg .reset_img').show();//显示重置按钮
					headImgData = cvs.toDataURL('image/png');
					alert(headImgData);
					document.write(headImgData);
					return false;
				};
		}
		function clearCvs(){
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, cvs.width, cvs.height);
		}
	}
	//生成反差萌图片方法
	var outPut = function(t){
		var t = t;
		var cvs = document.querySelector(t);
		    cvs.width=640;
		    cvs.height=1048;
	    var ctx = cvs.getContext('2d');
	   	var arrImg = numRandom(9);
	    function numRandom(n){
	    	var arr = [];
		    for(var i = 0;i < n;i++){
		    	arr[i] = i;
		    }
		    for(var i = 0;i < n;i++){
		    	if(Math.random() > .5){
		    		arr.unshift(moveArr());
		    	}else{
		    		arr.push(moveArr());
		    	}
		    }
		    function moveArr(){
		    	return arr.splice(Math.floor(Math.random()*(arr.length - 1)),1);
		    }
		    return arr;
	    }
	    var count = 0,
    		arr = [
    		[0,0,640,1048],
    		[100,150,444,444],
	    	[0,660,320,70],
	    	[0,730,320,70],
	    	[0,800,320,70],
	    	[320,660,320,70],
	    	[320,730,320,70],
	    	[320,800,320,70]
    	];
	    function imgToCvs(arr,count){
	    	var img = new Image();
		    	if(count == 0){
		    		img.src = 'images/upimg_bg.jpg';
		    	}else if(count == 1){
		    		img.src = headImgData;
		    	}else if(count > 1 && count < 5 ){
		    		img.src = 'images/upimg_rq_' + arrImg[(count - 2)] + '.png';
		    	}else {
		    		img.src = 'images/upimg_rh_' + arrImg[(count - 2)] + '.png';
		    	}
		    img.onload = function (){
		    	drawImg(img,arr[count][0],arr[count][1],arr[count][2],arr[count][3]);
		    	window.setTimeout(function(){
		    		if(count >= arr.length - 1){
		    			writing($('#username').val());
		    			$('.outimg .reset_img').show();
		    			window.setTimeout(function(){
			    			compressImg(cvs.toDataURL('image/jpg'));
		    			},50)
		    			return false;
		    		}else{
		    			count++;
		    			imgToCvs(arr,count);
		    		}
		    	},300);
		    }
	    }
	    imgToCvs(arr,count);
	    function drawImg(img,x,y,w,h){
    		ctx.drawImage(img,x,y,w,h);
	    }
		function writing(text){
			var text = text || '无名大侠';
			ctx.font = 'bold 32px "microsoft yahei", Tahoma, Helvetica, Arial, sans-serif';
			ctx.fontWeight = 'lighter';
			ctx.fillStyle = '#2d3283';
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'left';
			ctx.fillText(text,110, 180);
		}
		function compressImg(imgData){
			var img = $('<img />');
			img.attr('src',imgData);
			$('.outimg').append(img);
		}
	}
	var headImgData = '';
	var createImg = new cvsCreateImg('#cvs','#file');//创建上传头像对象
	//生成反差萌事件
	$('.createCvs').on('click',function(){
		if(headImgData){
			$('.wrap-bottom').show();
			$('.upimg').hide();
			$('body').addClass('color');
			var outImg = new outPut('#outcvs');//创建反差萌图片对象
		}else{
			alert('请上传头像！');
		}
	})
});
