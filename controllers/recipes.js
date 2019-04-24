// Require needed modules
let express = require('express')
let request =  require('request')

//Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

// GET recipes from API
router.get('/', (req, res) => {
  var recipeUrl = process.env.BASE_URL
      request(recipeUrl, function(error, response, body) {
        if(error || response.statusCode != 200) {
          console.log('error', error)
          console.log('status code', response && response.statusCode)
          console.log('body:', body);
          res.send('Oops - check logs')
        } else {
          var results = JSON.parse(body)
          res.render('/recipes','result', {
            
          })
        }
      })
    })

// GET show recipes 
router.get('/show', (req, res) => {
  res.render('/recipes/show')
})

module.exports = router