//引入外部工具包
var _ = require("lodash");
var express = require("express");
//引入产品对象在MongoDB中的模型
var product_model = require(process.cwd() + "/models/product_model");
var Product = product_model.Product;
//初始化Router
var api = express.Router();

//在数据库中初始化20个(四类产品,每类五个)游记对象列表,为测试与举例使用
Product.find(function(err, products){
  if(products.length) return;
  var categories = [ {name: "classic", text: "经典"},{name: "honeymoon",text:"蜜月"},
                    {name: "kid",text: "亲子"}, {name: "family" , text: "家庭"}];
  _.times(categories.length,function(catIndex){
      _.times(5,function(index){
      new Product({
        category: categories[catIndex].name,
        name: categories[catIndex].text + "产品" + index,
        price: 88888,
        introduction: categories[catIndex].text + "产品" + index + "的介绍",
        detail: categories[catIndex].text + "产品" + index + "的详细介绍",
        priceInfo: categories[catIndex].text + "产品" + index + "的价格介绍",
        tip: categories[catIndex].text + "产品" + index + "的提示",
        coverImageFileName: categories[catIndex].name +"-"+ (index+1) + ".jpg",
      }).save();
    });
  });
});

//API：获取已发布产品对象列表,不要求登录验证
api.get("/list/:category?",  function(req, res) {
  var query = {}
  if(req.params.category){
    query = {category: req.params.category}
  }
  Product.find(query).exec(function(err,products){
    res.send(products);
  });
});

//导出Router
module.exports = api;