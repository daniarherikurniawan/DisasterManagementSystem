var Victim = require('../dbhelper/victim_model');

module.exports = { 
	find: function(search_term, callback){
		Victim.object
			.find({ name: new RegExp(search_term, "i")})
			.sort({name: 'desc'})
			.limit(10)
			.exec(function(err, victim){
				callback(victim);
				return;
		})
	},

	findById: function(id, callback){
		Victim.object
			.findById(id)
			.exec(function(err, victim){
				callback(victim);
				return;
		})
	},

	insert: function(data){
		var victimObj = new Victim.model(data);
	    victimObj.save(function(err){
		  if(err) 
	    	return null;
		});
	    return victimObj._id;
	}
}