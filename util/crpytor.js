var crypto = require('crypto');
var jwt    = require('jsonwebtoken');

// this is a string show in the jwt website.
var secret = 'shhhhh';

exports.md5 = function (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

exports.jwtSign = function(obj){
    return jwt.sign(obj, secret);
};