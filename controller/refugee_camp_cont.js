var RefugeeCamp = require('../dbhelper/refugee_camp_model');

module.exports = { 
	find: function(search_term, callback){
		RefugeeCamp.object
			.find({ name: new RegExp(search_term, "i")})
			.sort({name: 'asc'})
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

	filter_by_location: function(data){
		console.log(data);
		if(data.id_original_village!=null){
			RefugeeCamp.object
			.find({'id_original_village': data.id_original_village})
			.select( {_id:1, name : 1})
			.exec(function(err, refugee_camps){
				callback(refugee_camps);
			});
		}else if((data.certain_subdistrict == null) && (data.certain_district == null) && (data.certain_province == null)){
			RefugeeCamp.object
			.find()
			.select( {_id:1, name : 1})
			.exec(function(err, refugee_camps){
				callback(refugee_camps);
			});
		}else {
			RefugeeCamp.object
			.find()
			.populate('id_original_village', 'location')
			.select( {'id_original_village' : 1})
			.exec(function(err, refugee_camps){
				id_refugee_camps = [];
				for (var i = refugee_camps.length - 1; i >= 0; i--) {
					if ( ((refugee_camps[i].id_original_village.location.sub_district == data.certain_subdistrict) &&
						 (data.certain_subdistrict != null)) 
						|| ((refugee_camps[i].id_original_village.location.district == data.certain_district) &&
						 (data.certain_district != null)) 
						|| ((refugee_camps[i].id_original_village.location.province == data.certain_province) &&
						 (data.certain_province != null)) 
					){
						id_refugee_camps.push(refugee_camps[i]);
					}

				}
				callback(id_refugee_camps);
			});
		} 
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