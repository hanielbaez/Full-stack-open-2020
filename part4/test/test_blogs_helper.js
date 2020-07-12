const Blog = require('../model/blogs')

const initialBlogs = [{
    title: "WakaSpam",
    author: "Haniel Baez",
    url: "http://hanilebaez.com",
    likes: 4,
},
{
    title: "News-ML",
    author: "Haniel Baez",
    url: "http://hanilebaez.com",
    likes: 3,
},
{
    title: "Dance-ML",
    author: "Obed Baez",
    url: "http://hanilebaez.com",
    likes: 6
},
{
    title: "Time to work",
    author: "Another Person",
    url: "http://00000000.com",
    likes: 4
},
{
    title: "More Projects",
    author: "Haniel Baez",
    url: "http://hanilebaez.com",
    likes: 1,
},
{
    title: "....",
    author: "Another Person",
    url: "http://00000000.com",
    likes: 5,
}]

const newBlog = {
    title: "This will be your best day. Here is why?",
    author: "Haniel",
    url: "http://hanielbaez.com",
    likes: 777,
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    newBlog,
    blogsInDb
}