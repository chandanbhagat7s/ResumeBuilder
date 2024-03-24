const express = require("express");
const { signUp, login, logout, getUser, resizeImage, uploadImages } = require("../Controller/authController");
const { addDetailse } = require("../Controller/usercontroller");
const { getVerified } = require("../Middleware/protect");

const Router = express.Router()



Router.post('/login', login)
Router.post('/signup', uploadImages, resizeImage, signUp)

Router.use(getVerified).get('/logout', logout)
Router.get('/getUser', getUser)
Router.use(getVerified).post('/addDetails', addDetailse)

// Router.use('/signup')
// Router.use('/resume').get().post().delete().patch()




module.exports = Router;
















