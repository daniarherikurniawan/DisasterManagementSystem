var MedicalFacility = require('../dbhelper/medical_facility_model');

module.exports = { 
	find: function(search_term, callback){
		MedicalFacility.object
			.find({ name: new RegExp(search_term, "i")})
			.sort({name: 'asc'})
			.limit(10)
			.exec(function(err, medical_facility){
				callback(medical_facility);
				return;
		})
	},

	findById: function(id, callback){
		MedicalFacility.object
			.findById(id)
			.exec(function(err, medical_facility){
				callback(medical_facility);
				return;
		})
	},

	filter_by_location: function(data, callback){
		console.log(data);
		if(data.id_original_village!=null){
			MedicalFacility.object
			.find({$and: [
				{'_id': {$in: data.id_refugee_camps}},
				{'address.id_village': data.id_original_village}]
			})
			.select( {_id:1, name : 1})
			.exec(function(err, refugee_camps){
				callback(refugee_camps);
			});
		}else if((data.certain_subdistrict == '') && (data.certain_district == '') && (data.certain_province == '')){
			callback("parameter_invalid")
		}else {
			MedicalFacility.object
			.find({'_id': {$in: data.id_refugee_camps}})
			.populate('address.id_village', 'location')
			.select( {'address.id_village' : 1, 'name' : 1})
			.exec(function(err, refugee_camps){

				id_refugee_camps = [];
				for (var i = refugee_camps.length - 1; i >= 0; i--) {
					if ( ((refugee_camps[i].address.id_village.location.sub_district == data.certain_subdistrict) &&
						 (data.certain_subdistrict != '')) 
						|| ((refugee_camps[i].address.id_village.location.district == data.certain_district) &&
						 (data.certain_district != '')) 
						|| ((refugee_camps[i].address.id_village.location.province == data.certain_province) &&
						 (data.certain_province != '')) 
					){
						id_refugee_camps.push(refugee_camps[i]);
					}
				}
				console.log("nih"+id_refugee_camps)
				callback(id_refugee_camps);
			});
		} 
	},
	get_every_id: function(callback){
		MedicalFacility.object
		.find()
		.select( {_id:1, name : 1})
		.exec(function(err, refugee_camps){
			// console.log(refugee_camps)
			callback(refugee_camps);
		});
	},

	insert: function(data){
		var medicalFacilityObj = new MedicalFacility.model(data);
	    medicalFacilityObj.save(function(err){
		  if(err) 
	    	return null;
		});
	    return medicalFacilityObj._id;
	}
}