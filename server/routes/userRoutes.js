const express = require('express')
const router = express.Router()
const formidable = require('express-formidable')

//controller
const userController = require('../controllers/userController')

//middlewares
const { authenticate } = require('../middlewares/authenticate')
const { validateBody, schemas } = require('../middlewares/validate')
const { isAdmin } = require('../middlewares/isAdmin')


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
//@ Desc Logout current user
//PRIVATE route
router.get('/logout', authenticate, userController.logoutUser)

//@ GET 'api/users/uploadimage'
//@ Desc Upload an image to Cloudinary
//PRIVATE  & ADMIN route
router.post('/uploadimage', authenticate, isAdmin, formidable(), userController.uploadImage)

//@ GET 'api/users/removeimage'
//@ Desc Remove an image from cloudinary
//PRIVATE  & ADMIN route
router.get('/removeimage', authenticate, isAdmin, userController.removeImage)


module.exports = router