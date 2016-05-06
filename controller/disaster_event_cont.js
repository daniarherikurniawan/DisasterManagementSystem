var DisasterEvent = require('../dbhelper/disaster_event_model');

module.exports = { 
	hello: function() {
		return "hai daniar";
	},

	insert: function(){
		var disasterEventObj = new DisasterEvent({name: "Banjir Palembangan"});
	    disasterEventObj.save(function(err){
		  if(err) console.log(err); 
		});
	    return ;
	}
}