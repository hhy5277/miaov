miaov nodejs实战开发-博客系统

npm init
npm install --save express body-parser cookies markdown swig mongoose

https://www.mongodb.com/download-center/community 下载安装MongoDB

启动MongoDB 

cd 到 
安装路径\MongoDB\Server\version\bin

或者 将此路径添加到环境变量path

执行 
mongod --dbpath=数据文件存放路径 --port = 指定的端口 默认 27017

如：mongod --dbpath=D:\Program Files\MongoDB\Server\4.0\data --port=27017

或者

也可以使用MongoDB可视化工具robomongo  网址：https://robomongo.org/


mongo --version  查看版本号
