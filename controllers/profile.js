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
router.get('/edit/:id', (req, res) => {
  db.user.findByPk(req.params.id)
    .then(user => {
      res.render('profile/edit', { user })
    })
  })

// PUT (put edited user info on profile)
router.put('/edit', (req, res) => {
  db.user.update({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    birthday: req.body.birthday,
  },
  {where: { id: req.user.id } }
  )
  .then(function(user) {
      res.redirect('/profile')
    }).catch(function(error) {
        res.render('404')
    })
})

//POST a favorite
router.post('/favorites', (req, res) => {
  if( !req.user) {
    res.redirect('/auth/signup')
  } else {
    console.log(req.body)
    console.log(req.user.id)
    db.favorite.create({
      userId: req.user.id,
      url: req.body.url,
      label: req.body.label,
      image: req.body.image,
      uri: req.body.uri,
      foodId: req.body.foodId
    })
    .then((favorites) => {
      res.redirect('/profile')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/signup')
    })
  }
})


// DELETE /remove/faves
router.delete('/', (req, res) => {
  db.favorite.destroy({
    where: { id: req.body.id }
  })
  .then(deletedRecipe => {
    res.redirect('/profile')
  })
  .catch(err => {
    console.log(err)
    res.render('404')
  })
})

module.exports = router