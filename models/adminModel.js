// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 定义 管理集合 的骨架 （用来约束集合）
var adminSchema = new mongoose.Schema({
	name  :  String,	//账号
	password:String,	//密码
	info  :  String,	//简介
	tel   :  String,	//电话
	ctime:{
		type: Date,		//时间
		default: new Date()
	}
});

// 创建 管理 数据模型
var adminModel = mongoose.model('admin',adminSchema);

// 暴露
module.exports = adminModel;