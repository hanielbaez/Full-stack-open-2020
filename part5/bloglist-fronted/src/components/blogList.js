import React from 'react'
import Blog from './blog'
import PropType from 'prop-types'

const BlogList = ({ blogs, removeBlogList }) => {

    BlogList.prototype = {
        blogs: PropType.array.isRequired,
        removeBlogList: PropType.func.isRequired
    }

    return (
        <>
            {
                blogs.map(blog =>
                    <div key={blog.id}>
                        <Blog blogObject={blog}
                            removeBlogList={removeBlogList}
                            forLikeTest={() => { }} />
                    </div>
                )
            }
        </>
    )
}

export default BlogList