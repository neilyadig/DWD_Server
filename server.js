//Requirements
var express = require('express');
var app = express();
// var moment  = require('moment');
var bodyParser = require('body-parser');
var expressHbs = require('express3-handlebars');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

//mongoDB Database Settings
var MongoClient = require('mongodb').MongoClient;
var mongoURL = "mongodb://test:test@ds045557.mongolab.com:45557/135is";

//Enable Cookies
app.use( bodyParser() );
app.use( cookieParser() );

//Enable Sessions and Mongo-connected Sessions
app.use( expressSession({
	secret: 'thesecret',
	store: new MongoStore({url: mongoURL})
}) );

//Enable Handlebars
app.engine('handlebars', expressHbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Checking for Session Cookie, then move on to next part of server.js
function checkLoggedIn(req, res, next){
	console.log('inside checkLoggedIn function');

	if (req.session.username) {
		res.locals.loggedInUsername = req.session.username;
	}
	next();
}

app.use(checkLoggedIn);

//Serve up index page at /
app.get('/', function(req, res){
	res.render('index');
});

//Playing with param query strings in URL
app.get('/users/:user_id', function(req,res){
	res.send("The user id is: " + req.params.user_id);
});

// // people?id=5
// app.get('/people', function(req, res){
// 	var id = req.query['id'];
// 	console.log("The query params are: ",req.query);
//
//
// 	res.render("people", {id: id});
// });

//Login Page View
app.get('/login', function(req, res){
	res.render('login');
});

//Check password (hardcoded)
function passwordIsValid(user, pass) {
	if (user === 'itpclass' && pass === 'letmein') {
		return true;
	} else {
		return false;
	}
}

//Post Login User/Pass for session recognition
app.post('/login', function(req, res){
	console.log('body params:', req.body);

	var username = req.body['username'];
	var password = req.body['password'];

	if ( passwordIsValid(username, password) ) {
		req.session.username = username;
		res.redirect('/');
	} else {
		res.render('login', {failedLogin: true});
	}
});

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

//Registry View
app.get('/registry', function(req, res){
	res.render('registry');
});

//Data Viz View
app.get('/stats', function(req, res){
	res.render('stats');
});

//About View
app.get('/about', function(req, res){
	res.render('about');
});

app.use('/public', express.static('public'));

var port = Number(process.env.PORT || 5000);

//Define Global db variable to be able to access db outside of MongoClient.connect
var db;

//Playing with mongo and URL query strings
//Normally use app.post via req.body
// database?username=abcd&status=hello
app.get('/database', function(req, res){
	var username = req.query.username
	var status = req.query.status;
	var collection = db.collection('test_insert');
	collection.insert({username:username, status:status}, function(err, count){
		if (err){
			console.log('Got an error!', err);
		}

		res.send('The count is:' + count);
	});
});


//best way to display/sort database
app.get('/read_database', function(req,res){
	var collection = db.collection('test_insert');
	collection.find({username:'neil'}).toArray(function(err, items){
		var item = items[0];
		res.send('The user is: ' + item.status);
	});
});

//Connect to mongoDB
//Must ensure db connection prior to running app (listening to port)
//Set _db = db to be able to access database globally
MongoClient.connect(mongoURL, function(err, _db){
	if (err) {
		console.log('There was an error: ' + err);
	}
	db = _db;
	console.log('Connected to Mongo');
	app.listen(port);
});
