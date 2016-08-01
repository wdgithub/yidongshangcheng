
window.onload=function(){

//移动选项卡
xuanxiangka(".denglu1",".denglu2")
xuanxiangka(".box1_2",".box1_zi");
	function xuanxiangka(obj,val){
	var arr = $(obj);
	var item = $(val);
	
	for(var i=0;i<arr.length;i++){
		arr[i].index = i;
		arr[i].onmouseover = function(){
			item[this.index].style.display = "block";	
		}
		arr[i].onmouseout = function(){
			item[this.index].style.display = "none";	
		}
		
		}
	}

//轮播
	wflunbo(".banner_zj")
	function wflunbo(win){
		/* 无缝轮播
	num		记录当前窗口的图片
	next    记录即将显示图片
	在动画之前下一张图片就位   left=widths
	num   left=-widths
	next  left=0
	num=next
	*/
	var win=$(win)[0];
	var as=$("a",win);
	var lis=$("li",win);
	var btnL=$(".btnL",win)[0];
	var btnR=$(".btnR",win)[0];
	//开关
	var flag=true;
	//获取图片的宽
	var widths=parseInt(getStyle(as[0],"width"));
	console.log(widths);
	//双下标
	var num=0;
	var next=0;

	//初始状态
	for(var i=0;i<as.length;i++){
		if(i==0){
			continue;
		}
		as[i].style.left=widths+"px";
	}	
	//时间间隔
	var t=setInterval(lunbo,2000);
	//函数
	function lunbo(){

		next++;
		//判断下标是否超出
		if(next==as.length){
			next=0;
		}
		//就位
		as[next].style.left=widths+"px";
		//按钮
		lis[num].className="";//初始化类的名字
		lis[next].className="hot";
		//动画
		animate(as[num],{left:-widths});
		animate(as[next],{left:0},function(){
			flag=true;
		});
		//更新一下下标
		num=next;

	}
function lunbo2(){

		next--;
		//判断下标是否超出
		if(next<0){
			next=as.length-1;
		}
		//就位
		as[next].style.left=-widths+"px";
		//按钮
		lis[num].className="";//初始化类的名字
		lis[next].className="hot";
		//动画
		animate(as[num],{left:widths});
		animate(as[next],{left:0},function(){
			flag=true;
		});
		//更新一下下标
		num=next;

	}

	win.onmouseover=function(){
		clearInterval(t);
	}
	win.onmouseout=function(){
		t=setInterval(lunbo,2000);
	}
	//点击选项卡
	for(var i=0;i<as.length;i++){
		lis[i].index=i;
		// console.log(lis[i].index);
		lis[i].onclick=function(){
			if(num==this.index){
				return;
			}
		
			if(num<this.index){
				as[this.index].style.left=widths+"px";
				animate(as[num],{left:-widths});
			}else if(num>this.index){
				as[this.index].style.left=-widths+"px";
				animate(as[num],{left:widths});
			}
			

				animate(as[this.index],{left:0});
				

				lis[num].className="";//初始化类的名字
				lis[this.index].className="hot";

				num=this.index;
				next=this.index;
			
		}
	}



	//左右按钮
	btnR.onclick=function(){
		if(flag){
			flag=false;
			lunbo();
		}
		
	}
	btnL.onclick=function(){
		if(flag){
			flag=false;
			lunbo2();
		}
	}
	}

//滚动	
	Nodelunbo(".tu4_box",1)
	function Nodelunbo(obj,num){
		var roll=$(obj)[0];

		var gundong = $(".tu4_hezi",roll)[0];
		
		var img =$(".f_left",gundong);

		var btnL1 = $(".last1",roll)[0];

		var btnR1 = $(".next1",roll)[0];
		var flag1 = true;
		var widths = parseInt(getStyle(img[0],"width"))+10;
		// console.log(widths);
		var t=setInterval(moveeR,2000);
		roll.onmouseover = function(){
			clearInterval(t);
		}
		roll.onmouseout = function(){
			t = setInterval(moveeL,2000);
		}



		btnR1.onclick = function(){
			// alert(1);
			if(flag1){
				flag1 = false;
				moveeL();
			}
	
		}

		btnL1.onclick = function(){
			if(flag1){
				flag1 = false;
				moveeR();
			}
	
		}
		gundong.style.width = img.lenght * widths+"px";
		function moveeL(){
			
			animate(gundong,{left:-num*widths},function(){
				for(var i = 0;i<num;i++){
					var first = this.getChild()[0];
					gundong.appendChild(first);
					gundong.style.left = 0;
				}
				flag1 = true;
			});

		}
		function moveeR(){
			var last = gundong.lastChild1();
			// console.log(last);
			gundong.insertFirst(last);
			gundong.style.left = -num*widths+"px";
			animate(gundong,{left:0},function(){
				flag1 = true;
			});
		}
	}

	fangda(".btns")
	function fangda(obj){
		var win=$(obj)[0];
		
		var img=$("img",win);
		var widths = parseInt(getStyle(img[0],"width"));
		console.log(widths);
		for(var i=0;i<img.length;i++){
			// console.log(img[i]);
			img[i].index=i//!!!!!!!!!!!!!!!!!
			img[i].onmouseover = function(){
				animate(img[this.index],{width:widths+10,height:widths+10});
			}

			// console.log(img[i]);
			img[i].onmouseout = function(){
				animate(img[this.index],{width:widths,height:widths});
			}

			
		}
		
	}


	//移动
	yidong(".xiamian")
	function yidong(obj){
		var win=$(obj)[0];
		
		var img=$("a",win);
		console.log(img);
		for(var i=0;i<img.length;i++){
			img[i].index=i;
			console.log(img[i].index)
			img[i].onmouseover = function(){
			animate(img[this.index],{right:50});

		}
			img[i].onmouseout = function(){
			animate(img[this.index],{right:0},Tween.Linear);
		}
		}
		
	}
}




