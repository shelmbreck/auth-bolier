// Require needed modules
let express = require('express')
let request =  require('request')

//Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

//GET /profile
router.get('/', (req, res) => {
  db.favorites.findOne({
    where: { userId: req.user.id }
  })
  .then((faves) => {
    res.render('profile/index', { faves })
  })
  .catch((err) => {
    console.log('Error in GET /faves', err)
    res.render('404')
  })
})

//GET/edit/:id
router.get('/edit/:id', (res, req) => {
  db.user.findById(req.params.id)
    .then(user => {
    res.render('profile/edit', { user: user })
    })
  })

// PUT 
router.put('/new', (req, res) => {
  db.user.update({
    name: req.body.name,
    email: req.body.email,
    password: req.body.email,
    birthday: req.body.birthday,
  })
  .then(function(user) {
      res.send('success');
    }).catch(function(error) {
      console.log(error);
    });
  res.render('results')
})

//POST 
router.post('/', (req, res) => {
  db.favorite.create({
    id: req.body.id,
    url: req.body.url,
    label: req.body.label,
    image: req.body.image,
    uri: req.body.uri,
    foodId: req.body.foodId
  })
  .then((favorites) => {
    res.redirect('profile/favorites');
  })
  .catch(err => {
    console.log(err)
    res.render('404')
  })
})

// DELETE /remove/faves
router.delete('/faves', (req, res) => {
  db.favorites.destroy({
    where: req.param.body
  })
  .then(deletedRecipe => {
    res.redirect('/results/faves')
  })
  .catch(err => {
    console.log(err)
    res.render('404')
  })
})

module.exports = router