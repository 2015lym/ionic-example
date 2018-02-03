/*游记数据模型*/
//引入mongoose
var mongoose = require("mongoose");

//点赞
var likeSchema =  mongoose.Schema({
  liker: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  date: {type: Date, default: Date.now},
});
var Like = mongoose.model("Like",likeSchema);

//评论
var commentSchema = mongoose.Schema({
  commenter: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  date: {type: Date, default: Date.now},
  text: {type: String},
});
var Comment = mongoose.model("Comment",commentSchema);

//游记章节
var sectionSchema = mongoose.Schema({
  date: {type: Date, default: Date.now},
  location: { type: String},
  geolocationSpot: {type: [Number]},
  text: {type: String,default: "暂无内容"},
  imageFileName: {type: String},
  likes: {type: [likeSchema], default:[]},
  comments: {type: [commentSchema],default: []},
});
var Section = mongoose.model("Section",sectionSchema);

//游记
var articleSchema = mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  name: {type: String, required: true},
  geolocationSpot: {type: [Number], required: true},
  location: {type: String, required: true},
  sections: {type: [sectionSchema],default: []},
  startDate: {type: Date, default: Date.now},
  mileage: { type: Number, default: 0.0},
  lastUpdate: {type: Date, default: Date.now},
  state: {type:String, default: "编辑"},  //编辑;已发布
  publicity: {type:String, default: "公开"},  //公开; 好友可见; 自己可见
  showInHomePage: {type: Boolean, default: true},
  coverImageFileName: {type: String, default: "no-image.jpg"},
});
var Article = mongoose.model("Article",articleSchema);

//导出对象的Model类
module.exports = {
  Like: Like,
  Comment: Comment,
  Section: Section,
  Article: Article
};