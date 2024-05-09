const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    // DateOfBirth:{
    //     type: String,
    //     required: true
    // },
    Email:{
        type: String,
        unique :true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Password:{
        type: String,
        required: true
    }
});

const Document = mongoose.model("user", schema);
module.exports = Document;
