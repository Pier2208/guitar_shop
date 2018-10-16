const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 200,
        required: true
    },
    description: {
        type: String,
        maxlength: 2000,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brands',
        required: true
    },
    shipping: {
        type: Boolean,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    wood: {
        type: Schema.Types.ObjectId,
        ref: 'woods',
        required: true
    },
    frets: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        required: true
    },
    images: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const Product = mongoose.model('products', productSchema)

module.exports = { Product }