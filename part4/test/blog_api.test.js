const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../model/blogs')
const helper = require('./test_blogs_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        const newBlog = Blog(blog)
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
        .post('/api/blogs/')
        .send(helper.newBlog)
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
    const blogs = await helper.blogsInDb()
    await api
        .delete(`/api/blogs/${blogs[0].id}`)
        .expect(200)

    const blogsInDb = await helper.blogsInDb()
    const ids = blogsInDb.map(blog => blog.id)

    expect(ids).not.toContain(blogs[0].id)
})

test('success update the amount of likes for a blog post', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = { ...blogs[0], likes: blogs[0].likes + 2 }

    await api
        .put(`/api/blogs/${blogs[0].id}`)
        .send(blogToUpdate)
        .expect(204)

    const blogsUpdated = await helper.blogsInDb()
    expect(blogsUpdated[0]).toMatchObject(blogToUpdate)
})

afterAll(() => {
    mongoose.connection.close()
})