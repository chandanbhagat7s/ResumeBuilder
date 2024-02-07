const express = require('express');
const { createResume } = require('../Controller/resumeController');
const Router = express.Router()


Router.post("/", createResume)


module.exports = Router;














