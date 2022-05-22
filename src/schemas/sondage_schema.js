const mongoose = require("mongoose");
const { Schema } = mongoose;

const SondageSchema = new Schema({
  title: String,
  fields: Array,
  author: String,
  index: String,
  color: String,
  isStreamed: Boolean,
  started: Boolean,
});

module.exports =
  mongoose.models.Sondages || mongoose.model("Sondages", SondageSchema);
