// models/Product.js
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    Img: {
        type: String,
        required: true
    },
    ProductName: {
        type: String,
        required: true
    },
    ProductBrand: {
        type: String,
        required: true,
        enum: ['Asus', 'MSI', 'Gigabyte', 'Asrock', 'Biostar', 'Corsair', 'Western Digital', 'Nvidia', 'Logitech', 'Intel', 'Ryzen', 'AMD', 'Western Digital'],
        default: 'Asus'
    },
    ProductCategory: {
        type: String,
        required: true,
        enum: ['Motherboard', 'Processor', 'Hard Disk', 'SSD', 'RAM', 'Mouse', 'Keyboard', 'Casing', 'Cooler', 'Graphic Card',],
        default: 'Motherboard'
    },
    Price: {
        type: Number,
        required: true
    }
});
schema.plugin(AutoIncrement, { inc_field: 'productId' });

const Product = mongoose.model("Product", schema);
module.exports = Product;
