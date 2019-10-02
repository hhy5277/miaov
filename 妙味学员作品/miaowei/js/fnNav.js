// JavaScript Document leo 2012-6-20 www.miaov.com QQ:20907961

function fnNav(){
	var oUl=document.getElementById('nav');
	var aLi=oUl.children;
	var oDiv=null;
	var iTimer=null;
	
	for(var i=0; i<aLi.length; i++)
	{
		aLi[i].onmouseover=function()
		{
			var oDiv=this.getElementsByTagName('div')[0];
			clearTimeout(iTimer);

			for(var i=0; i<aLi.length; i++){
				if(aLi[i]==this)continue;
				var subDiv=aLi[i].getElementsByTagName('div')[0];
				if(subDiv){
					clearInterval(subDiv.timer);
					aLi[i].className='';
					subDiv.style.height='0';
				}
			}

			if(oDiv){
				var subLi=oDiv.getElementsByTagName('li');
				this.className="slide_li";
				startMove(oDiv,{height: subLi[0].offsetHeight*subLi.length+7});
			}
		};

		aLi[i].onmouseout=function()
		{
			var oDiv=this.getElementsByTagName('div')[0];
			var _this=this;

			if(oDiv){
				iTimer=setTimeout(function(){
					_this.className='';
					oDiv.style.height='0';
					clearInterval(oDiv.timer);
				},800);
			}
		};
	}
}