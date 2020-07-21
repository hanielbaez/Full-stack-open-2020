import React from 'react'

const Blog = ({ blog }) => {
    return (
        <p>
            {blog.title} {blog.author}
        </p>
    )
}

export default Blog