const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  // username: String,
  // password: String,
  // name: String,
  name              : { type: String },
  familyName        : { type: String },
  username          : { type: String ,trim:true },
  email             : { type: String },
  password          : { type: String },
  profilePic        : { type: String, default: "images/user-icon.png" },
  phone             : { type: Number},
  location          : {
    type            : {type: String, default:'Point'},
    address          : {type: String, default:'WeWork Insurgentes Sur 601' },
    coordinates     : {
      type: [Number],
      default:[19.3978285, -99.1729289]}
  },
  card              : {
    name            : {type: String},
    type            : {type: String},
    number          : {type: Number},
    deadline        : {type: String},
    cvv             : {type: Number}
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const User = mongoose.model("User", userSchema);
module.exports = User;
