var crypto = require('crypto');

exports.md5 = function (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};