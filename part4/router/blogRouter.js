const express = require('express');
const router= express.Router();
const {getBlogs , createBlog} = require('../controller/blogs')
  
router.get('/', getBlogs)

router.post('/', createBlog)


module.exports= router;