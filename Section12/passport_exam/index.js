//引入外部工具包
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
//引入passport包提供验证中间件
var passport = require("passport");
//引入建立passport的登录策略的配置模块
var setUpPassport = require("./setup_passport");
//获得mongoose的连接对象
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("已连接MongoDB！");
});
//连接Mongodb
mongoose.connect('mongodb://localhost/test');
//执行passport的登录策略的配置模块完成配置
setUpPassport();
//引入用户管理的Router
var apiRouterUsersV1 = require("./api/v1/users");
//初始化Express应用
var app = express();
//使用body-parser包将HTTP请求Body里的参数解析到对象中
app.use(bodyParser.urlencoded({ extended: true }));
//初始化passport并使用其作为Express的中间件
app.use(passport.initialize());
//使用用户管理的Router尝试匹配
app.use("/api/v1/users",apiRouterUsersV1);
//应用退出时断开与MongoDB的连接
process.on('SIGINT',function(){
  db.close(function(){
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
//启动Express开始侦听到达端口3000的HTTP请求
app.listen(3000, function() {
  console.log("Express应用已在端口3000开始侦听......");
});