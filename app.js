var express = require('express');
var async = require('async');
var morgan = require('morgan');
var app = express();
var connect = require('./libs/mongodb').connect;
var server;

app.use(morgan('dev', {
	skip: function(){ return app.get('env') != 'development';}
}));
app.engine('html', require('swig').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

require('./routers')(app);

// app.use(express.static('public'));

app.use(function(err, req, res, next){
	res.end("error!!");
});


async.series([function(callback){
 	connect(callback);
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
