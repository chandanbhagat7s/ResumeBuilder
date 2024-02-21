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











