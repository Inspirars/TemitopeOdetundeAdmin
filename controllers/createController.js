const cloudinary = require("cloudinary").v2
const asyncHandler = require("express-async-handler");
const fs = require("node:fs")
const Post = require("../models/blogModel")
cloudinary.config({
    cloud_name : "oladee",
    api_key : process.env.CLOUDINARY_API_KEY,
    secure : true,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

let editableDoc = ""
exports.createGet = (req,res,next)=>{

    res.render('postCreateEdit',{title : "Create", action : "/create", editableDoc})
}

exports.createPost  = asyncHandler(async (req,res,next)=>{
    console.log("i reached here with no file in me")
       if(req.file){
        var imgLink = await cloudinary.uploader.upload(req.file.path)
        var post = new Post({
            title : req.body.title,
            image : imgLink.secure_url,
            tag : req.body.tag,
            content : req.body.content
        })
    }
  
      var post = new Post({
        title : req.body.title,
        tag : req.body.tag,
        content : req.body.content
    })
    if(req.file){
        fs.unlinkSync(req.file.path)
    }
    post.save()
    res.redirect('/')

})