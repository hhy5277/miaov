var explorer = window.navigator.userAgent.toUpperCase();
if(explorer.indexOf("MSIE")!=-1){
	
	window.location = 'http://jquery.miaov.com/error.html';
	
}
var manName = [ 'man', 'oldman', 'boy' ];
var womanName = [ 'woman', 'girl' ]
			
window.onload = function (){
	
	
	var oMain = document.getElementById('mian');
	var oUmb = document.getElementById('umbrella');
	var aUmb = oUmb.children;
	var oWheel = document.getElementById('wheel');
	var aWheelPeopel = oWheel.getElementsByTagName('span');
	var oPeoples = document.getElementById('peoples');
	var aPeople = oPeoples.getElementsByTagName('span');
	var oInfo = document.getElementById('info');
	var aInfo = oInfo.children;
	var aSpan = document.getElementsByTagName('span');
	var oJoin = document.getElementById('join');
	var oJoinVip = oJoin.getElementsByTagName('a')[0];
	var oStar = document.getElementById('star');
	var oBlack = document.getElementById('black');
	var oPop = document.getElementById('pop');
	var oPop2 = document.getElementById('pop2');
	var oClose = document.getElementById('close');
	var oClose2 = document.getElementById('close2');
	var oSearch = document.getElementById('search');
	var aInput = oSearch.getElementsByTagName('input');
	var oSearchBox = document.getElementById('searchBox');
	var aP = oSearchBox.getElementsByTagName('p');
	var searchNub = null;
	var activeNub = 0;
	var iShake = 0;
	var iDeg = 0;
	var iLeft = 0;
	var bOff = true;
	var iTimer = null;
	oUmb.num = 1;
	oUmb.bOff = true;
	var spanNum = [];
	var arr = [];
	var json = {};
	var manNub = 0;
	var womanNub = 0;
	
	var onePieceSpan = document.getElementById('one').getElementsByTagName('span');
	var twoPieceSpan = document.getElementById('two').getElementsByTagName('span');
	var threePieceSpan = document.getElementById('three').getElementsByTagName('span');
	var spanNub = onePieceSpan.length+twoPieceSpan.length/2+threePieceSpan.length;
	while( arr.length < spanNub ){
		
		var iNum = Math.floor( Math.random()*data.length );
		
		if( !json[iNum] ){
			
			arr.push( iNum );
			
			json[iNum] = 1;
			
		}
		
	}
	for (var i=0; i<onePieceSpan.length; i++) {
		
		if(data[arr[i]].sex == 'man'){
			
			onePieceSpan[i].className = manName[manNub%3];
			manNub++
			
		}else{
			
			onePieceSpan[i].className = womanName[womanNub%2];
			womanNub++
			
		}
		onePieceSpan[i].name = data[arr[i]].name;
		onePieceSpan[i].date = data[arr[i]].time;
		onePieceSpan[i].sex = data[arr[i]].sex;
		
	}
	for (var i=0; i<twoPieceSpan.length/2; i++) {
		
		if(data[arr[i+onePieceSpan.length]].sex == 'man'){
			
			twoPieceSpan[i].className = twoPieceSpan[i+twoPieceSpan.length/2].className = manName[manNub%3];
			manNub++
			
		}else{
			
			twoPieceSpan[i].className = twoPieceSpan[i+twoPieceSpan.length/2].className = womanName[womanNub%2];
			womanNub++
			
		}
		twoPieceSpan[i].name = twoPieceSpan[i+twoPieceSpan.length/2].name = data[arr[i+onePieceSpan.length]].name;
		twoPieceSpan[i].date = twoPieceSpan[i+twoPieceSpan.length/2].date = data[arr[i+onePieceSpan.length]].time;
		twoPieceSpan[i].sex = twoPieceSpan[i+twoPieceSpan.length/2].sex = data[arr[i+onePieceSpan.length]].sex;

	}
	for (var i=0; i<threePieceSpan.length-6; i++) {
		
		if(i<7){
			if(data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].sex == 'man'){
				
				threePieceSpan[i].className = manName[manNub%3];
				manNub++
				
			}else{
				
				threePieceSpan[i].className = womanName[womanNub%2];
				womanNub++
				
			}
			threePieceSpan[i].name = data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].name;
			threePieceSpan[i].date = data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].time;
			threePieceSpan[i].sex = data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].sex;
		}else{
			if(data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].sex == 'man'){
				
				threePieceSpan[i].className = threePieceSpan[i+6].className = manName[manNub%3];
				manNub++
				
			}else{
				
				threePieceSpan[i].className = threePieceSpan[i+6].className = womanName[womanNub%2];
				womanNub++
				
			}
			threePieceSpan[i].name = threePieceSpan[i+6].name = data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].name;
			threePieceSpan[i].date = threePieceSpan[i+6].date = data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].time;
			threePieceSpan[i].sex = threePieceSpan[i+6].sex = data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].sex;
			
			
		}
		
	}
	for (var i=0; i<onePieceSpan.length; i++) {
		
			onePieceSpan[i].name = data[arr[i]].name;
			onePieceSpan[i].date = data[arr[i]].time;
		
	}
	
	
	css(aWheelPeopel[0],'rotate',0);
	css(aWheelPeopel[1],'rotate',15);
	css(aWheelPeopel[2],'rotate',30);
	css(aWheelPeopel[3],'rotate',45);
	css(aWheelPeopel[4],'rotate',59);
	css(aWheelPeopel[5],'rotate',76);
	css(aWheelPeopel[6],'rotate',90);
	css(aWheelPeopel[7],'rotate',104);
	css(aWheelPeopel[8],'rotate',121);
	css(aWheelPeopel[9],'rotate',135);
	css(aWheelPeopel[10],'rotate',150);
	css(aWheelPeopel[11],'rotate',165);
	css(aWheelPeopel[12],'rotate',180);
	css(aWheelPeopel[13],'rotate',194);
	css(aWheelPeopel[14],'rotate',212);
	css(aWheelPeopel[15],'rotate',227);
	css(aWheelPeopel[16],'rotate',239);
	css(aWheelPeopel[17],'rotate',256);
	css(aWheelPeopel[18],'rotate',270);
	css(aWheelPeopel[19],'rotate',285);
	css(aWheelPeopel[20],'rotate',298);
	css(aWheelPeopel[21],'rotate',314);
	css(aWheelPeopel[22],'rotate',330);
	css(aWheelPeopel[23],'rotate',344);
	
	if(!sessionStorage.getItem('username')){
		
		setTimeout(function(){
			
			oBlack.style.display = 'block';
			css(oPop2,'translateY',oBlack.offsetHeight/2);
			oClose2.onclick = function(){
				
				clearTimeout(this.time);
				css(oPop2,'translateY',-oPop2.offsetHeight);
				setTimeout(function(){
					
					oBlack.style.display = 'none';
					
				},500);
				
			}
			oClose2.time = setTimeout(function(){
				
				css(oPop2,'translateY',-oPop2.offsetHeight);
				setTimeout(function(){
					
					oBlack.style.display = 'none';
					
				},500);
				
			},8000);
			
		},1000);
		
	}
	
	aInput[0].onfocus = function(){
		
		var _this = this;
		if(this.value !== ''){
			
			oSearchBox.style.display = 'block';
			
		}
		document.onkeyup = function(ev){
			
			var e = ev || event;
			var sr
			var a = [];
			var iNub2 = 0;
			oSearchBox.bOff = true;
			if(e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=13)
				activeNub = 0;
			if(_this.value == ''){
				
				oSearchBox.style.display = 'none';
				oSearchBox.innerHTML = '';
				
			}else{
				
				oSearchBox.innerHTML = '';
				for(var s in data){	
					
					var patt = new RegExp(aInput[0].value);
					if(patt.test(data[s].name)&&iNub2<8){
						oSearchBox.style.display = 'block';
						
						var div = document.createElement('div')
						var p = document.createElement('p');
						p.innerHTML = '<em class="redText">'+data[s].name+'</em>';
						p.index = s;
						p.onclick = function(){
							
							aInput[0].value = data[this.index].name;
							searchNub = this.index;
							findPeople();
							aInput[0].value = '';
							oSearchBox.innerHTML = '';
							oSearchBox.style.display = 'none';
							
						}
						div.appendChild(p);
						oSearchBox.appendChild(div);
						iNub2++
						oSearchBox.bOff = false;
						
					}
					
				}
				if(oSearchBox.bOff){
					
					var oDiv = document.createElement('div');
					var oP = document.createElement('p');
					var oA = document.createElement('a');
					oA.href = 'http://bbs.miaov.com/forum.php?mod=viewthread&tid=13575';
					oA.innerHTML = '点击这里提交资料>> ';
					oA.style.color = '#f3576e';
					oP.innerHTML = '很抱歉未找到您的用户名';
					oDiv.appendChild(oP);
					oDiv.appendChild(oA);
					oSearchBox.appendChild(oDiv);
					
				}
				
			}
			var aDiv = oSearchBox.getElementsByTagName('div');
			for (var i=0; i<aDiv.length; i++) {
				aDiv[i].index = i;
				aDiv[i].onmouseover = function(){
					if(!oSearchBox.bOff){
						for (var j=0; j<aDiv.length; j++) {
							
							
							aDiv[j].style.background = '';
							aDiv[j].getElementsByTagName('em')[0].style.color = '';
							
							
						}
						this.style.background = 'rgba(85,185,248,1)';
						this.getElementsByTagName('em')[0].style.color = '#fff';
						activeNub = this.index;
					
					}
				}
			}
			var oldNub = activeNub;
			switch (e.keyCode){
				case 38:
					activeNub--;
					if(activeNub<0){
						
						activeNub = aDiv.length-1;
						
					}
					break;
				case 40:
					activeNub++;
					if(activeNub>aDiv.length-1){
						
						activeNub = 0;
						
					}
					break;
				case 13:
					if(oSearchBox.innerHTML!=''){
						var oP = aDiv[activeNub].getElementsByTagName('p')[0];
						aInput[0].value = oP.children[0].innerHTML;
						for(var s in data){
		
							if(data[s].name === aInput[0].value){
								
								searchNub = s;
								findPeople();
								
							}
							
						}
						aInput[0].value = '';
						oSearchBox.innerHTML = '';
						oSearchBox.style.display = 'none';
					}
					break;
			}
			if(aDiv.length!=0&&!oSearchBox.bOff){
				aDiv[oldNub].style.background = '';
				aDiv[oldNub].getElementsByTagName('em')[0].style.color = '';
				aDiv[activeNub].style.background = 'rgba(85,185,248,1)';
				aDiv[activeNub].getElementsByTagName('em')[0].style.color = '#fff';
			}
			
			
		}
		
	}
	function findPeople(){
		for (var i=0; i<spanNum.length; i++) {
			
			clearInterval(aSpan[spanNum[i]].time);
			move(aSpan[aSpan[spanNum[i]].iNub],{ translateY: 0},500,'bounceOut');
			
		}
		spanNum.length = 0;
		oUmb.bOff = false;
		for (var i = 0; i<aSpan.length; i++) {
			
			if(aSpan[i].name === aInput[0].value){
				
				oUmb.bOff = true;
				spanNum.push(i);
				
			}
			
		}
		if(oUmb.bOff){
			
			var scrollNum = document.documentElement.scrollTop || document.body.scrollTop;
			clearInterval(iTimer);
			if(spanNum[0]>29&&spanNum[0]<=85){
				
				iTimer = setInterval(function(){
					
					scrollNum += 20
					if(scrollNum>=700){
						
						scrollNum = 700;
						clearInterval(iTimer);
						
					}
					document.documentElement.scrollTop = document.body.scrollTop = scrollNum;
					
					
				},20)
				
			}else if( spanNum[0]>85 ){
				
				iTimer = setInterval(function(){
					
					scrollNum += 40
					if(scrollNum>=1200){
						
						scrollNum = 1200;
						clearInterval(iTimer);
						
					}
					document.documentElement.scrollTop = document.body.scrollTop = scrollNum;
					
					
				},20)
				
			} 
			for (var i=0; i<spanNum.length; i++) {
				aSpan[spanNum[i]].iNub = spanNum[i];
				(function(i){
					move(aSpan[aSpan[spanNum[i]].iNub],{ translateY: -20 },200,'linear',function(){
							
					move(aSpan[aSpan[spanNum[i]].iNub],{ translateY: 0},500,'bounceOut');
					
					});
					aSpan[spanNum[i]].time = setInterval(function(){
						
						
						move(aSpan[aSpan[spanNum[i]].iNub],{ translateY: -20 },200,'linear',function(){
							
							move(aSpan[aSpan[spanNum[i]].iNub],{ translateY: 0},500,'bounceOut');
							
						});
						
					},1000)
				})(i);
				
			}
		}else{
			
			doshake();
			
		}
		
	}
	aInput[0].onblur = function(){
		
		setTimeout(function(){
			
			oSearchBox.style.display = 'none';
			
		},100);
		
	}
	aInput[1].onclick = function(){
		
		oSearchBox.style.display = 'none';
		for(var s in data){
			
			if(data[s].name === aInput[0].value){
				
				searchNub = s;
				findPeople();
				
			}
			
		}
		aInput[0].value = '';
		
	}
	
	oJoinVip.onclick = function(){
		
		oJoinVip.style.transform = oJoinVip.style.WebkitTransform = 'scale(0,0)';
		setTimeout(function(){
			
			css(oJoin,'translateX',0);
			css(oJoin,'translateY',0);
			move(oJoin, {translateY:-180,translateX:351}, 500, 'easeInStrong', function(){
				
				oStar.style.transform="skew(-30deg,-30deg) translate(40px,-24px)";
				oStar.style.WebkitTransform="skew(-30deg,-30deg) translate(40px,-24px)";
				oStar.style.opacity = 0;
//				css(oStar,'translateX',20);
//				css(oStar,'translateY',-12);
				setTimeout(function(){
					
					oStar.style.transform="skew(0deg,0deg) translate(0px,0px)";
					oStar.style.WebkitTransform="skew(0deg,0deg) translate(0px,0px)";
//					css(oStar,'translateX',0);
//					css(oStar,'translateY',0);
//					oStar.style.WebkitTransform="skew(0deg,0deg)";
					oJoin.style.opacity = 0;
					css(oJoin,'translateX',-202);
					css(oJoin,'translateY',144);
					oBlack.style.display = 'block';
					css(oPop,'translateY',oBlack.offsetHeight/2);
					
				},500);
				
			});
			
		},500);
		
	}
	oClose.onclick = function(){
		
		css(oPop,'translateY',-oPop.offsetHeight);
		setTimeout(function(){
			
			oBlack.style.display = 'none';
			setTimeout(function(){
				
				move(oJoin, {opacity:1}, 500, 'linear');
				move(oJoin, {translateX:0,translateY:0}, 1000, 'backOut',function(){
					
					oJoinVip.style.cssText = '';
					oStar.style.opacity = 1;
					
				});
				
			},500);
			
		},500);
		
	}
	//doshake();
	//document.onclick = doshake;
	oUmb.style.display = 'none';
	for(var i=0; i<aSpan.length; i++){
		
		aSpan[i].index = i;
		aSpan[i].addEventListener('mousemove',show,false);
		aSpan[i].addEventListener('mouseout',hidden,false);
		
	}
	aUmb[1].removeEventListener('mousemove',show,false);
	function show(ev){
		
		var e = ev || event;
		var s = document.documentElement.scrollTop|| document.body.scrollTop;
		var iLeft = e.clientX;
		var iTop = e.clientY + s - oInfo.offsetHeight - 20;
		oInfo.style.visibility = 'visible';
		oInfo.style.left = iLeft + 'px';
		oInfo.style.top = iTop + 'px';
		aInfo[0].innerHTML = this.name;
		aInfo[1].innerHTML = this.date;
		for (var i=0; i<spanNum.length; i++) {
			
			
			if(this.iNub == spanNum[i]){
				
				for (var j=0; j<spanNum.length; j++) {
					
					clearInterval(aSpan[spanNum[j]].time);
					
				}	
				
			}
			
		}
		
	}
	function hidden(){
		
		oInfo.style.visibility = 'hidden';
		
	}
	
	function shake(){
		
		if(oUmb.bOff){
			
			iShake+=0.5;
			if(iShake>=15){
				
				iShake = 15;
				oUmb.bOff = false;
				
			}
			
		}else{
			
			iShake-=0.5;
			if(iShake<=-15){
				
				oUmb.bOff = true;
				iShake = -15;
				
			}
			
		}
		oUmb.style.transform = oUmb.style.WebkitTransform = 'rotate(' + iShake + 'deg)';
		
	}
	function doshake(){
		
		if(bOff){
			bOff = false;
			aInput[0].disabled = 'disabled';
			oSearch.style.opacity = 0.5;
			var iNub2 = Math.floor(Math.random()*5);
			oUmb.style.transform = oUmb.style.WebkitTransform = 'rotate(' + iShake + 'deg)';
			oUmb.bOff = true;
			oUmb.style.display = 'block';
			if(data[searchNub].sex == 'man'){
				
				aUmb[1].className = manName[manNub%3];
				manNub++;
				
			}else{
				
				aUmb[1].className = womanName[womanNub%2];
				womanNub++;
				
			}
			aUmb[1].name = data[searchNub].name;
			aUmb[1].date = data[searchNub].time
			aUmb[1].sex = data[searchNub].sex;
			aUmb[1].onmousemove = function(ev){
				
				var e = ev || event;
				var s = document.documentElement.scrollTop|| document.body.scrollTop;
				var iLeft = e.clientX;
				var iTop = e.clientY + s - oInfo.offsetHeight - 20;
				oInfo.style.visibility = 'visible';
				oInfo.style.left = iLeft + 'px';
				oInfo.style.top = iTop + 'px';
				aInfo[0].innerHTML = this.name;
				aInfo[1].innerHTML = this.date;
				
			}
			oUmb.iTimer2 = setInterval(shake,20);
			move(oUmb,{ top : 334 },4000,'linear',function(){
				
				clearInterval(oUmb.iTimer2);
				oUmb.style.transform = oUmb.style.WebkitTransform = 'rotate(0deg)';
				aUmb[0].style.opacity = 0;
				var oPeople = document.createElement('span');
				oPeople.onmousemove = function(ev){
				
					var e = ev || event;
					var s = document.documentElement.scrollTop|| document.body.scrollTop;
					var iLeft = e.clientX;
					var iTop = e.clientY + s - oInfo.offsetHeight - 20;
					oInfo.style.visibility = 'visible';
					oInfo.style.left = iLeft + 'px';
					oInfo.style.top = iTop + 'px';
					aInfo[0].innerHTML = data[searchNub].name;
					aInfo[1].innerHTML = data[searchNub].time;
					
				}
				oPeople.addEventListener('mouseleave',hidden,false);
				oPeople.className = aUmb[1].className;
				oPeople.name = aUmb[1].name;
				oPeople.date = aUmb[1].date;
				oPeople.sex = aUmb[1].sex;
				oPeople.style.left = 687 + 'px';
				oPeoples.appendChild(oPeople);
				setTimeout(function(){
					
					oUmb.style.top = 0;
					oUmb.style.display = 'none';
					aUmb[0].style.opacity = 1;
					var left0 = aPeople[0].offsetLeft;
					var left1 = aPeople[1].offsetLeft;
					var left2 = aPeople[2].offsetLeft;
					move(aPeople[0],{ opacity: 0 },2000,'linear');
					move(aPeople[1],{ left: parseInt(left1)/2, opacity:0 },2000,'linear',function(){
						
						if(aPeople[1].sex == 'man'){
							
							aPeople[1].className = manName[manNub%3];
							manNub++;
							
						}else{
							
							aPeople[1].className = womanName[womanNub%2];
							womanNub++;
							
						}
						
						move(aPeople[1],{ opacity: 1, left:left0 },2000,'linear',function(){
							
							oPeoples.removeChild(aPeople[0]);
							aSpan = document.getElementsByTagName('span');
							arr.splice(27,1);
							arr.splice(29,0,searchNub);
							for(var i=0; i<aSpan.length; i++){
		
								aSpan[i].index = i;
								aSpan[i].addEventListener('mousemove',show,false);
								aSpan[i].addEventListener('mouseout',hidden,false);
								
							}
							
							
						});
						bOff = true;
						aInput[0].disabled = '';
						oSearch.style.opacity = 1;
						
					});
					move(aPeople[2],{ left: left1 },2000,'linear');
					move(aPeople[3],{ left: left2 },2000,'linear');
					
				},1000);
				
			})
			
		}
		
	}
	sessionStorage.setItem('username','miaov');
	
}