var mBrand = require('../../models/brand');

exports.list = function (req, res) {

    var pageRequest = {
        page: req.param('page') || 1,
        pageSize: req.param('pageSize') || 8,
        args: {
            name: req.param('brandName')
        }
    };

    console.info('list - pageRequest: ' + JSON.stringify(pageRequest));

    mBrand
        .list(pageRequest)
        .then(function (page) {
            res.json(page);
        });
};

exports.show = function (req, res) {

    var id = req.params.id;

    console.info('show - id: ' + id);

    mBrand
        .getByID(id)
        .then(function(brand) {
            //[{"id":65,"name":"asd","pic_url":"/uploads/1422366169659.jpg","create_at":"2015-01-27T13:42:50.000Z","create_by":"oliver","modify_at":null,"modify_by":null}]
            res.json(brand[0]);
        });
};

exports.create = function (req, res) {

    var brand = {
        name: req.param('name'),
        pic_url: req.param('picUrl'),
        create_at: new Date(),
        create_by: req.tokenUser.id || 0
    };

    console.log('create - brand: ' + JSON.stringify(brand));

    mBrand
        .save(brand)
        .then(function (id) {
            var type = id ? true : false;
            res.json({
                success: type,
                id: id || 0
            });
        });
};

exports.update = function (req, res) {

    console.log('brand body: ' + JSON.stringify(req.body));

    var brand = {
        id: req.params.id,
        name: req.param('name'),
        pic_url: req.param('picUrl'),
        modify_at: new Date(),
        modify_by: req.tokenUser.id || 0
    };

    console.log('update - brand: ' + JSON.stringify(brand));

    mBrand
        .update(brand)
        .then(function(result){
            res.json(result);
        });
};

exports.remove = function (req, res) {

    var id = req.params.id;

    console.info('remove-id: ' + id);

    mBrand
        .remove(id)
        .then(function(brand) {
            console.log('after remove: ' + JSON.stringify(brand));
            res.json(brand);
        });
};