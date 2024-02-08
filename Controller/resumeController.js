const Resume = require("../Models/Resume");
const appError = require("../utils/appError");
const runAsync = require("../utils/catchAsync");



//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");


const generatePdf = (user) => {



  // Read HTML Template
  // var html = fs.readFileSync('./templates/template.html', 'utf-8')
  // console.log(html);

  let html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Hello world!</title>
      </head>
      <body>
        <h1>User List</h1>
        <ul>
          {{#each users}}
          <li>Name: {{this.name}}</li>
          <li>Age: {{this.address}}</li>
          <br />
          {{/each}}
        </ul>
      </body>
    </html>`

  // let hhtml = `<!DOCTYPE html>
  html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background-color: #f4f4f4;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1, h2, h3 {
          margin-top: 0;
        }
        .info {
          margin-bottom: 20px;
        }
        .info h2 {
          margin-bottom: 5px;
        }
        .info p {
          margin: 5px 0;
        }
        .skills ul {
          list-style-type: none;
          padding: 0;
        }
        .skills li {
          margin-bottom: 5px;
        }
      </style>
    </head>
    <body>
    <ul>
          {{#each users}}
         
    
      <div class="container">
        <div class="info">
          <h1> {{this.name}}</h1>
          <p>Web Developer</p>
          <p>Email: {{this.email}}</p>
          <p>Phone: {{this.mobile}}</p>
        </div>
        <hr>
    
        <div class="section">
          <h2>Education</h2>
          <p>Bachelor of Science in Computer Science, XYZ University, 2015-2019</p>
        </div>
    <hr>
        <div class="section">
          <h2>Experience</h2>
          <p>Web Developer, ABC Company, 2019-Present</p>
          <ul>
            <li>Developed responsive web applications using HTML, CSS, and JavaScript.</li>
            <li>Collaborated with design and marketing teams to implement website redesigns.</li>
            <li>Optimized website performance and conducted A/B testing for user experience improvements.</li>
          </ul>
        </div>
        <hr>
    
        <div class="section skills">
          <h2>Skills</h2>
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>React.js</li>
            <li>Node.js</li>
            <li>SQL</li>
          </ul>
        </div>
        {{/each}}
      </div>
    
    </body>
    </html>
    `


  var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
      height: "45mm",
      contents: '<div style="text-align: center; font-size:2rem;font-weight:800;">RESUME</div>'
    },
    footer: {
      height: "28mm",
      contents: {
        first: 'Cover page',
        2: 'Second page', // Any page number is working. 1-based index
        default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: 'Last Page'
      }
    }
  };
  console.log("the user is ", user);
  var users = [
    // user
    {
      name: user.name,
      address: user.address,
      email: user.email,
      mobile: user.mobile
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
    })
    .catch((error) => {
      console.error(error);
    });
};













exports.createResume = runAsync(async (req, res, next) => {
  const {
    name,
    address,

    About,
    mobile,
    email,
    experience,
    DOB,
    skills,
    fresher,
    hobbies,
    workedAs,
    languages,
  } = req.body

  if (!address || !email || !mobile || !skills || !About) {
    return next(new appError("please enter all the details ", 400))
  }


  const resume = await Resume.create({
    name,
    address,
    About,
    mobile,
    email,
    experience,
    DOB,
    skills,
    fresher,
    hobbies,
    workedAs,
    languages,
  })

  if (!resume) {
    return next(new appError("resume not created ", 400))
  }
  resume && generatePdf(resume)

  res.status(200).send({
    status: true,
    data: resume
  })






})



