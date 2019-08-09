//应用程序自动入口文件

//加载	express模块
var express = require('express');

//创建app应用  等同于 NodeJS中的Http.createServer();
var app = new express();



//首页
app.get('/', function(req, res, next) {

    res.send('<h1>欢迎光临我的博客！</h1>');

});
app.listen(8081);
