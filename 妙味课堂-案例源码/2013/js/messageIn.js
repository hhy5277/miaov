define(function(require,exports,module){
	function init()
	{
		$("#main").get(0).className="pageBg1 pageBg3";
		if(!window.MessageTimer)
		{
			window.MessageTimer=[];
		}
		else
		{
			$.each(window.MessageTimer,function(i){
				clearTimeout(window.MessageTimer[i]);
			});
			window.MessageTimer.length=0;
		}
		setTimeout(function()
		{
			$.fn.bHash = true;
		},100);
		$("html,body").animate({scrollTop:0},300);
		if(!window.Message)
		{
			window.Message=new (require('./message').Message);
			window.Message.init($("#MessageList"));
			require('./fnScroll').fnScroll($("#message .scrollBar"),$("#message .scrollBar").offset().top);
		}
		require('./fnVer').fnVer($("#message").find(".verification_box").eq(0).get(0));
		window.Message.set({
			url:domain+"/api.php/guestbook/getList",
			id:0,
			mark:1
		});
		/*if(!window.MaessageInput1)
		{
			window.MaessageInput1=new (require('./input').Input)($(".messageInput1:eq(0)"),false);
		}
		if(!window.MaessageInput3)
		{
			window.MaessageInput1=new (require('./input').Input)($(".messageInput3:eq(0)"),false);
		}*/
		var oPost=new (require('./post').Post)({
			form:$(".messageAside").find(".messageTable").eq(0),
			name:$(".messageAside").find("input[name='name']").eq(0),
			text:$(".messageAside").find("textarea").eq(0),
			vCode:$(".messageAside").find("input[name='verification']").eq(0),
			vCodeImg:$(".messageAside").find("img").eq(0),
			action:domain+"/api.php/guestbook/save",
			Mark:1,
			fromid:0,
			end:function(name,val){
				window.Message.add(name,val);
			}
		});
		$.df.done(function(){
			window.Message.get(1);
			window.MessageTimer[0]=setTimeout(function(){
				$(".messageAside").animate({opacity:1},800,function(){
					$.fn.bHash = true;
				});
			},200);
		});
	};		
	exports.init = init;
});
