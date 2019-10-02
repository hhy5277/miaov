$("#nav").find("li").eq(5).siblings().hover(function(){
	$("#nav").find("li").eq(5).stop().animate({
		left:this.offsetLeft,
		width:this.offsetWidth
	})
},function(){
	$("#nav").find("li").eq(5).stop().animate({
		left:$("#nav").find("li").eq(0)[0].offsetLeft,
		width:$("#nav").find("li").eq(0)[0].offsetWidth
	})
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
		background:"#fff",
	});
	$(this).find("a").css({
		color:"#000"
	})
},function(){
	$(this).css({
		background:"",		
	});
	$(this).find("a").css({
		color:"#fff"
	})
})
var arrFall=["fall 1s","fall 1.2s ","fall 1.4s ","fall 1.6s"]
$("#wrap").fullpage({
	navigation:true,
	navigationPosition:"right",
	verticalCentered:false,
	navigationColor:"#fff",
	afterLoad:function(anchorLink,index){
		if(index==1){
			
		};
		if(index==2){
//			$("#content1").find(".child").each(function(e,i){
//				$(i).css({
//					animation:arrFall[e]
//				})
//			})
		}
	},
	onLeave:function(index,nextIndex,direction){
		if(nextIndex==1){
			$(".pAbout").css({
				animation:""
			});
			$("#content1").find(".child").each(function(e,i){
				$(i).css({
					animation:""
				})
			});
			$("#content").find("img").eq(1).animate({
				top:0
			},1000,function(){
				$("#content").find("img").eq(0).animate({
					opacity:1
				})
			})
			for(var j=0;j<$("#content1").find(".child").length;j++){
				$("#content1").find(".msg").eq(j).removeClass("show");
				$("#content1").find(".btn").eq(j).removeClass("color");
			}
		};
		if(nextIndex==2){
			$(".pAbout").css({
				animation:""
			});
			$("#content1").find(".child").each(function(i,e){
				$(e).css({
					animation:arrFall[i]
				})
			});
			$("#content").find("img").eq(1).css({top:-500});
			$("#content").find("img").eq(0).css({opacity:0});
		};
		if(nextIndex==3){
			$(".pAbout").css({
				animation:"fall1 2s"
			});
			$("#content1").find(".child").each(function(i,e){
				$(e).css({
					animation:""
				})
			})
			$("#content").find("img").eq(1).css({top:-500});
			$("#content").find("img").eq(0).css({opacity:0});
			for(var j=0;j<$("#content1").find(".child").length;j++){
				$("#content1").find(".msg").eq(j).removeClass("show");
				$("#content1").find(".btn").eq(j).removeClass("color");
			}
		}
	}
})

move();
$("#content1").find(".child").each(function(i,e){
	$(e).mouseover(function(){
		for(var j=0;j<$("#content1").find(".child").length;j++){
			$("#content1").find(".msg").eq(j).removeClass("show");
			$("#content1").find(".btn").eq(j).removeClass("color");
			$("#bg").find("div").eq(j).removeClass("show1");
		}
		$("#content1").find(".msg").eq(i).addClass("show");
		$("#content1").find(".btn").eq(i).addClass("color");
		$("#bg").find("div").eq(i).addClass("show1");
	})
})
function move(){
	$("#content").find("img").eq(1).animate({
			top:0
		},500,function(){
			$("#content").find("img").eq(0).animate({
				opacity:1
			})
		})
}

ScrollBG ();
function ScrollBG () {//封装一个函数  使背景图片可以随着鼠标左右晃动
		    //定义滚动背景容器变量
		    var shan = document.getElementById('shan'),
		        shan2= document.getElementById('shan2'),
		         shan3= document.getElementById('shan3'),
		        //获取当前窗口的尺寸并改变其中心为原点坐标，也可以改为仅获取指定层的坐标:oUl.offsetWidth
		        x = document.body.offsetWidth/2,
		        y = document.body.offsetHeight/2;
		    //设置当前窗口内的鼠标移动事件，也可以改为仅作用于指定层:oUl.onmousemove
		    document.onmousemove = function (event) {
		        //获取鼠标在当前窗口内的坐标值，也可以改为获取指定层的坐标:event.offsetX
		        var mx = event.clientX,
		            my = event.clientY;
		        //开始为每个要动的元素设置左边距和上边距，以每个元素的不同zIndex值来区别移动
		        shan.style.marginLeft=(x-mx)/90*shan.style.zIndex+'px';
		        shan2.style.marginLeft=(x-mx)/90*shan2.style.zIndex+'px';
		        shan3.style.marginLeft=(x-mx)/90*shan3.style.zIndex-650+'px';
		    };
		}

 var arr=[
 
 		{
 			transform:"rotate(0deg)",
 			opacity:1
 		},
 		{
 			transform:"rotate(-50deg)",
 			opacity:0
 		},
 		{
 			transform:"rotate(-180deg)",
 			opacity:0
 		},
 		{
 			transform:"rotate(50deg)",
 			opacity:0
 		}
 ];
   setInterval(function(){
   	arr.push(arr.shift());
	setStyle1();
	setStyle2();
	setStyle3();
	setStyle4()
   },4000);
 function setStyle1(){
 	$("#child1").css(
 		{transform:arr[0].transform,
 		opacity:arr[0].opacity}
 	);
 	$("#info1").css(
 		{transform:arr[0].transform,
 		opacity:arr[0].opacity}
 	)
 }
 function setStyle2(){
 	$("#child2").css(
 		{transform:arr[1].transform,
 		opacity:arr[1].opacity}
 	);
 	$("#info2").css(
 		{transform:arr[1].transform,
 		opacity:arr[1].opacity}
 	)
 }
function setStyle3(){
   	$("#child3").css(
   		{transform:arr[2].transform,
   		opacity:arr[2].opacity}
   	);
   	$("#info3").css(
   		{transform:arr[2].transform,
   		opacity:arr[2].opacity}
   	)
   }
function setStyle4(){
   	$("#child4").css(
   		{transform:arr[3].transform,
   		opacity:arr[3].opacity}
   	);
   	$("#info4").css(
   		{transform:arr[3].transform,
   		opacity:arr[3].opacity}
   	)
   }





function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  return "Chrome";
 }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

var mb = myBrowser();
if ("FF" == mb) {
    $("#box").css({
   	background:"rgb(70, 90, 255)"
   })

}
if ("Chrome" == mb) {
	$("#box").css({
   	background:"-webkit-gradient(linear, 0% 100%, 100% 0%, from(rgb(133, 85, 255)), to(rgb(64, 94, 245)))"
 })
}
