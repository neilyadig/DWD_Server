//UserMiddleware

//Need ".." two dots to reference mongo.js
var mongoDb = require('../mongo');


//Checking for Session Cookie, then move on to next part of server.js
// This middleware checks if the user is logged in and sets
// req.user and res.locals.user appropriately if so.
function checkIfLoggedIn(req, res, next){
  if (req.session.username) {
    var coll = mongoDb.collection('users');
    coll.findOne({username: req.session.username}, function(err, user){
      if (user) {
        // set a 'user' property on req
        // so that the 'requireUser' middleware can check if the user is
        // logged in
        req.user = user;

        // Set a res.locals variable called 'user' so that it is available
        // to every handlebars template.
        res.locals.user = user;
      }

      next();
    });
  } else {
    next();
  }
}


module.exports = {
  checkIfLoggedIn: checkIfLoggedIn,
  requireUser: function(req, res, next){
    if (req.user) {
      next();
    } else {
      res.redirect('/not_allowed');
    }
  }
};
