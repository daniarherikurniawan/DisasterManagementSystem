var Disaster = require('../dbhelper/disaster_model');

module.exports = { 
	hello: function() {
		return "hai daniar";
	},

	insert: function(){
		var disasterObj = new Disaster({cause: "Sungai tersumbat"});
	    disasterObj.save(function(err){
		  if(err) console.log(err); 
		});
	    return ;
	}
}