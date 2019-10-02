var explorer = window.navigator.userAgent.toUpperCase();
if(explorer.indexOf("MSIE")!=-1){
	
	window.location = 'http://jquery.miaov.com/error.html';
	
}
window.onload = function(){
	
	var oStar = document.getElementById('star');
	var aStar = oStar.getElementsByTagName('div');
	var oBj = document.getElementById('bj');
	var aBj = oBj.children[0].getElementsByTagName('div');
	var arrX = [];
	var arrY = [];
	var arrX2 = [];
	var arrY2 = [];
	for(var i=0; i<aBj.length; i++){
		
		arrX.push(aBj[i].offsetLeft);
		arrY.push(aBj[i].offsetTop);
		
	}
	for(var i=0; i<8; i++){
		
		arrX2.push(aStar[i].offsetLeft);
		arrY2.push(aStar[i].offsetTop);
		
	}
	
	document.addEventListener('mousemove',function(ev){
		
		var e = ev || event;
		
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		var disX = e.clientX - oBj.offsetWidth/2;
		var disY = e.clientY + scrollT - oBj.offsetWidth/2;
		for(var i=1; i<aBj.length; i++){
			
//			aBj[i].style.transform = 'translateX('+ -disX/(10*(i*i+1))+'px) translateY('+ -disY/(10*(i*i+1))+'px)';
			aBj[i].style.left = arrX[i]-disX/(10*(i*i+1))+'px';
			aBj[i].style.top = arrY[i]-disY/(10*(i*i+1))+'px';
			
		}
//		aBj[0].style.transform = 'translateX('+ -disX/120+'px) translateY('+ -disY/120+'px)';
		aBj[0].style.left = arrX[0]-disY/120+'px';
		aBj[0].style.top = arrY[0]-disY/120+'px';
		for(var i=0; i<3; i++){
			
//			aStar[i].style.transform = 'translateX('+ -disX/30+'px) translateY('+ -disY/30+'px)';
			aStar[i].style.left = arrX2[i]-disX/30+'px';
			aStar[i].style.top = arrY2[i]-disY/30+'px';
			
		}
		for(var i=3; i<7; i++){
			
//			aStar[i].style.transform = 'translateX('+ -disX/80+'px) translateY('+ -disY/80+'px)';
			aStar[i].style.left = arrX2[i]-disX/80+'px';
			aStar[i].style.top = arrY2[i]-disY/80+'px';
			
		}
//		aStar[7].style.transform = 'translateX('+ -disX/200+'px) translateY('+ -disY/200+'px)';
		aStar[7].style.left = arrX2[7]-disX/200+'px';
		aStar[7].style.top = arrY2[7]-disY/200+'px';
		
	});
	function clearClass(){
		
		for (var i=0; i<3; i++) {
			
			var aChild = aStar[i].children;
			for(var j=0; j<aChild.length; j++){
				
				aChild[j].className = '';
				
			}
			
		}
		
	}
	setTimeout(function(){
		
		
		clearClass();
		for (var i=0; i<3; i++) {
			aStar[i].onmouseover = function(){
				
				var oEm = this.getElementsByTagName('em')[0];
				var oI = this.getElementsByTagName('i')[0];
				var oSpan = this.getElementsByTagName('span')[0];
				var oStrong = this.getElementsByTagName('strong')[0];
				var oA = this.getElementsByTagName('a')[0];
				if(oEm.className==''){
					
					oEm.className = 'em';
					oI.className = 'i';
					oSpan.className = 'span';
					oStrong.className = 'strong';
					oA.className = 'a';
					setTimeout(function(){
						
						oEm.className = '';
						oI.className = '';
						oSpan.className = '';
						oStrong.className = '';
						oA.className = '';
						
					},6000);
					
				}
			
			}
			
		}
		
	},6000);
	
}