var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Content = require('../models/Content');

var data;
/**
 * 处理通用数据
 */
router.use(function(req, res, next) {
    data = {
        userInfo: req.userInfo,
        categories: [],
    }

    //读取所有的分类信息
    Category.find().then(function(categories) {

        data.categories = categories;
        next();
    }, function(err) {
        // body...
    });
});

/**
 * 首页
 */
router.get('/', function(req, res, next) {

    data.category = req.query.category || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 10;
    data.pages = 0;

    var where = {};

    if (data.category) {
        where.category = data.category;
    }

    Content.where(where).count().then(function(count) {

        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        //取值不能小于1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;


        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        });

    }, function(err) {

    }).then(function(contents) {
        data.contents = contents;
        // console.log(data);
        res.render('main/index', data);

    }, function(err) {

    });

    // console.log(req.userInfo);
    // res.send('main');
    // res.render('main/index', { //第二个参数表示传给模板的数据
    //     userInfo: req.userInfo
    // });
});


router.get('/view', function(req, res) {
    var contentId = req.query.contentid || '';

    Content.findOne({
        _id: contentId
    }).populate(['user']).then(function(content) {
        data.content = content;

        content.views++;
        content.save();

        res.render('main/view', data);
    }, function() {

    });
});

module.exports = router;
