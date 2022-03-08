const mongoose = require("mongoose");
const { Schema } = mongoose;

const TimerSchema = new Schema({
  title: String,
  color : String,
  author: String,
  format : String,
  display : String,
  type : Boolean,
  defaultValue : String,
  values : Object
});

module.exports =  mongoose.models.Timer || mongoose.model("Timer", TimerSchema);
