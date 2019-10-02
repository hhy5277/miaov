//__________________________________________声明_____________________________

(function(){

	window.tween = {
		linear: function (t, b, c, d){  //匀速
		    return c*t/d + b;
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

		bounceBoth: function(t, b, c, d){
		    if (t < d/2) {
		        return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		    }
		    return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
		}
	}
	window.globalTimer = null;

	//________________________________________实现_____________________________
	//________________________________________实现_____________________________

	indexPageInit();

	carousel (0);

	thumbRotate (function(index) {
		clearInterval(window.globalTimer);
		carousel(index);
	});

	pD (); 
	//_______________________________________需求_______________________________

	//轮播
	function carousel (index) {
		setTimeout(function() {
			load(index);
				window.globalTimer = setInterval(function() {
				
				index++;
				index%= 10;
				load(index);
			},6000);
		},1000);
	}
	//页面切换动画
	function load (index) {
		//之前fadeIn 的元素 设置为 fadeOut 然后设置定时器 清除 .fadeOut
		var Group = getGroup();
		fadeOutAni();
		setTimeout(function() {	
			Group[index].img.className = "fadeIn";
			Group[index].title.className = "fadeIn";
		},600);
		circleBiger (index);
		clockTurn(index);
		fillNeedle (index);
		renderthumb (colorDate[index].fromC,colorDate[index].toC);
	}
	//上一组的动画消失
	function fadeOutAni(){
		var objFadeIn = document.querySelectorAll(".fadeIn");
		if ( objFadeIn ) {
			for (var i = 0; i < objFadeIn.length; i++) {
				objFadeIn[i].className = "fadeOut";
			};
		}
		setTimeout(function() {
			for (var i = 0; i < objFadeIn.length; i++) {
				objFadeIn[i].className = "";
			};
		},1000);
	}
	//指针的变色 && 动画 (动画未实现)
	function fillNeedle (index) {
		var group = document.querySelector("#needle");
		var nd = document.querySelectorAll("#needle line");
		var color = colorDate[index];
		var start = index * 30;
		window.clockTimer = null;
		window.fillDirect = index == 9;
		clearInterval(group.timer);
		
		for (let i = 0; i < nd.length; i++) {
			nd[i].cName = nd[i].getAttribute("class");
			if (nd[i].cName == "hn" || i < start ) {
				nd[i].setAttribute("stroke", color.toC);
			} else {
				nd[i].setAttribute("stroke", color.fromC);
			}
		};

		//顺时针的实现
		if (!window.fillDirect) {
			let _add = 0;
			clearInterval(group.timer);
			group.timer = setInterval(function() {
				_add ++;
				if (nd[ start + _add ]) {
					nd[ start + _add ].setAttribute("stroke", color.toC);
				}
				if (_add >= 30) {
					clearInterval(group.timer);
				}
			}, 200);
			// 这个只需要运动 30个 耗时  6s
		} 
		//逆时针的实现
		else {
			let _reduce = 0;
			clearInterval(group.timer);
			group.timer = setInterval(function() {
				
				if (_reduce < 270) {
					
					nd[ start - _reduce ].setAttribute("stroke", color.fromC);	
					_reduce ++;
				} else {
					clearInterval(group.timer);
				}
			}, 20);
		}
	}
	//时钟的自动转动 
	function clockTurn (num){
		num %= 10;
		var svgwrap_2 = document.querySelector("#svgwrap_2");
		svgwrap_2.style.transition = ".8s linear";
		svgwrap_2.style.transform = "rotate(" + num*30 + "deg)";
		svgwrap_2.de = num*30;
	}
	// 背景圆圈动画
	function circleBiger (index,fn) {
		var  basicBg = document.querySelector("#basicbg");
		var circs = basicBg.children;
		for (var i = 0; i < circs.length; i++){
			circs[i].style = "";
			circs[i].style.transitionTimingFunction = "ease-in-out";
			circs[i].style.transitionDelay = i * 0.05 + "s";	
			if ( i < circs.length -1 ) {
				circs[i].style.transitionDuration = 0.8 + Math.random()*0.5 + "s";
				circs[i].style.left = (0.1 + Math.random()* 0.8) * 100 + "%";
				circs[i].style.top = (0.1 + Math.random()* 0.8) * 100 + "%";
			} else {
				circs[i].style.transitionDuration = "1.0s";
				circs[i].style.left = "50%";
				circs[i].style.top = "50%";
				
			}
		};
		setTimeout(function() {
			for (var j = 0; j < circs.length; j++) {
				circs[j].style.width = "3000px";
				circs[j].style.height = circs[j].style.width;
				circs[j].style.backgroundColor = colorDate[index].basicC;
			};
		}, 50);
		circs[5].addEventListener("transitionend",function() {
			fn&&fn();
			basicBg.style.backgroundColor = colorDate[index].basicC;
			for (var i = 0; i < circs.length; i++) {
				circs[i].style = "";
			};
		})
	}
	//给导航按钮添加拖拽
	function thumbRotate (fn) {
		// 计算旋转角度
		var svgwrap = document.querySelector("#svgwrap_2");
		var svgwrap_2 = document.querySelector("#svgwrap_2");
		var thumb = svgwrap_2.querySelector("#thumb");
		var thumbspan = svgwrap_2.querySelector("#thumbWrap");
		var rect = svgwrap.getBoundingClientRect();
		svgwrap_2.cx = rect.left + rect.width/2;
		svgwrap_2.cy = rect.top + rect.height/2;
		svgwrap_2.de = svgwrap_2.de || 0;
		svgwrap_2.timer = undefined;
		thumbspan.onmousedown = function(ev) {
			if ( svgwrap_2.timer ) {
				return
			};
			window.thumbOnOff = true;
			svgwrap_2.style.transition = "";
			var x = ev.pageX - svgwrap_2.cx;
			var y = ev.pageY - svgwrap_2.cy;
			svgwrap_2.de += Math.atan2(x,y) / Math.PI *180;

			document.onmousemove = function(ev) {
				var x = ev.pageX - svgwrap_2.cx;
				var y = ev.pageY - svgwrap_2.cy;
				svgwrap_2.de1 = (svgwrap_2.de - Math.atan2(x,y) / Math.PI *180 + 360) % 360;

				if (svgwrap_2.de1 <= 360 && svgwrap_2.de1 >= 270) {
					if (svgwrap_2.de1 > 315) {
						svgwrap_2.style.transform = "rotate(0deg)";
						svgwrap_2.de1 = 0;
					} else {
						svgwrap_2.style.transform = "rotate(270deg)";
						svgwrap_2.de1 = 270;
					}
					return;
				};
				svgwrap_2.style.transform = "rotate(" + svgwrap_2.de1 + "deg)";
			}
			document.onmouseup = function() {
				svgwrap_2.de1 = svgwrap_2.de1 || 0;
				svgwrap_2.de = Math.round(svgwrap_2.de1/30)*30;
				svgwrap_2.style.transition = "transform 1s linear";
				svgwrap_2.timer = setTimeout(function() {
					svgwrap_2.style.transform = "rotate(" + svgwrap_2.de + "deg)";
				},30);
				document.onmousemove = null;
				document.onmouseup = null;
				window.thumbOnOff = false;
				if ( Math.round(svgwrap_2.de/30) !== window.list  ) {
					window.list = Math.round(svgwrap_2.de/30);
					
				};
				// 按钮两秒之后才能再次激活
				setTimeout(function() {
					svgwrap_2.timer = undefined;
					svgwrap_2.style.transition = "";
					svgwrap_2.de = Math.round(svgwrap_2.de/30)*30;
					fn && fn((svgwrap_2.de/30 + 12)%12);
				},600);
			};
		}
	}
	// 获取动画元素组
	function getGroup () {
		var initBg = document.querySelector("#initBg");
		var imgGroup = document.querySelectorAll("#pro_img_wrap li");
		var titleGroup = document.querySelectorAll("#product_text_wrap li");
		var arr = [];
		var json = {};
		for (var i = 0; i <= imgGroup.length; i++) {
			
			if (i == 0) {
				json.img = initBg;
				
			} else {
				json.img = imgGroup[i-1];
			}
			json.title = titleGroup[i];
			arr.push(json);
			json = {};
		};
		return arr;
	}
	// 页面初始化
	function indexPageInit(){
		//  生成DOM 包括左下角的图片 和 主界面的 标题
		DOMform();
		// svg 动画的生成 包括了 表针的生成 表盘的生成 钟表中心的icon (类似于苹果的home)
		SVGForm()
		function DOMform(){
			//  模版生成 产品标题轮播区域
			var product_text_wrap = document.querySelector("#product_text_wrap");
			var html_model_title = template("model-title",openData);
			product_text_wrap.innerHTML += html_model_title;
			titleInit (product_text_wrap);

			//  模版生成 产品图片轮播区域
			var product_img_wrap = document.querySelector("#pro_img_wrap");
			var html_model_img = template("model-proImg",openData);
			product_img_wrap.innerHTML = html_model_img;

			function titleInit (obj) {
				var pro_text_li = obj.querySelectorAll("li");
				for (var i = 0; i < pro_text_li.length; i++) {
					setTitleDelay(pro_text_li[i])
				};
				function setTitleDelay(obj){
					var divs = obj.querySelectorAll("div");
					for (var i = 0; i < divs.length; i++) {
						var spans = divs[i].querySelectorAll("span");
						for (var j = 0; j < spans.length; j++) {
							spans[j].style.transitionDelay = i*100 + j*60 + "ms";
						};
					};
				}
			}
		}
		function SVGForm(){
			var SVG_NS = "http://www.w3.org/2000/svg";
			var XLINK_NS = "http://www.w3.org/1999/xlink";
			function use (origin) {
				var _use = document.createElementNS(SVG_NS, origin.tagName);
				_use.setAttribute("x1", origin.getAttribute("x1"));
				_use.setAttribute("y1", origin.getAttribute("y1"));
				_use.setAttribute("x2", origin.getAttribute("x2"));
				_use.setAttribute("y2", origin.getAttribute("y2"));
				_use.setAttribute("stroke-width", origin.getAttribute("stroke-width"));
				_use.setAttribute("stroke", origin.getAttribute("stroke"));
				_use.setAttribute("class", origin.getAttribute("class"));
				return _use;
			}

			function renderNeedle () {
				var needle = document.querySelector("#needle");
				var minl = document.querySelector("#minl");
				var hourl = document.querySelector("#hourl");
				var needler = 256;
				var count = 270;
				var l = null;
				var deg = 0;

				for (var i = 0; i <= count; i++) {
					if ( i % 30 == 0 ) {
						l = use(hourl);
					} else {
						l = use(minl);
						l.className = minl.className;
					}
					deg = i;
					var trans = {
						transX: needler * Math.sin( deg/180 * Math.PI),
						transY: needler * Math.cos( deg/180 * Math.PI)
					}
					l.setAttribute("transform","translate(" + trans.transX + "," + trans.transY + ") rotate(" +  (-deg) + ")"); 
					needle.appendChild(l);
				}
			}
			function renderDash () {
				var dash = document.querySelector("#dash");
				var dashl = document.querySelector("#dashl");
				var count = 180;
				var dashr = 230;
				var l = null;
				var deg = 0;
				for (var i = 0; i <= count; i++) {
					l = use(dashl);
					deg = i*1.5;
					var trans = {
						transX: dashr * Math.sin( deg/180 * Math.PI),
						transY: dashr * Math.cos( deg/180 * Math.PI)
					}
					l.setAttribute("transform","translate(" + trans.transX + "," + trans.transY + ") rotate(" +  (-deg) + ")"); 
					l.setAttribute("fill","red"); 
					dash.appendChild(l);
				}
			}
			function centerClock () {
				var svgIconWrap = document.querySelectorAll(".svgIconWrap");
				var svgIcon = document.querySelectorAll(".svgIcon");

				for (var i = 0; i < svgIconWrap.length; i++) {
					formAcenter (svgIconWrap[i],svgIcon[i]);
				}

				function formAcenter (obj1,obj2) {
					var cir = obj2.querySelector("circle");
					var arrow = obj2.querySelectorAll("path");
					obj1.onmouseover = function() {
						svglineFadeIn(cir);
						svglineFadeIn(arrow[1]);
					};
					obj2.onmouseout = function() {
						svglineFadeOut(cir);
						svglineFadeOut(arrow[1]);	
					}
					
					function svglineFadeIn(obj) {
						clearInterval(obj.timer);
						obj.timer = setInterval(function() {
							obj.i = obj.getAttribute("stroke-dashoffset")*1 - 3;
							obj.setAttribute("stroke-dashoffset",obj.i);
							if ( obj.i <= 0) {
								clearInterval(obj.timer);
								obj.setAttribute("stroke-dashoffset",0);
							}
						},20);
					}
					
					function svglineFadeOut(obj) {
						clearInterval(obj.timer);
						obj.timer = setInterval(function() {
							obj.i = obj.getAttribute("stroke-dashoffset")*1 + 3;
							obj.setAttribute("stroke-dashoffset",obj.i);
							if ( obj.i >= 100) {
								obj.setAttribute("stroke-dashoffset",100);
							}
						},20);
					}
				}	
			}
			function showClock3d() {
				var svgwrap_1 = document.querySelector("#svgwrap_1");
				var svgwrap_2 = document.querySelector("#svgwrap_2");
				svgwrap_1.className = "svg3d_1";
				svgwrap_2.className = "svg3d_2";
				setTimeout(function() {
					svgwrap_2.className = "svg3d_2_transPause";
				},1000);
			}

			renderNeedle ();
			renderDash ();
			centerClock ();
			setTimeout(function() {
				showClock3d();
			},100);
		}
	}

	//阻止双击鼠标出现的bug
	function pD () {
		var svgwrap = document.querySelector("#svgwrap");
		svgwrap.addEventListener("mousedown", function(ev) {
			ev.preventDefault();
		});
	}

	function renderthumb (cor1,cor2) {
		var thumb = document.querySelector("#thumb");
		var thumbg = thumb.querySelector("#thumb-group");
		var thumbg1 = thumb.querySelector("#thumb-group1");
		var cir = thumbg.querySelectorAll("circle");
		var cir1 = thumbg1.querySelectorAll("circle");
		var arrow = thumbg.querySelectorAll("path");
		var arrow1 = thumbg1.querySelectorAll("path");
		var thumbWrap = document.querySelector("#thumbWrap");
		cir1[0].setAttribute("stroke", cor1);
		cir1[1].setAttribute("stroke", cor2);
		arrow1[0].setAttribute("stroke", cor2);
		arrow1[1].setAttribute("stroke", cor2);

		setTimeout(function() {
			svglineFadeIn(cir1[0],4,cir[0],cor1);
		},100);

		setTimeout(function() {
			svglineFadeIn(cir1[1],2,cir[1],cor2);
		},400);

		setTimeout(function() {
			svglineFadeIn(arrow1[0],1,arrow[0],cor2);
		},600);
		setTimeout(function() {
			svglineFadeIn(arrow1[1],1,arrow[1],cor2);
		},900);

		function svglineFadeIn(obj,step,obj1,cor) {

			clearInterval(obj.timer);
			obj.timer = setInterval(function() {

				obj.i = obj.getAttribute("stroke-dashoffset")*1 - step||0;
				obj.setAttribute("stroke-dashoffset",obj.i);
				if ( obj.i <= 0) {
					clearInterval(obj.timer);
					obj.setAttribute("stroke-dashoffset",0);
					obj1.setAttribute("stroke",cor);
					svglineFadeOut(obj,step)
				};
			},20);
		};

		function svglineFadeOut(obj,step) {
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				obj.i = obj.getAttribute("stroke-dashoffset")*1 + step||0;
				obj.setAttribute("stroke-dashoffset",obj.i);
				if ( obj.i >= 100) {
					clearInterval(obj.timer);
					obj.setAttribute("stroke-dashoffset",100);
				};
			},20);
		};
	}

})();





