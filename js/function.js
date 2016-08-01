//兼容className的获取
function getClass(classname,range){
	var range=range?range:document;
	if(document.getElementsByClassName){
		return range.getElementsByClassName(classname);
	}else{
		var all=range.getElementsByTagName("*");
		
		var arr=[];
		for(var i=0;i<all.length;i++){
			var str=all[i].className;
			if(checkClass(str,classname)){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}

function checkClass(str,classname){
	var arr=str.split(" ");

	for(var i=0;i<arr.length;i++){
		if(arr[i]==classname){
			return true;
		}
	}
	return false;
}

/*getContent(obj,[val])
获取或者是设置元素的文本
思路：
	1、判断浏览器
	2、判断第二个参数
	3、获取文本或者是设置文本*/
function getContent(obj,val){
	if(obj.textContent){

		if(val){
			obj.textContent=val;
		}else{
			return obj.textContent;
		}
	}else{

		if(val){
			obj.innerText=val;
		}else{
			return obj.innerText;
		}
	}
}




/*getStyle(obj,arrt)
思路：
	1、判断浏览器 obj.currentStyle
	2、ie6~8 对象.currentStyle.属性;
	3、w3c  getComputedStyle(对象,null).属性*/

function getStyle(obj,arrt){
	if(obj.currentStyle){	
		return obj.currentStyle[arrt];
	}else{
		return getComputedStyle(obj,null)[arrt];
	}
}


/*$(select)
字符串
	$(".one") 通过className获取元素
	$("#one") 通过id获取元素
	$("div")  通过标签获取元素
	$("<div>") 创建一个div
函数   window.onload=function(){}

思路：
	1、判断参数的第一个字符       str.charAt()
	2、根据字符执行相应的分支
		返回相应的元素*/

function $(select,content){
	if(typeof select=="string"){
		var content=content?content:document;
		var frist=select.charAt(0);

		if(frist=="#"){
			//id   
			return content.getElementById(select.substring(1));

		}else if(frist=="."){
			//className  类
			return getClass(select.substring(1),content);

		}else if(/^[a-z][a-z1-6]{0,8}$/.test(select)){
			//tagName 	标签
			return content.getElementsByTagName(select);
		}else if(/^<[a-z][a-z1-6]{0,8}>$/.test(select)){
			//创建一个标签
			return document.createElement(select.slice(1,-1));
		}
	}else if(typeof  select=="function"){
		window.onload=function(){
			select();
		}
	}
	
}


/*
getChild(obj,[type])
获取指定元素的子元素(元素节点)的集合
obj 指定的元素
type 指定获取元素的类型
true 只获取元素节点
false 获取元素节点和有意义的文本
1、获取obj的所有的子元素
2、挑选 obj.nodeType==1

*/
function getChild(obj,type){
	//获取子元素
	var child=obj.childNodes;
	var arr=[];
	//初始化type!!!!!
	var type=type==undefined?true:type;
	//判断type
	if(type){
		for(var i=0;i<child.length;i++){
			if(child[i].nodeType==1){
				arr.push(child[i]);
			}
		}
		return arr;
	}else{
		for(var i=0;i<child.length;i++){
			if(child[i].nodeType==1||(child[i].nodeType==3&&child[i].nodeValue.replace(/^\s+|\s+$/g,"") )){
				arr.push(child[i]);
			}
		}
		return arr;
	}
	
}
//用继承的方法将getChild放到父类中的prototype中
Node.prototype.getChild = function(type){
		type = type==undefined?true:type;
		var child = this.childNodes;
		// console.log(child);
		var arr = [];
		if(type){
			// alert("getChild true");
			for(var i=0;i<child.length;i++){

				if(child[i].nodeType == 1){
					// alert(child[i].nodeType);
					arr.push(child[i]);
				}
			}
			return arr;	
		}else{
			for(var i=0;i<child.length;i++){
				if(child[i].nodeType == 1 || (child[i].nodeType == 3 && child[i].nodeValue.replace(/^\s+|\s+$/g,"") )){
					arr.push(child[i]);
				}
			}
			return arr;	
		}
}
Node.prototype.firstChild1 = function(type){

	return this.getChild(type)[0];
} 
Node.prototype.lastChild1 = function(type){
	var length = this.getChild(type).length;
	return this.getChild(type)[length-1];
} 
Node.prototype.insertFirst = function(new1){


	var first = this.firstChild1();
	 this.insertBefore(new1,first);
}


/*
beforChild(obj,div)
obj:父元素;
div:要插入一个元素;
给元素最前面插入一个元素
思路：
	1、获取obj的第一个子元素；
	2、obj.insertBefore(div,firstChild);
*/

function beforChild(){
	
}






/*
给一个元素后面插入一个元素
insertAfter(obj,div,type)
obj:要插入的位置；
div：要插入的元素
type：类型  如果是true忽略文本 如果是false不能忽略文本
思路：
	1、是否有下一个兄弟节点
		1.1、有的话往下一个兄弟节点的前面插入元素
	2、没有兄弟节点  没有的话直接往父元素后面插入
*/
function insertAfter(obj,old,type){
	type=type==undefined?true:type;

	var next=getNext(obj,type);
	var partent=old.parentNode;
	if(next){
		parent.insertBefore(obj,next);
	}else{
		parent.appendChild(obj);
	}
}

/*
getNext(obj,type)
获取obj的下一个兄弟节点 如果有兄弟节点则返回该节点，如果没有返回false
obj 指定的对象
type：类型  如果是true忽略文本 如果是false不能忽略文本
思路：
	1、判断是否有下一个兄弟节点(next)
		没有 返回false   有  2、判断一下下一个兄弟的节点是否是一个元素节点
		3、更新next，继续寻找下一个兄弟节点
			判断next是否为空
				是空 返回false  不是空  重复步骤3
*/
//获得下一个兄弟元素
function getNext(obj,type){
	type=type==undefined?true:type;

	if(type){
		//忽略文本
		var next=obj.nextSibling;

		if(next==null){
			return false;
		}
		while(next.nodeType==8||next.nodeType==3){
			next=next.nextSibling;
			if(next==null){
				return false
			}
		}
		return next;
	}else{
		var next=obj.nextSibling;
		// console.log(next);
		if(next==null){
			return false;
		}
		while(next.nodeType==8||(next.nodeType==3&&!(next.nodeValue.replace(/^\s+|\s+$/g,"")))){
			next=next.nextSibling;
			if(next==null){
				return false
			}
		}
		return next;
	}

}



//获得上一个兄弟元素
function getprevious(obj,type){
	type=type==undefined?true:type;

	if(type){
		//忽略文本
		var next=obj.previousSibling;

		if(next==null){
			return false;
		}
		while(next.nodeType==8||next.nodeType==3){
			next=next.previousSibling;
			if(next==null){
				return false
			}
		}
		return next;
	}else{
		var next=obj.previousSibling;
		// console.log(next);
		if(next==null){
			return false;
		}
		while(next.nodeType==8||(next.nodeType==3&&!(next.nodeValue.replace(/^\s+|\s+$/g,"")))){
			next=next.previousSibling;
			if(next==null){
				return false
			}
		}
		return next;
	}

}