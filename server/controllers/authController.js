const mongoose = require('mongoose')
const { User } = require('../models/User')


module.exports = {

    googleOAuth: (req, res) => {
        res.cookie('x_auth', req.user.token).status(200).json({ loginSuccess: true })
    }
}