//引入mongoose
var mongoose = require("mongoose");
//引入bcrypt-nodejs提供加密解密
var bcrypt = require("bcrypt-nodejs");
//设置加密次数
var SALT_FACTOR = 10;
//定义用户对象的schema
var userSchema = mongoose.Schema({
  logonName:{ type: String, required: true, unique: true },
  password: { type: String, required: true},
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: {type: String},
  gender: { type: Number, default: 3}, //1: Male; 2: Female; 3: Unknow
  introduction: { type: String },
  avatarFileName: { type: String, default: "avatars/no-avatar.jpg" },
  registerDate: {type: Date, default: Date.now}
});
//保存前将密码加密
userSchema.pre("save",function(done){
  var user = this;
  if(!user.isModified("password")){
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR,function(err,salt){
    if(err) { return done(err); }
    bcrypt.hash(user.password,salt,function(){},
    function(err,hashedPassword){
      if(err) { return done(err); }
      user.password = hashedPassword;
      done();
    });
  });
});
//密码对比验证，使用bcrypt.compare方法预防计时攻击
userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};
//生成用户对象的Model类
var User = mongoose.model("User", userSchema);
//导出用户对象的Model类
module.exports = User;