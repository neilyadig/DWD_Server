//Express + Handlebars
var express = require('express');
var expressHbs = require('express3-handlebars');
var handlebars = expressHbs.create({
	defaultLayout: 'main'
});
var request = require('request');
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/page2', function(req, res){
	res.render('page2');
});

var collectionData = require('./collectionData');

app.get('/collection/:objectName', function(req, res){
		var objectName = req.params.objectName;
		var data = collectionData[objectName];
		res.render('collection', data);
	});



app.use('/public',
		express.static('public'));

app.listen(5000);
