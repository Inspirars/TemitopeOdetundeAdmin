var express = require('express');
var router = express.Router();
const passport = require("passport");
const {body, validationResult} = require("express-validator")
const asyncHandler = require("express-async-handler")
const { genPassword } = require('../lib/passwordUtils');
const User = require('../models/user');


/* GET home page. */

let error = ""

router.get('/signup',function(req, res, next) {
  res.render('signUp', {title: 'Sign Up', error});
});
router.post('/signup',
body('username').custom(async (value)=>{
  console.log(value)
  const newUser = await User.find({username : value})
  console.log(newUser)
  if(newUser != []){
    throw new Error('User Already Exists')
  }
})
, asyncHandler(async(req,res,next)=>{
  const error  = validationResult(req)
  console.log(error)
  if (!error.isEmpty()){
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

  await user.save()
  .then(()=>{console.log(user)})
  res.redirect("/signin")
  }
}))

router.get('/signin',(req,res,next)=> {
  res.render('signIn', {title : "Sign In"})
})
router.post('/signin',passport.authenticate('local',{failureRedirect : "/signin", successRedirect : "/home"}))

router.get('/logout', (req,res,next)=>{
  req.logOut((err)=>{
    if(err) return next(err)
    res.redirect('/signin')
  })
})

module.exports = router;
