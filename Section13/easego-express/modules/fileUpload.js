/* fileUpload.js */
var multer = require('multer'),
  storage = multer.diskStorage({
    destination: function (req, file, callback) {
		    // 注意，此处的uploads目录是从项目的根目录开始寻找
		    // 如果没有的话，需要手动新建此文件夹
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {

      // multer不会自动添加文件后缀名，需要手动添加
      callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
  }),

  upload = multer({
    storage: storage,
    limits: 10000000
  }).single('file');

// 将文件上传封装为一个模块，以供其他地方使用
function uploadFile(req, res) {
  upload(req, res, function (error) {
    if (error) {
      console.error(JSON.stringify(error));
      return res.end('Error uploading file.');
    }
    console.log('Success!');
    res.end('File is uploaded');
  });
}

exports.uploadFile = uploadFile;