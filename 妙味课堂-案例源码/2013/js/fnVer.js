define(function(require,exports,module){
	
	function setRotate(obj, target, endFn){
		
		var speed = 0;
		var num = 0;
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			speed+=(target-num)/6;
			speed*=0.82;
			
			num += speed;
			
			obj.style.MozTransform = 'rotateX('+num+'deg)';
			obj.style.WebkitTransform = 'rotateX('+num+'deg)';
			obj.style.transform = 'rotateX('+num+'deg)';
			
			if(speed<1&&Math.abs(target-num)<1){
				clearInterval(obj.timer);
				endFn&&endFn.call(obj);
			}
			
		}, 30);
	}
	
	function Verification(obj){
		if(!obj)return;
		var div = obj.getElementsByTagName('div')[0];
		
		obj.onmousemove = function (ev){
			var ev = ev || window.event;
			var iX = ev.clientX;
			
			var left = $(this).offset().left;
	
			if(iX-left<=obj.offsetWidth/2){
				div.style.MozTransform = 'rotateY(-15deg)';
				div.style.WebkitTransform = 'rotateY(-15deg)';
				div.style.transform = 'rotateY(-15deg)';
			}else{
				div.style.MozTransform = 'rotateY(15deg)';
				div.style.WebkitTransform = 'rotateY(15deg)';
				div.style.transform = 'rotateY(15deg)';
			}
		};
		obj.onmouseout = function (){
			div.style.MozTransform = 'rotateY(0deg)';
			div.style.WebkitTransform = 'rotateY(0deg)';
			div.style.transform = 'rotateY(0deg)';
		};
		
		obj.t = 0;
		
		obj.onclick = function (){
			
			if(+new Date() - this.t < 800 )return;
			
			this.t = +new Date();
			
			var sUrl = '/2013/api.php/guestbook/verify/length/4/model/1/width/65/height/23/'+Math.random()*10;
			
			var oImg = document.createElement('img');
		
			oImg.src = sUrl;
		
			var img = div.getElementsByTagName('img')[0];
			
			img.parentNode.insertBefore(oImg, img);
				
			img.style.MozTransformOrigin = 'bottom';
			img.style.WebkitTransformOrigin = 'bottom';
			img.style.transformOrigin = 'bottom';
			
			img.style.position = 'absolute';
			img.style.zIndex = 1;
			img.style.top = 0;
			img.style.left = 0;
			
			setRotate(img, -180, function(){
				var _this=this;
				this.style.MozTransition='0.25s';
				this.style.WebkitTransition='0.25s';
				this.style.transition='0.25s';
				
				this.style.top = '30px';
				this.style.opacity = 0;
				setTimeout(function(){
					_this.parentNode.removeChild(_this);
				},500);
				
			});
		};
	};
	
	exports.fnVer = Verification;
	
});