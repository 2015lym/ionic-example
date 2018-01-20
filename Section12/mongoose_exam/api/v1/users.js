//引入外部工具包
var express = require("express");
//引入用户对象在MongoDB中的模型
var User = require(process.cwd() + "/models/user_model");
//初始化Router
var api = express.Router();
//在数据库中初始化用户对象列表
User.find(function(err,users){
  if(users.length) return;
  new User({name: '张三', age: 25, retired: false}).save();
  new User({name: '李四', age: 75, retired: true}).save();
  new User({name: '王五'}).save();
});
//API：获取用户对象列表
api.get("/", function(req, res) {
  User.find(function(err,users){
    res.send(users);
  });
});
//API：获取指定用户对象
api.get("/:name", function(req, res) {
  User.findOne({name: req.params.name}, function(err,user){
    res.send(user);
  })
});
//API：增加一个用户对象
api.post("/", function(req, res) {
  if (!req.body.name) {
    res.status(400).send("用户对象的name属性不能为空");
    return;
  }
  new User({name: req.body.name, 
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
//API：更改一个用户对象
api.put("/", function(req, res) {
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
//API：删除一个用户对象
api.delete("/", function(req, res) {
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