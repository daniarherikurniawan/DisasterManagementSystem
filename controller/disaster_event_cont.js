var DisasterEvent = require('../dbhelper/disaster_event_model');

module.exports = { 
	find: function(search_term, callback){
		DisasterEvent.object
			.find({ cause: new RegExp(search_term, "i")})
			.sort({cause: 'desc'})
			.limit(10)
			.exec(function(err, DisasterEvent){
				callback(DisasterEvent);
				return;
		})
	},

	insert: function(data){
		console.log("masuuuuk"+data);
		var disasterEventObj = new DisasterEvent.model(data);
	    disasterEventObj.save(function(err){
		  if(err) 
	    	return null;
		});
	    return disasterEventObj._id;
	}
}