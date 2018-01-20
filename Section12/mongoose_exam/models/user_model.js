//引入mongoose
var mongoose = require("mongoose");
//定义用户对象的schema
var userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number },
  retired: { type: Boolean }
});
//生成用户对象的Model类
var User = mongoose.model("User", userSchema);
//导出用户对象的Model类
module.exports = User;