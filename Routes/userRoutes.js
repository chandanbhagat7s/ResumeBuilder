const express = require("express");
const { signUp, login, logout } = require("../Controller/authController");
const { addDetailse } = require("../Controller/usercontroller");
const { getVerified } = require("../Middleware/protect");

const Router = express.Router()




Router.get('/logout', logout)
Router.post('/signup', signUp)
Router.post('/login', login)
Router.use(getVerified).post('/addDetails', addDetailse)

// Router.use('/signup')
// Router.use('/resume').get().post().delete().patch()




module.exports = Router;
















