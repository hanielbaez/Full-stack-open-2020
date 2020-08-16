import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog } from '../../reducers/blog'
import blogServices from '../../services/blog'
import Comments from '../comment/comments'

const Blog = ({ blogSelected }) => {
    const [blog, setBlog] = useState(blogSelected)
    const dispatch = useDispatch()

    if (!blog) {
        return null
    }

    const user = JSON.parse(localStorage.getItem('loggedBlogUser'))

    const handleClickLike = async event => {
        event.preventDefault()
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
            dispatch(removeBlog(blog))
        }
    }

    const removeButton = (
        <div>
            <button id='remove-button' type='button' onClick={handleClickRemove}>remove</button>
        </div>
    )

    return (
        <div className="card">
            <div className="box">
                <h2>{blog.title}</h2>
                <a href={blog.url}>{blog.url}</a>
                <p>likes {blog.likes}
                    <button id='like-button' type='button' onClick={handleClickLike}>
                        like
                    </button>
                </p>
                <p>added by {blog.author}</p>
                {user?.username === blog?.user?.username && removeButton}
                <Comments comments={blog.comments} />
            </div >
        </div>
    )
}

export default Blog