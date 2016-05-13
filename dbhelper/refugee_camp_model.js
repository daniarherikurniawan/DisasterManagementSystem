var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RefugeeCampSchema = new mongoose.Schema({
    name: { type: String, default: "Camp Pengungsian Baksil"},
    address: {
      street : { type: String, default: "Jl Babakan siliwangi no 48"},
      id_village : { type: mongoose.Schema.Types.ObjectId, ref: 'Village' }
    },
    type : { type: String, default: "puskesmas"},
    capacity : { type: Number, default: 100}
  });
mongoose.model('RefugeeCamp',RefugeeCampSchema);

module.exports = { 
  model : mongoose.model('refugee_camps', RefugeeCampSchema),
  object: mongoose.model('refugee_camps')
}