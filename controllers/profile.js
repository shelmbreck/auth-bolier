// Require needed modules
let = express = require('express')

//Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

//GET /profile
router.get('/', (req, res) => {
  res.send('PROFILE STUB CREATED')
})

module.exports = router