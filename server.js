//Dynamic Web - Server - Example 1
var http = require('http');
var fs = require('fs');

console.log('Hello, starting server...');


var server = http.createServer(function(req, res){

	var url = req.url;
	
	console.log("URL: " + req.url );

	var filepath = __dirname  + "/public" + url;

	if (url === '/'){
		url = '/index.html';
	}

	res.writeHead(200, {'Content-Type': 'text/html'});

	fs.readFile(filepath, function(err, data){
		if(err){
		console.log("Error finding file:" + err);
		res.end("Error finding file.");
		}
		res.end(data);
	});

});

});
var port = Number(process.env.PORT || 5000);
console.log('Listening on port',port);
server.listen(port);