/*
	author : towne;
	
*/
window.onload = function(){
	/***********************HEAD***************************/
	var oHead = document.getElementById('header');
	var oChangeClose = document.getElementById('change_close');
	var oChangeDt = oHead.getElementsByTagName('dt')[0];
	var oChangeDl = oHead.getElementsByTagName('dl')[0];
	var oChangeDd = oHead.getElementsByTagName('dd')[0];
	oChangeDl.onclick = function(){
		oForm.onblur();
		if(oChangeDd.style.display == 'block'){
			oChangeDd.style.display = 'none';
			oChangeDt.className = '';
		}else{
			oChangeDd.style.display = 'block';
			oChangeDt.className = 'change_active';
		}		
	}
	oChangeClose.onclick = function(ev){
		oForm.onblur();
		var ev = ev || event;
		oChangeDd.style.display = 'none';
		oChangeDt.className = '';
		ev.cancelBubble = true;
	}
	var oHeaderPhone=document.getElementById('header_phone');

	var oHeaderPhoneDiv=oHeaderPhone.getElementsByTagName('div')[0];
	oHeaderPhone.onmouseover=function(){
		oForm.onblur();
		this.className="head_active";
		oHeaderPhoneDiv.style.display='block';

	}
	oHeaderPhone.onmouseout=function(){
		this.className="";
		oHeaderPhoneDiv.style.display='none';

	}

	var oHeaderService=document.getElementById('header_service');
	var oHeaderServiceDiv=oHeaderService.getElementsByTagName('div')[0];
	oHeaderService.onmouseover=function(){
		oForm.onblur();
		this.className="head_active";
		oHeaderServiceDiv.style.display='block';
	}
	oHeaderService.onmouseout=function(){
		this.className="";
		oHeaderServiceDiv.style.display='none';
	}

	var oHeaderNav=document.getElementById('header_nav');
	var oHeaderNavDiv=oHeaderNav.getElementsByTagName('div')[0];
	oHeaderNav.onmouseover=function(){
		oForm.onblur();
		this.className="head_active";
		oHeaderNavDiv.style.display='block';
	}
	oHeaderNav.onmouseout=function(){
		this.className="";
		oHeaderNavDiv.style.display='none';
	}

	var oSearchEnter = document.getElementById('search_enter');
	var oSearchUnder = document.getElementById('search_under');
	var oForm = oSearchEnter.getElementsByTagName('input')[0];
	oForm.onfocus = function(){
		oSearchUnder.style.display = 'block';
	}
	oForm.onblur = function(){
		oSearchUnder.style.display = 'none';
	}

	var oUserPay = document.getElementById('user_pay');
	var oUserPayBox = oUserPay.getElementsByTagName('div')[0];
	var oUserPayDiv = oUserPay.getElementsByTagName('div')[1];
	oUserPay.onmouseover = function(){
		oForm.onblur();
		oUserPayDiv.style.display = 'block';
		addClass(oUserPayBox,'active')
	}
	oUserPay.onmouseout= function(){
		oUserPayDiv.style.display = 'none';
		removeClass(oUserPayBox,'active')
	}

	var oUserLogin = document.getElementById('user_login');
	var oUserLoginBox = oUserLogin.getElementsByTagName('div')[0];
	var oUserLoginDiv = oUserLogin.getElementsByTagName('div')[1];
	oUserLogin.onmouseover = function(){
		oForm.onblur();
		oUserLoginDiv.style.display = 'block';
		addClass(oUserLoginBox,'active')
	}
	oUserLogin.onmouseout= function(){
		oUserLoginDiv.style.display = 'none';
		removeClass(oUserLoginBox,'active')
	}
	/*****************************************************************************
	*****************************goods_list***************************************
	*****************************************************************************/

	var oGoodsL = document.getElementById('goods_l');
	var aGoodLLi = getByClass('good_l_li',oGoodsL);
	var aGoodsClose = getByClass('goods_close',oGoodsL);
	for(var i = 0; i < aGoodLLi.length; i++){
		aGoodLLi[i].index = i;
		aGoodsClose[i].index = i;
		aGoodLLi[i].onmouseover = function(){
			oForm.onblur();
			this.getElementsByTagName('p')[0].className = 'active';
			this.getElementsByTagName('div')[0].className = 'g_ac';
			
			if(scrollY() > 235){
				this.getElementsByTagName('div')[0].style.top = scrollY() - 235 + 'px';
			}else{
				this.getElementsByTagName('div')[0].style.top = '4px'
			}
		}
		aGoodLLi[i].onmouseout = function(){
			this.getElementsByTagName('p')[0].className = '';
			this.getElementsByTagName('div')[0].className = 'goods_big';
		}
		aGoodsClose[i].onclick = function(){
			aGoodLLi[this.index].getElementsByTagName('div')[0].className = 'goods_big';
		}
	}
	var aGoodsBigLastUa = getByClass('goods_big_lastu',document)[0].getElementsByTagName('a');
	for(var i = 0; i < aGoodsBigLastUa.length; i++){
		aGoodsBigLastUa[i].style.backgroundPosition = '0px '+(-i*48)+'px';
	}

	var oGoodsM = document.getElementById('goods_m');
	var aGoodsMUlLi = oGoodsM.getElementsByTagName('ul')[0].getElementsByTagName('li');
	var aGoodsMOlLi = oGoodsM.getElementsByTagName('ol')[0].getElementsByTagName('li');

	oGoodsM.getElementsByTagName('ol')[0].style.zIndex = 1;
	
	var aGoodsMUlLiNum = 0;
	aGoodsMOlLi[aGoodsMOlLi.length-1].className = 'active';
	aGoodsMUlLi[aGoodsMUlLiNum].style.opacity = 1;
	aGoodsMUlLi[aGoodsMUlLiNum].style.filter = 'alpha(oapcity=100)';
	for(var i = 0; i < aGoodsMOlLi.length; i++){
		aGoodsMOlLi[i].index = i;
		aGoodsMOlLi[i].style.zIndex = 3;
		aGoodsMOlLi[i].onmouseover = function(){
			oForm.onblur();
			var that = this;
			for(var j = 0; j < aGoodsMOlLi.length; j++){
				aGoodsMOlLi[j].className = '';
			}
			startMove(aGoodsMUlLi[aGoodsMUlLiNum],{opacity:0},200,'linear',function(){
				
				for(var i = 0; i < aGoodsMUlLi.length; i++){
					aGoodsMUlLi[i].style.zIndex = 0; 
				}
				aGoodsMUlLiNum = (aGoodsMOlLi.length-1)-that.index;
				
				aGoodsMUlLi[aGoodsMUlLiNum].style.zIndex = 1;
				startMove(aGoodsMUlLi[aGoodsMUlLiNum],{opacity:100},200,'linear');
			})
			this.className = 'active';

		}
	}

	var oGoodsMDownUl = getByClass('goods_m_down_ul',oGoodsM)[0];
	var oGoodsMDownPrev = document.getElementById('goods_prev');
	var oGoodsMDownNext = document.getElementById('goods_next');
	var aGoodsMDownLi2 = oGoodsMDownUl.getElementsByTagName('li');
	var aGoodsMDownImg1 = aGoodsMDownLi2[0].getElementsByTagName('img');
	var aGoodsMDownImg2 = aGoodsMDownLi2[1].getElementsByTagName('img');
	var aGoodsMDownImg3 = aGoodsMDownLi2[2].getElementsByTagName('img');
	var aGoodsMUlLiNum2 = 0;
	var arrGoodsMDownImg = [['1.jpg','2.jpg','3.jpg'],['4.jpg','5.jpg','6.jpg'],['7.jpg','8.jpg','9.jpg'],
							['3.jpg','2.jpg','1.jpg'],['6.jpg','5.jpg','4.jpg'],['9.jpg','8.jpg','7.jpg']];

	for(var i = 0; i < aGoodsMDownImg2.length; i++){
		aGoodsMDownImg2[i].src = 'imgs/goods_m_down/'+arrGoodsMDownImg[aGoodsMUlLiNum2][i];
	}

	oGoodsMDownPrev.onclick = function(){
		aGoodsMUlLiNum2++;
		aGoodsMUlLiNum2 %= arrGoodsMDownImg.length;
		

		for(var i = 0; i < aGoodsMDownImg3.length; i++){
			aGoodsMDownImg3[i].src = 'imgs/goods_m_down/'+arrGoodsMDownImg[aGoodsMUlLiNum2][i];
		}
		startMove(oGoodsMDownUl,{left:-1220},500,'linear',function(){
			for(var i = 0; i < aGoodsMDownImg2.length; i++){
				aGoodsMDownImg2[i].src = 'imgs/goods_m_down/'+arrGoodsMDownImg[aGoodsMUlLiNum2][i];
			}
			oGoodsMDownUl.style.left = '-610px';
		})
	}
	oGoodsMDownNext.onclick = function(){
		aGoodsMUlLiNum2--;
		if(aGoodsMUlLiNum2 < 0)aGoodsMUlLiNum2 = arrGoodsMDownImg.length-1;

		for(var i = 0; i < aGoodsMDownImg2.length; i++){
			aGoodsMDownImg2[i].src = 'imgs/goods_m_down/'+arrGoodsMDownImg[aGoodsMUlLiNum2][i];
		}
		startMove(oGoodsMDownUl,{left:0},500,'linear',function(){
			for(var i = 0; i < aGoodsMDownImg2.length; i++){
				aGoodsMDownImg2[i].src = 'imgs/goods_m_down/'+arrGoodsMDownImg[aGoodsMUlLiNum2][i];
			}
			oGoodsMDownUl.style.left = '-610px';
		})
	}

	/*****************************Goods_r_Down****************************************/
	var oGoodsRDownHover = getByClass('goods_r_down_hover',document)[0];
	var oGoodsRDownMove = getByClass('goods_r_down_move',document)[0];

	var aGoodsRDownUl = oGoodsRDownHover.getElementsByTagName('ul');
	var aGoodsRDownLi = aGoodsRDownUl[0].getElementsByTagName('li');
	var aGoodsRDownMoveDiv = getByClass('goods_r_down_move_box',oGoodsRDownMove);
	var aGoodsRDownMoveClose = getByClass('goods_r_down_move_close',oGoodsRDownMove);

	for(var i = 0; i < aGoodsRDownLi.length; i++){
		aGoodsRDownLi[i].index = i;
		aGoodsRDownLi[i].timer = null;
		aGoodsRDownLi[i].onmouseenter = function(){
			oForm.onblur();
			var This = this;
			clearTimeout(this.timer);
			this.timer = setTimeout(function(){
				for(var i = 0; i < aGoodsRDownLi.length; i++){
					aGoodsRDownMoveDiv[i].style.display = 'none';
					removeClass(aGoodsRDownLi[i],'active');
				}
				aGoodsRDownMoveDiv[This.index].style.display = 'block';
				addClass(This,'active');
				addClass(aGoodsRDownUl[0],'goods_r_down_up_active');
				startMove(aGoodsRDownUl[1],{height:0},200,'linear');
			},150)
			
		}
		aGoodsRDownLi[i].onmouseleave = function(){
			if(!hasClass(this,'active')){
			
				clearTimeout(this.timer);
			}
			
		}
		aGoodsRDownMoveClose[i].onclick = function(ev){
			var ev = ev || event;
			startMove(aGoodsRDownUl[1],{height:84},200,'linear',function(){
				removeClass(aGoodsRDownUl[0],'goods_r_down_up_active');
			});
			for(var i = 0; i < aGoodsRDownLi.length; i++){
				removeClass(aGoodsRDownLi[i],'active');
			}
			ev.cancelBubble = true;
		}
	}


/************************************life*****************************************/
	var oLifeImgs = document.getElementById('life_imgs');
	var aLifeLi = getByClass('life_li',oLifeImgs)
	for(var i = 0; i < aLifeLi.length; i++){
		aLifeLi[i].onmouseover = function(){
			var oImg = this.getElementsByTagName('img')[0];
			startMove(oImg,{left:-10},200,'linear');
		}
		aLifeLi[i].onmouseout = function(){
			var oImg = this.getElementsByTagName('img')[0];
			startMove(oImg,{left:0},200,'linear');
		}
	}

	var aMainM = getByClass('main_m',document);
	for(var i = 0; i < aMainM.length; i++){
		tabMainM(aMainM[i]);
	}

	function tabMainM(obj){
		var oMainMImg = obj.getElementsByTagName('img')[0];
		var aMainMBoxLi = getByClass('main_m_box_li',obj);
		var oWidth = aMainMBoxLi[0].offsetWidth;
		for(var i = 0; i < aMainMBoxLi.length; i++){
			aMainMBoxLi[i].index = i;
			aMainMBoxLi[i].onmouseover = function(){
				for(var i = 0; i < aMainMBoxLi.length; i++){
					removeClass(aMainMBoxLi[i],'main_m_active')
					aMainMBoxLi[i].children[1].style.display = 'none';
				}
				addClass(this,'main_m_active')
				this.children[1].style.display = 'block';
				var that = this;
				startMove(oMainMImg,{left:that.index*oWidth},400,'backBoth');
			}
		}
	}
	
	var aMainMTab = getByClass('main_m_tab',document);
	for(var i = 0; i < aMainMTab.length; i++){
		tabMainMTab(aMainMTab[i]);
	}
	/*中间的middle TAB*/
	function tabMainMTab(obj){
		var oMainMTabUl = obj.getElementsByTagName('ul')[0];
		var aMainMTabLi = obj.getElementsByTagName('ol')[0].getElementsByTagName('li');
		for(var i = 0; i < aMainMTabLi.length; i++){
			aMainMTabLi[i].index = i;
			aMainMTabLi[i].onmouseover = function(){
				for(var i = 0; i < aMainMTabLi.length; i++){
					aMainMTabLi[i].className = '';
				}
				this.className = 'active';
				startMove(oMainMTabUl,{left:-this.index*474},400,'linear');
			}
		}
	}


	/*主体内容右边的切换two_two*/

	var aTwoTwo = getByClass('two_two',document);
	for(var i = 0; i < aTwoTwo.length; i++){
		tabTwoTwo(aTwoTwo[i]);
	}
	
	function tabTwoTwo(obj){
		var oTwoTwoDiv = obj.getElementsByTagName('div')[0];
		var aTwoTwoLi = obj.getElementsByTagName('li');
		for(var i = 0; i < aTwoTwoLi.length; i++){
			aTwoTwoLi[i].index = i;
			aTwoTwoLi[i].onmouseover = function(){
				for(var i = 0; i < aTwoTwoLi.length; i++){
					aTwoTwoLi[i].className = '';
					this.className = 'active';
					startMove(oTwoTwoDiv,{left: -this.index*209},400,'backBoth');
				}
			}
		}

	}


	var oMainMListCol = getByClass('main_m_list_col',document)[0];
	var aMainMListColDiv = oMainMListCol.getElementsByTagName('div');
	for(var i = 0; i < aMainMListColDiv.length; i++){
		aMainMListColDiv[i].index = i;
		aMainMListColDiv[i].onmouseover = function(){
			for(var i = 0; i < aMainMListColDiv.length; i++){
				var oLightBox = aMainMListColDiv[i].getElementsByTagName('p')[0];
				oLightBox.style.display = 'block';
			}
			var oThisImg = this.getElementsByTagName('img')[0];
			var oThisLightBox =this.getElementsByTagName('p')[0];
			oThisLightBox.style.display = 'none';
			startMove(oThisImg, {left: -15}, 400, 'linear');
		}
		aMainMListColDiv[i].onmouseout = function(){
			for(var i = 0; i < aMainMListColDiv.length; i++){
				var oLightBox = aMainMListColDiv[i].getElementsByTagName('p')[0];
				oLightBox.style.display = 'none';
			}
			var oThisImg = this.getElementsByTagName('img')[0];
			startMove(oThisImg, {left: 0}, 400, 'linear');
		}
	}


	var aHotListBox = getByClass('hot_list_box',document);
	var arrHotList = [
					{
						img:'imgs/hot/1.jpg',
						title:'哈哈！很可爱！很赞！',
						con:'上午下单，下午就到了，安全插孔家里有宝宝的应该放心了。颜色太棒了，像个小玩具一样！'
					},
					{
						img:'imgs/hot/2.jpg',
						title:'哈哈！很可爱！很赞！',
						con:'上午下单，下午就到了，安全插孔家里有宝宝的应该放心了。颜色太棒了，像个小玩具一样！'
					},
					{
						img:'imgs/hot/1.jpg',
						title:'哈哈！很可爱！很赞！',
						con:'上午下单，下午就到了，安全插孔家里有宝宝的应该放心了。颜色太棒了，像个小玩具一样！'
					},
					{
						img:'imgs/hot/2.jpg',
						title:'哈哈！很可爱！很赞！',
						con:'上午下单，下午就到了，安全插孔家里有宝宝的应该放心了。颜色太棒了，像个小玩具一样！'
					},
					{
						img:'imgs/hot/1.jpg',
						title:'哈哈！很可爱！很赞！',
						con:'上午下单，下午就到了，安全插孔家里有宝宝的应该放心了。颜色太棒了，像个小玩具一样！'
					},
					{
						img:'imgs/hot/2.jpg',
						title:'哈哈！很可爱！很赞！',
						con:'上午下单，下午就到了，安全插孔家里有宝宝的应该放心了。颜色太棒了，像个小玩具一样！'
					}]
	var num1 = num2 =  0;

	setTimeout(function(){
		hotListAuto(aHotListBox[0],num1)
	}, 1000);
	setTimeout(function(){
		hotListAuto(aHotListBox[1],num2);
	},2000)


	function hotListAuto(obj,n){
		var oHotListBoxUl = obj.getElementsByTagName('ul')[0];
		var aHotListBoxLi = oHotListBoxUl.getElementsByTagName('li');
		var oImg = aHotListBoxLi[0].getElementsByTagName('img')[0];
		var aP = aHotListBoxLi[0].getElementsByTagName('p');
		oImg.src = arrHotList[n].img;
		aP[0].innerHTML = arrHotList[n].title;
		aP[1].innerHTML = arrHotList[n].con;
		startMove(oHotListBoxUl,{bottom: -80},400,'linear',function(){
			n++;
			n %= arrHotList.length;
			aHotListBoxLi[2].innerHTML = aHotListBoxLi[1].innerHTML;
			aHotListBoxLi[1].innerHTML = aHotListBoxLi[0].innerHTML;
			oHotListBoxUl.style.bottom = 0;
			setTimeout(function(){
				hotListAuto(obj,n);
			},4500)
		});	
	}
	
}


function getStyle(obj, attr) { return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, 0)[attr]; }
var Tween = {
	//t : 当前时间   b : 初始值  c : 变化值   d : 总时间
	//return : 当前的位置 	
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	}
}

function startMove(obj,json,times,fx,fn){	
	var iCur = {};	
	var startTime = now();	
	for(var attr in json){
		iCur[attr] = 0;
		if(attr == 'opacity'){			
			iCur[attr] = Math.round(getStyle(obj,attr)*100);			
		}
		else{			
			iCur[attr] = parseInt(getStyle(obj,attr));			
		}
	}	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){		
		var changeTime = now();		
		var scale = 1 -  Math.max(0,startTime  -  changeTime + times)/times ; //1000 - 0  ->  1 - 0  -> 0 - 1		
		for(var attr in json){			
			var value = Tween[fx]( scale*times ,iCur[attr] , json[attr] - iCur[attr] , times );			
			if(attr == 'opacity'){				
				obj.style.filter = 'alpha(oapcity='+value+')';
				obj.style.opacity = value/100;				
			}
			else{
				
				obj.style[attr] = value + 'px';				
			}			
		}		
		if(scale == 1){
			clearInterval(obj.timer);
			if(fn){
				fn.call(obj);
			}
		}		
	},30);	
	function now(){		
		return (new Date()).getTime();		
	}	
}

function removeClass(obj,sClass){
	
	if(!obj.className)return;
	
	var aClass = obj.className.split(' ');
	
	for(var i=0; i<aClass.length; i++){
		if( aClass[i] === sClass ){
			aClass.splice(i,1);
			obj.className = aClass.join(' ');
			return;
		}			
	}
	
}

function addClass(obj,sClass){
	
	if(!obj.className){		
		obj.className = sClass;
		return;	
	}
	
	var aClass = obj.className.split(' ');
	
	for(var i=0; i<aClass.length; i++){
		if( aClass[i] === sClass )return;			
	}

	obj.className += ' ' + sClass;	
	
}

function getByClass(sClass,parent){
	
	var aEles = (parent||document).getElementsByTagName('*');
	var arr = [];
	
	for(var i=0; i<aEles.length; i++){
		
		var aClass = aEles[i].className.split(' ');
	
		for(var j=0; j<aClass.length; j++){
			
			if( aClass[j] == sClass ){
			
				arr.push( aEles[i] );	
				break;
				
			}
			
		}
		
	}
	
	return arr;
	
}

function hasClass(obj,sClass){

	if(!obj.className)return false;
	
	var aClass = obj.className.split(' ');
	
	for(var i=0; i<aClass.length; i++){
	
		if(aClass[i] === sClass)return true;	
		
	}
	
	return false;
}

function scrollY(){
	return document.body.scrollTop || document.documentElement.scrollTop;
}