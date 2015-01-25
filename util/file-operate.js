var fs = require('fs');

exports.copy = function (src, dest) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
}