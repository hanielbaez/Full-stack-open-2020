import React, { useState } from 'react'

const BlogForm = ({ createBlog, timeOutAlert }) => {
    const [newBlog, setNewBlog] = useState(null)

    const submitHandle = async (event) => {
        event.preventDefault()
        if (!newBlog || !newBlog.title || !newBlog.author || !newBlog.url) {
            timeOutAlert({
                state: false,
                text: 'Missing blog\'s atributes'
            })
            return
        }
        createBlog(newBlog)
        setNewBlog(null)
    }

    return (
        <>
            <h3>create new</h3>
            <form onSubmit={submitHandle}>
                <div>
                    title: <input
                        value={newBlog?.title ?? ''}
                        onChange={({ target }) => {
                            setNewBlog({ ...newBlog, title: target.value })
                        }} className='title'>

                    </input>
                </div>
                <div>
                    author: <input
                        value={newBlog?.author ?? ''}
                        onChange={({ target }) => { setNewBlog({ ...newBlog, author: target.value }) }}
                        className='author'>

                    </input>
                </div>
                <div>
                    url: <input
                        value={newBlog?.url ?? ''}
                        onChange={({ target }) => { setNewBlog({ ...newBlog, url: target.value }) }}
                        className='url'>

                    </input>
                </div>
                <button type="submit" id='submit-button'>create</button>
            </form>
        </>
    )
}

export default BlogForm