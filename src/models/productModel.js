const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        inStock: {
            type: Boolean,
            required: true,
            default: false,

        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        select: false,
      }
)

const Product = mongoose.model("Product", productSchema)

module.exports = Product;