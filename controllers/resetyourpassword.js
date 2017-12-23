const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//load up nodemailer
const nodemailer = require('nodemailer');

// load up the user model
const User = require('../models').User;

//load up async
const async = require('async');

//load up crypto
const crypto = require('crypto');

// load up bcrypt
var bCrypt = require('bcrypt-nodejs')

// generating a hash
const generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};


const reset = (req,res) => {
    User.findOne({ 
        where: {
            resetPasswordToken: req.params.token, 
            resetPasswordExpires: { $gt: Date.now() } 
        }
    })
    .then((user, err) => {
        if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/');
        }
        
        else {
            res.render('index', {
            user: req.user
            });
        }
    });
};


const set = (req,res,next) => {
    async.waterfall([
        done => {
            User.findOne({ 
                where: {
                    resetPasswordToken: req.params.token, 
                    resetPasswordExpires: { $gt: Date.now() }
                }
            })

            .then((user, err) => {
                
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('/');
                }
                
                else 
                    user.updateAttributes({
                        password: generateHash(req.body.password), 
                        resetPasswordToken: null,
                        resetPasswordExpires: null,
                    })
                    done(err, user);
            });
        },

        (user, done) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.mailgun.org',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "postmaster@sandbox51efa70963784bd6a21b5f85338ea84c.mailgun.org", // generated ethereal user
                    pass: "e0e97e3439813f5a619688acc9b74e8a"  // generated ethereal password
                }
            });

            let mailOptions = {
            to: user.email,
            from: 'passwordreset@juu.io',
            subject: 'Your password has been changed',
            text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
            };

            transporter.sendMail(mailOptions, err => {
            req.flash('success', 'Success! Your password has been changed.');
            done(err,'done');
            });
        }

    ], err => {
      if (err) return next(err);
      res.redirect('/');
    });
  };



module.exports = {
    reset,
    set,
}
