// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 2. 定义 栏目 集合的 骨架  (用来约束集合的)
var itemSchema =  new mongoose.Schema({
	name : String,  	// 栏目名称
	info : String,		// 栏目简介
	ctime: {
		type: Date,		//  创建时间
		default: new Date()
	},
	order: Number,		// 排序
});

// 创建 栏目 数据模型
var itemModel = mongoose.model('item',itemSchema);

// 暴露 itemModel 
module.exports = itemModel;