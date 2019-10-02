function move(obj, json, duration, fx, callback) {
	var oTimer = null;
	
	var d = duration || 1000;
	
	var j = {};
	
	for (var attr in json) {
		j[attr] = {};
		if (attr == 'opacity') {
			j[attr].b = Math.round(css(obj, attr));
			j[attr].c = json[attr]*100 - j[attr].b;
		} else {
			j[attr].b = parseInt(css(obj, attr));
			j[attr].c = json[attr] - j[attr].b;
		}
	}
	
	var fx = fx || 'linear';
	
	var t1 = new Date().getTime();
	
	oTimer = setInterval(function() {
		
		var t = new Date().getTime() - t1;
		
		if (t >= d) {
			t = d;
		}
		
		for (var attr in json) {
			var v = Tween[fx](t, j[attr].b, j[attr].c, d);
			/*if (attr == 'opacity') {
				obj.style[attr] = v / 100;
				obj.style.filter = "alpha(opacity="+v+")";
			} else {
				obj.style[attr] = v + 'px';
			}*/
			css(obj,attr,v);
		}
		
		if (t == d) {
			clearInterval(oTimer);
			callback && callback.call(obj);
		}
		
	}, 16);
	
}

function css(obj, attr, value){
	if(!obj)
	{
		return false;
	}
	if(arguments.length==2){
		if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=="translateZ"||attr=="translateX"||attr=="translateY"||attr=="skewY"||attr=="skewX")
		{
			if(! obj.$Transform)
			{
				obj.$Transform={};
			}
			switch(attr)
			{
				case 'scale':
				case 'scaleX':
				case 'scaleY':
				return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;
				break;
				default:
					return obj.$Transform[attr]?obj.$Transform[attr]:0;
			}
		}
		var sCur=obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr];
		if(attr=='opacity'){
			return Math.round((parseFloat(sCur)*100));
		}
		else{
			return parseInt(sCur);
		}
	}
	else if(arguments.length==3)
	{
		switch(attr){
			case 'scale':
			case 'scaleX':
			case 'scaleY':
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
			case 'translateZ':
			case 'translateX':
			case 'translateY':
			case 'skewY':
			case 'skewX':
			setCss3(obj, attr, value);
			break;
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				if(typeof value=="string")
				{
					obj.style[attr]=value;
				}
				else
				{
					obj.style[attr]=value+'px';
				}
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value+")";
				obj.style.opacity=value/100;
				break;
			default:
				obj.style[attr]=value;
		}
	}
	return function (attr_in, value_in){css(obj, attr_in, value_in)};
}
function setCss3(obj, attr, value)
{
	var sTr="";
	var sVal="";
	var arr=["Webkit","Moz","O","ms",""];
	if(! obj["$Transform"])
	{
		obj["$Transform"]={};
	}
	obj["$Transform"][attr]=parseInt(value);
	for( sTr in obj["$Transform"])
	{
		switch(sTr)
		{
			case 'scale':
			case 'scaleX':
			case 'scaleY':
			sVal+=sTr+"("+(obj["$Transform"][sTr]/100)+") ";	
			break;
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
			case 'skewY':
			case 'skewX':
			sVal+=sTr+"("+(obj["$Transform"][sTr])+"deg) ";	
			break;
			case 'translateZ':
			case 'translateX':
			case 'translateY':
			sVal+=sTr+"("+(obj["$Transform"][sTr])+"px) ";	
			break;
		}
	}
	for(var i=0;i<arr.length;i++)
	{
		obj.style[arr[i]+"Transform"]=sVal;
	}
	
}


/*
* t : time 已过时间
* b : begin 起始值
* c : count 总的运动值
* d : duration 持续时间
* */

//Tween.linear();

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}