var express = require('express')
var db = require('../models')
var router = express.Router()


router.post('/', (req,res) => {
  db.comment.create(req.body)
  .then((createdComment) => {
    res.redirect('/recipes/' + req.body)
  })
  .catch((err) => {
    console.log('Error in POST /comments', err)
    res.render('main/404')
  })
})

module.exports = router