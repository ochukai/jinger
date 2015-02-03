var mCategory = require('../../models/category');

exports.list = function (req, res) {

    var pageRequest = {
        page: req.param('page') || 1,
        pageSize: req.param('pageSize') || 8,
        args: {
            name: req.param('categoryName')
        }
    };

    console.info('list - pageRequest: ' + JSON.stringify(pageRequest));

    mCategory
        .list(pageRequest)
        .then(function (page) {
            res.json(page);
        });
};

exports.show = function (req, res) {

    var id = req.params.id;

    console.info('show - id: ' + id);

    mCategory
        .getByID(id)
        .then(function(category) {
             res.json(category[0]);
        });
};

exports.create = function (req, res) {

    var category = {
        name: req.param('name'),
        parent_id: req.param('parent_id')
    };

    console.log('create - category: ' + JSON.stringify(category));

    mCategory
        .save(category)
        .then(function (id) {
            var type = id ? true : false;
            res.json({
                success: type,
                id: id || 0
            });
        });
};

exports.update = function (req, res) {

    console.log('category body: ' + JSON.stringify(req.body));

    var category = {
        id: req.params.id,
        name: req.param('name'),
        parent_id: req.param('parent_id')
    };

    console.log('update - category: ' + JSON.stringify(category));

    mCategory
        .update(category)
        .then(function(result){
            res.json(result);
        });
};

exports.remove = function (req, res) {

    var id = req.params.id;

    console.info('remove - id: ' + id);

    mCategory
        .remove(id)
        .then(function(category) {
            res.json(category);
        });
};