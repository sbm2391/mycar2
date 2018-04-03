const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const carSchema = new Schema({
  brand             : { type: String },
  model             : { type: String },
  year              : { type: Number },
  gadges            : [{ type: String }],
  price             : { type: Number },
  img               : { type: String },
  index             : { type: Number},
  location          : {
    type            : {type: String, default:"Point"},
    address          : {type: String, default:"WeWork Insurgentes Sur 601" },
    coordinates     : {
      type: [Number],
      default:[19.3978285, -99.1729289]}
  }
});


const Car = mongoose.model("Car", carSchema);
module.exports = Car; 