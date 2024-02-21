const express = require('express');
const { home, login, signup, error, landingPage, resumeCompletionForm } = require('../Controller/viewcontroller');
const { isLogedIn } = require('../Middleware/protect');
const Router = express.Router()


// Router.get()
Router.get('/', landingPage)
Router.get('/login', login)
Router.get('/abc', resumeCompletionForm)
// Router.get('/signup', signup)

// Router.use(isLogedIn).get("/signup", signup)
// Router.get('/*', error)


module.exports = Router;








