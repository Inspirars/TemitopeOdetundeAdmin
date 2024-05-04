const asyncHandler = require("express-async-handler")
const cloudinary = require("cloudinary").v2
const fs = require("node:fs")
const Post = require("../models/blogModel")
cloudinary.config({
    cloud_name : "oladee",
    api_key : process.env.CLOUDINARY_API_KEY,
    secure : true,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

exports.editGet = asyncHandler(async (req,res)=>{
    let itemId = req.params.id
    const editableDoc = await Post.findById(itemId)
    console.log(editableDoc)
    res.render('postCreateEdit',{title : "Create", action : `/edit/${itemId}`,editableDoc})
})

exports.editPost = asyncHandler(async (req,res)=>{
    var itemId = req.params.id
    console.log(itemId)
    if(req.file){
        var imgLink = await cloudinary.uploader.upload(req.file.path)
        var post = {
            title : req.body.title,
            image : imgLink.secure_url,
            tag : req.body.tag,
            content : req.body.content
        }
    }else{
         post = {
            title : req.body.title,
            tag : req.body.tag,
            content : req.body.content
        }
    }

    const updateDoc = await Post.findOneAndUpdate({_id : itemId}, post,{
        new: true
      })
    if(req.file){
        fs.unlinkSync(req.file.path)
    }
    res.redirect('/')
})