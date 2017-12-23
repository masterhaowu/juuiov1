var express = require('express');
var router = express.Router();
const {isLoggedIn} = require('./authenticate')
const resetyourpassword_controller = require('../controllers/resetyourpassword')


router.get('/:token', function(req, res) {
    resetyourpassword_controller.reset(req,res);
});

router.post('/:token', function(req, res, next) {
    resetyourpassword_controller.set(req,res, next);
});


module.exports = router;

