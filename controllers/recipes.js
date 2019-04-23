// Require needed modules
let express = require('express')
let request =  require('request')

//Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

// GET recipes from API
router.get('/', (req, res) => {
  res.render('/recipes')
})

// GET show recipes 
router.get('/show', (req, res) => {
  res.render('/recipes/show')
})

module.exports = router