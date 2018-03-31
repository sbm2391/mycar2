const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const parkingSchema = new Schema({
    location          : {
        type            : {type: String, default:"Point"},
        address          : {type: String},
        coordinates     : {type: [Number]}
      },
    _cars                : [{type: Schema.Types.ObjectId, ref: 'Car' }]
});


const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking; 