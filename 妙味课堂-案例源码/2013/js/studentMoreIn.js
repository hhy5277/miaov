define(function(require,exports,module){
	function init(inner){
		$("#main").get(0).className="pageBg1 pageBg3";
		if(!window.aStudentMoreTimer)
		{
			window.aStudentMoreTimer=[];
		}
		else
		{
			$.each(window.aStudentMoreTimer,function(i){
				clearTimeout(window.aStudentMoreTimer[i]);
			});
			window.aStudentMoreTimer.length=0;
		}
		$("html,body").animate({scrollTop:0},300);
		require('./fnVer').fnVer($("#studentMore").find(".verification_box").eq(0).get(0));
		if(!window.aStudentMore)
		{
			window.aStudentMore=new (require('./message').Message);
			window.aStudentMore.init($("#studentMMessage"));
		}
		/*if(!window.worksInput1)
		{
			window.worksInput1=new (require('./input').Input)($(".worksInput1:eq(0)"),false);
		}

		if(!window.worksInput3)
		{
			window.worksInput1=new (require('./input').Input)($(".worksInput3:eq(0)"),false);
		}*/
		var oPost=new (require('./post').Post)({
			form:$(".messageForm").find(".messageTable").eq(0),
			name:$(".messageForm").find("input[name='name']").eq(0),
			text:$(".messageForm").find("textarea").eq(0),
			vCode:$(".messageForm").find("input[name='verification']").eq(0),
			vCodeImg:$(".messageForm").find("img").eq(0),
			action:domain+"/api.php/guestbook/save",
			Mark:2,
			fromid:inner,
			end:function(name,val){
				window.aStudentMore.add(name,val);
			}
		});
		
		$.df.done(function(){
			$.ajax({
				url:domain+"/api.php/works/getDetail",
				dataType:"json",
				type:'get',
				data:"id="+inner+"&fdate=Y-m-d",
				success:function (json){
					picTabCreate(json.pics,json.url);
					picTextCreate(json);
					workListGet(inner);
					window.aStudentMore.set({
						url:domain+"/api.php/guestbook/getList",
						id:inner,
						mark:2
					});	
				}
			});
		});
	}
	function picTabCreate(aPic,url)
	{
		var arr=[];
		$.each(aPic,function(i){
			arr[i]=new Image();
			arr[i].src=domain+aPic[i];
			arr[i].bOff=false;
		});
		$.each(arr,function(i)
		{
			arr[i].onload=function()
			{
				var bOff=true;
				this.bOff=true;
				$.each(arr,function(i)
				{
					if(!arr[i].bOff)
					{
						bOff=arr[i].bOff;
					}
				});
				if(bOff)
				{
					var sHtml="";
					$.each(arr,function(i)
					{
						var iDeg=parseInt(Math.random()*1000%8)-4;
						sHtml+='<li><a target="_blank" href="'+url+'" style="background-image:url('+arr[i].src+');-webkit-transform:rotate('+iDeg+'deg);-moz-transform:rotate('+iDeg+'deg);transform:rotate('+iDeg+'deg);"></a></li>';
					});
					$("#studentMtAltPic>ul").html(sHtml);
					$("#studentMtAltPic").css("opacity",1);
					$("#studentMtAltPic").find(".ico").attr("href",url);
					picTabShow();
				}
			}
		});
	}
	function picTextCreate(oStudentMtAlt)
	{
		$("#studetnMtAltText").html('<section><hgroup class="studentMtAltTTitle"><h2>'
		+oStudentMtAlt['name']+'</h2><p>作者:'+oStudentMtAlt['author']+'<time>DATE:'+oStudentMtAlt['dateline']+'</time></p></hgroup><section class="studentMtAltTC">'+oStudentMtAlt['detail']+'</section></section>');
	}
	function workListGet(inner)
	{
		$.ajax({
			url:domain+"/api.php/works/getRangeList",
			dataType:"json",
			type:'get',
			data:"id="+inner,
			success:function (json){
				workListCreate(json.list)
			}
		});
	}
	function workListCreate(arr)
	{
		var oList=$("#worksList").find(".worksListPic");
		var sHtml="";
		var aLi=[];
		for(var i=0;i<arr.length;i++)
		{
			sHtml+="<li><a href='javascript:;' data-hash='#studentMore_"+arr[i]["workid"]+"' style='background-image:url("+domain+"/"+arr[i]["pic"]+")'><span>"+arr[i]["name"]+"</span></a></li>";
		}
		oList.html(sHtml);
		aLi=oList.find("li");
		oList.css("width",aLi.length*aLi.width()+"px");
		workListShow()
	}
	function workListShow()
	{
		var oList=$("#worksList");
		var oUl=oList.find(".worksListPic")
		var aLi=oList.find("li");
		var aWorksListBtn=oList.find(".worksListBtn");
		var iNow=Math.floor((aLi.length/2));
		var iWidth=aLi.width();
		var iLeft=aLi.eq(iNow).position().left-(oUl.parent().width()-iWidth)/2;
		oUl.css('left',-iLeft+"px");
		aLi.eq(iNow).addClass("active");
		aWorksListBtn.eq(0).click(function(){
			if(iNow<=0)
			{
				return;
			}
			aLi.eq(iNow).removeClass("active");
			iNow--;
			iLeft=aLi.eq(iNow).position().left-(oUl.parent().width()-iWidth)/2;
			oUl.css('left',-iLeft+"px");
			aLi.eq(iNow).addClass("active");
		});
		aWorksListBtn.eq(1).click(function(){
			if(iNow>=aLi.length-1)
			{
				return;
			}
			aLi.eq(iNow).removeClass("active");
			iNow++;
			iLeft=aLi.eq(iNow).position().left-(oUl.parent().width()-iWidth)/2;
			oUl.css('left',-iLeft+"px");
			aLi.eq(iNow).addClass("active");
		});
		oUl.find("a").click(function(){
			require('./hide').hide(window.location.hash,this.dataset.hash);
		});
	}
	function picTextShow()
	{
		var iHeight=$("#studetnMtAltText>section").height();
		$("#studetnMtAltText").stop().animate({height:iHeight},600,function(){
			$(".messageForm").animate({opacity:1},600,function(){
				$(".worksList").animate({opacity:1},600,function(){
					workListShow();
				});
			});
			
		});
	}
	function picTabShow()
	{
		var oBj=$("#studentMtAltPic");
		var aLi=oBj.find("li");
		var aBtn=oBj.find(".btn");
		var iNow=0;
		var i=aLi.length-1;
		var iZindex=aLi.length;
		aLi.each(function(i){
			css(this,"scale",120);
		});
		window.aStudentMoreTimer[0]=setInterval(function(){
			if(i==0)
			{
				clearInterval(window.aStudentMoreTimer[0]);
				picTextShow();
				window.aStudentMore.get(1);
				$.fn.bHash = true;
				if(aLi.length>1)
				{		
					oBj.hover(function(){
						aBtn.css('opacity',1);
						oBj.find(".ico").css("opacity",1);
					},function(){
						aBtn.css('opacity',0);
						oBj.find(".ico").css("opacity",0);
					});
					aBtn[0].onclick=function()
					{
						iNow--;
						if(iNow<0)
						{
							iNow=aLi.length-1;
						}
						tab(200);
					}
					aBtn[1].onclick=function()
					{
						iNow++;
						if(iNow>aLi.length-1)
						{
							iNow=0;
						}
						tab(-200);
					}
				}
			}
			aLi.eq(i).css("z-index",aLi.length-i);
			tweenMove(aLi.eq(i).get(0),{opacity:100,scale:100},600,"easeOut");
			i--;
		},500);		
		function tab(iLeft)
		{
			aBtn.css({opacity:0,visibility:"hidden"});
			$("#studentMtAltPic").find(".ico").css("opacity",0);
			tweenMove(aLi.eq(iNow).get(0),{opacity:0,left:iLeft},400,"easeBoth",function(){
				iZindex++;
				this.style.zIndex=iZindex;
				css(this,"scale",120);
				tweenMove(aLi.eq(iNow).get(0),{opacity:100,left:0,scale:100},300,"easeOut",function(){
				aBtn.css({opacity:1,visibility:"visible"});
				$("#studentMtAltPic").find(".ico").css("opacity",1);
				});
			});				
		}
	}
	exports.init = init;
});
