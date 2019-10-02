window.onload = function(){
    finish();
	function finish(){
        var allBgd = document.querySelector('#allBgd');
        var leftMenuList=Array.from(document.querySelectorAll('.leftMenu-list'));
        var mainrightList=document.querySelectorAll('.main-right li')[2];
      

        var allBgdChildren = allBgd.children;
        
        leftMenuList.forEach((e,i)=>{
        	
        	e.onclick = function(){
        		
        		
        		
        		mainMenuBgd.classList.add('allHidden');
        		
//      		mainMenu.classList.add('allHidden');
//				moneyEntrepot.classList.add('allHidden');
				
        		for(var j=0;j<allBgdChildren.length;j++){
                    allBgdChildren[j].classList.add('allHidden');
                }
        		
        		allBgd.classList.remove('allHidden');
        		
                allBgdChildren[i].classList.remove('allHidden');
                newsSet();
        	}
        })

        mainrightList.onclick = function(){
        	mainMenuBgd.classList.add('allHidden');
//      	mainMenu.classList.add('allHidden');
//			moneyEntrepot.classList.add('allHidden');
			
        	bagmodel.classList.remove('allHidden'); //????
    
        	
        	dj();
        	
        }

	}


/**********************************moneyEntrepot->界面效果***********************************/	
	//时间设置
	setInterval(function(){
		moneyTimeSet()
	},1000)
	
	moneyTimeSet()
	function moneyTimeSet(){
		var nowTime=document.querySelector('.nowTime span');
		var date=new Date();
		var year=date.getFullYear();//年
		var month=date.getMonth();//月
		var day=date.getDate();//日
		var week=date.getDay();//星期几
		var hour=date.getHours();//小时
		var minute=date.getMinutes();//分钟
		var n=0;
		if(hour<10){
            hour = '0'+hour;
        }
        if(minute<10){
            minute = '0'+minute;
        }
        
		nowTime.innerHTML=hour.toString().charAt(0)+hour.toString().charAt(1)+':'+minute.toString().charAt(0)+minute.toString().charAt(1);

	}
	
	moneyEntrepotTip()
	function moneyEntrepotTip(){
		
		var moneyAdd=Array.from(document.querySelectorAll('.moneyAdd'));
		var rechargeUl=document.querySelector('.recharge-bottom ul');
		var moneyTipBoxChild=document.querySelector('.moneyTipBox').children;
		var moneyTipBox=document.querySelector('.moneyTipBox');
		var tipBoxClose=Array.from(document.querySelectorAll('.tipBox-close'));
		var rechargeBtn=document.querySelector('.recharge-btn');
		var rechargeTip=document.querySelector('.rechargeTip');
		var moneyPower=document.querySelectorAll('.moneyPower');
		console.log(moneyTipBoxChild)
		//点击加图片，tipbox出现
		moneyAdd.forEach((e,i)=>{
			e.onclick = function(){
				//大清洗
				for(var j=0;j<moneyTipBoxChild.length;j++){
					moneyTipBoxChild[j].style.display='none';
				}
				moneyTipBox.style.display='block';
				moneyTipBoxChild[i].style.display='block';
				moneyTipBoxChild[i].style.transform='scale(1.1)';
				setTimeout(function(){
					moneyTipBoxChild[i].style.transition='0.2s';
					moneyTipBoxChild[i].style.transform='scale(1)';
				})
			}
		})
		
		//点击关闭tipbox
		tipBoxClose.forEach((e,i)=>{
			e.onmousedown = function(){
				e.style.transform = 'scale(0.8)';
				moneyTipBoxChild[i].style.transform='scale(1.1)';
			}
			e.onmouseup = function(){
				e.style.transform = 'scale(1)';
				
				moneyTipBoxChild[i].style.transition='0.2s';
				moneyTipBoxChild[i].style.transform='scale(1)';
				setTimeout(function(){
					moneyTipBox.style.display='none';//遮罩
					moneyTipBoxChild[i].style.display='none';//弹框	
				})
			}
		})
		rechargeBtn.onclick = function(){
			rechargeTip.style.display='none';
			moneyTipBox.style.display='none';//遮罩
		}
		
		//rechargeTip拖拽
		moveAnim(rechargeUl,0,-150);
		
		//点击使用按钮，进行兑换
		var tipBoxBuy=Array.from(document.querySelectorAll('.tipBox-buy'));
		var powerNum=document.querySelector('.powerNum');
		var goldNum=document.querySelector('.goldNum');
		var buyAfter=document.querySelectorAll('.buyAfter');
		
		
		tipBoxBuy.forEach((e,i)=>{
			
			e.onclick = function(){
				
				var powerNumVal=Number(powerNum.innerHTML);
				var goldNumVal=Number(goldNum.innerHTML);
				
				if(i==0){
					//购买成功弹窗弹出
					buyAfter[0].innerHTML='兑换成功';
					buyAfter[0].style.display='block';
					setTimeout(function(){
						buyAfter[0].style.display='none';
					},1000);
					
					
					if(powerNumVal<=0){
						buyAfter[0].style.display='block';
						buyAfter[0].innerHTML='当前可用次数为零';
						setTimeout(function(){
							buyAfter[0].style.display='none';
						},1000);
						return;
					}
					powerNum.innerHTML=--powerNumVal;
					
					var txtNum=Number(moneyPower[0].innerHTML);
					var pt=Number(moneyPower[1].innerHTML);
					
					moneyPower[0].innerHTML=txtNum+100;
					
					moneyPower[1].innerHTML=pt-50;
					
				}else if(i==1){
					buyAfter[1].style.display='block';
					buyAfter[1].innerHTML='充值功能未开放';
					setTimeout(function(){
						buyAfter[1].style.display='none';
					},1000);
					return;
				}else if(i==2){
					//购买成功弹窗弹出
					buyAfter[2].innerHTML='兑换成功';
					buyAfter[2].style.display='block';
					setTimeout(function(){
						buyAfter[2].style.display='none';
					},1000);
					
					
					if(goldNumVal<=0){
						buyAfter[2].style.display='block';
						buyAfter[2].innerHTML='当前可用次数为零';
						setTimeout(function(){
							buyAfter[2].style.display='none';
						},1000);
						return;
					}
					goldNum.innerHTML=--goldNumVal;
					
					var txtNum=Number(moneyPower[2].innerHTML);
					var pt=Number(moneyPower[1].innerHTML);
					
					moneyPower[2].innerHTML=txtNum+5000;
					moneyPower[1].innerHTML=pt-10;
				}
				return false;
				
			}
			
		})
	}
	
	
/**********************************news->界面切换&&拖拽效果***********************************/	
	var mainMenu=document.querySelector('#main-menu');
	newsSet();
	function newsSet(){
		var newschild=Array.from(document.querySelector('#news_content').children);
		var news_headBtn=Array.from(document.querySelector('#news_head').children);
		var activeList=document.querySelector('.active-list');
		
		news_headBtn.forEach((e,i)=>{
			e.onclick = function(){
				for(var j=0;j<news_headBtn.length;j++){
					news_headBtn[j].classList.remove('news_click');
					newschild[j].style.display='none';
				}
				e.classList.add('news_click');
				newschild[i].style.display='block';
			}
		})
	//	console.log(activeList.offsetTop)
		moveAnim(activeList,19,-471);//左侧拖拽效果	
		
		//点击关闭按钮，回到主菜单界面
		news_close.onclick = function(){
			newsDatail.classList.add('allHidden');
			mainMenuBgd.classList.remove('allHidden');
//			mainMenu.classList.remove('allHidden');
//			moneyEntrepot.classList.remove('allHidden');
			finish();
			allBgd.classList.add('allHidden');
		}
		
	/**********************************news->官方公告***********************************/
		var notice_scroll=document.querySelector('.notice-scroll');//滚动条滚动区域
		var notice_content=document.querySelector('.notice-content');//公告栏内容区域
		var scrollTool=document.querySelector('.scrollTool');//滚动条
		var notice=document.querySelector('#notice');//公告栏
		
		console.log(notice_scroll.clientHeight)
		//设置滚动条高度
		scrollTool.style.height=notice_content.clientHeight/notice.scrollHeight*notice_scroll.clientHeight+'px';
	//	console.log()
		//滚动条滚动速度
		var speed=50;
//		console.log(notice_scroll.clientHeight);
		//滚动条最大的滚动距离
		var scrollMax=notice_scroll.clientHeight-scrollTool.offsetHeight;
		
		//内容最大的滚动距离
		var contentMax=notice_content.scrollHeight-notice.clientHeight;
		
		scroll({
	        obj:notice,
	        down:function(ev){
	            //滚动条的变化
	            var scrollT = scrollTool.offsetTop+speed;
	            
	            if(scrollT>scrollMax){
	                scrollT=scrollMax;
	            }
	           	
	            notice_content.style.top = -scrollT/scrollMax*contentMax+'px';
	            scrollTool.style.top = scrollT +'px';
	         	
	        },
	        up:function(ev){
				//滚动条的变化
	            var scrollT = scrollTool.offsetTop-speed;
	            if(scrollT<0){
	                scrollT=0;
	            }
	            notice_content.style.top = -scrollT/scrollMax*contentMax+'px';
	            scrollTool.style.top = scrollT +'px';
	            
	        }
	   });	
		
		/*********active->活动内容**************/
		var arrP=['钻石消费送好礼',
					'周末限时大轮盘',
					'新版本连登来送礼',
					'周末累计充值礼包',
					'游客账号安全',
					'狩猎场&固定交换',
					'天天礼包',
					'【防骗通知】'
				];
		var arrSpan=[	'活动内容：活动期间累计消费钻石达到一定程度即可领取对应的礼包奖励。（拍卖行不参与本活动）',
						'活动内容：活动期间累计充值达到指定额度即可获得一次购买机会，每次购买获得1万金币并随机赠送一件道具，购买次数限于活动时间内使用',
						'活动内容：连续登陆达到对应的天数，即可领取活动奖励',
						'活动内容：活动期间内玩家可通过【累计充值】活动面板进行充值相应的金额即可获得相应的充值大礼包',
						'亲爱的训练师！为了您的账号安全，还请以【游客账号】方式登陆的玩家。进行【游客转正】操作，以免造成不必要的损失',
						'狩猎场：固定交换：海牛兽=尼多娜+三地鼠+布卢皇',
						'参与方式：玩家每日充值（6元RMB）即可领取相对应奖励，累计充值天数满3天和5天的玩家将会获得额外的礼包奖励',
						'请大家警惕代充、充值返利等诈骗广告'
					]
		
		var activeBtn=Array.from(document.querySelectorAll('.active-btn'));
		var active_textP=document.querySelector('.active-text p');
		var active_textSpan=document.querySelector('.textchange');
	
		activeBtn.forEach((e,i)=>{
			
			e.onclick = function(ev){
				//大清洗
				for(var j=0;j<activeBtn.length;j++){
					activeBtn[j].classList.remove('active-click');
				}
				e.classList.add('active-click');
				
				active_textP.innerHTML=arrP[i];
				active_textSpan.childNodes[0].nodeValue=arrSpan[i];
			}
		})		
		
	}

	


/**********************************grow->拖拽***********************************/
	growSet()
	function growSet(){
		var growBottom=document.querySelector('.grow-bottom');
		var growStep=document.querySelector('.grow-step');
		var growClose=document.querySelector('.grow-close');
		
		moveAnim(growStep,0,-400);
		
		//点击关闭按钮，回到主菜单界面
		growClose.onclick = function(){
			allBgd.classList.add('allHidden');
			growDatail.classList.add('allHidden');
			mainMenuBgd.classList.remove('allHidden');
//			mainMenu.classList.remove('allHidden');
//			moneyEntrepot.classList.remove('allHidden');
			finish();
			
		}
		
		return false;
	}
	
	
/**********************************活动页面->拖拽&&其他效果***********************************/	
	eventSet()
	
	function eventSet(){
		var eventLeftUl=document.querySelector('.event-left ul');
		var eventGiftUl=document.querySelectorAll('.event-gift ul');
		var eventList=Array.from(document.querySelectorAll('.event-list'));
		var eventClose=document.querySelector('.event-close');
		var keyImg=document.querySelectorAll('.key img');
		var eventTitleSpan=document.querySelectorAll('.event-title span');
		
		var arr1=[	'活动时间：1月9日10：00-1月13日23：59',
					'活动时间：1月9日10：00-1月13日23：59',
					'活动时间：1月9日10：00-1月13日23：59'
				];
		var arr2=[	'活动内容：连续登录达到对应天数，即可领取活动奖励',
					'活动内容：活动期间玩家通过【累计充值】活动面板进行充值相应的金额即可，即可获得相应的充值大礼包',
					'活动内容：活动期间内玩家可通过【限时单笔反钻】活动面板进行充值相应的金额即可获得相应的充值大礼包',
					'VIP回馈大礼包，VIP等级越高礼包越丰厚！史诗精灵、传说道具应有尽有，让你赢在起跑线，突显尊贵气质',
					'注册前七天每天签到登入即可领取扶持大礼包，第二天就送皮卡丘哦',
					'达到对应等级即可领取对应奖励，赶紧冲冲冲'
				]

		///上下箭头的浮动效果
		setInterval(function(){
			
			MTween(keyImg[0],-6,400,'top','linear',function(){
				
				MTween(keyImg[0],6,400,'top','linear');
			});
			MTween(keyImg[1],6,400,'top','linear',function(){
				MTween(keyImg[1],-6,400,'top','linear');
			});
		},900);
		
		
		//默认第一个显示
		eventList[0].classList.add('event-click');
		
		eventGiftUl[0].style.display='block';
		//左侧list点击切换页面
		eventList.forEach((e,i)=>{
			
			e.onclick = function(){
				//大清洗
				for(var j=0;j<eventList.length;j++){
					eventList[j].classList.remove('event-click');
					eventGiftUl[j].style.display='none';
				}
				e.classList.add('event-click');
				
				eventGiftUl[i].style.display='block';
				
				moveAnim(eventGiftUl[i],0,-514);//右侧拖拽效果
				
				if(i<3){
					eventTitleSpan[0].innerHTML=arr1[i];
				}else{
					eventTitleSpan[0].remove();
				}
				
				eventTitleSpan[1].innerHTML=arr2[i];
			}
		})
		
		moveAnim(eventLeftUl,20,-647);//左侧拖拽效果
		moveAnim(eventGiftUl[0],0,-514);//右侧拖拽效果
		//点击关闭按钮，回到主菜单界面
		eventClose.onclick = function(){
//			
			eventDatail.classList.add('allHidden');
			mainMenuBgd.classList.remove('allHidden');
//			mainMenu.classList.remove('allHidden');
//			moneyEntrepot.classList.remove('allHidden');
			finish();
			allBgd.classList.add('allHidden');
		}
		
	}
	
	


/**********************************菜单栏->点击展开收起效果***********************************/	
	menuSet()
	function menuSet(param,cb){
		
		var menuContent=document.querySelector('.menu-content');
		var mainMenu=document.querySelector('#main-menu');
		var leftMenuList = document.querySelectorAll('.leftMenu-list');
		var mainLeft=document.querySelector('.main-left');
		var mainRight=document.querySelector('.main-right');
		
		
		menuContent.isClick = false;//默认关闭状态
		menuContent.anim=false;
		menuContent.onclick = function(){
			if(this.anim) return;
			
			this.anim=true;
			
			if(!this.isClick){
				menuAnimBerfore();//关闭
				
				function menuAnimBerfore(){
					menuContent.style.transform='rotate(105deg)';
					menuContent.style.transition='.3s';
					setTimeout(function(){
						menuContent.style.transform='rotate(90deg)';
						menuContent.style.transition='.2s';
					},300);
				}
				
				mainLeft.style.width='0';
				mainLeft.style.height='0';
				MTween(mainLeft,500,1000,'left','elasticIn',function(){
					
				});
				
				mainRight.style.width='0px';
				mainRight.style.height='0';
				
				MTween(mainRight,378,1000,'top','elasticIn',function(){
					menuContent.anim=false;
					menuContent.isClick=true;
				});
				
				
			}else{
				menuAnimAfter();//打开
				
				function menuAnimAfter(){
					menuContent.style.transform='rotate(-15deg)';
					menuContent.style.transition='.3s';
					setTimeout(function(){
						menuContent.style.transform='rotate(0deg)';
						menuContent.style.transition='.2s';
					},300);
				}
				
				
				mainLeft.style.width='558px';
				mainLeft.style.height='100%';
				MTween(mainLeft,-500,1000,'left','elasticOut');
				
				mainRight.style.width='100px';
				mainRight.style.height='375px';
				MTween(mainRight,-378,1000,'top','elasticOut',function(){
					menuContent.anim=false;
					menuContent.isClick=false;
				});
				
			}
			
		}
		
	}
/**********************************grow成长功能区***********************************/	
	growSet()
	function growSet(){
		var growBottom=document.querySelector('.grow-bottom');
		var growStep=document.querySelector('.grow-step');
		var growClose=document.querySelector('.grow-close');
		
		moveAnim(growStep,0,-400);
		
		//点击关闭按钮，回到主菜单界面
		growClose.onclick = function(){
//			return false;
			growDatail.classList.add('allHidden');
			mainMenuBgd.classList.remove('allHidden');
//			mainMenu.classList.remove('allHidden');
//			moneyEntrepot.classList.remove('allHidden');
			finish();
			allBgd.classList.add('allHidden');
		}
	}
	
/**********************************立春功能区域***********************************/	
//	交换精灵
	one()
	function one(){
		var q = document.getElementById('q'); //问号
		var x = document.getElementById('x'); //关闭按钮
		var changeCover = document.querySelector('.change-cover')
		
		var changeParent = document.getElementById('change-parent'); //关闭按钮
		
		var changeBox1 = document.getElementById('change-box1');
		var changeimg1 = document.getElementById('img1');
		var changeimg2 = document.getElementById('img2');
		var changeimg3 = document.getElementById('img3');
		
		var changeBtn = document.querySelectorAll('.change-btns');
		
		//顶部问号的点击效果
		q.onmousedown = function(){
			this.style.width = '70px';
		}
		q.onmouseup = function(){
			this.style.width = '78px';
		}
		function a(ev){
			changeCover.style.display = 'block';	
			ev.cancelBubble=true;
		}
		q.addEventListener('click',a );
		document.onclick = function(){
			changeCover.style.display='none';
		}
		
		//关闭按钮
		x.onmousedown = function(){
			this.style.width = '70px';
		}
		x.onmouseup = function(){
			this.style.width = '78px';
			changeParent.classList.add('allHidden');
			mainMenuBgd.classList.remove('allHidden');
//			mainMenu.classList.remove('allHidden');
//			moneyEntrepot.classList.remove('allHidden');
			finish();
			allBgd.classList.add('allHidden');
		}
		
		
		// 精灵上下浮动
		    var y1 = 150;       // 设置图片的起始点坐标
		    var y2 = 170;
		    var y3 = 190;
			var ySpeed=2;     //速度   
			var h = 170;   	//可移动距离
			
			
			floatimg();
			function floatimg(){
			    if(y1>h||y1<110 && y2>h||y2<110 && y3>h||y3<140){
			    	ySpeed=-ySpeed;
			    }
			    y1+=ySpeed;
			    y2+=ySpeed;
			    y3+=ySpeed;
			
			    changeimg1.style.top= y1 + "px";
			    changeimg2.style.top= y2 + "px";
			    changeimg3.style.top= y3 + "px";
			
			    setTimeout(floatimg,40);
			}
			
		
		for(var i=0; i<changeBtn.length; i++){
			changeBtn[i].onclick = function(){
				for(var j=0; j<changeBtn.length; j++){
					changeBtn[j].style.color = '#fff';
				}
				this.style.color = '#ffd46f';
			}
		}
			
	}
	
//	神秘商店
	two()
	function two(){
		var shopNav = document.querySelector('.shop-nav');  //左边侧边栏
		var shopNavLi = shopNav.querySelectorAll('li');
		var shopBgd = document.querySelectorAll('.shop-bgd');
		var shopRenovate = document.querySelector('.shopRenovate');  //刷新按钮
		var shopX = document.querySelector('.shopX');  //关闭按钮
		var shopParent = document.getElementById('shop-parent');  //父级盒子
		
		var shopCover = document.getElementById('shop-cover');   //弹框
		// var shopCovX = document.querySelector('.shop-covX');
		// var shopCovTop = document.getElementsByClassName('shop-covTop');
		
		var shopTopImg1 = document.getElementById('shop-top-img1');
		var shopBox = document.getElementById('shop-box');    //商品界面
		var shopSpan = document.getElementById('shop-span');
		var noMoney = document.querySelector('.noMoney');
		
		//var datas = data[0].consumables;
		let timer;
		//let timer1;
		console.log(shopCover.parentNode)
		tab(1);
		function tab(p){
			var datas = data[p-1].commodity;
			let str='';
			for(var j=0; j<datas.length; j++){
				str += `<li>
							<h3>${datas[j].name}</h3>
							<img class="shop-cd" src="js/${datas[j].img}" width="100"/>
							<span><img class="shop-mny" src="img/shop1-mny.png" width="26"/><i>${datas[j].price}</i></span>
						</li>`;
			}
			shopBox.innerHTML = str;
			for(var k=0; k<shopNavLi.length; k++){
				shopNavLi[k].style.background = '#8d8a85';
				shopNavLi[k].style.color = '#fff';
			}
			shopNavLi[p-1].style.background = '#fff';
			shopNavLi[p-1].style.color = '#78512a';		
			
			var shopBoxLi = shopBox.children;
			for(let i=0; i<shopBoxLi.length; i++){
				shopBoxLi[i].onmousedown=function(){            //鼠标点击商品缩放
					this.style.transform='scale(0.9)';
				}
				shopBoxLi[i].onmouseup=function(){
					this.style.transform='scale(1)';
					
					if(Number(shopSpan.innerText) < Number(datas[i].price)){
						noMoney.style.display='block';
						timer = setTimeout(function(){
							noMoney.style.display='none';
						},1000);
					}else{
						shopCover.style.display = 'block';
						tanCov(datas[i]);
					}					
				}
			}	
		}
		
		//点击左侧商店
		for(var i=0; i<shopNavLi.length; i++){
			//shopNavLi[i].index = i;
			shopNavLi[i].onclick = function(){
				tab(this.dataset.index);
			}
		}
		
		//弹出框的样式
		function tanCov(obj){
		//	console.log(obj)
			shopCover.innerHTML = '';
			shopCover.innerHTML = `<div class="shop-covBox">
										<div class="shop-covTop">
											<img class="shop-covX" src="img/close.png" width="70"/>
										</div>
										<div class="shop-covCont">
											<div class="shop-covCont-t clear">
												<img src="js/${obj.img}" width="80"/>
												<dl>
													<dt>${obj.name}</dt>
													<dd>已拥有0件</dd>
												</dl>
											</div>
											<div class="shop-covCont-c">
												${obj.text}
											</div>
											<div class="shop-covCont-b">
												<div class="left">兑换<span>1</span>件</div>
												<div class="right"><img src="img/shop7-mny.png" width="30px"/><span>${obj.price}</span></div>
											</div>
											<img class="shop-covBtn" src="img/shop-covBtn.png" width="130"/>
										</div>
									</div>
								`

            	var shopCovX = document.querySelector('.shop-covX');
            	shopCovX.onclick = function () {

					shopCover.style.display='none';
				}
		}
		//弹窗关闭按钮
		// function closedY(){
		// 	shopCover.style.display='none';
		// }


		//关闭按钮 
		shopX.onmousedown = function(){
			this.style.width = '74px';
		}
		shopX.onmouseup = function(){       
			this.style.width = '76px';		
			shopParent.classList.add('allHidden');
			mainMenuBgd.classList.remove('allHidden');
//			mainMenu.classList.remove('allHidden');
//			moneyEntrepot.classList.remove('allHidden');
			finish();
			allBgd.classList.add('allHidden');
		}
		//点击刷新按钮
		shopRenovate.onmousedown = function(){
			this.style.transform = 'scale(0.95)'
		}	
		shopRenovate.onmouseup = function(){
			this.style.transform = 'scale(1)'
		}
		
	
	}
	
//	学习机
	three()
	function three(){
		var learnCover = document.getElementById('learn-cover');
		var learnCovBtn = document.getElementById('learn-covBtn');
		var cancel = document.getElementById('cancel');  //弹窗的取消按钮
		var sure = document.getElementById('sure');  //弹窗的确定按钮
		
		var learnBgd = document.getElementById('learn-bgd');
		var x1 = document.getElementById('x1'); //关闭按钮
		
		learnCovBtn.onclick = function(){
			learnCover.style.display = 'block';
		}
		cancel.onclick = function(){
			learnCover.style.display = 'none';
		}
		sure.onclick = function(){
			learnCover.style.display = 'none';
		}
		
		//关闭按钮
		x1.onmousedown = function(){
			this.style.transform = 'scale(0.9)';
		}
		x1.onmouseup = function(){
			this.style.transform = 'scale(1)';
			learnBgd.classList.add('allHidden');
			mainMenuBgd.classList.remove('allHidden');
//			mainMenu.classList.remove('allHidden');
//			moneyEntrepot.classList.remove('allHidden');
			finish();
			allBgd.classList.add('allHidden');
		}
	}
	
/*************************************封装函数方法***********************************************/	
	
	function scroll(option){

        //如果用户没有传obj 就默认为document
        if(option.obj==null){
            option.obj = document;
        }

        option.obj.onmousewheel = function(ev){
            if(ev.wheelDelta>0){
                if(option.up!=null){
                    option.up(ev);
                }
            }

            if(ev.wheelDelta<0){
                if(option.down!=null){
                    option.down(ev);
                }

            }
            //阻止默认行为
            return false;
        };

        option.obj.addEventListener('DOMMouseScroll',function(ev){
            if(ev.detail<0){
                console.log('向上滚动111111111');
                if(option.up!=null){
                    option.up(ev);
                }
            }
            if(ev.detail>0){
                console.log('向下滚动11111111');
                if(option.down!=null){
                    option.down(ev);
                }
            }
            //阻止默认行为
            ev.preventDefault();

        },false)

    }
	
	//上下方向拖拽效果
	function moveAnim(obj,toplimit,bottomlimit){
		obj.onmousedown = function(ev){
			
			var downY=ev.pageY;
			var stepTop=obj.offsetTop;
			document.onmousemove = function(ev){
				var moveY=ev.pageY;
				var objTop=obj.offsetTop;
				
				if(moveY>downY){
//					console.log(objTop)
					if(objTop>=toplimit){
						document.onmouseup = function(){
							document.onmousemove = document.onmousemove = null;
							setTimeout(function(){
								obj.style.top=toplimit+'px';
							})
						}
					}
				}else{
//					console.log(objTop)
					if(objTop<=bottomlimit){
						document.onmouseup = function(){
							document.onmousemove = document.onmousemove = null;
							setTimeout(function(){
								obj.style.top=bottomlimit+'px';
							})
						}
					}
				}	
				obj.style.top=-(downY-moveY)+stepTop+'px';
				return false;	
				
			}
			document.onmouseup = function(ev){
				document.onmousemove = document.onmousemove = null;
				
			}
			ev.cancelBubble=true;
		}
	}
}
