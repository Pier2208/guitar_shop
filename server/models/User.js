const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()


const userSchema = new Schema({
    authMethod: {
        type: String,
        enum: ['local', 'facebook', 'google'],
        required: true
    },
    local: {
        firstname: {
            type: String,
            maxlength: 100,
            trim: true
        },
        lastname: {
            type: String,
            maxlength: 100,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            minlength: 8
        }
    },
    facebook: {
        id: String
    },
    google: {
        id: String,
        email: String
    },
    role: {
        type: String,
        enum: ['default', 'admin'],
        default: 'default'
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    token: {
        type: String
    }
})

userSchema.pre('save', async function (next) {

    if (this.authMethod !== 'local' || !this.isModified("local.password")) {
        next()

    } else {

        try {
            //before saving user to DB, encrypt password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(this.local.password, salt)

            this.local.password = hash
 
            next()

        } catch (err) {
            next(err)
        }


    }
})

userSchema.methods.generateToken = async function (done) {

    try {
        //create payload
        const payload = {
            id: this._id
        }
        //generate token
        const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '12h' })
        //add token to this newUser
        this.token = token
        //save newUser to db --> run the pre hook function
        const user = await this.save()

        done(null, user)

    } catch (err) {
        done(err, null)
    }
}

userSchema.methods.comparePasswords = async function(password, done) {

    try {
        const isMatch = await bcrypt.compare(password, this.local.password)
        done(null, isMatch)

    } catch(err) {
        done(err, false)
    }
}

userSchema.statics.findByToken = async function(token, done) {

    try {
        const user = this
        //decode token
        const decoded = await jwt.verify(token, process.env.SECRET)
        //find user by Id
        const foundUser = await user.findOne({ _id: decoded.id, token: token})

        done(null, foundUser)

    } catch(err) {
        done(err, null)
    }
}


const User = mongoose.model('users', userSchema)

module.exports = { User }