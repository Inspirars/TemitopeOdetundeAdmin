var express = require('express');
var router = express.Router();
const passport = require("passport");
const {body, validationResult} = require("express-validator")
const asyncHandler = require("express-async-handler")
const { genPassword } = require('../lib/passwordUtils');
const User = require('../models/user');


/* GET home page. */
customdbfind = async value => {const user = await User.find({username : value}).exec();
if(user){
  throw new Error("Username already in use")
}
}
const customSignUpValidation = ()=> body('username').custom(customdbfind)

let error = ""

router.get('/signup',function(req, res, next) {
  res.render('signUp', {title: 'Sign Up',error});
});
router.post('/signup',
customSignUpValidation()
, asyncHandler(async(req,res,next)=>{
  error  = validationResult(req)
  if (!error.isEmpty()){
    console.log(error)
    res.render('signUp', {title : "Sign Up Error", error : error.array()})
  }else{
    
  let username = req.body.username
  var saltHash = genPassword(req.body.password)
  // genpassword returns a salt and hash

  salt = saltHash.salt
  hash = saltHash.hash

  const user = new User({
    username,
    salt,
    hash
  })

  user.save()
  .then(()=>{console.log(user)})
  res.redirect("/signin")
  }
}))

router.get('/signin',(req,res,next)=> {
  res.render('signIn', {title : "Sign In", error})
})

router.post('/signin',passport.authenticate('local',{failureRedirect : "/signin", successRedirect : "/home"}))

router.get('/logout', (req,res,next)=>{
  req.logOut((err)=>{
    if(err) return next(err)

    res.redirect('/signin')
  })
})

module.exports = router;
