module.exports = function(mongoose) {

	var Victim = new mongoose.Schema({
	  id_KTP: { type: String, default: "12345678901234567"},
	  name 	: { type: String, default: "Daniar Heri"},
	  phone	: {type: [{type: String}], default: [] },
	  address	: { type: String, default: "Jl Ngrandu No 8"},
	  original_village: { type: String, default: "Kendalrejo"},
	  gender	: { type: String, default: "L"},
	  birthday	: { type: Date, default: Date.now},
	  status	: { type: String, default: "affected"},
	  is_pregnant : { type: Boolean, default: false},
	  is_deceased : { 
	  	status		: { type: Boolean, default: false},
	  	name_heirs	: { type: [{ type: String}], default: []}
	  },
	  is_major_injury	: { 
	  	status		: { type: Boolean, default: false},
	  	record_medical_facilities	: { type: [{
	  		date_enter: { type: Date, default: Date.now},
	  		id_medical_facility :{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalFacility' }	
	  	}], default: []}
	  },
	  is_refugee	: { 
	  	status		: { type: Boolean, default: false},
	  	record_refugee_camps	: { type: [{
	  		date_enter: { type: Date, default: Date.now},
	  		id_refugee_camp :{ type: mongoose.Schema.Types.ObjectId, ref: 'RefugeeCamp' }	
	  	}], default: []}
	  }
	})


	var DisasterEvent = new mongoose.Schema({
	  name: { type: String, default: "Banjir Tamansari"},
	  id_disasters : {type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' }], default: []},
	  date_start: { type: Date, default: Date.now},
	  date_end	: { type: Date, default: null},
	})


	var Disaster = new mongoose.Schema({
	  date_start: { type: Date, default: Date.now},
	  date_end	: { type: Date, default: null},
	  type 		: { type: String, default: "flood"},
	  cause		: { type: String, default: "broken dam"},
	  id_disaster_events : { type: mongoose.Schema.Types.ObjectId, ref: 'DisasterEvent' },
	  id_victims : {type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Victims' }], default: []},
	  record_region	: [{
	  	date_start	: { type: Date, default: Date.now},
	  	geo_region	: {type : String, default:"[{342, 5345},{3432, 535}, {32, 45}]"} 
	  }]
	})

	var MedicalFacility = new mongoose.Schema({
	  name: { type: String, default: "Bumi Medika Ganesha"},
	  address: {
	  	street : { type: String, default: "Jl Ganesha no 8"},
	  	id_village : { type: mongoose.Schema.Types.ObjectId, ref: 'Village' }
	  },
	  type : { type: String, default: "puskesmas"}
	})

	var RefugeeCamp = new mongoose.Schema({
	  name: { type: String, default: "Camp Pengungsian Baksil"},
	  address: {
	  	street : { type: String, default: "Jl Babakan siliwangi no 48"},
	  	id_village : { type: mongoose.Schema.Types.ObjectId, ref: 'Village' }
	  },
	  type : { type: String, default: "puskesmas"},
	  capicity : { type: Number, default: 100}
	})

	var Village = new mongoose.Schema({
	  name: { type: String, default: "Kendalrejo"},
	  location : {
		  sub_district: { type: String, default: "Durenan"},
		  district: { type: String, default: "Trenggalek"},
		  province: { type: String, default: "Jawa Timur"}
	  },
	  record_weather: [{
	  	date_recorded	: { type: Date, default: Date.now},
	  	condition	: {type : String, default:"Hujan sangat deras"} 
	  }],
	  geo_region	: {type : String, default:"[{342, 5345},{3432, 535}, {32, 45}]"} 
	})

	// declare seat covers here too
    var models = {
      Victims : mongoose.model('Victims', Victim),
      Villages : mongoose.model('Villages', Village),
      RefugeeCamps : mongoose.model('RefugeeCamps', RefugeeCamp),
      MedicalFacilities : mongoose.model('MedicalFacilities', MedicalFacility),
      Disasters : mongoose.model('Disasters', Disaster),
      DisasterEvents : mongoose.model('DisasterEvents', DisasterEvent)
    };

    return models;
}