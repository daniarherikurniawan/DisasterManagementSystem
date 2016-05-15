var Victim = require('../dbhelper/victim_model');
var MedicalFacility = require('../dbhelper/medical_facility_model');
var RefugeeCamp = require('../dbhelper/refugee_camp_model');
var DisasterEvent = require('../dbhelper/disaster_event_model');
function intersection(array1, array2){
	/*array1 for ID that will be saved*/
	intersection = []
	for (var i = array1.length - 1; i >= 0; i--) {
		/*check for intersection in id*/
		intersect = false;
		for (var j =array2.length - 1;!intersect && j >= 0; j--) {
			if(array1[i].indexOf(array2[j])!= -1){
				intersection.push(array1[i])
				intersect = true;
			}
		}
	}
	return intersection;
}
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
		console.log(data);
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

	filter_by_status_and_age: function(data, callback){
		console.log(data);
		Victim.object
			.find({ $and:[
				{'_id': {$in: data.id_victims}},
				{'status': {$in: data.selected_status_injury}},
				{'gender':{$in: data.gender}}
			]})
			.lean()
			.populate({
				path: 'id_disaster_events',
				match: { _id: {$in: data.id_disaster_events }},
				select: 'date_start',
				model: DisasterEvent.object})
			.populate({
				path: 'is_refugee.record_refugee_camps.id_refugee_camp',
				match: {$and:[
				 	{type: {$in: data.type_refugee_camp }},
				 	{name: new RegExp(data.nama_refugee_camp, "i")}]},
				model: RefugeeCamp.object})
			.populate({
				path: 'record_medical_facilities.id_medical_facility',
				match: {$and:[
					{ type: {$in: data.type_medical_facility }},
				 	{ name: new RegExp(data.nama_medical_facility, "i")}]},
				model: MedicalFacility.object})
			.find({})
			// .select({'_id': 1, 'id_disaster_events': 1, 'birthday':1, 'is_refugee':1, 'record_medical_facilities':1})
			.exec(function(err, victims){
				newVictim = [];
				/*filter by medical facility type and name*/
				for (var i = victims.length - 1; i >= 0; i--) {
					if( data.type_medical_facility.length > 1 && victims[i].record_medical_facilities.length == 0 && data.nama_medical_facility  == undefined){

						newVictim.push(victims[i]);
					}else{
						if( victims[i].record_medical_facilities.length != 0){
							stop = false;
							for (var j = victims[i].record_medical_facilities.length - 1;!stop && j >= 0; j--) {
								if(victims[i].record_medical_facilities[j].id_medical_facility != null){
									newVictim.push(victims[i]);
									stop = true;
								}
							}
						} 
					}
				}
				victims = newVictim;
				newVictim = [];
				/*filter by refugee camp type*/
				for (var i = victims.length - 1; i >= 0; i--) {
					if( data.type_refugee_camp.length > 1 && victims[i].is_refugee.record_refugee_camps.length == 0 && data.nama_refugee_camp == undefined){
						newVictim.push(victims[i]);
					}else{
						if(victims[i].is_refugee.record_refugee_camps.length != 0){
							stop = false;
							for (var j = victims[i].is_refugee.record_refugee_camps.length - 1;!stop && j >= 0; j--) {
								// console.log(victims[i].is_refugee.record_refugee_camps[j].id_refugee_camp )
								if(victims[i].is_refugee.record_refugee_camps[j].id_refugee_camp != null){
									newVictim.push(victims[i]);
									stop = true;
								}
							}
						} 
					}
				}
				victims = newVictim;

				// console.log("aa"+victims)
				bottomAge = 0;
				topAge = 0;
				switch(data.id_selected_age_group){
					case 0: bottomAge = 0; topAge = 130; break;
					case 1: bottomAge = 0; topAge = 1; break;
					case 2: bottomAge = 1; topAge = 5; break;
					case 3: bottomAge = 5; topAge = 13; break;
					case 4: bottomAge = 13; topAge = 18; break;
					case 5: bottomAge = 18; topAge = 60; break;
					case 6: bottomAge = 60; topAge = 130; break;
				}
				/*filter the age*/
				for (var i = victims.length - 1; i >= 0; i--) {
					stop = false;
					for (var j = victims[i].id_disaster_events.length - 1;!stop && j >= 0; j--) {
						var diff = Math.floor(victims[i].id_disaster_events[j].date_start - victims[i].birthday);
						var ageDate = new Date(diff); // miliseconds from epoch
    					age =  Math.abs(ageDate.getUTCFullYear() - 1970);	
						
						if(age >= bottomAge && age < topAge){
							/*the one we search for*/
						}else{
							victims.splice(i,1);
							stop = true;
						}

					}
				}

				/*filter the gender*/
				// stop = false;
				// for (var j = victims.length - 1;!stop && j >= 0; j--) {
				// 	if(victims[j].gender != data.){
				// 		victims.splice(j,1);
				// 		stop = true;
				// 	}
				// }
				// console.log(victims)
				callback(victims);
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