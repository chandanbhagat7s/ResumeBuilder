
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
// creating schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "name should be provided"],
        maxLength: 20,
        minLenght: 5
    },
    email: {
        unique: true,
        type: String,
        required: [true, "email should be provided"],
        maxLength: 40,
        minLenght: 5
    },
    mobile: {
        type: String,
        required: true,
        maxLength: 10,
        minLenght: 10
    },
    address: {
        type: String,
        maxLength: 50,
        minLenght: 5
    },
    education: {
        type: Object,
        default: {}
    },
    experience: {
        type: Object,
        default: {}

    },
    skills: {
        type: [String],
        require: true
    },
    profession: {
        type: String,

    },
    data: {
        type: Boolean,
        default: false
    },

    password: {
        type: String,
        required: [true, "user must provide password "],
        select: false
    },
    photo: {
        type: String,

    },



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


userSchema.methods.changedPasswords = async function (jwttokentime) {
    if (this.changedPasswodTime) {
        const change = parseInt(this.changedPasswodTime.getTime() / 1000, 10)
        // console.log(jwttokentime, this.changedPasswodTime.getTime() / 1000);
        // console.log(jwttokentime, change);
        // console.log(jwttokentime < change);
        return jwttokentime < change
    }


    // if user has not change the password at least once 
    return false;
}

// now creating model out of schema 



const User = mongoose.model('user', userSchema);
module.exports = User;














