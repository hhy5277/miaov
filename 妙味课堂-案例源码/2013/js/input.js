define(function(require,exports,module){
	function Input(oParent,bHeight)
	{
		this.oParent=oParent;
		this.oInput=oParent.find(".miaovInput");
		this.oText=oParent.find(".miaovInputText");
		this.iLength=0;
		this.oLd=0;
		this.iLastIndex=0;
		this.bMark=false;
		this.off=true;
		this.bHeight=bHeight;
		this.create();
	}
	Input.prototype={
		create:function()
		{
			if($("#InputCss").length<1)
			{
				
				$("head").eq(0).append('<style id="InputCss">@-webkit-keyframes ico{0%{opacity:1;-webkit-transform:scaleY(1)}20%{opacity:1;-webkit-transform:scaleY(1)}80%{opacity:0.2;-webkit-transform:scaleY(.8)}100%{opacity:0.2;-webkit-transform:scaleY(.8)}}@-moz-keyframes ico{0%{opacity:1;-moz-transform:scaleY(1)}20%{opacity:1;-moz-transform:scaleY(1)}80%{opacity:0.2;-moz-transform:scaleY(.8)}100%{opacity:0.2;-moz-transform:scaleY(.8)}}@keyframes ico{0%{opacity:1;transform:scaleY(1)}20%{opacity:1;transform:scaleY(1)}80%{opacity:0.2;transform:scaleY(.8)}100%{opacity:0.2;transform:scaleY(.8)}}@-webkit-keyframes add1{0%{opacity:0;top:-5px}70%{opacity:1;top:2px}}@-moz-keyframes add1{0%{opacity:0;top:-5px}70%{opacity:1;top:2px}}@keyframes add1{0%{opacity:0;top:-5px}70%{opacity:1;top:2px}}@-webkit-keyframes add2{0%{opacity:0;top:5px}70%{opacity:1;top:-2px}}@-moz-keyframes add2{0%{opacity:0;top:5px}70%{opacity:1;top:-2px}}@keyframes add2{0%{opacity:0;top:5px}70%{opacity:1;top:-2px}}.miaovInputText em{display:inline-block;font-style:normal;position:relative;top:0;left:0;vertical-align:middle}.miaovInputText .ico{width:1px;height:16px;background:#fff;position:absolute;box-shadow:0px 0px 5px #fff;-webkit-animation:ico .3s alternate infinite;-moz-animation:ico .3s alternate infinite;animation:ico .3s alternate infinite;display:none;position:absolute;vertical-align:middle}.miaovInputText .add1{-webkit-animation:add1 .3s ease;-moz-animation:add1 .3s ease;animation:add1 .3s ease}.miaovInputText .add2{-webkit-animation:add2 .3s ease;-moz-animation:add2 .3s ease;animation:add2 .3s ease}</style>');   		
			}
			this.Ico=$('<span class="ico" id="ico"></span>');	
			this.oText.append(this.Ico);
			this.addEvent();	
		},
		addEvent:function()
		{
			var _this=this;
			this.oInput.focus(function()
			{
				_this.mark();
				_this.Ico.css('display','inline');
			});
			this.oInput.blur(function()
			{
				_this.mark();
				_this.Ico.css('display','none');
			});
			this.oInput.keydown(function(ev){
				_this.mark();
				//console.log(this.maxLength,this.value);
				if(this.value.length>=this.maxLength)
				{
					return false;
				}
				switch(ev.keyCode)
				{
					case 8:
					var oSelect=_this.Selection();
					_this.off=false;
					_this.remove2(oSelect);
					return false;			
					break;
				}
			});
			this.oInput.keyup(function(){
				_this.mark();
			});
			this.oInput.click(function(){
				_this.mark();
			});
			this.oInput.mousemove(function(){
				_this.mark();
			});
			this.oInput.select(function(){
				_this.mark();
			});
			this.oInput.get(0).oninput=function()
			{
				if(this.value.length>_this.iLength)
				{
					_this.add();	
				}
				else
				{
					if(_this.off)
					{
						_this.remove();
					}
				}
			};
		},
		Selection:function()
		{
			var start =this.oInput.get(0).selectionStart;
			var end =this.oInput.get(0).selectionEnd;
			return {"start":start,"end":end}
		},
		remove:function()
		{
			var aVal=this.oInput.val().split("");
			var sHtml="";
			for(var i=0;i<aVal.length;i++)
			{
				aVal[i]=aVal[i]==" "?"&nbsp;":aVal[i];
			}
			for(var i=0;i<aVal.length;i++)
			{
				sHtml+="<em>"+aVal[i]+"</em>"
			}
			iLength=aVal.length;
			this.oText.html(sHtml);
			aEm=this.oText.find("em");
			this.cursor();
			if(this.bHeight)
			{
				this.oInput.css('height',this.oText.height()+"px");	
			}
		},
		remove2:function(oSelection)
		{
			var iStart=oSelection.start;
			var iEnd=oSelection.end;
			var aVal=this.oInput.val().split("");
			if(iEnd<1)
			{
				return;
			}
			if(iStart==iEnd)
			{
				var obj=this.oText.find("em").eq(iEnd-1);
				iStart=iEnd-1;
			}
			else
			{
				var obj=this.oText.find("Mark").find("em");
			}
			var _this=this;
			obj.animate({left:10,opacity:0},200,function(){
				_this.off=true;
				$(this).css('width',"0px");
				$(this).remove();
				if(_this.bHeight)
				{
					_this.oInput.css('height',_this.oText.height()+"px");	
				}
			})
			aVal.splice(iStart,iEnd-iStart);
			_this.oInput.val(aVal.join(""));
			_this.oInput.get(0).selectionStart=iStart;
			_this.oInput.get(0).selectionEnd=iStart;
			_this.iLength=aVal.length;
		},
		mark:function(){
			var oSelect=this.Selection();
			var aVal=this.oInput.val().split("");
			var sHtml="";
			for(var i=0;i<aVal.length;i++)
			{
				aVal[i]=aVal[i]==" "?"&nbsp;":aVal[i];
			}
			if(oSelect.end-oSelect.start<=0)
			{
				if(this.bMark)
				{
					for(var i=0;i<aVal.length;i++)
					{
						sHtml+="<em>"+aVal[i]+"</em>";
					}
					this.oText.html(sHtml);
					this.bMark=false;
				}
				this.cursor();
			}
			else
			{
				for(var i=0;i<oSelect.start;i++)
				{
					sHtml+="<em>"+aVal[i]+"</em>"
				}
				sHtml+="<mark>";
				for(var i=oSelect.start;i<oSelect.end;i++)
				{
					sHtml+="<em>"+aVal[i]+"</em>";
				}
				sHtml+="</mark>";
				for(var i=oSelect.end;i<aVal.length;i++)
				{
					sHtml+="<em>"+aVal[i]+"</em>";
				}
				this.bMark=true;
				this.oText.html(sHtml);
			}
		},
		cursor:function()
		{
			var oSelect=this.Selection();
			if(oSelect.end==0)
			{
				this.oText.prepend(this.Ico);	
			}
			else
			{
				$(this.Ico).insertAfter(this.oText.find("em").eq(oSelect.end-1));
			}
			iLastIndex=this.oText.find("em").length-this.Ico.index();
		},
		add:function()
		{
			var sEm="";
			var sClass="";
			this.iLength++;
			sEm=this.oInput.val().charAt(this.Ico.index());
			sEm= sEm==" "?"&nbsp;":sEm;
			sClass=$("#ico").index()%2?"add1":"add2";
			$("<em class='"+sClass+"'>"+sEm+"</em>").insertBefore(this.Ico);
			iLastIndex=this.oText.find("em").length-this.Ico.index();
			if(this.oInput.val().length>this.iLength)
			{
				this.add();
			}
			if(this.bHeight)
			{
				this.oInput.css('height',this.oText.height()+"px");	
			}
		}	
	};
	exports.Input = Input;
});