
const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../models/user');
const user = require('../models/user');
const passportConfig = require('../configPassport/passport')(passport , id => users.find(user => user.id === id));

router.get('/' , ( req , res) => {
    res.render('index' , {title: 'Indore Sabzi POS'})
})

router.post('/login' , passport.authenticate('local' , ({
    successRedirect: '/main/',
    failureRedirect: '/',
    failureFlash: true
})))
module.exports = router;