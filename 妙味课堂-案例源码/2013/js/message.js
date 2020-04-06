// JavaScript Document
define(function(require,exports,module){
	function Message()
	{
		this.aList=[];	
		this.pageNow=0;
		this.pages=0;
		this.pagesStart=0;
		this.pagesEnd=0;
		this.listHeight=0;
		this.off=true;
	}
	Message.prototype={
		init:function(obj)
		{
			this.obj=obj;
			this.oList=this.obj.find(".messageList");
			this.ListC=this.oList.find("ul").eq(0);
			this.footer=this.obj.find(".messageFoot");
			this.footerC=this.obj.find(".messageFootC");
			this.footerPage=this.footerC.find(".messagePage");
			this.footerBtn=this.footerC.find(".messageBtn");
			this.aLi=[];
			this.timer=null;
			this.fdate='Y-m-d H:i:s';
		},
		set:function(json)
		{
			this.url=json["url"];
			this.fromid=json["id"];
			this.mark=json["mark"];
		},
		get:function(iNow)
		{
			var _this=this;
			$.ajax(
				{
					url:_this.url,
					dataType:"json",
					type:'get',
					data:"p="+iNow+"&mark="+_this.mark+"&fromid="+_this.fromid +'&prepage=8'+'&fdate='+_this.fdate,
					success:function(json){
						if(_this.off)
						{
							_this.aList=json['list'];
							_this.pageNow=iNow;
							_this.pages=json['pages'];
							_this.footerBtn.eq(0).attr('nub',1);
							_this.footerBtn.eq(_this.footerBtn.length-1).attr('nub',_this.pages);
							_this.createList();
							_this.createFooter();
						}
						else
						{
							_this.listHide(function(){
								_this.aList=json['list'];
								_this.pageNow=iNow;
								_this.pages=json['pages'];
								_this.footerBtn.eq(0).attr('nub',1);
								_this.footerBtn.eq(_this.footerBtn.length-1).attr('nub',_this.pages);
								_this.createList();
								_this.createFooter();
							});
						}
					}
				}
			);	
		},
		add:function(name,val){
			var _this=this;
			var oDate=new Date();
			var sYear=oDate.getFullYear();
			var iMonth=oDate.getMonth()+1;
			var sMonth=iMonth>=10?iMonth:"0"+iMonth;
			var sDay= oDate.getDate()>=10?oDate.getDate():"0"+oDate.getDate();
			var sHours= oDate.getHours()>=10?oDate.getHours():"0"+oDate.getHours();
			var sMin= oDate.getMinutes()>=10?oDate.getMinutes():"0"+oDate.getMinutes();
			var sSec= oDate.getSeconds()>=10?oDate.getSeconds():"0"+oDate.getSeconds();
			var sTime=sYear+"-"+sMonth+"-"+sDay+" "+sHours+":"+sMin+":"+sSec+":"+sSec;
			var sHtml='<li style="opacity:0;height:0"><section class="messageListBox clear"><aside class="picture"></aside><span class="ico"></span><article class="leaveComments studentMBox"><header class="title studentMBoxHead"><span class="titleIco"></span><h3>'+name+'</h3><time>['+sTime+']</time></header><p class="content">'+val+'</p></article></section></li>';
			$(sHtml).insertBefore(this.ListC.find("li").eq(0));
			var iHeight=this.ListC.find("li").eq(0).find(".messageListBox").eq(0).height()+20;
			this.ListC.find("li").eq(0).animate({height:iHeight},300,function(){
				_this.ListC.find("li").eq(0).animate({opacity:1},100);
				_this.liShow(_this.ListC.find("li").eq(0));			
			});
			this.oList.stop().animate({height:this.oList.height()+iHeight},300);			
		},
		createList:function()
		{
			var sHtml="";
			this.oList.css({height:0,overflow:"hidden"});
			this.ListC.css({height:"auto",$Transition:"none"});
			$.each(this.aList,function(i){
				sHtml+='<li><section class="messageListBox clear"><aside class="picture"></aside><span class="ico"></span><article class="leaveComments studentMBox"><header class="title studentMBoxHead"><span class="titleIco"></span><h3>'+this['username']+'</h3><time>['+this['addtime']+']</time></header><div class="content">'+this['content']+'</div></article>';
				if(this['reply'])
				{
					sHtml+='<article class="reply studentMBox"><header class="title studentMBoxHead"><span class="titleIco"></span><h3>管理员回复</h3><time>['+this['replytime']+']</time></header><div class="content">'+this['reply']+'</div></article>';
				}
				sHtml+="</section></li>";
			});
			this.ListC.html(sHtml);
			this.aLi=this.ListC.find("li");
		},
		createFooter:function()
		{
			var sInner="";
			var _This=this;
			if(this.pages<=6)
			{
				this.pagesStart=0;
				this.pagesEnd=this.pages;
			}
			else
			{
				if(this.pageNow>=2 && (this.pageNow+4)<this.pages)
				{
					this.pagesStart=this.pageNow-2;
					this.pagesEnd=this.pageNow+4;
				}
				else if(this.pageNow<2)
				{
					this.pagesStart=0;
					this.pagesEnd=6;
				}
				else
				{
					this.pagesStart=this.pages-6;
					this.pagesEnd=this.pages;
				}
			}
			for(var i=this.pagesStart;i<this.pagesEnd;i++)
			{
				sInner+='<a href="javascript:;" class="messageA messageNub" nub='+(i+1)+'>'+(i+1)+'</a>';	
			}
			this.footerPage.html(sInner);
			this.footerPage.find("a").removeClass("active");
			this.footerPage.find("a[nub="+(this.pageNow)+"]").addClass("active");
			this.footerBtn.eq(1).attr('nub',this.pageNow-1);
			this.footerBtn.eq(2).attr('nub',this.pageNow+1);
			if(this.pageNow==1 && this.pageNow==this.pages)
			{
				this.footerBtn.eq(0).css("display","none");
				this.footerBtn.eq(1).css("display","none");
				this.footerBtn.eq(2).css("display","none");
				this.footerBtn.eq(3).css("display","none");
			}
			else if(this.pageNow==1)
			{
				this.footerBtn.eq(0).css("display","none");
				this.footerBtn.eq(1).css("display","none");
				this.footerBtn.eq(2).css("display","inline-block");
				this.footerBtn.eq(3).css("display","inline-block");
			}
			else if(this.pageNow==this.pages)
			{
				this.footerBtn.eq(0).css("display","inline-block");
				this.footerBtn.eq(1).css("display","inline-block");
				this.footerBtn.eq(2).css("display","none");
				this.footerBtn.eq(3).css("display","none");
			}
			else
			{
				this.footerBtn.eq(0).css("display","inline-block");
				this.footerBtn.eq(1).css("display","inline-block");
				this.footerBtn.eq(2).css("display","inline-block");
				this.footerBtn.eq(3).css("display","inline-block");
			}
			this.footerC.find(".messageNub").click(function(){
				if($(this).attr("nub")==_This.pageNow)
				{
					return;
				}
				_This.footHide(parseInt($(this).attr("nub")));
			});
			this.show();
		},
		show:function()
		{
			var _this=this;
			this.obj.stop().animate({opacity:1},600,function(){_this.scroll();});
			this.footer.animate({opacity:1,top:0});
			this.oList.stop().animate({height:this.ListC.height()+22},1000);
			this.footShow();
		},
		scroll:function()
		{
			var _this=this;
			this.aLi.each(function(i){
				this.bOff=true;	
			});
			show();
			$(window).resize(function(){
				show();
			});
			$(window).scroll(function(){
				show();
			});
			function show()
			{
				var iTop=document.body.scrollTop||document.documentElement.scrollTop;
				var iWinHeight=$(window).height()-30;
				_this.aLi.each(function(i){
					if(this.bOff && $(this).offset().top<(iTop+iWinHeight))
					{
						this.bOff=false;
						_this.listShow(i);
					}	
				});
			}
		},
		listShow:function(iNow)
		{				
			var obj=this.aLi.eq(iNow);
			this.liShow(obj);
			this.off=false;
		},
		liShow:function(obj)
		{
			var oBox=obj.find(".messageListBox").eq(0).get(0);
			css(oBox,"rotateY",90);
			clearTimeout(oBox.timer2);
			tweenMove(oBox,{rotateY:0,opacity:100},800,"backOut");
			oBox.timer2=setTimeout(function()
			{
				if(oBox.children[oBox.children.length-1].className=="reply studentMBox")
				{
					css(oBox.children[oBox.children.length-1],"rotateX",-180);
					tweenMove(oBox.children[oBox.children.length-1],{opacity:100,rotateX:0},1900,"elasticOut");					
				}
			},400);
		},
		footShow:function()
		{
			this.footerC.stop().animate({opacity:1},400);
		},
		footHide:function(nub)
		{
			var _this=this;
			this.footerC.stop().animate({opacity:0},function(){
				_this.get(nub);
			});
			this.listHeight=parseInt(this.ListC.css("height"));
			this.ListC.css('height',this.listHeight+"px");
		},
		listHide:function(nub)
		{
			var _this=this; 
			var i=_this.aLi.length-1;
			var iDaley=0;
			var end=function(){};
			clearInterval(_this.timer);
			if(typeof nub == "number")
			{
				end=function(){
					_this.get(nub);
				};
			}
			else if(typeof nub == "function" )
			{
				end=nub;
			}
			this.footer.animate({opacity:0,top:50});
			function time(nub)
			{
				var iDelay=100;
				tweenMove(_this.aLi.find(".messageListBox").eq(nub).get(0),{opacity:0,marginTop:30},400,"easeIn",function(){
					$(this).parent().remove();
					});
				if(nub>0)
				{
					nub--;
					setTimeout(function(){
						time(nub);
					},iDelay);
				}
			}
			time(i);
			_this.timer=setTimeout(function()
			{
				tweenMove(_this.oList.get(0),{height:0},500,"easeBoth",function(){end();});
			},_this.aLi.length*80);
		}
	};
	exports.Message = Message;
})