var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the home page if there is an error
    failureFlash : true, // allow flash messages
  }));

module.exports = router;