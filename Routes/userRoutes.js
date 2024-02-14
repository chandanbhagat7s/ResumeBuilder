const express = require("express");
const { signUp, login } = require("../Controller/authController");
const Router = express.Router()




Router.post('/signup', signUp)
Router.post('/login', login)
Router.get('/resumes',)
// Router.use('/signup')
// Router.use('/resume').get().post().delete().patch()




module.exports = Router;
















