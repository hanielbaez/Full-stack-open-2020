const express = require('express')
const blogRouter = express.Router()
const Blog = require('../model/blogs')
const { request } = require('express')

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

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(200).send()
})

blogRouter.put('/:id', async (request, response) => {
    const blogObject = request.body

    const result = await Blog
        .findByIdAndUpdate(request.params.id, blogObject)
    response.status(204).send(result)
})

module.exports = blogRouter