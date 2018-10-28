const express = require('express')
const router = express.Router()
const passport = require('passport')

//controller
const authController = require('../controllers/authController')

//load passport strategies
require('../services/passport/google')
require('../services/passport/amazon')


///******************** ///
///*** GOOGLE OAUTH *** ///
///******************** ///

//initiates google OAuth flow: '/auth/google'
router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}))


//@ route '/auth/google/callback'
//route where the user is redirected once it gives his consent
router.get('/google/callback', passport.authenticate('google',
    {
        session: false,
        failureRedirect: '/login'
    }
), authController.googleOAuth)



///******************** ///
///*** AMAZON OAUTH *** ///
///******************** ///

//initiates amazon OAuth flow: '/auth/amazon'
router.get('/amazon', passport.authenticate('amazon', {
    session: false,
    scope: ['profile']
}))


//@ route '/auth/amazon/callback'
//route where the user is redirected once it gives his consent
router.get('/amazon/callback', passport.authenticate('amazon',
    {
        session: false,
        failureRedirect: '/login'
    }
), authController.amazonOAuth)



module.exports = router