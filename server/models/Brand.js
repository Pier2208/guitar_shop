const mongoose = require('mongoose')
const { Schema }  = mongoose


const brandSchema = new Schema({
    name: {
        type: String,
        unique: true,
        maxlength: 100,
        trim: true,
        lowercase: true,
        required: true
    }
})

const Brand = mongoose.model('brands', brandSchema)

module.exports = { Brand }