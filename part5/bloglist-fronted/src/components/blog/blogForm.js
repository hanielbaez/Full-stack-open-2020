import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogServices from '../../services/blog'
import { addBlog } from '../../reducers/blog'
import { errorAlert, successAlert } from '../../reducers/alert'

const BlogForm = () => {
    const [newBlog, setNewBlog] = useState(null)

    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    const submitHandle = async (event) => {
        event.preventDefault()
        if (!newBlog || !newBlog.title || !newBlog.author || !newBlog.url) {
            dispatch(errorAlert('Missing blog\'s atributes'))
            return
        }

        const response = await blogServices.create(newBlog)

        if (response) {
            dispatch(addBlog(blogs.concat(response)))
            dispatch(successAlert(`${JSON.stringify(newBlog.title)} created successfully`))
        }
        setNewBlog(null)
    }

    return (
        <div className="box">
            <h3>create new</h3>
            <form onSubmit={submitHandle}>
                <div className="field">
                    <label className="title"></label>
                    <input
                        className="textarea is-small"
                        value={newBlog?.title ?? ''}
                        onChange={({ target }) => {
                            setNewBlog({ ...newBlog, title: target.value })
                        }}
                        placeholder="Write the best blog ever">

                    </input>
                </div>
                <div className="field">
                    <label className="author"></label>
                    <input
                        value={newBlog?.author ?? ''}
                        onChange={({ target }) => { setNewBlog({ ...newBlog, author: target.value }) }}
                        className='author'
                        placeholder="Who is the author of this blog?">

                    </input>
                </div>
                <div className="field">
                    <label className="url"></label>
                    <input
                        value={newBlog?.url ?? ''}
                        onChange={({ target }) => { setNewBlog({ ...newBlog, url: target.value }) }}
                        className='url'
                        placeholder="e.g www.hanielbaez.com">

                    </input>
                </div>
                <button type="submit" id='submit-button'>create</button>
            </form>
        </div>
    )
}

export default BlogForm