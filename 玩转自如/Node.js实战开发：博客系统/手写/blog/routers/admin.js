var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');

router.use(function(req, res, next) {
    if (!req.userInfo.isAdmin) {
        //如果当前用户是非管理员
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
});

router.get('/', function(req, res, next) {
    // res.send('后台管理首页');
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});

//用户管理
router.get('/user', function(req, res, next) {
    /**
     * 从数据库中读取用户数据
     * limit(Number):限制获取的数据条数
     *
     * skip():忽略数据的条数
     *
     * 每页显示2条
     * 1:1-2 skip:0 -> (当前页-1) * limit
     * 2:3-4 skip:2
     */

    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    User.count().then(function(count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(function(users) {
            // console.log(users);

            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,
                count: count,
                pages: pages,
                limit: limit,
                page: page
            });
        }, function(err) {
            console.log(err);
        });

    });

});

//分类首页
router.get('/category', function(req, res) {
    // res.render('admin/category_index', {
    //     userInfo: req.userInfo
    // });


    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    Category.count().then(function(count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        /**
         * 1:升序
         * -1：降序
         */
        Category.find().sort({
            _id: -1
        }).limit(limit).skip(skip).then(function(categories) {
            // console.log(users);

            res.render('admin/category_index', {
                userInfo: req.userInfo,
                categories: categories,
                count: count,
                pages: pages,
                limit: limit,
                page: page
            });
        }, function(err) {
            console.log(err);
        });

    });

});

/**
 * 分类的添加
 */

router.get('/category/add', function(req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    });
});

/**
 * 分类的保存
 */

router.post('/category/add', function(req, res) {
    console.log(req.body);

    var name = req.body.name || '';

    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空'
        });
        return;
    }

    //数据库中是否已经存在同名的分类名称
    Category.findOne({
        name: name
    }).then(function(rs) {
        if (rs) {
            //数据库中已经存在该分类了
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类已经存在了'
            });
            return Promise.reject();

        } else {
            //数据库中不存在该分类，可以保存
            return new Category({
                name: name
            }).save();
        }
    }, function(err) {

    }).then(function(newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '保存分类成功',
            url: '/admin/category'
        });
    }, function(err) {

    });

});

/**
 * 分类修改
 */

router.get('/category/edit', function(req, res) {
    //获取要修改的分类的信息，并且用表单的形式展现出来
    var id = req.query.id || '';
    console.log(id);
    //获取要修改的分类信息
    Category.findOne({ //
        _id: id
    }).then(function(category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
        } else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category
            });

        }
    }, function(err) {

    });

});



router.post('/category/edit', function(req, res) {
    var id = req.query.id || '';
    //获取post提交过来的名称
    var name = req.body.name || '';

    Category.findOne({ //
        _id: id
    }).then(function(category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return Promise.reject();
        } else {
            //当用户没有做任何修改提交的时候
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                });
                return Promise.reject();
            } else {
                //要修改的分类名称是否已经在数据库中存在
                return Category.findOne({
                    _id: {
                        $ne: id
                    },
                    name: name
                });

            }

        }
    }, function(err) {

    }).then(function(sameCategory) {
        if (sameCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库中已经存在同名分类',
                url: '/admin/category'
            });
            return Promise.reject();
        } else {
            return Category.update({
                _id: id,

            }, {
                name: name
            });
        }
    }, function(err) {
        // body...
    }).then(function() {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        });
    }, function(err) {
        // body...
    });

});

/**
 * 分类删除
 */

router.get('/category/delete', function(req, res) {
    //获取要删除的分类的id
    var id = req.query.id || '';
    Category.remove({
        _id: id
    }).then(function(argument) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        });
    }, function(err) {

    });

});

/**
 * 内容首页
 */

router.get('/content', function(req, res) {
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    Content.count().then(function(count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        /**
         * 1:升序
         * -1：降序
         */
        Content.find().limit(limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        }).then(function(contents) {
            // console.log(users);

            res.render('admin/content_index', {
                userInfo: req.userInfo,
                contents: contents,
                count: count,
                pages: pages,
                limit: limit,
                page: page
            });
        }, function(err) {
            console.log(err);
        });

    });

    // res.render('admin/content_index', {
    //     userInfo: req.userInfo
    // });
});

/**
 * 内容添加页面
 */

router.get('/content/add', function(req, res) {
    Category.find().sort({
        _id: -1
    }).then(function(categories) {
        res.render('admin/content_add', {
            userInfo: req.userInfo,
            categories: categories
        });
    }, function(err) {

    });

});

/**
 * 内容保存
 */

router.post('/content/add', function(req, res) {
    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: userInfo,
            message: '内容分类不能为空'
        });
        return;
    }

    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        });
        return;
    }

    //保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        user: req.userInfo._id.toString(),
        description: req.body.description,
        content: req.body.content
    }).save().then(function(rs) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        });
    }, function(err) {

    });

});

/**
 * 修改内容
 */
router.get('/content/edit', function(req, res) {

    var id = req.query.id || '';
    var categories = [];
    Category.find().sort({
        _id: -1
    }).then(function(rs) {

        categories = rs;

        return Content.findOne({
            _id: id

        }).populate('category');
    }, function(err) {

    }).then(function(content) {
        if (!content) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '内容不存在'
            });
            return Promise.reject();
        } else {
            res.render('admin/content_edit', {
                userInfo: req.userInfo,
                content: content,
                categories: categories
            });
        }

    }, function(err) {

    });



});


/**
 * 修改保存
 */

router.post('/content/edit', function(req, res) {
    var id = req.query.id || '';

    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: userInfo,
            message: '内容分类不能为空'
        });
        return;
    }

    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        });
        return;
    }

    Content.update({
        _id: id
    }, {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).then(function() {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content/edit?id=' + id
        });
    }, function(err) {

    });


});

/**
 * 内容删除
 */

router.get('/content/delete', function(req, res) {
    var id = req.query.id || '';

    Content.remove({
        _id: id
    }).then(function(argument) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/content'
        });
    }, function(err) {

    });
});

module.exports = router;
