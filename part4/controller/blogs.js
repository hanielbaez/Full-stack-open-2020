const express = require('express')
const blogRouter = express.Router()
const Blog = require('../model/blogs')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

    if (request.body.title && request.body.url) {
        const blog = new Blog(request.body)
        const result = await blog.save()
        response.status(201).json(result)
    } else {
        response.status(400).end({ error: 'missing properties' })
    }

})

module.exports = blogRouter