const mongoose = require("mongoose");
const { Schema } = mongoose;

const TimerSchema = new Schema({
  title: String,
  color : String,
  author: String,
  format : String,
  display : {type : String , default : "dial"},
  type : Boolean,
  defaultValue : String,
  values : Number,
  isStreamed : Boolean,
  started : Boolean,
});

module.exports =  mongoose.models.Timer || mongoose.model("Timer", TimerSchema);
