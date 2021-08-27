# 项目功能
	1.用户可直接注册
		数据库给用户名设置唯一值 不能重复用户名注册
		注册成功 有一个简陋的跳转网页 3秒后 自动跳转登录页

	2.添加文章
		添加文章 可添加封面

	3.文章列表  -- 分页功能：显示当前第几页
		编辑 | 删除

	4.添加分类

	5.分类列表
		编辑 | 删除

	6.添加链接
	
	7.链接列表 
		编辑 | 删除

	首页 一个分类 只显示一条数据 底部有 友情链接    -- 搜索功能 暂未开通
		可以从 分类名称 直接跳转到 当前分类下面所有文章列表

	分类列表 未做友情链接 
		分页功能 


## 项目结构
	-|bin/							启动项目录
	-|--|www 						启动文件
	-|configs/						配置文件目录
	-|--|db_config.js       		数据库的配置文件
	-|--|uploadImage_config.js      图片上传配置文件
	-|controllers/					控制器的目录
	-|--|adminController.js 		管理员的控制器
	-|--|indexController.js 		首页的控制器
	-|models/						放 model 目录
	-|--|itemModel.js 				栏目的数据模型
	-|--|articleModel.js 			文章的数据模型
	-|--|adminModel.js 				管理员的数据模型
	-|--|linkModel.js 				友情链接的数据模型
	-|routes/						路径文件的目录
	-|--|index.js 					前台路由(用户)
	-|--|admin.js 					后台路由(管理员)
	-|views/						模版(视图)目录
	-|--|admin/						后台模板(视图)
	-|--|--|adminAdd.ejs 			用户注册
	-|--|--|articleAdd.ejs 			添加文章
	-|--|--|articleEdit.ejs 		编辑文章
	-|--|--|articleList.ejs 		文章列表
	-|--|--|error.ejs 				报错模板
	-|--|--|footer.ejs 				公用底部模板
	-|--|--|header.ejs 				公用顶部模板
	-|--|--|index.ejs 				后台首页模板
	-|--|--|itemAdd.ejs 			添加分类
	-|--|--|itemEdit.ejs 			编辑分类
	-|--|--|itemList.ejs 			分类列表
	-|--|--|linkAdd.ejs 			添加链接
	-|--|--|linkEdit.ejs 			编辑链接
	-|--|--|linkList.ejs 			链接列表
	-|--|--|login.ejs 				登录页面
	-|--|--|tiaozhuan.ejs 			注册成功跳转登录页面
	-|--|content.ejs				文章内容页
	-|--|error.ejs					前台报错模板
	-|--|footer.ejs					前台底部
	-|--|header.ejs					前台头部
	-|--|index.ejs					前台首页
	-|--|itemList.ejs				分类列表页
	-|uploads/						文章封面上传目录
	-|public/						静态资源库
	-|--|font-awesome-4.4.0/		引用字体
	-|--|font/						前台字体
	-|--|js/						js 的目录
	-|--|css/						css 的目录
	-|--|img/						图片的目录
	-|--|owl-carousel/				前台引用特效
	-|--|assets/					前台引用特效
	-|--|item/						前台引用特效
	-|node_modules/					项目依赖模块的目录
	-|app.js 						项目入口文件
	-|package.json 					项目的配置文件

## 用到的模块
	mongoose						数据库模块
	captchapng 						验证码模块 code
	express-session					cookie session模块
	md5								密码加密模块
	multer 							文件上传模块
	time-stamp 						时间模块
	uid 							生成唯一标识 （用于给图片命名）

## 用户 数据集合骨架
 	name  :  String,	//账号
	password:String,	//密码
	info  :  String,	//简介
	tel   :  String,	//电话
	ctime:{
		type: Date,		//时间
		default: new Date()
	}

## 文章 数据集合骨架
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
		type: Date,				//  创建时间
		default: new Date()
	}

## 分类 数据集合骨架
	name : String,  	// 栏目名称
	info : String,		// 栏目简介
	ctime: {
		type: Date,		//  创建时间
		default: new Date()
	},
	order: Number,		// 排序
	
## 友链 数据集合骨架
	name  :  String,	//名称
	title :  String,	//描述
	link  :  String,	//链接
	ctime:{
		type: Date,		//时间
		default: new Date()
	}# test
