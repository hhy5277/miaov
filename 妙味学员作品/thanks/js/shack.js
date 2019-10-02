var explorer = window.navigator.userAgent.toUpperCase();
if(explorer.indexOf("MSIE")!=-1){
	
	window.location = 'http://jquery.miaov.com/error.html';
	
}


window.onload = function(){
	
	var oStars = document.getElementById('stars');
	var oLine = document.getElementById('line');
	var aStars = oStars.getElementsByTagName('div');
	var aLine = oLine.getElementsByTagName('h1');
	var oText = document.getElementById('text');
	var aSpan = oText.getElementsByTagName('span');
	var oShake = document.getElementById('shakeLine');
	var bOff = true;
	var iTimer = null;
	var iTimer2 = null;
	var oAttract = {};
	var attractX = null;
	var attractY = null;
	var objX = [];
	var objY = [];
	var oldX = [];
	var oldY = [];
	var newX = [];
	var newY = [];
	var arrX = [];
	var arrY = [];
	var time = 10000;
	
	setTimeout(function(){
		
		var iNub = 0;
		var time = setInterval(function(){
			
			aSpan[iNub].style.visibility = 'visible';
			oShake.style.left = 231 + 14*((iNub+1)%6)+ 'px';
			if(iNub==5){
				
				oShake.style.bottom = 202 + 'px';
				oShake.style.left = 231 + 'px';
				
				
			}
			iNub++;
			if(iNub>=aSpan.length){
				
				clearInterval(time);
				oShake.style.display = 'none';
				
			}
			
		},200);
		
	},2000);
	setTimeout(function(){
		
		oStars.style.opacity = 1;
		
	},500);
	
	for(var i=0; i<aLine.length; i++){
		
		objX.push(aLine[i].offsetLeft);
		objY.push(aLine[i].offsetTop);
		
	}
	for(var i=1; i<aStars.length; i++){
		
		aStars[i].index = i;
		oldX.push(aStars[i].offsetLeft);
		oldY.push(aStars[i].offsetTop);
		newX.push(aStars[i].offsetLeft);
		newY.push(aStars[i].offsetTop);
		
	}
	
	iTimer = setInterval(swap,time);
	function swap(){
		
		bOff = false;
		document.removeEventListener('mousemove',find,false);
		for (var i=1; i<aStars.length; i++) {
			
			var disX = Math.round(Math.random()*60-30);
			var disY = Math.round(Math.random()*60-30);
			var left = oldX[i-1]+disX;
			var top = oldY[i-1]+disY;
			move(aStars[i], { left: left, top: top }, 1000, 'easeBoth', function(){
				
				for (var j=1; j<aStars.length; j++) {
					aStars[j].lineShake();
				}
				
			},function(){
				
				newX.length = 0;
				newY.length = 0;
				
				for(var i=0; i<aLine.length; i++){
			
					objX.push(aLine[i].offsetLeft);
					objY.push(aLine[i].offsetTop);
					
				}
				for(var i=1; i<aStars.length; i++){
					
					newX.push(aStars[i].offsetLeft);
					newY.push(aStars[i].offsetTop);
				}
				bOff = true;
				document.addEventListener('mousemove',find,false);
				
			});
			
		}
		
	}
	document.addEventListener('mousemove',find,false);
	function find(ev){
		
		var e = ev || event;
		var s = document.documentElement.scrollTop|| document.body.scrollTop;
		var mouseX = e.clientX - oStars.offsetLeft;
		var mouseY = e.clientY + s - 70;
		for(var i=1; i<aStars.length; i++){
			
			var centerX = newX[i-1] + aStars[i].offsetWidth/2;
			var centerY = newY[i-1] + aStars[i].offsetHeight/2;
			if(Math.abs(centerX-mouseX)<70&&Math.abs(centerY-mouseY)<70&&i==1){
				clearInterval(iTimer);
				attractX = centerX;
				attractY = centerY
				oAttract = aStars[i];
				document.addEventListener('mousemove',attract,false);
				return;
			}
			if(Math.abs(centerX-mouseX)<50&&Math.abs(centerY-mouseY)<50&&i!=1){
				clearInterval(iTimer);
				attractX = centerX;
				attractY = centerY
				oAttract = aStars[i];
				clearInterval(iTimer);
				document.addEventListener('mousemove',attract,false);
				return;
			}
			
		}
		
	}
	function attract(ev){
				
		document.removeEventListener('mousemove',find,false);
		var e = ev || event;
		var s = document.documentElement.scrollTop|| document.body.scrollTop;
		var mouseX = e.clientX - oStars.offsetLeft;
		var mouseY = e.clientY + s - 70;
		oAttract.style.left = mouseX - oAttract.offsetWidth/2 + 'px';
		oAttract.style.top = mouseY - oAttract.offsetHeight/2 + 'px';
		oAttract.lineShake();
		if(Math.abs(attractX-mouseX)>=150||Math.abs(attractY-mouseY)>=150){
			
			
			document.removeEventListener('mousemove',attract,false);
			clearTimeout(oAttract.iTime);
			oAttract.iTime = setTimeout(function(){
				
				oAttract.shake(function(){
					
					document.addEventListener('mousemove',find,false);
				});
				iTimer = setInterval(swap,time);
				
			},15);
			
		}
		
	}
	for (var i=1; i<aStars.length; i++) {
		
		aStars[i].addEventListener('mousedown',press,false);
		
	}
	
	function press(ev){
		
		if (!bOff) {
			
			return;
			
		}
		bOff = false;
		clearInterval(iTimer);
		document.removeEventListener('mousemove',find,false);
		document.removeEventListener('mousemove',attract,false);
		var e = ev || event;
		var _this = this;
		var clientX = e.clientX;
		var clientY = e.clientY;
		var left = this.offsetLeft;
		var top = this.offsetTop;
		if(e.preventDefault)
			e.preventDefault();
		else
		    window.event.returnValue = false;
		//console.log(drag);
		document.addEventListener('mousemove',drag,false);
		document.addEventListener('mouseup',clear,false);
		function drag(ev){
			
			var e = ev || event;
			_this.lineShake();
			for(var i=1; i<aStars.length; i++){
				
				if(i==_this.index){
					
					aStars[i].style.left = left + (e.clientX - clientX)/2 + 'px';
					aStars[i].style.top = top + (e.clientY - clientY)/2 + 'px';
					
				}else{
					
					aStars[i].style.left = newX[i-1] + (_this.offsetLeft - newX[_this.index-1])*(Math.abs(_this.offsetLeft-aStars[i].offsetLeft))/3000 + 'px';
					aStars[i].style.top = newY[i-1] + (_this.offsetTop - newY[_this.index-1])*(Math.abs(_this.offsetTop-aStars[i].offsetTop))/3000 + 'px';
					
				}
				aStars[i].lineShake();
				
			}
			
		}
		function clear(){
			
			document.removeEventListener('mousemove',drag,false);
			document.removeEventListener('mouseup',clear,false);
			_this.removeEventListener('mousedown',press,false);
			aStars[_this.index].shake(function(){
				//alert(1);
				bOff = true;
				_this.addEventListener('mousedown',press,false);
				document.addEventListener('mousemove',find,false);
				
			});
			for (var i=1; i<aStars.length; i++) {
				
				if(i!=_this.index){
					
					aStars[i].shake();
					
				}
				
				
			}
			iTimer = setInterval(swap,time);
			
		}
		return false;
		
	}
	
	function linePlace(obj1,obj2,obj3,onOff){
		
		var centX = obj1.offsetLeft + obj1.offsetWidth/2;
		var centY = obj1.offsetTop + obj1.offsetHeight/2;
		var centX2 = obj2.offsetLeft + obj2.offsetWidth/2;
		var centY2 = obj2.offsetTop + obj2.offsetHeight/2;
		var iWidth = Math.abs(centX - centX2);
		var iHeight = Math.abs(centY - centY2);
		var Deg = 360*Math.atan(iHeight/iWidth)/(2*Math.PI);
		var iLength = Math.sqrt(iHeight*iHeight+iWidth*iWidth);
		if(onOff){
			
			if( centX > centX2 )
				Deg = 180 - Deg;
			if( centY > centY2 )
				Deg = -Deg;
			obj3.style.left = centX + 'px';
			obj3.style.top = centY + 'px';
			
		}else{
			
			if( centX < centX2 )
				Deg = 180-Deg;
			if( centY < centY2 )
				Deg = -Deg;
			
		}
		obj3.style.transform = 'rotate('+Deg+'deg)';
		obj3.style.WebkitTransform = 'rotate('+Deg+'deg)';
		obj3.style.width = iLength+'px';
		
	}
	for(var i=1; i<aStars.length; i++){
		
		aStars[i].shake = function(fn){
			
			var _this = this;
			var neg = -1;
			this.iTimer = setInterval(function(){
				
				var sX = _this.offsetLeft - newX[_this.index-1];
				var sY = _this.offsetTop - newY[_this.index-1];
				var speedX = sX/5;
				var speedY = sY/5;
				
				_this.style.left = newX[_this.index-1] + (sX-speedX)*neg + 'px';
				_this.style.top = newY[_this.index-1] + (sY-speedY)*neg + 'px';
				_this.lineShake();
				neg = -neg;
				if(Math.abs(sX)<=5&&Math.abs(sY)<=5){
					
					clearInterval(_this.iTimer);
					_this.style.left = newX[_this.index-1] + 'px';
					_this.style.top = newY[_this.index-1] + 'px';
					_this.lineShake();
					setTimeout(function(){
						
						fn&&fn();
						
					},150);
					
				}
				
			},15);
			
		}
		
	}
	aStars[1].lineShake = function(){
	
		linePlace(this,aStars[2],aLine[0],false)
		linePlace(this,aStars[3],aLine[2],true);
		linePlace(this,aStars[4],aLine[4],false);
	
	}
	aStars[2].lineShake = function(){
		
		linePlace(this,aStars[1],aLine[0],true);
		linePlace(this,aStars[3],aLine[1],true);
		linePlace(this,aStars[4],aLine[3],true);
		
	}
	aStars[3].lineShake = function(){
		
		linePlace(this,aStars[2],aLine[1],false);
		linePlace(this,aStars[1],aLine[2],false);
		linePlace(this,aStars[4],aLine[5],false);
		
	}
	aStars[4].lineShake = function(){
		
		linePlace(this,aStars[2],aLine[3],false);
		linePlace(this,aStars[1],aLine[4],true);
		linePlace(this,aStars[3],aLine[5],true);
		
	}
	
	
}
