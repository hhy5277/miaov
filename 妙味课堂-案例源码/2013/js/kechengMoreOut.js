define(function(require,exports,module){
	var bBtn = true;
	var sCH = '';
	function init(changeHash){
		sCH = changeHash;
		if(bBtn)
		{	
			bBtn = false;
			$.each(window.aKeChengMoreTimer,function(i){
				clearTimeout(window.aKeChengMoreTimer[i]);
			});
			if(window.KeChengStep)
			{
				hide2();
			}
			else
			{
				hide();
			}
		}
		function hide()
		{
			var oBj=$("#curriculumMore");;
			var oNavPrev=oBj.find(".cMCNavPrev");
			var oNavNext=oBj.find(".cMCNavNext");
			var oNav=oBj.find(".curriculumMoreNav");
			var aNav=oNav.find("li");
			var aBox=oBj.find(".cMContentBox");
			var aAlertBut=aBox.find(".cMCBtn");
			var aLeft=[0,105,210,315,420,525,630];
			aNav.find("a").unbind();
			oNavPrev.unbind();
			oNavNext.unbind();
			aAlertBut.unbind();
			$(".curriculumTabNext").removeClass("curriculumTabNextShow");
			$(".curriculumTabPrev").removeClass("curriculumTabPrevShow");
			oBj.find(".cMContentBox").eq(oBj.get(0).iNow).addClass("cMContentBoxHide");
			oBj.find(".cMContentBox").eq(oBj.get(0).iNow).removeClass("cMContentBoxShow");
			$.setCss(oNav,{$Transition:"0ms all linear"});
			$.each(aNav,function(i)
			{
					$.setCss(aNav.eq(i),{$Transition:aLeft[i]+"ms "+(aLeft[6]-aLeft[i])+"ms all linear",left:-6});
					$.setCss(aNav.eq(i).find("a"),{$Transition:aLeft[i]+"ms all linear",opacity:0});
			});
			$.setCss(oNav,{$Transition:aLeft[6]+"ms width linear",width:0});
			$.setCss(oNav.find(".active"),{$Transition:200+"ms all linear",left:-12});
			oNav.stop().animate({marginLeft:"0px"},aLeft[6],"linear",function(){
				oNav.stop().animate({opacity:0},function(){
						$(".curriculumChildBg").stop().animate({opacity:0},function(){
						$.fn.bHash = false;
						bBtn = true;
						window.location.hash = sCH;
						require('./show').show(sCH);
						window.KeChengStep=0;
					});
				});
			});
		}
		function hide2()
		{
			var oWindow=$(".alertBox");
			$(".alertBox").each(function()
			{
				tweenMove(this,{translateY:400,translateZ:-100,scale:10,rotateX:180,opacity:0},800,'easeOut',function(){hide();});
			});
		}
	};
	exports.init = init;
	
});