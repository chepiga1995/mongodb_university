var express = require('express');
var async = require('async');
var	MongoClient = require('mongodb').MongoClient;
var morgan = require('morgan');
var app = express();
var db;
var server;

app.use(morgan('dev', {
	skip: function(){ return app.get('env') != 'development';}
}));
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.get('/', function(req, res, next){
	db.collection('things').findOne({a: 1}, function(err, doc){
		if (err) return next(err);
		res.render('index', {message: JSON.stringify(doc)});
	});
});
// app.use(express.static('public'));
app.use(function(err, req, res, next){
	res.end("error!!");
});


async.series([function(callback){
 	MongoClient.connect("mongodb://localhost:27017/demo", callback);
}, function(callback){
	var temp_server = app.listen(3000, function(err){
		callback(err, temp_server);
	});
}], function(err, results){
	if(err){
		console.error("Fatal error");
		process.exit(1);
	} else {
		console.log("Server started and connected to database");
		db = results[0];
		server = results[1];
	}
})
