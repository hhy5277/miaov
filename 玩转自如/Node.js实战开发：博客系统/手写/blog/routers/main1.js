var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Content = require('../models/Content');

/**
 * 首页
 */
router.get('/', function(req, res, next) {
    var data = {
        userInfo: req.userInfo,
        category: req.query.category || '',
        categories: [],
        count: 0,
        page: Number(req.query.page || 1),
        limit: 2,
        pages: 0
    };

    var where = {};

    if (data.category) {
        where.category = data.category;
    }

    //读取所有的分类信息
    Category.find().then(function(categories) {
        // res.render('main/index', { //第二个参数表示传给模板的数据
        //     userInfo: req.userInfo,
        //     categories: categories
        // });

        data.categories = categories;

        return Content.where(where).count();
    }, function(err) {
        // body...
    }).then(function(count) {

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
        console.log(data);
        res.render('main/index', data);

    }, function(err) {

    });

    // console.log(req.userInfo);
    // res.send('main');
    // res.render('main/index', { //第二个参数表示传给模板的数据
    //     userInfo: req.userInfo
    // });
});

module.exports = router;
