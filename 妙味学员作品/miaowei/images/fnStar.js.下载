// JavaScript Document leo 2012-6-20 www.miaov.com QQ:20907961

function fnStar(){
	var oStar=document.getElementById('star');
	var iW=document.documentElement.clientWidth;
	var iH=document.body.clientHeight;
	
	oStar.style.width=iW+'px';
	oStar.style.height=iH+'px';
	oStar.style.position='absolute';
	oStar.style.top=0+'px';
	oStar.style.left=0;
	oStar.style.zIndex=1;
	
	for(var i=0; i<36; i++)
	{
		var aDiv=document.createElement('div');
		oStar.appendChild(aDiv);
	}
	
	var aDiv=oStar.getElementsByTagName('div');
	
	for(var i=0; i<aDiv.length; i++)
	{
		if(i<=parseInt(aDiv.length/2))
		{
			aDiv[i].className='img1';
		}
		else
		{
			aDiv[i].className='img2';
		}
		
		aDiv[i].x=parseInt(iW*Math.random());
		aDiv[i].y=parseInt(iH*Math.random());
		aDiv[i].style.left=aDiv[i].x+'px';
		aDiv[i].style.top=aDiv[i].y+'px';
		creatTarget(aDiv[i]);
	}
	
	function creatTarget(obj)
	{
		obj.x=parseInt(iW*Math.random()-20);
		obj.y=parseInt(iH*Math.random());

		startMove(obj,{left:obj.x,top:obj.y},function(){
			creatTarget(obj);
		});
	}

	function startMove(obj, json, fn)
	{
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var bStop=true;
			for(var attr in json)
			{
				var iCur=0;
				
				iCur=parseInt(getStyle(obj, attr));

				var iSpeed=(json[attr]-iCur)/68;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

				if(iCur!=json[attr])
				{
					bStop=false;
				}
				
				obj.style[attr]=iCur+iSpeed+'px';
			}
			
			if(bStop)
			{
				clearInterval(obj.timer);
				
				if(fn)
				{
					fn();
				}
			}
		}, 30)
	}
}