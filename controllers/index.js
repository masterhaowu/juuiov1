const index_root = (req,res,{loggedIn}) => {(
                      res.render('index',{
                        title: 'juu.io - home' ,
                        isLoggedIn: loggedIn,
                        user : req.user,                        
                      })
       )
      .catch(error => res.status(400).send(error))    
}

module.exports = {
    index_root,
}