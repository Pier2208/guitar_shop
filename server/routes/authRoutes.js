const express = require('express')
const router = express.Router()
const passport = require('passport')

//controller
const authController = require('../controllers/authController')

//passport config
require('../services/passport')


///******************** ///
///*** GOOGLE OAUTH *** ///
///******************** ///

//initiates google OAuth flow: '/auth/google'
router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}))


//@ route '/api/auth/google/callback'
//route where the user is redirected once it gives his consent
router.get('/google/callback', passport.authenticate('google',
    {
        session: false,
        failureRedirect: '/'
    }
), authController.googleOAuth
)

module.exports = router