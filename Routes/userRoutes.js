const express = require("express")
const Router = express.Router()


Router.use('/login')
Router.use('/signup')
Router.use('/resume').get().post().delete().patch()




module.exports = Router;
















