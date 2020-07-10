const countBy = require('lodash/countBy')
const each = require('lodash/forEach')
const uniq = require('lodash/uniq')
const zipObject = require('lodash/zipObject')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    let currentFavorite = { likes: 0 }

    blogs.forEach(blog => {
        if (blog.likes > currentFavorite.likes) {
            currentFavorite = blog
        }
    });
    return currentFavorite.likes !== 0
        ? {
            title: currentFavorite.title,
            author: currentFavorite.author,
            likes: currentFavorite.likes
        }
        : null
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const count = countBy(authors)

    let currentAuthor = {
        author: '',
        blogs: 0
    }
    each(count, (blogs, author) => {
        if (blogs > currentAuthor.blogs) {
            currentAuthor.author = author
            currentAuthor.blogs = blogs
        }
    })
    return currentAuthor
}

const mostLikes = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const authorsSort = uniq(authors)
    const authorsObj = zipObject(authorsSort)

    blogs.forEach(blog => {
        if (authorsObj[blog.author]) {
            authorsObj[blog.author] += blog.likes
        } else {
            authorsObj[blog.author] = blog.likes
        }
    })

    let currentAuthor = {
        author: '',
        likes: 0
    }
    each(authorsObj, (likes, author) => {
        if (likes > currentAuthor.likes) {
            currentAuthor.author = author
            currentAuthor.likes = likes
        }
    })
    return currentAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}