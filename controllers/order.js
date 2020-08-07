const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/' , async ( req , res ) => {
    try {
        res.render('pos/index')
    } catch (e) {
        console.log(e);
    }
});

router.get('/search' , async ( req , res ) => {
    let query = new RegExp(`${req.query}` , 'i')
    
    try {
        const productFilter = await Product.find({name:query} , {'name': 1}).sort({'createdAt': -1}).sort({'updatedAt': -1});
        if (productFilter && productFilter.length > 0) {
            console.log(productFilter)
        }
    } catch (e) {
        console.log(e)
    }
})
module.exports = router;