// JavaScript Document leo 2012-6-20 www.miaov.com QQ:20907961

function fnElasticity(){
	var oList=document.getElementById("list");
	var aLi=oList.getElementsByTagName("li");
	var oPrev=document.getElementById("prev");
	var oNext=document.getElementById("next");
	var oTime=null;
	for(var i=0;i<aLi.length;i++)
	{
		var iTime=i*200;
		aLi[i].now=0;
		aLi[i].now2=0;
		aLi[i].timer=null;
		openMove(aLi[i],iTime);
	}
	oPrev.onmouseover=oNext.onmouseover=oList.onmouseover=function()
	{
		clearInterval(oTime);
	};
	oPrev.onmouseout=oNext.onmouseout=oList.onmouseout=function()
	{
		/*oTime=setInterval(
			function()
			{
				next();
			},4000
		);*/
	};
	oNext.onclick=next;
	/*oTime=setInterval(
		function()
		{
			next();
		},4000
	);*/
	function next()
	{
		for(var i=0;i<aLi.length;i++)
		{
			var iTime=i*100;
			aLi[i].now2++;
			if(aLi[i].now2>=getByClass("box",aLi[i]).length)
			{
				aLi[i].now2=0;
			}
			closMove(aLi[i],iTime);
		}
	}
	
	oPrev.onclick=prev;
	function prev()
	{
		for(var i=0;i<aLi.length;i++)
		{
			var iTime=i*100;
			aLi[i].now2--;
			if(aLi[i].now2<0)
			{
				aLi[i].now2=getByClass("box",aLi[i]).length-1;
			}
			closMove(aLi[i],iTime);
		}
	}
}
function closMove(obj,iTime)
{	
	var aBox=getByClass("box",obj);
	obj.timer=setTimeout(
		function()
		{
			starMove(aBox[obj.now],{scale:0,opacity:0},0,function(){
					this.style.display="none";
					openMove(obj,20);
				});
		},iTime
	);
}
function openMove(obj,iTime)
{
	var aBox=getByClass("box",obj);
	obj.timer=setTimeout(
		function()
		{
			obj.now=obj.now2;
			aBox[obj.now].style.display="block";
			starMove(aBox[obj.now],{scale:100,opacity:100},1);
		},iTime
	);
}
function doMoveBuffer(obj,target,fnEnd)
{
	var sAttr="";
	var iEnd=1;
	for(sAttr in target)
	{
		var iNow=parseFloat(css(obj,sAttr));
		if(iNow==target[sAttr])
		{
			continue;
		}
		else
		{
			var iSpeed=(target[sAttr]-iNow)/2.5;
			if(iSpeed>0)
			{
				iSpeed=Math.ceil(iSpeed);
			}
			else
			{
				iSpeed=Math.floor(iSpeed);
			}
			css(obj,sAttr,iNow+=iSpeed);
			iEnd=0;
		}
	}
	if(iEnd)
	{
		clearInterval(obj.timer);
		if(fnEnd)
		{
			fnEnd.call(obj);
		}
	}
}

function domoveFlexible(obj,target,fnEnd)
{
	var sAttr="";
	var iEnd=1;
	for( sAttr in target)
	{
		var iNow=parseFloat(css(obj,sAttr));
		obj.iSpeed[sAttr]+=(target[sAttr]-iNow)/6;
		obj.iSpeed[sAttr]*=0.75;
		if(Math.round(iNow)==target[sAttr] && Math.abs(obj.iSpeed[sAttr])<1)
		{
			continue;
		}
		else
		{	
			iNow=Math.round(iNow+obj.iSpeed[sAttr]);
			css(obj,sAttr,iNow);
			iEnd=0;
		}
	}
	if(iEnd)
	{
		clearInterval(obj.timer);
		if(fnEnd)
		{
			fnEnd.call(obj);
		}
	}
}

function starMove(obj,target,iType,fnEnd)
{
	clearInterval(obj.timer);
	if(iType==1)
	{
		var sAttr="";
		obj.iSpeed={};
		for( sAttr in  target)
		{
			obj.iSpeed[sAttr]=0;
		}
	}
	switch(iType)
	{
		case 0:
		obj.timer=setInterval(function(){doMoveBuffer(obj,target,fnEnd);},30);
		break;
		case 1:
		obj.timer=setInterval(function(){domoveFlexible(obj,target,fnEnd);},30);
		break;
	}
}
function css(obj, attr, value)
{
	if(arguments.length==2)
	{
		if(attr=="MozTranslateX")
		{
			if(document.defaultView)
			{
				var sVal=getComputedStyle(obj)["MozTransform"];
				if(sVal)
				{
					var iX=sVal.split(",")[4];
					return iX;
				}
			}
		}
		if(attr=="MozTranslateY")
		{
			if(document.defaultView)
			{
				var sVal=getComputedStyle(obj)["MozTransform"];
				if(sVal)
				{
					var iY=sVal.split(",")[5];
					return iY;
				}
			}
		}
		if(attr=="scale")
		{
			if(document.defaultView)
			{
				var sVal=getComputedStyle(obj)["MozTransform"];
				if(!sVal)
				{
					sVal=getComputedStyle(obj)["WebkitTransform"];
				}
				if(!sVal)
				{
					sVal=getComputedStyle(obj)["OTransform"];
				}
				if(!sVal)
				{
					sVal=getComputedStyle(obj)["MsTransform"];
				}
				if(!sVal)
				{
					return;
				}
				var iY=sVal.split(",")[3];
				return iY*100;
			}
		}
		var i=parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
		var val=i?i:0;
		if(attr=="opacity" || attr=="zoom" )
		{
			val*=100;
		}
		return val;
	}
	else if(arguments.length==3)
	{
		switch(attr)
		{
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				obj.style[attr]=value+'px';
				break;
			case 'opacity':
				if(value<5)
				{
					value=0;
				}
				obj.style.filter="alpha(opacity:"+value+")";
				
				obj.style.opacity=value/100;
				break;
			case 'zoom':
				if(value<0)
				{
					value=0;
				}
				obj.style.zoom=value/100;
				break;
			case 'MozTranslateY':
				if(document.defaultView)
				{
					var sVal=getComputedStyle(obj)["MozTransform"];
					if(sVal)
					{
						var iY=sVal.split(",");	
						iY[5]=value+"px";
						obj.style["MozTransform"]=iY.join(",");			
					}
				}
			break;
			case "scale":
				if(document.defaultView)
				{
					var sVal=getComputedStyle(obj)["MozTransform"];
					if(!sVal)
					{
						sVal=getComputedStyle(obj)["WebkitTransform"];
					}
					if(!sVal)
					{
						sVal=getComputedStyle(obj)["OTransform"];
					}
					if(!sVal)
					{
						sVal=getComputedStyle(obj)["MsTransform"];
					}
					if(!sVal)
					{
						return;
					}
					if(sVal<0)
					{
						sVal=0;
					}
					var aF=sVal.split(",");	
					aS0=aF[0].split("(");
					aS0[1]=(value/100).toFixed(2);
					aF[0]=aS0.join("(");
					aF[3]=(value/100).toFixed(2);
					obj.style["MozTransform"]=aF.join(",");
					obj.style["OTransform"]=aF.join(",");
					obj.style["WebkitTransform"]=aF.join(",");
					obj.style["MsTransform"]=aF.join(",");			
				}
			break;
			case 'MozTranslateX':
				if(document.defaultView)
				{
					var sVal=getComputedStyle(obj)["MozTransform"];
					if(sVal)
					{
						var iX=sVal.split(",");	
						iX[4]=value+"px";
						obj.style["MozTransform"]=iX.join(",");			
					}
				}
			break;
			default:
				obj.style[attr]=value;
		}
	
	return function (attr_in, value_in){css(obj, attr_in, value_in)};
	}
}
function getByClass(sClass,obj)
{
	var aRr=[];
	if(obj)
	{
		var aTag=obj.getElementsByTagName('*');
	}
	else
	{
		var aTag=document.getElementsByTagName('*');
	}
	for(var i=0;i<aTag.length;i++)
	{
		var aClass=aTag[i].className.split(" ");
		for(var j=0;j<aClass.length;j++)
		{
			if(aClass[j]==sClass)
			{
				aRr.push(aTag[i]);	
			}
		}
	}
	return aRr;
}