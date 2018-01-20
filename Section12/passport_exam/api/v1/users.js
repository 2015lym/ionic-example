//引入外部工具包
var express = require("express");
//引入passport包
var passport = require("passport");
//引入用户对象在MongoDB中的模型
var User = require(process.cwd() + "/models/user_model");
//初始化Router
var api = express.Router();
//在数据库中初始化用户对象列表
User.find(function(err,users){
  if(users.length) return;
  new User({logonName:'zhang3', password: 'zhang3', name: '张三', age: 25, retired: false}).save();
  new User({logonName:'li4', password: 'li4', name: '李四', age: 75, retired: true}).save();
  new User({logonName:'wang5', password: 'wang5',name: '王五'}).save();
});
//API：获取用户对象列表，出于演示目的要求登录验证
api.post("/list", passport.authenticate('local'), function(req, res) {
  //成功登录验证后，passport会填充验证出来的req.user对象
  console.log(req.user.name + "/" + req.user.logonName + "：请求获取用户对象列表");
  User.find(function(err,users){
    console.log(users[0]);
    res.send(users);
  });
});
//API：获取指定用户对象，出于演示目的要求登录验证
api.post("/:name", passport.authenticate('local'), function(req, res) {
  User.findOne({name: req.params.name}, function(err,user){
    res.send(user);
  })
});
//API：增加一个用户对象，演示新用户注册，不要求登录验证
api.post("/", function(req, res) {
  if (!req.body.name) {
    res.status(400).send("用户对象的name属性不能为空");
    return;
  }
  new User({logonName: req.body.logonName, 
            password: req.body.password,
            name: req.body.name, 
            age: req.body.age, 
            retired: req.body.retired}).
  save(function(err,user){
    if(err){
      res.status(500).send("无法存入数据");
      return;
    }
    res.send(user);
  });
});
//API：更改一个用户对象，出于演示目的要求登录验证
api.put("/", passport.authenticate('local'), function(req, res) {
  if (!req.body.name) {//
    res.status(400).send("用户对象的name属性不能为空！");
    return;
  }
  //根据name找到用户对象后更新保存至数据库
  User.findOne({name: req.body.name}, function(err,user){
    if(err || !user){
      res.status(500).send("无法存入数据");
      return;
    }
    user.logonName = req.body.logonName;
    if(req.body.password){
      user.password = req.body.password;
    }
    user.age = req.body.age;
    user.retired = req.body.retired;
    user.save(function(err,user){
      if(err){
        res.status(500).send("无法存入数据");
        return;
      }
      res.send(user);
    });
  });
});
//API：删除一个用户对象，出于演示目的要求登录验证
api.delete("/", passport.authenticate('local'), function(req, res) {
  if (!req.body.name) {//
    res.status(400).send("用户对象的name属性不能为空！");
    return;
  }
  User.findOne({name: req.body.name}, function(err,user){
    if(err || !user){
      res.status(500).send("数据不存在");
      return;
    }
    //根据name找到用户对象后在数据库中删除
    user.remove(function(err,user){
      if(err){
        res.status(500).send("无法删除数据");
        return;
      }
      res.status(200).send("完成删除操作");
    });
  });
});
//导出Router
module.exports = api;