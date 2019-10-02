class as.loadPic 
{
	public function loadPic(ob:MovieClip, uri:String, func:Function,loadIng:Function){
		if(ob && uri) {
			var mcldr = new MovieClipLoader();
			var ldrob = new Object();
			var loadnum:Number;
			ldrob.onLoadStart = function(tmc) {
				//var loadProgress = mcldr.getProgress(tmc);
			}
			ldrob.onLoadProgress = function(tmc, loadedBytes, totalBytes) {
				loadnum=int(loadedBytes/totalBytes*100);
				loadIng(loadnum);
			}
			ldrob.onLoadComplete = function(tmc) {
				//var loadProgress = mcldr.getProgress(tmc);
			}
			ldrob.onLoadInit = function(tmc) {
				if(func && typeof func == "function") {
					func(tmc);
				}
			}
			ldrob.onLoadError = function(tmc, errc){
			} 
			mcldr.addListener(ldrob);
			mcldr.loadClip(uri, ob);
		}		
	}
}