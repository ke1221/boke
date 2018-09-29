// 图片上传的配置

// 引入 multer 模块 （用来接收 文件)
var multer = require('multer');

// 引入 path 模块
var path = require('path');

// 引入 uid 模块 （取唯一值）
var uid = require('uid');

// 引入 时间模块
var timestamp = require('time-stamp');

/**
* 功能: 图片上传的配置
* 参数:
*	imgPath 	- String 	图片保存的路径  例: 'uploads'
*	imgType 	- Array     允许上传的图片类型 	例:  ['image/jpeg','image/png','image/gif']
*	fileSize	- Number 	允许文件的最大大小   单位: 字节
* 返回值: 
*	upload      - Object    文件上传的对象
* 作者: simon
* 邮箱: ...@.....
* 日期: 2018-08-24
* 版本: 
*/ 


var imgUpload = function(imgPath,imgType,fileSize){

	// storage 配置参数
	var storage = multer.diskStorage({
		destination: function(req,file,cb){
			// 接收文件的目录
			cb(null,imgPath);
		},
		filename: function(req,file,cb){
			// 文件扩展名
			var extName = path.extname(file.originalname);
			// 设置图片名称
			cb(null,timestamp('YYYYMMDD')+'-'+uid()+extName);
		}
	})
	// 文件过滤函数
	function fileFilter(req,file,cb){
		// 判断上传的文件类型是不是 我们允许的
		if(imgType.indexOf(file.mimetype) == -1){
			// 拒绝这个文件
			cb(null,false);
			// 如果有问题，你可以总是这样发送一个错误：
			cb(new Error('请上传 jpeg ，png ，gif 格式的图片'))
		}else{
			// 接受这个文件，使用 true ，像这样:
			cb(null,true)
		}
	}
	// 文件上传配置
	var upload = multer({
		// 基本配置
		storage: storage,
		// 文件过滤函数
		fileFilter: fileFilter,
		// 限制文件大小
		limits:{
			fileSize: fileSize //单位： 字节
		}
	})

	// 返回 upload 对象
	return upload;
}

// 暴露
module.exports = imgUpload;


