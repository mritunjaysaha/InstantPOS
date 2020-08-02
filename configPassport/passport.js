const users = require('../models/user');
const user = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport , getUserById) => {
    passport.use(new LocalStrategy({usernameField: 'email'} , async (email , password , done) => {
        const user = users.find(user => user.email === email);

        try {
            if(!user) {
                return done(null , false , {message: 'Not an Admin Email'})
            } 
            if(user.password === password) {
                return done(null ,user)
            } else {
                return done(null , false , { message: 'Incorrect Password' })
            }
            
            
        } catch  (e) {
            return done(e)
        }
    }))

    passport.serializeUser((user , done) => {done(null , user.id)});
    passport.deserializeUser((id , done) => {
         return done(null , getUserById(id))
    })
}