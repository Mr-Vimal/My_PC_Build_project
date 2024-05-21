const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const schema = new mongoose.Schema({
    ProductId: {
        type: Number,
        unique: true
    },
    Img: {
        data: Buffer // No need for required:true here
    },
    ProductName: {
        type: String,
        required: true
    },
    ProductCategory: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    }
});
schema.plugin(AutoIncrement, { inc_field: 'productId' });

const product = mongoose.model("product", schema);
module.exports = product;
