function jsonp(jsons){
				/*
				  	实例：https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=c&cb=jQuery1474175219328
						url : https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?
						data : {wd:"值"},
						fnName : jQuery1474175219328
						callback : cb
						success : fnName()
				*/
				var settings = {
					url : "",//请求的url地址
					data : {wd:""},//请求的值
					fnName : "jquery"+new Date().getTime(),//回调方法名称[为了名称不同加时间戳，可以指定默认]
					callback : "callback",//回调的名字【默认callback】
					success : function(){},//成功回调方法
					fail : function(){}//失败回调
				}
				var toStr = Object.prototype.toString;//用来判断类型
				for(var attr in jsons){//对象的拷贝，把传进来的配置参数jsons赋值给settings
					if(toStr.call(settings[attr]) === toStr.call(jsons[attr])){ //如果类型一样 ，则赋值
						settings[attr] = jsons[attr];
					}
				}
				var oS = document.createElement("script");//创建一个script标签
				window[settings.fnName] = function(data){//设置一个全局函数【目的，传给callback调用】
					settings.success && settings.success(data);//成功回调发方法
				}
				settings.data[settings.callback] = settings.fnName;
				var arr = [];
				for(var attr in settings.data){
					arr.push(attr + '=' + settings.data[attr]);
				}
				var datas = arr.join("&");
				oS.src = settings.url+"?"+datas;
				document.getElementsByTagName("head")[0].appendChild(oS);
				document.getElementsByTagName("head")[0].removeChild(oS);//删除创建的标签
				oS.onerror = function(){
					settings.fail && settings.fail();
				}
}