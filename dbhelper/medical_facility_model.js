var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MedicalFacilitySchema = new mongoose.Schema({
  name: { type: String, default: "Bumi Medika Ganesha"},
  address: {
    street : { type: String, default: "Jl Ganesha no 8"},
    id_village : { type: mongoose.Schema.Types.ObjectId, ref: 'Village' }
  },
  type : { type: String, default: "puskesmas"}
})

module.exports = { 
  model : mongoose.model('medical_facilities', MedicalFacilitySchema),
  object: mongoose.model('medical_facilities')
}