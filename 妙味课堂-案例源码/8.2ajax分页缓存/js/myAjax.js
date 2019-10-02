function myAjax(opt) {
    opt = opt || {}; // 短路运算符 opt = opt && '3'
    opt.method = opt.method || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.dataType = opt.dataType || 'JSON'
    opt.success = opt.success || function () {
        };
    var xmlHttp = null;
    if (XMLHttpRequest) { 
        xmlHttp = new XMLHttpRequest(); //非ie浏览器ajax对象
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP'); //ie下的ajax对象
    }
    var params = [];
    for (var key in opt.data)params.push(key + '=' + opt.data[key]);
    var postData = params.join('&');
    if (opt.dataType === 'JSONP') {
        creatScript(opt.url, postData);
    } else {
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        }
        else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                if (opt.dataType === 'JSON') {
                    //JSON.parse(xmlHttp.response)
                    opt.success(xmlHttp.response);
                }
            }
        };
    }
}
function creatScript(url, data) {
    var oScript = document.createElement('script');
    oScript.src = url + '?' + data + '&callback=getEn';
    document.body.appendChild(oScript);
}