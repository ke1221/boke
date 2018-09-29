// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 2. 定义 文章 集合的 骨架  (用来约束集合的)
var articleSchema =  new mongoose.Schema({
	//	所在栏目
	itemId : {
		type: 'ObjectId',
		// 关联的集合
		ref: 'item'
	},
	title 		:String,		//	标题
	author 		:String,		//	作者
	content 	:String, 		//	内容
	keywords	:String,		//	关键字
	description	:String,		//	描述
	imgurl      :String,		//	封面路径
	ctime: {
		type: Date,		//  创建时间
		default: new Date()
	},
});

// 创建 栏目 数据模型
var articleModel = mongoose.model('article',articleSchema);

// 暴露 itemModel 
module.exports = articleModel;