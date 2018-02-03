//引入外部工具包
var _ = require("lodash");
var express = require("express");
//创建本地登录验证回调函数
var authenticator = require("passport").authenticate('local');
//引入用户对象在MongoDB中的模型
var User = require(process.cwd() + "/models/user_model")
//引入产品对象在MongoDB中的模型
var product_model = require(process.cwd() + "/models/product_model");
var Product = product_model.Product;
//引入产品订单对象在MongoDB中的模型
var Po = require(process.cwd() + "/models/po_model");
//初始化Router
var api = express.Router();

//API：获取用户的订单对象列表,要求登录验证
api.post("/list", authenticator, function(req, res) {
  Po.find({customer: req.body.userId})
  .populate('product','name category coverImageFileName introduction')
  .exec(function(err,pos){
    res.send(pos);
  });
});

//API：增加订单,要求登录验证
api.post("/newPo", authenticator, function(req, res) {
  Product.findOne({_id: req.body.productId}).exec(function(err,product){
    if(err){
        console.log(err);
        res.status(500).send(err.toString());
        return;
    }
    var po = new Po({
      customer: req.body.userId,
      product: req.body.productId,
      amount: req.body.amount,
      price: product.price,
      useDate: req.body.useDate,
      contactName: req.body.contactName,
      contactPhone: req.body.contactPhone,
      contactEmail: req.body.contactEmail 
    });
    po.save(function (err) {
      if(err){
        console.log(err);
        res.status(500).send("无法存入数据-"+err.toString());
        return;
      }
      res.send(po);
    });
  });
});


//导出Router
module.exports = api;