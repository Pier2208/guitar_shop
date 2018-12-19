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

//@ POST 'api/users/uploadimage'
//@ Desc Upload an image to Cloudinary
//PRIVATE  & ADMIN route
router.post('/uploadimage', authenticate, isAdmin, formidable(), userController.uploadImage)

//@ GET 'api/users/removeimage'
//@ Desc Remove an image from cloudinary
//PRIVATE  & ADMIN route
router.get('/removeimage', authenticate, isAdmin, userController.removeImage)

//@ POST 'api/users/addtocart'
//@ Desc Add a product to cart
//PRIVATE route
router.post('/addtocart', authenticate, userController.addToCart)

//@ GET 'api/users/remove_item?id=""
//@ Desc Remove item from cart
//PRIVATE route
router.get('/remove_item', authenticate, userController.removeItem)

//@ PUT 'api/users/update_quantity?id=""&num=""
//@ Desc Update quantity
//PRIVATE route
router.get('/update_quantity', authenticate, userController.updateQuantity)



module.exports = router