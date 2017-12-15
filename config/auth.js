// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    
        'facebookAuth' : {
            'clientID'      : '1946008425672250', // your App ID
            'clientSecret'  : '0abd05be54052543f94c91acceefd1dc', // your App Secret
            'callbackURL'   : 'http://localhost:3000/facebook/callback',
            'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
            'profileFields' : ['id', 'emails', 'name'] // For requesting permissions from Facebook API
        },
};