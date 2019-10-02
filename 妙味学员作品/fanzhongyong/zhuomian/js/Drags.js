(function(){
		//拖拽的构造函数
		function Drag(){}
		//元素拖拽三要素：
		//1:加定位 position:absolute/fixed; 改变的元素:left 和top
		//2:绑定事件:onmousedown (onmousemove onmouseup)---document
		//3:清空鼠标事件
		Drag.prototype.init = function(options){
			var dragObj = this;
			//参数的混入 jquery $.extend
			var opts = mix({},{arrow:"",handler:"",parent:"",position:"relative"},options);
			var boxDom = document.getElementById(opts.id);
			//父元素
			var parentDom = document.getElementById(opts.id);
			if(opts.handler){
				boxDom = boxDom.children[opts.handler*1-1];
			}
			
			var garbage = document.getElementById("garbage");
			//获取父盒子对象	
			var parentBoxDom = document.getElementById(opts.parent);
			if(parentBoxDom){
				parentBoxDom.style.position = opts.position;
			}
			//console.log(parentBoxDom);
	
			var mark  = false;
			var isPz = false;
			boxDom.onmousedown = function(e){
				//拿到元素的位置
				var sleft = parentDom.offsetLeft;
				var stop = parentDom.offsetTop;
				//获取最大的距离
				var maxWidth  = Math.max(window.innerWidth,document.body.clientWidth);
				var maxHeight  = Math.max(window.innerHeight,document.body.clientHeight);
				var maxLeft = (parentBoxDom?parentBoxDom.offsetWidth:maxWidth) - parentDom.offsetWidth;
				var maxTop = (parentBoxDom?parentBoxDom.offsetHeight:maxHeight) -parentDom.offsetHeight;//潜在的问题?
				//拿到鼠标的位置
				var pos = getXY(e);
				mark = true;
				document.onmousemove = function(e){
					if(mark){
						//移动鼠标的位置
						var pos2 = getXY(e);
						var nleft = pos2.x - pos.x + sleft;
						var ntop = pos2.y - pos.y + stop;
						//边界判断
	
						if(nleft<=0)nleft = 0;
						if(ntop<=0)ntop = 0;
						if(nleft>=maxLeft)nleft = maxLeft;
						if(ntop>=maxTop)ntop = maxTop;
						//改变位置
						if(opts.arrow=="left"){
							parentDom.style.left = nleft+"px";
						}else if(opts.arrow=="top"){
							parentDom.style.top = ntop+"px";
						}else{
							parentDom.style.left = nleft+"px";
							parentDom.style.top = ntop+"px";
						}
						
						isPz= pzFn(parentDom,garbage);
						
						if(isPz){
							garbage.classList.add("seled");
						}else{
							garbage.classList.remove("seled");
						}
						
					}
				};
				//鼠标松开的时候，释放拖动
				document.onmouseup = function(){
					this.onmousemove = null;
					this.onmouseup = null;
					mark = false;
					if(isPz){
						//parentDom.style.display = "none";
						var data = eval("("+localStorage.getItem("deskDate")+")") || deskData;
						var id = parentDom.id;
						
						if(parentDom.id === "garbage"){
							return false;
						}
						for(var i=0;i<data.length;i++){
							if(data[i].typeId === id){
								data.splice(i,1);
							}
						}	
						var str = JSON.stringify(data);
						localStorage.setItem("deskDate",str);
						if(parentDom.id === "smallDate"){
							document.body.removeChild(parentDom);
						}else{
							document.getElementById("deskContiner").removeChild(parentDom);
						}
						
						garbage.classList.remove("seled");
					}
					
					if(opts.callback)opts.callback.call(parentDom);
				};
			};
		};
		
	function mix(target,source){ //多对象混合
		var arr = [];
		var args = arr.slice.call(arguments);
		var i = 1;
		if(args.length==1){
			return target;
		};
		while((source = args[i++])){
			for(var key in source){
				if(source.hasOwnProperty(key)){
					target[key] = source[key];
				}
			}
		}
		return target;
	};
	
	function pzFn(obj1,obj2){
		var top1 = obj1.offsetTop;
		var right1 = obj1.offsetLeft+obj1.offsetWidth;
		var bottom1 = obj1.offsetTop + obj1.offsetHeight;
		var left1 = obj1.offsetLeft; 
		
		var top2 = obj2.offsetTop;
		var right2 = obj2.offsetLeft+obj2.offsetWidth;
		var bottom2 = obj2.offsetTop + obj2.offsetHeight;
		var left2 = obj2.offsetLeft;
		
		//没有碰撞的情况
		if(top1 > bottom2 || right1<left2 || bottom1 < top2 || left1 > right2){
			return false;
		}else{
			return true;
		}
	}
	
	function getXY(e){  //获取坐标
		var ev = e || window.event;
		var x=0,y=0;
		if(ev.pageX){
			x = ev.pageX;
			y = ev.pageY;
		}else{
			//拿到scrollTop 和scrollLeft
			var sleft = 0,stop = 0;
			//ie678---
			if(document.documentElement){
				stop =document.documentElement.scrollTop;
				sleft = document.documentElement.scrollLeft;
			}else{
			//ie9+ 谷歌 
				stop = document.body.scrollTop;
				sleft = document.body.scrollLeft;
			}	
			x = ev.clientX + sleft;
			y = ev.clientY + stop;
		}
		return {x:x,y:y};
	};
	window.Drag = Drag;
})();
	