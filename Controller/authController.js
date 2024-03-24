const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const runAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

const sharp = require('sharp')
const multer = require('multer')

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




exports.logout = function (req, res) {
    console.log("came");
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })

    res.status(200).json({ status: true })
}


// upload the image

const multerStorage = multer.memoryStorage();



// create filterObject
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {

        cb(null, true)
    } else {
        cb(new appError('please upload only image files', 400), false)

    }
}

exports.resizeImage = runAsync(async (req, res, next) => {
    console.log(req.body);
    console.log("file is ", req.file);
    if (!req.file) {
        return next(new appError("please upload a file", 400))
    }


    // cover image
    req.body.coverImage = `${req.body.userName}-${req.body.mobile}-cover.jpg`
    await sharp(req.file.buffer).toFormat('jpeg').toFile(`Public/user/${req.body.coverImage}`)





    next()


})


// destination(for saving files) of multer package 
const uploads = multer(
    {
        storage: multerStorage,
        fileFilter: multerFilter
    }
)

exports.uploadImages = uploads.single('coverImage')



exports.signUp = runAsync(async (req, res, next) => {
    console.log(req.body);
    const { userName, email, password, mobile } = req.body;
    const newUser = await User.create({ userName, email, password, mobile });
    if (!newUser) {
        return next(new appError("something went wrrong  ", 500));

    }
    console.log(newUser);
    newUser.password = undefined;
    createTokenSendRes(newUser._id, res, 201, newUser)
});

exports.getUser = runAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id)



    if (!user) {
        return next(new appError("user Not found", 400));
    }
    console.log("user is", user);
    res.status(200).send({
        status: true,
        data: user
    })



})
exports.login = runAsync(async (req, res, next) => {
    console.log(req);
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




















