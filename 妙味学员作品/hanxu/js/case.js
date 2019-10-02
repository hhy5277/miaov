$("#nav").find("li").eq(5).siblings().hover(function(){
	$("#nav").find("li").eq(5).stop().animate({
		left:this.offsetLeft,
		width:this.offsetWidth
	})
},function(){
	$("#nav").find("li").eq(5).stop().animate({
		left:$("#nav").find("li").eq(1)[0].offsetLeft,
		width:$("#nav").find("li").eq(1)[0].offsetWidth
	})
	console.log($("#nav").find("li").eq(1)[0].offsetWidth)
})
$("#navAbout").find("li").eq(5).siblings().hover(function(){
	$("#navAbout").find("li").eq(5).stop().animate({
		left:this.offsetLeft,
		width:this.offsetWidth
	})
},function(){
	$("#navAbout").find("li").eq(5).stop().animate({
		left:$("#navAbout").find("li").eq(2)[0].offsetLeft,
		width:$("#navAbout").find("li").eq(2)[0].offsetWidth
	})
})


$("#navContact").find("li").eq(5).siblings().hover(function(){
	$("#navContact").find("li").eq(5).stop().animate({
		left:this.offsetLeft,
		width:this.offsetWidth
	})
},function(){
	$("#navContact").find("li").eq(5).stop().animate({
		left:$("#navContact").find("li").eq(3)[0].offsetLeft,
		width:$("#navContact").find("li").eq(3)[0].offsetWidth
	})
	console.log($("#navContact").find("li").eq(3)[0].offsetLeft)
})




$("#share").find("a").hover(function(){
	$(this).css({
		transform:"rotate(360deg)"
	})
},function(){
	$(this).css({
		transform:"rotate(0deg)"
	})
})
$("#share").find("a").eq(1).stop().hover(function(){
	$("#share").find("img").animate({
		top:30,
		opacity:1
	})
},function(){
	$("#share").find("img").stop().animate({
		top:-20,
		opacity:0
	})
})
$("#blog").hover(function(){
	$(this).css({
		background:"#5259f3",
	});
	$(this).find("a").css({
		color:"#fff"
	})
},function(){
	$(this).css({
		background:"#6d74ff",		
	});
	$(this).find("a").css({
		color:"#fff"
	})
})



$(".innerText>div").css({
	width:window.innerWidth
})
$(".innerText").css({
	width:window.innerWidth*3
})
$(".innerImg>div").css({
	width:window.innerWidth
})
$(".innerImg").css({
	width:window.innerWidth*2
})

var bgarr=["img/case/b1.jpg","img/case/b2.jpg","img/case/b3.jpg"];
var arr=["img/case/bb1.png","img/case/bb2.png","img/case/bb3.png"];
var n=0;
var m=0;
var a=0;
setInterval(function(){
	m++;
	if(m>2){
		m=0
	};
	$(".bg").eq(m).css({
		opacity:1
	});
	$(".bg").eq(m).siblings(".bg").css({
		opacity:0
	});
	$("#img0").find("img").attr("src",arr[n])
	$(".innerImg").css({
		left:0
	});
	$("#img1").find("img").attr("src",arr[n=n<arr.length-1?++n:0]);
	$(".innerImg").animate({
		left:-window.innerWidth
	},1000);
	
},3000)

mouseScroll(document,function(o){
	if(o){
		$("#header").css({
			top:-68
		})
	}else{
		$("#header").css({
			top:0
		})
	}
})

function mouseScroll(obj,callBack){
				if(window.navigator.userAgent.toLowerCase().indexOf("chorme")){
					obj.addEventListener("mousewheel",fn)
				}
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")){
					obj.addEventListener("DOMMouseScroll",fn)
				}
				function fn(e){
					var down=true;
					if(e.wheelDelta){
						down=e.wheelDelta<0?true:false;
					}else{
						down=e.detail>0?true:false;
					}
					if(callBack && typeof callBack==="function"){
						callBack(down);
					}
				}
		}



var arrAnimation=["a",
				  "b",
				  "c",
				  "d",
				  "e"
]
var arrScale=["scale .4s cubic-bezier(0, 0, 0.71, 1.17) 0s both","scale .4s cubic-bezier(0, 0, 0.71, 1.17) .2s both","scale .4s cubic-bezier(0, 0, 0.71, 1.17) .4s both","scale .4s cubic-bezier(0, 0, 0.71, 1.17) .6s both","scale .4s cubic-bezier(0, 0, 0.71, 1.17) .8s both","scale .4s cubic-bezier(0, 0, 0.71, 1.17) 1s both","scale .4s cubic-bezier(0, 0, 0.71, 1.17) 1.2s both","scale .4s cubic-bezier(0, 0, 0.71, 1.17) 1.4s both","scale .4s cubic-bezier(0, 0, 0.71, 1.17) 1.6s both","scale .4s cubic-bezier(0, 0, 0.71, 1.17) 1.8s both"];


var arrLeft=["left .4s cubic-bezier(0, 0, 0.71, 1.17) 0s both","left .4s cubic-bezier(0, 0, 0.71, 1.17) .2s both","left .4s cubic-bezier(0, 0, 0.71, 1.17) .4s both","left .4s cubic-bezier(0, 0, 0.71, 1.17) .6s both","left .4s cubic-bezier(0, 0, 0.71, 1.17) .8s both","left .4s cubic-bezier(0, 0, 0.71, 1.17) 1s both"]
document.onmousewheel=function(e){
	if($("#cooperate")[0].getBoundingClientRect().top<window.innerHeight){
		$("#cooperate").find("li").each(function(i,e){
			$(e).addClass(arrAnimation[i])
		})
	}
	if($("#footer")[0].getBoundingClientRect().top<window.innerHeight){
		$(".container>div").each(function(i,e){
			$(e).addClass(arrAnimation[i])
		})
	}
	if($(".container1")[0].getBoundingClientRect().top<window.innerHeight-200){
		$(".childx").css({
			animation:"scale .4s cubic-bezier(0, 0, 0.71, 1.17) .4s both "
		})
	}
	if($("#ability-contents")[0].getBoundingClientRect().top<window.innerHeight-200){
		$(".ability-contents1").find("img").each(function(i,e){
			$(e).css({
				animation:arrScale[i]
			})
		})
		$(".ability-contents1").find(".child-content-title").each(function(i,e){
			$(e).css({
				animation:arrLeft[i]
			})
		})
		$(".ability-contents1").find(".child-content-info").each(function(i,e){
			$(e).css({
				animation:arrLeft[i]
			})
		})
	}
	if($("#service")[0].getBoundingClientRect().top<window.innerHeight){
		$("#service").find(".title1").css({
			animation:"topOpacity 2s"
		})
		$("#service").find(".title2").css({
			animation:"topOpacity 2s"
		})
	}
}
$(".childx").eq(0).hover(function(){
	$(".childx").eq(0).find(".msg1").css({
		transform:"translateX(40%)",
		opacity:1
	})
},function(){
	$(".childx").eq(0).find(".msg1").css({
		transform:"translateX(100%)",
		opacity:0
	})
})
$(".childx").eq(1).hover(function(){
	$(".childx").eq(1).find(".msg1").css({
		top:-100,
		opacity:1
	})
},function(){
	$(".childx").eq(1).find(".msg1").css({
		top:0,
		opacity:0
	})
})
$(".childx").eq(2).hover(function(){
	$(".childx").eq(2).find(".msg1").css({
		transform:"translateX(110%)",
		opacity:1
	})
},function(){
	$(".childx").eq(2).find(".msg1").css({
		transform:"translateX(100%)",
		opacity:0
	})
})
$(".childx").eq(3).hover(function(){
	$(".childx").eq(3).find(".msg1").css({
		top:200,
		opacity:1
	})
},function(){
	$(".childx").eq(3).find(".msg1").css({
		top:0,
		opacity:0
	})
})
$(".childx").eq(4).hover(function(){
	$(".childx").eq(4).find(".msg1").css({
		top:200,
		opacity:1
	})
},function(){
	$(".childx").eq(4).find(".msg1").css({
		top:0,
		opacity:0
	})
})
$(".childx").eq(5).hover(function(){
	$(".childx").eq(5).find(".msg1").css({
		top:200,
		opacity:1
	})
},function(){
	$(".childx").eq(5).find(".msg1").css({
		top:0,
		opacity:0
	})
})
var innerText=document.getElementById("innerText");
var x=0;
setInterval(function(){
	if(x>=3){
		x=0;
		$(".innerText").css({
			left:0
		})
	};
	x++;
	$(".innerText").animate({
		left:-x*window.innerWidth
	});
},2000)





$("#person").hover(function(){
	$("#person").css({
		background:"#d8d6ff"
	});
	$(".aBg").css({
		opacity:1
	});
	$(".tou").css({
		background:"url(img/about/people1_1.png)"
	});
	$(".shen").css({
		background:"url(img/about/people2_1.png)"
	})
},function(){
	$("#person").css({
		background:"#FFFFFF"
	});
	$(".aBg").css({
		opacity:.5
	});
	$(".tou").css({
		background:"url(img/about/people1.png)"
	});
	$(".shen").css({
		background:"url(img/about/people2.png)"
	})
})



$(".ability-child").each(function(i,e){
	$(e).hover(function(){
			$(e).find("img").css({
				left:10
			});
			$(e).find(".child-content").css({
				left:160
			})
		},function(){
			$(e).find("img").css({
				left:38
			});
			$(e).find(".child-content").css({
				left:140
			})
		})
})



$(".ability-nav").find("div").eq(0).click(function(){
	
	$(this).addClass("active").siblings().removeClass("active");
	$(".ability-contents1").css({
		display:"block"
	});
	$(".ability-contents2").css({
		display:"none"
	})
	$(".ability-contents1").find("img").each(function(i,e){
			$(e).css({
				animation:arrScale[i]
			})
		})
		$(".ability-contents1").find(".child-content-title").each(function(i,e){
			$(e).css({
				animation:arrLeft[i]
			})
		})
		$(".ability-contents1").find(".child-content-info").each(function(i,e){
			$(e).css({
				animation:arrLeft[i]
			})
		})
	$(".ability-contents2").find("img").each(function(i,e){
			$(e).css({
				animation:""
			})
		})
})
$(".ability-nav").find("div").eq(1).click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	$(".ability-contents1").css({
		display:"none"
	});
	$(".ability-contents2").css({
		display:"block"
	})
	$(".ability-contents1").find("img").each(function(i,e){
			$(e).css({
				animation:""
			})
		})
		$(".ability-contents1").find(".child-content-title").each(function(i,e){
			$(e).css({
				animation:""
			})
		})
		$(".ability-contents1").find(".child-content-info").each(function(i,e){
			$(e).css({
				animation:""
			})
		})
	$(".ability-contents2").find("img").each(function(i,e){
			$(e).css({
				animation:arrScale[i]
			})
		})
})



ScrollBG ();
function ScrollBG () {//封装一个函数  使背景图片可以随着鼠标左右晃动
		    //定义滚动背景容器变量
		    var shan = document.querySelectorAll('.shan img'),
		        //获取当前窗口的尺寸并改变其中心为原点坐标，也可以改为仅获取指定层的坐标:oUl.offsetWidth
		        x = document.body.offsetWidth/2,
		        y = document.body.offsetHeight/2;
		    //设置当前窗口内的鼠标移动事件，也可以改为仅作用于指定层:oUl.onmousemove
		    document.onmousemove = function (event) {
		        //获取鼠标在当前窗口内的坐标值，也可以改为获取指定层的坐标:event.offsetX
		        var mx = event.clientX,
		            my = event.clientY;
		        //开始为每个要动的元素设置左边距和上边距，以每个元素的不同zIndex值来区别移动
		        	shan[0].style.marginLeft=-(x-mx)/90*shan[0].style.zIndex+'px';
		        	shan[1].style.marginLeft=(x-mx)/90*shan[1].style.zIndex+'px';
		        	shan[2].style.marginLeft=-(x-mx)/90*shan[2].style.zIndex+'px';
		        	shan[3].style.marginLeft=(x-mx)/90*shan[3].style.zIndex+'px';
//		        shan.style.marginLeft=(x-mx)/90*shan.style.zIndex+'px';
//		        shan2.style.marginLeft=(x-mx)/90*shan2.style.zIndex+'px';
//		        shan3.style.marginLeft=(x-mx)/90*shan3.style.zIndex-650+'px';
		    };
		}

var arrImg=[{
	top:368,
	left:150,
	transform:"rotate(-20deg) scale(1,1)"
	},
	{
	top:400,
	left:188,
	transform:"rotate(15deg)"
	},
	{
	top:388,
	left:763,
	transform:"rotate(35deg) scale(1.2,1.2)"
	},
	{
	top:320,
	left:510,
	transform:"rotate(-20deg) scale(1.2,1.2)"
	},
	{
	top:310,
	left:520,
	transform:"rotate(30deg) scale(1,1)"
	},
	{
	top:310,
	left:620,
	transform:"rotate(18deg) scale(1,1)"
	}
];
var arrImg2=[{
	top:0,
	left:111,
	transform:"rotate(0deg) scale(1,1)"
	},
	{
	top:0,
	left:474,
	transform:"rotate(0deg) scale(1,1)"
	},
	{
	top:0,
	left:840,
	transform:"rotate(0deg) scale(1,1)"
	},
	{
	top:360,
	left:111,
	transform:"rotate(0deg) scale(1,1)"
	},
	{
	top:360,
	left:474,
	transform:"rotate(0deg) scale(1,1)"
	},
	{
	top:360,
	left:840,
	transform:"rotate(0deg) scale(1,1)"
	}
]
var timerA=0;
$('#conWrap').fullpage({
	navigation:true,
	navigationPosition:"right",
	verticalCentered:false,
	afterLoad:function(anchorLink,index){
		if(index==2){
			$("#pic").css({
				opacity:1,
				zIndex:1
			});
			$("#pic").find(".imgs").each(function(i,e){
				$(e).css({
					opacity:1,
					top:arrImg[i].top,
					left:arrImg[i].left,
					transform:arrImg[i].transform
				})
			})
			$("#phone").css({
					zIndex:2
			});
			$("#phone").animate({
				top:70,
				opacity:1
			},1000)
		};
		if(index==3){
				$("#thank").animate({
					top:120,
					opacity:1
				},1000)
			$("#pic").find(".imgs").each(function(i,e){
				$(e).css({
					opacity:1,
					top:arrImg2[i].top,
					left:arrImg2[i].left,
					transform:arrImg2[i].transform
				})
			})
		}
	},
	onLeave:function(index,nextIndex,direction){
		if(nextIndex==1){
			$("#thank").css({
					top:500,
					opacity:0,
			});
			$("#phone").css({
					top:500,
					opacity:0,
					zIndex:-1
				})
			$("#pic").css({
				opacity:0,
				zIndex:-1
			});
			$("#pic").find(".imgs").each(function(i,e){
				$(e).css({
					opacity:0,
					top:0,
					left:0,
					transform:""
				})
			})
		};
		if(nextIndex==2){
			$("#thank").css({
					top:500,
					opacity:0,
				})
			$("#pic").find(".imgs").each(function(i,e){
				$(e).css({
					opacity:1,
					top:arrImg[i].top,
					left:arrImg[i].left,
					transform:arrImg[i].transform
				})
			})
		}
		if(nextIndex==3){
			$("#pic").css({
				opacity:1,
				zIndex:1
			});
			$("#phone").css({
					top:500,
					opacity:0,
				})
			$("#pic").find(".imgs").each(function(i,e){
				$(e).css({
					opacity:1,
					top:arrImg2[i].top,
					left:arrImg2[i].left,
					transform:arrImg2[i].transform
				})
			})
		}
	}
})



$("#thank").find("p").hover(function(){
	$(this).css({
		background:"#fff",
		color:"#000"
	})
},function(){
	$(this).css({
		background:"#18181f",
		color:"#fff"
	})
})
$("#thank").find("a").hover(function(){
	$(this).css({
		transform:"rotateZ(180deg)"
	})
},function(){
	$(this).css({
		transform:"rotateZ(0deg)"
	})
}).click(function(){
	$(this).parent().css({
		opacity:0
	})
})