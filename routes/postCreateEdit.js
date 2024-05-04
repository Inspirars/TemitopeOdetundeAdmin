const router = require("express").Router()
const asyncHandler = require("express-async-handler")
const createController = require("../controllers/createController")
const multer = require("multer")
const upload = multer({dest: 'uploads/'}).single('image')
const Post = require("../models/blogModel")

router.get('/create',createController.createGet)
router.post('/create',upload,createController.createPost)

router.get('/edit/:id',asyncHandler(async (req,res)=>{
    let itemId = req.params.id
    console.log(itemId)
    const editableDoc = await Post.findById(itemId).exec()
    console.log(editableDoc)
    res.render('postCreateEdit',{title : "Create", action : `/edit/${itemId}`,editableDoc})
}))

module.exports = router