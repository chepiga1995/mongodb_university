var	MongoClient = require('mongodb').MongoClient;
var db_demo = undefined;
var connect = function(callback){
	MongoClient.connect("mongodb://localhost:27017/demo", function(error, db){
		db_demo = db;
		callback.apply(null, arguments);
	});
}

exports.db = db_demo;
exports.connect = connect;