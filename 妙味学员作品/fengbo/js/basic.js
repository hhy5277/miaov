(function(){

	// 模版生成 详情页 并添加icon的点击事件
	DOMform();
	openActive ();

	function DOMform(){
		
		var landItems = landing.querySelector("ul");
		var html_model_open = template("model-open",openData);
		landItems.innerHTML = html_model_open;
		
	}
	function openActive () {
		var headerOpen = document.querySelector(".header-open");
		var landing = document.querySelector("#landing");
		var landCircle = landing.querySelector(".circle");
		landCircle.style.width = "0px";
		landCircle.style.height = "0px";
		headerOpen.onOff = true;
		headerOpen.ani = true;
		headerOpen.onclick = function() {
			function acAniend () {
				headerOpen.ani = true;
				landCircle.removeEventListener("transitionend", acAniend);
			}
			function unacAniend () {
				landing.style.display = "none";
				landing.style.width = "0%";
				headerOpen.ani = true;
				landCircle.removeEventListener("transitionend", unacAniend);
			}
			if (headerOpen.onOff && headerOpen.ani) {
				landing.style.display = "block";
				landing.style.width = "100%";
				headerOpen.ani = false;
				setTimeout(function() {
					headerOpen.className = ("header-open open-active");
					landing.className = "land-active";
					landCircle.style.transitionDelay = "200ms";
					landCircle.style.width = "4000px";
					landCircle.style.height = "4000px";
					headerOpen.onOff = false;
					landCircle.addEventListener("transitionend", acAniend);
				},50);
			} else {
				if ( headerOpen.ani ) {
					headerOpen.ani = false;
					landing.className = "land-unactive";
					landCircle.style.width = "0px";
					landCircle.style.height = "0px";
					headerOpen.className = ("header-open open-unactive");
					landCircle.style.transitionDelay = "200ms";
					headerOpen.onOff = true;
					landCircle.addEventListener("transitionend",unacAniend
					);
				};	
			}	
		};
	}
})();


