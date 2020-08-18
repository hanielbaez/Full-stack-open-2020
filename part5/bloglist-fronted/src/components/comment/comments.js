import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import CommentForm from './commentForm'
import blogServices from '../../services/blog'

const Comments = (props) => {
    const [comments, setComments] = useState([])
    const match = useRouteMatch('/blogs/:id')

    useEffect(() => {
        if (props.comments) {
            setComments(props.comments)
        }
    }, [])

    const createComment = async (comment) => {
        const response = await blogServices.addComment(match.params.id, [...comments, comment])
        setComments(response.comments)
        return response
    }

    return (
        <>
            <h3>comments</h3>
            <CommentForm createComment={createComment} />
            {
                comments && (
                    <ul>
                        {comments.map((comment, index) =>
                            <li key={index}>{comment}</li>
                        )}
                    </ul>
                )
            }
        </>
    )
}

export default Comments