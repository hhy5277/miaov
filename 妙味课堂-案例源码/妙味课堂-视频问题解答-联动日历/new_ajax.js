function ajax(url, fnOnSucc, fnOnFaild)
{
	var oAjax=null;
	
	//1.初始化Ajax对象
	if(window.ActiveXObject)
	{
		oAjax=new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject("Microsoft.XMLHTTP");
	}
	else
	{
		oAjax=new XMLHttpRequest();
	}
	
	//2.建立连接
	oAjax.open('get', url, true);
	
	//3.监控请求状态
	oAjax.onreadystatechange=function ()
	{
		//readyState->Ajax对象内部的状态
		//status->服务器返回的请求结果
		if(oAjax.readyState==4)
		{
			//alert('请求完成，请求结果是：'+oAjax.status);
			//alert(oAjax.responseText);
			if(oAjax.status==200)
			{
				if(fnOnSucc)
				{
					fnOnSucc(oAjax.responseText);
				}
			}
			else
			{
				if(fnOnFaild)
				{
					fnOnFaild(oAjax.status);
				}
			}
		}
		//alert(oAjax.readyState);
		//alert(typeof oAjax.status);
	};
	
	//4.发送请求
	oAjax.send();
	
	//5.*清理
	//oAjax.onreadystatechange=null;
	//oAjax=null;
}

function ajaxPost(url, sData, fnOnSucc, fnOnFaild)
{
	var oAjax=null;
	
	//1.初始化Ajax对象
	if(window.ActiveXObject)
	{
		oAjax=new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject("Microsoft.XMLHTTP");
	}
	else
	{
		oAjax=new XMLHttpRequest();
	}
	
	//2.建立连接
	oAjax.open('post', url, true);
	
	//3.监控请求状态
	oAjax.onreadystatechange=function ()
	{
		//readyState->Ajax对象内部的状态
		//status->服务器返回的请求结果
		if(oAjax.readyState==4)
		{
			//alert('请求完成，请求结果是：'+oAjax.status);
			//alert(oAjax.responseText);
			if(oAjax.status==200)
			{
				if(fnOnSucc)
				{
					fnOnSucc(oAjax.responseText);
				}
			}
			else
			{
				if(fnOnFaild)
				{
					fnOnFaild(oAjax.status);
				}
			}
		}
		//alert(oAjax.readyState);
		//alert(typeof oAjax.status);
	};
	
	//4.发送请求
	oAjax.setRequestHeader('content-type', 'urlencode');
	oAjax.send(sData);
	
}