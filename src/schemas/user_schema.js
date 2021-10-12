const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
    //avis et commentaire , like
});

module.exports = mongoose.models.User || mongoose.model('users', UserSchema);


