var Victim = require('../dbhelper/victim_model');

module.exports = { 
	hello: function() {
		return "hai daniar";
	},

	insert: function(){
		var victimObj = new Victim({name: "Daniar"});
	    victimObj.save(function(err){
		  if(err) console.log(err); 
		});
	    return ;
	}
}