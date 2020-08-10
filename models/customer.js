const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: {
        type:String , 
        maxlength:32 , 
        required: true
    } , 
    mobileNo: {
        type:String , 
        maxlength:12,
        required: true
    } , 
    address: {
        type: String , 
        maxlength: 75 , 
        required: true
    }
})

module.exports = mongoose.model('customer' , customerSchema);