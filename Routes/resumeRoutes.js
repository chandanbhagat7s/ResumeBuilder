const express = require('express');
const { createResume } = require('../Controller/resumeController');
const { getAllResume } = require('../Controller/usercontroller');
const Router = express.Router()


Router.post("/", createResume)

Router.get('/getAllResume', getAllResume)


module.exports = Router;














