var express = require('express');
var router = express.Router();

// 引入 管理 控制器
var indexController = require('../controllers/indexController.js');

/* 首页 */
router.get('/',indexController.index);


// 内容页
router.get('/content/:_id',indexController.content);

// 分类列表
router.get('/itemList/:_id',indexController.itemList);




module.exports = router;
