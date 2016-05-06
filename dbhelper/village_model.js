var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VillageSchema = new mongoose.Schema({
    name: { type: String, default: "Kendalrejo"},
    location : {
      sub_district: { type: String, default: "Durenan"},
      district: { type: String, default: "Trenggalek"},
      province: { type: String, default: "Jawa Timur"}
    },
    record_weather: [{
      date_recorded : { type: Date, default: Date.now},
      condition : {type : String, default:"Hujan sangat deras"} 
    }],
    geo_region  : {type : String, default:"[{342, 5345},{3432, 535}, {32, 45}]"} 
  })

module.exports = mongoose.model('villages', VillageSchema);
