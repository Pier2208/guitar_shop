const express = require('express')
const router = express.Router()


//controllers
const productController = require('../controllers/productController')

//middlewares
const { authenticate } = require('../middlewares/authenticate')
const { isAdmin } = require('../middlewares/isAdmin')
const { validateBody, schemas } = require('../middlewares/validate') 


//@ POST 'api/products/brand
//@ Desc Add a new brand
//@ PRIVATE and ADMIN route
router.post('/brand', authenticate, isAdmin, validateBody(schemas.brandSchema), productController.addBrand)


//@ GET 'api/products/brands
//@ Desc Get a list of all brands
//@ PRIVATE and ADMIN route
router.get('/brands', authenticate, isAdmin, productController.fetchBrands)


//@ POST 'api/products/wood
//@ Desc Add a new wood
//@ PRIVATE and ADMIN route
router.post('/wood', authenticate, validateBody(schemas.woodSchema), productController.addWood)


//@ GET 'api/products/woods
//@ Desc Get a list of all woods
//@ PRIVATE and ADMIN route
router.get('/woods', authenticate, productController.fetchWoods)


//@ POST 'api/products/new_product
//@ Desc Add a new product
//@ PRIVATE and ADMIN route
router.post('/new_product', authenticate, validateBody(schemas.productSchema), productController.addProduct)


//@ GET 'api/products/search?id=AAABBBCCC,SSSFFFTTT&type=array/single
//@ Desc Get one or several product(s) by ID
//@ PUBLIC route
router.get('/search_by_id', productController.searchById)


//@ GET 'api/products/search?sortBy=sold&order=desc&limit=4
//@ Desc Get one or several product(s) by ID
//@ PUBLIC route
router.get('/search', productController.searchProducts)


module.exports = router