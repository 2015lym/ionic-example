//引入外部工具包
var express = require("express");
var bodyParser = require("body-parser");
//引入用户管理的Router
var apiRouterUsersV1 = require("./api/v1/users");
//初始化Express应用
var app = express();
//使用body-parser包将HTTP请求Body里的参数解析到对象中
app.use(bodyParser.urlencoded({ extended: true }));
//使用用户管理的Router尝试匹配
app.use("/api/v1/users",apiRouterUsersV1);
//启动Express开始侦听到达3000端口的HTTP请求
app.listen(3000, function() {
  console.log("App is listening on port 3000");
});