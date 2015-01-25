var mysql = require('mysql');
var config = require('../config');
var pool = mysql.createPool(config.dbConfig);

var when = require('when');
var util = require('util');

var poolQuery = exports.query = function (sql, params) {

    /* we can also use connection to query and then we should release the connection.*/
    var queryDirectly = function (resolve, reject, notify) {
        /*It's unnessery to pass fields to next. */
        pool.query(sql, params, function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {

                console.log('sql: ' + this.sql);
                console.log(rows);

                resolve(rows, fields);
            }
        });
    };

    return when.promise(queryDirectly);
};

/*
 * we should pass pageSize, page in this function.
 *
 * it is better to have order by clause in parameter 'sql'.
 *
 * No support for sorting.
 */
exports.queryPage = function (sql, params) {

    var args = params.args || {},

        pageSize = params.pageSize || 10,
        page = params.page || 1,

        offset = pageSize * (page - 1),
        limit = pageSize,

        countSql = util.format('select count(1) as count from (%s) t__mp', sql),
        pageSql = util.format('%s limit %d, %d', sql, offset, limit),

        tasks = [
            // for total count.
            poolQuery(countSql, args),
            // for page data.
            poolQuery(pageSql, args)
        ];

    return when.all(tasks).then(function (results) {
        var countArr = results[0];
        return {
            pageSize: pageSize,
            page: page,
            total: countArr[0].count,
            data: results[1]
        };
    });
};

exports.insert = function (tableName, source) {

    // INSERT INTO {{tableName}} SET ?
    var sql = util.format('INSERT INTO', tableName, 'SET ?');

    return when.promise(function (resolve, reject, notify) {
        /*It's unnessery to pass fields to next. */
        pool.query(sql, source, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

// exports.update = function () {};

// exports.delete = function () {};