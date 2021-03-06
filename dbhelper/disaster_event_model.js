var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Disaster = require('./disaster_model');

var DisasterEventSchema = new mongoose.Schema({
    name: { type: String, default: "Banjir Tamansari"},
    id_disasters : {type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' }], default: []},
    date_start: { type: Date, default: Date.now},
    date_end  : { type: Date, default: null},
  });
mongoose.model('DisasterEvent',DisasterEventSchema);
module.exports = { 
  model : mongoose.model('disaster_events', DisasterEventSchema),
  object: mongoose.model('disaster_events')
}