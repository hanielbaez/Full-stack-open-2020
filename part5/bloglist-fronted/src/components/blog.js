import React, { useState } from 'react'
import TogglableVisibility from './toggleVisibility'
import blogServices from '../services/blog'

const Blog = ({ blogObject, removeBlogList, forLikeTest }) => {
    const [blog, setBlog] = useState(blogObject)

    const user = JSON.parse(localStorage.getItem('loggedBlogUser'))

    const blogStyle = {
        borderStyle: 'solid',
        margin: '10px',
        padding: '4px'
    }

    const handleClickLike = async event => {
        event.preventDefault()
        forLikeTest()
        const toUpdateBlog = { ...blog, likes: blog.likes + 1 }
        await blogServices.updateLikes(toUpdateBlog)

        //? No checking the result of the PUT operation
        setBlog(toUpdateBlog)
    }

    const handleClickRemove = async event => {
        event.preventDefault()

        const isOkRemove = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        if (isOkRemove) {
            await blogServices.remove(blog.id)
            removeBlogList(blog)
        }
    }

    const removeButton = (
        <div>
            <button id='remove-button' type='button' onClick={handleClickRemove}>remove</button>
        </div>
    )

    return (
        <div className='blog' style={blogStyle}>
            {blog.title}
            < TogglableVisibility buttonTitle='view' >
                <p>{blog.url}</p>
                <p>likes {blog.likes}
                    <button id='like-button' type='button'
                        onClick={handleClickLike}>
                        like
                    </button></p>
                <p> {blog.author}</p>
                {user?.name === blog?.author && removeButton}
            </TogglableVisibility >
        </div >
    )
}

export default Blog