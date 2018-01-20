//引入passport包
var passport = require("passport");
//使用passport的本地登录策略
var LocalStrategy = require("passport-local").Strategy;
//引入用户对象在MongoDB中的模型
var User = require("./models/user_model");
//配置passport的本地登录策略
passport.use(new LocalStrategy({
    usernameField: 'userLogonName', //指定登录账户名的字段名
    passwordField: 'userPassword', //指定密码的字段名
    session: false //API方式，每次均要验证，不使用session保存用户id
  },
  function(logonName, password, done) {
    User.findOne({ logonName: logonName }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false,
          { message: "没找到用户!" });
      }
      user.checkPassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false,
            { message: "密码不对." });
        }
      });
    });
  }
));
//passport指定需要实现的两个方法
module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};