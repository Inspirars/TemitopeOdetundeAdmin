const router = require("express").Router()
const Post = require("../models/blogModel")
const asyncHandler = require("express-async-handler")


router.get('/delete/:id',async (req,res,next)=>{
    let itemId = req.params.id
    let deleteItem = await Post.findById(itemId).deleteOne().exec()
    console.log(deleteItem)
    res.redirect('/')
})

module.exports = router