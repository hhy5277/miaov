//应用程序自动入口文件

//加载	express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载cookies模块
var Cookies = require('cookies');
//创建app应用  等同于 NodeJS中的Http.createServer();
var app = new express();

var User = require('./models/User');

//设置静态文件托管
//当用户访问的文件以/public开始，那么直接返回对应的__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));

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

//bodyparser 设置
app.use(bodyParser.urlencoded({
    extended: true
}))

//设置cookie
app.use(function(req, res, next) {
    req.cookies = new Cookies(req, res);

    //解析登录用户的cookie信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录用户的类型：是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            }, function(err) {
                console.log(err);
            })
        } catch (e) {
            next();
        }
    } else {

        next();
    }

    // console.log(req.cookies.get('userInfo'));

})

/**
 * 根据不同的功能划分模块
 */
app.use('/admin', require('./routers/admin')); //处理后台管理 http://localhost:8081/admin/
app.use('/api', require('./routers/api')); //处理api
app.use('/', require('./routers/main')); //处理前台展示

//首页
// app.get('/', function(req, res, next) {

//     //res.send('<h1>欢迎光临我的博客！</h1>');
//     //读取views目录下的指定文件 解析并返回给客户端  第一个参数表示模板的文件 相对于views目录 views/index.html 
//     //传递给模板使用的数据
//     res.render('index');
// });

// app.get('/main.css', function(req, res, next) {
//     res.setHeader('content-type', 'text/css');
//     res.send("body{background:red;}");
// })
mongoose.Promise = global.Promise; //处理UnhandledPromiseRejectionWarning
mongoose.connect('mongodb://localhost:27017/mongodb', function(err) {
    if (err) {
        console.log('数据库连接失败！')
    } else {
        console.log('数据库连接成功！')
            //监听http请求
        app.listen(8081);
    }
});
