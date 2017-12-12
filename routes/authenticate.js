module.exports.isLoggedIn = (req, res, next) => {
    
        // if user is authenticated in the session, return true
        if (req.isAuthenticated())
            return true;
    
        // if they aren't return false
        else
            return false;

}