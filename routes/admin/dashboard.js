var express = require('express');
var router  = express.Router();

var mUser   = require('../../models/user');
var cryptor = require('../../util/crpytor');

router.get('/', function (req, res) {
    res.render('admin/index', {
        title: 'Jinger Admin.'
    });
});

/*
 * User login.
 */
router.post('/signin', function (req, res) {

    // retrive username and password.
    var username = req.body.username;
    var password = req.body.password;

    mUser
        .login(username, cryptor.md5(password))
        .delay(1000)
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
    
    var id = req.body.id;
    
    mUser
        .menus(id)
        .then(function (result) {
            if (result && result.length > 0) {
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

module.exports = router;