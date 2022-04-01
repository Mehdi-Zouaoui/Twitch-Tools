const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserSchema = new Schema({
  userId: String,
  interactionTools: {
    surveys: [],
  },
  displayTools : {
      counters : [],
      timers : []
  },
  games : {}
  
});

module.exports = mongoose.models.Users || mongoose.model("Users", UserSchema);



