const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user");
const { validPassword } = require("../lib/passwordUtils");

const customFields = {
    usernameField : "username",
    passwordField : "password"
}

function verifyCallback(username, password, doneFunction){
    User.findOne({username : username})
    .then(user => {
        // is user in the database
        // if not return full and notify passport that there was no error
        // in the operation
        if(!user){return doneFunction(null, false)}
        const isValid = validPassword(password, user.hash, user.salt)

        if(isValid){
             // no error in operation but the password is correct
            return doneFunction(null, user) 
        }else{
            // no error in operation but the password is incorrect
            return doneFunction(null, false)
        }
    })
    .catch((err)=>{return doneFunction(err)})
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser((user,doneFunction)=>{
    doneFunction(null, user.id)
})

passport.deserializeUser((userId,doneFunction)=>{
    User.findById(userId)
    .then(user =>{
        doneFunction(null, user)
    })
    .catch(err => doneFunction(err))
})