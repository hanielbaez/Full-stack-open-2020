import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const handleChange = (event) => {
        event.preventDefault()
        const searchFor = event.target.value
        dispatch(filterAnecdotes(
            {
                anecdotes: anecdotes,
                searchFor: searchFor
            }
        ))
    }

    const style = {
        marginBotton: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter