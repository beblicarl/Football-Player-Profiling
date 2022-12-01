const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add you fullname"],
  },
  email: {
    type: String,
    required: [true, "Please add Your Email"],
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please Add a Valid Email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please Add your Password to Protect Your Data"],
  },
  city: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    match: [
      /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      "Please Input a valid Phone Number",
    ],
  }
});

module.exports = mongoose.model("user", UserSchema);
