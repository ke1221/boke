// 管理员 控制器
var indexController = {};

// 引入 栏目 数据库模型
var itemModel = require('../models/itemModel.js');

// 引入 文章 数据库模型
var articleModel = require('../models/articleModel.js');

// 引入 友链 数据库模型
var linkModel = require('../models/linkModel.js');






// 首页
indexController.index = function(req, res, next) {
	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 递归
			getItemArticles(0);
			function getItemArticles(i){
				// 取栏目对应的 文章
				articleModel.find({itemId:data[i]._id}).limit(1).exec(function(err,articles){
					// 把查到的栏目文章的列表放到 data 里
					data[i].articlelist = articles;

					if(i<data.length-1){
						getItemArticles(++i);
					}else{
						// 查询数据
						linkModel.find({}).sort({order:1}).exec(function(err,link){
							// 响应模版 分配数据
					    	res.render('index',{items:data,link:link});
						})
												
					}
				})		
			}
		
		}		
	})
}

// 内容页
indexController.content = function(req,res){
	// 查询数据
	articleModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			// 响应 报错模板
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// console.log(data);
			// 响应模板 分配数据
			res.render('content',{data:data});
		}
	})
}

// 分类列表页
indexController.itemList = function(req,res){
	// 当前是第几页
	var page = req.query.page?req.query.page:1;
	// 每页显示多少条数据
	var pageSize = 3;
	// 一共有多少条数据
	itemModel.findOne({_id:req.params._id}).exec(function(err,data){
		if(err){
			// 响应 报错模版
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			console.log(data._id)
			articleModel.find({itemId:data._id}).count(function(err,total){
				if(err){
					// 响应 报错模版
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
					// 一共多少页 ?
					var maxPage =  Math.ceil(total/pageSize);
					// 判断上一页的边界
					if(page<1) page = 1;
					// 判断下一页的边界
					if(page>maxPage) page = maxPage;
					// 偏移量
					var offsetPage = pageSize*(page-1);
					// 查询数据            //	分页查询					关联查询
					articleModel.find({itemId:data._id}).limit(pageSize).skip(offsetPage).exec(function(err,art){
						if(err){
							// 响应 报错模版
							res.render('admin/error',{errText:'数据查询失败'});
						}else{
							// 响应模版 分配数据
					    	  res.render('itemList',{items:data,data:art,maxPage:maxPage,page:page});
						}
					})
				}
			})
		}
	});
	// 响应模板
	// res.render('itemList');
}




// 暴露
module.exports = indexController;
