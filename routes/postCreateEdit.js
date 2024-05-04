const router = require("express").Router()
const asyncHandler = require("express-async-handler")
const createController = require("../controllers/createController")
const editController = require("../controllers/editController")
const multer = require("multer")
const upload = multer({dest: 'uploads/'}).single('image')
const Post = require("../models/blogModel")

router.get('/create',createController.createGet)
router.post('/create',upload,createController.createPost)

router.get('/edit/:id',editController.editGet)
router.post('/edit/:id',upload,editController.editPost)

module.exports = router