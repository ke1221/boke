// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 定义 管理集合 的骨架 （用来约束集合）
var linkSchema = new mongoose.Schema({
	name  :  String,	//名称
	title :  String,	//描述
	link  :  String,	//链接
	ctime:{
		type: Date,		//时间
		default: new Date()
	}
});

// 创建 管理 数据模型
var linkModel = mongoose.model('link',linkSchema);

// 暴露
module.exports = linkModel;