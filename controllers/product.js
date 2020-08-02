const express = require('express');
const router = express.Router();
const {check , validationResult, query} = require('express-validator');
const { v4: uuidV4 } = require('uuid');
const Product = require('../models/product');

router.get('/' , async ( req , res ) => {
    let query = req.query;
    try {
        const products = await Product.find(query) ;
        if ( products.length > 0 ) {
            res.render('products/index' , {products: products})
        } else {
            res.render('products/index' , {productErr: 'Product Not Found'})
        }
    } catch (e) {
        console.log(e);
    }
})

router.get('/create' , async ( req ,res ) => {
    try {
        const products = await new Product();
        res.render('products/create' , {products: products});
    } catch (e) {
        console.log(e);
    }
   
})

router.post('/create' , [check('name' , 'Product Name Cannot Be Empty').notEmpty()
,check('weight' , 'Weight cannot be empty').notEmpty() , 
check('costPrice' , 'costPrice cannot be Empty').notEmpty() , 
check('sellPrice' , 'Sell Price Cannot be Lesser than CP otherwise you will be in a loss').custom((value , {req}) => {
    if (value < req.body.costPrice) {
       return false
    }
    return true;
})] , async ( req ,res ) => {
    try {
        const result = validationResult(req);
        const errors = result.errors;
        if(!result.isEmpty()) {
            res.render('products/create' , {errors: errors})
        } 
          const product = await new Product({
             name: req.body.name,
             weight: req.body.weight,
             costPrice: req.body.costPrice,
             salePrice: req.body.salePrice,
             productCode: uuidV4()
             }).save() ;
                
            res.redirect('/products')
    
    } catch (e) {
        console.log(e);
    }
});

// Edit Product Route 
// Get Edit Page Route 

router.get('/:id/edit' , async ( req , res ) => {
    try {
        const editProduct = await Product.find({_id: req.params.id});
        if(editProduct.length > 0 ) {
            res.render('products/edit' , {products: editProduct})
        } 
    } catch (e) {
        console.log(e);
    }
})

// Actual Edit Route 
router.put('/:id' , async ( req ,res ) => {
    const {name , weight , salePrice , costPrice} = req.body;
   
    try {
            const editedProduct = await Product.findByIdAndUpdate(req.params.id , {$set:req.body});
            res.redirect('/products')
            
    } catch (e) {
        console.log(e);
        res.render('products/edit' , {errorEditInt: '500! Internal Server error'})
    }
})

// Delete Route 
router.delete('/:id' , async ( req ,res ) => {
    try {
        console.log('yes')
        const deletedProduct = await Product.find({_id:req.params.id}).remove();
        res.redirect('/products')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;