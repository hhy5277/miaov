(function() {
	var Gbct = function(obj) {
		return obj.getBoundingClientRect();
	};
	var mainWrap = document.querySelector("#mainWrap");
	var aims = mainWrap.children;
	var sF = function() {
		for (var i = 1; i < aims.length-1; i++) {
			if (Gbct(aims[i]).top < window.innerHeight) {
				aims[i].style.transform = "scale(1) translateY(0px)";
				aims[i].style.opacity = 1;
			}
		}
		if ( Gbct(mainWrap).top > -300) {
			aims[0].style.opacity = 1;
		}

		if ( Gbct(mainWrap).top < -400) {
			aims[0].style.opacity = 0;
		}
	};
	sF();
	document.onscroll = sF;
})();