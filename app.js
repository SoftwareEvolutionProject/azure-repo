var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var http = require('http')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var path = require('path')


var details = require('./routes/details.js');
var builds = require('./routes/build.js');
var prints = require('./routes/print.js');
var buildParts = require('./routes/buildParts.js');
var companies = require('./routes/companies.js');
var files = require('./routes/file.js');
var operator = require('./routes/operator.js');
var material = require('./routes/material.js');
var tests = require('./routes/tests.js');
var measurement = require('./routes/measurement.js');
var machine = require('./routes/machine.js');
var project = require('./routes/project.js');


//tell express that www is the root of our public web folder
//app.use(express.static(path.join(__dirname, 'www')));
app.use('/api', details);
app.use('/api', builds);
app.use('/api', buildParts);
app.use('/api', companies);
app.use('/api', prints);
app.use('/api', files);
app.use('/api', operator);
app.use('/api', material);
app.use('/api', tests);
app.use('/api', measurement);
app.use('/api', machine);
app.use('/api', project);




app.set('/download', path.join(__dirname, 'public'));


app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function(err, req, res, next) {
	if (err) {
		res.status(err.status || 400).send(
		{
			message: err.message 
		});
	}
	//res.header("Content-Type", "application/json; charset=utf-8");
	next();
});

var server = http.createServer(app);

server.listen(port, function(){
    console.log("Running on port: " + port);
}); 

module.exports = app;
