//Requirements
var express = require('express');
var app = express();
// var moment  = require('moment');
var bodyParser = require('body-parser');
var expressHbs = require('express3-handlebars');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
//mongoDB Database URL
var mongoUrl = "mongodb://neilyadig:UmcKVn8dSODT9ixV@ds045557.mongolab.com:45557/135is";
//Local Mongo Server JS
var mongoDb = require('./mongo');
var userMiddleware = require('./middleware/user');

var port = Number(process.env.PORT || 5000);

//Define Global db variable to be able to access db outside of MongoClient.connect
var db;

//Enable Cookies
app.use( bodyParser() );
app.use( cookieParser() );


//Enable Sessions and Mongo-connected Sessions
app.use( expressSession({
	secret: 'thesecret',
	store: new MongoStore({url: mongoUrl})
}) );

//Enable Handlebars
app.engine('handlebars', expressHbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(userMiddleware.checkIfLoggedIn);

////////////
// ROUTES //
////////////

//Serve up index page at /
app.get('/', function(req, res){
  var coll = mongoDb.collection('users');
  coll.find({}).toArray(function(err, users){
    res.render('index', {users:users});
  })
});
//Login Page View
app.get('/login', function(req, res){
	res.render('login');
});

app.get('/logout', function(req, res){
  delete req.session.username;
  res.redirect('/');
});

app.get('/not_allowed', function(req, res){
  res.render('not_allowed');
});

//Data Viz View
app.get('/stats', function(req, res){
	res.render('stats');
});

//About View
app.get('/about', function(req, res){
	res.render('about');
});

//Register Route
app.get('/register', function(req, res){
	res.render('register');
});

// //Playing with param query strings in URL
// app.get('/users/:user_id', function(req,res){
// 	res.send("The user id is: " + req.params.user_id);
// });

// // people?id=5
// app.get('/people', function(req, res){
// 	var id = req.query['id'];
// 	console.log("The query params are: ",req.query);
//
//
// 	res.render("people", {id: id});
// });


//Check password (hardcoded)
// function passwordIsValid(user, pass) {
// 	if (user === 'itpclass' && pass === 'letmein') {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }



// // /set_session?myValue=abc
// app.get('/set_session', function(req, res){
//   if (!req.query.myValue){
//     res.send("Please add a 'myValue' query to the URL like /set_session?myValue=abc");
//   } else {
//     req.session.myValue = req.query.myValue;
//     res.send("Session's 'myValue' was set. Visit /see_session to view it.");
//   }
//
// });
//
// app.get('/see_session', function(req, res){
// 	res.send("session.myValue: " + req.session.myValue);
// });

//ROUTES
// //Registry View
// app.get('/registry', function(req, res){
// 	res.render('registry');
// });



//Playing with mongo and URL query strings
//Normally use app.post via req.body
// database?username=abcd&status=hello
// app.get('/database', function(req, res){
// 	var username = req.query.username;
// 	var status = req.query.status;
// 	var collection = mongoDb.collection('test_insert');
// 	collection.insert({username:username, status:status}, function(err, count){
// 		if (err){
// 			console.log('Got an error!', err);
// 		}
//
// 		res.send('The count is:' + count);
// 	});
// });

// //best way to display/sort database
// app.get('/read_database', function(req,res){
// 	var collection = mongoDb.collection('test_insert');
// 	collection.find({username:'neil'}).toArray(function(err, items){
// 		var item = items[0];
// 		res.send('The user is: ' + item.status);
// 	});
// });

//Post Login User/Pass for session recognition
// app.post('/login', function(req, res){
// 	console.log('body params:', req.body);
//
// 	var username = req.body['username'];
// 	var password = req.body['password'];
//
// 	if ( passwordIsValid(username, password) ) {
// 		req.session.username = username;
// 		res.redirect('/');
// 	} else {
// 		res.render('login', {failedLogin: true});
// 	}
// });

//Step 1:
//Search Database By ShortVIN, if found, serve page "registerStep2" with Username entry
app.post('/register', userMiddleware.requireUser, function(req, res){
	var enteredVIN = req.body.shortVIN; //Grab shortVIN from the form and put it in this var
	console.log('enteredVIN', enteredVIN);
	//find car by shortVIN
	//if found, display that object AND new form to append more info to object
	//if not found, rerender form with "nothing was found" error
	//want a shortVIN matching supplied input

	var collection = mongoDb.collection('coupeData'); //Connect to Collection

	collection.findOne( {shortVIN: enteredVIN}, function(err, obj){  //MongoDB method that searches for 1 object in database {key: enteredValue}
	if (err){
		console.log('Error!!', err);
	} if (obj){ //If the obj is found and the value is not undefined
		//res.send("I found it!");
		console.log(obj);
		res.render('registerStep2', {foundVIN: obj.shortVIN, foundBuildNo: obj.buildNo});
	} else {
		res.send("We experienced an issue finding a BMW 135is with that VIN.");
	}
});
});


//Step 2:
//Add Username to matching Database Object
//Want to add , userMiddleware.requireUser ...
app.post('/registerStep2', userMiddleware.requireUser, function(req, res){
	var username = req.body.username;
	var foundVIN = req.body.foundVIN;
	var collection = mongoDb.collection('coupeData');

	collection.update(

		{ shortVIN: foundVIN },		//Find matching object in database
		{ $set: 									 //MongoDB operator (sets value/adds field and sets value if it doesn't exist) - Can use this for notes, state, etc.
		{ username: username }	 //Sets user-entered username
	},
	function(err){
		if (err) {
			console.log('Error!!', err);
		}
		res.send("Successfully Claimed!");
	});
});

//Display Table of Data
app.get('/registry', userMiddleware.requireUser, function(req, res){
	console.log("Checking logging...");
	var collection = mongoDb.collection('coupeData');
	collection.find( {},
		{
		sort:[ ["buildNo", 1] ]
		}
			).toArray( function(err, items) {
		// var item = items[0];
		if (err){
			console.log("Error!", err);
		} else {
			console.log("The Items are in an Array!", items);
		}
		res.render('registry', {objects: items});
	});
});

app.get('/signup', function(req,res){
  res.render('signup');
});

function createSalt(){
  var crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
}

function createHash(string){
  var crypto = require('crypto');
  return crypto.createHash('sha256').update(string).digest('hex');
}

// This creates a new user and calls the callback with
// two arguments: err, if there was an error, and the created user
// if a new user was created.
//
// Possible errors: the passwords are not the same, and a user
// with that username already exists.
function createUser(username, password, password_confirmation, callback){
  var coll = mongoDb.collection('users');

  if (password !== password_confirmation) {
    var err = 'The passwords do not match';
    callback(err);
  } else {
    var query      = {username:username};
    var salt       = createSalt();
    var hashedPassword = createHash(password + salt);
    var userObject = {
      username: username,
      salt: salt,
      hashedPassword: hashedPassword
    };

    // make sure this username does not exist already
    coll.findOne(query, function(err, user){
      if (user) {
        err = 'The username you entered already exists';
        callback(err);
      } else {
        // create the new user
        coll.insert(userObject, function(err,user){
          callback(err,user);
        });
      }
    });
  }
}

app.post('/signup', function(req, res){
  // The 3 variables below all come from the form
  // in views/signup.hbs
  var username = req.body.username;
  var password = req.body.password;
  var password_confirmation = req.body.password_confirmation;

  createUser(username, password, password_confirmation, function(err, user){
    if (err) {
      res.render('signup', {error: err});
    } else {

      // This way subsequent requests will know the user is logged in.
      req.session.username = user.username;

      res.redirect('/');
    }
  });
});

// This finds a user matching the username and password that
// were given.
function authenticateUser(username, password, callback){
  var coll = mongoDb.collection('users');

  coll.findOne({username: username}, function(err, user){
    if (err) {
      return callback(err, null);
    }
    if (!user) {
      return callback(null, null);
    }
    var salt = user.salt;
    var hash = createHash(password + salt);
    if (hash === user.hashedPassword) {
      return callback(null, user);
    } else {
      return callback(null, null);
    }
  });
}

app.post('/login', function(req, res){
  // These two variables come from the form on
  // the views/login.hbs page
  var username = req.body.username;
  var password = req.body.password;

  authenticateUser(username, password, function(err, user){
    if (user) {
      // This way subsequent requests will know the user is logged in.
      req.session.username = user.username;

      res.redirect('/');
    } else {
      res.render('login', {badCredentials: true});
    }
  });
});

app.use('/public', express.static('public'));

//Connect to mongoDB
mongoDb.connect(mongoUrl, function(){
  console.log('Connected to mongo at: ' + mongoUrl);
  app.listen(port, function(){
    console.log('Server is listening on port: '+port);
  });
});
