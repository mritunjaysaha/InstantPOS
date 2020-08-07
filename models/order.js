const mongoose = require('mongoose');
const productCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    } , 
    name: String,
    count: Number,
    price: Number

})


const orderSchema = new mongoose.Schema({
    products: [productCartSchema] , 
    transaction_id: {} , 
    amount: {
        type: Number
    } , 
    address: String,
    updated: Date,
    customer: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'customer'
    }
} , )

const order = mongoose.model('order' , orderSchema);
const productCart = mongoose.model('productCart' , productCartSchema);

module.exports = {
    order , productCart
}