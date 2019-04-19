// Require needed modules
let = express = require('express')

//Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

//Include our custom middleware to ensure that users are logged in
let adminLoggedIn = require('../middleware/adminLoggedIn')
let loggedIn = require('../middleware/loggedIn')

//GET /profile
router.get('/', loggedIn, (req, res) => {
  res.render('profile/index')
})

router.get('/admin', adminLoggedIn, (req, res) => {
  res.render('profile/admin')
})

module.exports = router