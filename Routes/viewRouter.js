const express = require('express');
const { home, login, signup, error } = require('../Controller/viewcontroller');
const Router = express.Router()

Router.get('/login', login)
Router.get('/', home)
Router.get('/signup', signup)
Router.get('/*', error)


module.exports = Router;








