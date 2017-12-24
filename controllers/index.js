const User = require('../models').User;

const index_root = (req,res,{loggedIn}) => {
    User.all()
      .then(users => res.render('index',{
        users,
        title: 'juu.io - home' ,
        isLoggedIn: loggedIn,
        user : req.user,                        
      }))
      .catch(error => res.status(400).send(error))    
}

module.exports = {
    index_root,
}