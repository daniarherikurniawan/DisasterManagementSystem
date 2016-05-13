var DisasterEvent = require('../dbhelper/disaster_event_model');

module.exports = { 
	find: function(search_term, callback){
		DisasterEvent.object
			.find({ cause: new RegExp(search_term, "i")})
			.sort({cause: 'desc'})
			.limit(10)
			.exec(function(err, disasterEvent){
				callback(disasterEvent);
				return;
		})
	},

	findById: function(id, callback){
		DisasterEvent.object
			.findById(id)
			.exec(function(err, disasterEvent){
				callback(disasterEvent);
				return;
		})
	},

	insert: function(data){
		var disasterEventObj = new DisasterEvent.model(data);
	    disasterEventObj.save(function(err){
		  if(err) 
	    	return null;
		});
	    return disasterEventObj._id;
	},

	query_1_poin1: function(data, callback){
		/*on a certain date*/
		if(data.certain_date != null){
			current_date = new Date(data.certain_date);/*A day before the current month started*/
			next_date = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate()+1);/*A day before the current month started*/
			
			console.log(current_date);
			console.log(next_date);
			DisasterEvent.object
				.find({ $and: [
					{ 'date_start': {'$lte': next_date}},
					{ $or:[ 
						{date_end: { '$gte': next_date}},
						{date_end: null }]}
				]})
				.sort({date_start: 'desc'})
				.exec(function(err, disasterEvent){
					// console.log(DisasterEvent);

					callback(disasterEvent);
					return;
			})
		} else
		/*on a certain month*/
		if(data.certain_month != null){
			current_month = new Date(data.certain_month);/*A day before the current month started*/
			next_month = new Date(current_month.getFullYear(), current_month.getMonth()+1, 1);
			console.log(current_month);
			console.log(next_month);
			DisasterEvent.object
				.find({ $or:[{
								$and: [
							{ 'date_start': {'$gte': current_month}},
							{ 'date_end': { '$lt': next_month}},
							]},{
								$and: [
							{ 'date_start': {'$lt': next_month}},
							{ $or:[ 
								{'date_end': { '$gte': current_month}},
								{'date_end': null }]
							}]}]
					})
				.sort({date_start: 'desc'})
				.exec(function(err, disasterEvent){
					// console.log(DisasterEvent);

					callback(disasterEvent);
					return;
			})
		}
	}
}