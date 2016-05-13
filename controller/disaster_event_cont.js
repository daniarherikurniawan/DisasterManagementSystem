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
				.find({  $or:[{
								$and: [
							{ 'date_start': {'$gte': current_date}},
							{ 'date_end': { '$lt': next_date}},
							]},{
								$and: [
							{ 'date_start': {'$lt': next_date}},
							{ $or:[ 
								{'date_end': { '$gte': current_date}},
								{'date_end': null }]
							}]}]
				})
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
		} else
		/*on a certain year*/
		if(data.certain_year != null){
			current_year = new Date(data.certain_year,0,1);/*A day before the current month started*/
			next_year = new Date(current_year.getFullYear()+1, current_year.getMonth(), 1);
			console.log(current_year);
			console.log(next_year);
			DisasterEvent.object
				.find({ $or:[{
								$and: [
							{ 'date_start': {'$gte': current_year}},
							{ 'date_end': { '$lt': next_year}},
							]},{
								$and: [
							{ 'date_start': {'$lt': next_year}},
							{ $or:[ 
								{'date_end': { '$gte': current_year}},
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
	},

	query_1_poin2: function(data, callback){
		console.log(data);
		/*on a certain date*/
		if(data.certain_date1 != null && data.certain_date2 != null){
			console.log("data A");
			current_date = new Date(data.certain_date1);/*A day before the current month started*/
			current_date2 = new Date(data.certain_date2);
			next_date = new Date(current_date2.getFullYear(), current_date2.getMonth(), current_date2.getDate()+1);
			
			console.log(current_date);
			console.log(next_date);
			DisasterEvent.object
				.find({ $or:[{
								$and: [
							{ 'date_start': {'$gte': current_date}},
							{ 'date_end': { '$lt': next_date}},
							]},{
								$and: [
							{ 'date_start': {'$lt': next_date}},
							{ $or:[ 
								{'date_end': { '$gte': current_date}},
								{'date_end': null }]
							}]}]
				})
				.sort({date_start: 'desc'})
				.exec(function(err, disasterEvent){
					// console.log(DisasterEvent);
					callback(disasterEvent);
					return;
			})
		} else
		/*on a certain month*/
		if(data.certain_month1 != null && data.certain_month2 != null){
			console.log("data B");
			current_month = new Date(data.certain_month1);/*A day before the current month started*/
			current_month2 = new Date(data.certain_month2);
			next_month = new Date(current_month2.getFullYear(), current_month2.getMonth()+1, current_month2.getDate());
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
		} else
		/*on a certain year*/
		if(data.certain_year1 != null && data.certain_year2 != null){
			console.log("data C");
			current_year = new Date(data.certain_year1,0,1);/*A day before the current month started*/
			current_year2 = new Date(data.certain_year2,0,1);
			next_year = new Date(current_year2.getFullYear()+1, current_year2.getMonth(), current_year2.getDate());
			console.log(current_year);
			console.log(next_year);
			DisasterEvent.object
				.find({ $or:[{
								$and: [
							{ 'date_start': {'$gte': current_year}},
							{ 'date_end': { '$lt': next_year}},
							]},{
								$and: [
							{ 'date_start': {'$lt': next_year}},
							{ $or:[ 
								{'date_end': { '$gte': current_year}},
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
		console.log("query is not proccessed");
	}
}