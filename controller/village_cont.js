var Village = require('../dbhelper/village_model');

module.exports = { 
	hello: function() {
		return "hai daniar";
	},

	insert: function(){
		var villageObj = new Village({name: "Daniar"});
	    villageObj.save(function(err){
		  if(err) console.log(err); 
		});
	    return ;
	}
}