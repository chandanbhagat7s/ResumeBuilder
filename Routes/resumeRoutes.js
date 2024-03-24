const express = require('express');
const { createResume, updateProfileStatus } = require('../Controller/resumeController');
const { getAllResume } = require('../Controller/usercontroller');
const { getVerified } = require('../Middleware/protect');
const Router = express.Router()


Router.use(getVerified).post("/", createResume)
Router.use(getVerified).patch("/updateProfile", updateProfileStatus)

Router.get('/getAllResume', getAllResume)


module.exports = Router;














