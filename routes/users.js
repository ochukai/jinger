var express = require('express');
var router = express.Router();

var mUser = require('../models/user');


/* GET users listing. */
router.get('/', function (req, res) {

    mUser.queryByUsername('oli').then(function (results) {
        res.json(results);
    });

});

/* GET users listing. */
router.get('/add', function (req, res) {

    var usr = {
        username: 'oliver',
        password: md5('wzh100200')
    };

    user.add(usr)
        .then(function (result) {
            console.log(result);
            res.json(result);
        });

});

/* GET users listing. */
router.get('/update/:id', function (req, res) {
    var usrId = req.params.id;

    // change the password of the user whose id is {{req.params.id}}
    var usr = {
        password: md5('www024886')
    };

    user.query('UPDATE users SET ? WHERE id = ?', [usr, usrId])
        .then(function (result) {
            res.json(result);
        });

});

/* GET users listing. */
router.get('/delete/:id', function (req, res) {
    var usrId = req.params.id;

    /*if there only one ? or ?? or (? + ??), both array or obj are allowed in the second argument*/
    user.query('DELETE FROM users WHERE id = ?', usrId)
        .then(function (result) {
            res.json(result);
        });

});


module.exports = router;