const express = require('express');
const router= express.Router();
const {getBlogs , createBlog, deleteBlogByTitle, updatePostByTitle} = require('../controller/blogs')
  
router.get('/', getBlogs)

router.post('/', createBlog)

router.delete('/',deleteBlogByTitle)

router.put('/', updatePostByTitle)

module.exports= router;