var mongoose = require('mongoose');
var db = require('../dbhelper/dbschema')(mongoose);

module.exports = { 
	hello: function() {
		return "hai daniar";
	},

	signUp: function(){
		var victimObj = new db.Victims({name: "Daniar"});
	    victimObj.save();
	    return ;
	}
}