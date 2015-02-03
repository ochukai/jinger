var db = require('../db');

exports.queryByToken = function (token) {

    var sql = 'select id, username from users where username = ?';
    return db.query(sql, [token]);
};

exports.register = function (username, password) {

    var user = {
        username: username,
        password: password
    };

    return db.insert(this.tableName, user)
        .then(function (result) {
            var id = result.insertId || 0;
            if (id > 0) {
                return id;
            }
        });
};

/*
 * save token and select user to return.
 */
exports.saveToken = function (id, token) {

    var sql = 'update users set token = ? where id = ?';

    return db.query(sql, [token, id])
        .then(function (result) {
            if (result.affectedRows === 1) {
                var selectSql = 'select id, username, token from users where id = ?';
                return db.query(selectSql, [id]);
            }
        });
};

exports.login = function (username, password) {

    var columns = ['id', 'username', 'password', 'token'],
        sql = 'select ?? from ?? where username = ?';

    return db.query(sql, [columns, this.tableName, username])
        .then(function (rows) {
            if (rows && rows.length > 0) {
                var user = rows[0];
                if (user.password == password) {
                    delete user.password;
                    return user;
                }
            }
        });
};

exports.menus = function (id) {
    var sql = 'select p.id as id, p.name as name, p.value as url ' 
        + 'from roles r ' 
        + 'join users_roles ur on ur.role_id = r.id ' 
        + 'join roles_permissions rp on rp.role_id = r.id ' 
        + 'join permissions p on p.id = rp.permission_id ' 
        + 'where ur.user_id = ?';
    
    return db.query(sql, id);
};
