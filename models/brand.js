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
    var sql = 'select id, name, pic_url from brands where mark_for_delete = false and name like ?';
    pageRequest.args = ['%' + (pageRequest.args.name || '') + '%'];
    return db.queryPage(sql, pageRequest);
};

Brand.prototype.getByID = function (id) {

    var sql = 'select '
        + 'b.id, b.name, b.pic_url, b.create_at, '
        + 'u.username as create_by, b.modify_at, um.username as modify_by '
        + 'from brands b '
        + 'inner join users u on u.id = b.create_by '
        + 'left join users um on um.id = b.modify_by '
        + 'where b.mark_for_delete = false'
        + ' and b.id = ?';

    return db.query(sql, id);
};

Brand.prototype.remove = function (id) {
    var sql = 'update brands b set mark_for_delete = true where b.id = ?';
    return db.query(sql, id);
};

Brand.prototype.update = function (brand) {

    var sql = 'update brands b '
        + 'set name = ?, pic_url = ?, modify_at = ?, modify_by = ? '
        + 'where b.id = ?',
        params = [brand.name, brand.pic_url, brand.modify_at, brand.modify_by, brand.id];

    return db.query(sql, params);
};

module.exports = new Brand();