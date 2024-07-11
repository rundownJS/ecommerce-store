const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    freeDelivery: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    picture1: {
        type: String,
        required: true
    },
    picture2: {
        type: String,
        required: true,
    },
    picture3: {
        type: String,
        required: true
    },
    picture4: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Product", productSchema)