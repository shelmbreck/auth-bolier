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
            dietLabels: hit.recipe.dietLabels,
            healthLabels: hit.recipe.healthLabels,
            image: hit.recipe.image,
            ingredients: hit.recipe.ingredients,
            ingredientLabels: hit.recipe.ingredientLabels,
            label: hit.recipe.label,
            query: req.body.query,
            resuts: hit.recipe.results,
            shareAs: hit.recipe.shareAs,
            source: hit.recipe.source,
            uri: hit.recipe.uri,
            url: hit.recipe.url
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