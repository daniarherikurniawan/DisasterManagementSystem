var psql = require('../dbconfig/psql_config');

module.exports = { 
	run_query: function(data, callback){
		console.log(data.input_query);
		psql.run_query(data.input_query , function(result){
			callback(result);
			return;
		})
	}
}