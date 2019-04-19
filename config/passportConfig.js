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
  profileFields: ['id', 'email', 'displayName', 'photos', 'birthday'],
  enableProof: true
}, (facebookAccessToken, facebookRefreshToken, profile, callback) => {
  let facebookEmail = profile.emails.length ? profile.emails[0].value : ''
  // Grab the primary email facebook gave us in our local database
  db.user.findOne({
    where: { email: facebookEmail}
  })
  .then(existingUser => {
    if(existingUser && facebookEmail) {
      //This is a returning user - just update their facebook id and token
      existingUser.update({
        facebookId: profile.id,
        facebookToken: facebookAccessToken
      })
      .then(updatedUser => {
        callback(null, updatedUser)
      })
      .catch(callback)
    } else {
      // This is a new user - we need to create them
      let userNameArr = profile.displayName.split(' ')
      let photo = profile.photos.length ? profile.photos[0].value : 'https://res.cloudinary.com/shelmbreck/image/upload/v1555699463/56487464_10218758364447797_5758361476649713664_o.jpg_bdxr98.jpg'

      db.user.findOrCreate({
        where: { facebookId: profile.id },
        defaults: {
          facebookToken: facebookAccessToken,
          email: facebookEmail,
          firstname: userNameArr[0],
          lastname: userNameArr[userNameArr.length - 1],
          birthdate: profile._json.birthday,
          image: photo,
          bio: 'This account was created with facebook'
        }
      })
      .spread((foundOrCreatedUser, wasCreated) => {
        callback(null, foundOrCreatedUser)
      })
      .catch(callback)
    }
  }) 
  .catch(callback)
}))

//Make sure I can use this file in other pages
module.exports = passport