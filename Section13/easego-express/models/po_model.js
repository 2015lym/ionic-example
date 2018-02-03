/*用户采购旅游产品订单数据模型*/
//引入mongoose
var mongoose = require("mongoose");

//订单
var poSchema = mongoose.Schema({
  customer: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
  amount: {type: Number, required: true},
  price: {type: Number, required: true},
  useDate: {type: Date, default: Date.now},
  contactName: {type: String, required: true},
  contactPhone: {type: String, required: true},
  contactEmail:{type: String},
});
var Po = mongoose.model("Po",poSchema);

//导出产品订单的Model类
module.exports = Po;