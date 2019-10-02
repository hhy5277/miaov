// JavaScript Document leo 2012-6-20 www.miaov.com QQ:20907961

function fnGallery(){
	var oG = document.getElementById('gallery');
	var oGC = document.getElementById('gallery_con');
	var oGN = document.getElementById('gallerynav');
	
	var oSlides = getClass(oGC,'slides')[0];
	var aSLi = oSlides.getElementsByTagName('li');
	
	var oPrev = getClass(oGC,'prev')[0];
	var oNext = getClass(oGC,'next')[0];
	
	var oCaption = getClass(oGC,'caption')[0];
	var aCLi = oCaption.getElementsByTagName('li');
	
	var aGNLi = oGN.getElementsByTagName('a');
	
	var iNow = 0;
	var iNow2 = 0;
	var tt = null;
	var tt2 = null;
	var ie = !-[1,];
	
	for(var i=0;i<aGNLi.length;i++){
		aGNLi[i].index = i;
		
		aGNLi[i].onclick = function(){
			
			toChange(this.index);
	
		};
	}
	
	function toChange(index){
		
		for(var i=0;i<aGNLi.length;i++){
			if(aGNLi[i].className=='active'){
				iNow = aGNLi[i].index;	
			}
			aGNLi[i].className = '';
		}
		
		aGNLi[index].className = 'active';
		
		if(index>iNow){  //←
			
			startMove(aSLi[iNow],{left:-930,opacity:80},function(){	
				this.style.display = 'none';
			});
			
			aSLi[index].style.opacity = 1;
			aSLi[index].style.filter = 'alpha(opacity=100)';
			aSLi[index].style.left = '350px';
			aSLi[index].style.display = 'block';
			aSLi[index].style.zIndex = 1;
			startMove(aSLi[index],{left:0},function(){
				this.style.zIndex = 2;
			});
			
		}
		else if(index<iNow){  //→
			
			startMove(aSLi[iNow],{left:930,opacity:80},function(){
				this.style.display = 'none';
			});
			
			aSLi[index].style.opacity = 1;
			aSLi[index].style.filter = 'alpha(opacity=100)';
			aSLi[index].style.left = '-350px';
			aSLi[index].style.display = 'block';
			aSLi[index].style.zIndex = 1;
			startMove(aSLi[index],{left:0},function(){
				this.style.zIndex = 2;
			});
			
		}
		else{
			return;
		}
		
		startMove(aCLi[iNow],{opacity:0},function(){
			aCLi[iNow].style.display = 'none';
			
		});
		aCLi[index].style.display = 'block';
		aCLi[index].style.opacity = 0;
		aCLi[index].style.filter = 'alpha(opacity=0)';
		clearTimeout(tt);
		tt = setTimeout(function(){
			startMove(aCLi[index],{opacity:100});
		},500);
	}
	
	for(var i=0;i<aSLi.length;i++){
		aSLi[i].index = i;
		
		aSLi[i].onmouseover = aCLi[i].onmouseover = function(){
			showBtn();
		};
		
		aSLi[i].onmouseout = aCLi[i].onmouseout = function(){
			hideBtn();
		};
	}
	
	oPrev.onmouseover = function(){
		showBtn();
		this.style.backgroundPosition = '0 -40px';
	};
	oPrev.onmouseout = function(){
		this.style.backgroundPosition = '0 0';
	};
	oPrev.onmousedown = function(){
		this.style.backgroundPosition = '0 -80px';
		if(iNow2==0){
			iNow2 = aSLi.length - 1;
		}
		else{
			iNow2--;
		}
		toChange(iNow2);
	};
	oPrev.onmouseup = function(){
		this.style.backgroundPosition = '0 -40px';
	};
	
	oNext.onmouseover = function(){
		showBtn();
		this.style.backgroundPosition = '0 -160px';
	};
	oNext.onmouseout = function(){
		this.style.backgroundPosition = '0 -120px';
	};
	oNext.onmousedown = function(){
		this.style.backgroundPosition = '0 -200px';
		if(iNow2==aSLi.length - 1){
			iNow2 = 0;
		}
		else{
			iNow2++;
		}
		toChange(iNow2);
	};
	oNext.onmouseup = function(){
		this.style.backgroundPosition = '0 -160px';
	};
	
	function showBtn(){
		oPrev.style.display = 'block';
		oNext.style.display = 'block';
	}
	
	function hideBtn(){
		oPrev.style.display = 'none';
		oNext.style.display = 'none';
	}
	
	if(ie){
		oG.onmouseenter = function(e){		
			clearInterval(tt2);		
		};
		
		oG.onmouseleave = function(e){
			
			tt2 = setInterval(function(){
				if(iNow2==aSLi.length - 1){
					iNow2 = 0;
				}
				else{
					iNow2++;
				}
				toChange(iNow2);
			},3000);
			
		};
	}
	else{
		oG.onmouseover = function(e){
			var a = e.currentTarget, b = e.relatedTarget;
			if(!elContains(a,b) && a!=b){
				clearInterval(tt2);
			}
		};
		
		oG.onmouseout = function(e){
			var a = e.currentTarget, b = e.relatedTarget;
			if(!elContains(a,b) && a!=b){
				tt2 = setInterval(function(){
					if(iNow2==aSLi.length - 1){
						iNow2 = 0;
					}
					else{
						iNow2++;
					}
					toChange(iNow2);
				},3000);
			}
		};
	}

	tt2 = setInterval(function(){
		if(iNow2==aSLi.length - 1){
			iNow2 = 0;
		}
		else{
			iNow2++;
		}
		toChange(iNow2);
	},3000);
	
};

function elContains(a, b){
	try{
		return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16);
	}catch(e){}	
}