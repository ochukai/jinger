var mysql  = require('mysql');
var config = require('../config');
var pool   = mysql.createPool(config.dbConfig);

var when = require('when');
var util = require('util');

var Page = require('../util/page');

/*
 * discouraged function to get connection.
 */
exports.connection = function () {

    var getConn = function (resolve, reject, notify) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            err ? reject(err) : resolve(connection);
        });
    };

    return when.promise(getConn);
};

exports.query = function query(sql, params) {

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
        limit = pageSize;

    var countSql = util.format('select count(1) as count from (%s) t__mp', sql),
        pageSql = util.format('%s limit %d, %d', sql, offset, limit);

    var tasks = [
        // for total count.
        pool.query(countSql, args),
        // for page data.
        pool.query(pageSql, args)
    ];

    return when.all(tasks).then(function (results) {
        var countArr = results[0];

        return new Page({
            pageSize: pageSize,
            page: page,
            total: countArr[0].count,
            data: results[1],
        });
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