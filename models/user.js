var db = require('../db');

var User = function () {
    this.tableName = 'users';
};

User.prototype.queryByUsername = function (username) {

    var columns = ['id', 'username'],
        pUsername = username || '',

        sql = 'select ?? from ?? where username like ?';

    return db.query(sql, [columns, this.tableName, pUsername + '%']);

};

module.exports = new User();