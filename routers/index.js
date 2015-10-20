var db = require('../libs/mongodb').db;

module.exports = function (app){

	app.get('/', function(req, res, next){
		db().collection('things').findOne({a: 1}, function(err, doc){
			if (err) return next(err);
			res.render('index', {message: JSON.stringify(doc)});
		});
	});
}