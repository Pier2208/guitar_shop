const mongoose = require('mongoose')
const { Schema } = mongoose

const woodSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxlength: 100,
        lowercase: true,
        required: true,
    }
})

const Wood = mongoose.model('woods', woodSchema)

module.exports = { Wood }