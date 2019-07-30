		function Base64() {
			_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		
			this.encode = function(input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
				input = _utf8_encode(input);
				while (i < input.length) {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
					output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2)
							+ _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
				}
				return output;
			}
			this.decode = function(input) {
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				while (i < input.length) {
					enc1 = _keyStr.indexOf(input.charAt(i++));
					enc2 = _keyStr.indexOf(input.charAt(i++));
					enc3 = _keyStr.indexOf(input.charAt(i++));
					enc4 = _keyStr.indexOf(input.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					output = output + String.fromCharCode(chr1);
					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}
				}
				output = _utf8_decode(output);
				return output;
			}
		
			_utf8_encode = function(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = "";
				for ( var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}
		
				}
				return utftext;
			}
		
			_utf8_decode = function(utftext) {
				var string = "";
				var i = 0;
				var c = c1 = c2 = 0;
				while (i < utftext.length) {
					c = utftext.charCodeAt(i);
					if (c < 128) {
						string += String.fromCharCode(c);
						i++;
					} else if ((c > 191) && (c < 224)) {
						c2 = utftext.charCodeAt(i + 1);
						string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
						i += 2;
					} else {
						c2 = utftext.charCodeAt(i + 1);
						c3 = utftext.charCodeAt(i + 2);
						string += String.fromCharCode(((c & 15) << 12)
								| ((c2 & 63) << 6) | (c3 & 63));
						i += 3;
					}
				}
				return string;
			}
		}
		
		function locationSearch() {
			var s = getMainJs();
			if(s == null)
			{
				location.reload();
			}
			return s.src.substring(s.src.indexOf(".js?")+3, s.src.length);
		}
		
		function getParameter(name, paraStr) {
			var result = "";
			var str = "&" + paraStr.split("?")[1];
			var paraName = "&" + name + "=";
			if (str.indexOf(paraName) != -1) {
				if (str.substring(str.indexOf(paraName) + 1, str.length).indexOf("&") != -1) {
					var TmpStr = str.substring(str.indexOf(paraName), str.length);
					result = TmpStr.substr(TmpStr.indexOf(paraName), TmpStr.substring(1,TmpStr.length).indexOf("&")	- TmpStr.indexOf(paraName)+1);
				} else {
					result = str.substring(str.indexOf(paraName), str.length);
				}
		
				result = result.substring(result.indexOf("=") + 1, result.length);
			} else {
				result = "No such parameter";
			}
			return (result.replace("&", ""));
		}
		function getMainJs() {
			var scripts = document.getElementsByTagName("script");
			var s = null;
			for ( var i = 0; i < scripts.length; i++) {
				if (scripts[i] != "undefined" && scripts[i].src.indexOf("a_") != -1) {
					s = scripts[i];
					break;
				}
			}
			return s;
		}
		function getAds() {
			var s = getMainJs();
			if (s == null)
				return ".";
			else
				return s.src.substring(0, s.src.indexOf("/a_"));
		}
		
		function encodeStr(str) {
			var b = new Base64();
			var base64Str = b.encode(str);
			return base64Str;
		}
		
		function decodeStr(base64Str) {
			var b = new Base64();
			var str = b.decode(base64Str);
			return str;
		}
		
		function isPushable() {
			var winH = document.all?document.body.clientHeight:window.innerHeight;
			var winW = document.all?document.body.clientWidth:window.innerWidth;
			//if the browser is maxthon, it's clientHeight and clientWidth both are zero at the first time, but it should to show ad.
			if(winH == 0 && winW == 0)
			{
				winH = 501;
				winW = 501;
			}
			try
			{
				if (window == window.top && winH >= 500 && winW >= 500) 
				{
					return 1;
				}
			} catch (e) 
			{
			}
			return 0;
		}
		function isPushableForM(ttype) {
		    var winH = document.all?document.body.clientHeight:window.innerHeight;
			var winW = document.all?document.body.clientWidth:window.innerWidth;
			//if the browser is maxthon, it's clientHeight and clientWidth both are zero at the first time, but it should to show ad.
			if(winH == 0 && winW == 0)
			{
				winH = 501;
				winW = 501;
			}
			
			try {   //if termial is mobile or pad, can not check window size because the size of windows is not corrected.
				if(2 == ttype){
					if (window == window.top) {
						return 1;
					}
				}else{
					if (window == window.top && winH >= 500 && winW >= 500) {
						return 1;
					}
				}
				
			} catch (e) {
			}
			return 0;
		}
		function appendParam(oStr, aStr) {
			if (oStr.indexOf('youku') > 0) {
				oStr = oStr;
			} else if (oStr.indexOf('?') > 0) {
				oStr = oStr + "&" + aStr;
			} else {
				oStr = oStr + "?" + aStr;
			}
			return oStr;
		}
		
		function addClickCount() {   
		    var posir = absp + "/a/adclick?spid=" + spid + "&adid=" + adid + "&tcca=" + account + "&urip=" + urip + "&stpt=" + stpt + "&edpt=" + edpt      
		                                        + "&p7arm=" + userType + "&p8arm=" + ipType + "&psad=" + psad + "&isaa=" + isaa + "&envs=" + envs + "&ckts=" + ckts;     
		    var ifr = document.createElement("iframe");     
		    ifr.src = posir;     
		    ifr.style.display="none";     
		    document.body.appendChild(ifr);     
		} 
		
		ua = navigator.userAgent;
		if(ua != null)
		{
			ua = encodeStr(ua.replace(/,/g,"%2C"));
		}
		absp = getAds();
		paraStr = locationSearch();
		
		adid = getParameter("adid", paraStr);
		area = getParameter("area", paraStr);
		account = getParameter("tcca", paraStr);
		urip = getParameter("urip", paraStr);
		stpt = getParameter("stpt", paraStr);
		edpt = getParameter("edpt", paraStr);
		g = getParameter("orlu", paraStr);
		adurl = getParameter("aorlu", paraStr);
		hasFrame = getParameter("p6arm", paraStr);
		spid = getParameter("spid", paraStr);
		time = getParameter("p3arm", paraStr);
		time=time*1000;
		appd = getParameter("appd", paraStr);
		hasCount = getParameter("hasCount", paraStr);
		hasWhiteUser = getParameter("hasWhiteUser", paraStr);
		psad = getParameter("psad", paraStr);
		isaa = getParameter("isaa", paraStr);
		envs = getParameter("envs", paraStr);
		ckts = getParameter("ckts", paraStr);
		
		ttype = getParameter("type",paraStr);
		
		pusd = getParameter("p5arm", paraStr);
		he = getParameter("p1arm", paraStr);
		if(hasFrame == 1)
	    {
			he = parseInt(he);
			he = he + 16; 
	    }
		wi = getParameter("p2arm", paraStr);
		userType = getParameter("p7arm", paraStr);
		ipType = getParameter("p8arm", paraStr);
		paraStr = paraStr + "&usgt=" + ua;		
		g = decodeStr(g);
		adurl = decodeStr(adurl);
		newUrl = appendParam(g,"t=" + new Date().getTime());
		if(w == undefined)
		{
    		var w='<html><head><meta http-equiv="Refresh" content="0;URL='+newUrl+'"/></head></html>';
		}
		else
		{
    		var w='';
		}
		adurl = appendParam(adurl,"spid=" + spid);
		if(appd == 1)
		{
			adurl = appendParam(adurl,"param=" + encodeStr("url=" + g));
		}
		else if(appd == 2)
		{
			if(isaa == 1)
			{
				adurl = appendParam(adurl,"param=" + encodeStr("account=" + account + "&isaa=" + isaa));
			}
			else
			{
				adurl = appendParam(adurl,"param=" + encodeStr("account=" + decodeStr(account) + "&isaa=" + isaa));
			}
		}
		else if(appd == 3)
		{
			if(isaa == 1)
			{
				adurl = appendParam(adurl,"param=" + encodeStr("account=" + account + "&isaa=" + isaa + "&url=" + g));
			}
			else
			{
				adurl = appendParam(adurl,"param=" + encodeStr("account=" + decodeStr(account) + "&isaa=" + isaa + "&url=" + g));
			}
		}
		
		function stop()
		{
		    return false;
		}
		
		document.oncontextmenu=stop;

        objTimer = 0;
		function $(n)
		{
			return document.getElementById(n);
		}

		function $i(i)
		{
			try
			{
				return parseInt(i);
			}
			catch(ex)
			{
				return 0;
			}
		}

		function MessageTip(id, pusd)
		{
			var body = $("b");

		    body.innerHTML="<iframe src='"+absp+"/a/spd"+paraStr+"' style='display:none'></iframe>"
		    +"<iframe name=cn src='" + newUrl + "' frameBorder=0 width=100% height=100%></iframe>"
		    +"<div class='ad' id='"+id+"' style='position:absolute;right:0px;top:0px;width:100%;height:100%;z-index:99999;overflow:hidden;'></div>";
			
			this.id = id;
			this.obj = $(id);

			(this.obj.style.visibility = "hidden");
			(this.obj.style.position = "absolute");
			(this.obj.style.left = "0px");
			(this.obj.style.top = "0px");
			(this.obj.style.zIndex = "99999");
			(this.obj.style.width = wi);
			(this.obj.style.height = he);
		
			this.divTop = $i(this.obj.style.top);
			this.divLeft = $i(this.obj.style.left);
			this.divHeight = this.obj.offsetHeight;
			this.divWidth = this.obj.offsetWidth;
			this.docWidth = document.body.clientWidth;
			this.docHeight = document.body.clientHeight;
		    this.stepx= 0;

			this.timeout= 30 * time;
			this.speed = 20;
			
			this.step = pusd;
			this.timer = 0;
			this.pause = false;
			this.close = false;
			this.autoClose = true;
		
			this.add(this);
		
			var url_unpush = absp + "/a/unpush?adid=" + adid + "&tcca=" + account + "&urip=" + urip + "&area=" + area + "&p7arm=" + userType
					+ "&p8arm=" + ipType + "&isaa=" + isaa + "&envs=" + envs + "&ckts=" + ckts;	
			var url_click = absp + "/a/adclick?spid=" + spid + "&adid=" + adid + "&tcca=" + account + "&urip=" + urip + "&stpt=" + stpt + "&edpt=" + edpt
					+ "&p7arm=" + userType + "&p8arm=" + ipType + "&psad=" + psad + "&isaa=" + isaa + "&envs=" + envs + "&ckts=" + ckts;
			if (hasWhiteUser == 1)
    		{
		       if(adurl.indexOf('?') > 0)
		       {
		          adurl = adurl + "&u=" + encodeURIComponent(url_unpush);
		       }
		       else
		       {
		          adurl = adurl + "?u=" + encodeURIComponent(url_unpush);
		       }
    		}
    		if (hasCount == 1 || hasCount == 3)
    		{
		       if(adurl.indexOf('?') > 0)
		       {
		          adurl = adurl + "&c=" + encodeURIComponent(url_click);
		       }
		       else
		       {
		          adurl = adurl + "?c=" + encodeURIComponent(url_click);
		       }
    		}
			
			
			var temp = "<table id='content' width="+wi+" height="+he+" border=0 cellSpacing=0 cellPadding=0 align='center' style='border:1px solid;border-color:#2E53AF;' >"; 
			if(hasFrame == 1)
		    {
		   		temp = temp + "<tr><td id='title' style='height:15px;background-color: #2E53AF;text-align: right;padding-top: 1px;padding-right: 1px;'>" + 
		    		"<img id='close' onclick='closeAd()' alt='Close' src='"+ absp +"/close.gif' style='overflow:hidden;border:1px solid;border-color:white;background-color:#EFF7FE;width:12px;height:10px;font-family:System;cursor:hand;'/>" + 
		    		"</td></tr>";
		    }
			temp = temp + "<tr><td>";
			temp = temp + "<iframe name='ad' src='"+ adurl +"' width='100%' height='100%' frameborder='0' scrolling='no'></iframe>"; 
			temp = temp + "</td></tr>";
			temp = temp + "</table>";
	
			this.obj.innerHTML = temp;
		}

		MessageTip.prototype.tips = new Array();
		
		MessageTip.prototype.add = function(mt)
		{
			this.tips.push(mt);
		};
		
		MessageTip.prototype.moveToPosition = function()
		{
		    var me = this;
		    var mess = this.obj;
		    me.docWidth = document.body.clientWidth;
		    me.docHeight = document.body.clientHeight;	
		    mess.style.left= $i(document.body.scrollLeft) + document.body.clientWidth - $i(mess.style.width);
		    mess.style.top = $i(document.body.scrollTop) + document.body.clientHeight + 10 + me.stepx;
		};

		MessageTip.prototype.show = function()
		{
			if(this.onload())
			{
			  	var me = this;
			  	var mess = this.obj;
			  	mess.onmouseover = function(){me.pause=true;};
			  	mess.onmouseout = function(){me.pause=false;};
			  	mess.style.top = $i(document.body.scrollTop) + this.docHeight + 10;
			  	mess.style.left = $i(document.body.scrollLeft) + this.docWidth - this.divWidth;	
			  	mess.style.visibility = 'visible';
			  	var moveUp = function()
			  	{
			  		var tHeight = me.divHeight;		  		
			  		if(parseInt(mess.style.top,10) <= (this.docHeight - this.divHeight + parseInt(document.body.scrollTop,10)))
				    {
				        window.clearInterval(me.timer);
				    }
			  		if($i(mess.style.top) <= (me.docHeight - tHeight + $i(document.body.scrollTop)))
			  		{
		        		me.timeout--; 
			        	if(me.timeout==0)
			        	{
				  			window.clearInterval(me.timer);
				  			if(me.autoClose)
				  			{
				  				me.hide();
				  			}
				  		}			  		
			  		} 
					else 
					{
					    me.stepx -= me.step;
					    me.moveToPosition();		
					}
		  		};
		  		this.timer = window.setInterval(moveUp,this.speed);
		  	}
		};

		MessageTip.prototype.hide = function()
		{
			if(this.onload())
			{
				var me = this;
				var mess = this.obj;
		    
		   		if(this.timer>0)
		   		{
		      		window.clearInterval(me.timer);
		    	}
				var moveDown = function()
				{
					if(me.pause==false || me.close)
					{
						if($i(mess.style.top) >= ($i(document.body.scrollTop) + me.docHeight + 10))
						{
					  		window.clearInterval(me.timer);
					      	document.getElementById("MsnDialog").style.display="none";
					      	document.getElementById("MsnDialog").style.height=0;
		            		mess.style.height=0;
				  			mess.style.visibility='hidden';
						} 
						else 
						{
				             me.stepx = parseInt(me.stepx) + parseInt(me.step)*2;	
				             me.moveToPosition();
					  	}
				  	}
			  	};
			  	this.timer = window.setInterval(moveDown,this.speed);
		  	}
		};
		
		function ReLocat(MsId)
		{		
		    try 
		    {
			    divHeight = parseInt($(MsId).offsetHeight,10);
			    divWidth = parseInt($(MsId).offsetWidth,10);
			    docWidth = document.body.clientWidth;
			    docHeight = document.body.clientHeight;
			    $(MsId).style.top = docHeight - divHeight + parseInt(document.body.scrollTop,10);
			    $(MsId).style.left = docWidth - divWidth + parseInt(document.body.scrollLeft,10);
		    }
		    catch(e) {}
		}
		
		MessageTip.prototype.onload = function()
		{
			return true;
		};
		
		MessageTip.prototype.onunload = function()
		{
			return true;
		};
		
		MessageTip.prototype.resizeDiv = function()
		{
		    i+=1;
		    if(i>500) {closeDiv();}
		    try 
		    {
			    divHeight = parseInt($(this.id).offsetHeight,10);
			    divWidth = parseInt($(this.id).offsetWidth,10);
			    docWidth = document.body.clientWidth;
			    docHeight = document.body.clientHeight;
			    $(this.id).style.top = docHeight - divHeight + parseInt(document.body.scrollTop,10);
			    $(this.id).style.left = docWidth - divWidth + parseInt(document.body.scrollLeft,10);
		    }
		    catch(e) {}
		};
		
		window.onresize = function()
		{
		    mt1.moveToPosition();
		};
		
		var mt1 = null;
		function loadAttribute()
		{
		    var pushFlag = isPushableForM(ttype);
		    var body = $("b");
		    var htmlStr = "";
		    if (pushFlag == 0)
    		{
    		    paraStr = paraStr + "&pushFlag=0";
		    	htmlStr = "<iframe src='" + absp + "/a/spd" + paraStr + "' style='display:none'></iframe>" + 
		    	  "<iframe name=cn src='" + newUrl + "' frameBorder=0 width=100% height=100% scrolling=auto></iframe>";
		    	body.innerHTML = htmlStr;
		    	return;
    		}
	    	
	    	paraStr = paraStr + "&pushFlag=1";
	    	
			var MsId = "MsnDialog";
			mt1 = new MessageTip(MsId, pusd);
			
			mt1.show();
			
			if(time > 0)
			{
				setTimeout("mt1.hide()",time);
			}
	    }
	    function closeAd()   
        {     
                if(hasCount == 2 || hasCount == 3)     
                {     
                      addClickCount();     
                }     
                mt1.close=true;     
                mt1.hide();     
        } 

		document.body.scrollTop=0;
		loadAttribute(); 