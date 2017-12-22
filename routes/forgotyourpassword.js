var express = require('express');
var router = express.Router();
const {isLoggedIn} = require('./authenticate')
const forgotyourpassword_controller = require('../controllers/forgotyourpassword')

router.post('/', function(req, res, next) {
    forgotyourpassword_controller.forget(req,res);
});

module.exports = router;