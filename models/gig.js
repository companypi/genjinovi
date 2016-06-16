module.exports = function(){

var mongoose 	= require('mongoose');
var db 			= require('../config/env/production.js');
var Schema 		= mongoose.Schema;

// Schema for gig database
// when we grab a address they give us an object but we want a string. 
// Thats' why we have gigLocationBedfore which is an object.
// gigLocation is a string from gigLocationBedfore.
var gigSchema = new Schema({
  	gigName		: String,
  	gigDate		: String,
  	gigTime		: String,
  	gigLocation	: String,
  	gigLocationBefore : String,
  	group_id : String
});


var _model = mongoose.model('gig', gigSchema);

	// Saving new gig database
	_save = function(groupId, req, success, fail) {
		var newGig = new _model({
			gigName     : req.gigName,
	        gigDate     : req.gigDate,
	        gigTime     : req.gigTime,
	        gigLocationBefore : req.gigLocationBefore,
	        gigLocation : req.gigLocation,
	        group_id	: groupId
		});

		newGig.save(function(err, doc) {
			if(err){
				console.log(err);
			}else{
				success(doc);
			}
		})
	};

	// Getting all database from gig db
	_findAll = function(groupId, success, fail ){
		_model.find({'group_id':groupId.group_id}, function(err, doc){
			if(err){
				fail(err);
			}else{
				success(doc);
			}
		})
	};

	// Grab one gig database
	_findOne = function(id ,success, fail){
		objectID = 'ObjectId("'+id+'")';
		_model.findOne({'group_id': objectID}, function(err, doc){
			if(err){
				fail(err);
			}else{
				success(doc);
			}
		})
	};

	// Grab an id and remove databse
	_remove = function(id, success, fail){
		console.log("id in model",id);
		_model.remove({_id: id}, function(err, doc){
			if(err){
				fail(err);
			}else{
				success(doc);
			}
		})
	};


// returning all functions above here.
return{
	schema  : gigSchema,
	add 	: _save,
	remove  : _remove, 
    findAll : _findAll,
    findOne : _findOne,
    delete  : _remove
}

}();