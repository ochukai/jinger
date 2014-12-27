var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', function (req, res) {
    res.render('admin/index', {
        title: 'Jinger Admin.'
    });
});

module.exports = router;