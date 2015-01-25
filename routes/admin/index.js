var express      = require('express');
var router       = express.Router();
var path         = require('path')
var _            = require('underscore');
var formParser   = require('../../util/form-parser.js');
var cryptor      = require('../../util/cryptor');
var fileOperator = require('../../util/file-operate.js');
var mUser        = require('../../models/user');
var brand        = require('./brand');

router.get('/', function (req, res) {
    res.render('admin/index', {
        title: 'Jinger Admin.'
    });
});

router.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    var path = name;

    if (name.lastIndexOf('-') > 0) {
        //path = name.split('-').join('/');
        // this only replace the first '-'
        path = name.replace(/-/, '/');
    }

    res.render('admin/partials/' + path);
});

router.post('/uploads', function (req, res) {
    formParser
        .parse(req)
        .then(function (allFields) {
            console.log('in index allFields: ' + JSON.stringify(allFields));
            // {
            //     "file": {
            //         "size": 2071180,
            //         "path": "C:\\Users\\xiaoyee\\AppData\\Local\\Temp\\upload_10d621dd5e2bb2bfd5fb53a783c1a4ce",
            //         "name": "教程JPG.jpg",
            //         "type": "image/jpeg",
            //         "mtime": "2015-01-18T13:00:55.337Z"
            //     }
            // }
            var file = allFields.file,
                srcPath = file.path,
                name = file.name,

                getFileName = function (filename) {
                    var dotPos = filename.lastIndexOf('.'),
                        extensionIncludeDot = filename.substring(dotPos);
                    return Date.now() + extensionIncludeDot;
                };

            var filePath = "/uploads/" + getFileName(name),
                destPath = path.join(__dirname, '../../public' + filePath);

            console.log('__dirname: ' + __dirname);
            console.log('destPath: ' + destPath);

            fileOperator.copy(srcPath, destPath);

            console.log('file upload success.');

            res.json({
                url: filePath
            });
        })
        .catch(function (err) {
            console.error('error: ' + JSON.stringify(err));
        });
});

/*
 * User login.
 */
router.post('/signin', function (req, res) {

    // retrieve username and password.
    var username = req.body.username;
    var password = req.body.password;

    mUser
        .login(username, cryptor.md5(password))
        .then(function (result) {
            if (result) {
                result.success = true;
                res.json(result);
                return;
            }

            res.json({
                success: false
            });
        });
});

router.post('/signup', function (req, res) {

    var username = req.body.username,
        password = req.body.password;

    // TODO valid

    mUser
        .regist(username, cryptor.md5(password))
        .then(function (id) {
            var user = {
                id: id,
                username: username
            };

            var token = cryptor.jwtSign(user);
            return mUser.saveToken(id, token);
        })
        .then(function (result) {
            if (result && result.length > 0) {
                var user = result[0];
                user.success = true;
                res.json(user);
            }
        });

});

router.post('/mymenus', function (req, res) {
    console.log('get my menus(user id) before.');
    var id = req.tokenUser.id;
    console.log('get my menus(user id): ' + id);

    mUser
        .menus(id)
        .then(function (result) {
            // if a log successfully user doesn't have any menus.
            if (result && result.length >= 0) {
                res.json({
                    success: true,
                    menus: result
                });
            } else {
                res.json({
                    success: false
                });
            }
        });

});


// other models

// brand 
router
    .route('/brand')
    .get(brand.list)
    .post(brand.create);

router
    .route('/brand/:id')
    .get(brand.show)
    .put(brand.update)
    .delete(brand.remove);

module.exports = router;