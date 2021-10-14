const mongoose = require("mongoose");
const { Schema } = mongoose;

const SondageSchema = new Schema({
  title: String,
  fields: Array,
  author: String,
});

module.exports = mongoose.model("sondages", SondageSchema);
