const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogClass = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogClass);
module.exports = Blog;

