var express = require('express');
var router = express.Router();

// 引入 管理 控制器
var adminController = require('../controllers/adminController.js');


// 后台首页
router.get('/',adminController.index);

// 后台登录页面
router.get('/login',adminController.login);

// 注册页面
router.get('/adminAdd',adminController.adminAdd);

// 添加用户
router.post('/adminInsert',adminController.adminInsert);

// 验证码
router.get('/code',adminController.code);

// 登录操作
router.post('/doLogin',adminController.doLogin);

// 退出登录
router.get('/logOut',adminController.logOut);

// 跳转网页
router.get('/tiaozhuan',adminController.tiaozhuan);

// 添加文章
router.get('/articleAdd',adminController.articleAdd);

// 发布文章
router.post('/articleInsert',adminController.articleInsert);

// 添加分类
router.get('/itemAdd',adminController.itemAdd);

// 发布分类
router.post('/itemInsert',adminController.itemInsert);

// 分类列表
router.get('/itemList',adminController.itemList);

// 编辑分类
router.get('/itemEdit/:_id',adminController.itemEdit);

// 更新分类
router.post('/itemUpdate',adminController.itemUpdate);

// 文章列表
router.get('/articleList',adminController.articleList);

// 编辑文章
router.get('/articleEdit/:_id',adminController.articleEdit);

// 更新文章
router.post('/articleUpdate',adminController.articleUpdate);

// 更新封面
router.post('/imageUpdate',adminController.imageUpdate);

// 删除文章
router.get('/articleRemove/:_id',adminController.articleRemove);

// 删除分类
router.get('/itemRemove/:_id',adminController.itemRemove);

// 添加友链
router.get('/linkAdd',adminController.linkAdd);

// 友链入库
router.post('/linkInsert',adminController.linkInsert);

// 链接列表
router.get('/linkList',adminController.linkList);

// 编辑链接
router.get('/linkEdit/:_id',adminController.linkEdit);

// 更新链接
router.post('/linkUpdate',adminController.linkUpdate);

// 删除链接
router.get('/linkRemove/:_id',adminController.linkRemove);




module.exports = router;
