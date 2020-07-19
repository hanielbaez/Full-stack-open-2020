const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../model/blogs')
const helper = require('./helper/blogs_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        const newBlog = Blog({ ...blog, user: "5f135b9f3f26370d560ecde8" })
        await newBlog.save()
    }
})

test('returns the correct amount of blog posts', async () => {
    const blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(blogs.body.length).toBe(helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id,', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
})

test('create a new blog post', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9iZWQiLCJpZCI6IjVmMTM1YjlmM2YyNjM3MGQ1NjBlY2RlOCIsImlhdCI6MTU5NTE5MDQ2N30.CuHlijgW6nAfeGi74TDd6XFYmrUaT97B2VlRYP8ROcw')
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()

    expect(blogsInDb.length).toEqual(helper.initialBlogs.length + 1)

    const titles = blogsInDb.map(note => note.title)
    expect(titles).toContain(helper.newBlog.title)

})

test('likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = helper.newBlog
    delete newBlog.likes

    const response = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9iZWQiLCJpZCI6IjVmMTM1YjlmM2YyNjM3MGQ1NjBlY2RlOCIsImlhdCI6MTU5NTE5MDQ2N30.CuHlijgW6nAfeGi74TDd6XFYmrUaT97B2VlRYP8ROcw')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
})

test('missing title and url return code 400', async () => {
    const notTitleOrUrl = helper.newBlog
    delete notTitleOrUrl.title
    delete notTitleOrUrl.url

    await api
        .post('/api/blogs')
        .send(notTitleOrUrl)
        .expect(400)
})

test('success remove a blog post with a valid id', async () => {
    const blog = await Blog.findOne({})

    await api
        .delete(`/api/blogs/${blog.id}`)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9iZWQiLCJpZCI6IjVmMTM1YjlmM2YyNjM3MGQ1NjBlY2RlOCIsImlhdCI6MTU5NTE5MDQ2N30.CuHlijgW6nAfeGi74TDd6XFYmrUaT97B2VlRYP8ROcw')
        .expect(200)

    const blogsInDb = await helper.blogsInDb()
    const ids = blogsInDb.map(blog => blog.id)

    expect(ids).not.toContain(helper.initialBlogs[1].id)
})

test('success update the amount of likes for a blog post', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = { ...blogs[0], likes: blogs[0].likes + 2 }

    await api
        .put(`/api/blogs/${blogs[0].id}`)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9iZWQiLCJpZCI6IjVmMTM1YjlmM2YyNjM3MGQ1NjBlY2RlOCIsImlhdCI6MTU5NTE5MDQ2N30.CuHlijgW6nAfeGi74TDd6XFYmrUaT97B2VlRYP8ROcw')
        .send(blogToUpdate)
        .expect(204)

    const blogsUpdated = await helper.blogsInDb()
    expect(blogsUpdated[0]).toMatchObject(blogToUpdate)
})

afterAll(() => {
    mongoose.connection.close()
})