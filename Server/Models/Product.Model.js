const mongoose = require("mongoose");

const schema = new mongoose.Schema({
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

const product = mongoose.model("product", schema);
module.exports = product;
