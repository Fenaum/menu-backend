const mongoose = require('mongoose')

const entreeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter the Item's Name"],
        },
        quantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, "Please Provide the Price of this Item"]
        },
        vegetarian: {
            type: Boolean,
            default: false
        },
        ingredients: [String],
        calories: Number,
        tags: [String],
        imgURL: String,
        description: String,
    },
    {
        timestamps: true,
    }
);

const Entree = mongoose.model('Entree', entreeSchema);

module.exports = Entree