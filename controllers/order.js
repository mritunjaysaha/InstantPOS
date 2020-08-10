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
    console.log(req.query);
    let query = new RegExp(`${req.query.name}` , 'i')
    
    try {
        const productFilter = await Product.find({name:query}).sort({'createdAt': -1}).sort({'updatedAt': -1});
        let products = [];
        if (productFilter && productFilter.length > 0) {
            productFilter.forEach(product => {
                const { name , weight , salePrice , _id } = product;
                let productDetails = {
                    product_id: _id,
                    product_name: name,
                    product_weight: weight , 
                    product_price: salePrice
                }
                products.push(productDetails);
            })
        }
        res.json({
            products: products
        })
    } catch (e) {
        console.log(e)
    }
})
module.exports = router;