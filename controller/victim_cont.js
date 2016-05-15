var Victim = require('../dbhelper/victim_model');
var MedicalFacility = require('../dbhelper/medical_facility_model');
var RefugeeCamp = require('../dbhelper/refugee_camp_model');
var DisasterEvent = require('../dbhelper/disaster_event_model');

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

	query_5_poin3: function(data, callback){
		// console.log(data);
		if(data.id_original_village!=null){
			Victim.object
			.find({$and: [
				{'_id': {$in: data.id_victims}},
				{'id_original_village': data.id_original_village}]
			})
			.select( {_id:1, name : 1})
			.exec(function(err, victims){
				callback(victims);
			});
		}else if((data.certain_subdistrict == null) && (data.certain_district == null) && (data.certain_province == null)){
			Victim.object
			.find({'_id': {$in: data.id_victims}})
			.select( {_id:1, name : 1})
			.exec(function(err, victims){
				callback(victims);
			});
		}else {
			Victim.object
			.find({'_id': {$in: data.id_victims}})
			.populate('id_original_village', 'location')
			.select( {'id_original_village' : 1})
			.exec(function(err, victims){
				id_victims = [];
				for (var i = victims.length - 1; i >= 0; i--) {
					if ( ((victims[i].id_original_village.location.sub_district == data.certain_subdistrict) &&
						 (data.certain_subdistrict != null)) 
						|| ((victims[i].id_original_village.location.district == data.certain_district) &&
						 (data.certain_district != null)) 
						|| ((victims[i].id_original_village.location.province == data.certain_province) &&
						 (data.certain_province != null)) 
					){
						id_victims.push(victims[i]);
					}

				}
				callback(id_victims);
			});
		} 
	},
	get_id_disaster_from_user: function(data, callback){
		// console.log(data.id_victims)
		Victim.object
			.find({'_id': {$in: data.id_victims}})
			.exec(function(err, victims){
				id_disaster_events = [];
				possible_duplicate = [];
		    	for (var i = victims.length - 1; i >= 0; i--) {
		    		possible_duplicate = possible_duplicate.concat(victims[i].id_disaster_events);
		    	}
				id_disaster_events = possible_duplicate.filter(function(item, pos) {
				    return possible_duplicate.indexOf(item) == pos;
				})
				DisasterEvent.object
					.find({'_id': {$in: id_disaster_events}})
					.exec(function(err, disaster_events){
						callback(disaster_events);
					});
			});
		return;
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