var Disaster = require('../dbhelper/disaster_model');
var Village = require('../dbhelper/village_model');
var psql = require('../dbconfig/psql_config');
var async = require("async");

function createQuery(geom1, geom2){
	// console.log(JSON.stringify(geom1))
	result =  
	"SELECT ST_Intersects("+
		"ST_GeomFromGeoJSON('"+
			JSON.stringify(geom1) +
		"'),"+
		"ST_GeomFromGeoJSON('"+
			JSON.stringify(geom2) +
		"')"+
	");";
	return result;
}

function forQuery(item_village, villages_affected, geom_village, stop, record_region, callback){
	async.forEach(record_region, function iteratee(record, callback) {
		geom_disaster = JSON.parse(record.geo_region).geometry;
		query = createQuery(geom_village, geom_disaster);

		psql.run_query(query , function(result){
			console.log(result.rows[0].st_intersects)
			if(result.rows[0].st_intersects){
				villages_affected.push(item_village._id);
				console.log(villages_affected)
				console.log("ahooooooooooooooooooy"+item_village._id)
			}
			
			if(stop && (record_region.indexOf(record) == (record_region.length-1)))
				callback("done")

		})

		// setTimeout(function(){ 
		// 	console.log(record_region.indexOf(record))
		// }, 0);
	}, function(result){
		console.log(result+"   "+stop)
		if(stop)
			callback("done")
	})
		
	// async.forEach(disaster.record_region, function iteratee(record, callback1) {
	// 	

	// 	

	// 	
	// }, function (err, result) {
	//     if (err) console.error(err.message);
	//     // configs is now a map of JSON data
	// 	    callback2("xsxsx","ijndsc")
	// 		console.log(villages_affected)
	//     console.log("1=======: "+err)
	// })
}

function callMe(villages_affected, stop,disasters, item_village, callback){
	geom_village = JSON.parse(item_village.geo_region).geometry;
	async.forEach(disasters, function iteratee(disaster, callback) {
		
		forQuery(item_village,villages_affected, geom_village,(stop && (disasters.indexOf(disaster) == (disasters.length-1))), disaster.record_region, function(result){
			console.log((stop && (disasters.indexOf(disaster) == (disasters.length-1)))+" "+item_village.name); 
		
			if( (result == "done") && (stop && (disasters.indexOf(disaster) == (disasters.length-1)))){
				callback("stop")
			}
		})
		
		

	}, function (result) {
		console.log("==============")
	    console.log(result)
	    if(result == "stop"){
			console.log("callbackstop")
			callback("stop")
		}else{
			callback("terus")
		}
	})

}

function interceptEachData(village, disasters, villages_affected, callback){
	console.log("length "+village.length)
	console.log("length "+disasters.length)
	async.forEach(village, function iteratee(item_village,  callback) {

		geom_village = JSON.parse(item_village.geo_region).geometry;
		callMe(villages_affected, village.indexOf(item_village) == village.length-1,disasters, item_village, function( response){
			if(response == "stop" )
				callback("janjuk")
		})
		
	}, function ( result) {
	    console.log("3-------- "+result)
		callback("anjiing")
	})
}

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
	get_disasters_geom: function(data, callback1){
		villages_affected = [];
		Disaster.object
			.find({'_id' : { $in : data.id_disasters}})
			.exec(function(err, disaster){
				Village.object
					.find()
					.select({name : 1 , geo_region : 1})
					.exec(function(err, village){
						interceptEachData(village, disaster, villages_affected, function(result){
							console.log("siniiii "+villages_affected)
							callback1(villages_affected);
							return;
						})
				})
				
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