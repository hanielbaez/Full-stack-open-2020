const router = require('express').Router()
const User = require('../model/users')
const Blog = require('../model/blogs')

router.post('/reset', async (request, response) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    response.status(204).end()
})

module.exports = router