const Blog = require('../model/model')

exports.getBlogs = (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  };

  exports.createBlog = (request, response) => {
    if(!request.body.title || !request.body.url){
       response.status(400).send()
       return
    }
    if(!request.body.likes){
      request.body.likes = 0;
    }
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  };
  exports.deleteBlogByTitle = async(req,res)=>{
    const title = req.body.title;
    if(!title){
      return res.status(400).send()
    }
    try{
      await Blog.deleteOne({title:title});
      return res.status(200).send('deleted successfully');
    }
    catch(err){
      return res.status(404).send('not found')
    }
  }

  exports.updatePostByTitle = async(req,res)=>{
    const title = req.body.title;
    if(!title){
      return res.status(400).send()
    }
    try{
      await Blog.updateOne({title:title},req.body);
      return res.status(200).send('deleted successfully');
    }
    catch(err){
      return res.status(404).send('not found')
    }
  }
  