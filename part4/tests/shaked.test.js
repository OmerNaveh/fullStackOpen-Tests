const app = require('../index');
const request = require ('supertest');
const mockData =require('./mockData')
const Blog = require('../model/model')
const mongoose = require('mongoose');

const api = request(app);
beforeEach(async()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(mockData);
})

describe('testing Api requests', ()=>{
    it('should return all blog posts', async()=>{
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(mockData.length)
    })
    it('should validate a post has an id', async()=>{
        const response = await api.get('/api/blogs')
        expect(response.body[0]._id).toBeDefined()
    })
    it('should validate a new post was created', async()=>{
        const add = await api.post('/api/blogs').send({
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
          })
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(mockData.length+1)
    })
    it('should validate a new post created without passing likes arg sets to 0', async()=>{
        const add = await api.post('/api/blogs').send({
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/"
          })
        const response = await api.get('/api/blogs')
        expect(response.body[response.body.length-1].likes).toBe(0)
    })
    it('should validate a new post created without passing url or title to return status 400', async()=>{
        const response = await api.post('/api/blogs').send({
            author: "Michael Chan",
          })
        expect(response.status).toBe(400)
    })
    it('should validate a post was deleted', async()=>{
        const response = await api.delete('/api/blogs').send({
            title: "React patterns",
          })
        expect(response.status).toBe(200)
        const allBlogs = await api.get('/api/blogs')
        expect(allBlogs.body).toHaveLength(mockData.length-1)
    })
    
    it('should validate a post was updated', async()=>{
        const response = await api.put('/api/blogs').send({
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 10,
          })
        expect(response.status).toBe(200)
        const allBlogs = await api.get('/api/blogs')
        const changedPost = allBlogs.body.find(post=>post.title = 'React patterns')
        expect(changedPost.likes).toBe(10)
    })
})

afterAll(()=>{
    mongoose.connection.close();
})

