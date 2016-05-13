var Disaster = require('../dbhelper/disaster_model');

module.exports = { 
	find: function(search_term, callback){
		Disaster.object
			.find({ cause: new RegExp(search_term, "i")})
			.sort({cause: 'desc'})
			.limit(10)
			.exec(function(err, disaster){
				callback(disaster);
				return;
		})
	},

	findById: function(id, callback){
		Disaster.object
			.findById(id)
			.exec(function(err, disaster){
				callback(disaster);
				return;
		})
	},

	insert: function(data){
		var disasterObj = new Disaster.model(data);
	    disasterObj.save(function(err){
		  if(err) 
	    	return null;
		});
	    return disasterObj._id;
	}
}