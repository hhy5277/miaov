import flash.external.ExternalInterface;//导入JS交互类
import as.loadPic;//装载加载类
function loadPicture(loadUrl,picDiv){
	var randomNum=random(1000000000);//定义ID随机数
	_root.createEmptyMovieClip("loadMc"+randomNum, _root.getNextHighestDepth());
	new loadPic(_root["loadMc"+randomNum],loadUrl,function(ob){
			//加载完毕触发JS回调函数
			new ExternalInterface.call("picCallBack", loadUrl,picDiv,ob._width,ob._height);
		},function(loadN){
			//实时触发JS加载条控制函数
			new ExternalInterface.call("loadElement",picDiv,loadN);
		}
	)
}
ExternalInterface.addCallback("forjs",null,loadPicture);