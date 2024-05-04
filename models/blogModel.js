const mongoose = require("mongoose")

const { DateTime } = require("luxon")

const Schema = mongoose.Schema


const postSchema = new Schema({

    title : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    tag : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : "/images/blogCoverImgs/blog1.png"
    },
    content : {
        type : String,
        required :  true
    }
})

postSchema.virtual('url').get(function(){
    return `posts/${this._id}`
})

postSchema.virtual('edit').get(function(){
    return `edit/${this._id}`
})

postSchema.virtual("formattedDate").get(function(){
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED)
})

postSchema.virtual('delete').get(function(){
    return `delete/${this._id}`
})


const post = mongoose.model('post', postSchema)

module.exports = post