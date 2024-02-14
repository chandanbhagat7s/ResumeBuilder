const User = require("../Models/User");
const appError = require("../utils/appError");
const runAsync = require("../utils/catchAsync");
const fs = require('fs');


exports.getAllResume = runAsync(async (req, res, next) => {
    let templates;
    // if (!req.user) {
    //     return next(new appError("please login to get access", 400))
    // }
    // let user = await User.findById(req.user.id);

    // if (!user.resumes) {
    //     return next(new appError("no resume found create it now", 400))
    // }
    // const ids = user.resumes;

    // read it form json file 


    fs.readFile(`${__dirname}\\..\\Public\\data\\dataOfTemplates.json`, 'utf8', (err, data) => {
        if (err) {
            next(new appError("error in reading the templates", 500))
            return;
        }
        templates = JSON.parse(data)
        console.log(templates);
        // Do something with the file content here
    });




    res.status(200).send({
        status: true
    })












})















