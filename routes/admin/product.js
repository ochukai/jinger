// var mCategory = require('../../models/category');
var mProduct  = require('../../models/product');

exports.list = function (req, res) {

    var pageRequest = {
        page: req.param('page') || 1,
        pageSize: req.param('pageSize') || 8,
        argsObj: {
            name       : req.param('name'),
            brandId    : req.param('brandId'),
            typeId     : req.param('typeId'),
            categoryId : req.param('categoryId')
        }
    };

    console.info('list - pageRequest: ' + JSON.stringify(pageRequest));

    mProduct
        .list(pageRequest)
        .then(function (page) {
            res.json(page);
        });
};

exports.types = function (req, res) {

    mProduct
        .findAllTypes()
        .then(function (types) {
            res.json(types);
        });

};

exports.show = function (req, res) {

    var id = req.params.id;

    console.info('show - id: ' + id);

    mProduct
        .getByID(id)
        .then(function(product) {
            res.json(product[0]);
        });
};

exports.create = function (req, res) {

    var product = {
        name: req.param('name'),
        categories: req.param('categories').toString().split(','),
        description: req.param('description'),
        pic_urls: req.param('pic_urls'),
        type: req.param('type'),
        brand_id: req.param('brand_id')
    };

    console.log('create - product: ' + JSON.stringify(product));

    mProduct
        .save(product)
        .then(function (id) {
            var type = id ? true : false;
            res.json({
                success: type,
                id: id || 0
            });
        });
};

exports.update = function (req, res) {

    console.log('product body: ' + JSON.stringify(req.body));

    var product = {
        id: req.params.id,
        name: req.param('name'),
        parent_id: req.param('parent_id')
    };

    console.log('update - product: ' + JSON.stringify(product));

    mProduct
        .update(product)
        .then(function(result){
            res.json(result);
        });
};

exports.remove = function (req, res) {

    var id = req.params.id;

    console.info('remove - id: ' + id);

    mProduct
        .remove(id)
        .then(function() {
            res.json({success: true});
        });
};