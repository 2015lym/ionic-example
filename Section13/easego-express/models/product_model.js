/*旅游产品数据模型*/
//引入mongoose
var mongoose = require("mongoose");

//旅游产品
var productSchema = mongoose.Schema({
  category: {type: String, required: true},
  name: {type: String, required: true},
  validBeforeDate: {type: Date, default: Date.now},
  price: {type: Number, required: true},
  introduction: {type: String, required: true},
  detail: {type: String, required: true},
  priceInfo:{type: String, required: true},
  tip: {type: String, required: true},
  coverImageFileName: {type: String, required: true},
});
var Product = mongoose.model("Product",productSchema);

//导出产品对象的Model类
module.exports = {
  Product: Product
};