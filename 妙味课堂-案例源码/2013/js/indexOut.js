define(function(require,exports,module){
	
	var bBtn = true;
	
	var sCH = '';
	
	function init(changeHash){
		
		sCH = changeHash;
		
		if(bBtn){
			
			bBtn = false;
		
			/*$('#div1').stop().animate({width:100},2000,function(){
				
				$.fn.bHash = false;
				bBtn = true;
				window.location.hash = sCH;
				
				require('./show').show(sCH);
				
			});*/
			if(window.aIndexTimer)
			{
				for(var i=0;i<window.aIndexTimer.length;i++)
				{
					clearTimeout(window.aIndexTimer[i]);
				}
			}
			oIndexCourse.hide();
			$('#iBanner').stop().animate({opacity:0},500);
			$('#iCourseTab').stop().animate({top:80},500);
			$('#iContent').stop().animate({top:30,opacity:0},500);
			$('#iBannerRight').stop().animate({top:80},500,function(){
				$("#iCourseTabPic").off();
				$("#iBannerRight").off();
				window.mm1=null;
				$.fn.bHash = false;
				bBtn = true;
				window.location.hash = sCH;
				require('./show').show(sCH);
				$('#iBannerRight').css({top:0,opacity:1});
				$('#iBanner').css({opacity:1});
				$('#iContent').css({top:0,opacity:1});
				$('#iCourseTab').css({top:46,opacity:1});
			});
		
		}
	}
	
	exports.init = init;
		
});