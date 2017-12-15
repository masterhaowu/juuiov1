const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//load up nodemailer
const nodemailer = require('nodemailer');

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
const User = require('../models').User;

// load the auth variables
var configAuth = require('./auth');

// load up bcrypt
var bCrypt = require('bcrypt-nodejs')

// generating a hash
const generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

// checking if password is valid
const validPassword = function(inputPassword, userPassword) {
    return bCrypt.compareSync(inputPassword, userPassword);
};

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .then(
                user=> {
                done(null, user);                
            })
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
    },
        function(req, email, password, done) {
            // asynchronous
            // User.findAll wont fire unless data is sent back
            process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
                User.findAll({
                    where: {
                        email,
                    }
                }) 
                    .then((users, err) => {

                    // if there are any errors, return the error before anything else
                    if (err)
                        return done(err);

                    // if there it is unique, create users
                    if (users.length > 0)
                    // return email taken
                        return done(null, false, req.flash('signupMessage', 'That email is already taken or try logging in with facebook.'));

                    else  
                        User.create({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,     
                            password: generateHash(req.body.password),  
                        })
                            .then(user => {
                                mail(user.firstname,user.email);
                                return done(null, user, req.flash('success', 'Sign up success! ' + user.firstname + ' ,welcome to Juu.io!')); // create the loginMessage and save it to session as flashdata                    
                            })
                });    

            });

        }
    ));
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
        function(req, email, password, done) { // callback with email and password from our form
            process.nextTick(function() {
                
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                where: {
                    email,
                }
            }) 
                .then((user,err) => {

                    // if there are any errors, return the error before anything else
                    if (err)
                        return done(err);                    

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    
                    // if user is found but password is null
                    if (user.password == null)
                        return done(null, false, req.flash('loginMessage', 'Please log in with facebook.')); // create the loginMessage and save it to session as flashdata
                    

                    // if the user is found but the password is wrong
                    if (!validPassword(password,user.password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                    
                    // all is well, return successful user
                    else
                        return done(null, user, req.flash('success', 'Log In success! ' + user.firstname + ' ,welcome to Juu.io!')); // create the loginMessage and save it to session as flashdata
                });
            });
        }
    ));


    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================

    passport.use(new FacebookStrategy({
                // pull in our app id and secret from our auth.js file
                clientID        : configAuth.facebookAuth.clientID,
                clientSecret    : configAuth.facebookAuth.clientSecret,
                callbackURL     : configAuth.facebookAuth.callbackURL,
                profileFields   : configAuth.facebookAuth.profileFields
    },  
        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {
            // asynchronous
            // User.findAll wont fire unless data is sent back
            process.nextTick(function() {

                // find the user in the database based on their facebook id
                User.findOne({
                    where: {
                        [Op.or]: [
                            {facebookid : profile.id},
                            {email : profile.emails[0].value},
                          ]
                    }
                }) 
                    .then((user,err) => {
    
                        // if there is an error, stop everything and return that
                        // ie an error connecting to the database
                        if (err)
                            return done(err);
        
                        // if the user is found, then log them in
                        if (user) 
                            return done(null, user);
                        
                        else 
                            // if there is no user found with that facebook id, create them
                            User.create({
                                facebookid: profile.id,
                                facebooktoken: token,
                                firstname: profile.name.givenName,
                                lastname: profile.name.familyName,
                                email: profile.emails[0].value,     
                            })
                                .then(user => {
                                    mail(user.firstname,user.email);
                                    return done(null, user);  
                                })                        
                    
                });
            });
        }
    ));
};



const mail = function(firstname,email){
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.mailgun.org',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "postmaster@sandbox51efa70963784bd6a21b5f85338ea84c.mailgun.org", // generated ethereal user
                pass: "e0e97e3439813f5a619688acc9b74e8a"  // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: 'fermi.fang@juu.io', // sender address
            to: email, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: `Hello ${firstname}, welcome to juu.io!`, // plain text body
            html: `<b>Hello ${firstname}, welcome to juu.io!</b>` // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            console.log(info);
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
}   