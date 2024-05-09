const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Img:{
        type:String,
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
        type: String,
        required: true
    }
});

const product = mongoose.model("product", schema);
module.exports = product;
