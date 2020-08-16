const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        default:
            return state
    }
}

export const inizializeBlog = (blogs) => {
    return {
        type: 'INIT_BLOGS',
        data: blogs
    }
}

export const addBlog = (blog) => {
    return {
        type: 'ADD_BLOG',
        data: blog
    }
}

export const removeBlog = (blog) => {
    return {
        type: 'REMOVE_BLOG',
        data: blog
    }
}

export default blogReducer