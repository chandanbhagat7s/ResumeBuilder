const Resume = require("../Models/Resume");
const appError = require("../utils/appError");
const runAsync = require("../utils/catchAsync");



//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");


const generatePdf = (user) => {




  let htmlt;



  const data = fs.readFileSync('${__dirname}\\..\\Public\\data\\dataOfTemplates.json', 'utf8');
  // console.log(data[1].data);
  let templates = JSON.parse(data)

  // console.log(templates[0].data);
  htmlt = templates[0].data;
  let height = templates[0].height
  let width = templates[0].width;
  let base64Data;
  const filePath = `${__dirname}\\..\\Public\\user\\${user.userName}-${user.mobile}-cover.jpg`; // Update with the actual file path
  fs.readFile(filePath, (err, data) => {
    console.log("*****CAMEEEEE*******");
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    base64Data = Buffer.from(data).toString('base64')

    base64Data = 'data:image/jpeg;base64,' + base64Data


    htmlt = htmlt.replace('<baseImage>', base64Data);
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
        skills: [...user.skills].join(" "),
        education: { ...user.education },
        experience: { ...user.experience[0] }
      }
    ];
    console.log("user is ***", users);
    var document = {
      html: htmlt,
      data: {
        users: users,
      },
      path: `./Public/files/${user._id}-output.pdf`,
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




  });


};













exports.createResume = runAsync(async (req, res, next) => {
  const {
    about,
    hobbies,
    skills,
    urls,

  } = req.body
  // if (!about

  //   , !hobbies
  // ) {

  //   return next(new appError("please provide this information to add something more to resume ", 400))
  // }
  if (!req.user) {

    return next(new appError("please login for this functionality", 400))
  }

  if (!req.user.data) {

    return next(new appError("please complete the details page first ", 400))
  }

  console.log("user ***** is ", req.user._id);
  const belongs = await Resume.find({ user: req.user._id })
  console.log("belongs", belongs);
  if (belongs.length) {
    console.log("came inside", belongs);
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



exports.updateProfileStatus = runAsync(async (req, res, next) => {

  const resume = await Resume.findOne({ user: req.user._id })

  if (!resume) {
    return next(new appError("please complete the details page first ", 400));
  }
  console.log(resume);



  await Resume.findByIdAndUpdate(resume._id, req.body, {
    runValidators: true,
    new: true
  })

  res.status(200).send({
    status: true,
    message: "profile updated successfully"
  })





})


