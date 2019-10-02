(function(){
	var myMusic = (function(){
		
		var music = function(){
			//音频文件接口：用来监听音乐的播放
			window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;
			
			//请求动画帧
			window.requestAnimationFrame = window.requestAnimationFrame ||
									window.webkitRequestAnimationFrame || 
								window.mozRequestAnimationFrame || 
								window.msRequestAnimationFrame;
			
			var $audio = $("audio");
			var playBtn = $("play");
			var search = $("search");
			var prev = $("prev");
			var next = $("next");
			var slists = $("s-lists");
			var $songs = slists.getElementsByTagName("li");
			var mark = true;
			var n = 0;
			
			//快进
			var wp_processBar = $("wp_processBar");
			var wp_processBtn = $("wp_processBtn");
			var wp_playTime = $("wp_playTime");
			var wp_process = $("wp_process");
			var totalTime = $("totalTime");
			var txt = data[0].lrc;//保存歌词
			var lrcCon = $("lrcCon");
			
			//音量控制
			var vol_btn = $("vol-btn");
			var vol_bar = $("vol-bar");
			var vol_process = $("vol-process");
			var volume_mute = $("volume-mute");
			
			var jsons = {
				init : function(){ //初始化
					slists.innerHTML = jsons.templateLists(data);
					jsons.playMusic();
					jsons.searchMusic();
					this.analyserMus();
				},
				
				playMusic : function(){ //播放音乐
					var _this = this;
					//播放、暂停
					playBtn.onclick = function(){
						if(mark){
							$audio.play();
							_this.clearOtherStyle(n);
							this.classList.add("play");
						}else{
							$audio.pause();
							this.classList.remove("play");
						}
						mark = !mark;
						totalTime.innerHTML = time($audio.duration);
					};
					
					//上一曲:
					prev.onclick = function(){
						n--;
						if(n<0)n = data.length-1;	
						_this.playing(n);
					}
					
					//下一曲
					next.onclick = function(){
						n++;
						if(n > data.length-1) n=0;	
						_this.playing(n);
					}
					// 点击播放
					_this.clickLists();
					
					//播放完成自动跳转
					$audio.addEventListener("ended",function(){
						n++;
						if(n > data.length-1) n=0;	
						_this.playing(n);
					},false);
					
					//当前播放时间
					$audio.addEventListener("timeupdate",function(){
						nowTime();
					});
					
					//关闭搜索列表
					$("packupLists").onclick = function(){
						$("searchLists").style.height = "0px";
					}
					
					//快进
					wp_processBtn.onmousedown = function(ev){
						var ev = ev || window.event;
						var x = ev.clientX - this.offsetLeft;
						document.onmousemove = function(ev){
							var _left = ev.clientX - x;
							if (_left <= 0){
								_left = 0;
							}
							if(_left >= wp_process.offsetWidth-wp_processBtn.offsetWidth){
								_left = wp_process.offsetWidth-wp_processBtn.offsetWidth;
							}
							wp_processBtn.style.left = _left + "px";
							wp_processBar.style.width = _left + "px";
							var proN = _left/(wp_process.offsetWidth-wp_processBtn.offsetWidth);
							$audio.currentTime = proN*$audio.duration;
							nowTime();
						}
						document.onmouseup = function(){
							document.onmousemove = null;
							document.onmouseup = null;
						}
						return false;
					}
					
					//音量控制
					vol_btn.onmousedown = function(ev){
						var ev = ev || window.event;
						var x = ev.clientX - this.offsetLeft;
						document.onmousemove = function(ev){
							var w = ev.clientX - x;
							if (w <= 0){
								w = 0;
							}
							if(w >= vol_process.offsetWidth-vol_btn.offsetWidth){
								w = vol_process.offsetWidth-vol_btn.offsetWidth;
							}
							vol_bar.style.width = w + "px";
							vol_btn.style.left = w + "px";
							var proN = w/(vol_process.offsetWidth-vol_btn.offsetWidth);
							$audio.volume = proN;
							nowTime();
						}
						document.onmouseup = function(){
							document.onmousemove = null;
							document.onmouseup = null;
						}
						return false;
					}
					
					//静音
					volume_mute.onclick = function(){
						$audio.volume = 0;
						vol_bar.style.width = 0;
						vol_btn.style.left = 0;
					};
					
					//设置时间
					function nowTime(){
						wp_playTime.innerHTML = time(audio.currentTime);
						var n = $audio.currentTime/$audio.duration;
						wp_processBtn.style.left = n*(wp_process.offsetWidth-wp_processBtn.offsetWidth)+"px";
						wp_processBar.style.width = n*(wp_process.offsetWidth-wp_processBtn.offsetWidth)+"px";
					}
					//歌词同步
					_this.currentLrc();
				},
				
				//点击列表播放
				clickLists : function(){
					//点击列表播放
					var _this = this;
					var $songs = $("s-lists").getElementsByTagName("li");
					for(var i=0;i<$songs.length;i++){
						(function(index){
							$songs[index].onclick = function(){
								n = index;
								_this.playing(n);
							}
						})(i);
					}
					/*$("s-lists").onclick = function(ev){ 委托方式，没必要
						var ev = ev || window.event;
						console.log(ev);
						if(ev.target.nodeName.toLocaleLowerCase() === "a"){
							console.log(ev.target.parentNode);
						}
					};*/
				},
				
				//播放总方法
				playing:function(n){
					this.clearOtherStyle(n); //清楚选中列表的样式
					$audio.src = data[n].src; //获取播放url
					txt = data[n].lrc; //获取歌词
					playBtn.classList.add("play");
					mark = false;
					this.currentLrc(); //歌词同步 初始化
					$audio.play(); //播放
					this.load(); //加载 监听
				},
				//监听歌曲是否完成
				load:function (){
					$audio.addEventListener("canplay",function(){
						totalTime.innerHTML = time(audio.duration);
					},false);
				},
				//清除样式
				clearOtherStyle : function (n){
					for(var i = 0;i<$songs.length;i++){
						$songs[i].classList.remove("active");
					}
					$songs[n].classList.add("active");
				},
				//歌词同步
				currentLrc : function(){
					var lrcArr = txt.split("[");
					//console.log(lrcArr);
					var html = '';
					for (var i=0;i < lrcArr.length ;i++ )
					{
						var arr = lrcArr[i].split("]");
						//console.log(arr);
						var time = arr[0].split(".");
						var timer = time[0].split(":");
						//console.log(timer);
						var ms = timer[0]*60 + timer[1]*1;//将时间转换为秒
						//console.log(ms);
						var text = arr[1];//歌词内容
						if (text){
							html += "<p id=gc"+ms+">"+text+"</p>"
						}
						lrcCon.innerHTML = html;
					}
					var sum = 0;
					var curTime = 0;
					var oP= lrcCon.getElementsByTagName("p");
					for(var i=0;i<oP.length;i++){
						oP[i].style.display = 'none';
					}
					$audio.addEventListener("timeupdate",function(){
						curTime = parseInt(this.currentTime);//获取当前播放的时间
						if (document.getElementById("gc"+curTime)){	
							for (var i=0;i<oP.length ;i++  ){
								oP[i].style.display = "none";
							}
							document.getElementById("gc"+curTime).style.display = "block";
						}
					});
				},
				
				//音乐搜索
				searchMusic : function(){ 
					var _this = this;
					var curr = 1; //默认显示第一页数据
					search.onclick = searchSong; //点击搜索按钮搜索
					//回车键搜索
					document.body.onkeydown = function(ev){
						var ev = ev || window.event;
						if(ev.keyCode === 13){
							searchSong();
						};
					}
					
					function searchSong(){
						var searchVal = $("searchInput").value;
						var slDetails = $("sl-details");
						if(searchVal.trim() == "")return false;
						$("searchInput").value = "";
						dome(curr);
						function dome(curr){
							console.log("jinlai");
							jsonp({
								url :"http://so.ard.iyyin.com/s/song_with_out",
								data : {
									q : searchVal,
									page : curr || 1,
									size:10
								},//请求的值
								callback : "callback",//回调函数名字【默认callback】
								success : function(data){ //成功执行回调
									if(data.code === 1){
										var html = "";
										var toall = parseInt(data.pages/10); //页数
										var datas = data.data; //获取当前所需数据
										/*
										 	//模板库调用方法
											var html = template("text",datas);
											slDetails.innerHTML = html;
										*/
										for(var i=0;i<datas.length;i++){
											var song_name = datas[i].song_name ? datas[i].song_name : "无";
											var singer_name = datas[i].singer_name ? datas[i].singer_name : "无";
											var album_name = datas[i].album_name ? datas[i].album_name : "无";
											var duration = "";
											var typeDescription = "";
											if(datas[i].url_list[1]){
												duration = datas[i].url_list[1].duration ? datas[i].url_list[1].duration : "无";
												typeDescription = datas[i].url_list[1].typeDescription ? datas[i].url_list[1].typeDescription : "无";
											}else{
												continue;
											}
											html += '<li data-url="'+datas[i].url_list[1].url+'" data-songId="'+datas[i].song_id+'" data-songName = "'+song_name+'" data-songerName = "'+singer_name+'">'+
													'	<a href="javascript:;">'+singer_name +'</a>'+
													'	<a href="javascript:;">'+song_name+'</a>'+
													'	<a href="javascript:;">'+album_name+'</a>'+
													'	<a href="javascript:;">'+duration+'</a>'+
													'	<a href="javascript:;">'+typeDescription+'</a>'+
													'</li>';
										}
										slDetails.innerHTML = html;  //设置搜索列表
										$("searchLists").style.display = "block";
										$("searchLists").style.height = "100%";
										_this.getLyrics(); //获取在线歌词
										
										//初始化分页
										 laypage({ 
									      cont: 'pagesbox', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
									      pages: toall, //通过后台拿到的总页数
									      curr: curr || 1, //当前页
									      jump: function(obj, first){ //触发分页后的回调
									        if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
									          dome(obj.curr);
									        }
									      },
									      groups : 5 // 连续显示的页数
									    });
									}else{
										alert("获取列表失败");
									}
								},//成功回调方法
								fail : function(){
									alert("网络失败！");
								}//失败回调
							});
						}
					}
				},
				//点击搜索列表 播放歌曲+获取歌词：
				getLyrics : function(){
					var _this = this;
					var $lis = $("sl-details").getElementsByTagName("li");
					for(var i=0;i<$lis.length;i++){
						(function(index){
							$lis[index].onclick = function(){
								var songUrl = this.dataset.url;
								var songId = this.dataset.songid;
								var songName = this.dataset.songname;
								var songerName = this.dataset.songername;
								getLy(songerName,songName,songId,songUrl);
							};
						})(i);
					}
					
					//获取歌词
					function getLy(songerName,songName,songId,src){
						jsonp({
							url :"http://lp.music.ttpod.com/lrc/down",
							data : {
								lrcid : "",
								artist : songerName,
								title : songName,
								song_id : songId
							},//请求的值
							callback : "callback",//回调的名字【默认callback】
							success : function(datas){
								if(datas.code === 1){
									data.push({
										"name" : songName,
										"singer" : songerName,
										"src" : src,
										"lrc" : datas.data.lrc
									});
									var len = data.length;
									var newD = data[len-1]; //获取最后一条数据信息
									n = len-1; //更新
									//创建默认列表
									var $li = document.createElement("li");
									var $a = document.createElement("a");
									$li.className = "active";
									$a.href = "javascript:void(0)";
									$a.innerHTML = newD.name;
									$li.appendChild($a);
									var allLi = $("s-lists").getElementsByTagName("li");
									for(var i=0;i<allLi.length;i++){
										allLi[i].classList.remove("active");
									}
									$("s-lists").appendChild($li);
									
									_this.clickLists(); //重新初始化点击播放
									$("countNum").innerHTML = len;
									$audio.src = newD.src;
									txt = newD.lrc;
									playBtn.classList.add("play");
									mark = false;
									_this.currentLrc();
									$audio.play();
									_this.load();
								}else{
									alert("获取播放地址失败");
								}
							}
						});
					}
				},
				
				//音频节点分析,并创建canvas音频
				analyserMus : function(){ 
					var actx = new AudioContext(); //创建一个音乐对象
					// 创建一个音频节点
					var analyser = actx.createAnalyser();
					//创建音乐媒体源节点
					var audioSrc = actx.createMediaElementSource($audio);
					//将媒体源节点与分析机制链接
					audioSrc.connect(analyser);
					
					//将分析机制与目标点链接（扬声器）
					analyser.connect(actx.destination);
					var num = 100;     
					var can = $("canvasVoice");
					var cxt = can.getContext("2d");
					color = cxt.createLinearGradient(can.width*0.5,0,can.width*0.5,150);
					color.addColorStop(0,"#00f");
					color.addColorStop(0.5,"#f00");
					color.addColorStop(1,"#0f0");
					colorf = cxt.createLinearGradient(can.width*.5,150,can.width*.5,250);
					colorf.addColorStop(0,"#0f0");
					colorf.addColorStop(0.5,"#f00");
					colorf.addColorStop(1,"#00f");
					draw();
					function draw(){
						//创建一个与音乐频次等长的数组 【自动转换为0-255之间的数子】
						var voicehigh = new Uint8Array(analyser.frequencyBinCount);
						//将分析出来的音频数据添加到数组里面
						analyser.getByteFrequencyData(voicehigh);
						//console.log(voicehigh);
						var step = Math.round(voicehigh.length/num);
						cxt.clearRect(0,0,can.width,can.height);
						cxt.globalAlpha = 0.3;//透明度
						cxt.beginPath();
						for(var i=0;i<num;i++){
							var value = (voicehigh[step*i])/2;
							cxt.fillStyle = color;
							cxt.fillRect(i*10+can.width*0.5,150,7,-value+1);
							cxt.fillRect(can.width*0.5-(i-1)*10,150,7,-value+1); 
							cxt.fillStyle = colorf;       
							cxt.fillRect(i*10+can.width*0.5,150,7,value+1);
							cxt.fillRect(can.width*0.5-(i-1)*10,150,7,value+1);
						}
						cxt.closePath();
						requestAnimationFrame(draw);
					}
				},
				templateLists : function(data){ //歌曲列表模板
					var html = "";
					for(var i = 0;i<data.length;i++){
						html +=	'<li> '+
								'	<a href="javascript:void(0)">'+data[i].name+'</a>'+
								'</li>';
					}
					return html;
				}
			};
			function $(id){
				return document.getElementById(id);
			}
			String.prototype.trim=function(){ //去掉左右空格
		　　   	return this.replace(/(^\s*)|(\s*$)/g, "");
		　　 }
			//设置时间格式
			function time(cTime){
				cTime = parseInt(cTime);
				//var h = formatData(Math.floor(cTime/3600));
				var m = formatData(Math.floor(cTime%3600/60));
				var s = formatData(Math.floor(cTime%60));
				return m+":"+s;
			}
			function formatData(num){
				return num < 10 ? "0"+num : ' '+num;
			}
			return jsons.init();
		};
		return music;
	})();
	window.myMusic = myMusic; // 返回接口调用
})();
