// Require needed modules
let express = require('express')
let request =  require('request')

//Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

//GET /profile
router.get('/', (req, res) => {
  if(!req.user) {
    res.redirect('/auth/signup')
  } else {
    db.favorite.findAll({
      where: { userId: req.user.id }
    })
    .then((faves) => {
      res.render('profile/index', { faves })
    })
    .catch((err) => {
      console.log('Error in GET /favorites', err)
      res.render('404')
    })
  }
})

//GET/edit/:id
router.get('/edit/:id', (res, req) => {
  db.user.findByPk(req.params.id)
    .then(user => {
      res.render('profile/edit', { user: user })
    })
  })

// PUT 
router.put('/index/:id', (req, res) => {
  db.user.update({
    name: req.body.name,
    email: req.body.email,
    password: req.body.email,
    birthday: req.body.birthday,
  })
  .then(function(user) {
      res.redirect('/profile/index', { user })
    }).catch(function(error) {
        res.render('404')
    })
})

//POST 
router.post('/profile/favorites', (req, res) => {
  db.favorite.create({
    userId: req.user,
    url: req.body.url,
    label: req.body.label,
    image: req.body.image,
    uri: req.body.uri,
    foodId: req.body.foodId
  })
  .then((favorites) => {
    res.redirect('profile/favorites', { faves: favorites })
  })
  .catch(err => {
    console.log(err)
    res.render('404')
  })
})

// DELETE /remove/faves
router.delete('/', (req, res) => {
  db.favorite.destroy({
    where: { id: req.body.id }
  })
  .then(deletedRecipe => {
    res.redirect('/profile/favorites', { faves : favorites })
  })
  .catch(err => {
    console.log(err)
    res.render('404')
  })
})

module.exports = router