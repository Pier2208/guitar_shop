const mongoose = require('mongoose')
const { Brand } = require('../models/Brand')
const { Wood } = require('../models/Wood')
const { Product } = require('../models/Product')

module.exports = {

    addBrand: async (req, res) => {

        try {
            //catch Joi errors
            if (req.errors) {
                throw req.errors
            }
            //get user input
            const { name } = req.body

            //Check if brand not already in database
            const existingBrand = await Brand.findOne({ name })
            if (existingBrand) {
                return res.status(400).json({ error: 'Brand already added to collection' })
            }

            //create brand model an save to database
            const brand = await new Brand({ name }).save()
            res.status(200).json({ msg: 'New brand added', brand: brand.name })

        } catch (err) {
            res.status(400).json(err)
        }
    },

    fetchBrands: async (req, res) => {

        try {
            const brands = await Brand.find()
            res.status(200).json(brands)

        } catch (err) {
            res.status(400).json({ error: 'Something went wrong', err })
        }
    },

    addWood: async (req, res) => {

        try {
            //get Joi errors
            if (req.errors) {
                throw req.errors
            }

            //get user input
            const { name } = req.body

            //check if wood not already in database
            const existingWood = await Wood.findOne({ name })
            if (existingWood) {
                return res.status(400).json({ error: 'Wood already added to collection' })
            }

            //create new wood and save to database
            const wood = await new Wood({ name }).save()
            res.status(200).json({ msg: 'New wood added', wood: wood.name })

        } catch (err) {
            res.status(400).json(err)
        }
    },

    fetchWoods: async (req, res) => {

        try {
            const woods = await Wood.find()
            res.status(200).json(woods)

        } catch (err) {
            res.status(400).json(err)
        }
    },

    addProduct: async (req, res) => {

        try {
            //get Joi errors
            if (req.errors) {
                throw req.errors
            }

            //check if name of product not already in database
            const existingProduct = await Product.findOne({ name: req.body.name })
            if (existingProduct) {
                return res.status(400).json({ name: 'A product with an identical name is already in database' })
            }

            //create a new product and save to database
            const product = await new Product(req.body).save()
            res.status(200).json({ success: true, product })

        } catch (err) {
            res.status(400).json(err)
        }
    },

    searchById: async (req, res) => {

        try {
            //get the type of query: might be single or array
            let type = req.query.type
            //get the id(s)
            let ids = req.query.id

            //if type = array, transform the csv into an array of ObjectId
            if (type === 'array') {
                ids = req.query.id.split(',').map(id => mongoose.Types.ObjectId(id))
            }
            console.log('after', typeof ids)

            //fetch the products whose ID is $in our array of ids
            const products = await Product.find({ _id: { $in: ids } })

            res.status(200).json(products)

        } catch (err) {
            res.status(400).json(err)
        }
    },

    searchProducts: async (req, res) => {

        try {
            let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
            let order = req.query.order ? req.query.order : 'asc'
            let limit = req.query.limit ? parseInt(req.query.limit) : null
            let skip = req.query.skip ? parseInt(req.query.skip) : 0

            const products = await Product
                .find()
                .populate('brand')
                .populate('wood')
                .sort([[sortBy, order]])
                .limit(limit)

            res.status(200).json(products)

        } catch (err) {
            res.status(400).json(err)
        }
    },

    getFilteredProducts: async (req, res) => {

        try {
            //sortBy
            let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
            //order
            let order = req.body.order ? req.body.order : 'desc'
            //limit
            let limit = req.body.limit ? parseInt(req.body.limit) : 25
            //skip
            let skip = parseInt(req.body.skip)

            //create object of criteria for mongoDB to do a search
            let findArgs = {}

            for (let key in req.body.filters) {

                if (req.body.filters[key].length > 0) {
                    
                    //price: {$gte: value, $lte: value}
                    if (key === 'price') {
                        findArgs[key] = {
                            $gte: req.body.filters[key][0],
                            $lte: req.body.filters[key][1]
                        }
                    } else {
                        //others: brands, woods, frets, prices --> field:[value]
                        findArgs[key] = req.body.filters[key]
                    }
                }
            }

            //Find filtered products
            const filteredProducts = await Product
                .find(findArgs)
                .populate('brand')
                .populate('wood')
                .sort([[sortBy, order]])
                .limit(limit)
                .skip(skip)

            res.status(200).json({
                articles: filteredProducts,
                size: filteredProducts.length
            })

        } catch (err) {
            res.status(400).json(err)
        }
    }
}