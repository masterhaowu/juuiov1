const index_root = (req,res,{loggedIn}) => {(
                      res.render('index',{
                        title: 'juu.io - home' ,
                        isLoggedIn: loggedIn,
                      })
       )
      .catch(error => res.status(400).send(error))    
}

module.exports = {
    index_root,
}