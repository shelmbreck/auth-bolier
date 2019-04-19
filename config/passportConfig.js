//Include the variable from .env
require('dotenv').config()


// Require passport and any passport strategies you wish to use 
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let FaceBookStrategy = require('passport-facebook').Strategy

//Reference to the models
let db = require('../models')

//Provide serialization/deterialization functions for passport to use
// This allows passport to store the user by the id alone (serialize the user)
// and look up the full information about a user from the id (deserialize the       user)
passport.serializeUser((user, callback) => {
  // callback(errorMessage -  null if none, userData - the id only in this case)
  callback(null, user.id)
})

passport.deserializeUser((id, callback) => {
  db.user.findByPk(id)
  .then(user => {
    // callback(errorMessage -  null if none, userData - the whole user object      in this case)
    callback(null, user)
  })
  .catch(callback)
})

//Set up the LocalStrategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},(email, password, callback) => {
// Try looking up the user by the email
  db.user.findOne({
    where: { email: email}
  })
  .then(foundUser => {
    //If I didn't find a user OR id I did find a user and they have a bad   password
    if(!foundUser || !foundUser.validPassword(password)) {
      //Uh-oh this is a bad user 
      callback(null, null)
    } else {
      callback(null, foundUser)
    }
  })
  .catch(callback)
}))


//Set up Facebook Strategy
passport.use(new FaceBookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: process.env.BASE_URL + '/auth/callback/facebook',
  profileFields: ['id', 'email', 'displayName', 'photos'],
  enableProof: true
}, (accessToken, refreshToken, profile, callback) => {
  let facebookEmail = profile.emails.length ? profile.emails[0] : ''
  // Grab the primary email facebook gave us in our local database
  db.user.findOne({
    where: { email: facenookEmail}
  })
  .then(existingUser => {
    if(existingUser && facebookEmail) {
      //This is a returning user - just update their facebook id and token
    } else {
      // This is a new user - we need to create them
    }
  }) 
  .catch(callback)
}))

//Make sure I can use this file in other pages
module.exports = passport