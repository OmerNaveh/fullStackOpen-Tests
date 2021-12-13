const express = require('express');
const router= express.Router();
const {getBlogs , createBlog, deleteBlogByTitle} = require('../controller/blogs')
  
router.get('/', getBlogs)

router.post('/', createBlog)

router.delete('/',deleteBlogByTitle)

module.exports= router;