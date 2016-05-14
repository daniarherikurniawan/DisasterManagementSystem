var Victim = require('../dbhelper/victim_model');
var MedicalFacility = require('../dbhelper/medical_facility_model');
var RefugeeCamp = require('../dbhelper/refugee_camp_model');

module.exports = { 
	find: function(search_term, callback){
		Victim.object
			.find({ name: new RegExp(search_term, "i")})
			.limit(10)
			.select({name : 1, _id: 1})
			.sort({name: 'asc'})
			.exec(function(err, victim){
				callback(victim);
				return;
		})
	},

	find_name_medfac: function(search_term, callback){
		Victim.object
			.find({ name: new RegExp(search_term, "i")})
			.limit(10)
			.populate( {
				    path: 'record_medical_facilities.id_medical_facility',
				    model: MedicalFacility.object
				    // ,select: 'name'
				  })
			.populate( {
				    path: 'is_refugee.record_refugee_camps.id_refugee_camp',
				    model: RefugeeCamp.object
				    // ,select: 'name'
				  })
			.sort({name: 'asc'})
			.exec(function(err, victim){
				if(err) console.log(err)
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

	get_id: function(callback){
		Victim.object
			.find()
			.exec(function(err, victim){
			id_victim = [];
			for (var i = victim.length - 1; i >= 0; i--) {
				id_victim.push(victim[i]._id)
			}
			callback(id_victim);
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