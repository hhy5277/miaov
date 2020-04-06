define('./indexIn.js',['./news.js','./worksTab.js','./banner3d.js'],function(require,exports,module){
	function init(){
		$("#main").get(0).className="pageBg1";
		if(!window.aIndexTimer)
		{
			window.aIndexTimer=[];
		}
		setTimeout(function()
		{
			$.fn.bHash = true;
		},100);
		if(typeof oIndexCourse == "undefined" )
		{
			oIndexCourse=new ICourse();
		}
		$("html,body").animate({scrollTop:0},300);
		$.setCss($("#iPeople"),{$Transition:"0s all ease",opacity:0,top:-50});
		$.setCss($("#iPeopleShadow"),{$Transition:"0s all ease",opacity:0,$Transform:"scale(0.6)"});
		$.setCss($(".iBannerBall"),{$Transform:"scale(0)"});
		$.setCss($(".iBannerIco"),{opacity:0});
		$.setCss($("#iHtml5"),{$Transition:"none",opacity:0});
		$.setCss($("#iCourseTabBg"),{$Transition:"none",opacity:0});
		$.setCss($("#iCourseBtn"),{$Transition:"none",opacity:0,backgroundPosition:"-100px -16px,0 0"});
		$.setCss($("#iCoursebtns li"),{$Transition:"none",opacity:0});
		$("#iCoursebtns li").removeClass("active");
		$.setCss($("#iCourseTabPic li"),{$Transition:"0s all ease",$Transform:"rotate(0deg)",top:-20,visibility:"hidden",opacity:0});
		$.setCss($("#iCourseTabText>li"),{$Transition:"0s all ease",opacity:0,left:380,top:0});
		$("#iZoom").css({left:"-200px",opacity:0});
		$("#iCourseTabPic").off("mouseout mousemove");
		$.setCss($("#iContent>section"),{$Transition:"none",top:50,opacity:0});
		iNewsGet();
		iWorksGet();
		fnZoomBgX();
		iBannerIn();			
	}
	function iBannerIn()
	{	
		$.df.done(function(){
			setTimeout(function()
			{			
				iPeopelIn();
				iContentIn();
				window.aIndexTimer[0]=setTimeout(function(){iCourseTabIn(); },500);
			},30);
		});
	}
	function iNewsGet()
	{
		$.ajax({
			url:domain+"/api.php/news",
			dataType:"json",
			type:'get',
			data:"fdate=Y-m-d",
			success:function (json){
				iNewsGreate(json['list']);
			}
		});
	}
	function iNewsGreate(inner)
	{
		var sInner="";
		for(var i=0;i<inner.length;i++)
		{
			sInner+='<li><i class="ico"></i><time><em>'+inner[i]['dateline']+'</em><em>'+inner[i]['dateline']+'</em></time><a href="'+inner[i]['url']+'" target="_blank">'+inner[i]['title']+'</a></li>';
		}
		$("#iNewsList").html(sInner);
		require('./news').fnINews();
	}
	function iWorksGet()
	{
		$.ajax({
			url:domain+"/api.php/works/getListIndex",
			dataType:"json",
			type:'get',
			success:function (json){
				iWorksGreate(json);
			}
		});
	}
	function iWorksGreate(inner)
	{
		var sInner="";
		for(var i=0;i<inner.length;i++)
		{
			sInner+='<li><a data-hash="#studentMore_'+inner[i]['workid']+'" href="javascript:;"><img src="'+domain+inner[i]["imgs"]['img1']+'" alt="" class="iWorksPic"/><img src="'+domain+inner[i]["imgs"]['img2']+'" alt="" class="iWorksBlur"/></a></li>';
		}
		sInner+='<li class="mask"></li>';
		$("#iWorksPic").html(sInner);
		require('./worksTab').fnIWorksTab();
	}
	function iContentIn()
	{
		var aChild=$("#iContent>section");
		aChild.each(function(index){
				$.setCss($(this),{$Transition:"1s "+index*200+"ms all ease"});
			});
		window.aIndexTimer[1]=setTimeout(function(){
			aChild.each(function(index){
				$.setCss(aChild,{top:0,opacity:100});
				window.aIndexTimer[17]=setTimeout(function(){
						// 取消首页课程弹窗
						oIndexCourse.show();
				},200);
			});
		},1500)
	}
	function iPeopelIn()
	{
		$.setCss($("#iPeople"),{$Transition:"1.5s all ease",opacity:100,top:29});
		$.setCss($("#iPeopleShadow"),{$Transition:"1.5s all ease",opacity:100,$Transform:"scale(1)"});
		$.setCss($("#iPeopleVIco"),{$Transition:"1.3s all ease-out",height:100});
		window.aIndexTimer[2]=setTimeout(function(){
			$.setCss($("#iHtml5"),{$Transition:"1s all ease",opacity:100});
			window.aIndexTimer[3]=setTimeout(function(){
				$.setCss($("#iHtml5"),{$Transition:"none"});
			},1000);
		},1500);
		window.aIndexTimer[4]=setTimeout(function(){
			var aIco=$("#iBannerRight .iBannerBall");
			var oTimer=null;
			var i=0;
			oTimer=setInterval(function()
				{
					css(aIco.eq(i).get(0),"scale",0);
					miaovStartMove(aIco.eq(i).get(0),{scale:100},2);
					i++;
					if(i==aIco.length)
					{
						clearInterval(oTimer);
					}
				},200
			);
		},1700);
		window.aIndexTimer[5]=setTimeout(function(){
			$.setCss($("#iPeopleVIco"),{$Transition:"1.3s all ease",height:75});
			window.aIndexTimer[16]=setTimeout(function(){
				$.setCss($("#iPeopleVIco"),{$Transition:".8s all ease",height:84});
			},1300);
		},1200);
		window.aIndexTimer[6]=setTimeout(function(){
			var aIco=$("#iBannerRight .iBannerIco");
			var oTimer=null;
			var i=0;
			oTimer=setInterval(function()
				{
					$.setCss(aIco.eq(i),{$Transition:"1s all ease",opacity:100});
					i++;
					if(i==aIco.length)
					{
						clearInterval(oTimer);
						window.aIndexTimer[7]=setTimeout(function(){
							$.setCss(aIco,{$Transition:"none"});
							$.setCss($("#iPeople"),{$Transition:"none"});
						},1000);
					}
				},200
			);
			if(!window.mm1)
			{
				window.mm1 = new (require('./banner3d').banner3d);
				window.mm1.init('iBannerRight');
				window.mm1.childs({
					childId : 'iPeople',
					iLeft : 0,
					iTop : 0,
					bLeft : true
				});
				window.mm1.childs({
					childId : 'iHtml5',
					iLeft : 8,
					iTop : 0,
					bLeft : true
				});
				window.mm1.childs({
					childId : 'iBannerIco3',
					iLeft : 10,
					iTop : 0,
					bLeft : true,
				});
				window.mm1.childs({
					childId : 'iBannerIco1',
					iLeft : 14,
					iTop : 0,
					bLeft : true
				});
				window.mm1.childs({
					childId : 'iBannerIco2',
					iLeft : 11,
					iTop : 0,
					bLeft : true
				});
				window.mm1.childs({
					childId : 'iBannerIco5',
					iLeft : -14,
					iTop : 0,
					bLeft : true
				});
				window.mm1.childs({
					childId : 'iBannerIco4',
					iLeft : -8,
					iTop : 0,
					bLeft : true
				});
				window.mm1.childs({
					childId : 'iPeoplePic',
					iLeft : 6,
					iTop : 0,
					bLeft : true
				});
			}
		},2000);
	}
	function iCourseTabIn()
	{
		$.setCss($("#iCourseTabBg"),{$Transition:"1s all ease",opacity:100});
		window.aIndexTimer[8]=setTimeout(function(){
			iCourseTab();
		},100);
	}
	function iCourseTab()
	{
		
		var aBtns=$("#iCoursebtns li");
		var oBtn=$("#iCourseBtn");
		var oZoom=$("#iZoom");
		var oZoomImg=$("#iZoomImg");
		var aSrc=["img/iBannerTextBig2.png","img/iBannerTextBig.png","img/iBannerTextBig3.png"];
		var iNow=0;
		var oTimer=null;
		var i=0;
		iPicTabPicIn(iNow);
		iPicTabTextIn(iNow);
		oZoomImg.css('background','url('+aSrc[iNow]+') no-repeat #fdf3f0');
		fnZoomBgX();
		window.aIndexTimer[9]=setTimeout(function(){
			$.setCss(oBtn,{$Transition:"1s ease opacity,.8s cubic-bezier(0.425, 1.650, 0.685, 1.650) background",opacity:100});
		},200);	
		window.aIndexTimer[10]=setTimeout(function(){
			oTimer=setInterval(function(){
				if(i==aBtns.length-1)
				{
					clearInterval(oTimer);
				}
				$.setCss(aBtns.eq(i),{$Transition:".8s ease all",opacity:100});
				i++;
			},100);
		},300);
		window.aIndexTimer[11]=setTimeout(function(){
			$.setCss(oBtn,{backgroundPosition:"20px -16px,0 0"});
		},1000);
		window.aIndexTimer[12]=setTimeout(function(){
			$.setCss(aBtns,{$Transition:"none"});
			aBtns.eq(0).addClass("active");
			aBtns.click(function()
			{
				if(iNow==$(this).index())
				{
					return;
				}
				$("#iCourseBtn").attr('href',$("#iCourseTabPic>.iCourseTabPic>li>a").eq($(this).index()).attr("href"));
				aBtns.eq(iNow).removeClass("active");
				iPicTabTextOut(iNow);
				iPicTabPicOut(iNow);
				iNow=$(this).index();
				$(this).addClass("active");
				iPicTabPicIn($(this).index());
				iPicTabTextIn($(this).index());
				fnZoomRotate1();
			});
			oBtn.mouseover(function(ev){
				var iX=ev.clientX-$(this).offset().left;
				$.setCss(oBtn,{backgroundPosition:(iX-95)+"px -16px,0 0"});
			});
			oBtn.mousemove(function(ev){
				var iX=ev.clientX-$(this).offset().left;
				$.setCss(oBtn,{backgroundPosition:(iX-95)+"px -16px,0 0"});
			});
			oBtn.mouseout(function(){
				$.setCss(oBtn,{backgroundPosition:"20px -16px,0 0"});
			});
			window.aIndexTimer[13]=setTimeout(function()
			{
				fnIZoomIn();
			},100);
		},1500);
		function fnIZoomIn()
		{
			var oZoom=$("#iZoom");
			var oZoomImg=$("#iZoomImg");
			tweenMove(oZoom.get(0),{left:-66,opacity:100},500,"easeOut",function(){
				$("#iCourseTabPic").mousemove(function(ev){
					var iMouseX=ev.clientX;
					clearTimeout(this.timer);
					if(iMouseX>$(this).offset().left && iMouseX<$(this).offset().left+ $(this).width())
					{
						var iLeft=iMouseX-$(this).offset().left-($("#iZoomMask").width()/2)-$("#iZoomMask").position().left;
						miaovStartMove(oZoom.get(0),{left:iLeft},1,function(){},fnZoomBgX);
					}
					else
					{
						this.timer=setTimeout(function()
						{	
							miaovStartMove(oZoom.get(0),{left:-66},1,function(){},fnZoomBgX);
						},100);
					}
				});
				$("#iCourseTabPic").mouseout(function()
				{
					this.timer=setTimeout(function()
					{
						miaovStartMove(oZoom.get(0),{left:-66},1,function(){},fnZoomBgX);
					},100);
				});		
			},fnZoomBgX);		
			
		}	
		function fnZoomRotate1(sSrc)
		{
			$.setCss(oZoom,{$Transition:".5s  ease all",$Transform:"rotate(-45deg)"});
			$.setCss(oZoomImg,{$Transition:".5s ease all,.2s ease opacity",$Transform:"rotate(45deg)",opacity:0});
			clearTimeout(window.aIndexTimer[14]);
			window.aIndexTimer[14]=setTimeout(function(){
				$.setCss(oZoom,{$Transition:"none"});
				$.setCss(oZoomImg,{$Transition:"none"});
				oZoomImg.css('background','url('+aSrc[iNow]+') no-repeat #fdf3f0');
				fnZoomRotate2();
			},600);
		}
		function fnZoomRotate2()
		{
			$.setCss(oZoom,{$Transition:".5s .4s ease all",$Transform:"rotate(0deg)"});
			$.setCss(oZoomImg,{$Transition:".5s .4s ease all,.2s .7s ease opacity",$Transform:"rotate(0deg)",opacity:100});
			clearTimeout(window.aIndexTimer[15]);
			window.aIndexTimer[15]=setTimeout(function(){
				$.setCss(oZoom,{$Transition:"0s ease all"});
				$.setCss(oZoomImg,{$Transition:"0s ease all"});
			},500);
		}		
	}
	function iPicTabPicIn(Nub)
	{
		var oPicList=$("#iCourseTabPic li").eq(Nub);
		clearTimeout(oPicList.get(0).timer);
		$.setCss(oPicList,{visibility:"visible"});
		oPicList.get(0).timer=setTimeout(function()
		{
			$.setCss(oPicList,{$Transition:".7s .3s all ease",$Transform:"rotate(0deg)",opacity:100,top:0,left:0,zIndex:1});
		},10);
	}
	function iPicTabPicOut(Nub)
	{
		var oPicList=$("#iCourseTabPic li").eq(Nub);
		clearTimeout(oPicList.get(0).timer);
		$.setCss(oPicList,{$Transition:".7s all ease",$Transform:"rotate(0deg)",opacity:0,top:0,left:30});
		oPicList.get(0).timer=setTimeout(function()
		{
			$.setCss(oPicList,{$Transition:"0s all ease",$Transform:"rotate(0deg)",top:-20,left:0,visibility:"hidden"});
		},500);
	}
	function iPicTabTextIn(Nub)
	{
		var oTextList=$("#iCourseTabText>li").eq(Nub);
		clearTimeout(oTextList.get(0).timer);
		$.setCss(oTextList,{$Transition:".7s .8s all ease",opacity:100,left:0});
	}
	function iPicTabTextOut(Nub)
	{
		var oTextList=$("#iCourseTabText>li").eq(Nub);
		$.setCss(oTextList,{$Transition:".7s all ease",opacity:100,top:100});
		clearTimeout(oTextList.get(0).timer);
		oTextList.get(0).timer=setTimeout(function()
		{
			$.setCss(oTextList,{$Transition:"0s all ease",opacity:0,left:380,top:0});
		},500);
	}
	function fnZoomBgX()
	{
		var iBigSizeX=424;
		var iSmallSizeX=363;
		var iScale=iBigSizeX/iSmallSizeX;
		var iX=parseFloat($("#iCourseTabPic").offset().left);
		var iZoomX=parseFloat($("#iZoomImg").offset().left);
		$("#iZoomImg").css("backgroundPosition",-(iZoomX-iX)*iScale-8+"px 0px");
	}
	
	/*worksTab*/
	
	/*worksTab*/
	function ICourse()
	{
		var _this=this;
		this.oDiv = document.getElementById('course_arrangement');
		this.oClose = getClass(this.oDiv, 'close')[0];
		this.oUl = this.oDiv.getElementsByTagName('ul')[0];
		this.aLi = this.oUl.getElementsByTagName('li');
		this.aP = this.oDiv.getElementsByTagName('p');
		this.oContact = getClass(this.oDiv, 'contact')[0];
		this.oH3 = this.oContact.getElementsByTagName('h3')[0];
		this.oH4 = this.oContact.getElementsByTagName('h4')[0];
		this.oH5 = this.oContact.getElementsByTagName('h5')[0];
		this.oBtn = this.oContact.getElementsByTagName('a')[0];
		this.onOff = true;
		this.atimer=[];
		this.oClose.onclick=function(){
			for(var i=0;i<_this.atimer.length;i++)
			{
				clearTimeout(_this.atimer[i]);
			}
			_this.hide();
		}
	}
	ICourse.prototype={
		show:function()
		{
			var _this=this;
			for(var i=0;i<_this.atimer.length;i++)
			{
				clearTimeout(_this.atimer[i]);
			}
			
			css(_this.oDiv, 'opacity', 0);
			css(_this.oDiv, 'display', 'block');
			
			_this.atimer[0]=setTimeout(function() {
				css(_this.oDiv, 'opacity', 100);
				css(_this.oDiv, 'boxShadow', '0px 30px 80px rgba(148, 92, 78, 0.75)');
				_this.atimer[1]=setTimeout(function() {
					css(_this.oDiv, 'top', 0);
					_this.atimer[2]=setTimeout(function() {
						css(_this.oDiv, 'height', 230);
						_this.atimer[3]=setTimeout(function() {
							css(_this.oUl, 'top', 0);
							setCss3(_this.oUl, 'scaleX', 100);
							var num = 0;
							clearInterval(_this.atimer[4]);
							_this.atimer[4]= setInterval(function() {
								css(_this.aP[num], 'opacity', 100);
								setCss3(_this.aP[num], 'rotateX', 0);
								num++;
								if ( num == _this.aP.length ) {
									clearInterval( _this.atimer[4]);
									_this.fnAllow();
								}
							}, 150);
						}, 300);	
					},100);
				}, 800);
			}, 1000);
		},
		fnAllow:function()
		{
			var _this=this;
			var iW = _this.oDiv.offsetWidth;
			var iRotate = 0;
			
			_this.oDiv.onmousemove = function(ev) {
				var ev = ev || window.event;
				iRotate = (ev.clientX-_this.oDiv.offsetLeft - iW/2)/10;
			};
		
			for ( var i=0; i<_this.aLi.length; i++ ) {
				_this.aLi[i].index = i;
				_this.aLi[i].onmouseover = function() {
					if (_this.onOff) {
						setCss3(_this.aP[this.index], 'rotateY', iRotate>0?20:-20);
					}
				};
				_this.aLi[i].onmouseout = function() {
					if (_this.onOff) {
						setCss3(_this.aP[this.index], 'rotateY', 0);
					}
				};
				_this.aLi[i].onmousedown = function() {
					if (_this.onOff) {
						setCss3(_this.aP[this.index], 'rotateY', iRotate>0?88:-88);
					}
				};
				_this.aLi[i].onmouseup = function() {
					if(_this.onOff) {
						_this.onOff = false;
						setCss3(_this.aP[this.index], 'rotateY', iRotate>0?20:-20);
						fnTurn( _this.aP[this.index], this.index );
					}
				};
			}
		
			function fnTurn( p,index ) {
				var iMinus = iPlus = index;
				var iAlpha = 10;
				
				setCss3(p, 'rotateY', iRotate>0?-180:180);
				css(p, 'opacity', iAlpha);
		
				clearInterval(_this.atimer[4]);
				_this.atimer[4] = setInterval(function() {
					iMinus--;	if( iMinus == -1 ) iMinus = 0;
					iPlus++;	if( iPlus == _this.aP.length ) iPlus = _this.aLi.length-1;
		
					setCss3(_this.aP[iMinus], 'rotateY', iRotate>0?-180:180);
					setCss3(_this.aP[iPlus], 'rotateY', iRotate>0?-180:180);
					
					css(_this.aP[iMinus], 'opacity', iAlpha);
					css(_this.aP[iPlus], 'opacity', iAlpha);
					
					if ( iMinus == 0 && iPlus == _this.aLi.length-1 ) {
						clearInterval( _this.atimer[4] );
						
						_this.fnContact();
					}
				}, 100);
			}
		},
		fnContact:function () {
			var _this=this;
			css(_this.oContact, 'display', 'block');
			_this.atimer[5]=setTimeout(function() {
				css(_this.oContact, 'opacity', 100);
				_this.fnReset();
			}, 400);
		}
		,
		fnReset:function () {
			var _this=this;
			this.oBtn.onclick = function() 
			{
				css(_this.oContact, 'opacity', 0);
				_this.atimer[6]=setTimeout(function() {
					css(_this.oContact, 'display', 'none');
					for( var i=0; i<_this.aP.length; i++ ) {
						css(_this.aP[i], 'opacity', 100);
					}
					var num = _this.aP.length-1;
					clearInterval(_this.atimer[4]);
					_this.atimer[4] = setInterval(function() {
						setCss3(_this.aP[num], 'rotateY', 0);
						num--;
						if ( num == -1 ) {
							clearInterval(_this.atimer[4]);
							_this.onOff = true;
						}
					}, 100);
				}, 400);
			};
		},
		hide:function()
		{
			var _this=this;
			_this.atimer[7]=setTimeout(function() {
				css(_this.oDiv, 'height', 48);
				_this.atimer[8]=setTimeout(function() {
					css(_this.oDiv, 'boxShadow', '0 0 0 rgba(148, 92, 78, 0)');
					css(_this.oDiv, 'top', 130);
					_this.atimer[9]=setTimeout(function() {
						css(_this.oDiv, 'opacity', 0);
						_this.atimer[10]=setTimeout(function() {
							css(_this.oDiv, 'display', 'none');
						}, 800);
					}, 100);
				},100);
			},100);
		}
	};
		function getClass(obj, sClass) {
		var aElem = obj.getElementsByTagName('*');
		var arr = [];
		var re = new RegExp('(^|\\s)' + sClass + '(\\s|$)');
		
		for (var i = 0; i < aElem.length; i++) {
			if ( re.test( aElem[i].className ) ) {
				arr.push( aElem[i] );
			}
		}
		
		return arr;
	}
	exports.init = init;
});
define('./news.js',[],function(require,exports,module){
	
	function fnINews()
	{
		var aA=$("#iNewsList a");
		var aLi=$("#iNewsList li");
		var iMtNow=0;
		aLi.mouseover(function(){
			aLi.removeClass("active");
			$(this).addClass("active");
			return false;
		});
		for(var i=0;i<aA.length;i++)
		{
			var aHtml=aA.eq(i).html().split("");
			for(var j=0;j<aHtml.length;j++)
			{
				aHtml[j]="<span>"+aHtml[j]+"</span>"
			}
			aA.eq(i).html(aHtml.join(""));
		}
		var aSpan=$("#iNewsList span");
		
		for(var i=0;i<aSpan.length;i++)
		{
			aSpan.eq(i).css("left",aSpan.eq(i).position().left+"px");
		}
		aSpan.css("position","absolute");
		var iStartTop=aSpan.position().top;
		var iMinTop=-5;
		var iMaxTop=parseFloat(aSpan.parent().css("height"))-parseFloat(aSpan.css("height"))+5;
		aSpan.mouseover(function(ev){
			var ev=ev||event;
			var iStartY=ev.clientY;
			var obj=$(this);
			this.parentNode.onmousemove=function(ev)
			{
				var iMouseY=ev.clientY;
				var iTop=iStartTop+(iMouseY-iStartY);
				var aSpan=$(this).find("span");
				var iIndex=obj.index();
				aSpan.stop();
				if(iTop<iMinTop || iTop>iMaxTop)
				{
					aSpan.animate({top:iStartTop},500,"elasticOut");
					this.parentNode.onmouseout=null;
					this.parentNode.onmousemove=null;
				}
				else
				{
					for(var i=0;i<aSpan.length;i++)
					{
						if(iMouseY>iStartY)
						{
							var iSpanTop=iTop-Math.abs(i-iIndex);
							if(iSpanTop<iStartTop)
							{
								iSpanTop=iStartTop;
							}
						}
						else if(iMouseY<iStartY)
						{
							var iSpanTop=iTop+Math.abs(i-iIndex);
							if(iSpanTop>iStartTop)
							{
								iSpanTop=iStartTop;
							}
						}
						aSpan.eq(i).css("top",iSpanTop+"px");
					}
				}
				this.parentNode.onmouseout=function()
				{
					aSpan.animate({top:iStartTop},500,"elasticOut");
					this.parentNode.onmouseout=null;
					this.parentNode.onmousemove=null;
				};
			};
		});
	}
	
	exports.fnINews = fnINews;
	
});

define('./worksTab.js',[],function(require,exports,module){
	
	function fnIWorksTab()
	{
		var aLi=$("#iWorksPic").find("li");
		var aA=$("#iWorksPic").find("a");
		var aPic=$(".iWorksBlur");
		var aPic2=$(".iWorksPic");
		var aAttr=[];
		var aOpacity=[];
		for(var i=0;i<aLi.length-1;i++)
		{
			var oAttr={};
			oAttr.zIndex=aLi.eq(i).css("z-index");
			if(oAttr.zIndex<=20)
			{
				$.setCss(aLi.eq(i),{$Transform:"scale(0.65)",$Transition:"0.8s all ease"});
				oAttr.$Transform="scale(0.65)";
			}
			else if(oAttr.zIndex<=30)
			{
				$.setCss(aLi.eq(i),{$Transform:"scale(1)",$Transition:"0.8s all ease"});
				oAttr.$Transform="scale(1)";
			}
			oAttr.left=parseFloat(aLi.eq(i).css("left"));
			oAttr.top=parseFloat(aLi.eq(i).css("top"));
			$.setCss(aPic.eq(i),{$Transition:"0.8s all ease"});
			$.setCss(aPic2.eq(i),{$Transition:"0.8s all ease"});
			aOpacity.push(aPic.eq(i).css("opacity"));
			aAttr.push(oAttr);
			toMove();
		}
		$("#iWorksPrev").click(function(){
			aAttr.unshift(aAttr.pop());
			aOpacity.unshift(aOpacity.pop());
			toMove();
		});
		$("#iWorksNext").click(function(){
			aAttr.push(aAttr.shift());
			aOpacity.push(aOpacity.shift());
			toMove();
		});
		$(".iWorksTab").mouseover(function(){
			$(this).find("span").addClass("spanShow");
		});
		$(".iWorksTab").mouseout(function(){
			$(this).find("span").removeClass("spanShow");
		});
		aA.click(function(){
			require('./js/hide').hide(window.location.hash,this.dataset.hash);
		});
		function toMove()
		{
			for(var i=0;i<aLi.length-1;i++)
			{
				$.setCss(aLi.eq(i),aAttr[i]);
				aPic.eq(i).css("opacity",aOpacity[i]);
				aPic2.eq(i).css("opacity",(1-aOpacity[i]));
			}
		}
	}
	
	exports.fnIWorksTab = fnIWorksTab;
	
});
define('./banner3d.js',[],function(require,exports,module){
	
	function MouseToMove(id){
		this.id = null;
		this.width = 0;
		this.height = 0;
		this.left = 0;
		this.top = 0;
		this.arr = [];
		this.bBtn = false;
	}
	MouseToMove.prototype = {
		init : function(id){
			this.id = $('#'+id);
			this.id.mousemove($.proxy(this.toMove,this));
			this.width = this.id.outerWidth()/2;
			this.height = this.id.outerHeight()/2;
			this.left = this.id.offset().left;
			this.top = this.id.offset().top;
		},
		childs : function(options){
			var defaults = {
				iLeft : 0,
				iTop : 0,
				iScale : 0,
				bLeft : false,
				bTop : false,
				fnMove : false
			};
			options.childId = typeof options.childId == 'string' ? $('#'+options.childId) : $(options.childId);
			options.left = parseFloat(options.childId.css('left'));
			options.top = parseFloat(options.childId.css('top'));
			options.scale = 100;
			$.extend(defaults,options);
			
			this.arr.push(defaults);
		},
		toMove : function(ev){
			var scaleX = (ev.pageX - this.left)/this.width - 1;
			var scaleY = (ev.pageY - this.top)/this.height - 1;
			var scaleZ = Math.abs((ev.pageX - this.left)/this.width - 1);
			var doc = document;
			
			for(var i=0;i<this.arr.length;i++){	
				var obj = this.arr[i].childId[0];
				
				var bLeft = this.arr[i].bLeft ? 1 : -1;
				var bTop = this.arr[i].bTop ? 1 : -1;
				
			    if(this.arr[i].fnMove){ this.arr[i].fnMove(); }
				
				miaovStartMove(obj, {left: this.arr[i].left + bLeft * scaleX * this.arr[i].iLeft,top : this.arr[i].top + bTop * scaleY * this.arr[i].iTop,scale:this.arr[i].scale + -scaleZ * this.arr[i].iScale }, MIAOV_MOVE_TYPE.BUFFER);
				
			}
		},
		fnStop : function(){
			this.id.off('mousemove');
		},
		fnContinue : function(){
			this.id.mousemove($.proxy(this.toMove,this));
		}
	};
	
	exports.banner3d = MouseToMove;
	
});