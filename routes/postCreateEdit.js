const router = require("express").Router()

router.get('/create',(req,res,next)=>{

    res.render('postCreateEdit',{title : "Create", action : "/create"})
})

router.get('/edit/:id',(req,res)=>{
    let item = req.params
    res.render('postCreateEdit',{title : "Create", action : `/edit/${item}`})
})

module.exports = router