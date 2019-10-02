(function(){
	var deskTimer = function(){
		var smallDate = $("smallDate");
		var	month = smallDate.querySelector(".month"),
		data = smallDate.querySelector(".day"),
		currTime = smallDate.querySelector(".time"),
		dates = smallDate.querySelector(".date"),
		week = smallDate.querySelector(".week");
		setCurrTimer();
		setInterval(setCurrTimer,1000);
		function setCurrTimer(){
			var currD = new Date();
			var year = currD.getFullYear(),
			mon = currD.getMonth()+1,
			day = currD.getDate(),
			wee = currD.getDay(),
			hours = currD.getHours(),
			min = currD.getMinutes(),
			sec = currD.getSeconds();
			month.innerHTML = formatDay(mon);
			data.innerHTML = formatData(day);
			dates.innerHTML = year + "年" + formatData(mon) + "月" + formatData(day) + "日";
			week.innerHTML = "星期"+formatDay(wee);
			currTime.innerHTML = formatData(hours) + ":" + formatData(min) + ":" + formatData(sec);
		}
	}
	function $(id){
		return document.getElementById(id);
	}
	function formatDay(num){
		switch(num){
			case 0:
				return "日";
			break;
			case 1:
				return "一";
			break;
			case 2:
				return "二";
			break;
			case 3:
				return "三";
			break;
			case 4:
				return "四";
			break;
			case 5:
				return "五";
			break;
			case 6:
				return "六";
			break;
			case 7:
				return "七";
			break;
			case 8:
				return "八";
			break;
			case 9:
				return "九";
			break;
			case 10:
				return "十";
			break;
			case 11:
				return "十一";
			break;
			case 12:
				return "十二";
			break;
		}
	}
	function formatData(num){
		return num<10 ? '0'+num : num;
	}
	deskTimer();
})();







	
	
	
	
	

