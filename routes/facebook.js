var express = require('express');
var router = express.Router();
var passport = require('passport');

// route for facebook authentication and login
router.get('/', passport.authenticate('facebook', { 
    scope : ['public_profile', 'email']
    }));

// handle the callback after facebook has authenticated the user
router.get('/callback', passport.authenticate('facebook', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the home page if there is an error
    failureFlash : true, // allow flash messages
    }));

module.exports = router;