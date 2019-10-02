/*
* t : time 已过时间
* b : begin 起始值
* c : count 总的运动值
* d : duration 持续时间
*
* 曲线方程
*
* http://www.cnblogs.com/bluedream2009/archive/2010/06/19/1760909.html
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
			s = 3.70158;  //回缩的距离
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
function move(data){
	//默认的配置
	let opt = {
		obj:null,
		attrs:{},
		d:1000,
		fx:'linear',
		cb:function(){}
	}
	//有配置走配置，没配置走默认
	Object.assign(opt,data);

	opt.obj.timerM = null;
	let newDate = +new Date();
	let j = {};

	/*
		每个属性有自己的一套，起始值和目标点。
	*/

	for(var attr in opt.attrs){
		let b;
		//是透明度就使用parseFloat
		if(attr === 'opacity'){
		  b = parseFloat(getComputedStyle(opt.obj)[attr]);
		}else{

		  b = parseInt(getComputedStyle(opt.obj)[attr]);
		}
		// console.log(b);
		j[attr] = {
			b: b,
			c:opt.attrs[attr] - b
		}
	}
	// console.log(j);
	// return;
	clearInterval(opt.obj.timerM);
	opt.obj.timerM = setInterval(function(){
		let nowDate = +new Date();
		let t = nowDate - newDate;
		if(t >= opt.d){
			t = opt.d;
		}
	   
		for(var attr in j){
			// console.log( j[attr]) 使用每个属性的起始值和目标点
			let v = Tween[opt.fx](t, j[attr].b,j[attr].c, opt.d);
			if(attr === 'opacity'){
				opt.obj.style.opacity = v;
			}else{
				opt.obj.style[attr] = v + 'px';
			}   
		}

		if(t == opt.d){
			clearInterval(opt.obj.timerM);
			opt.cb && opt.cb();
		}
		
	},16);
}

/*
	callback:function(){},
	attr:'left',
	n:10,
	obj
*/
function shake(json={}){ //配置
	//默认
	let num = 0;
	let opt = {
		callback:function(){},
		attr:'left',
		n:10
	}
	// 有配置走配置，没配置走默认
	Object.assign(opt,json);

	//console.log(opt);

	let arr = [];
	opt.obj.timer = null;
	for(var i=opt.n;i>0;i-=2){
		arr.push(-i,i);
	}
	arr.push(0);
	clearInterval(opt.obj.timer);
	opt.obj.timer = setInterval(function(){
		opt.obj.style[opt.attr] = parseInt(getComputedStyle(opt.obj)[opt.attr]) + arr[num] + 'px';
		num ++;
		if(num >= arr.length){
			clearInterval(opt.obj.timer);
			num = 0;
			//console.log(callback);
			opt.callback && opt.callback();//钩子函数
		}
	},30); 
}