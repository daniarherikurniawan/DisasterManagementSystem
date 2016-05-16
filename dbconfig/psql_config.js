var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://daniar:daniar@localhost:5432/spatial_data';
var client = new pg.Client(connectionString);

module.exports = { 
	connect: function(){
		client.connect();
	},
	run_query: function(data, callback){
		/*establish connection*/
		query = client.query(data, function(result){
			query.on('end', function(result) { 
				callback(result);
			  	return;
			});
		});
	},

	close_connection: function(){
		/*end connection*/
	  	client.end();
	}
}