const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    prod_cod: {
        type: String,
        required: true
    },
    prod_name: {
        type: String,
        required: true
    },
    prod_price: {
        type: Number,
        required: true
    },
    prod_stock: {
        type: Number,
        required: false
    }
});

module.exports = model('Product', ProductSchema);