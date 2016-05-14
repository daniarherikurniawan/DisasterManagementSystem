var Village = require('../dbhelper/village_model');

module.exports = { 
	find: function(search_term, callback){
		Village.object
			.find({ name: new RegExp(search_term, "i")})
			.sort({name: 'asc'})
			.limit(10)
			.exec(function(err, village){
				callback(village);
				return;
		})
	},
	findById: function(id, callback){
		Village.object
			.findById(id)
			.exec(function(err, village){
				callback(village);
				return;
		})
	},

	insert: function(data){
		var villageObj = new Village.model(data);
	    villageObj.save(function(err){
		  if(err) 
	    	return null;
		});
	    return villageObj._id;
	}
}