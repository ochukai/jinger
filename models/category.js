var db = require('../db');

exports.save = function (category) {
    return db.insert('category', category)
        .then(function (result) {
            var id = result.insertId || 0;
            if (id > 0) {
                return id;
            }
        });
};

exports.list = function (pageRequest) {
    var sql = 'select id, name, parent_id from category where name like ?';
    pageRequest.args = ['%' + (pageRequest.args.name || '') + '%'];
    return db.queryPage(sql, pageRequest);
};

exports.getByID = function (id) {

    var sql = 'select c.id, c.name, p.id as parent_id, p.name as parent_name '
        + 'from category c '
        + 'inner join category p on p.id = c.parent_id '
        + 'where c.id = ?';

    return db.query(sql, id);
};

exports.findTopCategories = function (pageRequest) {
    var sql = 'select id, name from category where parent_id = 0';
    return db.queryPage(sql, pageRequest);
};

exports.remove = function (id) {
    var sql = 'delete from category where b.id = ?';
    return db.query(sql, id);
};

exports.update = function (category) {

    var sql = 'update category c '
            + 'set name = ?, parent_id = ? '
            + 'where c.id = ?',
        params = [category.name, category.parent_id, category.id];

    return db.query(sql, params);
};
