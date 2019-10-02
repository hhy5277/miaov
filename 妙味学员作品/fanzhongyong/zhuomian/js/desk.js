/*
 * @version : v1.0
 * @author  : 饭     
 * @update ：    new Date()
 * @fn : 桌面系统！
 */

(function(){
	var MyDesk = function(){
		this.menu = $("menu"); //右键菜单
		this.$menuBtn = this.menu.getElementsByTagName("li");
		this.menuList = $("menuList").getElementsByTagName("li");
		this.deskContiner = $("deskContiner");
		this.data = eval("("+localStorage.getItem("deskDate")+")") || deskData;
		this.fileNum = localStorage.getItem("fileNum") || 1;
		this.width = 0;//获取右键菜单的宽度
		this.height = 0;//获取右键菜单的高度
		this.winW = document.documentElement.clientWidth || document.body.clientWidth;//获取屏幕的宽度
		
		
		this.winH = document.documentElement.clientHeight || document.body.clientHeight;//获取屏幕的高度
	};
	
	MyDesk.prototype = {
		constructor : MyDesk,
		init : function(){ //初始化
			
			document.onkeydown = function(ev){
				var ev = ev || window.event;
				if(ev.keyCode === 9){ //屏蔽tab建，，避免bug 
					return false;
				}
			}
			this.rightMenu(); //右键菜单
			this.onMenuEvent(); //菜单事件
			
			this.initFolder(this.data);
		},
		initFolder : function(data){
			this.deskContiner.innerHTML = this.defaluteFile(data);
			//初始化桌面默认文件
			this.filoderPosition(); //初始化文件加位置
			var deskContiner = document.getElementById("deskContiner");
			var fileAll = deskContiner.querySelectorAll(".file");
			for(var i=0;i<fileAll.length;i++){
				new Drag().init({id:fileAll[i].id}); //初始化拖拽
			}
			
			this.folderFn(); //初始化 阻止文件夹操作 冒泡
			this.musicAndPhotoEvent();//初始化音乐
		},
		//右键菜单
		rightMenu : function(){
			//默认右键菜单屏蔽
			var _this = this;
			_this.width = parseInt(_this.getStyle(_this.menu,"width"))+4;
			_this.height = parseInt(_this.getStyle(_this.menu,"height"))+4;
			document.oncontextmenu = function(){return false;} //禁止右键
			_this.onEvent(_this.deskContiner,"mousedown",function(ev){ //右键菜单显示
				var ev = ev || window.event;
				var keycode = ev.button || ev.which; //获取鼠标的按键 1:左键，2/3：右键
				var maxL = _this.winW - _this.width;
				var maxT = _this.winH - _this.height;
				if(keycode === 2 || keycode === 3){
					var disX = ev.clientX || ev.pageX;//获取X轴坐标
					var disY = ev.clientY || ev.pageY;//获取Y轴坐标
					
					disX = disX >= maxL ? maxL : disX;
					disY = disY >= maxT ? maxT : disY;
					
					_this.menu.style.left = disX + "px";
					_this.menu.style.top = disY + "px";
					_this.menu.style.display = "block";
				}
				ev.stopPropagation();
			});
			_this.onEvent(_this.deskContiner,"click",function(ev){ //点击桌面隐藏右键菜单
				var ev = ev || window.event;
				ev.cancelBubble = true;
				_this.menu.style.display = "none";
			});
			_this.onEvent(window,"resize",function(){ //更新win的宽高度
				//console.log(1)
				_this.winW = document.documentElement.clientWidth || document.body.clientWidth;//获取屏幕的宽度
				_this.winH = document.documentElement.clientHeight || document.body.clientHeight;//获取屏幕的高度
				_this.filoderPosition();
			});
		},
		
		//子菜单显示位置【靠左/右显示】
		subMenuPosi : function(ev){ 
			var _this = this;
			
			//子菜单显示
			_this.trigger(_this.$menuBtn,"mouseover",false,function(index){
				var tallW = _this.menu.offsetWidth + _this.menu.offsetLeft + 104;
				var smallMenu = this.getElementsByTagName("div")[0];
				if(smallMenu){
					if(tallW >= _this.winW){
						smallMenu.classList.remove("currR");
						smallMenu.classList.add("currL");
					}else{
						smallMenu.classList.remove("currL");
						smallMenu.classList.add("currR");
					}
				}
			});
		},
		// music 
		musicAndPhotoEvent : function(){
			var _this = this;
			var music = $("music"); //音乐
			var picture = $("picture"); //照片墙
			var calendar = $("calendar");
			
			var iframeMusic = $("iframeMusic"); // iframe 音乐
			var iframephoto = $("iframephoto"); // iframe 照片
			var cdPanel = $("cdPanel"); //日历盒子
			
			
			var goBack = $("goback");
			var goBack1 = $("goback1");
			var closeBtn = cdPanel.querySelector(".closeBtn");
			
			if(music)dbEvent(music,iframeMusic,goBack);
			if(picture)dbEvent(picture,iframephoto,goBack1);
			if(calendar){
				_this.onEvent(calendar,"dblclick",function(){
					mTween(cdPanel, {bottom:0}, 300, "easeIn");
				});
			}
			_this.onEvent(closeBtn,"click",function(){
				mTween(cdPanel, {bottom:-398}, 300, "easeIn",function(){
					new tmCalender({id : "Mycalendar"}).init(); //重新初始化日历
				});
			})
			
			function dbEvent(obj,child,goback){
				_this.onEvent(obj,"dblclick",function(){
					child.style.left=0;
				});
				_this.onEvent(goback,"click",function(){
					child.style.left="100%";
				});
			}
		},
		//菜单按钮事件
		onMenuEvent : function(){
			var _this = this;
			_this.subMenuPosi(); // 子菜单位置初始化
			_this.seeTheWay();//查看方式
			_this.sorts(); //排序方式
			
			//菜单 功能
			for(var i=0;i<_this.$menuBtn.length;i++){
				(function(index){
					_this.onEvent(_this.$menuBtn[i],"click",function(ev){
						var ev = ev || window.event;
						ev.cancelBubble = true; //阻止向上冒泡
						if(index == 2 || index == 3 || index == 7){ // 新建文件，刷新
							_this.rightMenuFn(index);
							// 隐藏 右键菜单
							_this.menu.style.display = "none";
						}else{
							return false;
						}
					});
				})(i);
			}
		},
		rightMenuFn : function(index){ //右键一级菜单功能
			var _this = this;
			switch(index){
				case 2: //刷新
					 location.reload();
				break;
				case 3: //新建文件夹
					_this.createFolder();
				break;
				case 7: //清除本地存储
					localStorage.clear();
				break;
			};
		},
		
		//桌面文件上操作时，阻止冒泡
		folderFn : function(){
			var _this = this;
			var deskContiner = $("deskContiner");
			var files = deskContiner.querySelectorAll(".file");
			for(var i=0;i<files.length;i++){
				(function(index){
					_this.onEvent(files[index],"click",function(ev){
						var ev = ev || window.event;
						ev.stopPropagation(); //阻止 触发 document上的 click 事件
						_this.menu.style.display = "none";
					});
				})(i);
				
				(function(index){
					_this.onEvent(files[index],"mousedown",function(ev){
						var ev = ev || window.event;
						var keycode = ev.button || ev.which; //获取鼠标的按键 1:左键，2/3：右键
						if(keycode === 2 || keycode === 3){
							ev.cancelBubble = true; //屏蔽文件夹上点击右键出现默认右键菜单
							//alert(11);
						}
					});
				})(i);
			}
		},
		//创建文件夹
		createFolder : function(){
			//alert("新建文件夹");
			var _this = this;
			var newFiles = {
				id : new Date().getTime(),
				title : "新建文件夹"+(_this.fileNum++),
				data : "2016-10-15",
				type : "folders",
				typeId : "file" + new Date().getTime()
			};
			
			_this.data.push(newFiles);
			var str = JSON.stringify(_this.data);
			localStorage.setItem("deskDate",str);
			var fileNum = _this.fileNum;
			localStorage.setItem("fileNum",fileNum);
			
			var newFile = document.createElement("div");
			var fileIcon = document.createElement("div");
			var fileName = document.createElement("p");
			var fileId = newFiles.id;
			console.log(fileId);
			newFile.className = "file folders";
			newFile.id = fileId;
			
			fileIcon.className = "fileIcon icon";
			fileName.className = "fileName";
			fileName.innerHTML = newFiles.title;
			newFile.appendChild(fileIcon);
			newFile.appendChild(fileName);
			_this.deskContiner.appendChild(newFile);
			_this.filoderPosition();
			_this.folderFn();
			
			new Drag().init({id:fileId});
		},
		filoderPosition : function($space){
			var _this = this;
			var col = 1;//定义列
			var row = 0;//定义行
			var space = $space || 100;//默认一个图标的大小
			var position = 10;//间距
			var windowH = document.documentElement.clientHeight;//window.innerHeight;
			
			var num = parseInt(windowH / space);//一行显示的个数
			var itemdoms = _this.deskContiner.querySelectorAll(".file");
			var i = 0,len = itemdoms.length;
			
			//console.log(space)
			for(;i<len;i++){
				if(i >= num*col){ //控制列
					col ++;
					row = 0;
					//console.log(11)
				}
				//??*  在360浏览器，循环4次
				
				//console.log(row)
				mTween(
					itemdoms[i],
					{
						left:position+(space * (col-1)),
						top:position+(space *row)
					},
					300,
					"easeIn");
				row++;
			}
		},
		//查看方式
		seeTheWay : function(){
			var _this = this;
			var seeWay = $("seeWay").getElementsByTagName("a");
			_this.trigger(seeWay,"click",true,function(index){
				if(index === 0){
					_this.deskContiner.classList.remove("bigFile");
					_this.deskContiner.classList.add("smallFile");
					_this.filoderPosition(80);
				}else if(index === 1){
					_this.deskContiner.classList.remove("smallFile");
					_this.deskContiner.classList.add("bigFile");
					_this.filoderPosition(120);
				}else{
					_this.deskContiner.classList.remove("bigFile");
					_this.deskContiner.classList.remove("smallFile");
					_this.filoderPosition(100);
				}
			});
		},
		
		//排序方式
		sorts : function(){
			var _this = this;
			var sortWay = $("sorts").getElementsByTagName("a");
			var sortNum = localStorage.getItem("sortNum") || "up";
			_this.trigger(sortWay,"click",true,function(index){
				if(index === 0){
					//alert("日期排序");
					var sortData =  eval("("+localStorage.getItem("deskDate")+")") || deskData;
					for(var i=0;i<sortData.length;i++){
						sortData[i].numbers = sortData[i].data.replace(/-/g,''); 
					}
					if(sortNum === "up"){
						_this.sortSFn(sortData,"numbers",true);
						sortNum = "down";
					}else{
						_this.sortSFn(sortData,"numbers",false);
						sortNum = "up";
					}
					localStorage.setItem("sortNum",sortNum);
				}
			});
		},
		
		sortSFn : function(sortData,way,flag){
			var _this = this;
			if(flag){ //
				sortData.sort(function(a,b){
					return a[way] - b[way];
				});
			}else{
				sortData.sort(function(a,b){
					return b[way] < a[way];
				});
			}
			_this.initFolder(sortData);
			var str = JSON.stringify(sortData);
			localStorage.setItem("deskDate",str);
		},
		
		/*
			trigger : 事件绑定触发
			 	$obj : 对象，
			 	event : 事件，如click
			 	isHide : 是否隐藏右键菜单
			 	callback ： 回调函数
		*/
		trigger : function($obj,event,isHide,callback){
			var _this = this;
			for(var i=0;i<$obj.length;i++){
				(function(index){
					_this.onEvent($obj[index],event,function(){
						callback && typeof callback === "function" && callback.call(this,index);
						if(isHide)_this.menu.style.display = "none";
					});
				})(i);
			}
		},
		
		//事件监听
		onEvent:function (dom,type,callback){ //事件绑定
            if(document.addEventListener){//高版本
                dom.addEventListener(type,callback,false);
            }else if(document.attachEvent){//IE低版本
                dom.attachEvent("on"+type,callback);
            }else{//用on绑定
                dom["on"+type] = callback;
            }
        },
        
        //桌面文件
        defaluteFile : function(data){
        	var files = "";
        	for(var i=0;i<data.length;i++){
        		var fileType = data[i].type;
        		if(fileType === "folders") {
        			files += '<div class="file folders" id="'+data[i].typeId+'">'+
							'	<div class="fileIcon icon"></div>'+
							'	<p class="fileName">'+data[i].title+'</p>'+
							'</div>';
				}else{
					files += '<div class="file" id="'+data[i].typeId+'">'+
							'	<div class="icon '+data[i].type+'"></div>'+
							'	<p class="fileName">'+data[i].title+'</p>'+
							'</div>';
				}
        	}
        	return files;
        },
        //获取计算后的值
        getStyle : function(dom,attr){
			return window.getComputedStyle ? window.getComputedStyle(dom,false)[attr]:dom.currentStyle[attr];
		}
	}
	function $(id){
    	return document.getElementById(id);
   };
	window.myDesk = new MyDesk;
})();
