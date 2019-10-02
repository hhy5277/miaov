// JavaScript Document leo 2012-6-20 www.miaov.com QQ:20907961

function fnBackTop(){
	var oDiv=document.getElementById('footer');
	var oSpan=oDiv.getElementsByTagName('span')[0];
	var iCur=0;
	var timer=null;
	
	oSpan.onclick=function()
	{
		timer=setInterval(function(){
			var iCur=document.body.scrollTop;
			var iSpeed = (0 - iCur)/2;
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur==0)
			{
				clearInterval(timer);
			}
			else
			{
				document.body.scrollTop=iCur+iSpeed;
			}
		},30);
	};
}