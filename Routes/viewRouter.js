const express = require('express');
const { home, login, signup, error, landingPage, resumeCompletionForm, others } = require('../Controller/viewcontroller');
const { isLoggedIn } = require('../Middleware/protect');
const Router = express.Router()


// Router.get()
Router.get('/login', login)
Router.use(isLoggedIn).get('/', landingPage)
Router.get('/completeDetails', resumeCompletionForm)
Router.get('/signup', signup)
Router.get('/others', others)

// Router.use(isLogedIn).get("/signup", signup)
// Router.get('/*', error)


module.exports = Router;








