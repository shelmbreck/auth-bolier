// Require needed modules
let = express = require('express')

//Declare an express router
let router = express.Router()

// Declare routes
router.get('/login', (req, res) => {
  res.send('Login Page Stub')
})

router.get('/signup', (req, res) => {
  res.send('Signup Page Stub')
})

module.exports = router