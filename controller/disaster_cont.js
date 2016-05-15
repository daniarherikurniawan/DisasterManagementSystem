var Disaster = require('../dbhelper/disaster_model');

module.exports = { 
	find: function(search_term, callback){
		Disaster.object
			.find({ cause: new RegExp(search_term, "i")})
			.sort({cause: 'asc'})
			.limit(10)
			.select({cause : 1, type : 1, _id: 1})
			.exec(function(err, disaster){
				callback(disaster);
				return;
		})
	},

	findById: function(id, callback){
		Disaster.object
			.findById(id)
			.exec(function(err, disaster){
				// console.log(disaster)
				callback(disaster);
				return;
		})
	},
	get_array_id: function(data, callback){
		Disaster.object
			.find({'_id' : { $in : data.array_id}})
			.select({id_victims : 1, type : 1, _id: 1})
			.exec(function(err, disaster){
				callback (disaster);
				return;
		})
	},
	filter_by_date_show_victim: function(data, callback){
		certain_date = new Date(data.date);
		next_date = new Date(certain_date.getFullYear(), certain_date.getMonth(), certain_date.getDate()+1);/*A day before the current month started*/
			
		Disaster.object
			.find({ $and:[
						{'_id' : { $in : data.array_id}},{

						$or:[{
							$and: [
									{ 'date_start': {'$gte': certain_date}},
									{ 'date_end': { '$lt': next_date}},
									]},{
							$and: [
								{ 'date_start': {'$lt': next_date}},
								{ $or:[ 
									{'date_end': { '$gte': certain_date}},
									{'date_end': null }]
							}]}]
						}
				]
				})
			.select({id_victims : 1, type : 1, _id: 1})
			.exec(function(err, disaster){
				callback(disaster);
				return;
		})
	},

	filter_by_month_show_victim: function(data, callback){
		current_month = new Date(data.date);/*A day before the current month started*/
		next_month = new Date(current_month.getFullYear(), current_month.getMonth()+1, 1);	
		Disaster.object
			.find({ $and:[
						{'_id' : { $in : data.array_id}},{ 
						$or:[{
								$and: [
							{ 'date_start': {'$gte': current_month}},
							{ 'date_end': { '$lt': next_month}},
							]},{
								$and: [
							{ 'date_start': {'$lt': next_month}},
							{ $or:[ 
								{'date_end': { '$gte': current_month}},
								{'date_end': null }]
							}]}]}
					]})
			.select({id_victims : 1, type : 1, _id: 1})
			.exec(function(err, disaster){
				callback(disaster);
				return;
		})
	},

	filter_by_year_show_victim: function(data, callback){
		current_year = new Date(data.date,0,1);/*A day before the current month started*/
		next_year = new Date(current_year.getFullYear()+1, current_year.getMonth(), 1);
				
		Disaster.object
			.find({ $and:[
						{'_id' : { $in : data.array_id}},{
						$or:[{
								$and: [
							{ 'date_start': {'$gte': current_year}},
							{ 'date_end': { '$lt': next_year}},
							]},{
								$and: [
							{ 'date_start': {'$lt': next_year}},
							{ $or:[ 
								{'date_end': { '$gte': current_year}},
								{'date_end': null }]
							}]}]}
					]})
			.select({id_victims : 1, type : 1, _id: 1})
			.exec(function(err, disaster){
				callback(disaster);
				return;
		})
	},

	filter_by_date: function(data, callback){
		certain_date = new Date(data.date);
		next_date = new Date(certain_date.getFullYear(), certain_date.getMonth(), certain_date.getDate()+1);/*A day before the current month started*/
			
		Disaster.object
			.find({ $and:[
						{'_id' : { $in : data.array_id}},{

						$or:[{
							$and: [
									{ 'date_start': {'$gte': certain_date}},
									{ 'date_end': { '$lt': next_date}},
									]},{
							$and: [
								{ 'date_start': {'$lt': next_date}},
								{ $or:[ 
									{'date_end': { '$gte': certain_date}},
									{'date_end': null }]
							}]}]
						}
				]
				})
			.select({cause : 1, type : 1, _id: 1})
			.exec(function(err, disaster){
				callback(disaster);
				return;
		})
	},
	insert: function(data){
		var disasterObj = new Disaster.model(data);
	    disasterObj.save(function(err){
		  if(err) 
	    	return null;
		});
	    return disasterObj._id;
	},
}