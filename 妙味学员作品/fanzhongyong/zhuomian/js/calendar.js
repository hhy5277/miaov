var tmCalender = function(options,callback){
		this.id= options.id;
		this.dates = new Date();
		this.year = this.dates.getFullYear();//年
		this.mouth = this.dates.getMonth();//月
		this.day = this.dates.getDate();
		this.defaults = {    //默认参数
			id : "calendar"//id
		};
		this.opts = extend(this.defaults,options);
		this.weeks = tmCalender.WEEKS;
		this.maxDay = tmCalender.MAXDAY;
		this.callback = callback;
	}
	
	//定义常量
	tmCalender.WEEKS = ["日","一","二","三","四","五","六"];
	tmCalender.MAXDAY = 42;
	tmCalender.prototype = {
		consturctor : tmCalender,
		init : function(options){//初始化日历
			this.createHears(this.year,this.mouth);
		},
		createHears: function(year,mouth){//创建头部，并初始化日历体
			var _this = this;
			var $calc = $(_this.id);
			var htmls = "<ul>";
			for(var arr in _this.weeks){
				htmls += "<li>"+_this.weeks[arr]+"</li>";
			}
			htmls += "</ul>";
			htmls = this.timerTemp() + this.toolBars() + htmls + this.datePanel() + this.allMonthList() + _this.allYearList(year);
			$calc.innerHTML = htmls;
			_this.setCalendar($calc,year,mouth);
			_this.nextEvent($calc);
			_this.prevEvent($calc);
			_this.setCurrentTimes(function(h,m,s,ymd,d){
				_this.btnCollents($calc).datetTimer.innerHTML = "<span>"+h+":"+m+":"+s+"</span><p>"+ymd+",星期"+d +"</p>";
			});
			var YMs = $calc.querySelector("#YMs");
			YMs.setAttribute("changeids","0");
			_this.changeMonth($calc);
		},
		
		prevEvent : function(dom){//切换到上个月
			var _this = this;
			var btnsCol = _this.btnCollents(dom);
			var prevBtn = btnsCol.prevBtn;
			prevBtn.onclick = function(){
				_this.triggerPrev(dom);
			};
		},
		
		nextEvent : function(dom){//切换到下个月
			var _this = this;
			var btnsCol = _this.btnCollents(dom);
			var nextBtn = btnsCol.nextBtn;
			nextBtn.onclick = function(){
				_this.triggerNext(dom);
			};
		},
		
		triggerPrev : function(dom){ //上一个的初始化方法
			var _this = this;
			_this.mouth --;
			if(_this.mouth<0){
				_this.mouth = 11;
				_this.year --;
			}
			_this.setYearMouth(dom,_this.year,_this.mouth);
			btnsCol = _this.btnCollents(dom);
			var panel = btnsCol.calcPanel;
			var childs1 = btnsCol.calcChilds1;
			var childs2 = btnsCol.calcChilds2;
			childs2.innerHTML = _this.createCalc(_this.year,_this.mouth);
			panel.appendChild(childs1);
			panel.style.left = "-315px";
			mTween(panel, {left:0}, 500, "linear");
			_this.clickevent(dom);
		},
		
		triggerNext: function(dom){ //下一个的初始化方法
			var _this = this;
			_this.mouth ++;
				if(_this.mouth>=12){
					_this.mouth = 0;
					_this.year ++;
				}
				_this.setYearMouth(dom,_this.year,_this.mouth);
				btnsCol = _this.btnCollents(dom);
				var panel = btnsCol.calcPanel;
				var childs1 = btnsCol.calcChilds1;
				var childs2 = btnsCol.calcChilds2;
				mTween(panel, {left:-315}, 500, "linear",function(){
					panel.appendChild(childs1);
					var childs2 = panel.querySelectorAll("div")[1];
					childs2.innerHTML = _this.createCalc(_this.year,_this.mouth+1);
					panel.style.left = 0;
				});
				_this.clickevent(dom);
		},
		
		clickevent : function(dom){ //选中日期对应的天数，并返回所需的值
			var _this = this;
			var  calcChilds1 = _this.btnCollents(dom).calcChilds1;
			var  calcChilds2 = _this.btnCollents(dom).calcChilds2;
			var currDate = calcChilds1.querySelectorAll("span.currDate");
			var currDateNext = calcChilds2.querySelectorAll("span.currDate");
			var nextDate = calcChilds1.querySelectorAll("span.nextDate");
			var nextDate2 = calcChilds2.querySelectorAll("span.nextDate");
			var pervDate = calcChilds1.querySelectorAll("span.lastDate");
			var pervDate2 = calcChilds2.querySelectorAll("span.lastDate");
			var YMs = dom.querySelectorAll("#YMs")[0];
			
			currChanges(currDate);
			currChanges(currDateNext);
			dateChanges(nextDate,true);
			dateChanges(nextDate2,true);
			dateChanges(pervDate,false);
			dateChanges(pervDate2,false);
			
			//选中当前月的日期
			function currChanges(obj){
				for(var i=0;i<obj.length;i++){
					obj[i].index = i;
					obj[i].onclick = function(){
						var dates = new Date();
						for(var i=0;i<obj.length;i++){
							obj[i].className = "currDate";
						}
						obj[this.index].className = "currDate active";
						if(_this.callback){//返回对应的需要值
							_this.callback.call(_this,YMs.innerHTML,_this.formDate(this.index+1));
						}
					};
				}
			}
			
			/*
			 * 功能 ： 选中上一个月或下一个月的日期，并切换到选中日期的对应月份
			 *   dateChanges(obj,flag)
			 * 		flag:
			 * 			true : 下一个月的日期
			 * 			false ： 上一个月的日期
			 * 
			*/
			
			function dateChanges(obj,flag){
				for(var i=0;i<obj.length;i++){
					obj[i].onclick = function(){
						if(flag){
							 calcChilds1 = _this.btnCollents(dom).calcChilds1;
							 calcChilds2 = _this.btnCollents(dom).calcChilds2;
							 var childs = calcChilds1.querySelectorAll("span.nextDate");
							 var childs2 = calcChilds2.querySelectorAll("span.currDate");
							 var thisHtml = this.innerHTML;
							 _this.triggerNext(dom);//切换日历到下一个月
							 
							 //选中下一个月中对应的天数【该天数是在切换前选中的，所以切换日历后也对应选中】
							 for(var i=0;i<childs2.length;i++){
							 	childs2[i].className = "currDate";
							 }
							 for(var i=0;i<childs.length;i++){
							 	if(thisHtml == childs2[i].innerHTML){
							 		childs2[i].className = "currDate active"
							 	}
							 }
							 if(_this.callback){//返回对应的需要值
								_this.callback.call(_this,YMs.innerHTML,_this.formDate(thisHtml));
							}
							 
						}else{
							_this.triggerPrev(dom);//切换日历到上一个月
							 calcChilds1 = _this.btnCollents(dom).calcChilds1;
							 var childs2 = calcChilds1.querySelectorAll("span.currDate");
							 var thisHtml = this.innerHTML;
							for(var i=0;i<childs2.length;i++){
							 	childs2[i].className = "currDate";
							 }
							 for(var i=0;i<childs2.length;i++){
							 	if(thisHtml == childs2[i].innerHTML){
							 		childs2[i].className = "currDate active"
							 	}
							 }
							if(_this.callback){//返回对应的需要值
								_this.callback.call(_this,YMs.innerHTML,_this.formDate(thisHtml));
							}
						}
					};
				}
			}
		},
		
		btnCollents : function(dom){//操作按钮集合
			var nextBtn = dom.querySelectorAll("a.next")[0];
			var prevBtn = dom.querySelectorAll("a.prev")[0];
			var calcPanel = dom.querySelectorAll("div#panel")[0];
			var calcChilds1 = calcPanel.querySelectorAll("div")[0];
			var calcChilds2 = calcPanel.querySelectorAll("div")[1];
			var datetTimer = dom.querySelectorAll("#datetTimer")[0];
			return {
				nextBtn : nextBtn,
				prevBtn : prevBtn,
				calcPanel : calcPanel,
				calcChilds1 : calcChilds1,
				calcChilds2 : calcChilds2,
				datetTimer :datetTimer
			};
		},
		
		changeMonth : function(dom){//修改年、月份
			var _this = this;
			var YMs = dom.querySelectorAll("#YMs")[0];
			var allMonthList = dom.querySelectorAll("#allMonthList")[0];
			var yearLists = dom.querySelectorAll("#yearsLists")[0];
			var monthSpan = allMonthList.querySelectorAll("span");
			var yearSpan = yearLists.querySelectorAll("span");
			var panel = _this.btnCollents(dom).calcPanel;
			YMs.onclick = function(){
				var changeid = parseInt(YMs.getAttribute("changeids"));
				changeid ++;
				if(changeid==1){
					YMs.innerHTML = YMs.innerHTML.substring(0,4);
					yearLists.style.transform = "scale(0)";
					mTween(panel, {opacity : 0}, 500, "linear",function(){
					//	allMonthList.style.display = "block";
						allMonthList.style.transform = "scale(1)";
					});
					YMs.setAttribute("changeids",changeid);
				}else{
					YMs.setAttribute("changeids",0);
					allMonthList.style.transform = "scale(0)";
					setTimeout(function(){
						yearLists.style.transform = "scale(1)";
					},500);
				}
			};
			//选择天
			for(var i=0;i<monthSpan.length;i++){
				monthSpan[i].onclick = function(){
					allMonthList.style.transform = "scale(0)";
					_this.mouth = parseInt(this.innerHTML) - 1;
					var childs1 = _this.btnCollents(dom).calcChilds1;
					var childs2 = _this.btnCollents(dom).calcChilds2;
					childs1.innerHTML = _this.createCalc(_this.year,_this.mouth);
					childs2.innerHTML = _this.createCalc(_this.year,_this.mouth+1);
					YMs.innerHTML = _this.year + "年" + _this.formDate(this.innerHTML);
					setTimeout(function(){
						mTween(panel, {opacity : 1}, 1000, "linear");
					},500);
					_this.clickevent(dom);
					YMs.setAttribute("changeids",0);
				};
			};
			
			//选中年
			for(var i=0;i<yearSpan.length;i++){
				yearSpan[i].onclick = function(){
					yearLists.style.transform = "scale(0)";
					var nowyear = this.innerHTML;
					YMs.setAttribute("changeids",0);
					_this.year = parseInt(this.innerHTML);
					var childs1 = _this.btnCollents(dom).calcChilds1;
					var childs2 = _this.btnCollents(dom).calcChilds2;
					childs1.innerHTML = _this.createCalc(_this.year,_this.mouth);
					childs2.innerHTML = _this.createCalc(_this.year,_this.mouth+1);
					setTimeout(function(){
						allMonthList.style.transform = "scale(1)";
					},500);
					_this.clickevent(dom);
				};
			}
		},
		
		setCurrentTimes : function(callback){//设置当前动态时间
			var _this = this;
			setInterval(function(){
				inittime();
			},1000);
			function inittime(){
				var date = new Date();
				var hour = _this.formDate(date.getHours());//时
				var min = _this.formDate(date.getMinutes());//分
				var sec = _this.formDate(date.getSeconds());//秒
				var ymd = _this.formDate(date.getFullYear())+"年"+_this.formDate(date.getMonth()+1) + "月" + _this.formDate(date.getDate()) + "日";
				var date = _this.getCommentWeek(date);
				if(callback)callback.call(new Date(),hour,min,sec,ymd,date);
			}
		},
		
		setYearMouth : function(dom,year,mouth){//设置日期
			var YMs = dom.querySelectorAll("#YMs")[0];
			YMs.innerHTML = year + "年" + this.formDate(mouth+1) +"月";
		},
		
		setCalendar:function(dom,year,mouth){//初始化日历列表
			var parents = dom.querySelectorAll("div#panel")[0];
			var childs = parents.querySelectorAll("div");
			var nowMouthHtmls = this.createCalc(year,mouth);
			var nextMouthHtmls = this.createCalc(year,mouth+1);
			childs[0].innerHTML = nowMouthHtmls;
			childs[1].innerHTML = nextMouthHtmls;
			this.clickevent(dom);
		},
		
		createCalc : function(year,mouth){//创建日历
			var _this = this;
			var dates = new Date();
			var nowMouthDay = _this.getMouthLastDay(year,mouth+1);//当月的天数
			var lastMouthDay = _this.getMouthLastDay(year,mouth);//上个月的天数
			var week = _this.getFirstDayWeek(year,mouth) == 0 ? 7 : _this.getFirstDayWeek(year,mouth);//当月1号是周几
			var nextMouth = 0;			
			var spanList = "";
			for(var i=0;i<_this.maxDay;i++){
				if(i<week){
					spanList =  "<span class='lastDate otherDates'>"+(lastMouthDay--)+"</span>" + spanList;
				}else if(i>=(nowMouthDay+week)){//下个月
					spanList += "<span class='nextDate otherDates'>"+(++nextMouth)+"</span>";
				}else{
					if(mouth==dates.getMonth() && year == dates.getFullYear()){
						var cur = (i-week+1) == dates.getDate() ? "active" : "";
						spanList +="<span class='currDate "+cur+"'>"+(i-week+1)+"</span>";
					}else{
						var cur = (i-week+1)==1 ? "otherDayActive" : "";
						spanList +="<span class='currDate "+cur+"'>"+(i-week+1)+"</span>";
					}
				}
			}
			return spanList;
		},
		getMouthLastDay : function(year,mouth){//获取上个月的最后一天
			return new Date(year,mouth,0).getDate();
		},
		getFirstDayWeek : function(year,mouth){//获取每个月的第一天是星期几
			return new Date(year,mouth,1).getDay();
		},
		getCommentWeek : function(dates){
			var data = new Date(dates.getFullYear(),dates.getMonth(),dates.getDate()).getDay();
			return ["日","一","二","三","四","五","六"][data];
		},
		toolBars : function (){//工具条模板
			var _this = this;
			var year = parseInt(_this.formDate(_this.year));
			var mouth = _this.formDate(parseInt(_this.mouth)+1);
			var tbs = "<div class='toolerBar'>"+
					"		<span class='YMs' id='YMs'>"+year+"年"+mouth+"月</span>"+
					"		<div class='changeCalendar'>"+
					"			<a href='javascript:void(0)' class='prev' id='prev' title='prev'><</a>"+
					"			<a href='javascript:void(0)' class='next' id='next' title='next'>></a>"+
					"		</div>"+
					"</div>";
			return tbs;
		},
		
		datePanel : function(){//日历模板列表模板
			var dateLists = "<div class='panel' id='panel'>"+
						"	<div class='dateLists'>"+
						"	</div>"+
						"	<div class='dateLists'>"+
						"	</div>"+
						"</div>";
			return dateLists; 
		},
		
		timerTemp : function(){//动态时间模板
			var dates = new Date();
			var h = this.formDate(dates.getHours());
			var m = this.formDate(dates.getMinutes());
			var s = this.formDate(dates.getHours());
			var day = this.getCommentWeek(dates);
			var yms = this.formDate(dates.getFullYear())+"年"+this.formDate(dates.getMonth()+1) + "月" + this.formDate(dates.getDate()) + "日";
			var timerTepm = "<div class='datetTimer' id='datetTimer'><span>"+h+":"+m+":"+s+"</span><p>"+yms +",星期"+day+"</p></div>";
			return timerTepm;
		},
		
		allMonthList : function(){//所有月份列表
			var monthList = "<div class='allMonthList' id='allMonthList'>";
			for(var i=1;i<=12;i++){
				monthList += "<span>"+i+"月</span>";
			}
			monthList += "</div>";
			return monthList;
		},
		
		allYearList : function(year){//年份
			var yearTemp = "<div class='yearsLists' id='yearsLists'>";
			for(var i = year-5; i<year+7;i++){
				yearTemp += "<span>"+i+"</span>";
			}
			yearTemp += "</div>";
			return yearTemp;
		},
		
		formDate : function(date){//格式化数字
			return date < 10 ? "0"+date : date;
		}
	};
	function $(id){
		return document.getElementById(id);
	};
	//简单混入
	function extend(obj1,obj2){
		for(var attr in obj2){
			obj1[attr] = obj2[attr];
		}
		return obj1;
	}