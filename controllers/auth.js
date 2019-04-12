// Require needed modules
let = express = require('express')

//Declare an express router
let router = express.Router()

// Declare routes
router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', (req, res) => {
  res.send('Reached the route POST to /auth/login')
})
router.get('/signup', (req, res) => {
  res.render('Signup Page Stub')
})

router.post('/signup', (req, res) => {
  res.send('Signup Page Stub')
})

module.exports = router