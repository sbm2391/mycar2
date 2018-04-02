const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
    startDate        : { type: Date },
    endDate          : { type: Date },
    hour             : { type: Number},
    total            : { type: Number},
    paid             : { type: Boolean, default: false},
    _car             : { type: Schema.Types.ObjectId, ref: 'Car'},
    _creator         :   { type: Schema.Types.ObjectId, ref: 'User' }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;