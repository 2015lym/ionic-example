//引入外部工具包
var express = require("express");
var bodyParser = require("body-parser");

//MongoDB访问接口
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
mongoose.connect('mongodb://localhost/easego');
//执行passport的登录策略的配置模块完成配置
setUpPassport();
//引入用户管理的Router
var apiRouterUsersV1 = require("./api/v1/users");
//引入游记管理的Router
var apiRouterArticlesV1 = require("./api/v1/articles");
//引入产品的Router
var apiProductsV1 = require("./api/v1/products");
//引入产品的Router
var apiPosV1 = require("./api/v1/pos");

//初始化Express应用
var app = express();

//设置 CORS, http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
            "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");            
  res.header("Connection", "close");          
  next();
});

//   http://expressjs.com/en/starter/static-files.html
// app.use(express.static('avatars'));
// app.use(express.static('uploads'));
app.use("/avatars", express.static(__dirname + '/avatars'));
app.use("/uploads", express.static(__dirname + '/uploads'));
app.use(express.static('public'));

//使用body-parser包将HTTP请求Body里的参数解析到对象中
app.use(bodyParser.urlencoded({ extended: true }));
//初始化passport并使用其作为Express的中间件
app.use(passport.initialize());

//使用用户管理的Router尝试匹配
app.use("/api/v1/users",apiRouterUsersV1);

//使用游记的Router尝试匹配
app.use("/api/v1/articles",apiRouterArticlesV1);

//使用产品的Router尝试匹配
app.use("/api/v1/products",apiProductsV1);

//使用产品订单的Router尝试匹配
app.use("/api/v1/pos",apiPosV1);

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