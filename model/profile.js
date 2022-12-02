const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerProfileSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Add The Player's Name"],
  },
  birthPlace: {
    type: String
  },
  age: {
    type: Number
  },
  image: {
    type: String,
    required: [true, "Please add a Thumbnail image"],
  },
  images: [
    {
      type: String,
    },
  ],
  height: {
    type: String,
  },
  foot: {
    type: String
  },
  position: {
    type: String
  },
  currentClub: {
    type: String
  },
  joined: {
    type: String,
  },
  contractExpiry: {
    type: String,
  },
},
  {
    timestamps: true
  },
);

module.exports = mongoose.model("profile", playerProfileSchema);
