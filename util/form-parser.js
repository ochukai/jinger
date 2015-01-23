var formidable = require('formidable');
var when = require('when');
var _ = require('underscore');

exports.parse = function (req) {

    return when.promise(function (resolve, reject, notify) {

        new formidable.IncomingForm()
            .parse(req, function (err, fields, files) {
            
                console.log('err: ' + JSON.stringify(err));
                if (err) {
                    reject(err);
                } else {
                    //console.log('fields: ' + JSON.stringify(fields));
                    //console.log('files: ' + JSON.stringify(files));
                    resolve(_.extend(fields, files));
                }
            });
        
    });
    
};