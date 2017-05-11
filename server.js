process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');



var app = express()

var port = process.env.PORT || 1337;

app.listen(port,function(){
	console.log('Server running at:'+port+'/');
});