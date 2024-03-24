const Resume = require("../Models/Resume")
const runAsync = require("../utils/catchAsync")


exports.home = runAsync(async (req, res, next) => {
    // request for all the tour 
    // const tours = await Tour.find()
    // create template 
    // render the data on site

    res.status(200).render('home', {
        title: 'all tours',
        //  tours
    })
})

exports.landingPage = runAsync(async (req, res, next) => {
    // request for all the tour 
    // const tours = await Tour.find()
    // create template 
    // render the data on site

    res.status(200).render('landing', {
        title: 'welcome ',
        //  tours
    })
})

exports.login = runAsync(async (req, res, next) => {
    // request for all the tour 
    // const tours = await Tour.find()
    // create template 
    // render the data on site

    res.status(200).render('login', {
        title: 'Login',
        //  tours
    })
})

exports.profile = runAsync(async (req, res, next) => {
    // request for all the tour 
    // const tours = await Tour.find()
    // create template 
    // render the data on site
    let data = await Resume.find({ user: req.user._id })
    console.log("data fetched is ", data);
    // console.log("***USER DAT AIS ", req.user);

    res.status(200).render('profile', {
        title: 'ME | Profile',
        data: data[0]
    })
})


exports.resumeCompletionForm = runAsync(async (req, res, next) => {
    // request for all the tour 
    // const tours = await Tour.find()
    // create template 
    // render the data on site

    res.status(200).render('resumeForm', {
        title: 'Login',
        //  tours
    })
})
exports.others = runAsync(async (req, res, next) => {
    let data = await Resume.find({ user: req.user._id })
    console.log("data fetched is ", data);


    res.status(200).render('other', {
        title: 'Fill Extra | ..😊',
        data: data[0]
        //  tours
    })
})
exports.signup = runAsync(async (req, res, next) => {
    // request for all the tour 
    // const tours = await Tour.find()
    // create template 
    // render the data on site

    res.status(200).render('signup', {
        title: 'signup',
        //  tours
    })
})

exports.error = runAsync(async (req, res, next) => {
    // request for all the tour 
    // const tours = await Tour.find()
    // create template 
    // render the data on site

    res.status(200).render('error', {
        title: 'signup',
        //  tours
    })
})











