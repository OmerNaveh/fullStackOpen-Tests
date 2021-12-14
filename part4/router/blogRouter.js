const express = require('express');
const tokenExtractor = require("../middleware/tokenExtractor")
const router= express.Router();
const {getBlogs , createBlog, deleteBlogByTitle, updatePostByTitle, authBlog, deletAuth} = require('../controller/blogs')
  
router.use(tokenExtractor)
router.get('/', getBlogs)

router.post('/', createBlog)

router.post('/auth', authBlog)

router.delete('/auth', deletAuth)

router.delete('/',deleteBlogByTitle)

router.put('/', updatePostByTitle)

module.exports= router;