var db = require('../db');

var Brand = function () {
    this.tableName = 'brands';
};

Brand.prototype.save = function (brand) {

    return db.insert(this.tableName, brand)
        .then(function (result) {
            var id = result.insertId || 0;
            if (id > 0) {
                return id;
            }
        });

};

Brand.prototype.list = function (pageRequest) {

    var sql = 'select id, name, pic_url from brands where name like ?';

    pageRequest.args = ['%' + (pageRequest.args.name || '') + '%'];

    return db.queryPage(sql, pageRequest);

};

module.exports = new Brand();