//应用程序自动入口文件

//加载	express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');

//创建app应用  等同于 NodeJS中的Http.createServer();
var app = new express();



//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：表示模板引擎的名称，同时也是模板文件的后缀
//第二个参数：表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件的存放目录 第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎 第一个参数必须是view engine 第二个参数和app.engine第一个参数是一致的
app.set('view engine', 'html');

//在开发过程当中需要取消模板缓存的限制
swig.setDefaults({
    cache: false
});



//首页
app.get('/', function(req, res, next) {

    //读取views目录下的指定文件 解析并返回给客户端  第一个参数表示模板的文件 相对于views目录 views/index.html 
    //传递给模板使用的数据
    res.render('index');
});


app.listen(8081);
