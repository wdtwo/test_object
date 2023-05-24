$(function(){
	var cvscreateImg = function(t,f){
		var t = t,f = f;
		//初始化图片
		var cvs = document.querySelector(t);
	    	cvs.width=510;
	    	cvs.height=510;
	    var ctx = cvs.getContext('2d');
	    var img = new Image();
	    	img.src = 'images/'+cvs.getAttribute('s');
	    img.onload = function (){
	    	window.setTimeout(function(){
	    		ctx.drawImage(img,0,0,cvs.width,cvs.height);
	    	},100);
	    }
		var inputObj = document.querySelector(f);
	    	inputObj.addEventListener('change',readFile,false);
		function readFile(){
		    var file = this.files[0];//获取input输入的图片
		    if(!/image\/\w+/.test(file.type)){
		        alert("请确保文件为图像类型");
		        return false;
		    }//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
		    var reader = new FileReader();
		    	reader.readAsDataURL(file);//转化成base64数据类型
		    reader.onload = function(e){
	            compressImg(this.result);
	        }
		}
		function drawToCanvas(imgData){
	     	var img = new Image();
	        img.src = imgData;
	        img.onload = function(){//必须onload之后再画
	            ctx.drawImage(img,0,0,cvs.width,cvs.height);
	            strDataURI = cvs.toDataURL();//获取canvas base64数据
	        }
		}
		function compressImg(imgData){
			var img = new Image();
			img.src = imgData;
			img.onload = function(){ 
				var scale = img.width / img.height;
				var w1,h1,a,b;
				if(scale <= 1){	//高的
					w1 = cvs.width;
					h1 = cvs.width * img.height / img.width;
					a = 0;
					b = -parseInt(h1 - cvs.height) / 2;
				}else{	//宽的
					w1 = cvs.height * img.width / img.height;
					h1 = cvs.height;
					a = -parseInt(w1 - cvs.width) / 2;
					b = 0;
				}
				ctx.fillStyle = '#fff';
				ctx.fillRect(0, 0, cvs.width, cvs.height); // canvas清屏
				ctx.drawImage(img, a, b, w1, h1); // 将图像绘制到canvas上  
				headImgData = cvs.toDataURL('image/png');
				console.log(headImgData);		//用户上传的头像base64
				return false;
			};
		}
	}
	var outPut = function(t){
		//初始化图片
		var t = t;
		var cvs = document.querySelector(t);
	    cvs.width=640;
	    cvs.height=1008;
	    ctx = cvs.getContext('2d');
	    
	    //随机数组随机评价start
	    var arrImg = [];
	    for(var i = 0;i < 9;i++){
	    	arrImg[i] = i;
	    }
	    for(var i = 0;i < 9;i++){
	    	arrImg.splice(Math.floor(Math.random()*9),0,arrImg.shift());
	    	arrImg.splice(Math.floor(Math.random()*9),0,arrImg.pop());
	    }
	    //随机数组随机评价end
	    var img_bg = new Image();
	    	img_bg.src = 'images/upimg_bg.jpg';
	    img_bg.onload = function (){
	    	drawImg(img_bg,0,0,640,1008);
	    	window.setTimeout(function(){
	    		var img_head = new Image();
			    	img_head.src = headImgData;
			    img_head.onload = function (){
			    	drawImg(img_head,100,150,444,444);
			    	window.setTimeout(function(){
			    		//写字方法
						function writing(text){
							var text = text || '无名大侠';
							ctx.font = 'bold 32px "microsoft yahei", Tahoma, Helvetica, Arial, sans-serif';
							ctx.fontWeight = 'lighter';
							ctx.fillStyle = '#2d3283';
							ctx.textBaseline = 'middle';//设置文本的垂直对齐方式
							ctx.textAlign = 'left'; //设置文本的水平对对齐方式
							ctx.fillText(text,110, 180);
						}
			    		writing($('#username').val());	//传入名称
			    		var img_1 = new Image();
			    			img_1.src = 'images/upimg_rq_' + arrImg[0] + '.png';
					    img_1.onload = function (){
					    	drawImg(img_1,0,660,320,70);
					    	window.setTimeout(function(){
					    		var img_2 = new Image();
							    	img_2.src = 'images/upimg_rq_' + arrImg[1] + '.png';
							    img_2.onload = function (){
							    	drawImg(img_2,0,730,320,70);
							    	window.setTimeout(function(){
							    		var img_3 = new Image();
									    	img_3.src = 'images/upimg_rq_' + arrImg[2] + '.png';
									    img_3.onload = function (){
									    	drawImg(img_3,0,800,320,70);
									    	window.setTimeout(function(){
									    		var img_4 = new Image();
											    	img_4.src = 'images/upimg_rh_' + arrImg[3] + '.png';
											    img_4.onload = function (){
											    	drawImg(img_4,320,660,320,70);
											    	window.setTimeout(function(){
											    		var img_5 = new Image();
													    	img_5.src = 'images/upimg_rh_' + arrImg[4] + '.png';
													    img_5.onload = function (){
													    	drawImg(img_5,320,730,320,70);
													    	window.setTimeout(function(){
													    		var img_6 = new Image();
															    	img_6.src = 'images/upimg_rh_' + arrImg[5] + '.png';
															    img_6.onload = function (){
															    	drawImg(img_6,320,800,320,70);
															    	window.setTimeout(function(){
															    		//生成图片
															    		compressImg(cvs.toDataURL('image/jpeg'));
															    	},50);
															    }
													    	},300);
													    }
											    	},300);
											    }
									    	},300);
									    }
							    	},300);
							    }
					    	},300);
					    }
			    	},300);
			    }
	    	},200);
	    }
	    //绘图方法
	    function drawImg(img,a,b,c,d){
    		ctx.drawImage(img,a,b,c,d);
        	strDataURI = cvs.toDataURL();
	    }
		//输出图片方法
		function compressImg(imgData){
			var img = $('<img />');
			img.attr('src',imgData);
			$('.outimg').append(img);
		}
	}
	var headImgData = '';	//头像全局对象（用于传递头像的data:base64）
	var createImg = new cvscreateImg('#cvs','#file');
	$('.createCvs').on('click',function(){
		if(headImgData){
			$('.wrap-bottom').show();
			$('.upimg').hide();
			$('body').addClass('color');
			var outImg = new outPut('#outcvs');
		}else{
			alert('请上传头像！');
		}
	})
});
