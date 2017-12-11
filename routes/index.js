var express = require('express');
var router = express.Router();
const {isLoggedIn} = require('./authenticate')
const index_controller = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  const loggedIn = isLoggedIn(req,res,next)
  index_controller.index_root(req,res,{loggedIn});
});

module.exports = router;
