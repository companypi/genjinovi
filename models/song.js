module.exports = function(){

// Requrie mongoose
var mongoose 	= require('mongoose');
// Database connection
var db 			= require('../config/env/production.js');
var Schema 		= mongoose.Schema;

// Schema for song db
var songSchema = new Schema({
  	artist:{
		type: String,
		default: 'Unknown artist'
	},
	title:{
		type: String,
		default: 'Unknown Title'
	},
	songDuration : {
		type: String,
		default: '00:00'
	},
	bpm: {
		type: Number,
		default: 0
	},
	gig_id: {
		type: String
	}
});


var _model = mongoose.model('song', songSchema);

	// Saving new song database
	_save = function(gig_id, req, success, fail) {
		var newGig = new _model({
			artist     		: req.artist,
	        title     		: req.title,
	        songDuration    : req.songDuration,
	        bpm 			: req.bpm,
	        gig_id			: gig_id
		});

		newGig.save(function(err, doc) {
			if(err){
				console.log(err);
			}else{
				success(doc);
			}
		})
	};

	// Getting all song db with the gig id
	_findAll = function(gigId, success, fail){
		_model.find({'gig_id':gigId.gig_id}, function(err, doc){
			if(err){
				fail(err);
			}else{
				success(doc);
			}
		})
	};

	// Find one song db
	_findOne = function(id ,success, fail){
		objectId = id._id;
		_model.findOne({'_id': objectId}, function(err, doc){
			if(err){
				fail(err);
			}else{
				success(doc);
			}
		})
	};

	// Grab object id and update new song database
	_update = function(req, success, fail){
		var id = req._id;
		var songArtist = req.artist;
		var songTitle = req.title;
		var songSongDuration = req.songDuration;
		var songBpm = req.bpm;


        _model.update({_id: id}, 
        			  {$set:{
        			  		artist:songArtist,
        			  		title:songTitle, 
        			  		songDuration: songSongDuration, 
        			  		bpm: songBpm
        			  }}, function(err,doc){
			            if (err) {
			                fail(err);
			                
			            }else{
			                success(doc);
			                
			            }
        				});
    }

    // Grab an object id and remove song database
	_remove = function(id, success, fail){
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
	schema  : songSchema,
	add 	: _save,
	remove  : _remove, 
	update  : _update,
    findAll : _findAll,
    findOne : _findOne,
    delete  : _remove
}

}();
