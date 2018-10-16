const express = require('express')
const router = express.Router()

//controller
const userController = require('../controllers/userController')

//middlewares
const { authenticate } = require('../middlewares/authenticate')
const { validateBody, schemas } = require('../middlewares/validate')


//@ POST 'api/users/register'
//@ Desc Register a new user
//PUBLIC route
router.post('/register', validateBody(schemas.registerSchema), userController.registerUser)

//@ POST 'api/users/register'
//@ Desc Register a new user
//PUBLIC route
router.post('/login', validateBody(schemas.loginSchema), userController.loginUser)

//@ GET 'api/users/auth'
//@ Desc Fetch current user
//PRIVATE route
router.get('/auth', authenticate, userController.authUser)

//@ GET 'api/users/logout'
//@ Desc Fetch current user
//PRIVATE route
router.get('/logout', authenticate, userController.logoutUser)


module.exports = router