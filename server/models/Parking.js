const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const parkingSchema = new Schema({
    location          : {
        type            : {type: String, default:"Point"},
        address          : {type: String, default:"WeWork Insurgentes Sur 601" },
        coordinates     : {
          type: [Number],
          default:[19.3978285, -99.1729289]}
      },
    _cars                : [{type: Schema.Types.ObjectId, ref: 'Car' }]
});


const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking; 