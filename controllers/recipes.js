// Require needed modules
let express = require('express')
let request =  require('request')

//Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')
const BASE_URL = process.env.BASE_URL
const APP_ID = process.env.EDAMAM_APP_ID
const API_KEY = process.env.EDAMAM_APP_SECRET

// // GET recipes from API
router.get('/', (req, res) => {
  if(Object.keys(req.query).length !== 0){
    console.log(`Ass tits ${req.query.searchParams}`)
    var recipesUrl = `${BASE_URL}?q=${req.query.searchParams}&app_id=${APP_ID}&app_key=${API_KEY}`
    console.log(recipesUrl)
    request(recipesUrl, function(error, response, body) {
      if(error || response.statusCode != 200) {
        console.log('error', error)
        console.log('status code', response.statusCode)
        res.send('Oops - check logs')
      } else {
        results = JSON.parse(body)
        var neededItems = results.hits.map(hit=>{
          return {
            dietLabels: hit.recipes.dietLabels,
            healthLabels: hit.recipes.healthLabels,
            image: hit.recipes.image,
            ingredientLabels: hit.recipes.ingredientLabels,
            label: hit.recipes.label,
            query: req.body.query,
            resuts: hit.recipes.results,
            shareAs: hit.recipes.shareAs,
            source: hit.recipes.source,
            uri: hit.recipes.uri,
            url: hit.recipes.url
          }
        })
        res.send(neededItems)
        // res.render('results', { results })
      }
    })
  } else {
    res.render('home')
  }
})

// GET show recipes 
router.get('/show', (req, res) => {
  res.render('/recipes/show')
})

module.exports = router