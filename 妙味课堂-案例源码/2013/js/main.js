define(function(require,exports,module){
	
	$(function(){
		/*loading...*/
		(function(){
			var iNow = 0;
			var arr = [
				'css/bg/bg1.jpg',
				'css/bg/bg2.jpg',
				'css/bg/bg3.jpg',
				'img/iPeople.png',
				'img/iPeopleLight.png'
			];
			var bBtn = true;
			var iNum = 0;
			var timer = null;
			var timer2 = null;
			timer = setInterval(function(){
							
				if(bBtn){
					$('#loadingMain .img1').animate({top:10},200);
					$('#loadingMain .img2').animate({top:10},200);
					$('#loadingMain .img3').animate({top:10},200);
					$('#loadingMain .img4').animate({top:10},200);
				}
				else{
					$('#loadingMain .img1').animate({top:5},200);
					$('#loadingMain .img2').animate({top:5},200);
					$('#loadingMain .img3').animate({top:5},200);
					$('#loadingMain .img4').animate({top:5},200);
				}
		
				bBtn = !bBtn;
				
			},200);
			
			timer2 = setInterval(function(){
				
				iNum-=15;
				$.setCss($('#loadingMain .img2'),{$Transform:'rotate('+ iNum +'deg)'});
				$.setCss($('#loadingMain .img3'),{$Transform:'rotate('+ -iNum +'deg)'});				
			},30);
			$.each(arr,function(i,elems){
				(function(i){
					var yImg = new Image();
					
					yImg.onload = function(){
						iNow++;
						
						var number = parseInt(iNow/arr.length * 100);
						$('#loadingMain .img4').html( number + '%');
						
						if(iNow== arr.length){
							$('#loading').css('display','none');
							$('#test2').css('display','block');
							clearInterval(timer);
							clearInterval(timer2);
							require('./show').show(window.location.hash);
							
						}
					};
					
					yImg.error = function(){
						$('#c1').css('display','none');
						$('#test2').css('display','block');
						
						require('./show').show(window.location.hash);
					};
					
					yImg.src = elems;
				})(i);
			});	
		})();
		/*loadingEnd...*/
		
		/*nav*/
		
		$('#nav a').click(function(){
			if(this.dataset.hash!=undefined)
			{			
				require('./hide').hide(window.location.hash,this.dataset.hash);
			}
			
		});
		$('#footerNav a').click(function(){
			if(this.dataset.hash!=undefined)
			{			
				require('./hide').hide(window.location.hash,this.dataset.hash);
			}
			
		});
		/*nav*/
		
		/*history*/
		$.fn.bHash = true;
		window.onhashchange = function(){
			if($.fn.bHash){
				window.location.reload();
			}
		};
		/*history*/
		
		$.df = $.Deferred();
		
		function fnNav()
		{
			var aNav=$("#nav a");
			var oTimer=null;
			var i=0;
			oTimer=setInterval(function(){
				aNav.eq(i).css({top:0,opacity:1});
				i++;
				if(i==2)
				{
					$.df.resolve();
				}
				if(i==aNav.length)
				{
					clearInterval(oTimer);
				}
			},200);
			
		};
		setTimeout(function(){fnNav();},1000);
		
		(function(){
			var oBox = document.getElementById('fold_box');
			var fold = document.getElementById('fold');
			var oH2 = fold.getElementsByTagName('h2')[0];
			var div = document.getElementById('paper');
			var aDiv = fold.getElementsByTagName('div');
			var aA = fold.getElementsByTagName('a');
			var aSpan = fold.getElementsByTagName('span');
			var arrA = [
				'<a href="http://weibo.com/miaovclass" target="_blank">妙味 - 新浪微博</a>',
				'<a href="http://www.miaov.com/2013/download/video_download.html" target="_blank">妙味 - 视频教程</a>',
				
				'<a href="http://bbs.miaov.com/forum.php?mod=forumdisplay&fid=19">妙味 - 学员作品</a>',
				'<a href="javascript:;">-实体班班咨询QQ-</a>',
				'<a href="http://wpa.qq.com/msgrd?V=3&uin=3023710192&site=qq&menu=yes" target="_blank">QQ：3023710192</a>',
				'<a href="http://wpa.qq.com/msgrd?V=3&uin=3049266712&site=qq&menu=yes" target="_blank">QQ：3049266712</a>',
				'<a href="javascript:;">-VIP会员咨询QQ-</a>',
				'<a href="http://wpa.qq.com/msgrd?V=3&uin=2379848569&site=qq&menu=yes" target="_blank">QQ：3349734318</a>',
				'<a href="http://wpa.qq.com/msgrd?V=3&uin=3315116152&site=qq&menu=yes" target="_blank">QQ：3315116152</a>',
				'<a href="http://wpa.qq.com/msgrd?V=3&uin=3400849041&site=qq&menu=yes" target="_blank">QQ：3400849041</a>'
				
			];
			var oTime = null;
			var oTimer = null;
			var iNow = 0;
			
			// 生成多组DIV
			for(var i=0; i<arrA.length; i++){
				div.innerHTML = arrA[i]+'<span></span><div></div>';
				div = div.getElementsByTagName('div')[0];
				
				setY(aA[i], i%2==0?'bottom':'top');
				setY(aSpan[i], i%2==0?'bottom':'top');
				setTranslateZ(aSpan[i], i%2==0?1:-1);
				
				i%2==0&&setRotateX(aA[i], 180);
			}
			for(var i=0; i<aDiv.length; i++){
				aDiv[i].className = 'T3D';
				setOrigin(aDiv[i], i%2==0?'bottom':'top');
			}
			
			function setOrigin(obj, val){
				obj.style.msTransformOrigin = val;
				obj.style.MozTransformOrigin = val;
				obj.style.WebkitTransformOrigin = val;
				obj.style.OTransformOrigin = val;
				obj.style.transformOrigin = val;
			}
		
			function setRotateX(obj, val){
				obj.style.msTransform = 'rotateX('+val+'deg)';
				obj.style.MozTransform = 'rotateX('+val+'deg)';
				obj.style.WebkitTransform = 'rotateX('+val+'deg)';
				obj.style.OTransform = 'rotateX('+val+'deg)';
				obj.style.transform = 'rotateX('+val+'deg)';
			}
			function setY(obj, attr){
				obj.style[attr]=0;
			}
			function setTranslateZ(obj, val){
				obj.style.msTransform = 'translateZ('+val+'px)';
				obj.style.MozTransform = 'translateZ('+val+'px)';
				obj.style.WebkitTransform = 'translateZ('+val+'px)';
				obj.style.OTransform = 'translateZ('+val+'px)';
				obj.style.transform = 'translateZ('+val+'px)';
			}
			
			oBox.onmousemove = function (ev){
				var ev = ev || window.event;
				var pos = ev.clientX-this.offsetLeft;
				var deg = 25;
				var degTarget = 0;
				
				clearTimeout(oBox.timer);
				
				if(ev.clientX < this.offsetLeft+this.offsetWidth/2){
					degTarget =(deg-Math.floor(pos/100*deg))*-1;
				}else{
					degTarget = (deg-Math.floor((this.offsetWidth-pos)/100*deg));
				}
				fold.style.msTransform = 'rotateY('+degTarget+'deg)';
				fold.style.MozTransform = 'rotateY('+degTarget+'deg)';
				fold.style.WebkitTransform = 'rotateY('+degTarget+'deg)';
				fold.style.oTransform = 'rotateY('+degTarget+'deg)';
				fold.style.Transform = 'rotateY('+degTarget+'deg)';
			};
			oBox.onmouseout = function (){
				oBox.timer = setTimeout(function(){
					fold.style.msTransform = 'rotateY('+0+'deg)';
					fold.style.MozTransform = 'rotateY('+0+'deg)';
					fold.style.WebkitTransform = 'rotateY('+0+'deg)';
					fold.style.oTransform = 'rotateY('+0+'deg)';
					fold.style.Transform = 'rotateY('+0+'deg)';
				}, 1500);
			};
			
			fold.onmouseover = function (){
				clearTimeout(oTime);
				setElegant(180);
			};
			
			fold.onmouseout = function (){
				oTime = setTimeout(function(){
					setElegant(0);
				}, 300);
			};
			
			function setElegant(target){
				var dir = target==180?1:-1;
				clearInterval(oTimer);
				oTimer = setInterval(function(){
					setRotate(aDiv[iNow], target);
					iNow+=dir;
					if(iNow == aDiv.length && dir == 1 || iNow == -1 && dir == -1){
						clearInterval(oTimer);
						iNow = dir==1?aDiv.length-1:0;
					}
				}, 140);
			}
			
			function setRotate(obj, target, endFn){
				
				setTimeout(function(){
					if(obj.getElementsByTagName('span')[0])
					obj.getElementsByTagName('span')[0].style.background = target==180?'#fff':'#dfdfdf';
				}, 100);
				
				var speed = 0;
				var num = css(obj, 'rotateX');
				clearInterval(obj.timer);
				obj.timer=setInterval(function (){
					speed+=(target-css(obj, 'rotateX'))/16;
					speed*=0.8;
					num += speed;
					if(num<0)num=0;
					css(obj, 'rotateX', num);
		
					if(speed<1&&Math.abs(target-num)<1){
						clearInterval(obj.timer);
						css(obj, 'rotateX', target);
						endFn&&endFn.call(obj);
					}
				}, 30);
			}
			
		})();
		
		/*logo*/
		require('./logo').logo();
		/*logo*/
		
	});
	
});