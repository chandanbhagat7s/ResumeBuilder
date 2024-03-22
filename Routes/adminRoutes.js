
const express = require('express');
const { getVerified, isLoggedIn } = require('../Middleware/protect');
const { giveAccessTo } = require('../Middleware/access');
const { addNewTemplate } = require('../Controller/adminController');

const Router = express.Router()



// Router.use(isLoggedIn).use(giveAccessTo("ADMIN")).post('/addTemplate',)

Router.post('/addTemplate', addNewTemplate)


module.exports = Router;

