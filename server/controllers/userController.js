const { User } = require('../models/User')
const { Product } = require('../models/Product')
const cloudinary = require('cloudinary')
const mongoose = require('mongoose')


module.exports = {

    registerUser: async (req, res) => {

        try {

            //if errors
            if (req.errors)
                throw req.errors

            const { firstname, lastname, email, password } = req.body
            //checking if email not already taken
            const existingUser = await User.findOne({ 'local.email': email })

            if (existingUser) {
                return res.status(400).json({ email: 'Email already in use' })
            }

            //create a new user
            const newUser = new User({
                authMethod: 'local',
                'local.firstname': firstname,
                'local.lastname': lastname,
                'local.email': email,
                'local.password': password
            })

            //generate token
            newUser.generateToken((err, user) => {
                if (err) return res.status(400).json(err)
                res.cookie('w_auth', user.token).status(200).json(true)
            })

        } catch (err) {
            res.status(400).json(err)
        }
    },

    loginUser: async (req, res) => {

        try {

            //if errors
            if (req.errors)
                throw req.errors


            const { email, password } = req.body
            //check that user is in database
            const existingUser = await User.findOne({ 'local.email': email })
            if (!existingUser) {
                return res.status(404).json({ email: 'User not found. Please verify your email.' })
            }
            //Compare passwords
            existingUser.comparePasswords(password, (err, isMatch) => {
                if (err) return res.status(400).json(err)
                if (!isMatch) {
                    return res.status(400).json({ password: 'Password does not match. Please check again.' })
                }
                //generate token
                existingUser.generateToken((err, user) => {
                    if (err) return res.status(400).json(err)
                    res.cookie('w_auth', user.token).status(200).json(true)
                })
            })

        } catch (err) {
            res.status(400).json(err)
        }
    },

    logoutUser: async (req, res) => {

        try {
            await User.findOneAndUpdate({ _id: req.user.id }, {
                $set: {
                    token: ''
                }
            })
            res.clearCookie('w_auth').status(200).json(true)

        } catch (err) {
            res.status(400).json(err)
        }
    },

    authUser: (req, res) => {

        res.status(200).json({
            isAuth: true,
            firstname: req.user.local.firstname || req.user.google.firstname || req.user.amazon.firstname,
            lastname: req.user.local.lastname || req.user.google.lastname || req.user.amazon.lastname,
            email: req.user.local.email || req.user.google.email || req.user.amazon.email,
            role: req.user.role,
            history: req.user.history,
            cart: req.user.cart
        })
    },

    uploadImage: (req, res) => {

        cloudinary.uploader.upload(
            //path to the image uploaded
            req.files.file.path,
            //callback once image upload done
            (result) => {
                console.log(result)
                res.status(200).send({
                    public_id: result.public_id,
                    url: result.url
                })
            },
            {
                public_id: `${Date.now()}`,
                resource_type: 'auto'
            }
        )
    },

    removeImage: (req, res) => {

        //get image id from query string
        let image_id = req.query.public_id
        console.log('query', image_id)

        //tells Couldinary to delete the image
        cloudinary.uploader.destroy(image_id, (response) => {
            if (response.result != 'ok') {
                return res.status(500).json({ msg: 'Something went wrong', response })
            }
            return res.status(200).json(response)
        })
    },

    addToCart: async (req, res) => {

        try {

            //retrieve the user by his id in req.user
            let user = await User.findOne({ _id: req.user._id })

            //check if the id from the query string exists in this user cart, convert the ObjectId into a string
            //could also use ==
            let duplicate = user.cart.some(item => item._id.toString() === req.query.productId)

            if (duplicate) {
                //if duplicate exists, add 1 to quantity
                user = await User.findOneAndUpdate(
                    //don't forget to import mongoose
                    { _id: req.user._id, "cart._id": mongoose.Types.ObjectId(req.query.productId) },
                    {
                        $inc: {
                            "cart.$.quantity": 1
                        }
                    }, { new: true }
                )

                return res.status(200).json(user.cart)

            } else {

                user = await User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            cart: {
                                _id: mongoose.Types.ObjectId(req.query.productId),
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    }, { new: true }
                )

                return res.status(200).json(user.cart)
            }

        } catch (err) {

            return res.status(400).json({ sucess: false, err })
        }
    },

    removeItem: async (req, res) => {

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $pull: {
                        cart: {
                            _id: mongoose.Types.ObjectId(req.query.id)
                        }
                    }
                }, { new: true }
            )
            //our cart model: [id, quantity, date]
            let cart = user.cart

            //we want to send back all info for each product
            //get Ids fro each product in the cart
            let productIds = cart.map(item => item._id)

            //Retrieve all the info in the product collection for each Id
            let cartSummary = await Product.find(
                {
                    _id: {
                        $in: productIds
                    }
                }
            ).populate('brand')
                .populate('wood')

            //send back cart which includes the qty and cartSummary which gets all the info
            return res.status(200).json({ cart, cartSummary })

        } catch (err) {
            return res.status(400).json({ sucess: false, err })
        }
    },

    updateQuantity: async (req, res) => {

        try {
            //update quantity of an item for the current user
            const user = await User.findOneAndUpdate(
                { _id: req.user._id, "cart._id": mongoose.Types.ObjectId(req.query.productId) },
                {
                    $inc: {
                        "cart.$.quantity": parseInt(req.query.num)
                    }
                }, { new: true }
            )

            //user cart
            let cart = user.cart
            //get an array of all ids in user cart
            let productIds = cart.map(item => item._id)

            //fetch products details
            let cartSummary = await Product.find(
                {
                    _id: {
                        $in: productIds
                    }
                }
            ).populate('brand')
            .populate('wood')

            res.status(200).json({ cart, cartSummary })

        } catch (err) {
            return res.status(400).json({ sucess: false, err })
        }
    }
}