var RefugeeCamp = require('../dbhelper/refugee_camp_model');

module.exports = { 
	find: function(search_term, callback){
		RefugeeCamp.object
			.find({ name: new RegExp(search_term, "i")})
			.sort({name: 'desc'})
			.limit(10)
			.exec(function(err, refugee_camp){
				callback(refugee_camp);
				return;
		})
	},

	findById: function(id, callback){
		RefugeeCamp.object
			.findById(id)
			.exec(function(err, refugee_camp){
				callback(refugee_camp);
				return;
		})
	},


	insert: function(data){
		var refugeeCampObj = new RefugeeCamp.model(data);
	    refugeeCampObj.save(function(err){
		  if(err) 
	    	return null;
		});
	    return refugeeCampObj._id;
	}
}