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


const forget = (req,res) => {
    async.waterfall([
        done => {
            crypto.randomBytes(20, (err, buf) => {
                const token = buf.toString('hex');
                done(err, token);
            });
        },

        (token, done) => {
            User.findOne({ 
                where: {
                    email: req.body.email
                }
            })
            
            .then((user, err) => {

                if (!user) {
                    req.flash('error', 'No account with that email address exists.' + user.firstname);
                    return res.redirect('/');
                }
                
                if (user.faceboookid != null) {
                    req.flash('error', 'Please log in with facebook.');
                    return res.redirect('/');                   
                }
                
                else 
                    user.updateAttributes({
                        resetPasswordToken: token,
                        resetPasswordExpires: Date.now() + 3600000, // 1 hour
                    })

                    done(err, token, user);
            });
        },

        (token, user, done) => {
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
                subject: 'juu.io Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://${req.headers.host}/resetYourPassword/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
            };
            transporter.sendMail(mailOptions, err => {
                req.flash('success', `An e-mail has been sent to ${user.email} with further instructions.`);
                done(err, 'done');
            });
        }

    ], err => {
      if (err) return next(err);
      res.redirect('/');
    });
  };

    module.exports = {
        forget,
    }


