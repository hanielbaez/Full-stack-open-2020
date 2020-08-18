import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    return (
        <div className="box">
            {
                blogs.map(blog =>
                    <div key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default BlogList