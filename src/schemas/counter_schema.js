const mongoose = require("mongoose");
const { Schema } = mongoose;

const CounterSchema = new Schema({
  title: String,
  color: String,
  author: String,
  value: Number,
  isStreamed: Boolean,
});

module.exports =
  mongoose.models.Counter || mongoose.model("Counter", CounterSchema);
