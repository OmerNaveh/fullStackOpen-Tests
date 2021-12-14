const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
  })
  
  
  const mongoUrl = 'mongodb+srv://omer:omer12345@cluster0.chke2.mongodb.net/part4?retryWrites=true&w=majority'
  mongoose.connect(mongoUrl).then(()=>console.log('db connected...'))
  
  const Blog = mongoose.model('Blog', blogSchema);

  module.exports = Blog;