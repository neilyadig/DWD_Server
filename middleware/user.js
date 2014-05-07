//UserMiddleware

//Need ".." two dots to reference mongo.js
var mongoDb = require('../mongo');


//Checking for Session Cookie, then move on to next part of server.js
function checkLoggedIn(req, res, next){
  console.log('inside checkLoggedIn function');

  if (req.session.username) {
    res.locals.loggedInUsername = req.session.username;
  }
  next();
}

module.exports = {
  checkLoggedIn: checkLoggedIn,
  requireUser: function(req, res, next){
    if (req.user) {
      next();
    } else {
      res.redirect('/not_allowed');
    }
  }
};
