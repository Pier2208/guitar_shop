const { User } = require('../models/User')
const cloudinary = require('cloudinary')

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
            res.clearCookie('w_auth').status(200).json({ logoutSuccess: true })

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
    }
}