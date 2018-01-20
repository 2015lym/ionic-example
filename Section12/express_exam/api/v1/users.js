//引入外部工具包
var express = require("express");
var _ = require("lodash");
//初始化Router
var api = express.Router();
//初始化用户对象数组
var users = [{name: '张三', age: 25, retired: false},
            {name: '李四', age: 75, retired: true},
            {name: '王五'}];
//API：获取用户对象列表
api.get("/", function(req, res) {
  res.send(users);
});
//API：获取指定用户对象
api.get("/:name", function(req, res) {
  var idx = _.findIndex(users, ['name', req.params.name]);
  if (idx < 0) {
    res.status(404).send("找不到指定name属性的用户对象！");
    return;
  }
  res.send(users[_.findIndex(users, ['name', req.params.name])]);
});
//API：增加一个用户对象
api.post("/", function(req, res) {
  if (!req.body.name) {
    res.status(400).send("用户对象的name属性不能为空");
    return;
  }
  users.push({name: req.body.name, age: req.body.age, retired: req.body.retired});
  res.send(users);
});
//API：更改一个用户对象
api.put("/", function(req, res) {
  if (!req.body.name) {//
    res.status(400).send("用户对象的name属性不能为空！");
    return;
  }
  var idx = _.findIndex(users, ['name', req.body.name]);
  if(idx<0){//
    res.status(404).send("找不到指定name属性的用户对象！");
    return;
  }
  users[idx].age = req.body.age;
  users[idx].retired = req.body.retired;
  res.send(users);
});
//API：删除一个用户对象
api.delete("/", function(req, res) {
  if (!req.body.name) {//
    res.status(400).send("用户对象的name属性不能为空！");
    return;
  }
  _.remove(users,['name', req.body.name])
  res.send(users);
});
//导出Router
module.exports = api;