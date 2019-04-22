// Require needed modules
let express = require('express')
let request =  require('request')

//Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

//GET /profile
router.get('/', (req, res) => {
  res.send('PROFILE STUB CREATED')
})

// GET /results
router.get('/results', function(req, res) {
  var url = process.env.BASE_URL + req.body.query
  console.log(url)

  request(url, function(error, response, body) {
    if(error || response.statusCode != 200) {
      console.log('error', error)
      console.log('status code', response.statusCode)
      res.send('Oops - check logs')
    } else {
      results = JSON.parse(body).Search
      console.log('results', results)
      res.render('results', {
      query: req.body.query,
      results: results
      })
    }
  })
})

// DELETE /remove/faves
router.delete('/remove', (req, res) => {
  res.destroy({ where: { id: req.body.id}})
  .then(deletedPlace => {
    res.redirect('/results/faves')
  })
  .catch(err => {
    console.log(err)
    res.render('404')
  })
})
module.exports = router