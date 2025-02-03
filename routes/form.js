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
  error = []
  res.render('signUp', {title: 'Sign Up', error});
});
router.post('/signup', asyncHandler(async(req,res,next)=>{
  let {username, password} = req.body
  if(!username || !password){
    error = [{msg :"Missing parameters"}]
    res.render('signUp', {title : "Sign Up Error", error : error})
  }
  username = username.toLowerCase()
  const existinguser = await User.findOne({username : username}).exec()
  if (existinguser){
    error = [{msg :"User already exists"}]
    res.render('signUp', {title : "Sign Up Error", error : error})
  }else{
  var saltHash = genPassword(password)
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
