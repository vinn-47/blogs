const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    text: {
        type: String,
        required: true
    },
    //likes: Number,
    likes: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    comments: {
        type: Array,
        "default": []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)