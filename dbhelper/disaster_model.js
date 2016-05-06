var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DisasterSchema = new mongoose.Schema({
    date_start: { type: Date, default: Date.now},
    date_end  : { type: Date, default: null},
    type    : { type: String, default: "flood"},
    cause   : { type: String, default: "broken dam"},
    id_disaster_events : { type: mongoose.Schema.Types.ObjectId, ref: 'DisasterEvent' },
    id_victims : {type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Victims' }], default: []},
    record_region : [{
      date_start  : { type: Date, default: Date.now},
      geo_region  : {type : String, default:"[{342, 5345},{3432, 535}, {32, 45}]"} 
    }]
  })

module.exports = mongoose.model('disasters', DisasterSchema);
