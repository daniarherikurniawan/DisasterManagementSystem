var MedicalFacility = require('../dbhelper/medical_facility_model');

module.exports = { 
	hello: function() {
		return "hai daniar";
	},

	insert: function(){
		var medicalFacilityObj = new MedicalFacility({name: "Banjir Palembangan"});
	    medicalFacilityObj.save(function(err){
		  if(err) console.log(err); 
		});
	    return ;
	}
}