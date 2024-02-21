const express = require("express");
const { signUp, login } = require("../Controller/authController");
const { addDetailse } = require("../Controller/usercontroller");

const Router = express.Router()




Router.post('/signup', signUp)
Router.post('/login', login)
Router.post('/addDetails', addDetailse)

// Router.use('/signup')
// Router.use('/resume').get().post().delete().patch()




module.exports = Router;
















