var RefugeeCamp = require('../dbhelper/refugee_camp_model');

module.exports = { 
	hello: function() {
		return "hai daniar";
	},

	insert: function(){
		var refugeeCampObj = new RefugeeCamp({name: "Banjir Palembangan"});
	    refugeeCampObj.save(function(err){
		  if(err) console.log(err); 
		});
	    return ;
	}
}