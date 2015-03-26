var db = require('../db');

exports.save = function (product) {

    var categories = product.categories;
    delete product.categories;

    var sql = 'insert into products_category(product_id, category_id) values(?, ?)';

    return db.insert('products', product)
        .then(function (result) {
            var id = result.insertId || 0;
            if (id > 0) {
                return id;
            }
        })
        .then(function (id) {
            for (var i = 0; i < categories.length; i++) {
                var cid = categories[i];
                db.query(sql, [id, cid]);
            }

            return id;
        });

};

function clone(a) {
    return JSON.parse(JSON.stringify(a));
}

exports.list = function (pageRequest) {

    var sql = 'select' +
        ' p.id,' +
        ' p.name,' +
        ' p.pic_urls,' +
        ' pt.id type_id,' +
        ' pt.name type_name,' +
        ' group_concat(c.id) category_ids,' +
        ' group_concat(c.name) category_names,' +
        ' b.id brand_id,' +
        ' b.name brand_name'
        + ' from products p'
        + ' join products_types pt on pt.id = p.type'
        + ' join brands b on b.id = p.brand_id'
        + ' join products_category pc on pc.product_id = p.id'
        + ' join category c on c.id = pc.category_id';

    var groupSql = ' group by p.id, p.name, p.pic_urls, pt.id, pt.name, b.id, b.name '
        + ' order by p.id desc';

    var inParam = clone(pageRequest.argsObj);

    var whereClauses = [];
    pageRequest.args = [];

    if (inParam.name != '') {
        whereClauses.push(' p.name like ? ');
        pageRequest.args.push('%' + (inParam.name || '') + '%');
    }

    if (inParam.brandId != 0) {
        whereClauses.push(' b.id = ? ');
        pageRequest.args.push(inParam.brandId);
    }

    if (inParam.typeId != 0) {
        whereClauses.push(' pt.id = ? ');
        pageRequest.args.push(inParam.typeId);
    }

    if (inParam.categoryId != 0) {
        whereClauses.push(' (c.id = ? or c.parent_id = ?)');
        pageRequest.args.push(inParam.categoryId);
        pageRequest.args.push(inParam.categoryId);
    }

    var whereSql = '';
    if (whereClauses.length > 0) {
        whereSql = ' where ' + whereClauses.join('and');
    }

    sql += whereSql + groupSql;

    return db.queryPage(sql, pageRequest);
};

exports.getByID = function (id) {

    var sql = 'select' +
                ' p.id,' +
                ' p.name,' +
                ' p.pic_urls,' +
                ' pt.id type_id,' +
                ' pt.name type_name,' +
                ' GROUP_CONCAT(c.id) category_ids,' +
                ' GROUP_CONCAT(c.name) category_names,' +
                ' b.id brand_id,' +
                ' b.name brand_name'
            + ' from products p'
            + ' join products_types pt on pt.id = p.type'
            + ' join brands b on b.id = p.brand_id'
            + ' join products_category pc on pc.product_id = p.id'
            + ' join category c on c.id = pc.category_id'
            + ' group by p.id, p.name, p.pic_urls, pt.id, pt.name, b.id, b.name '
            + ' order by p.id desc';

    return db.query(sql, id);
};

exports.findAllTypes = function () {

    var sql = 'select id, name from products_types';
    return db.query(sql);
};

exports.remove = function (id) {

    var sql = 'delete from products where id = ?';
    return db.query(sql, id);
};

exports.update = function (product) {

    var sql = ' ',
        params = [product.name, product.parent_id, product.id];

    return db.query(sql, params);
};
