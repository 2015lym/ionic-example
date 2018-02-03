//引入外部工具包
var express = require("express");
//引入passport包
var passport = require("passport");


//创建本地登录验证回调函数
var authenticator = passport.authenticate('local');
//引入用户对象在MongoDB中的模型
var User = require(process.cwd() + "/models/user_model");
//初始化Router
var api = express.Router();

//经测试,formidable创建需要放在express.Router()之后
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

//在数据库中初始化用户对象列表
User.find(function(err,users){
  if(users.length) return;
  new User({logonName:'test1', password: '111111', name: '测试用户1', mobile: "12345678901", 
            email: "test1@example.com", gender: 1, 
            introduction: "this is an introduction", 
            avatarFileName: "test1.png"}).save();
  new User({logonName:'test2', password: '222222', name: '测试用户2', mobile: "12345678901", 
            email: "test2@example.com", gender: 3, 
            introduction: "this is an introduction", 
            avatarFileName: "test2.png"}).save();
});

//API：尝试登录验证
api.post("/logon", authenticator, function(req, res) {
  //成功登录验证后，passport会填充验证出来的req.user对象
  User.findOne({logonName: req.user.logonName},function(err,user){
    res.send(user);
  });
});

//API：获取用户对象列表，出于演示目的要求登录验证
api.post("/list", authenticator, function(req, res) {
  //成功登录验证后，passport会填充验证出来的req.user对象
  console.log(req.user.name + "/" + req.user.logonName + "：请求获取用户对象列表");
  User.find(function(err,users){
    res.send(users);
  });
});

//API：增加一个用户对象，演示新用户注册，不要求登录验证
api.post("/register", function(req, res) {
  if (!req.body.name) {
    res.status(400).send("用户对象的name属性不能为空");
    return;
  }
  new User({logonName: req.body.logonName, 
            password: req.body.password,
            name: req.body.name, 
            mobile: req.body.mobile}).
  save(function(err,user){
    if(err){
      console.log(err);
      res.status(500).send("无法存入数据-"+err.toString());
      return;
    }
    res.send(user);
  });
});

//API：模拟获取一个手机验证码，不要求登录验证
api.post("/get-verification-code", function(req, res) {
  if (!req.body.mobile) {
    res.status(400).send("mobile属性不能为空");
    return;
  }
  res.send({mobile:req.body.mobile, verificationCode: "1234"});
});

/*API：上传修改用户的头像图片,不使用passport的登录验证
(因为passport要求x-www-form-urlencoded编码,而文件上传使用form-data编码,
两者不兼容)*/
api.post("/updateUserImage", function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir  = "./avatars";
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    var userId = fields.userId;
    var uploadedFilePath = files.file.path;
    var uploadedFileName = files.file.path.split('\\').pop();
    
    User.findOneAndUpdate(
      {_id: userId},
      {"$set": {"avatarFileName": uploadedFileName}},
      {"new": true},
      function(err,user){
        res.send(user);
      }
    );
  });
});

//API：修改用户账户设置，要求登录验证
api.post("/updateAccountSetting", authenticator, function (req, res) {
  var updatedProps = {};
  if (req.body.name) updatedProps["name"] = req.body.name;
  if (req.body.mobile) updatedProps["mobile"] = req.body.mobile;
  if (req.body.email) updatedProps["email"] = req.body.email;
  if (req.body.gender) updatedProps["gender"] = req.body.gender;
  if (req.body.introduction) updatedProps["introduction"] = req.body.introduction;

  User.findOneAndUpdate(
    { "_id": req.body.userId },
    { "$set": updatedProps },
    { "new": true }, //返回更新后的文档对象
    function (err, user) {
      console.log(err);
      res.send(user);
    }
  );
});

//API：修改用户密码，要求登录验证
api.put("/changePassword", authenticator, function(req, res) {
  //此处不用findOneAndUpdate,需要运行保存前的自定义密码混淆加密操作
  User.findOne({_id: req.body.userId}, function(err,user){
    if(err || !user){
      res.status(500).send("无法存入数据");
      return;
    }
    if(req.body.password){
      user.password = req.body.password;
    }
    user.save(function(err,user){
      if(err){
        res.status(500).send("无法存入数据");
        return;
      }
      res.send(user);
    });
  });
});

//导出Router
module.exports = api;