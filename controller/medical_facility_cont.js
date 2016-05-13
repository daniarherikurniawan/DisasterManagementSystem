var MedicalFacility = require('../dbhelper/medical_facility_model');

module.exports = { 
	find: function(search_term, callback){
		MedicalFacility.object
			.find({ name: new RegExp(search_term, "i")})
			.sort({name: 'desc'})
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

	insert: function(data){
		var medicalFacilityObj = new MedicalFacility.model(data);
	    medicalFacilityObj.save(function(err){
		  if(err) 
	    	return null;
		});
	    return medicalFacilityObj._id;
	}
}