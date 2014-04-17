//Express + Handlebars
var express = require('express');
var expressHbs = require('express3-handlebars'); //Handlebars Module
var handlebars = expressHbs.create({
	defaultLayout: 'main'
	//Main refers to my boilerplate/customized HTML in /layouts
});
var request = require('request');
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); //Set the view engine to handlebars

app.get('/', function(req, res){
	res.render('index');
});

app.get('/page2', function(req, res){
	res.render('page2');
});

var collectionData = require('./collectionData');

app.get('/collection/:objectName', function(req, res){ //Reference to data comes in dynamically thru /:objectName via the URL
		var objectName = req.params.objectName;
		var data = collectionData[objectName]; //refers to JavaScript object in collectionData.js
		res.render('collection', data); //renders 'data' from collectionData.js
	});

app.get('/users/:user_id', function(req, res){
	res.send("The user ID is: " + req.params.user_id);

})

app.get('/login', function(req,res){
	res.render('login');

})

app.use('/public',
	express.static('public'));

app.listen(5000);
