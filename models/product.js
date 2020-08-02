const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { 
        type: String,
        maxlength: 80,  
        required: true
    } , 
    weight: {
        type: Number,
        required: true,
    } , 
    costPrice: {
        type: String,
        required: true
    } , 
    salePrice: {
        type: String,
        required: true
    } , 
    productCode: {
        type: String
    }
} , {timestamps: true})

module.exports = mongoose.model('product' , productSchema);