const Blog = require('../model/model')
const jwt = require("jsonwebtoken")
const JWTSECRET = "shhhhh"

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
  
  exports.authBlog = (request, response) => {
    try {
      const cookieUserObj = jwt.verify(request.token, JWTSECRET);
      if (typeof cookieUserObj === "string") {
        throw cookieUserObj;
      }
      if (!request.body.title || !request.body.url) {
        response.status(400).send()
        return;
      }
      if (!request.body.likes) {
        request.body.likes = 0
      }
      const blog = new Blog(request.body)
  
      blog
        .save()
        .then(result => {
          response.status(201).json(result)
        })
    } catch (err) {
      response.status(400).send("inValid")
      return;
    }
  }

  exports.deletAuth = async (request, response) => {
    try {
      const cookieUserObj = jwt.verify(request.token, JWTSECRET);
      if (typeof cookieUserObj === "string") {
        throw cookieUserObj;
      }
      const { title } = request.body
      const deleteCount = await Blog.deleteOne({ title: title, author: cookieUserObj.userName })
      console.log(deleteCount, "delete count");
      if (deleteCount.deleteCount !== 0) {
        throw title
      }
      response.send()
    } catch (err) {
      response.status(400).send("invalid")
    }
  }