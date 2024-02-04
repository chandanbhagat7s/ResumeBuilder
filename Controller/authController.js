const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const runAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

const createTokenSendRes = (id, res, statusCode, data) => {

    let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRIR_IN
    });
    console.log("token is ", token);
    let cookieOptions = {
        expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
        ),


        secure: true,
        httpOnly: true,
        sameSite: "None",
        path: "/",
    };
    if (process.env.NODE_ENV == 'production') {

        cookieOptions.secure = true
    }
    res.cookie('jwt', token, cookieOptions);
    // res.headers['access-control-allow-credentials'] = true

    // we will set cookies 
    res.status(statusCode).json({
        status: true,
        data

    })
}

exports.signUp = runAsync(async (req, res, next) => {
    console.log(req.body);
    const { name, email, password, mobile } = req.body;
    const newUser = await User.create({ name, email, password, mobile });

    console.log(newUser);
    newUser.password = undefined;
    createTokenSendRes(newUser._id, res, 201, newUser)
});

exports.login = runAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new appError("please enter credential for get into in ", 400));
    }

    const user = await User.findOne({ email }).select('+password')


    if (!user || !await user.correctPass(password, user.password)) {

        return next(new appError("please enter valid email id and password", 400));
    }
    user.password = undefined
    createTokenSendRes(user.id, res, 200, user)

})


















