var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VictimSchema = new mongoose.Schema({
  id_KTP: { type: String, default: "12345678901234567"},
  name 	: { type: String, default: "Daniar Heri"},
  phone	: {type: [{type: String}], default: [] },
  address	: { type: String, default: "Jl Ngrandu No 8"},
  id_original_village: { type: mongoose.Schema.Types.ObjectId, ref: 'Village' },
  gender	: { type: String, default: "L"},
  birthday	: { type: Date, default: Date.now},
  status	: { type: String, default: "affected"},
  is_pregnant : { type: Boolean, default: false},
  is_deceased : { 
  	status		: { type: Boolean, default: false},
  	name_heirs	: { type: [{ type: String}], default: []}
  },
  record_medical_facilities	: { type: [{
  		date_start: { type: Date, default: Date.now},
      date_end: { type: Date, default: Date.now},
  		id_medical_facility :{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalFacility' }	
  	}], default: []
  },
  is_refugee	: { 
  	status		: { type: Boolean, default: false},
  	record_refugee_camps	: { type: [{
      date_start: { type: Date, default: Date.now},
      date_end: { type: Date, default: Date.now},
  		id_refugee_camp :{ type: mongoose.Schema.Types.ObjectId, ref: 'RefugeeCamp' }	
  	}], default: []}
  },
  id_disaster_events: {type : [{type: mongoose.Schema.Types.ObjectId, ref: 'DisasterEvent' }], default: []},
});
mongoose.model('Victim',VictimSchema);

module.exports = { 
  model : mongoose.model('victims', VictimSchema),
  object: mongoose.model('victims')
}