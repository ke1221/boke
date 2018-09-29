// 管理员 控制器
var adminController = {};

// 引入 管理 数据库模型
var adminModel = require('../models/adminModel.js');

// 引入 文章 数据库模型
var articleModel = require('../models/articleModel.js');

// 引入 分类 数据库模型
var itemModel = require('../models/itemModel.js');

// 引入 友链 数据库模型
var linkModel = require('../models/linkModel.js');

// 引入 MD5 加密模块 
var md5 = require('md5');





// 管理 首页
adminController.index = function(req, res, next) {
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	// 响应首页模板  分配数据
	res.render('admin/index',{ errText : null });
}

// 登录 页面
adminController.login = function(req,res){
	//响应 登录页 模板
	res.render('admin/login',{errText:null});
	// console.log(req.session);
}

// 注册页面
adminController.adminAdd = function(req,res){
	// 响应模板
	res.render('admin/adminAdd');
}

// 添加用户
adminController.adminInsert = function(req,res){

	// 判断两次密码是否一致
	if(req.body.password != req.body.repassword){
		res.send('两次输入不一致');
	}

	// 去掉用户名 密码 两端空白字符
	req.body.name = req.body.name.trim();
	// 给用户的密码进行加密
	req.body.password = md5(req.body.password.trim());

	// 把数据添加到数据库
	adminModel.create(req.body,function(err){
		if(err){
			res.send('注册失败--用户名已存在');
		}else{
			// 跳转登录页面
			res.redirect('/admin/tiaozhuan');
		}
	})
}

// 验证码模块
adminController.code = function(req,res){
	// 引入验证码模块
	var captchapng = require('captchapng');
	// 生成验证码数字
	var code = parseInt(Math.random()*9000+1000);
	// 把验证的数据 存在 session 里
	req.session.code = code;
	// 生成验证码
	var p = new captchapng(80,40,code); // width height

	p.color(0,0,0,0);
	p.color(255,255,255,255);
	var img = p.getBase64();
	var imgbase64 = new Buffer(img,'base64');
	res.send(imgbase64);
}

// 登录操作
adminController.doLogin = function(req,res){
	// 判断验证码
	if(req.body.code != req.session.code){
		// 响应模板 错误信息
		res.render('admin/login',{errText:'验证码错误'});
		return;
	}
	// 去掉用户名 密码两端的空白字符
	var name = req.body.name.trim();
	// 给用户的密码进行加密
	var password = md5(req.body.password.trim());

	// 带着用户名 作为条件 去查询 admin 集合
	adminModel.findOne({name : name},function(err,data){
		if(data == null){
			// 用户不存在
			res.render('admin/login',{errText:'用户名或密码错误'});
		}else{
			if(password == data.password){
				// 登录成功
				// 把用户信息存储到 session 里
				req.session.user = data;
				// 跳转到 后台首页
				res.redirect('/admin');
			}else{
				// 密码不正确
				res.render('admin/login',{errText:'用户名或密码错误'});
			}
		}
	})
	
}

// 退出登录
adminController.logOut = function(req,res){
	// 把登录时 添加的用户信息 赋值 null
	req.session.user = null;
	// 跳转到首页
	res.redirect('/');
}

// 跳转网页
adminController.tiaozhuan = function(req,res){
	// 响应网页
	res.render('admin/tiaozhuan');
}

// 添加文章
adminController.articleAdd = function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应报错模板
			res.send('数据查询失败');
		}else{
			// 响应模板 分配数据
			res.render('admin/articleAdd',{items:data});
		}
		
	})
}

// 发布文章
adminController.articleInsert = function(req,res){
	// 接收图片
	// 允许接收图片的类型
	var imgType = ['image/jpeg','image/png','image/gif'];
	// 文件的大小
	var fileSize = 1024 * 1024 * 5;
	// 文件保存的路径
	var imgPath = 'uploads';
	// 引入 图片上传 配置的模块
	var imgUpload = require('../configs/uploadimage_config.js');
	var upload = imgUpload(imgPath,imgType,fileSize).single('imgurl');
	// 图片上传
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			// 把图片的信息添加到 req.body 里
			req.body.imgurl = req.file.filename;
			console.log(req.file);
			//添加数据到文章集合里
			articleModel.create(req.body,function(err){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'文章数据添加失败'});
				}else{

					// 跳转到 栏目列表页
					res.redirect('/admin/articleAdd');		    	
				}
			});
		}
	})

}

// 添加分类
adminController.itemAdd = function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	// 响应模板
	res.render('admin/itemAdd');
}

// 发布分类
adminController.itemInsert = function(req,res){
	// 插入数据库
	itemModel.create(req.body,function(err){
		if(err){
			// 响应 报错模板
			res.render('admin/error',{errText:'插入数据失败'});
		}else{
			// 跳转到 栏目列表页
			res.redirect('/admin/itemList');
			// res.send('添加成功');
		}
	})
	console.log(req.body);
}

// 分类列表
adminController.itemList = function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应 报错模板
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 响应模板 分配数据
			res.render('admin/itemList',{items:data});
		}
	})
}

// 分类编辑
adminController.itemEdit = function(req,res){
	// 查询数据
	itemModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			// 响应 报错模板
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 响应模板 分配数据
			res.render('admin/itemEdit',{item:data});
		}
	})
}

// 更新分类
adminController.itemUpdate = function(req,res){
	// 更新数据
	itemModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			// 响应报错模板
			res.render('admin/error',{errText:'数据更新失败'});
		}else{
			// 跳转 栏目列表页
			res.redirect('/admin/itemList');
		}
	})
}

// 文章列表
adminController.articleList = function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');
	
	// 当前第几页
	var page = req.query.page?req.query.page:1;
	// 每页显示多少条数据
	var pageSize = 5;
	// 一共多少条数据
	articleModel.find({}).count(function(err,total){
		if(err){
			// 响应 报错模板
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 一共多少页
			var maxPage = Math.ceil(total/pageSize);
			// 判断上一页的边界
			if(page < 1) page = 1;
			// 判断下一页边界
			if(page > maxPage) page = maxPage;
			// 偏移量
			var offsetPage = pageSize*(page - 1);
			// 查询数据
			articleModel.find({}).limit(pageSize).skip(offsetPage).populate('itemId',{name:1}).exec(function(err,data){
				if(err){
					// 响应 报错模板
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
					// console.log(data.itemId)
					// 响应模板 分配数据
					res.render('admin/articleList',{articles:data,maxPage:maxPage,page:page});
				}
			})
		}
	})
}

// 文章编辑
adminController.articleEdit = function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 查询当前需要编辑的文章的数据
			articleModel.findOne({_id:req.params._id},function(err,data1){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
					console.log(data);
					// 响应模版 分配数据
				    res.render('admin/articleEdit',{items:data,data:data1});			
				}	
			})
		}		
	})
}

// 文章更新
adminController.articleUpdate = function(req,res){
	// 添加数据到文章集合里
	articleModel.update({_id:req.body._id},{$set:req.body},function(err){
		console.log(req.body);
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'文章修改失败'});
		}else{
			// 跳转到文章列表
			res.redirect('/admin/articleList');
		}
	})
}

// 封面更新
adminController.imageUpdate = function(req,res){
	// 允许接收图片的类型
	var imgType = ['image/jpeg','image/png','image/gif'];
	// 文件的大小
	var fileSize = 1024 * 1024 * 5;
	// 文件保存的路径
	var imgPath = 'uploads';
	// 引入 图片上传 配置的模块
	var imgUpload = require('../configs/uploadimage_config.js');
	var upload = imgUpload(imgPath,imgType,fileSize).single('imgurl');
	// 图片上传
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			// 添加数据到文章集合里
			articleModel.update({_id:req.body._id},{$set:{imgurl:req.file.filename}},function(err){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'封面修改失败'});
				}else{
					// 跳转到文章列表
					res.redirect('/admin/articleList');
				}
			})
		}
	})
}

// 删除文章
adminController.articleRemove = function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	// 删除数据
	articleModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			// 跳转到 文章列表页
			res.redirect('/admin/articleList');
		}
	})
}

// 删除分类
adminController.itemRemove = function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	itemModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			// 跳转到 分类列表页
			res.redirect('/admin/itemList');
		}
	})
}

// 添加友链
adminController.linkAdd = function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	// 响应模板
	res.render('admin/linkAdd');
}

// 链接入库
adminController.linkInsert = function(req,res){
	// 添加到数据库
	linkModel.create(req.body,function(err){
		if(err){
			// 响应 报错模板
			res.render('admin/error',{errText:'插入数据失败'});
		}else{
			// 跳转到 栏目列表页
			res.redirect('/admin/linkList');
		}
	})
}

// 链接列表
adminController.linkList = function(req,res){
	// 查询数据
	linkModel.find({},function(err,data){
		if(err){
			// 响应 报错模板
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// console.log(data);
			// 响应模板 分配数据
			res.render('admin/linkList',{links:data});
		}
	})
}

// 编辑链接
adminController.linkEdit = function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	// 查询数据
	linkModel.findOne({}).exec(function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			
			res.render('admin/linkEdit',{links:data});
		}
	})
}

// 更新链接
adminController.linkUpdate = function(req,res){
	// 更新数据
	linkModel.update({_id:req.body._id},{$set:req.body},function(err){
		console.log(req.body);
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'文章修改失败'});
		}else{
			// 跳转到文章列表
			res.redirect('/admin/linkList');
		}
	})
}

// 删除链接
adminController.linkRemove = function(req,res){
	// 判断用户有没有登录
	if(!req.session.user) res.redirect('/admin/login');

	// 删除链接
	linkModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			// 跳转到 文章列表页
			res.redirect('/admin/linkList');
		}
	})
}






// 暴露 控制
module.exports = adminController;