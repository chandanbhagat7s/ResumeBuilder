
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
// creating schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "users must have a userName"],
    },
    email: {
        unique: true,
        type: String,
        required: [true, "user must provide email address "],
    },
    mobile: {
        type: String,
        required: [true, "user must provide Mobile number "]
    },

    password: {
        type: String,
        required: [true, "user must provide password "],
        select: false
    },
    photo: {
        type: String,
        // required: [true, "user must provide photo"]

    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 12);

    next()

})



userSchema.methods.correctPass = async function (inputpassword, password) {
    let t = await bcrypt.compare(inputpassword, password)
    console.log(t);
    return t
}

userSchema.methods.IsPasswordChanged = function (time) {
    if (this.passwordChanged) {
        let timeChanged = this.passwordChanged.getTime() / 1000;

        return time < timeChanged
    }

    return false;
}


// now creating model out of schema 



const User = mongoose.model('user', userSchema);
module.exports = User;














