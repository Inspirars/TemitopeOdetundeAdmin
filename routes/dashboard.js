var express = require('express');
var router = express.Router();
const asyncHandler = require("express-async-handler")
const passport = require("passport");
const blogPost = require("../models/blogModel")

router.get('/', asyncHandler(async function(req, res, next) {
  if(req.isAuthenticated()){
    const user = req.user.username
    var postsTitle = await blogPost.find({},"title").exec()
    console.log(postsTitle)
    res.render("dashboard",{title : "Dashboard", user, postsTitle});
  }else{
    res.redirect('/signin')
  }
}));
router.get('/home',(req,res,next)=>{
  if(req.isAuthenticated()){
    res.redirect("/")
  }else{
    res.redirect('/signin')
  }
})

module.exports = router;
