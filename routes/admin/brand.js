var mBrand = require('../../models/brand');

exports.list = function (req, res) {

    var pageRequest = {
        page: req.param('page') || 1,
        pageSize: req.param('pageSize') || 8,
        args: {
            name: req.param('brandName')
        }
    };

    console.info('pageRequest: ' + JSON.stringify(pageRequest));

    mBrand
        .list(pageRequest)
        .then(function (page) {
            res.json(page);
        });

};

exports.show = function (req, res) {

};

exports.create = function (req, res) {

    var brand = {
        name: req.body.name,
        pic_url: req.body.picUrl
    };

    console.log('brand: ' + JSON.stringify(brand));

    mBrand
        .save(brand)
        .then(function (id) {
            var type = id ? true : false;
            res.json({
                success: true,
                id: id || 0
            });
        });

};

exports.update = function (req, res) {

};

exports.remove = function (req, res) {

};