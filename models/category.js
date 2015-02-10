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
    var sql = 'select c.id, c.name, p.id as parent_id, p.name as parent_name '
        + 'from category c '
        + 'left join category p on p.id = c.parent_id '
        + 'where c.name like ?'
        + 'order by c.id desc';

    pageRequest.args = ['%' + (pageRequest.args.name || '') + '%'];
    return db.queryPage(sql, pageRequest);
};

exports.getByID = function (id) {

    var sql = 'select c.id, c.name, p.id as parent_id, p.name as parent_name '
        + 'from category c '
        + 'left join category p on p.id = c.parent_id '
        + 'where c.id = ?';

    return db.query(sql, id);
};

exports.findTopCategories = function (pageRequest) {
    var sql = 'select id, name from category where parent_id = 0';
    return db.queryPage(sql, pageRequest);
};

exports.remove = function (id) {
    // If this is a category with one more child category,
    // the column parent_id of it children categories will be set to null.
    var sql = 'delete from category where id = ?';
    return db.query(sql, id);
};

exports.update = function (category) {

    var sql = 'update category c '
            + 'set name = ?, parent_id = ? '
            + 'where c.id = ?',
        params = [category.name, category.parent_id, category.id];

    return db.query(sql, params);
};
