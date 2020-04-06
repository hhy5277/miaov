define(function(require,exports,module){
	function init(inner){
		$("#main").get(0).className="pageBg1 pageBg2";
		if(window.aKeChengMoreTimer)
		{
			$.each(window.aKeChengMoreTimer,function(i){
				clearTimeout(window.aKeChengMoreTimer[i]);
			});
		}
		else
		{
			window.aKeChengMoreTimer=[];
		}
		setTimeout(function()
		{
			$.fn.bHash = true;
		},100);	
		$(".curriculumMoreWrap").html(require('./CourseData').courseDate[inner]);
		switch(inner)
		{
			case "html5":
			$(".curriculumTabPrev").html("<span class='bg'>移动开发课程</span><span class='shadow'></span>");
			$(".curriculumTabPrev").attr("data-hash","#curriculumMore_css");
			$(".curriculumTabNext").html("<span class='bg'>Javascript</span><span class='shadow'></span>");
			$(".curriculumTabNext").attr("data-hash","#curriculumMore_js");
			break;
			case "css":
			$(".curriculumTabPrev").html("<span class='bg'>Javascript</span><span class='shadow'></span>");
			$(".curriculumTabPrev").attr("data-hash","#curriculumMore_js");
			$(".curriculumTabNext").html("<span class='bg'>jQ集训营</span><span class='shadow'></span>");
			$(".curriculumTabNext").attr("data-hash","#curriculumMore_html5");
			break;
			case "js":
			$(".curriculumTabNext").html("<span class='bg'>移动开发课程</span><span class='shadow'></span>");
			$(".curriculumTabPrev").html("<span class='bg'>jQ集训营</span><span class='shadow'></span>");
			$(".curriculumTabPrev").attr("data-hash","#curriculumMore_html5");
			$(".curriculumTabNext").attr("data-hash","#curriculumMore_css");
			break;
		}
		$.df.done(function(){fnCStep2();});
	}
	function fnCStep2()
	{
		var oBj=$("#curriculumMore");
		oBj.get(0).iNow=0;
		var aLeft=[0,105,210,315,420,525,630];	
		$(".curriculumChildBg").stop().animate({opacity:0.5},400,keChengShow);
		function keChengShow()
		{	
			var oNavPrev=oBj.find(".cMCNavPrev");
			var oNavNext=oBj.find(".cMCNavNext");
			var oNav=oBj.find(".curriculumMoreNav");
			var aNav=oNav.find("li");
			var aBox=oBj.find(".cMContentBox");
			var aAlertBut=aBox.find(".cMCBtn");
			$.setCss(aBox,{$Transition:"0s all ease"});
			aBox.removeClass("cMContentBoxShow");
			aBox.removeClass("cMContentBoxHide");
			oBj.css("display","block");
			oNavPrev.addClass("cMCNavPrevHide");
			
			aAlertBut.mouseover(function(ev){
				var iX=ev.clientX-$(this).offset().left;
				$.setCss($(this),{backgroundPosition:(iX-95)+"px -16px,0 0"});
			});
			aAlertBut.mousemove(function(ev){
				var iX=ev.clientX-$(this).offset().left;
				$.setCss($(this),{backgroundPosition:(iX-95)+"px -16px,0 0"});
			});
			aAlertBut.mouseout(function(){
				$.setCss($(this),{backgroundPosition:"20px -16px,0 0"});
			});
			$.setCss(oNav.find(".active"),{$Transition:"0.2s all ease",opacity:100});
			oNav.stop().animate({opacity:1},400,function(){
				$.fn.bHash = true;
				$.setCss(oNav.find(".active"),{$Transition:0+"ms all linear"});
				tweenMove(oNav.get(0),{width:aLeft[6],marginLeft:-aLeft[6]/2},600,"easeBoth",function(){
					tweenMove(oNav.find(".active").get(0),{left:-8},400,"easeBoth",function(){
						$.setCss(aNav.eq(0).find("a"),{$Transition:"0.1s all ease",top:-35});
						$.setCss(aNav.find("a"),{$Transition:"0.2s all linear",opacity:100});
						})	
					},function(){
						oNav.find(".active").css("left",(this.offsetWidth/2-8)+"px");
					});
				$.setCss(aBox,{$Transition:".8s all ease"});
				boxShow(oBj);
				$(".curriculumTabNext").addClass("curriculumTabNextShow");
				$(".curriculumTabPrev").addClass("curriculumTabPrevShow");
				$(".curriculumTab").click(function(){
					require('./hide').hide(window.location.hash,this.dataset.hash);
				});
				$("#curriculumMore").find(".cMCBtnShow").click(function(){
					require('./hide').hide(window.location.hash,this.dataset.hash);	
				});
				aNav.find("a").hover(function()
				{
					$.setCss(oNav.find(".active"),{$Transition:"0.2s all linear",opacity:100,left:$(this).parent().position().left-8});
				},function(){
					$.setCss(oNav.find(".active"),{$Transition:"0.2s all linear",opacity:100,left:aNav.eq(oBj.get(0).iNow).position().left-8});
				});
				aNav.find("a").click(function(){
					tab($(this).parent().index());
				});	
				oNavPrev.click(function(){
					if(oBj.get(0).iNow-1>=0)
					{
						tab(oBj.get(0).iNow-1);
					}
				});
				oNavNext.click(function(){
					if(oBj.get(0).iNow+1<aBox.length)
					{
						tab(oBj.get(0).iNow+1);
					}
				});
				aAlertBut.click(function(){
					var oWindow=$(this).parent().find(".alertBox");
					css(oWindow.get(0), 'translateY', 400);
					css(oWindow.get(0), 'translateZ', -100);
					css(oWindow.get(0), 'scale', 10);
					css(oWindow.get(0), 'rotateX', 180);
					window.KeChengStep=1;
					if(!oWindow.get(0).bOff)
					{
						oWindow.get(0).bOff=true;
						oWindow.find(".alertBoxClos").click(function(){
							tweenMove(oWindow.get(0),{translateY:400,translateZ:-100,scale:10,rotateX:180,opacity:0},800,'easeOut');
							window.KeChengStep=0;
						});
						miaovScroll(oWindow.find(".alertBoxWindow"),oWindow.find(".alertBoxWindowC"),oWindow.find(".alertBoxScroll"),oWindow.find(".alertBoxScroll>span")); 
					}
					tweenMove(oWindow.get(0),{translateY:0,translateZ:0,scale:100,rotateX:0,opacity:100},800,'easeOut');
				});
			});	
			function tab(nub)
			{
				clearTimeout(window.aKeChengMoreTimer[0]);
				var bFF=0;
				$.setCss(oNav.find(".active"),{$Transition:"0.1s all linear",opacity:100,left:aNav.eq(nub).position().left-8});
				$.setCss(oBj.find(".cMContentBox"),{$Transition:"0s"});
				if(oBj.get(0).iNow>nub)
				{
					oBj.find(".cMContentBox").eq(nub).removeClass("cMContentBoxShow");	
					oBj.find(".cMContentBox").eq(nub).addClass("cMContentBoxHide");
					bFF=0;
					
				}
				else
				{
					oBj.find(".cMContentBox").eq(nub).removeClass("cMContentBoxShow");	
					oBj.find(".cMContentBox").eq(nub).removeClass("cMContentBoxHide");
					bFF=1;
				}
				$.setCss(aNav.eq(oBj.get(0).iNow).find("a"),{$Transition:"0.1s all ease",top:-26});
				window.aKeChengMoreTimer[0]=setTimeout(function()
				{
					boxHide(oBj,bFF);
					oBj.get(0).iNow=nub;
					boxShow(oBj);
					if(nub==0)
					{
						oNavPrev.addClass("cMCNavPrevHide");
					}
					else
					{
						oNavPrev.removeClass("cMCNavPrevHide");
					}
					if(nub==aBox.length-1)
					{
						oNavNext.addClass("cMCNavNextHide");
					}
					else
					{
						oNavNext.removeClass("cMCNavNextHide");
					}
					$.setCss(aNav.eq(oBj.get(0).iNow).find("a"),{$Transition:"0.1s all ease",top:-35});
				},30);
			}
		}
		function boxShow(obj)
		{
			$.setCss(obj.find(".cMContentBox"),{$Transition:"all 0.8s ease"});
			obj.find(".cMContentBox").eq(obj.get(0).iNow).addClass("cMContentBoxShow");	
		}
		function boxHide(obj,bOff)
		{
			var oBox=obj.find(".cMContentBox").eq(obj.get(0).iNow);
			$.setCss(obj.find(".cMContentBox"),{$Transition:"all 0.8s ease"});
			if(bOff)
			{
				obj.find(".cMContentBox").eq(obj.get(0).iNow).addClass("cMContentBoxHide");
				obj.find(".cMContentBox").eq(obj.get(0).iNow).removeClass("cMContentBoxShow");
			}
			else
			{
				obj.find(".cMContentBox").eq(obj.get(0).iNow).removeClass("cMContentBoxShow");
				obj.find(".cMContentBox").eq(obj.get(0).iNow).removeClass("cMContentBoxHide");
			}
		}
	}
	exports.init = init;
});
