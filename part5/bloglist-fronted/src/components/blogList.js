import React from 'react'
import Blog from './blog'

const BlogList = ({ blogs, removeBlogList }) => {
    return (
        <>
            {
                blogs.map(blog =>
                    <div key={blog.id}>
                        <Blog blogObject={blog}
                            removeBlogList={removeBlogList} />
                    </div>
                )
            }
        </>
    )
}

export default BlogList