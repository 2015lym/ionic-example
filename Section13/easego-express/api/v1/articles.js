//引入外部工具包
var _ = require("lodash");
var uuid = require('node-uuid'); 
var fs = require('fs');
var express = require("express");
//创建本地登录验证回调函数
var authenticator = require("passport").authenticate('local');
//引入用户对象在MongoDB中的模型
var User = require(process.cwd() + "/models/user_model");
//引入游记对象在MongoDB中的模型
var article_model = require(process.cwd() + "/models/article_model");
var Like = article_model.Like,
    Comment = article_model.Comment,
    Section = article_model.Section,
    Article = article_model.Article;

//初始化Router
var api = express.Router();

//经测试,formidable创建需要放在express.Router()之后
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

//在数据库中初始化2个游记对象列表,为测试使用
Article.find(function(err, articles){
  if(articles.length) return;
  //mongoose的CRUD是异步模式,需要使用promise同步查询链条
  var id1,id2,avatarFileName1,avatarFileName2;
  User.findOne({logonName:'test1'}).exec()
  .then((user)=>{
    id1 = user._id;
    avatarFileName1 = user.avatarFileName; 
    return User.findOne({logonName:'test2'}).exec();
  })
  .then((user)=>{
    id2 = user._id; 
    avatarFileName2  = user.avatarFileName; 
    //console.log(id1,id2);
    new Article({
      author: id1,
      name: "测试游记1",
      geolocationSpot: [ //纬度，经度
        40.829047,
        111.70542
      ],
      location: "中国,上海",
      sections: [
        new Section({
          location: "中国,上海",
          text: "之前去过一次上海,对这座城市充满了好感,于是跟几个老友又踏上了旅途",
          imageFileName: "photo_test_1.jpg",
          likes: [new Like({liker: id2})],
          comments: [new Comment({
                      commenter: id2,
                      text: "测试评注留言"})]
        }),
        new Section({
          location: "中国,上海",
          text: "那一日阳光正暖 喜欢这种温暖的光线",
          imageFileName: "photo_test_2.jpg",
          likes: [new Like({liker: id2})],
          comments: [new Comment({
                      commenter: id2,
                      text: "测试评注留言"})]
        }),
        new Section({
          location: "中国,上海",
          text: "外滩总是挤满人潮 一栋栋高楼闪耀着华丽的金光",
          imageFileName: "photo_test_3.jpg",
        }),
      ],
      mileage: 1234.56,
      state: "已发布",
      coverImageFileName: "photo_test_3.jpg",
    }).save();
    new Article({
      author: id2,
      name: "测试游记2",
      geolocationSpot: [ //纬度，经度
        40.829047,
        111.70542
      ],
      location: "中国,北京",
      sections: [
        new Section({
          location: "中国,北京",
          text: "恭王府四合院 走在阳光明媚的北京胡同里 心情倍好",
          imageFileName: "photo_test_4.jpg",
          likes: [new Like({liker: id1})],
          comments: [new Comment({
                      commenter: id1,
                      text: "测试评注留言"})]
        }),
        new Section({
          location: "中国,北京",
          text: "人民英雄纪念碑 好气派",
          imageFileName: "photo_test_5.jpg",
          likes: [new Like({liker: id1})],
          comments: [new Comment({
                      commenter: id1,
                      text: "测试评注留言"})]
        }),
        new Section({
          location: "中国,北京",
          text: "八达岭长城 头发在风中飞舞",
          imageFileName: "photo_test_6.jpg",
        }),
      ],
      mileage: 1234.56,
      state: "已发布",
      coverImageFileName: "photo_test_4.jpg",
    }).save();
  });
});

//API：获取已发布游记对象列表,不要求登录验证
api.get("/list/:pageNo?",  function(req, res) {
  var itemsPerPage = 2; //每页两个
  Article.find({"state": "已发布", "publicity": "公开"})
  .sort('-lastUpdate')
  .populate('author',"name avatarFileName")
  .exec(function(err,articles){
    var pageNo = Number(req.params.pageNo || 0);
    res.send(_.slice(articles,pageNo*itemsPerPage, 
              (pageNo+1)*itemsPerPage));
  });
});

//API：获取已发布游记对象列表,不要求登录验证
api.get("/listOfAuthor/:userId",  function(req, res) {
  Article.find({"author": req.params.userId})
  .exec(function(err,articles){
    res.send(articles);
  });
});

//API：获取单个游记对象
api.get("/query/:articleId",  function(req, res) {
  Article.find({_id: req.params.articleId})
  .populate('author',"name avatarFileName")
  .populate('sections.likes.liker',"name avatarFileName")
  .populate('sections.comments.commenter',"name avatarFileName")
  .exec(function(err,article){
    res.send(article);
  });
});

//API：增加游记评论,要求登录验证
api.post("/addComment", authenticator, function(req, res) {
  Article.findOne({_id: req.body.articleId}).exec(function(err,article)
  {
    var section = article.sections.id(req.body.sectionId);
    section.comments.push({
                      commenter: req.body.commenterId,
                      text: req.body.text});
    article.save(function (err) {
      if(err){
        console.log(err);
        res.status(500).send("无法存入数据-"+err.toString());
        return;
      }
      Article.findOne({_id: req.body.articleId})
      .populate('author',"name avatarFileName")
      .populate('sections.likes.liker',"name avatarFileName")
      .populate('sections.comments.commenter',"name avatarFileName")
      .exec(function(err,doc){
        res.send(doc);
      });
    });
  });
});

//API：增加点赞,要求登录验证
api.post("/addLike", authenticator, function(req, res) {
  Article.findOne({_id: req.body.articleId}).exec(function(err,article)
  {
    var section = article.sections.id(req.body.sectionId);
    section.likes.push({liker: req.body.likerId});
    article.save(function (err) {
      if(err){
        console.log(err);
        res.status(500).send("无法存入数据-"+err.toString());
        return;
      }
      Article.findOne({_id: req.body.articleId})
      .populate('author',"name avatarFileName")
      .populate('sections.likes.liker',"name avatarFileName")
      .populate('sections.comments.commenter',"name avatarFileName")
      .exec(function(err,doc){
        res.send(doc);
      });
    });
  });
});

//API：增加游记Article,要求登录验证
api.post("/newArticle", authenticator, function(req, res) {
  var article = new Article({
      author: req.body.authorId,
      name: req.body.name,
      geolocationSpot: [ //纬度，经度
        req.body.geolocationSpot[1],
        req.body.geolocationSpot[0]
      ],
      location: req.body.location,
    });
  article.save(function (err) {
    if(err){
      console.log(err);
      res.status(500).send("无法存入数据-"+err.toString());
      return;
    }
    res.send(article);
  });
  return;
});

/*API：增加游记Article图片,,不使用passport的登录验证
(因为passport要求x-www-form-urlencoded编码,而文件上传使用form-data编码,
两者不兼容)*/
api.post("/newPhoto", function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir  = "./uploads";
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    var articleId = fields.articleId;
    var uploadedFileName;
    if(files) //普通HTML文件控件上传
    {
      var uploadedFilePath = files.file.path;
      uploadedFileName = files.file.path.split('\\').pop();
    }
    else //Base64文件数据编码上传
    {
      var bitmap = new Buffer(fields.file, 'base64');
      uploadedFileName = "upload_" + uuid.v4() + ".jpg";
      fs.writeFileSync("./uploads/"+uploadedFileName, bitmap);
    }
    Article.findOne({_id: articleId}).exec(function(err,article)
    {
      article.sections.push({
        imageFileName: uploadedFileName,
        date: Date.now()
      });
      article.save(function (err) {
        if(err){
          console.log(err);
          res.status(500).send("无法存入数据-"+err.toString());
          return;
        }
        res.send(_.last(article.sections));
      });
    });
  });
  return;
});

//API：修改游记Article的Section,要求登录验证
api.post("/updateSection", authenticator, function(req, res) {
  var updatedProps = {};
  if(req.body.date) updatedProps["sections.$.date"] = req.body.date;
  if(req.body.location) updatedProps["sections.$.location"] = req.body.location;
  if(req.body.geolocationSpot) updatedProps["sections.$.geolocationSpot"] = req.body.geolocationSpot;
  if(req.body.text) updatedProps["sections.$.text"] = req.body.text;
  if(req.body.imageFileName) updatedProps["sections.$.imageFileName"] = req.body.imageFileName;

  Article.findOneAndUpdate( 
    {"_id": req.body.articleId, "sections._id": req.body.sectionId},
    {"$set": updatedProps},
    {"new": true}, //返回更新后的文档对象
    function(err,article)
    {
      console.log(req.body.imageFileName);
      if(req.body.isArticleCoverImage && req.body.imageFileName){
        Article.findOneAndUpdate(
          {"_id": req.body.articleId},
          {"$set": {coverImageFileName: req.body.imageFileName}},
          {"new": true},
          function(err,article){
            res.send(article);
          }
        );
      }
      else{
        res.send(article);
      }
    }
  );
});

//API：修改游记Article的多个属性,要求登录验证
api.put("/updateArticle", authenticator, function(req, res) {
  var updatedProps = {};
  if(req.body.name) updatedProps["name"] = req.body.name;
  if(req.body.startDate) updatedProps["startDate"] = req.body.startDate;
  if(req.body.mileage) updatedProps["mileage"] = req.body.mileage;
  if(req.body.state) updatedProps["state"] = req.body.state;
  if(req.body.publicity) updatedProps["publicity"] = req.body.publicity;
  //if(req.body.coverImageFileName) updatedProps["coverImageFileName"] = req.body.coverImageFileName;
  if(req.body.geolocationSpot) updatedProps["geolocationSpot"] = req.body.geolocationSpot;
  if(req.body.location) updatedProps["location"] = req.body.location;
  updatedProps["lastUpdate"] = Date.now();
  console.log(updatedProps);
  Article.findOneAndUpdate( 
    {"_id": req.body.articleId},
    {"$set": updatedProps},
    {"new": true}, //返回更新后的文档对象
    function(err,article)
    {
      res.send(article);
    }
  );
});

//导出Router
module.exports = api;