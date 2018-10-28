const mongoose = require('mongoose')
const { User } = require('../models/User')


module.exports = {

    googleOAuth: (req, res) => {
        //user
        res.cookie('w_auth', req.user.token)
            .status(200)
            .redirect('/user/dashboard')
    },

    amazonOAuth: (req, res) => {
        //user
        res.cookie('w_auth', req.user.token)
            .status(200)
            .redirect('/user/dashboard')
    }
}