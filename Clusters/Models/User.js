const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  _id: String,
  bots: {
    type: Array,
    default: []
  },
  storage: {
    type: Array,
    default: []
  }
});
module.exports = mongoose.model("User", schema);