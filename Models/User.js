
const mongoose = require("mongoose")
// creating schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "users must have a userName"],
        unique: [true, "user name already use please try diffrent "]
    },
    email: {
        type: String,
        required: [true, "user must provide email address "]
    },

    password: {
        type: String,
        required: [true, "user must provide password "]
    },
    photo: {
        type: String,
        required: [true, "user must provide photo"]

    }
})


// now creating model out of schema 
const User = mongoose.model('user', userSchema);
module.exports = User;














