const Resume = require("../Models/Resume");
const appError = require("../utils/appError");
const runAsync = require("../utils/catchAsync");



//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");


const generatePdf = (user) => {




  let html;



  const data = fs.readFileSync('${__dirname}\\..\\Public\\data\\dataOfTemplates.json', 'utf8');
  // console.log(data[1].data);
  let templates = JSON.parse(data)

  // console.log(templates[0].data);
  html = templates[2].data;
  let height = templates[2].height
  let width = templates[2].width

  var options = {
    format: "A4",
    // orientation: "vartical",
    height,
    width,
    border: "",
    header: {
      height: "2mm",

    },
    footer: {
      height: "3mm",
      contents: {

      }
    }
  };
  console.log("the user is ", user);
  var users = [
    // user
    {
      name: user.userName,
      address: user.address,
      email: user.email,
      mobile: user.mobile,
      about: user.about,
      skills: [...user.skills].join(" ")
    }
  ];
  var document = {
    html: html,
    data: {
      users: users,
    },
    path: "./output.pdf",
    type: "",
  };


  pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
      // res.status(200).send({
      //   status: true,
      //   data: insertedFurther
      // })
    })
    .catch((error) => {
      // res.status(200).send({
      //   status: true,
      //   data: insertedFurther
      // })

      console.error(error);
    });
};













exports.createResume = runAsync(async (req, res, next) => {
  const {
    about,
    hobbies,
    skills,
    urls,

  } = req.body
  if (!about

    , !hobbies
  ) {

    return next(new appError("please provide this information to add something more to resume ", 400))
  }
  if (!req.user) {

    return next(new appError("please login for this functionality", 400))
  }

  if (!req.user.data) {

    return next(new appError("please complete the details page first ", 400))
  }
  const belongs = await Resume.find({ user: req.user._id })
  console.log("belongs", belongs);
  if (belongs) {
    console.log(belongs);
    // console.log("id is ",belongs);
    const insertedFurther = await Resume.findByIdAndUpdate(belongs[0]._id, {
      about,
      hobbies,
      urls,
      skills

    }, {
      new: true,
      runValidators: true
    })
    if (!insertedFurther) {
      return next(new appError("failed to store your data please try again", 500));
    }
    belongs && generatePdf(insertedFurther)
    console.log("ins", insertedFurther);

    res.status(200).send({
      status: true,
      data: insertedFurther
    })

  } else {




    const resume = await Resume.create({
      userName: req.user.userName,
      address: req.user.address,
      about,
      mobile: req.user.mobile,
      education: req.user.education,
      email: req.user.email,
      experience: req.user.experience,
      skills: req.user.skills,

      hobbies,
      urls,
      user: req.user._id

    })

    if (!resume) {
      return next(new appError("resume not created ", 400))
    }
    resume && generatePdf(resume)

    res.status(200).send({
      status: true,
      data: resume
    })

  }




})



